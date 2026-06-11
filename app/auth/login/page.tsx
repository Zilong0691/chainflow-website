"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/tools/routeflow";

  useEffect(() => {
    import("@supabase/ssr").then(mod => {
      setSupabase(mod.createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      ));
    });
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault(); if (!supabase) return;
    setError(""); setLoading(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}` },
    });
    if (err) { setError(err.message); setLoading(false); return; }
    setSent(true);
  };

  const handleOAuth = async (provider: string) => {
    if (!supabase) return;
    setError(""); setLoading(true);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}` },
    });
    if (err) { setError(err.message); setLoading(false); }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080b09] px-4">
      <Card className="w-full max-w-sm border-gold/10 bg-[#0b100d]">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
            <span className="text-xl">🔗</span>
          </div>
          <CardTitle className="text-rice text-lg">ChainFlow 链流</CardTitle>
          <CardDescription className="text-rice/40 text-xs">
            登录后上传真实数据、保存项目和享用工具权益
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sent ? (
            <div className="text-center space-y-3">
              <div className="text-3xl">📧</div>
              <p className="text-rice/70 text-sm">验证链接已发送至</p>
              <Badge variant="outline" className="text-gold border-gold/30">{email}</Badge>
              <p className="text-rice/30 text-xs">请检查邮箱（含垃圾邮件），点击链接即可登录。</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-rice/60 text-xs">邮箱</Label>
                  <Input type="email" placeholder="输入邮箱地址" value={email} onChange={e => setEmail(e.target.value)} required
                    className="border-rice/15 bg-[#080b09] text-rice placeholder:text-rice/20 focus-visible:ring-gold/30" />
                </div>
                {error && <p className="text-ember text-xs">{error}</p>}
                <Button type="submit" disabled={loading || !supabase} variant="gold" className="w-full">
                  {loading ? "发送中…" : "发送登录链接"}
                </Button>
              </form>

              <Separator className="bg-rice/10" />

              <div className="space-y-2">
                <p className="text-rice/25 text-xs text-center">其他登录方式</p>
                <div className="flex gap-2">
                  <OAuthBtn icon="🐙" label="GitHub" enabled={true} onClick={() => handleOAuth("github")} />
                  <OAuthBtn icon="💬" label="微信" enabled={false} />
                  <OAuthBtn icon="📌" label="钉钉" enabled={false} />
                </div>
              </div>
            </>
          )}

          <p className="text-center text-rice/25 text-xs pt-2">
            公开 Demo 无需登录 · 上传真实数据和购买工具时才需要
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

function OAuthBtn({ icon, label, enabled, onClick }: { icon: string; label: string; enabled: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} disabled={!enabled}
      className={`flex-1 rounded-lg border py-2 text-xs transition text-center
        ${enabled ? "border-rice/15 text-rice/50 hover:bg-rice/[0.05]" : "border-rice/5 text-rice/15 cursor-not-allowed"}`}>
      <span className="mr-1">{icon}</span>{enabled ? label : `${label}（待配）`}
    </button>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#080b09]"><p className="text-rice/30">加载中…</p></div>}>
      <LoginForm />
    </Suspense>
  );
}
