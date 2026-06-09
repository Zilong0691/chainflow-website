/**
 * ChainFlow RouteFlow 数据管道
 * 原始输入 → LLM解析 → 结构化订单 → LLM排线 → LLM解读
 */

import { chatCompletion } from "./llm";

const PARSE_PROMPT = `你是一个供应链数据工程师。用户的输入可能是一段混乱的文本、表格、或者不完整的 JSON。
请从中提取配送订单信息，输出严格的 JSON 格式：

{
  "orders": [
    {
      "id": "订单编号（如无则生成 ORD001, ORD002...）",
      "delivery_address": "收货地址",
      "lat": 纬度数字（如无法推断填 null）,
      "lng": 经度数字（如无法推断填 null）,
      "weight_kg": 重量数字（如无法推断填 0）,
      "volume_m3": 体积（如无法推断填 0）,
      "time_window_start": "最早送达时间 ISO格式，如无法推断填 null",
      "time_window_end": "最晚送达时间 ISO格式，如无法推断填 null",
      "notes": "备注"
    }
  ],
  "depot": { "name": "配送中心名称", "lat": 数字, "lng": 数字, "address": "地址" },
  "vehicles": [{ "type": "车型", "count": 数量, "capacity_kg": 载重上限, "capacity_m3": 体积上限 }],
  "constraints": ["业务约束1", "业务约束2"],
  "warnings": ["数据质量问题1", "数据质量问题2"],
  "confidence": 0.8
}

规则：
- 不要编造数据。无法推断的字段填 null 或 0。
- 如果用户提到车型（如金杯、4.2米、面包车），保留原始名称。
- 如果提到了配送中心/仓库地址，填入 depot。
- warnings 列出你发现的数据质量问题（地址不完整、缺少重量等）。`;

const ROUTE_PROMPT = `你是一个物流调度专家。根据以下订单和车辆信息，生成配送排线方案。
输出严格 JSON：

{
  "summary": { "total_orders": 订单数, "total_routes": 路线数, "total_distance_km": 总里程, "total_weight_kg": 总货重 },
  "routes": [
    {
      "route_id": "R01",
      "vehicle_type": "车型",
      "vehicle_id": "车辆编号",
      "stops": [
        { "stop_number": 1, "order_id": "订单ID", "address": "地址", "arrival": "预计到达时间", "weight_kg": 货重 }
      ],
      "total_distance_km": 路线里程,
      "total_weight_kg": 路线货重,
      "utilization_weight": 0.85,
      "start_time": "发车时间",
      "status": "ready"
    }
  ],
  "exceptions": [
    { "type": "超载/超时/地址异常", "severity": "warning/critical", "description": "说明", "suggested_action": "建议" }
  ],
  "unserved_orders": ["无法配送的订单ID"],
  "assumptions": ["排线依赖的关键假设"]
}

排线原则：
- 就近分配：同一区域的订单尽量同车配送
- 容量约束：不超载（考虑 weight_kg 和 volume_m3）
- 时间窗约束：尽量满足客户时间窗
- 先按区域聚类，再按重量/体积分配到具体车辆
- 如果信息不足以做精确排线，在 assumptions 里诚实说明`;

const EXPLAIN_PROMPT = `你是一个供应链顾问。以下是排线结果，请用中文给业务人员写一份简洁的报告。

要求：
1. 运营摘要：一句话总结排线结果
2. 关键发现：2-3 个值得关注的数字或异常
3. 行动建议：给调度员 2-3 条具体建议
4. 底线提醒：说明这是 AI 辅助结果，需人工确认后再执行

不要复述数据，要说"这意味着什么"。控制篇幅在 200 字以内。`;

export async function parseInput(input: string): Promise<any> {
  const res = await chatCompletion([
    { role: "system", content: PARSE_PROMPT },
    { role: "user", content: input },
  ]);
  const jsonMatch = res.content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("LLM 未返回有效 JSON");
  return { parsed: JSON.parse(jsonMatch[0]), tokensUsed: res.tokensUsed };
}

export async function generateRoutes(orders: any): Promise<any> {
  const res = await chatCompletion([
    { role: "system", content: ROUTE_PROMPT },
    { role: "user", content: JSON.stringify(orders, null, 2) },
  ]);
  const jsonMatch = res.content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("LLM 未返回有效 JSON");
  return { routes: JSON.parse(jsonMatch[0]), tokensUsed: res.tokensUsed };
}

export async function explainResults(routes: any): Promise<any> {
  const res = await chatCompletion([
    { role: "system", content: EXPLAIN_PROMPT },
    { role: "user", content: JSON.stringify(routes, null, 2) },
  ]);
  return { explanation: res.content, tokensUsed: res.tokensUsed };
}
