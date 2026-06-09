"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { loadConfig } from "../routeflow/KeyManager";
import { fetchTrialStatus, saveModuleRun, fetchRunHistory, type TrialStatus, type RunRecord } from "@/lib/trial";

type Tab = "demo" | "trial" | "history";

export default function NetworkFlowPage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("demo");
  const [input, setInput] = useState("");
  const [pipeline, setPipeline] = useState<{ step: string; status: "idle"|"loading"|"done"|"error"; content?: string; error?: string }[]>([
    { step: "parse", status: "idle" }, { step: "evaluate", status: "idle" }, { step: "explain", status: "idle" },
  ]);
  const [output, setOutput] = useState<any>(null);
  const [running, setRunning] = useState(false);
  const [trial, setTrial] = useState<TrialStatus | null>(null);
  const [history, setHistory] = useState<RunRecord[]>([]);
  const [runSaved, setRunSaved] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTrialStatus(user.id, "networkflow").then(setTrial).catch(() => {});
      fetchRunHistory(user.id, "networkflow").then(setHistory).catch(() => {});
    }
  }, [user]);

  const runPipeline = useCallback(async (chargeTrial: boolean) => {
    if (!input.trim() || running) return;
    setRunning(true); setRunSaved(false);
    setPipeline(prev => prev.map(s => ({ ...s, status: "idle" as const, content: undefined, error: undefined })));
    setOutput(null);

    const idempotencyKey = `nf_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    try {
      // 统一管道：LLM解析 → 确定性求解器 → LLM解读
      setPipeline(prev => prev.map((s, i) => i === 0 ? { ...s, status: "loading" } : s));
      const config = loadConfig();
      const res = await fetch("/api/llm", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "networkflow", input, userKey: config?.apiKey }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const data = await res.json();

      setPipeline(prev => prev.map((s, i) => i === 0 ? { ...s, status: "done", content: JSON.stringify(data.parsed, null, 2) } : s));
      setPipeline(prev => prev.map((s, i) => i === 1 ? { ...s, status: "done", content: JSON.stringify(data.routes, null, 2) } : s));
      setPipeline(prev => prev.map((s, i) => i === 2 ? { ...s, status: "done", content: data.explanation } : s));

      setOutput({ parsed: data.parsed, routes: data.routes, explanation: data.explanation });

      if (chargeTrial && user) {
        const result = await saveModuleRun({
          userId: user.id, moduleId: "networkflow", moduleVersion: "0.2.0",
          idempotencyKey,
          inputSummary: { demandCities: data.parsed?.orders?.length, warehouses: data.parsed?.warehouses?.length },
          resultData: { scenarios: data.routes?.scenarios?.length },
          runStatus: "success", chargeTrial: true,
        });
        setRunSaved(true);
        if (result.charged) setTrial(prev => prev ? { ...prev, used: prev.used + 1, remaining: result.remaining } : prev);
      }
    } catch (e: any) {
      setPipeline(prev => {
        const idx = prev.findIndex(s => s.status === "loading");
        if (idx >= 0) prev[idx] = { ...prev[idx], status: "error", error: e.message };
        return [...prev];
      });
    }
    setRunning(false);
  }, [input, running, user]);

  const pipeIcon = (s: typeof pipeline[0]) => s.status === "loading" ? "⏳" : s.status === "done" ? "✅" : s.status === "error" ? "❌" : "○";

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">仓网选址评估助手</span>
          <span className="text-rice/30">NetworkFlow · v0.2.0</span>
        </div>
        <div className="flex items-center gap-3">
          {authLoading ? null : user ? (
            <span className="text-rice/40">{user.email}</span>
          ) : (
            <a href="/auth/login?redirect=/tools/networkflow" className="text-gold/60 hover:text-gold">登录以试用</a>
          )}
        </div>
      </div>

      <div className="flex border-b border-rice/10 text-xs shrink-0">
        {(["demo", "trial", "history"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 transition ${tab === t ? "bg-gold/15 text-gold border-b-2 border-gold" : "text-rice/50 hover:text-rice/80"}`}>
            {t === "demo" ? "🗺 公开 Demo" : t === "trial" ? "🤖 AI 试用" : "📋 运行历史"}
          </button>
        ))}
        {trial && <span className="ml-auto px-3 py-2 text-rice/30">剩余试用 {trial.remaining} 次</span>}
      </div>

      {tab === "demo" && (
        <iframe src="/demos/networkflow/index.html" title="NetworkFlow Demo"
          className="flex-1 w-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups" />
      )}

      {tab === "trial" && (
        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-rice/10 text-xs">
              <span className="text-rice/50">📝 描述需求城市和候选仓</span>
              <button onClick={() => setInput(`我们在华东和中部有5个候选仓位置：芜湖(31.35,118.43)月固定成本5万、开封(34.80,114.31)4.5万、福州(26.07,119.30)4.2万、广州(23.13,113.26)5.5万、重庆(29.56,106.55)4万。服务半径350km。需求城市包括上海、杭州、南京、合肥、郑州、武汉、长沙、南昌等，共约386个城市。运输费率约2.5元/单/公里。请帮我比较不同仓网方案。`)}
                className="text-gold/50 hover:text-gold">加载示例</button>
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder="描述候选仓位置、成本、需求城市和约束条件……"
              className="flex-1 bg-graphite text-rice/70 text-xs p-3 resize-none outline-none font-mono" spellCheck={false} />
            <div className="px-3 py-2 border-t border-rice/10 space-y-2">
              {!user && <p className="text-amber-500/60 text-xs">⚠ 登录后运行消耗 1 次试用（共 3 次）</p>}
              <button onClick={() => runPipeline(!!user)} disabled={running || !input.trim()}
                className="w-full rounded bg-gold/20 border border-gold/30 text-gold py-2.5 text-sm font-medium hover:bg-gold/30 disabled:opacity-30 transition">
                {running ? "⏳ AI 处理中…" : user ? "🚀 开始仓网评估（消耗 1 次试用）" : "🔍 预览仓网评估（不保存）"}
              </button>
            </div>
          </div>

          <div className="lg:w-[420px] overflow-y-auto bg-[#0b100d] border-t border-rice/10 lg:border-l lg:border-t-0">
            <div className="px-3 py-2.5 border-b border-rice/10 space-y-1.5">
              {pipeline.map(s => (
                <div key={s.step} className="flex items-start gap-2 text-xs">
                  <span className="mt-0.5">{pipeIcon(s)}</span>
                  <div className="flex-1">
                    <span className={s.status === "error" ? "text-ember" : s.status === "done" ? "text-rice/70" : "text-rice/40"}>
                      {s.step === "parse" ? "LLM 解析数据" : s.step === "evaluate" ? "LLM 方案评估" : "LLM 决策解读"}
                    </span>
                    {s.error && <p className="text-ember/70 mt-0.5">{s.error}</p>}
                  </div>
                </div>
              ))}
              {runSaved && <p className="text-green-400/60 text-xs">✅ 结果已保存 · 试用次数已扣</p>}
            </div>

            {output?.explanation && (
              <div className="px-3 py-3 border-b border-rice/10">
                <p className="text-gold/60 text-xs mb-1.5">💡 AI 决策解读</p>
                <div className="text-rice/60 text-xs leading-relaxed whitespace-pre-wrap">{output.explanation}</div>
              </div>
            )}

            {output && (
              <div className="px-3 py-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-rice/50 text-xs">📊 结构化输出</p>
                  <button onClick={() => { const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `networkflow-${Date.now()}.json`; a.click(); }}
                    className="text-gold/50 hover:text-gold text-xs">⬇ 下载</button>
                </div>
                <pre className="text-rice/50 text-xs max-h-[400px] overflow-auto whitespace-pre-wrap font-mono bg-graphite/50 rounded p-2">
                  {JSON.stringify(output, null, 2)}
                </pre>
                <p className="mt-2 text-amber-500/60 text-xs">⚠ AI 辅助生成，请人工复核后执行</p>
              </div>
            )}

            <div className="px-3 py-3 border-t border-rice/10 text-rice/25 text-xs leading-relaxed">
              <p className="font-medium mb-1">🔒 数据隐私</p>
              <p>你的业务数据仅在浏览器本地处理。不收集、不存储业务信息。</p>
            </div>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="flex-1 overflow-y-auto p-3">
          {!user ? (
            <div className="text-center py-12 text-rice/30 text-sm">登录后查看运行历史</div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-rice/30 text-sm">暂无运行记录</div>
          ) : (
            <div className="space-y-2">
              {history.map(r => (
                <div key={r.run_id || Math.random()} className="rounded border border-rice/10 bg-rice/[0.02] px-3 py-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-rice/60">{new Date(r.created_at || "").toLocaleString("zh-CN")}</span>
                    <span className={r.run_status === "success" ? "text-green-400/60" : "text-ember/60"}>
                      {r.run_status === "success" ? "成功" : r.run_status}
                    </span>
                  </div>
                  <div className="mt-1 text-rice/40">
                    {r.input_summary && <span>需求城市: {r.input_summary.demandCities} · 候选仓: {r.input_summary.warehouses}</span>}
                    {r.trial_charged && <span className="ml-2 text-gold/50">已扣试用</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
