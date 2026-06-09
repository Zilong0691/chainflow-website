export { updateSession as middleware } from "@/lib/supabase/middleware";

export const config = {
  matcher: [
    // 所有非静态路径（排除 _next/static, _next/image, favicon 等）
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
