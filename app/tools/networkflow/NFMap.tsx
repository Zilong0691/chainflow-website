"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* NetworkFlow 地图面板 — 客户端组件，独立文件供 dynamic import */

const SCENARIOS = {
  balanced: ["芜湖", "开封"],
  service: ["芜湖", "福州", "重庆"],
  cost: ["开封"],
};

// 确定性偏移函数 — 替代 Math.random()
function fixedOffset(index: number, lat: number, lng: number): [number, number] {
  const dLat = ((index * 7 + 3) % 23 - 11) * 0.1;
  const dLng = ((index * 13 + 5) % 31 - 15) * 0.1;
  return [lat + dLat, lng + dLng];
}

interface Site {
  id: string; name: string; lat: number; lng: number;
  selected: boolean; orders: number; util: number;
  avgKm: number; color: string; cities: string[];
}

export default function NFMap({ sites, scenario }: { sites: Site[]; scenario: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  const sel = SCENARIOS[scenario as keyof typeof SCENARIOS] || [];

  // 初始化地图 — 只运行一次
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [32, 113],
      zoom: 5,
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

  // 更新图层
  const updateLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    layersRef.current.forEach(l => map.removeLayer(l));
    layersRef.current = [];

    const isSelected = (name: string) => sel.includes(name);

    sites.forEach((w: Site) => {
      const selected = isSelected(w.name);
      const radius = selected ? 280 : 180;

      const circle = L.circle([w.lat, w.lng], {
        radius: radius * 1000,
        color: w.color,
        weight: selected ? 2 : 0.5,
        opacity: selected ? 0.25 : 0.06,
        fillColor: w.color,
        fillOpacity: selected ? 0.10 : 0.02,
      }).addTo(map);
      layersRef.current.push(circle);

      const size = selected ? 12 : 7;
      const glow = selected ? 8 : 3;
      const icon = L.divIcon({
        html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${w.color};border:2px solid #fff;box-shadow:0 0 ${glow}px ${w.color}"></div>`,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      const marker = L.marker([w.lat, w.lng], { icon }).addTo(map);
      marker.bindTooltip(`${w.name}${selected ? " ✓" : ""}`);
      layersRef.current.push(marker);

      if (selected && w.cities) {
        w.cities.slice(0, 15).forEach((_: string, i: number) => {
          const [clat, clng] = fixedOffset(i, w.lat, w.lng);
          const dot = L.circleMarker([clat, clng], {
            radius: 2,
            color: w.color,
            fillColor: w.color,
            fillOpacity: 0.4,
            weight: 0.5,
          }).addTo(map);
          layersRef.current.push(dot);
        });
      }
    });

    try {
      const allPts = sites.map((w: Site) => [w.lat, w.lng] as L.LatLngTuple);
      if (allPts.length > 0) {
        map.fitBounds(L.latLngBounds(allPts), { padding: [30, 30] });
      }
    } catch { /* 坐标不足 */ }
  }, [sites, scenario, sel]);

  useEffect(() => {
    updateLayers();
  }, [updateLayers]);

  // 布局变化延迟 invalidateSize
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [scenario]);

  return <div ref={containerRef} className="h-full w-full bg-[#0d1512]" />;
}
