import { NextResponse } from "next/server";
import entry from "@/public/product-demo.json";

export const dynamic = "force-dynamic";

// 先核对人工演示在线状态，避免把访客送往已经失效的临时域名。
export async function GET() {
  try {
    const target = new URL(entry.url);
    const allowed = target.hostname.endsWith(".trycloudflare.com") || target.hostname === "demo.chainflowlab.com";
    if (target.protocol !== "https:" || !allowed || entry.artificialOnly !== true) throw new Error("演示配置无效");
    const health = await fetch(new URL("/demo-status", target), { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(8000) });
    if (!health.ok) throw new Error("演示暂未在线");
    const status = await health.json();
    if (status.artificialOnly !== true || status.backend !== "server" || (status.expiresAt !== null && (!Number.isFinite(Date.parse(status.expiresAt)) || Date.parse(status.expiresAt) <= Date.now()))) throw new Error("演示状态无效");
    const response = NextResponse.redirect(target, 307);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch {
    return new Response(`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>工作台暂时离线 · ChainFlow</title><style>body{margin:0;background:#edf3f8;color:#19334f;font-family:system-ui,sans-serif}main{max-width:560px;margin:16vh auto;padding:32px}h1{font-size:26px}p{line-height:1.8;color:#50647a}a{display:inline-block;margin:16px 20px 0 0;color:#235fbb}a:first-of-type{padding:10px 18px;background:#235fbb;color:white;border-radius:6px;text-decoration:none}</style><main><h1>体验工作台暂时离线</h1><p>演示服务当前无法连接。你仍在 ChainFlow 官网，可以稍后重新进入。体验版使用独立演示数据，提供可操作的工作台。</p><a href="/demo">重新连接</a><a href="/">返回首页</a></main></html>`, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Retry-After": "60" } });
  }
}
