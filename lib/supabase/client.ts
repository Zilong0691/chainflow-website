import { createBrowserClient } from "@supabase/ssr";

// 浏览器端 Supabase 客户端（Client Components）
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
