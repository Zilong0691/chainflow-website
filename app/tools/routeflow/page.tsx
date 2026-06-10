"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import KeyManager, { loadConfig } from "./KeyManager";
import SharePanel from "@/components/SharePanel";
import FileUpload from "@/components/FileUpload";
import { fetchTrialStatus, saveModuleRun, fetchRunHistory, type TrialStatus, type RunRecord } from "@/lib/trial";

type Tab = "demo" | "trial" | "history";

export default function RouteFlowPage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("demo");
  const [input, setInput] = useState("");
  const [pipeline, setPipeline] = useState<{ step: string; status: "idle"|"loading"|"done"|"error"; content?: string; error?: string }[]>([
    { step: "parse", status: "idle" }, { step: "route", status: "idle" }, { step: "explain", status: "idle" },
  ]);
  const [output, setOutput] = useState<any>(null);
  const [running, setRunning] = useState(false);
  const [trial, setTrial] = useState<TrialStatus | null>(null);
  const [history, setHistory] = useState<RunRecord[]>([]);
  const [runSaved, setRunSaved] = useState(false);
  const [lastRunId, setLastRunId] = useState("");
  const [uploadMode, setUploadMode] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTrialStatus(user.id, "routeflow").then(setTrial).catch(() => {});
      fetchRunHistory(user.id, "routeflow").then(setHistory).catch(() => {});
    }
  }, [user]);

  const runPipeline = useCallback(async (chargeTrial: boolean) => {
    if (!input.trim() || running) return;
    setRunning(true); setRunSaved(false);
    setPipeline(prev => prev.map(s => ({ ...s, status: "idle" as const, content: undefined, error: undefined })));
    setOutput(null);

    const idempotencyKey = `rf_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    try {
      // LLM 解析 + 确定性求解器 + LLM 解读 → 单次 API 调用
      setPipeline(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: "loading" } : s));
      const config = loadConfig();
      const res = await fetch("/api/llm", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "route", input, userKey: config?.apiKey }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const data = await res.json();

      setPipeline(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: "done", content: JSON.stringify(data.parsed, null, 2) } : s));
      setPipeline(prev => prev.map((s, idx) => idx === 1 ? { ...s, status: "done", content: JSON.stringify(data.routes, null, 2) } : s));
      setPipeline(prev => prev.map((s, idx) => idx === 2 ? { ...s, status: "done", content: data.explanation } : s));

      setOutput({ parsed: data.parsed, routes: data.routes, explanation: data.explanation });

      // 保存运行记录 + 扣减试用
      if (chargeTrial && user) {
        const result = await saveModuleRun({
          userId: user.id, moduleId: "routeflow", moduleVersion: "0.2.0",
          idempotencyKey,
          inputSummary: { orders: data.parsed?.orders?.length, vehicles: data.parsed?.vehicles?.length },
          resultData: { summary: data.routes?.summary, routes: data.routes?.routes?.length },
          runStatus: "success", chargeTrial: true,
        });
        setRunSaved(true); setLastRunId(result.runId);
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
  }, [input, running, user, pipeline]);

  const pipeIcon = (s: typeof pipeline[0]) => s.status === "loading" ? "⏳" : s.status === "done" ? "✅" : s.status === "error" ? "❌" : "○";

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      {/* 顶栏 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">短途配送排线助手</span>
          <span className="text-rice/30">RouteFlow · v0.2.0</span>
        </div>
        <div className="flex items-center gap-3">
          <KeyManager trialsLeft={trial?.remaining ?? 3} onSave={() => {}} />
          {authLoading ? null : user ? (
            <span className="text-rice/40">{user.email}</span>
          ) : (
            <a href="/auth/login?redirect=/tools/routeflow" className="text-gold/60 hover:text-gold">登录以试用</a>
          )}
        </div>
      </div>

      {/* Tab */}
      <div className="flex border-b border-rice/10 text-xs shrink-0">
        {(["demo", "trial", "history"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 transition ${tab === t ? "bg-gold/15 text-gold border-b-2 border-gold" : "text-rice/50 hover:text-rice/80"}`}>
            {t === "demo" ? "🗺 公开 Demo" : t === "trial" ? "🤖 AI 试用" : "📋 运行历史"}
          </button>
        ))}
        {trial && tab !== "history" && (
          <span className="ml-auto px-3 py-2 text-rice/30">
            剩余试用 {trial.remaining} 次
          </span>
        )}
      </div>

      {/* Demo Tab */}
      {tab === "demo" && (
        <iframe src="/demos/routeflow/index.html" title="RouteFlow Demo"
          className="flex-1 w-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups" />
      )}

      {/* Trial Tab */}
      {tab === "trial" && (
        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-3 space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <button onClick={()=>setUploadMode(false)} className={`px-3 py-1 rounded ${!uploadMode?'bg-gold/15 text-gold':'text-rice/40'}`}>📝 文本输入</button>
              <button onClick={()=>setUploadMode(true)} className={`px-3 py-1 rounded ${uploadMode?'bg-gold/15 text-gold':'text-rice/40'}`}>📁 CSV 上传</button>
            </div>

            {uploadMode ? (
              <FileUpload onDataReady={(orders, depot, vehicles) => {
                const data = { orders, depot, vehicles };
                setInput(JSON.stringify(data, null, 2));
                setUploadMode(false);
              }} />
            ) : (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rice/50">📝 粘贴订单数据</span>
                  <button onClick={() => setInput(`配送中心在上海闵行区莲花南路3000号。车辆：3辆金杯(800kg)、2辆4.2米(2500kg)。今天订单：\n- 浦东新区张杨北路2503号，120kg，上午9点前\n- 松江区沪亭北路781号，108kg\n- 闵行区七莘路3155号，31kg\n- 奉贤区海思路789弄，20kg\n- 金山区学府路1591号，45kg\n- 徐汇区漕宝路2697号，200kg，优先`)}
                    className="text-gold/50 hover:text-gold">加载示例</button>
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  placeholder="粘贴订单、表格或自然语言描述……"
                  className="flex-1 bg-graphite text-rice/70 text-xs p-3 resize-none outline-none font-mono min-h-[200px]" spellCheck={false} />
              </>
            )}

            <div className="space-y-2">
              {!user && <p className="text-amber-500/60 text-xs">⚠ 登录后运行将消耗 1 次试用次数（共 3 次），未登录可查看 Demo 但不保存结果</p>}
              <button onClick={() => runPipeline(!!user)} disabled={running || !input.trim()}
                className="w-full rounded bg-gold/20 border border-gold/30 text-gold py-2.5 text-sm font-medium hover:bg-gold/30 disabled:opacity-30 transition">
                {running ? "⏳ AI 处理中…" : user ? "🚀 开始 AI 排线（消耗 1 次试用）" : "🔍 预览 AI 排线（不保存）"}
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
                      {s.step === "parse" ? "LLM 解析数据" : s.step === "route" ? "LLM 生成路线" : "LLM 业务解读"}
                    </span>
                    {s.error && <p className="text-ember/70 mt-0.5">{s.error}</p>}
                  </div>
                </div>
              ))}
              {runSaved && (
                <div className="flex items-center justify-between">
                  <p className="text-green-400/60 text-xs">✅ 结果已保存 · 试用次数已扣</p>
                  {user && lastRunId && (
                    <SharePanel userId={user.id} moduleRunId={lastRunId} shareType="driver"
                      resourceScope={{}} />
                  )}
                </div>
              )}
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
                  <button onClick={() => { const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `routeflow-${Date.now()}.json`; a.click(); }}
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
              <p>你的业务数据仅在浏览器本地处理。ChainFlow 不收集、不存储订单和客户信息。LLM 调用通过 DeepSeek/你配置的 API 完成。</p>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div className="flex-1 overflow-y-auto p-3">
          {!user ? (
            <div className="text-center py-12 text-rice/30 text-sm">登录后查看运行历史</div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-rice/30 text-sm">暂无运行记录</div>
          ) : (
            <div className="space-y-2">
              {history.map(r => (
                <div key={r.run_id} className="rounded border border-rice/10 bg-rice/[0.02] px-3 py-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-rice/60">{new Date(r.created_at || "").toLocaleString("zh-CN")}</span>
                    <span className={r.run_status === "success" ? "text-green-400/60" : "text-ember/60"}>
                      {r.run_status === "success" ? "成功" : r.run_status}
                    </span>
                  </div>
                  <div className="mt-1 text-rice/40">
                    {r.input_summary && <span>订单: {r.input_summary.orders} · 车辆: {r.input_summary.vehicles}</span>}
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
