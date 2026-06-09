"use client";

import { useState } from "react";

/* NetworkFlow — 完整功能版
   旧 Demo (public/demos/networkflow/index.html) 包含全部交互：
   参数调整 · 重新求解 · 成本拆分 · 城市分配表 · 数学模型 · 地图
   本页面作为 Next.js 外壳嵌入完整 Demo */

const D = {
  summary: { candidates: 5, demandCities: 386 },
  scenarios: [
    { id: "balanced", name: "均衡方案", sites: ["芜湖","开封"], coverage: 0.89, cost: 95000 },
    { id: "service", name: "服务优先", sites: ["芜湖","福州","重庆"], coverage: 0.94, cost: 152000 },
    { id: "cost", name: "成本优先", sites: ["开封"], coverage: 0.72, cost: 45000 },
  ],
};

export default function NetworkFlowPage() {
  const [showExport, setShowExport] = useState(false);

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      {/* 顶栏 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">NetworkFlow</span>
          <span className="text-rice/30">仓网选址评估 · {D.summary.candidates}候选仓 · {D.summary.demandCities}需求城</span>
        </div>
        <div className="flex items-center gap-3 text-rice/45">
          <span>3方案对比</span>
          <button onClick={() => setShowExport(!showExport)}
            className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-gold hover:bg-gold/20 transition">
            导出 JSON
          </button>
        </div>
      </div>

      {/* 完整 Demo iframe */}
      <iframe
        src="/demos/networkflow/"
        title="NetworkFlow 仓网评估"
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
              <p className="text-sm font-medium text-gold">结构化结果</p>
              <button onClick={() => setShowExport(false)} className="text-rice/40 hover:text-rice">✕</button>
            </div>
            <pre className="text-xs text-rice/60 max-h-[60vh] overflow-auto whitespace-pre-wrap">
              {JSON.stringify({ scenarios: D.scenarios, summary: D.summary, exportedAt: new Date().toISOString() }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
