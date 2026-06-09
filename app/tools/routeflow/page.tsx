"use client";

import { useState } from "react";
import ValidatePanel from "./ValidatePanel";
import OutputPanel from "./OutputPanel";

/* RouteFlow — 短途配送排线助手
   Tab 1: 完整 Demo（iframe 嵌入旧版调度工作台）
   Tab 2: 上传数据（JSON校验 + 错误反馈）
   Tab 3: 结构化输出（对齐 output.schema.json） */

const TABS = [
  { key: "demo", label: "🗺 Demo 示例" },
  { key: "upload", label: "📥 上传数据" },
  { key: "output", label: "📊 结构化输出" },
] as const;

export default function RouteFlowPage() {
  const [tab, setTab] = useState<string>("demo");
  const [validData, setValidData] = useState<any>(null);

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      {/* 顶栏 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">RouteFlow</span>
          <span className="text-rice/30">短途配送排线助手 · v0.1.0</span>
        </div>
        <div className="flex items-center gap-3 text-rice/45">
          {validData && <span className="text-green-400/60">✓ 数据就绪</span>}
          <span className="text-rice/30">module: routeflow</span>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex border-b border-rice/10 text-xs shrink-0">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 transition ${tab === t.key ? "bg-gold/15 text-gold border-b-2 border-gold" : "text-rice/50 hover:text-rice/80"}`}>
            {t.label}
          </button>
        ))}
        {validData && tab !== "output" && (
          <button onClick={() => setTab("output")}
            className="ml-auto px-3 py-2 text-gold/60 hover:text-gold">
            查看结构化输出 →
          </button>
        )}
      </div>

      {/* 内容区 */}
      {tab === "demo" && (
        <iframe
          src="/demos/routeflow/index.html"
          title="RouteFlow 调度工作台"
          className="flex-1 w-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      )}

      {tab === "upload" && (
        <div className="flex-1 overflow-hidden">
          <ValidatePanel onValid={(data) => setValidData(data)} />
        </div>
      )}

      {tab === "output" && (
        <div className="flex-1 overflow-hidden">
          {validData ? (
            <OutputPanel data={validData} />
          ) : (
            <div className="flex items-center justify-center h-full text-rice/25 text-sm">
              请先在「上传数据」中通过校验
            </div>
          )}
        </div>
      )}
    </main>
  );
}
