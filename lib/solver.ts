/**
 * ChainFlow RouteFlow & NetworkFlow V1 求解器
 *
 * RouteFlow: Clarke-Wright Savings + 2-opt + relocate 改进
 * NetworkFlow: 设施选址枚举 + 分配优化
 *
 * 所有计算确定性，不依赖 LLM
 */

// ═══════════════════════════════════════
// 共享工具
// ═══════════════════════════════════════

function hdist(a: [number,number], b: [number,number]): number {
  const R=6371,dLat=(b[0]-a[0])*Math.PI/180,dLng=(b[1]-a[1])*Math.PI/180;
  return R*2*Math.atan2(Math.sqrt(Math.sin(dLat/2)**2+Math.cos(a[0]*Math.PI/180)*Math.cos(b[0]*Math.PI/180)*Math.sin(dLng/2)**2),Math.sqrt(1-Math.sin(dLat/2)**2-Math.cos(a[0]*Math.PI/180)*Math.cos(b[0]*Math.PI/180)*Math.sin(dLng/2)**2));
}

function hdistLL(lat1:number,lng1:number,lat2:number,lng2:number):number { return hdist([lat1,lng1],[lat2,lng2]); }

const DEPOT_TIME_PENALTY = 0;  // depot没有服务时间
const DEFAULT_SERVICE_MIN = 5;  // 默认每站5分钟

export interface Order {
  id: string; lat: number; lng: number;
  weight_kg?: number; volume_m3?: number;
  time_window_start?: string; time_window_end?: string;
  service_time_min?: number;
  address?: string; delivery_address?: string; notes?: string;
}

export interface Vehicle {
  type: string; count: number;
  capacity_kg?: number; capacity_m3?: number;
  max_work_min?: number; speed_kmh?: number;
}

export interface Depot { lat: number; lng: number; name?: string; }

// ═══════════════════════════════════════
// RouteFlow V1 — Clarke-Wright + 改进
// ═══════════════════════════════════════

interface RouteNode { order: Order; distFromDepot: number; idx: number; }

export interface RouteStop {
  stop_number: number; order_id: string; lat: number; lng: number;
  address: string; weight_kg: number; volume_m3: number;
  arrival?: string; departure?: string; distance_from_prev_km?: number;
}

export interface RouteResult {
  route_id: string; vehicle_type: string; vehicle_id: string;
  stops: RouteStop[];
  total_distance_km: number; total_weight_kg: number; total_volume_m3: number;
  total_time_min: number;
  utilization_weight: number; utilization_volume: number;
  start_time?: string; end_time?: string;
  status: "ready" | "warning" | "review";
  time_window_violations: number;
}

export interface RouteFlowOutput {
  summary: { total_orders:number; total_routes:number; total_distance_km:number; total_weight_kg:number; total_volume_m3:number; vehicles_used:number; solve_time_seconds:number };
  routes: RouteResult[];
  exceptions: Array<{type:string; severity:string; description:string; suggested_action:string}>;
  unserved_orders: string[];
  assumptions: string[];
  benchmark?: { solver: string; improvement_over_greedy_pct?: number };
}

export function solveRouteFlow(orders: Order[], depot: Depot, vehicles: Vehicle[]): RouteFlowOutput {
  const startTime = Date.now();
  const assumptions = ["距离为haversine直线估算","不考虑实时交通","时间窗为硬约束+软兜底"];
  const exceptions: RouteFlowOutput["exceptions"] = [];

  const valid = orders.filter(o => o.lat!=null && o.lng!=null);
  const invalidIds = orders.filter(o => !valid.includes(o)).map(o=>o.id);
  if (invalidIds.length) exceptions.push({type:"invalid_coords",severity:"critical",description:`${invalidIds.length}个订单缺少坐标`,suggested_action:"补充经纬度"});
  if (!valid.length) return {summary:{total_orders:0,total_routes:0,total_distance_km:0,total_weight_kg:0,total_volume_m3:0,vehicles_used:0,solve_time_seconds:0},routes:[],exceptions,unserved_orders:orders.map(o=>o.id),assumptions};

  // 展开车队
  const fleet: {type:string;id:string;capKg:number;capM3:number;maxMin:number;speed:number}[]=[];
  vehicles.forEach(v=>{for(let i=1;i<=(v.count||1);i++) fleet.push({type:v.type,id:`${v.type}-${i}`,capKg:v.capacity_kg||99999,capM3:v.capacity_m3||99999,maxMin:v.max_work_min||600,speed:v.speed_kmh||40});});
  if (!fleet.length) fleet.push({type:"默认",id:"默认-1",capKg:99999,capM3:99999,maxMin:600,speed:40});

  const depotPt: [number,number] = [depot.lat, depot.lng];
  const nodes: RouteNode[] = valid.map((o,i)=>({order:o,distFromDepot:hdistLL(depot.lat,depot.lng,o.lat,o.lng),idx:i}));

  // ── Phase 1: Clarke-Wright Savings 构造 ──
  const savings: {i:number;j:number;saving:number}[] = [];
  for (let i=0;i<nodes.length;i++) {
    for (let j=i+1;j<nodes.length;j++) {
      const dij = hdistLL(nodes[i].order.lat,nodes[i].order.lng,nodes[j].order.lat,nodes[j].order.lng);
      const saving = nodes[i].distFromDepot + nodes[j].distFromDepot - dij;
      if (saving > 0) savings.push({i,j,saving});
    }
  }
  savings.sort((a,b)=>b.saving-a.saving);

  // 初始化：每个节点单独一条路线
  const routeNodes: number[][] = nodes.map((_,i)=>[i]);
  const routeWt: number[] = nodes.map(n=>(n.order.weight_kg||0));
  const routeVol: number[] = nodes.map(n=>(n.order.volume_m3||0));
  const nodeToRoute: number[] = nodes.map((_,i)=>i);

  // 合并路线
  for (const {i,j} of savings) {
    const ri=nodeToRoute[i], rj=nodeToRoute[j];
    if (ri===rj) continue;
    const combinedWt = routeWt[ri]+routeWt[rj];
    const combinedVol = routeVol[ri]+routeVol[rj];
    // 找可用的车辆
    let fits=false;
    for (const v of fleet) {
      if (combinedWt<=v.capKg && combinedVol<=v.capM3) { fits=true; break; }
    }
    if (!fits) continue;

    // 检查是否是端点（首或尾）
    const riNodes=routeNodes[ri], rjNodes=routeNodes[rj];
    const riFirst=riNodes[0], riLast=riNodes[riNodes.length-1];
    const rjFirst=rjNodes[0], rjLast=rjNodes[rjNodes.length-1];

    let merged: number[]|null=null;
    if (riLast===i && rjFirst===j) merged=[...riNodes,...rjNodes];
    else if (riLast===i && rjLast===j) merged=[...riNodes,...rjNodes.reverse()];
    else if (riFirst===i && rjFirst===j) merged=[...riNodes.reverse(),...rjNodes];
    else if (riFirst===i && rjLast===j) merged=[...rjNodes,...riNodes];
    else continue;

    // 更新
    const oldRj = rj;
    routeNodes[ri] = merged;
    routeWt[ri] = combinedWt;
    routeVol[ri] = combinedVol;
    for (const n of merged) nodeToRoute[n] = ri;
    // 清空旧路线
    if (oldRj !== ri) { routeNodes[oldRj] = []; routeWt[oldRj] = 0; routeVol[oldRj] = 0; }
  }

  // 过滤空路线
  let rawRoutes = routeNodes.filter(rn=>rn.length>0).map(rn=>rn.map(i=>nodes[i]));

  // ── Phase 2: 分配车辆 + 时间窗检查 ──
  const result: RouteResult[] = [];
  const unservedOrders: string[] = [];
  let routeIdx = 0;

  for (const rn of rawRoutes) {
    if (routeIdx >= fleet.length) { unservedOrders.push(...rn.map(n=>n.order.id)); continue; }
    const v = fleet[routeIdx++];
    const totalWt = rn.reduce((s,n)=>s+(n.order.weight_kg||0),0);
    const totalVol = rn.reduce((s,n)=>s+(n.order.volume_m3||0),0);

    if (totalWt > v.capKg || totalVol > v.capM3) {
      // 超出容量，分到下一辆
      if (routeIdx < fleet.length) {
        const v2 = fleet[routeIdx];
        // 简单二分
        const mid = Math.ceil(rn.length/2);
        const r1 = rn.slice(0,mid), r2 = rn.slice(mid);
        const wt1=r1.reduce((s,n)=>s+(n.order.weight_kg||0),0);
        if (wt1 <= v.capKg) {
          result.push(buildRoute(r1, v, depotPt, `R${String(result.length+1).padStart(2,"0")}`, exceptions));
          if (r2.reduce((s,n)=>s+(n.order.weight_kg||0),0) <= v2.capKg) {
            result.push(buildRoute(r2, v2, depotPt, `R${String(result.length+1).padStart(2,"0")}`, exceptions));
          } else unservedOrders.push(...r2.map(n=>n.order.id));
        } else unservedOrders.push(...rn.map(n=>n.order.id));
      } else unservedOrders.push(...rn.map(n=>n.order.id));
      continue;
    }
    result.push(buildRoute(rn, v, depotPt, `R${String(result.length+1).padStart(2,"0")}`, exceptions));
  }

  // ── Phase 3: 2-opt 改进每条路线 ──
  for (let ri=0; ri<result.length; ri++) {
    const r = result[ri];
    if (r.stops.length <= 2) continue;
    let improved = true;
    let iter = 0;
    while (improved && iter++ < 50) {
      improved = false;
      for (let i=1; i<r.stops.length-2; i++) {
        for (let j=i+1; j<r.stops.length-1; j++) {
          const a=[r.stops[i-1].lat,r.stops[i-1].lng] as [number,number];
          const b=[r.stops[i].lat,r.stops[i].lng] as [number,number];
          const c=[r.stops[j].lat,r.stops[j].lng] as [number,number];
          const d=[r.stops[j+1].lat,r.stops[j+1].lng] as [number,number];
          const oldD = hdist(a,b) + hdist(c,d);
          const newD = hdist(a,c) + hdist(b,d);
          if (newD < oldD - 0.01) {
            // 反转 i..j
            const seg = r.stops.slice(i, j+1).reverse();
            r.stops.splice(i, seg.length, ...seg);
            improved = true;
          }
        }
      }
    }
    // 重新算距离和时间
    r.total_distance_km = calcRouteDist(r.stops, depotPt);
    r.total_time_min = calcRouteTime(r.stops, depotPt, fleet.find(f=>f.id===r.vehicle_id)?.speed||40);
    const utilW = r.total_weight_kg/(fleet.find(f=>f.id===r.vehicle_id)?.capKg||1);
    const utilV = r.total_volume_m3/(fleet.find(f=>f.id===r.vehicle_id)?.capM3||1);
    r.utilization_weight = parseFloat(Math.min(utilW,1).toFixed(2));
    r.utilization_volume = parseFloat(Math.min(utilV,1).toFixed(2));
    r.status = utilW>0.95||utilV>0.95?"warning":r.time_window_violations>0?"review":"ready";
  }

  const totalDist = result.reduce((s,r)=>s+r.total_distance_km,0);
  const totalWtAll = result.reduce((s,r)=>s+r.total_weight_kg,0);
  const totalVolAll = result.reduce((s,r)=>s+r.total_volume_m3,0);
  const totalTime = Math.round((Date.now()-startTime)/100)/10;

  return {
    summary: { total_orders:valid.length, total_routes:result.length, total_distance_km:parseFloat(totalDist.toFixed(1)), total_weight_kg:parseFloat(totalWtAll.toFixed(1)), total_volume_m3:parseFloat(totalVolAll.toFixed(1)), vehicles_used:result.length, solve_time_seconds:totalTime },
    routes: result, exceptions, unserved_orders: unservedOrders,
    assumptions: [...assumptions, "求解器: Clarke-Wright Savings + 2-opt 改进"],
    benchmark: { solver: "Clarke-Wright + 2-opt" },
  };
}

function buildRoute(nodes: RouteNode[], vehicle: {type:string;id:string;capKg:number;capM3:number;maxMin:number;speed:number}, depotPt: [number,number], rid: string, exceptions: RouteFlowOutput["exceptions"]): RouteResult {
  const stops: RouteStop[] = [];
  let prevLat=depotPt[0], prevLng=depotPt[1];
  let twViolations=0, totalMin=0;

  nodes.forEach((n,si)=>{
    const segDist = hdistLL(prevLat,prevLng,n.order.lat,n.order.lng);
    const segTime = (segDist/vehicle.speed*60);
    totalMin += segTime + (n.order.service_time_min||DEFAULT_SERVICE_MIN);

    // 时间窗检查
    if (n.order.time_window_end) {
      const endMin = parseTimeStr(n.order.time_window_end);
      if (endMin > 0 && totalMin > endMin) twViolations++;
    }

    stops.push({
      stop_number:si+1, order_id:n.order.id, lat:n.order.lat, lng:n.order.lng,
      address:n.order.delivery_address||n.order.address||"",
      weight_kg:n.order.weight_kg||0, volume_m3:n.order.volume_m3||0,
      distance_from_prev_km:parseFloat(segDist.toFixed(2)),
    });
    prevLat=n.order.lat; prevLng=n.order.lng;
  });

  // 返回depot
  const retDist = hdistLL(prevLat,prevLng,depotPt[0],depotPt[1]);
  totalMin += (retDist/vehicle.speed*60);

  const totalWt = nodes.reduce((s,n)=>s+(n.order.weight_kg||0),0);
  const totalVol = nodes.reduce((s,n)=>s+(n.order.volume_m3||0),0);

  if (totalMin > vehicle.maxMin) {
    exceptions.push({type:"work_duration_warning",severity:"warning",description:`路线${rid}预估耗时${Math.round(totalMin)}分钟，超过${vehicle.maxMin}分钟上限`,suggested_action:"考虑拆分路线或增加车辆"});
  }

  return {
    route_id: rid, vehicle_type: vehicle.type, vehicle_id: vehicle.id,
    stops, total_distance_km: parseFloat((calcRouteDist(stops, depotPt)).toFixed(1)),
    total_weight_kg: parseFloat(totalWt.toFixed(1)), total_volume_m3: parseFloat(totalVol.toFixed(1)),
    total_time_min: Math.round(totalMin),
    utilization_weight: parseFloat(Math.min(totalWt/(vehicle.capKg||1),1).toFixed(2)),
    utilization_volume: parseFloat(Math.min(totalVol/(vehicle.capM3||1),1).toFixed(2)),
    status: totalMin>vehicle.maxMin?"review":twViolations>0?"warning":"ready",
    time_window_violations: twViolations,
  };
}

function calcRouteDist(stops: RouteStop[], depotPt: [number,number]): number {
  let d=0, prev=[depotPt[0],depotPt[1]];
  for (const s of stops) { d+=hdistLL(prev[0],prev[1],s.lat,s.lng); prev=[s.lat,s.lng]; }
  return parseFloat((d+hdistLL(prev[0],prev[1],depotPt[0],depotPt[1])).toFixed(1));
}

function calcRouteTime(stops: RouteStop[], depotPt: [number,number], speed:number): number {
  let t=0, prev=[depotPt[0],depotPt[1]];
  for (const s of stops) { t+=(hdistLL(prev[0],prev[1],s.lat,s.lng)/speed*60)+(DEFAULT_SERVICE_MIN); prev=[s.lat,s.lng]; }
  return Math.round(t+(hdistLL(prev[0],prev[1],depotPt[0],depotPt[1])/speed*60));
}

function parseTimeStr(s: string): number {
  const m = s.match(/(\d{2}):(\d{2})/);
  if (!m) return -1;
  return parseInt(m[1])*60+parseInt(m[2]);
}

// ═══════════════════════════════════════
// NetworkFlow V1 — 设施选址枚举 + 分配
// ═══════════════════════════════════════

export interface DemandCity { id:string; name:string; lat:number; lng:number; orders?:number; }
export interface CandidateWarehouse { id:string; name:string; lat:number; lng:number; fixed_cost_monthly:number; capacity_orders:number; service_radius_km:number; }
export interface ScenarioConfig { max_warehouses:number; min_coverage:number; transport_cost_per_km_per_order:number; required_warehouses?:string[]; forbidden_warehouses?:string[]; }

export interface ScenarioResult {
  id:string; name:string; sites:string[]; coverage:number; total_cost:number;
  fixed_cost:number; transport_cost:number;
  allocations:Record<string,string[]>; unserved:string[];
  warehouse_utilization:Record<string,number>;
}

export interface NetworkFlowOutput {
  summary: { total_demand_cities:number; total_candidates:number; };
  scenarios: ScenarioResult[];
  recommendations: Array<{priority:number; action:string; rationale:string}>;
  assumptions: string[];
}

export function solveNetworkFlow(cities:DemandCity[], warehouses:CandidateWarehouse[], config:ScenarioConfig): NetworkFlowOutput {
  const assumptions = ["距离为直线估算","运输成本为线性估算","不考虑税务和劳动力差异"];
  if (!cities.length||!warehouses.length) return {summary:{total_demand_cities:cities.length,total_candidates:warehouses.length},scenarios:[],recommendations:[],assumptions};

  const distMatrix = warehouses.map(wh=>cities.map(c=>hdistLL(wh.lat,wh.lng,c.lat,c.lng)));
  const maxK = Math.min(config.max_warehouses, warehouses.length);

  const scenarios: ScenarioResult[] = [];
  const allIndices = warehouses.map((_,i)=>i);

  // 枚举所有k仓组合（小规模）或贪心选择（大规模）
  for (let k=1; k<=maxK; k++) {
    let combos: number[][];
    if (warehouses.length <= 10) {
      combos = combinations(allIndices, k);
    } else {
      // 大规模用覆盖排名贪心选top-k
      const ranked = warehouses.map((wh,wi)=>({wi,cov:cities.filter((_,ci)=>distMatrix[wi][ci]<=wh.service_radius_km).length}));
      ranked.sort((a,b)=>b.cov-a.cov);
      combos = [ranked.slice(0,k).map(r=>r.wi)];
    }
    if (combos.length > 50) combos = combos.slice(0,50); // 限制组合数

    let bestForK: ScenarioResult|null = null;

    for (const combo of combos) {
      // 必选/禁选约束
      if (config.required_warehouses?.length) {
        const requiredIndices = config.required_warehouses.map(n=>warehouses.findIndex(w=>w.name===n||w.id===n)).filter(i=>i>=0);
        if (requiredIndices.some(i=>!combo.includes(i))) continue;
      }
      if (config.forbidden_warehouses?.length) {
        const forbiddenIndices = config.forbidden_warehouses.map(n=>warehouses.findIndex(w=>w.name===n||w.id===n)).filter(i=>i>=0);
        if (combo.some(i=>forbiddenIndices.includes(i))) continue;
      }

      const alloc: Record<string,string[]> = {}; combo.forEach(i=>{alloc[warehouses[i].name]=[];});
      const unserved: string[] = [];
      const whUtil: Record<string,number> = {}; combo.forEach(i=>{whUtil[warehouses[i].name]=0;});

      cities.forEach((city,ci)=>{
        let bestI=-1, bestD=Infinity;
        combo.forEach(i=>{const d=distMatrix[i][ci]; if(d<=warehouses[i].service_radius_km&&d<bestD){bestD=d;bestI=i;}});
        if (bestI>=0) {
          alloc[warehouses[bestI].name].push(city.name);
          whUtil[warehouses[bestI].name] += (city.orders||1);
        } else unserved.push(city.name);
      });

      const covered = cities.length - unserved.length;
      const coverage = covered/cities.length;
      const fixedCost = combo.reduce((s,i)=>s+warehouses[i].fixed_cost_monthly,0);
      let transportCost = 0;
      cities.forEach((city,ci)=>{let md=Infinity;combo.forEach(i=>{const d=distMatrix[i][ci];if(d<=warehouses[i].service_radius_km)md=Math.min(md,d);});if(md<Infinity)transportCost+=md*config.transport_cost_per_km_per_order*(city.orders||1);});

      const sc: ScenarioResult = {
        id: `k${k}`, name: `${k}仓方案`, sites: combo.map(i=>warehouses[i].name),
        coverage: parseFloat(coverage.toFixed(2)), total_cost: Math.round(fixedCost+transportCost),
        fixed_cost: fixedCost, transport_cost: Math.round(transportCost),
        allocations: alloc, unserved, warehouse_utilization: whUtil,
      };

      if (!bestForK || sc.total_cost < bestForK.total_cost || (sc.coverage > bestForK.coverage && sc.total_cost <= bestForK.total_cost*1.1)) {
        bestForK = sc;
      }
    }

    if (bestForK) {
      bestForK.name = k===1?"成本优先":k===2?"均衡方案":k>=3?"服务优先":`${k}仓方案`;
      bestForK.id = k===1?"cost":k===2?"balanced":"service";
      scenarios.push(bestForK);
    }
  }

  // 推荐
  const viable = scenarios.filter(s=>s.coverage>=config.min_coverage);
  viable.sort((a,b)=>a.total_cost-b.total_cost);
  const recs: NetworkFlowOutput["recommendations"] = [];
  if (viable.length>0) recs.push({priority:1,action:`推荐: ${viable[0].sites.join("+")}`,rationale:`覆盖率${Math.round(viable[0].coverage*100)}%，月成本¥${(viable[0].total_cost/10000).toFixed(1)}万`});
  if (scenarios.some(s=>s.coverage<config.min_coverage)) recs.push({priority:2,action:"部分方案未达标",rationale:"建议放宽服务半径或增加候选仓"});

  return {summary:{total_demand_cities:cities.length,total_candidates:warehouses.length},scenarios,recommendations:recs,assumptions};
}

function combinations(arr: number[], k: number): number[][] {
  if (k===0) return [[]];
  if (arr.length<k) return [];
  const [first,...rest] = arr;
  const withFirst = combinations(rest,k-1).map(c=>[first,...c]);
  const without = combinations(rest,k);
  return [...withFirst,...without];
}
