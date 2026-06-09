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

// RouteFlow: LLM 解析数据 → 确定性求解器生成路线
export async function routeFlowPipeline(input: string): Promise<any> {
  // Step 1: LLM 解析输入
  const { parsed, tokensUsed: parseTokens } = await parseInput(input);

  // Step 2: 确定性求解器
  const orders = (parsed.orders || []).filter((o: any) => o.lat != null && o.lng != null);
  const depot = parsed.depot || { lat: 31.23, lng: 121.47, name: "配送中心" };
  const vehicles = (parsed.vehicles || []).length > 0 ? parsed.vehicles : [{ type: "默认", count: 1, capacity_kg: 99999 }];
  const result = solveRouteFlow(orders, depot, vehicles);

  // Step 3: LLM 解读
  const explainRes = await chatCompletion([
    { role: "system", content: EXPLAIN_PROMPT },
    { role: "user", content: JSON.stringify(result, null, 2) },
  ]);

  return {
    parsed: { ...parsed, orders, depot, vehicles },
    routes: result,
    explanation: explainRes.content,
    tokensUsed: { input: parseTokens.input + explainRes.tokensUsed.input, output: parseTokens.output + explainRes.tokensUsed.output },
  };
}

// NetworkFlow: LLM 解析输入 → 确定性求解器评估方案
export async function networkFlowPipeline(input: string): Promise<any> {
  const { parsed, tokensUsed: parseTokens } = await parseInput(input);

  const cities = (parsed.orders || []).filter((o: any) => o.lat != null && o.lng != null && o.name).map((o: any) => ({
    id: o.id, name: o.name || o.delivery_address || o.id, lat: o.lat, lng: o.lng, orders: o.quantity || o.orders || 1,
  }));

  const warehouses = (parsed.warehouses || parsed.candidate_warehouses || []).map((w: any) => ({
    id: w.id || w.name, name: w.name || w.id, lat: w.lat, lng: w.lng,
    fixed_cost_monthly: w.fixed_cost_monthly || 50000,
    capacity_orders: w.capacity_orders || 200,
    service_radius_km: w.service_radius_km || 350,
  }));

  const config = parsed.config || {};
  const result = solveNetworkFlow(cities, warehouses, {
    max_warehouses: config.max_warehouses || 3,
    min_coverage: config.min_coverage || 0.7,
    transport_cost_per_km_per_order: config.transport_cost_per_km_per_order || 2.5,
  });

  const explainRes = await chatCompletion([
    { role: "system", content: EXPLAIN_PROMPT },
    { role: "user", content: JSON.stringify(result, null, 2) },
  ]);

  return {
    parsed,
    routes: result,
    explanation: explainRes.content,
    tokensUsed: { input: parseTokens.input + explainRes.tokensUsed.input, output: parseTokens.output + explainRes.tokensUsed.output },
  };
}
