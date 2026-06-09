/**
 * ChainFlow RouteFlow & NetworkFlow 数据管道
 * LLM：字段识别 + 数据清洗 + 自然语言解释
 * 求解器：路线生成 + 选址评估（确定性计算，不依赖 LLM）
 */

import { chatCompletion } from "./llm";
import { solveRouteFlow, solveNetworkFlow } from "./solver";

const PARSE_PROMPT = `你是一个数据工程师。从用户输入中提取配送订单，输出 JSON:
{ "orders": [{ "id": "编号","lat": 纬度或null,"lng": 经度或null,"weight_kg": 重量或0,"volume_m3": 体积或0,"delivery_address": "地址","time_window_start": "最早时间ISO或null","time_window_end": "最晚时间ISO或null" }], "depot": { "lat": 数字, "lng": 数字, "name": "配送中心" }, "vehicles": [{ "type": "车型", "count": 数量, "capacity_kg": 载重或0, "capacity_m3": 体积或0 }], "warnings": ["数据质量问题"], "confidence": 0.0-1.0 }
无法推断的字段填 null/0，不要编造。warnings 如实列出数据质量问题。`;

const EXPLAIN_PROMPT = `你是供应链顾问。根据排线/选址结果写简短报告（200字内）：
1. 运营摘要；2. 关键发现；3. 行动建议；4. 声明"AI辅助，人工复核后执行"。
不要复述数据，要说"这意味着什么"。`;

export async function parseInput(input: string): Promise<any> {
  const res = await chatCompletion([
    { role: "system", content: PARSE_PROMPT },
    { role: "user", content: input },
  ]);
  const jsonMatch = res.content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("LLM 未返回有效 JSON");
  const parsed = JSON.parse(jsonMatch[0]);
  return { parsed, tokensUsed: res.tokensUsed };
}

// 智能解析：优先 LLM，失败回退到直接 JSON.parse
async function smartParse(input: string): Promise<{ parsed: any; tokensUsed: any; usedLLM: boolean }> {
  // 尝试直接 JSON 解析（用户可能提供了标准 JSON）
  try {
    const direct = JSON.parse(input);
    if (direct.orders || direct.data?.orders || direct.demand_cities) {
      const parsed = direct.data || direct;
      return { parsed, tokensUsed: { input: 0, output: 0 }, usedLLM: false };
    }
  } catch { /* 不是 JSON，用 LLM */ }

  // LLM 解析
  try {
    const { parsed, tokensUsed } = await parseInput(input);
    return { parsed, tokensUsed, usedLLM: true };
  } catch (e: any) {
    throw new Error(`数据解析失败: ${e.message}。请检查输入格式，或粘贴标准 JSON。`);
  }
}

// RouteFlow: 智能解析 → 确定性求解器 → （可选）LLM 解读
export async function routeFlowPipeline(input: string): Promise<any> {
  const { parsed, tokensUsed: parseTokens, usedLLM } = await smartParse(input);

  const orders = (parsed.orders || []).filter((o: any) => o.lat != null && o.lng != null);
  const depot = parsed.depot || { lat: 31.23, lng: 121.47, name: "配送中心" };
  const vehicles = (parsed.vehicles || []).length > 0 ? parsed.vehicles : [{ type: "默认", count: 1, capacity_kg: 99999 }];

  // 核心计算：确定性求解器（不依赖 LLM）
  const result = solveRouteFlow(orders, depot, vehicles);

  // LLM 解读（可选：失败不影响核心计算）
  let explanation = "";
  let explainTokens = { input: 0, output: 0 };
  try {
    const explainRes = await chatCompletion([
      { role: "system", content: EXPLAIN_PROMPT },
      { role: "user", content: JSON.stringify(result, null, 2) },
    ]);
    explanation = explainRes.content;
    explainTokens = explainRes.tokensUsed;
  } catch (e) {
    explanation = "（AI 解读暂不可用。以下为确定性求解器生成的排线结果，请人工复核。）";
  }

  return {
    parsed: { ...parsed, orders, depot, vehicles },
    routes: result,
    explanation,
    tokensUsed: { input: parseTokens.input + explainTokens.input, output: parseTokens.output + explainTokens.output },
  };
}

// NetworkFlow: 智能解析 → 确定性求解器 → （可选）LLM 解读
export async function networkFlowPipeline(input: string): Promise<any> {
  const { parsed, tokensUsed: parseTokens } = await smartParse(input);

  const cities = (parsed.orders || parsed.demand_cities || []).filter((o: any) => o.lat != null && o.lng != null).map((o: any) => ({
    id: o.id || o.name, name: o.name || o.delivery_address || o.id, lat: o.lat, lng: o.lng, orders: o.orders || o.quantity || 1,
  }));

  const warehouses = (parsed.warehouses || parsed.candidate_warehouses || []).map((w: any) => ({
    id: w.id || w.name, name: w.name || w.id, lat: w.lat, lng: w.lng,
    fixed_cost_monthly: w.fixed_cost_monthly || 50000,
    capacity_orders: w.capacity_orders || 200,
    service_radius_km: w.service_radius_km || 350,
  }));

  const cfg = parsed.config || {};
  const result = solveNetworkFlow(cities, warehouses, {
    max_warehouses: cfg.max_warehouses || 3,
    min_coverage: cfg.min_coverage || 0.7,
    transport_cost_per_km_per_order: cfg.transport_cost_per_km_per_order || 2.5,
  });

  let explanation = "";
  try {
    const explainRes = await chatCompletion([
      { role: "system", content: EXPLAIN_PROMPT },
      { role: "user", content: JSON.stringify(result, null, 2) },
    ]);
    explanation = explainRes.content;
  } catch (e) {
    explanation = "（AI 解读暂不可用。以下为确定性求解器生成的仓网评估结果，请人工复核。）";
  }

  return { parsed, routes: result, explanation, tokensUsed: parseTokens };
}
