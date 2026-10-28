import { NextResponse } from "next/server";

// 官网保持公开访问；使用有效中间件导出，避免空模块在托管端执行失败。
export function middleware() {
  return NextResponse.next();
}

export const config = { matcher: ["/", "/demo"] };
