import { createSupabaseAdmin } from "@/lib/supabase/server";
import { hashToken } from "@/lib/share";
import { notFound } from "next/navigation";
import QRCode from "./QRCode";

/* 司机分享页 — 公开访问，无需登录
   URL: /share/:token
   只读，绑定特定运行+车辆，不暴露完整数据 */

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ token: string }>; }

export default async function SharePage({ params }: Props) {
  const { token } = await params;
  const tokenHash = await hashToken(token);

  const supabase = createSupabaseAdmin();
  const { data: share, error } = await supabase
    .from("share_links")
    .select("*, module_runs!inner(run_id, module_id, result_data, input_summary)")
    .eq("token_hash", tokenHash)
    .is("revoked_at", null)
    .gte("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !share) notFound();

  const run = (share as any).module_runs;
  const scope = share.resource_scope || {};
  const vehicleId = scope.vehicle_id || "未知车辆";
  const routeId = scope.route_id || "";

  return (
    <main className="min-h-screen bg-graphite text-rice px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-lg font-bold">ChainFlow 配送任务单</h1>
          <p className="text-rice/30 text-xs mt-1">
            {vehicleId}{routeId ? ` · ${routeId}` : ""}
          </p>
          <p className="text-rice/25 text-xs mt-0.5">
            生成时间: {new Date(share.created_at).toLocaleString("zh-CN")}
            {share.expires_at && <> · 有效期至 {new Date(share.expires_at).toLocaleDateString("zh-CN")}</>}
          </p>
          <div className="mt-4"><QRCode url={`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/share/${token}`} /></div>
        </div>

        {run?.result_data ? (
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-rice/10 bg-rice/[0.02] p-4">
              <p className="text-rice/50 text-xs mb-3">📦 配送信息摘要</p>
              <pre className="text-rice/60 text-xs whitespace-pre-wrap font-mono overflow-auto max-h-[60vh]">
                {JSON.stringify(run.result_data, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-rice/10 bg-rice/[0.02] p-4 text-center">
            <p className="text-rice/30 text-sm">此分享链接暂无数据</p>
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg border border-amber-500/10 bg-amber-500/[0.03] text-amber-500/60 text-xs leading-relaxed">
          <p>⚠ 此页面为只读分享，信息可能已过期。实际配送以最新调度指令为准。</p>
          <p className="mt-1 text-rice/25">由 ChainFlow RouteFlow 生成</p>
        </div>
      </div>
    </main>
  );
}
