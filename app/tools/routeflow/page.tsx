"use client";

import { useState, useCallback } from "react";
import KeyManager, { loadConfig } from "./KeyManager";

/* RouteFlow — AI 排线工作台 v0.2.0
   管道：原始输入 → LLM解析 → LLM排线 → LLM解读 → 结构化输出
   数据隐私：所有业务数据仅在浏览器本地处理，不上传 ChainFlow 服务器 */

type Step = { id: string; label: string; status: "pending" | "loading" | "done" | "error"; content?: string; error?: string };

export default function RouteFlowPage() {
  const [tab, setTab] = useState<"pipeline" | "demo">("pipeline");
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<Step[]>([
    { id: "parse", label: "LLM 解析数据", status: "pending" },
    { id: "route", label: "LLM 生成路线", status: "pending" },
    { id: "explain", label: "LLM 业务解读", status: "pending" },
  ]);
  const [output, setOutput] = useState<any>(null);
  const [running, setRunning] = useState(false);

  const updateStep = (id: string, update: Partial<Step>) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, ...update } : s));
  };

  const callLLM = async (action: string, data: any) => {
    const config = loadConfig();
    const res = await fetch("/api/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, input: data, userKey: config?.apiKey }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "请求失败");
    }
    return res.json();
  };

  const runPipeline = useCallback(async () => {
    if (!input.trim() || running) return;
    setRunning(true);
    setSteps(prev => prev.map(s => ({ ...s, status: "pending" as const, content: undefined, error: undefined })));
    setOutput(null);

    try {
      updateStep("parse", { status: "loading" });
      const parsed = await callLLM("parse", input);
      updateStep("parse", { status: "done", content: JSON.stringify(parsed.parsed, null, 2) });

      updateStep("route", { status: "loading" });
      const routed = await callLLM("route", parsed.parsed);
      updateStep("route", { status: "done", content: JSON.stringify(routed.routes, null, 2) });

      updateStep("explain", { status: "loading" });
      const explained = await callLLM("explain", routed.routes);
      updateStep("explain", { status: "done", content: explained.explanation });

      setOutput({ parsed: parsed.parsed, routes: routed.routes, explanation: explained.explanation });
    } catch (e: any) {
      const failedStep = steps.find(s => s.status === "loading");
      if (failedStep) updateStep(failedStep.id, { status: "error", error: e.message });
    }
    setRunning(false);
  }, [input, running]);

  const statusIcon = (s: Step) => s.status === "loading" ? "⏳" : s.status === "done" ? "✅" : s.status === "error" ? "❌" : "○";

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      {/* 顶栏 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">RouteFlow</span>
          <span className="text-rice/30">AI 排线工作台 · v0.2.0</span>
        </div>
        <div className="flex items-center gap-3 text-rice/40">
          <KeyManager trialsLeft={-1} onSave={() => {}} />
        </div>
      </div>

      {/* Tab */}
      <div className="flex border-b border-rice/10 text-xs shrink-0">
        <button onClick={() => setTab("pipeline")}
          className={`px-4 py-2 transition ${tab === "pipeline" ? "bg-gold/15 text-gold border-b-2 border-gold" : "text-rice/50 hover:text-rice/80"}`}>
          🤖 AI 排线
        </button>
        <button onClick={() => setTab("demo")}
          className={`px-4 py-2 transition ${tab === "demo" ? "bg-gold/15 text-gold border-b-2 border-gold" : "text-rice/50 hover:text-rice/80"}`}>
          🗺 经典 Demo
        </button>
        {tab === "pipeline" && (
          <span className="ml-auto flex items-center gap-1 px-3 py-2 text-rice/25">
            🔒 数据仅存本地 · 不上传服务器
          </span>
        )}
      </div>

      {tab === "demo" ? (
        <iframe src="/demos/routeflow/index.html" title="RouteFlow Demo"
          className="flex-1 w-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups" />
      ) : (
        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          {/* 左侧：输入 */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-rice/10 text-xs">
              <span className="text-rice/50">📝 粘贴订单数据——JSON、表格、或自然语言描述均可</span>
              <button onClick={() => setInput(`配送中心在上海闵行区莲花南路3000号。车辆：3辆金杯(载重800kg)、2辆4.2米(载重2500kg)。今天订单：\n- 浦东新区张杨北路2503号，120kg，上午9点前\n- 松江区沪亭北路781号，108kg\n- 闵行区七莘路3155号，31kg\n- 奉贤区海思路789弄，20kg\n- 金山区学府路1591号，45kg\n- 徐汇区漕宝路2697号，200kg，优先配送`)}
                className="text-gold/50 hover:text-gold text-xs">加载示例</button>
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder="在此粘贴订单数据……"
              className="flex-1 bg-graphite text-rice/70 text-xs p-3 resize-none outline-none font-mono"
              spellCheck={false} />
            <div className="px-3 py-2 border-t border-rice/10">
              <button onClick={runPipeline} disabled={running || !input.trim()}
                className="w-full rounded bg-gold/20 border border-gold/30 text-gold py-2.5 text-sm font-medium hover:bg-gold/30 disabled:opacity-30 transition">
                {running ? "⏳ AI 处理中…" : "🚀 开始 AI 排线"}
              </button>
            </div>
          </div>

          {/* 右侧：结果 */}
          <div className="lg:w-[420px] overflow-y-auto bg-[#0b100d] border-t border-rice/10 lg:border-l lg:border-t-0">
            {/* 步骤 */}
            <div className="px-3 py-2.5 border-b border-rice/10 space-y-1.5">
              {steps.map(s => (
                <div key={s.id} className="flex items-start gap-2 text-xs">
                  <span className="mt-0.5">{statusIcon(s)}</span>
                  <div className="flex-1">
                    <span className={s.status === "error" ? "text-ember" : s.status === "done" ? "text-rice/70" : "text-rice/40"}>
                      {s.label}
                    </span>
                    {s.error && <p className="text-ember/70 mt-0.5">{s.error}</p>}
                  </div>
                </div>
              ))}
            </div>

            {output?.explanation && (
              <div className="px-3 py-3 border-b border-rice/10">
                <p className="text-gold/60 text-xs mb-1.5">💡 AI 业务解读</p>
                <div className="text-rice/60 text-xs leading-relaxed whitespace-pre-wrap">{output.explanation}</div>
              </div>
            )}

            {output && (
              <div className="px-3 py-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-rice/50 text-xs">📊 结构化输出</p>
                  <button onClick={() => {
                    const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a"); a.href = url; a.download = `routeflow-${Date.now()}.json`; a.click();
                    URL.revokeObjectURL(url);
                  }} className="text-gold/50 hover:text-gold text-xs">⬇ 下载 JSON</button>
                </div>
                <pre className="text-rice/50 text-xs max-h-[500px] overflow-auto whitespace-pre-wrap font-mono bg-graphite/50 rounded p-2">
                  {JSON.stringify(output, null, 2)}
                </pre>
                <p className="mt-2 text-amber-500/60 text-xs">⚠ AI 辅助生成，请人工复核后执行</p>
              </div>
            )}

            {/* 隐私声明 */}
            <div className="px-3 py-3 border-t border-rice/10 text-rice/25 text-xs leading-relaxed">
              <p className="font-medium mb-1">🔒 数据隐私声明</p>
              <p>你的业务数据仅在浏览器本地处理。ChainFlow 不收集、不存储、不上传你的订单、客户、地址或任何业务信息。LLM API 调用通过 DeepSeek/你配置的服务商完成，数据可能经其服务器传输。建议使用前完成数据脱敏。</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
