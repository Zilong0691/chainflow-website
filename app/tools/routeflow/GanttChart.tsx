"use client";

import { useState } from "react";
import type { DriverWorkload } from "./data";

/* 作业甘特图 — 基于 SVG 的简化版
   旧 Demo 包含完整 Canvas 甘特图，本组件为 React 重写 */

interface GanttProps {
  drivers: DriverWorkload[];
}

export default function GanttChart({ drivers }: GanttProps) {
  const [visible, setVisible] = useState(true);
  const [workStart] = useState(360); // 6:00 = 360 minutes

  // 按工作时长降序排列
  const sorted = [...drivers].sort((a, b) => b.total_work_min - a.total_work_min);

  const maxEnd = Math.max(...sorted.map(d => workStart + d.total_work_min), 1440);
  const totalMin = maxEnd - workStart;
  const tickInterval = totalMin > 720 ? 120 : 60;

  // 时间刻度
  const ticks: number[] = [];
  for (let t = 0; t <= totalMin; t += tickInterval) ticks.push(workStart + t);

  // 颜色（基于索引的 HSL 循环）
  const colorFor = (i: number) => `hsl(${(i * 360) / sorted.length}, 60%, 50%)`;

  return (
    <div className="border-t border-rice/10 mt-2">
      <h3 className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-rice/80 cursor-pointer"
        onClick={() => setVisible(!visible)}>
        📊 作业甘特图（27辆实车）
        <span className="text-rice/30">{visible ? "收起 ▲" : "展开 ▼"}</span>
      </h3>

      {visible && (
        <div className="overflow-x-auto px-3 pb-3">
          <div style={{ minWidth: 700 }}>
            {/* 时间轴 */}
            <div className="flex border-b border-rice/10 pb-1 mb-1 text-rice/30" style={{ fontSize: 10 }}>
              <div style={{ width: 110, flexShrink: 0 }}>实车</div>
              <div className="flex-1 relative" style={{ height: 16 }}>
                {ticks.map(t => {
                  const h = Math.floor(t / 60), m = t % 60;
                  return (
                    <span key={t} className="absolute" style={{ left: `${((t - workStart) / totalMin) * 100}%`, transform: "translateX(-50%)" }}>
                      {h}:{m.toString().padStart(2, "0")}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 车辆行 */}
            {sorted.map((d, i) => {
              const left = 0; // 从 workStart 开始
              const width = Math.min((d.total_work_min / totalMin) * 100, 100);
              const color = colorFor(i);
              const workHours = (d.total_work_min / 60).toFixed(1);

              return (
                <div key={d.name} className="flex items-center mb-0.5 hover:bg-rice/[0.04] rounded" style={{ height: 24 }}>
                  {/* 标签 */}
                  <div className="text-rice/50" style={{ width: 110, flexShrink: 0, fontSize: 10, textAlign: "right", paddingRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {d.name}
                  </div>
                  {/* 甘特条 */}
                  <div className="flex-1 relative" style={{ height: "100%" }}>
                    <div
                      className="absolute rounded-sm flex items-center px-1"
                      style={{
                        left: `${left}%`, width: `${width}%`,
                        top: 3, bottom: 3,
                        background: color,
                        opacity: 0.85,
                        minWidth: d.total_work_min < 30 ? 4 : 0,
                      }}
                    >
                      <span className="text-white font-semibold truncate" style={{ fontSize: 9, textShadow: "0 0 2px rgba(0,0,0,0.5)" }}>
                        {workHours}h · {d.total_stops}站 · {d.total_dist_km}km
                        {d.num_routes > 1 ? ` · ${d.num_routes}趟` : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-rice/25 mt-2" style={{ fontSize: 10 }}>
            横轴=时间 · 色条长度=工作时长 · 颜色区分实车
          </div>
        </div>
      )}
    </div>
  );
}
