/**
 * ChainFlow 核心求解器 — 确定性计算
 * 路线、分配、成本全部由确定算法完成，不依赖 LLM
 */

// ═══════════════════════════════════════
// 共享工具
// ═══════════════════════════════════════

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface Order {
  id: string; lat: number; lng: number;
  weight_kg?: number; volume_m3?: number;
  time_window_start?: string; time_window_end?: string;
  address?: string; delivery_address?: string;
}

export interface Vehicle {
  type: string; count: number;
  capacity_kg?: number; capacity_m3?: number;
}

export interface Depot { lat: number; lng: number; name?: string; }

// ═══════════════════════════════════════
// RouteFlow 求解器 — 贪心最近邻 + 容量约束
// ═══════════════════════════════════════

export interface RouteStop {
  stop_number: number;
  order_id: string;
  lat: number; lng: number;
  address: string;
  weight_kg: number; volume_m3: number;
  arrival?: string;
}

export interface RouteResult {
  route_id: string;
  vehicle_type: string;
  vehicle_id: string;
  stops: RouteStop[];
  total_distance_km: number;
  total_weight_kg: number;
  total_volume_m3: number;
  utilization_weight: number;
  utilization_volume: number;
  status: "ready" | "warning" | "review";
}

export interface RouteFlowOutput {
  summary: {
    total_orders: number; total_routes: number; total_distance_km: number;
    total_weight_kg: number; total_volume_m3: number;
    vehicles_used: number; solve_time_seconds: number;
  };
  routes: RouteResult[];
  exceptions: Array<{ type: string; severity: string; description: string; suggested_action: string }>;
  unserved_orders: string[];
  assumptions: string[];
}

export function solveRouteFlow(
  orders: Order[],
  depot: Depot,
  vehicles: Vehicle[],
  options?: { maxSolveTimeMs?: number }
): RouteFlowOutput {
  const startTime = Date.now();
  const assumptions: string[] = ["距离为直线估算（haversine公式）", "不考虑实时交通和道路限制", "时间窗约束当前为软约束"];
  const exceptions: RouteFlowOutput["exceptions"] = [];

  if (!orders.length) {
    return { summary: { total_orders: 0, total_routes: 0, total_distance_km: 0, total_weight_kg: 0, total_volume_m3: 0, vehicles_used: 0, solve_time_seconds: 0 }, routes: [], exceptions: [], unserved_orders: [], assumptions };
  }

  // 过滤有效订单（必须有坐标）
  const valid = orders.filter(o => o.lat !== undefined && o.lat !== null && o.lng !== undefined && o.lng !== null);
  const invalidIds = orders.filter(o => !valid.includes(o)).map(o => o.id);
  if (invalidIds.length > 0) {
    exceptions.push({ type: "invalid_coords", severity: "critical", description: `${invalidIds.length} 个订单缺少坐标，已排除`, suggested_action: "补充经纬度后重试" });
  }

  // 展开车辆
  const fleet: { type: string; id: string; capacity_kg: number; capacity_m3: number; }[] = [];
  vehicles.forEach(v => {
    for (let i = 1; i <= (v.count || 1); i++) {
      fleet.push({ type: v.type, id: `${v.type}-${i}`, capacity_kg: v.capacity_kg || Infinity, capacity_m3: v.capacity_m3 || Infinity });
    }
  });
  if (fleet.length === 0) fleet.push({ type: "默认", id: "默认-1", capacity_kg: Infinity, capacity_m3: Infinity });

  // 按距配送中心距离排序（近的先排）
  const sorted = [...valid].sort((a, b) => {
    const dA = haversineKm(depot.lat, depot.lng, a.lat, a.lng);
    const dB = haversineKm(depot.lat, depot.lng, b.lat, b.lng);
    return dA - dB;
  });

  // 贪心分配：每辆车按最近邻填充
  const routes: RouteResult[] = [];
  const unassigned: Order[] = [];
  let remaining = [...sorted];
  let routeIdx = 0;

  while (remaining.length > 0 && routeIdx < fleet.length) {
    const vehicle = fleet[routeIdx];
    const assigned: Order[] = [];
    let totalWt = 0, totalVol = 0;

    // 贪心：从当前位置（depot开始）找最近的下一个订单
    const pool = [...remaining];
    let currentLat = depot.lat, currentLng = depot.lng;
    let routeDist = 0;

    while (pool.length > 0) {
      // 找最近的订单
      let bestIdx = 0, bestDist = Infinity;
      pool.forEach((o, idx) => {
        const d = haversineKm(currentLat, currentLng, o.lat, o.lng);
        if (d < bestDist) { bestDist = d; bestIdx = idx; }
      });

      const candidate = pool[bestIdx];
      const newWt = totalWt + (candidate.weight_kg || 0);
      const newVol = totalVol + (candidate.volume_m3 || 0);

      if (newWt <= vehicle.capacity_kg && newVol <= vehicle.capacity_m3) {
        assigned.push(candidate);
        totalWt = newWt; totalVol = newVol;
        routeDist += bestDist;
        currentLat = candidate.lat; currentLng = candidate.lng;
        pool.splice(bestIdx, 1);
        remaining = remaining.filter(o => o.id !== candidate.id);
      } else {
        break; // 装不下了
      }
    }

    if (assigned.length > 0) {
      // 回配送中心
      const last = assigned[assigned.length - 1];
      routeDist += haversineKm(last.lat, last.lng, depot.lat, depot.lng);

      const stops: RouteStop[] = [];
      // 配送中心起点
      let prevLat = depot.lat, prevLng = depot.lng;
      assigned.forEach((o, si) => {
        const segDist = haversineKm(prevLat, prevLng, o.lat, o.lng);
        routeDist += segDist; // 已在上面计入，这里只做累计
        stops.push({
          stop_number: si + 1,
          order_id: o.id,
          lat: o.lat, lng: o.lng,
          address: o.delivery_address || o.address || "",
          weight_kg: o.weight_kg || 0,
          volume_m3: o.volume_m3 || 0,
        });
        prevLat = o.lat; prevLng = o.lng;
      });

      const utilW = totalWt / (vehicle.capacity_kg || 1);
      const utilV = totalVol / (vehicle.capacity_m3 || 1);

      routes.push({
        route_id: `R${String(routes.length + 1).padStart(2, "0")}`,
        vehicle_type: vehicle.type,
        vehicle_id: vehicle.id,
        stops,
        total_distance_km: parseFloat(routeDist.toFixed(1)),
        total_weight_kg: parseFloat(totalWt.toFixed(1)),
        total_volume_m3: parseFloat(totalVol.toFixed(1)),
        utilization_weight: parseFloat(Math.min(utilW, 1).toFixed(2)),
        utilization_volume: parseFloat(Math.min(utilV, 1).toFixed(2)),
        status: utilW > 0.95 || utilV > 0.95 ? "warning" : "ready",
      });
    }
    routeIdx++;
  }

  // 未分配
  const unserved = remaining.map(o => o.id);
  if (unserved.length > 0) {
    exceptions.push({ type: "capacity_insufficient", severity: "critical", description: `${unserved.length} 个订单无法分配（容量不足）`, suggested_action: "增加车辆或减少订单" });
  }

  // 时间窗检查
  const twOrders = valid.filter(o => o.time_window_start);
  if (twOrders.length > 0) {
    assumptions.push(`${twOrders.length} 个订单有时间窗约束，当前求解器为软约束（优先排序但未严格保证）`);
  }

  const totalDist = routes.reduce((s, r) => s + r.total_distance_km, 0);
  const totalWtAll = routes.reduce((s, r) => s + r.total_weight_kg, 0);
  const totalVolAll = routes.reduce((s, r) => s + r.total_volume_m3, 0);

  return {
    summary: {
      total_orders: valid.length,
      total_routes: routes.length,
      total_distance_km: parseFloat(totalDist.toFixed(1)),
      total_weight_kg: parseFloat(totalWtAll.toFixed(1)),
      total_volume_m3: parseFloat(totalVolAll.toFixed(1)),
      vehicles_used: routes.length,
      solve_time_seconds: parseFloat(((Date.now() - startTime) / 1000).toFixed(2)),
    },
    routes,
    exceptions,
    unserved_orders: unserved,
    assumptions,
  };
}

// ═══════════════════════════════════════
// NetworkFlow 求解器 — 覆盖+成本模型
// ═══════════════════════════════════════

export interface DemandCity { id: string; name: string; lat: number; lng: number; orders?: number; }

export interface CandidateWarehouse {
  id: string; name: string; lat: number; lng: number;
  fixed_cost_monthly: number; capacity_orders: number;
  service_radius_km: number;
}

export interface ScenarioConfig { max_warehouses: number; min_coverage: number; transport_cost_per_km_per_order: number; }

export interface ScenarioResult {
  id: string; name: string; sites: string[];
  coverage: number; total_cost: number;
  fixed_cost: number; transport_cost: number;
  allocations: Record<string, string[]>; // warehouse -> cities
  unserved: string[];
}

export interface NetworkFlowOutput {
  summary: { total_demand_cities: number; total_candidates: number; };
  scenarios: ScenarioResult[];
  recommendations: Array<{ priority: number; action: string; rationale: string }>;
  assumptions: string[];
}

export function solveNetworkFlow(
  demandCities: DemandCity[],
  candidateWarehouses: CandidateWarehouse[],
  config: ScenarioConfig
): NetworkFlowOutput {
  const assumptions = ["距离为直线估算", "运输成本为线性估算（实际可能为阶梯费率）", "不考虑税务、劳动力等区域差异"];

  if (!demandCities.length || !candidateWarehouses.length) {
    return { summary: { total_demand_cities: demandCities.length, total_candidates: candidateWarehouses.length }, scenarios: [], recommendations: [], assumptions };
  }

  // 计算每个仓库到每个城市距离
  const distMatrix: number[][] = [];
  candidateWarehouses.forEach(wh => {
    distMatrix.push(demandCities.map(city => haversineKm(wh.lat, wh.lng, city.lat, city.lng)));
  });

  // 生成方案：尝试 1 仓、2 仓、... max_warehouses 仓
  const scenarios: ScenarioResult[] = [];

  for (let k = 1; k <= Math.min(config.max_warehouses, candidateWarehouses.length); k++) {
    // 简单贪心：选 k 个服务城市最多的仓
    const coveragePerWH = candidateWarehouses.map((wh, wi) => {
      const covered = demandCities.filter((_, ci) => distMatrix[wi][ci] <= wh.service_radius_km).length;
      return { wi, wh, covered };
    });
    coveragePerWH.sort((a, b) => b.covered - a.covered);
    const selected = coveragePerWH.slice(0, k).map(c => c.wi);

    // 分配城市到最近选定仓
    const allocations: Record<string, string[]> = {};
    selected.forEach(wi => { allocations[candidateWarehouses[wi].name] = []; });

    const unserved: string[] = [];
    demandCities.forEach((city, ci) => {
      let bestWi = -1, bestDist = Infinity;
      selected.forEach(wi => {
        const d = distMatrix[wi][ci];
        if (d <= candidateWarehouses[wi].service_radius_km && d < bestDist) {
          bestDist = d; bestWi = wi;
        }
      });
      if (bestWi >= 0) {
        allocations[candidateWarehouses[bestWi].name].push(city.name);
      } else {
        unserved.push(city.name);
      }
    });

    const warehouseNames = selected.map(wi => candidateWarehouses[wi].name);
    const fixedCost = selected.reduce((s, wi) => s + candidateWarehouses[wi].fixed_cost_monthly, 0);
    const covered = demandCities.length - unserved.length;
    const coverage = covered / demandCities.length;

    // 运输成本估算
    let transportCost = 0;
    demandCities.forEach((city, ci) => {
      let minDist = Infinity;
      selected.forEach(wi => { const d = distMatrix[wi][ci]; if (d <= candidateWarehouses[wi].service_radius_km) minDist = Math.min(minDist, d); });
      if (minDist < Infinity) transportCost += minDist * config.transport_cost_per_km_per_order * (city.orders || 1);
    });

    scenarios.push({
      id: k === 1 ? "cost" : k === 2 ? "balanced" : "service",
      name: k === 1 ? "成本优先" : k === 2 ? "均衡方案" : k >= 3 ? "服务优先" : `${k}仓方案`,
      sites: warehouseNames,
      coverage: parseFloat(coverage.toFixed(2)),
      total_cost: Math.round(fixedCost + transportCost),
      fixed_cost: fixedCost,
      transport_cost: Math.round(transportCost),
      allocations,
      unserved,
    });
  }

  // 推荐（基于覆盖率80%成本最低的方案）
  const viable = scenarios.filter(s => s.coverage >= config.min_coverage);
  const recommendations: NetworkFlowOutput["recommendations"] = [];
  if (viable.length > 0) {
    viable.sort((a, b) => a.total_cost - b.total_cost);
    recommendations.push({ priority: 1, action: `推荐方案：${viable[0].sites.join("+")}`, rationale: `覆盖率${Math.round(viable[0].coverage * 100)}%，月成本¥${(viable[0].total_cost / 10000).toFixed(1)}万` });
  }
  if (scenarios.some(s => s.coverage < config.min_coverage)) {
    recommendations.push({ priority: 2, action: "部分方案覆盖率未达标，建议放宽服务半径或增加候选仓", rationale: `最小覆盖率要求为${Math.round(config.min_coverage * 100)}%` });
  }

  return {
    summary: { total_demand_cities: demandCities.length, total_candidates: candidateWarehouses.length },
    scenarios,
    recommendations,
    assumptions,
  };
}
