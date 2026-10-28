import { NextResponse } from "next/server";
import entry from "@/public/product-demo.json";

export const dynamic = "force-dynamic";

// 固定官网入口与产品演示独立，官网不包含私有产品源码或业务资料。
export function GET() {
  const target = new URL(entry.url);
  const allowed = target.hostname.endsWith(".trycloudflare.com") || target.hostname === "demo.chainflowlab.com";
  if (target.protocol !== "https:" || !allowed || entry.artificialOnly !== true) {
    return NextResponse.json({ error: "产品演示入口暂未就绪" }, { status: 503 });
  }
  const response = NextResponse.redirect(target, 307);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
