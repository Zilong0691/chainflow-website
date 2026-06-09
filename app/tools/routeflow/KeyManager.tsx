"use client";

import { useState, useEffect } from "react";

/* API Key 管理器 — 浏览器本地存储
   Key 不上传 ChainFlow 服务器，仅用于客户端 LLM 调用 */

const STORAGE_KEY = "chainflow_llm_config";

export interface LLMConfig {
  provider: "deepseek" | "openai" | "ollama";
  apiKey: string;
  baseURL?: string;
}

export function loadConfig(): LLMConfig | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveConfig(config: LLMConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export default function KeyManager({ trialsLeft, onSave }: { trialsLeft: number; onSave: () => void }) {
  const [visible, setVisible] = useState(false);
  const [provider, setProvider] = useState<LLMConfig["provider"]>("deepseek");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cfg = loadConfig();
    if (cfg) { setProvider(cfg.provider); setApiKey(cfg.apiKey); setSaved(true); }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) return;
    saveConfig({ provider, apiKey });
    setSaved(true); onSave();
  };

  return (
    <div>
      <button onClick={() => setVisible(!visible)}
        className="text-xs text-rice/40 hover:text-gold">
        🔑 {saved ? "已配置 Key" : "API Key"}
      </button>

      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setVisible(false)}>
          <div className="w-[90vw] max-w-md rounded-xl border border-rice/10 bg-graphite p-4" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-medium text-rice mb-3">配置 LLM API Key</p>

            {!saved && (
              <div className="rounded-lg border border-gold/20 bg-gold/[0.04] px-3 py-2 mb-3 text-gold/70 text-xs">
                默认使用演示 Key。如频繁使用，建议配置自己的 Key 以获得稳定服务。
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-rice/50">提供商</label>
                <select value={provider} onChange={e => setProvider(e.target.value as any)}
                  className="w-full mt-1 rounded border border-rice/15 bg-graphite px-3 py-2 text-rice">
                  <option value="deepseek">DeepSeek（推荐）</option>
                  <option value="openai">OpenAI 兼容</option>
                  <option value="ollama">Ollama 本地</option>
                </select>
              </div>
              <div>
                <label className="text-rice/50">API Key</label>
                <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                  placeholder={provider === "ollama" ? "本地无需 Key" : "sk-..."}
                  className="w-full mt-1 rounded border border-rice/15 bg-graphite px-3 py-2 text-rice/70 outline-none focus:border-gold/30 font-mono" />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={handleSave}
                className="flex-1 rounded bg-gold/20 border border-gold/30 text-gold py-2 text-xs hover:bg-gold/30 transition">
                保存（仅存本地）
              </button>
              <button onClick={() => setVisible(false)}
                className="flex-1 rounded border border-rice/15 text-rice/40 py-2 text-xs hover:text-rice/70 transition">取消</button>
            </div>

            <p className="mt-3 text-rice/25 text-xs leading-relaxed">
              Key 仅存储在浏览器本地，不上传 ChainFlow 服务器。
              {provider === "deepseek" && <> DeepSeek Key 可免费申请：platform.deepseek.com/api_keys</>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
