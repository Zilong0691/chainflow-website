import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Next.js 服务端 Supabase 客户端（Server Components / API Routes）
export async function createSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  );
}

// 服务端管理员客户端（使用 service_role key，绕过 RLS）。
// 仅在 API 路由中使用，绝不在浏览器端暴露。
export function createSupabaseAdmin() {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
