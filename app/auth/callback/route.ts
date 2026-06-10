import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/tools/routeflow";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(error.message)}`);
    }

    // 兜底：如果数据库触发器未正常工作，确保 profile 存在
    if (data?.user) {
      try {
        const admin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { persistSession: false } }
        );
        // 先查是否存在
        const { data: existing } = await admin.from("profiles").select("id").eq("id", data.user.id).maybeSingle();
        if (!existing) {
          await admin.from("profiles").insert({
            id: data.user.id,
            display_name: data.user.user_metadata?.display_name || data.user.email?.split("@")[0] || "用户",
          });
          // 审计：异常兜底触发
          await admin.from("audit_logs").insert({
            user_id: data.user.id,
            action: "profile_fallback_created",
            target_type: "profile",
            metadata: { reason: "trigger_not_available", email: data.user.email },
          });
        }
      } catch (e) {
        // 静默失败：profile 创建失败不应阻断登录
        console.error("Profile fallback failed:", e);
      }
    }
  }

  return NextResponse.redirect(`${origin}${redirect}`);
}
