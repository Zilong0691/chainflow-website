/**
 * 分享链接工具
 * Token: crypto.randomUUID() → SHA-256 hash 入库 → 明文在 URL 中
 * URL 格式: /share/:token
 */

export function generateShareToken(): string {
  return crypto.randomUUID();
}

export async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// 浏览器端兼容的哈希（使用 Web Crypto API）
export async function hashTokenBrowser(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
