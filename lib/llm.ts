/**
 * ChainFlow LLM 适配层
 * 支持 DeepSeek / OpenAI / 本地 Ollama
 * 接口兼容 OpenAI chat/completions 格式
 */

export type LLMProvider = "deepseek" | "openai" | "ollama" | "custom";

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMResponse {
  content: string;
  tokensUsed: { input: number; output: number };
  model: string;
}

const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const OPENAI_BASE = "https://api.openai.com/v1";
const OLLAMA_BASE = "http://localhost:11434/v1";

const DEMO_KEY = process.env.DEEPSEEK_DEMO_KEY || "";

const PROVIDER_DEFAULTS: Record<LLMProvider, { baseURL: string; model: string }> = {
  deepseek: { baseURL: DEEPSEEK_BASE, model: "deepseek-chat" },
  openai: { baseURL: OPENAI_BASE, model: "gpt-4o-mini" },
  ollama: { baseURL: OLLAMA_BASE, model: "qwen2.5:7b" },
  custom: { baseURL: "", model: "" },
};

export function getLLMConfig(config?: Partial<LLMConfig>): LLMConfig {
  const provider = config?.provider || "deepseek";
  const defaults = PROVIDER_DEFAULTS[provider];
  return {
    provider,
    apiKey: config?.apiKey || DEMO_KEY,
    baseURL: config?.baseURL || defaults.baseURL,
    model: config?.model || defaults.model,
  };
}

export async function chatCompletion(
  messages: LLMMessage[],
  config?: Partial<LLMConfig>
): Promise<LLMResponse> {
  const cfg = getLLMConfig(config);

  const response = await fetch(`${cfg.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature: cfg.provider === "deepseek" ? 0.1 : 0.3,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: { message: response.statusText } }));
    throw new Error(err.error?.message || `LLM 请求失败 (${response.status})`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    tokensUsed: {
      input: data.usage?.prompt_tokens || 0,
      output: data.usage?.completion_tokens || 0,
    },
    model: data.model || cfg.model || "unknown",
  };
}
