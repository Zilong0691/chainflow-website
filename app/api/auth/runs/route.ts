import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// GET /api/auth/runs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const moduleId = searchParams.get("module_id");
    if (!userId) return NextResponse.json({ error: "缺少 user_id" }, { status: 400 });
    const supabase = getAdmin();
    let q = supabase.from("module_runs").select("run_id,module_id,run_status,input_summary,result_data,trial_charged,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
    if (moduleId) q = q.eq("module_id", moduleId);
    const { data, error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

// POST /api/auth/runs
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, moduleId, moduleVersion, workspaceId, idempotencyKey, inputSummary, configSummary, resultData, runStatus, chargeTrial } = body;
    if (!userId || !moduleId || !idempotencyKey) return NextResponse.json({ error: "缺少参数" }, { status: 400 });
    const supabase = getAdmin();

    // 幂等
    const { data: exist } = await supabase.from("module_runs").select("run_id,trial_charged").eq("idempotency_key", idempotencyKey).maybeSingle();
    if (exist) return NextResponse.json({ runId: exist.run_id, charged: false, remaining: -1, reason: "exists" });

    // 创建
    const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const { error: insErr } = await supabase.from("module_runs").insert({
      run_id: runId, user_id: userId, workspace_id: workspaceId || null, module_id: moduleId,
      module_version: moduleVersion || "0.2.0", idempotency_key: idempotencyKey,
      run_status: runStatus || "success", input_summary: inputSummary || {}, config_summary: configSummary || {},
      result_data: resultData || null, trial_charged: false, completed_at: new Date().toISOString(),
    });
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

    // 扣次
    let charged = false, remaining = -1;
    if (chargeTrial && runStatus === "success") {
      const { data: ent } = await supabase.from("module_entitlements").select("id").eq("user_id", userId).eq("module_id", moduleId).eq("status", "active").maybeSingle();
      if (!ent) {
        await supabase.from("trial_usage").upsert({ user_id: userId, module_id: moduleId, total_free_runs: 3, successful_runs_used: 0 }, { onConflict: "user_id,module_id", ignoreDuplicates: true });
        const { data: tr } = await supabase.from("trial_usage").select("successful_runs_used,total_free_runs").eq("user_id", userId).eq("module_id", moduleId).single();
        if (tr && tr.successful_runs_used < tr.total_free_runs) {
          await supabase.from("trial_usage").update({ successful_runs_used: tr.successful_runs_used + 1 }).eq("user_id", userId).eq("module_id", moduleId);
          await supabase.from("module_runs").update({ trial_charged: true }).eq("run_id", runId);
          charged = true; remaining = tr.total_free_runs - tr.successful_runs_used - 1;
        } else remaining = 0;
      }
    }

    await supabase.from("audit_logs").insert({ user_id: userId, action: "run_created", metadata: { module: moduleId, charged } });
    return NextResponse.json({ runId, charged, remaining });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

// DELETE /api/auth/runs — 删除运行记录
export async function DELETE(request: Request) {
  try {
    const { runIds, userId } = await request.json();
    if (!runIds?.length || !userId) return NextResponse.json({ error: "缺少参数" }, { status: 400 });
    const supabase = getAdmin();
    const { error } = await supabase.from("module_runs").delete().in("run_id", runIds).eq("user_id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    await supabase.from("audit_logs").insert({ user_id: userId, action: "runs_deleted", metadata: { count: runIds.length } });
    return NextResponse.json({ deleted: runIds.length });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
