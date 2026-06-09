"use client";

import { useState } from "react";
import { SUMMARY, DRIVERS, EXCEPTIONS } from "./data";

/* RouteFlow — 完整功能版
   旧 Demo (public/demos/routeflow/index.html) 包含全部交互：
   29条路线 · 甘特图 · 司机面板 · 参数调整 · 站点详情
   本页面作为 Next.js 外壳嵌入完整 Demo */

export default function RouteFlowPage() {
  const [showExport, setShowExport] = useState(false);

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      {/* 顶栏 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">RouteFlow</span>
          <span className="text-rice/30">短途配送排线 · {DRIVERS.length}司机 · {SUMMARY.totalRoutes}路线</span>
        </div>
        <div className="flex items-center gap-3 text-rice/45">
          <span>{SUMMARY.totalOrders}单 · {SUMMARY.totalDistanceKm}km</span>
          <button onClick={() => setShowExport(!showExport)}
            className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-gold hover:bg-gold/20 transition">
            导出 JSON
          </button>
        </div>
      </div>

      {/* 完整 Demo iframe */}
      <iframe
        src="/demos/routeflow/"
        title="RouteFlow 调度工作台"
        className="flex-1 w-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin"
      />

      {/* JSON 导出弹窗（补充旧 Demo 没有的功能） */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowExport(false)}>
          <div className="max-h-[80vh] w-[90vw] max-w-2xl overflow-auto rounded-xl border border-rice/10 bg-graphite p-4"
            onClick={e => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gold">结构化结果 (JSON)</p>
              <button onClick={() => setShowExport(false)} className="text-rice/40 hover:text-rice">✕</button>
            </div>
            <pre className="text-xs text-rice/60 overflow-auto max-h-[60vh] whitespace-pre-wrap">
              {JSON.stringify({ summary: SUMMARY, drivers: DRIVERS, exceptions: EXCEPTIONS, exportedAt: new Date().toISOString() }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
