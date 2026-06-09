import { NextResponse } from "next/server";
import { parseInput, routeFlowPipeline, networkFlowPipeline } from "@/lib/pipeline";

// LLM API 代理 — 路由到 LLM 解析 + 确定性求解器
export async function POST(request: Request) {
  try {
    const { action, input, userKey } = await request.json();
    if (!action || !input) return NextResponse.json({ error: "缺少参数" }, { status: 400 });

    const config = userKey ? { provider: "deepseek" as const, apiKey: userKey } : undefined;

    let result;
    switch (action) {
      case "parse":
        result = await parseInput(input);
        break;
      case "route":
        // RouteFlow 完整管道：LLM解析 → 求解器排线 → LLM解读
        result = await routeFlowPipeline(input);
        break;
      case "networkflow":
        // NetworkFlow 完整管道
        result = await networkFlowPipeline(input);
        break;
      case "explain":
        // 单独解释请求
        const { chatCompletion } = await import("@/lib/llm");
        result = await chatCompletion([
          { role: "system", content: "你是供应链顾问。根据以下数据写简短业务报告。" },
          { role: "user", content: JSON.stringify(input, null, 2) },
        ], config);
        result = { explanation: result.content, tokensUsed: result.tokensUsed };
        break;
      default:
        return NextResponse.json({ error: "未知 action" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("API error:", e.message);
    return NextResponse.json({ error: e.message || "处理失败", code: "API_ERROR" }, { status: 500 });
  }
}
