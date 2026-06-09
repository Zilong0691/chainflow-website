"use client";

import { useMemo } from "react";

/* 结构化输出面板
   对齐 modules/routeflow/output.schema.json + standards/common-response.schema.json */

interface OutputProps {
  data: any; // 校验通过后的输入数据
}

export default function OutputPanel({ data }: OutputProps) {
  // 用输入数据构造符合 output.schema.json 的结构化输出
  const output = useMemo(() => {
    const input = data.data || data;
    const orders = input.orders || [];
    const vehicles = input.vehicles || [];
    const depot = input.depot || {};

    // 简单分配：按订单顺序均分给车辆
    const totalVehicles = vehicles.reduce((s: number, v: any) => s + (v.count || 0), 0);
    const ordersPerVehicle = Math.ceil(orders.length / Math.max(totalVehicles, 1));

    const routes: any[] = [];
    let orderIdx = 0;
    let totalDist = 0;
    let totalWt = 0;
    let totalVol = 0;

    vehicles.forEach((v: any) => {
      for (let vi = 0; vi < (v.count || 1); vi++) {
        const routeOrders = orders.slice(orderIdx, orderIdx + ordersPerVehicle);
        if (routeOrders.length === 0) break;
        orderIdx += routeOrders.length;

        let routeDist = 0;
        const stops: any[] = [];

        // 配送中心起点
        if (depot.lat && depot.lng && routeOrders.length > 0) {
          const d1 = haversineKm(depot.lat, depot.lng, routeOrders[0].lat, routeOrders[0].lng);
          routeDist += d1;
        }

        routeOrders.forEach((o: any, oi: number) => {
          stops.push({
            stop_number: oi + 1,
            order_id: o.id || `ORD_${oi}`,
            address: o.delivery_address || "",
            lat: o.lat,
            lng: o.lng,
            arrival: "", // 需求解器计算
            departure: "",
            weight_kg: o.weight_kg || 0,
            volume_m3: o.volume_m3 || 0,
          });
          totalWt += (o.weight_kg || 0);
          totalVol += (o.volume_m3 || 0);

          if (oi < routeOrders.length - 1) {
            routeDist += haversineKm(o.lat, o.lng, routeOrders[oi + 1].lat, routeOrders[oi + 1].lng);
          }
        });

        // 回配送中心
        if (depot.lat && depot.lng && routeOrders.length > 0) {
          const last = routeOrders[routeOrders.length - 1];
          routeDist += haversineKm(last.lat, last.lng, depot.lat, depot.lng);
        }
        totalDist += routeDist;

        const routeWt = routeOrders.reduce((s: number, o: any) => s + (o.weight_kg || 0), 0);
        const routeVol = routeOrders.reduce((s: number, o: any) => s + (o.volume_m3 || 0), 0);

        routes.push({
          route_id: `R${String(routes.length + 1).padStart(2, "0")}`,
          vehicle_type: v.type || "未知",
          vehicle_id: `${v.type || "车辆"}-${vi + 1}`,
          stops,
          total_distance_km: parseFloat(routeDist.toFixed(1)),
          total_weight_kg: parseFloat(routeWt.toFixed(1)),
          total_volume_m3: parseFloat(routeVol.toFixed(1)),
          utilization_weight: v.capacity_kg ? parseFloat((routeWt / (v.capacity_kg || 1)).toFixed(2)) : 0,
          utilization_volume: v.capacity_m3 ? parseFloat((routeVol / (v.capacity_m3 || 1)).toFixed(2)) : 0,
          start_time: depot.departure_time || "",
          end_time: "",
          status: (v.capacity_kg && routeWt > v.capacity_kg * 0.95) ? "warning" : "ready" as const,
        });
      }
    });

    const totalCapacity = vehicles.reduce((s: number, v: any) => s + (v.capacity_kg || 0) * (v.count || 0), 0);
    const exceptions: any[] = [];
    if (totalWt > totalCapacity && totalCapacity > 0) {
      exceptions.push({
        type: "capacity_exceeded",
        severity: "critical",
        description: `总货重 ${totalWt}kg 超过车队总容量 ${totalCapacity}kg`,
        suggested_action: "请增加车辆或减少订单",
      });
    }

    return {
      schema_version: "0.1",
      module_id: "routeflow",
      module_version: "0.1.0",
      status: "success",
      generated_at: new Date().toISOString(),
      requires_human_review: true,
      result: {
        summary: {
          total_orders: orders.length,
          total_routes: routes.length,
          total_distance_km: parseFloat(totalDist.toFixed(1)),
          total_weight_kg: parseFloat(totalWt.toFixed(1)),
          total_volume_m3: parseFloat(totalVol.toFixed(1)),
          vehicles_used: routes.length,
        },
        routes,
        exceptions,
        unserved_orders: [],
      },
      warnings: [] as any[],
      assumptions: [
        "距离为直线估算（未使用实际道路）",
        "订单按输入顺序依次分配，未做路径优化",
        "时间窗约束未在本次输出中计算",
        "本输出为演示结构，实际求解需后端 VRP 引擎",
      ],
    };
  }, [data]);

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `routeflow-output-${Date.now()}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const summary = output.result.summary;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-rice/10 text-xs">
        <span className="text-rice/70">📊 结构化输出</span>
        <div className="flex items-center gap-3">
          <span className="text-amber-500/70">⚠ 需人工复核</span>
          <button onClick={downloadJson} className="text-gold/60 hover:text-gold">⬇ 下载 JSON</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* 摘要 */}
        <div className="px-3 py-3 border-b border-rice/10">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <Stat label="总订单" val={summary.total_orders} />
            <Stat label="路线数" val={summary.total_routes} />
            <Stat label="车辆数" val={summary.vehicles_used} />
            <Stat label="总里程" val={`${summary.total_distance_km}km`} />
            <Stat label="总货重" val={`${(summary.total_weight_kg / 1000).toFixed(1)}t`} />
            <Stat label="总体积" val={`${summary.total_volume_m3}m³`} />
          </div>

          {/* 关键假设 */}
          <div className="rounded border border-amber-500/20 bg-amber-500/[0.04] px-2 py-1.5 text-amber-500/70 leading-relaxed">
            <p className="font-medium mb-0.5">⚠ 人工确认事项</p>
            {output.assumptions.map((a: string, i: number) => (
              <p key={i} className="text-rice/40">• {a}</p>
            ))}
          </div>
        </div>

        {/* 路线列表 */}
        <div className="px-3 py-2">
          <p className="text-rice/50 mb-2 text-xs">路线明细</p>
          {output.result.routes.map((r: any, i: number) => (
            <div key={i} className="mb-1.5 rounded border border-rice/10 bg-rice/[0.02] px-2 py-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-rice/70 font-medium">{r.route_id}</span>
                <span className="text-rice/30">{r.vehicle_type} · {r.vehicle_id}</span>
              </div>
              <div className="flex gap-3 text-rice/40" style={{ fontSize: 10 }}>
                <span>{r.stops.length}站</span>
                <span>{r.total_distance_km}km</span>
                <span>{r.total_weight_kg}kg</span>
                <span>载重率 {Math.round(r.utilization_weight * 100)}%</span>
                {r.status === "warning" && <span className="text-gold/60">超容</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, val }: { label: string; val: any }) {
  return (
    <div className="rounded bg-rice/[0.04] p-1.5 text-center">
      <span className="block text-rice font-semibold">{val}</span>
      <span className="text-rice/35">{label}</span>
    </div>
  );
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
