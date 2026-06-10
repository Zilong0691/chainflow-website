import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Supabase 未配置时直接放行（公开 Demo 模式）
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => request.cookies.getAll(), setAll: (c) => c.forEach(({ name, value }) => response.cookies.set(name, value)) } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const protectedPaths = [
    "/tools/routeflow/trial",
    "/tools/networkflow/trial",
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
