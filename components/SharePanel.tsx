"use client";

import { useState } from "react";

/* 分享面板 — 创建/复制分享链接，适用于 RouteFlow 司机分享和 NetworkFlow 报告分享 */

interface SharePanelProps {
  userId: string;
  moduleRunId: string;
  workspaceId?: string;
  shareType: "driver" | "report" | "readonly";
  resourceScope?: { vehicle_id?: string; route_id?: string };
}

export default function SharePanel({ userId, moduleRunId, workspaceId, shareType, resourceScope }: SharePanelProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const createShare = async (expiresInDays: number) => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/shares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, workspaceId, moduleRunId, shareType, resourceScope, expiresInDays }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const data = await res.json();
      setShareUrl(`${location.origin}${data.url}`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const label = shareType === "driver" ? "司机分享" : shareType === "report" ? "方案分享" : "只读分享";

  return (
    <div>
      <button onClick={() => setVisible(!visible)}
        className="text-xs text-rice/40 hover:text-gold">
        🔗 {label}
      </button>

      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setVisible(false)}>
          <div className="w-[90vw] max-w-sm rounded-xl border border-rice/10 bg-graphite p-4" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-medium text-rice mb-3">创建{label}</p>

            {shareUrl ? (
              <div className="space-y-3">
                <div className="rounded border border-rice/10 bg-rice/[0.02] p-2 text-rice/50 text-xs break-all font-mono">{shareUrl}</div>
                <div className="flex gap-2">
                  <button onClick={copyLink}
                    className="flex-1 rounded bg-gold/20 border border-gold/30 text-gold py-2 text-xs hover:bg-gold/30 transition">
                    {copied ? "✅ 已复制" : "📋 复制链接"}
                  </button>
                  <button onClick={() => { setShareUrl(""); setVisible(false); }}
                    className="flex-1 rounded border border-rice/15 text-rice/40 py-2 text-xs hover:text-rice/70 transition">关闭</button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-rice/40 text-xs">有效期</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 7, 30].map(days => (
                    <button key={days} onClick={() => createShare(days)} disabled={loading}
                      className="rounded border border-rice/15 bg-rice/[0.02] py-2 text-xs text-rice/60 hover:bg-rice/[0.05] disabled:opacity-30 transition">
                      {days} 天
                    </button>
                  ))}
                </div>
                {shareType === "driver" && (
                  <p className="text-rice/25 text-xs mt-2">司机无需注册或登录即可查看。分享链接不暴露完整企业数据。7天后自动过期。</p>
                )}
                {error && <p className="text-ember text-xs">{error}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
