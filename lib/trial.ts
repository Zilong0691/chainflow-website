/**
 * Trial & Workspace 管理
 * 客户端 API 封装，调用服务端接口
 */

export interface TrialStatus {
  used: number;
  remaining: number;
  moduleId: string;
}

export interface RunRecord {
  run_id: string;
  module_id: string;
  run_status: string;
  input_summary: any;
  result_data: any;
  trial_charged: boolean;
  created_at: string;
}

// 查询试用状态
export async function fetchTrialStatus(userId: string, moduleId: string): Promise<TrialStatus> {
  const res = await fetch(`/api/auth/trial?user_id=${userId}&module_id=${moduleId}`);
  if (!res.ok) throw new Error("获取试用状态失败");
  return res.json();
}

// 保存运行记录并扣减试用次数
export async function saveModuleRun(params: {
  userId: string;
  moduleId: string;
  moduleVersion: string;
  workspaceId?: string;
  idempotencyKey: string;
  inputSummary: any;
  configSummary?: any;
  resultData?: any;
  runStatus: "success" | "partial" | "error";
  chargeTrial: boolean;
}): Promise<{ runId: string; charged: boolean; remaining: number }> {
  const res = await fetch("/api/auth/runs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "保存运行记录失败");
  }
  return res.json();
}

// 获取用户运行历史
export async function fetchRunHistory(userId: string, moduleId: string): Promise<RunRecord[]> {
  const res = await fetch(`/api/auth/runs?user_id=${userId}&module_id=${moduleId}`);
  if (!res.ok) throw new Error("获取运行历史失败");
  return res.json();
}
