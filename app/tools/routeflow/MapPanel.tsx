"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* RouteFlow 地图面板 — 客户端组件，独立文件供 dynamic import */

export default function MapPanel({ routes, selectedRoute }: {
  routes: any[];
  selectedRoute: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  // 初始化地图 — 只运行一次
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [31.23, 121.47],
      zoom: 12,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.remove();
      mapRef.current = null;
      layersRef.current = [];
    };
  }, []);

  // 更新图层 — 数据变化时只更新图层
  const updateLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    layersRef.current.forEach(l => map.removeLayer(l));
    layersRef.current = [];

    if (routes.length === 0) return;

    const allPts: L.LatLngTuple[] = [];

    routes.forEach((r: any) => {
      const isSelected = selectedRoute === "all" || selectedRoute === r.id;
      const opacity = isSelected ? 0.9 : 0.2;
      const weight = isSelected ? 4 : 1.5;

      r.coords.forEach((c: number[]) => allPts.push([c[0], c[1]] as L.LatLngTuple));

      const line = L.polyline(r.coords as L.LatLngTuple[], {
        color: r.color, weight, opacity,
        dashArray: r.status === "review" ? "8 4" : undefined,
      }).addTo(map);
      layersRef.current.push(line);

      if (isSelected && r.coords.length > 0) {
        const depotIcon = L.divIcon({
          html: '<div style="background:#f2c76a;width:10px;height:10px;border-radius:50%;border:2px solid #fff"></div>',
          className: "", iconSize: [10, 10], iconAnchor: [5, 5],
        });
        L.marker(r.coords[0] as L.LatLngTuple, { icon: depotIcon }).addTo(map).bindTooltip("配送中心");

        r.coords.slice(1, -1).forEach((c: number[], i: number) => {
          const dot = L.circleMarker([c[0], c[1]], {
            radius: 3, color: r.color, fillColor: r.color, fillOpacity: 0.7, weight: 1,
          }).addTo(map);
          dot.bindTooltip(`#${i + 1}`);
          layersRef.current.push(dot);
        });

        const last = r.coords[r.coords.length - 1];
        const endIcon = L.divIcon({
          html: '<div style="background:#d7b15d;width:8px;height:8px;border-radius:50%;border:2px solid #fff"></div>',
          className: "", iconSize: [8, 8], iconAnchor: [4, 4],
        });
        L.marker(last as L.LatLngTuple, { icon: endIcon }).addTo(map);
      }
    });

    if (allPts.length > 0) {
      try {
        map.fitBounds(L.latLngBounds(allPts), { padding: [20, 20] });
      } catch { /* 坐标不足时忽略 */ }
    }
  }, [routes, selectedRoute]);

  useEffect(() => {
    updateLayers();
  }, [updateLayers]);

  // 布局变化时触发 invalidateSize
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [routes.length]);

  return <div ref={containerRef} className="h-full w-full bg-[#0d1512]" />;
}
