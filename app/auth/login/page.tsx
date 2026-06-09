"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
    e.preventDefault();
    if (!supabase) return;
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

  const hasWeChat = !!process.env.NEXT_PUBLIC_WECHAT_ENABLED;
  const hasDingTalk = !!process.env.NEXT_PUBLIC_DINGTALK_ENABLED;

  return (
    <main className="flex min-h-screen items-center justify-center bg-graphite px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold text-rice">ChainFlow 链流</h1>
          <p className="text-rice/40 text-sm mt-2">登录后上传真实数据、保存项目和享用工具权益</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="text-3xl mb-3">📧</div>
            <p className="text-rice/70 text-sm">验证链接已发送至</p>
            <p className="text-gold font-medium mt-1">{email}</p>
            <p className="text-rice/30 text-xs mt-3">请检查邮箱（含垃圾邮件），点击链接即可登录。链接 24 小时内有效。</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input type="email" placeholder="输入邮箱" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full rounded-lg border border-rice/15 bg-rice/[0.03] px-4 py-3 text-rice text-sm outline-none focus:border-gold/40 placeholder:text-rice/25" />
              {error && <p className="text-ember text-xs">{error}</p>}
              <button type="submit" disabled={loading || !supabase}
                className="w-full rounded-lg bg-gold/20 border border-gold/30 text-gold py-3 text-sm font-medium hover:bg-gold/30 disabled:opacity-40 transition">
                {loading ? "发送中…" : "发送登录链接"}
              </button>
            </form>

            <div className="mt-6 space-y-2">
              <p className="text-rice/25 text-xs text-center mb-3">其他登录方式</p>

              <ProviderButton icon="💬" label="微信登录" enabled={hasWeChat} reason="需微信开放平台 App ID/Secret" onAction={() => handleOAuth("google")} />
              <ProviderButton icon="📌" label="钉钉登录" enabled={hasDingTalk} reason="需钉钉开放平台 Client ID/Secret" onAction={() => handleOAuth("google")} />
              <ProviderButton icon="🐙" label="GitHub 登录" enabled={true} onAction={() => handleOAuth("github")} />
            </div>
          </>
        )}

        <p className="mt-6 text-center text-rice/25 text-xs leading-relaxed">
          公开 Demo 无需登录 · 上传真实数据和购买工具时才需要
        </p>
      </div>
    </main>
  );
}

function ProviderButton({ icon, label, enabled, reason, onAction }: { icon: string; label: string; enabled: boolean; reason?: string; onAction: () => void }) {
  if (enabled) {
    return (
      <button onClick={onAction}
        className="w-full rounded-lg border border-rice/10 bg-rice/[0.02] px-4 py-2.5 text-rice/60 text-xs hover:bg-rice/[0.05] transition text-left flex items-center gap-2">
        <span className="text-base">{icon}</span> {label}
      </button>
    );
  }
  return (
    <div className="w-full rounded-lg border border-rice/5 bg-rice/[0.01] px-4 py-2.5 text-rice/20 text-xs text-left flex items-center gap-2" title={reason}>
      <span className="text-base opacity-40">{icon}</span> {label}（待配置）
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-graphite"><p className="text-rice/30">加载中…</p></div>}>
      <LoginForm />
    </Suspense>
  );
}
