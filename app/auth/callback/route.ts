import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

// Supabase Auth 回调 — 处理 email magic link 和 OAuth redirect
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/tools/routeflow";

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(error.message)}`);
    }
  }

  // 登录成功后跳转到目标页面
  return NextResponse.redirect(`${origin}${redirect}`);
}
