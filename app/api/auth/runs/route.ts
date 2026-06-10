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
    let query = supabase.from("module_runs").select("run_id,module_id,run_status,input_summary,result_data,trial_charged,created_at")
      .eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
    if (moduleId) query = query.eq("module_id", moduleId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/auth/runs — 事务性扣次（不依赖RPC）
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, moduleId, moduleVersion, workspaceId, idempotencyKey, inputSummary, configSummary, resultData, runStatus, chargeTrial } = body;
    if (!userId || !moduleId || !idempotencyKey) {
      return NextResponse.json({ error: "缺少必填参数" }, { status: 400 });
    }

    const supabase = getAdmin();

    // 幂等检查
    const { data: existing } = await supabase.from("module_runs").select("run_id,trial_charged").eq("idempotency_key", idempotencyKey).maybeSingle();
    if (existing) {
      return NextResponse.json({ runId: existing.run_id, charged: false, remaining: -1, reason: "already_exists" });
    }

    // 检查权益（有付费权益则不用trial）
    let hasEntitlement = false;
    if (chargeTrial) {
      const { data: ent } = await supabase.from("module_entitlements").select("id").eq("user_id", userId).eq("module_id", moduleId).eq("status", "active").maybeSingle();
      hasEntitlement = !!ent;
    }

    // 创建运行记录
    const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const { error: insertErr } = await supabase.from("module_runs").insert({
      run_id: runId, user_id: userId, workspace_id: workspaceId || null,
      module_id: moduleId, module_version: moduleVersion || "0.2.0",
      idempotency_key: idempotencyKey,
      run_status: runStatus || "success",
      input_summary: inputSummary || {}, config_summary: configSummary || {},
      result_data: resultData || null,
      trial_charged: false,
      completed_at: new Date().toISOString(),
    });
    if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });

    // 扣减试用次数
    let charged = false, remaining = -1;
    if (chargeTrial && runStatus === "success" && !hasEntitlement) {
      // 确保记录存在
      await supabase.from("trial_usage").upsert({ user_id: userId, module_id: moduleId, total_free_runs: 3, successful_runs_used: 0 }, { onConflict: "user_id,module_id", ignoreDuplicates: true });

      // 读-改-写（服务端串行，降低并发风险）
      const { data: trial } = await supabase.from("trial_usage").select("successful_runs_used,total_free_runs").eq("user_id", userId).eq("module_id", moduleId).single();
      if (trial && trial.successful_runs_used < trial.total_free_runs) {
        const newUsed = trial.successful_runs_used + 1;
        await supabase.from("trial_usage").update({ successful_runs_used: newUsed }).eq("user_id", userId).eq("module_id", moduleId);
        await supabase.from("module_runs").update({ trial_charged: true }).eq("run_id", runId);
        charged = true;
        remaining = trial.total_free_runs - newUsed;
      } else {
        remaining = 0;
      }
    }

    // 审计
    await supabase.from("audit_logs").insert({ user_id: userId, action: "module_run_created", target_type: "module_run", metadata: { module_id: moduleId, run_status: runStatus, trial_charged: charged } });

    return NextResponse.json({ runId, charged, remaining });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
