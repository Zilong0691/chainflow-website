"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================
   RouteFlow Next.js 重写 — 阶段 1 MVP
   替代 WorkBuddy 生成的 2100 行 HTML
   ============================================ */

// 模拟数据（从预计算结果中提取的结构化数据）
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
      {/* 顶栏 */}
      <TopBar summary={DEMO_DATA.summary} onExport={() => setShowExport(!showExport)} />

      {/* 主体 */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* 地图 */}
        <div className="flex-1 min-h-0 lg:min-h-0 relative">
          <MapPanel routes={filteredRoutes} selectedRoute={selectedRoute} />
        </div>

        {/* 侧栏 */}
        <div className="flex flex-col border-t border-rice/10 bg-[#0b100d] lg:w-[420px] lg:border-l lg:border-t-0">
          {/* 筛选 */}
          <div className="flex gap-2 border-b border-rice/10 px-3 py-2 text-xs">
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
              className="rounded border border-rice/10 bg-graphite px-2 py-1 text-rice/70">
              <option value="all">全部车型</option>
              <option value="金杯">金杯</option>
              <option value="4.2米">4.2米</option>
            </select>
            <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}
              className="rounded border border-rice/10 bg-graphite px-2 py-1 text-rice/70 flex-1">
              <option value="all">全部路线 ({DEMO_DATA.routes.length})</option>
              {DEMO_DATA.routes.map(r => (
                <option key={r.id} value={r.id}>{r.id} — {r.vehicle} ({r.stops}站 {r.distanceKm}km)</option>
              ))}
            </select>
          </div>

          {/* 路线列表 */}
          <div className="flex-1 overflow-y-auto">
            {filteredRoutes.map(r => (
              <div key={r.id}
                onClick={() => setSelectedRoute(selectedRoute === r.id ? "all" : r.id)}
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

          {/* 异常摘要 */}
          <div className="border-t border-rice/10 px-3 py-2 text-xs">
            <p className="font-medium text-gold/70 mb-1">异常处置建议</p>
            {DEMO_DATA.exceptions.map((e,i) => (
              <div key={i} className="mt-1 rounded border border-rice/10 bg-rice/[0.03] px-2 py-1.5 text-rice/55 leading-relaxed">
                <span className="text-gold/60">{e.vehicleId}</span> — {e.desc}<br/>
                <span className="text-rice/35">建议: {e.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* JSON 导出弹窗 */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExport(false)}>
          <div className="max-h-[80vh] w-[90vw] max-w-2xl overflow-auto rounded-xl border border-rice/10 bg-graphite p-4" onClick={e => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gold">结构化结果 (JSON)</p>
              <button onClick={() => setShowExport(false)} className="text-rice/40 hover:text-rice">✕</button>
            </div>
            <pre className="text-xs text-rice/60 overflow-auto max-h-[60vh] whitespace-pre-wrap">
              {JSON.stringify({ ...DEMO_DATA, exportedAt: new Date().toISOString() }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---- 顶栏 ---- */
function TopBar({ summary, onExport }: { summary: any; onExport: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
      <div className="flex items-center gap-3">
        <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
        <span className="font-semibold text-rice">RouteFlow</span>
        <span className="text-rice/30">短途配送排线</span>
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

/* ---- 地图面板 ---- */
function MapPanel({ routes, selectedRoute }: { routes: any[]; selectedRoute: string }) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<any[]>([]);

  const initMap = useCallback(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [31.23, 121.47], zoom: 12,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 动态加载 Leaflet
    if (!(window as any).L) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        initMap();
        updateLayers();
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const updateLayers = useCallback(() => {
    const L = (window as any).L;
    const map = mapRef.current;
    if (!L || !map) return;

    // 清除旧图层
    layersRef.current.forEach((l: any) => map.removeLayer(l));
    layersRef.current = [];

    // 画路线
    routes.forEach(r => {
      const isSelected = selectedRoute === "all" || selectedRoute === r.id;
      const opacity = isSelected ? 0.9 : 0.25;
      const weight = isSelected ? 4 : 1.5;

      const line = L.polyline(r.coords, {
        color: r.color, weight, opacity,
        dashArray: r.status === "review" ? "8 4" : undefined
      }).addTo(map);
      layersRef.current.push(line);

      if (isSelected && r.coords.length > 0) {
        // 起点标记
        const depotIcon = L.divIcon({ html: '<div style="background:#f2c76a;width:10px;height:10px;border-radius:50%;border:2px solid #fff"></div>', className: "", iconSize: [10,10], iconAnchor: [5,5] });
        L.marker(r.coords[0], { icon: depotIcon }).addTo(map).bindTooltip("配送中心", { permanent: false });
        layersRef.current.push(L.marker(r.coords[0], { icon: depotIcon }).addTo(map));

        // 站点标记
        r.coords.slice(1, -1).forEach((c: number[], i: number) => {
          const dot = L.circleMarker([c[0], c[1]], {
            radius: 3, color: r.color, fillColor: r.color, fillOpacity: 0.7, weight: 1
          }).addTo(map);
          dot.bindTooltip(`#${i + 1}`, { permanent: false });
          layersRef.current.push(dot);
        });

        // 终点
        const last = r.coords[r.coords.length - 1];
        const endIcon = L.divIcon({ html: '<div style="background:#d7b15d;width:8px;height:8px;border-radius:50%;border:2px solid #fff"></div>', className: "", iconSize: [8,8], iconAnchor: [4,4] });
        L.marker(last, { icon: endIcon }).addTo(map);
        layersRef.current.push(L.marker(last, { icon: endIcon }).addTo(map));
      }

      // 绑定点击
      line.on("click", () => {
        if (selectedRoute !== "all") return;
        // 可扩展：点击路线高亮
      });
    });

    // 自适应视图
    if (routes.length > 0) {
      try {
        const allPts = routes.flatMap((r: any) => r.coords);
        if (allPts.length > 0) {
          const bounds = L.latLngBounds(allPts);
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      } catch(e) {}
    }
  }, [routes, selectedRoute]);

  useEffect(() => {
    if (mapRef.current && (window as any).L) {
      updateLayers();
    }
  }, [routes, selectedRoute, updateLayers]);

  return <div ref={mapContainerRef} className="h-full w-full bg-[#0d1512]" />;
}
