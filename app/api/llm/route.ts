import { NextResponse } from "next/server";
import { parseInput, generateRoutes, explainResults } from "@/lib/pipeline";

// LLM API 代理
// 演示 Key 通过环境变量 DEEPSEEK_DEMO_KEY 配置
// 用户自有 Key 通过请求体传入，不使用演示 Key

export async function POST(request: Request) {
  try {
    const { action, input, userKey } = await request.json();

    if (!action || !input) {
      return NextResponse.json({ error: "缺少 action 或 input" }, { status: 400 });
    }
    if (!["parse", "route", "explain"].includes(action)) {
      return NextResponse.json({ error: "无效 action" }, { status: 400 });
    }

    // 优先使用用户 Key，否则用演示 Key
    const config = userKey ? { provider: "deepseek" as const, apiKey: userKey } : undefined;

    let result;
    switch (action) {
      case "parse":
        result = await parseInput(input);
        break;
      case "route":
        result = await generateRoutes(input);
        break;
      case "explain":
        result = await explainResults(input);
        break;
      default:
        return NextResponse.json({ error: "未知 action" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("LLM API error:", e);
    return NextResponse.json(
      { error: e.message || "LLM 调用失败", code: "LLM_ERROR" },
      { status: 500 }
    );
  }
}
