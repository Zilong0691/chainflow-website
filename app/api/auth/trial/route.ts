import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

// GET /api/auth/trial?module_id=routeflow
// 返回当前用户对该模块的试用次数状态
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get("module_id");
    const userId = searchParams.get("user_id");

    if (!moduleId || !userId) {
      return NextResponse.json({ error: "缺少参数" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("trial_usage")
      .select("successful_runs_used, remaining_runs")
      .eq("user_id", userId)
      .eq("module_id", moduleId)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      used: data?.successful_runs_used || 0,
      remaining: data?.remaining_runs ?? 3,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/auth/trial
// 尝试扣减试用次数（仅在运行成功后调用）
export async function POST(request: Request) {
  try {
    const { userId, moduleId, runId, idempotencyKey } = await request.json();

    if (!userId || !moduleId || !runId) {
      return NextResponse.json({ error: "缺少参数" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // 检查幂等性
    if (idempotencyKey) {
      const { data: existing } = await supabase
        .from("module_runs")
        .select("id, trial_charged")
        .eq("idempotency_key", idempotencyKey)
        .maybeSingle();
      if (existing?.trial_charged) {
        return NextResponse.json({ charged: false, reason: "already_charged" });
      }
    }

    // 事务：扣减次数
    const { data, error } = await supabase.rpc("charge_trial_run", {
      p_user_id: userId,
      p_module_id: moduleId,
      p_run_id: runId,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ charged: data?.charged ?? false, remaining: data?.remaining ?? 0 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
