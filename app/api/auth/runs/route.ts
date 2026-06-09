import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

// GET /api/auth/runs?user_id=X&module_id=Y
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const moduleId = searchParams.get("module_id");
    if (!userId) return NextResponse.json({ error: "缺少 user_id" }, { status: 400 });

    const supabase = createSupabaseAdmin();
    let query = supabase.from("module_runs")
      .select("run_id, module_id, run_status, input_summary, result_data, trial_charged, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (moduleId) query = query.eq("module_id", moduleId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data || []);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/auth/runs — 保存运行 + 扣减试用次数
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, moduleId, moduleVersion, workspaceId, idempotencyKey, inputSummary, configSummary, resultData, runStatus, chargeTrial } = body;

    if (!userId || !moduleId || !idempotencyKey) {
      return NextResponse.json({ error: "缺少必填参数" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // 幂等检查
    const { data: existing } = await supabase
      .from("module_runs")
      .select("run_id, trial_charged")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        runId: existing.run_id,
        charged: existing.trial_charged,
        remaining: -1, // 未重新查询
      });
    }

    // 创建运行记录
    const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const { error: insertErr } = await supabase.from("module_runs").insert({
      run_id: runId,
      user_id: userId,
      workspace_id: workspaceId || null,
      module_id: moduleId,
      module_version: moduleVersion || "0.1.0",
      idempotency_key: idempotencyKey,
      run_status: runStatus,
      input_summary: inputSummary || {},
      config_summary: configSummary || {},
      result_data: resultData || null,
      trial_charged: false,
      completed_at: new Date().toISOString(),
    });

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    // 扣减试用次数
    let charged = false;
    let remaining = -1;

    if (chargeTrial && runStatus === "success") {
      const { data: chargeResult, error: chargeErr } = await supabase.rpc("charge_trial_run", {
        p_user_id: userId,
        p_module_id: moduleId,
        p_run_id: runId,
      });
      if (!chargeErr && chargeResult) {
        charged = chargeResult.charged;
        remaining = chargeResult.remaining;
      }
    }

    // 审计日志
    await supabase.from("audit_logs").insert({
      user_id: userId,
      action: "module_run_created",
      target_type: "module_run",
      target_id: runId,
      metadata: { module_id: moduleId, run_status: runStatus, trial_charged: charged },
    });

    return NextResponse.json({ runId, charged, remaining });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
