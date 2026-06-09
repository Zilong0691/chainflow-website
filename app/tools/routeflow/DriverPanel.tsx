"use client";

import { useState } from "react";
import type { DriverWorkload } from "./data";

/* 司机任务面板 — 基于 WORKLOAD 数据的可展开卡片 */

interface DriverPanelProps {
  drivers: DriverWorkload[];
}

function formatHours(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h${m}min` : `${h}h`;
}

export default function DriverPanel({ drivers }: DriverPanelProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="border-t border-rice/10 mt-2">
      <h3 className="px-3 py-2 text-xs font-medium text-rice/80">
        📋 司机任务卡片
        <span className="text-rice/30 ml-2" style={{ fontSize: 10 }}>
          点击展开/收起 · 共{drivers.length}位司机
        </span>
      </h3>
      <div className="px-3 pb-3 space-y-1.5 max-h-[600px] overflow-y-auto">
        {drivers.map((d, i) => {
          const hue = (i * 360) / drivers.length;
          const bgColor = `hsl(${hue}, 55%, 45%)`;
          const isOpen = expanded.has(d.name);

          return (
            <div key={d.name} className="rounded-lg overflow-hidden border border-rice/10">
              {/* 卡片头 */}
              <div
                onClick={() => toggle(d.name)}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:opacity-90 transition"
                style={{ background: bgColor }}
              >
                <span className="text-white" style={{ fontSize: 10 }}>{isOpen ? "▼" : "▶"}</span>
                <b className="text-white" style={{ fontSize: 12 }}>{d.name}</b>
                <span className="text-white/80" style={{ fontSize: 10 }}>{d.veh_type}</span>
                <span className="ml-auto text-white/90 rounded-full px-2 py-0.5" style={{ fontSize: 10, background: "rgba(255,255,255,0.2)" }}>
                  {d.num_routes}路线 · {formatHours(d.total_work_min)} · {d.total_stops}站 · {d.total_dist_km}km
                </span>
              </div>

              {/* 详情 */}
              {isOpen && (
                <div className="px-3 py-2 bg-rice/[0.03]" style={{ fontSize: 10 }}>
                  <div className="grid grid-cols-3 gap-2 text-rice/50">
                    <div><span className="text-rice/30">载重:</span> {d.total_load_kg}kg</div>
                    <div><span className="text-rice/30">体积:</span> {d.total_vol_m3}m³</div>
                    <div><span className="text-rice/30">路线编号:</span> {d.route_indices.map(r => `R${r + 1}`).join(", ")}</div>
                  </div>
                  {d.total_work_min > 600 && (
                    <div className="mt-1.5 text-ember/70">
                      ⚠ 工作时长 {formatHours(d.total_work_min)}，超过10小时，建议确认司机排班
                    </div>
                  )}
                  {d.num_routes > 1 && (
                    <div className="mt-1 text-gold/70">
                      🔄 多趟任务（{d.num_routes}条路线），需确认司机接受
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
