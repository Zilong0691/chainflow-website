"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

/* ============================================
   RouteFlow Next.js 重写 — Preview V0.1
   旧 Demo 为完整功能参考版（public/demos/routeflow/index.html）
   本页面为结构化重写 Preview，功能尚未对等
   ============================================ */

// Leaflet 地图仅在客户端加载（SSR 时跳过）
const MapPanel = dynamic(() => import("./MapPanel"), { ssr: false });

// 固定模拟数据 — 每次刷新结果一致，不包含随机逻辑
const DEMO_DATA = {
  summary: { totalOrders: 801, totalRoutes: 29, physicalVehicles: 27, totalDistanceKm: 1501.97, totalWeightKg: 87969.4, totalVolumeM3: 159.63, solveTimeSec: 112 },
  routes: [
    { id:"R01", vehicle:"金杯-1", type:"金杯", stops:12, distanceKm:21.0, weightKg:580, status:"ready", color:"#f2c76a",
      coords:[[31.2304,121.4737],[31.2400,121.4900],[31.2550,121.5100],[31.2600,121.5200],[31.2500,121.5400],[31.2350,121.5300],[31.2280,121.5100],[31.2200,121.4950],[31.2150,121.4800],[31.2100,121.4700],[31.2050,121.4600],[31.2250,121.4500],[31.2304,121.4737]] },
    { id:"R02", vehicle:"金杯-2", type:"金杯", stops:15, distanceKm:24.5, weightKg:620, status:"ready", color:"#75d4cb",
      coords:[[31.2304,121.4737],[31.2200,121.4400],[31.2100,121.4300],[31.2000,121.4200],[31.1950,121.4100],[31.1900,121.4000],[31.1850,121.3900],[31.1800,121.3800],[31.1900,121.3700],[31.2000,121.3800],[31.2100,121.4000],[31.2200,121.4200],[31.2250,121.4400],[31.2280,121.4550],[31.2300,121.4650],[31.2304,121.4737]] },
    { id:"R03", vehicle:"4.2米-1", type:"4.2米", stops:22, distanceKm:38.2, weightKg:1850, status:"ready", color:"#d7b15d",
      coords:[[31.2304,121.4737],[31.3000,121.5000],[31.3100,121.5200],[31.3200,121.5400],[31.3300,121.5500],[31.3400,121.5400],[31.3500,121.5200],[31.3400,121.5000],[31.3200,121.4800],[31.3000,121.4700],[31.2800,121.4600],[31.2600,121.4500],[31.2400,121.4400],[31.2200,121.4300],[31.2000,121.4200],[31.1800,121.4100],[31.1600,121.4000],[31.1500,121.4200],[31.1700,121.4400],[31.1900,121.4600],[31.2100,121.4700],[31.2200,121.4750],[31.2304,121.4737]] },
    { id:"R04", vehicle:"4.2米-2", type:"4.2米", stops:18, distanceKm:32.1, weightKg:1620, status:"ready", color:"#f2c76a",
      coords:[[31.2304,121.4737],[31.2000,121.5200],[31.1900,121.5400],[31.1800,121.5500],[31.1700,121.5600],[31.1600,121.5500],[31.1550,121.5300],[31.1500,121.5100],[31.1600,121.4900],[31.1700,121.4700],[31.1800,121.4500],[31.1900,121.4400],[31.2000,121.4300],[31.2100,121.4200],[31.2200,121.4300],[31.2250,121.4450],[31.2280,121.4550],[31.2300,121.4650],[31.2304,121.4737]] },
    { id:"R05", vehicle:"金杯-3", type:"金杯", stops:10, distanceKm:18.7, weightKg:490, status:"warning", color:"#f2c76a",
      coords:[[31.2304,121.4737],[31.2500,121.4200],[31.2600,121.4100],[31.2700,121.4000],[31.2800,121.4100],[31.2700,121.4300],[31.2600,121.4500],[31.2500,121.4600],[31.2400,121.4650],[31.2350,121.4700],[31.2304,121.4737]] },
    { id:"R10", vehicle:"4.2米-5", type:"4.2米", stops:28, distanceKm:52.8, weightKg:2120, status:"review", color:"#d7b15d",
      coords:[[31.2304,121.4737],[31.3500,121.4000],[31.3600,121.3800],[31.3700,121.3600],[31.3800,121.3500],[31.3900,121.3600],[31.4000,121.3800],[31.4100,121.4000],[31.4000,121.4200],[31.3800,121.4400],[31.3600,121.4600],[31.3400,121.4700],[31.3200,121.4600],[31.3000,121.4400],[31.2800,121.4200],[31.2600,121.4000],[31.2400,121.3800],[31.2200,121.3700],[31.2000,121.3800],[31.1900,121.3900],[31.1800,121.4100],[31.1900,121.4300],[31.2000,121.4500],[31.2100,121.4600],[31.2150,121.4700],[31.2200,121.4750],[31.2250,121.4700],[31.2280,121.4720],[31.2304,121.4737]] }
  ],
  exceptions: [
    { routeId:"R10", vehicleId:"4.2米-5", type:"work_duration_warning", desc:"工作时长偏长(6h48min)", action:"考虑拆分路线或增加车辆" },
    { routeId:"R05", vehicleId:"金杯-3", type:"capacity_warning", desc:"载重利用率 96%", action:"检查是否有超重订单" }
  ]
};

export default function RouteFlowPage() {
  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showExport, setShowExport] = useState(false);

  const filteredRoutes = DEMO_DATA.routes.filter(r =>
    (selectedRoute === "all" || r.id === selectedRoute) &&
    (selectedType === "all" || r.type === selectedType)
  );

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      <TopBar summary={DEMO_DATA.summary} onExport={() => setShowExport(!showExport)} />
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <div className="flex-1 min-h-0 lg:min-h-0 relative">
          <MapPanel routes={filteredRoutes} selectedRoute={selectedRoute} />
        </div>
        <Sidebar
          routes={filteredRoutes}
          allRoutes={DEMO_DATA.routes}
          exceptions={DEMO_DATA.exceptions}
          selectedType={selectedType}
          selectedRoute={selectedRoute}
          onTypeChange={setSelectedType}
          onRouteSelect={setSelectedRoute}
        />
      </div>
      {showExport && (
        <ExportModal data={DEMO_DATA} onClose={() => setShowExport(false)} />
      )}
    </main>
  );
}

/* ── 顶栏 ── */
function TopBar({ summary, onExport }: { summary: any; onExport: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
      <div className="flex items-center gap-3">
        <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
        <span className="font-semibold text-rice">RouteFlow</span>
        <span className="text-rice/30">短途配送排线 · Preview</span>
      </div>
      <div className="flex items-center gap-3 text-rice/45">
        <span>{summary.totalOrders}单</span>
        <span>{summary.totalRoutes}条路线</span>
        <span>{summary.physicalVehicles}辆实车</span>
        <span>{summary.totalDistanceKm}km</span>
        <button onClick={onExport} className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-gold hover:bg-gold/20 transition">导出 JSON</button>
      </div>
    </div>
  );
}

/* ── 侧栏 ── */
function Sidebar({ routes, allRoutes, exceptions, selectedType, selectedRoute, onTypeChange, onRouteSelect }: {
  routes: any[]; allRoutes: any[]; exceptions: any[];
  selectedType: string; selectedRoute: string;
  onTypeChange: (v: string) => void; onRouteSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col border-t border-rice/10 bg-[#0b100d] lg:w-[420px] lg:border-l lg:border-t-0">
      <div className="flex gap-2 border-b border-rice/10 px-3 py-2 text-xs">
        <select value={selectedType} onChange={e => onTypeChange(e.target.value)}
          className="rounded border border-rice/10 bg-graphite px-2 py-1 text-rice/70">
          <option value="all">全部车型</option>
          <option value="金杯">金杯</option>
          <option value="4.2米">4.2米</option>
        </select>
        <select value={selectedRoute} onChange={e => onRouteSelect(e.target.value)}
          className="rounded border border-rice/10 bg-graphite px-2 py-1 text-rice/70 flex-1">
          <option value="all">全部路线 ({allRoutes.length})</option>
          {allRoutes.map(r => (
            <option key={r.id} value={r.id}>{r.id} — {r.vehicle} ({r.stops}站 {r.distanceKm}km)</option>
          ))}
        </select>
      </div>
      <div className="flex-1 overflow-y-auto">
        {routes.map(r => (
          <div key={r.id}
            onClick={() => onRouteSelect(selectedRoute === r.id ? "all" : r.id)}
            className={`cursor-pointer border-b border-rice/5 px-3 py-2.5 text-xs transition hover:bg-rice/[0.04] ${selectedRoute === r.id ? "bg-gold/10 border-gold/20" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rice">{r.id} · {r.vehicle}</span>
              <span className="text-rice/30">{r.type}</span>
            </div>
            <div className="mt-1 flex gap-3 text-rice/45">
              <span>{r.stops}站</span>
              <span>{r.distanceKm}km</span>
              <span>{r.weightKg}kg</span>
              {r.status === "review" && <span className="text-ember">需复核</span>}
              {r.status === "warning" && <span className="text-gold">关注</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-rice/10 px-3 py-2 text-xs">
        <p className="font-medium text-gold/70 mb-1">异常处置建议</p>
        {exceptions.map((e,i) => (
          <div key={i} className="mt-1 rounded border border-rice/10 bg-rice/[0.03] px-2 py-1.5 text-rice/55 leading-relaxed">
            <span className="text-gold/60">{e.vehicleId}</span> — {e.desc}<br/>
            <span className="text-rice/35">建议: {e.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── JSON 导出弹窗 ── */
function ExportModal({ data, onClose }: { data: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[80vh] w-[90vw] max-w-2xl overflow-auto rounded-xl border border-rice/10 bg-graphite p-4" onClick={e => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gold">结构化结果 (JSON)</p>
          <button onClick={onClose} className="text-rice/40 hover:text-rice">✕</button>
        </div>
        <pre className="text-xs text-rice/60 overflow-auto max-h-[60vh] whitespace-pre-wrap">
          {JSON.stringify({ ...data, exportedAt: new Date().toISOString() }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
