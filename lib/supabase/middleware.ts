import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Next.js Middleware — 刷新 Session + 条件认证
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.cookies.getAll(), setAll: (c) => c.forEach(({ name, value }) => response.cookies.set(name, value)) } }
  );

  // 刷新 session（重要：避免用户登录状态过期）
  const { data: { user } } = await supabase.auth.getUser();

  // 需要登录的路径（Trial / Paid 操作）
  const protectedPaths = [
    "/tools/routeflow/trial",
    "/tools/networkflow/trial",
    "/tools/routeflow/save",
    "/tools/networkflow/save",
    "/workspace",
    "/settings",
    "/entitlements",
  ];

  const needsAuth = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p));

  if (needsAuth && !user) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
