# ChainFlow 核心业务对象 V0.1

本文档定义 ChainFlow 所有工具模块共享的供应链业务对象。
每个对象只定义最小公共字段，模块专属字段在各模块的 Schema 中扩展。

## 设计原则

1. **最小公共字段**：只定义多个模块都会用到的字段，不追求大而全
2. **渐进统一**：先定义第一批对象，后续按需扩展
3. **允许扩展**：模块可以在自己的命名空间增加字段
4. **概念一致**：同一个概念不使用多个不同英文名
5. **单位明确**：时间、币种、重量、体积、距离等必须标注单位

---

## Organization｜企业/组织

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| name | string | 是 | 企业名称 |
| type | string | 否 | 类型：factory/trading/ecommerce/logistics/retail |
| annual_revenue_range | string | 否 | 年营收区间，用于匹配工具推荐 |

---

## Customer｜客户

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| name | string | 是 | 客户名称 |
| type | string | 否 | 类型：b2b/b2c/retail |
| location | Location | 否 | 常用收货地 |

> 注：Customer 是收货方，与 Organization（企业/组织）不同。
> 一个 Organization 可以对应多个 Customer。
> 目前只定义最小公共字段，客户详细信息可在各模块中扩展。

---

## Location｜地点

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| name | string | 是 | 显示名称 |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |
| address | string | 否 | 文本地址 |
| city | string | 否 | 城市 |
| province | string | 否 | 省份 |
| country | string | 否 | 国家，默认 CN |

---

## Supplier｜供应商

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| name | string | 是 | 供应商名称 |
| location | Location | 否 | 所在地 |
| lead_time_days | number | 否 | 平均交期（天） |
| moq | number | 否 | 最小起订量 |

---

## Product / SKU｜产品/物料

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | SKU 编号 |
| name | string | 是 | 产品名称 |
| category | string | 否 | 品类 |
| weight_kg | number | 否 | 单件重量（kg） |
| volume_m3 | number | 否 | 单件体积（m³） |
| unit_price | number | 否 | 单价（元） |

---

## Order｜订单

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 订单编号 |
| customer_name | string | 否 | 客户名称 |
| delivery_location | Location | 是 | 收货地址 |
| skus | array | 否 | 包含的 SKU 及数量 |
| quantity | number | 否 | 总件数 |
| weight_kg | number | 否 | 总重量（kg） |
| volume_m3 | number | 否 | 总体积（m³） |
| time_window_start | datetime | 否 | 最早送达时间 |
| time_window_end | datetime | 否 | 最晚送达时间 |
| service_time_min | number | 否 | 预计卸货/服务时间（分钟） |

---

## Demand｜需求

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 需求编号 |
| sku_id | string | 否 | 关联 SKU |
| location | Location | 否 | 需求所在地 |
| quantity | number | 是 | 需求量 |
| date | date | 是 | 需求日期 |
| is_promotion | boolean | 否 | 是否促销期 |

---

## Inventory｜库存

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 库存记录编号 |
| sku_id | string | 是 | 关联 SKU |
| warehouse_id | string | 是 | 所在仓库 |
| quantity_on_hand | number | 是 | 当前库存量 |
| quantity_reserved | number | 否 | 已预留量 |
| safety_stock | number | 否 | 安全库存水平 |
| last_updated | date | 否 | 最后更新日期 |

---

## Warehouse｜仓库

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| name | string | 是 | 仓库名称 |
| location | Location | 是 | 所在位置 |
| capacity_kg | number | 否 | 容量上限（kg） |
| capacity_m3 | number | 否 | 容量上限（m³） |
| fixed_cost | number | 否 | 固定运营成本（元/月） |
| is_candidate | boolean | 否 | 是否为候选仓点 |

---

## Vehicle｜车辆

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| type | string | 否 | 车型，如 金杯/4.2米/9.6米 |
| capacity_kg | number | 否 | 载重上限（kg） |
| capacity_m3 | number | 否 | 体积上限（m³） |
| depot_location | Location | 否 | 归属车场 |

---

## Shipment｜运输任务

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| vehicle_id | string | 否 | 执行车辆 |
| orders | array | 否 | 包含的订单 ID 列表 |
| route | array | 否 | 途经地点顺序 |
| distance_km | number | 否 | 预估里程（km） |
| duration_min | number | 否 | 预估时长（分钟） |
| departure_time | datetime | 否 | 计划发车时间 |

---

## Cost｜成本

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 成本类型：fixed/transport/labor/inventory |
| amount | number | 是 | 金额（元） |
| currency | string | 否 | 币种，默认 CNY |
| period | string | 否 | 周期：once/daily/monthly/yearly |

---

## RiskEvent｜风险事件

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| level | string | 是 | low / medium / high / critical |
| description | string | 是 | 风险描述 |
| affected_objects | array | 否 | 受影响的业务对象 ID |
| probability | number | 否 | 发生概率估计（0-1） |

---

## Recommendation｜建议

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| priority | integer | 是 | 优先级，1 最高 |
| action | string | 是 | 建议采取的行动 |
| rationale | string | 是 | 建议依据 |
| expected_impact | string | 否 | 预期影响 |

---

## Decision｜决策

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| request_id | string | 是 | 关联的请求 |
| chosen_option | string | 是 | 用户选择的方案 |
| reason | string | 否 | 用户选择理由 |
| decided_by | string | 否 | 决策人 |
| decided_at | datetime | 是 | 决策时间 |

---

## Feedback｜反馈

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识 |
| decision_id | string | 是 | 关联的决策 |
| actual_result | string | 否 | 实际执行结果 |
| deviation | string | 否 | 与预期的偏差 |
| lesson | string | 否 | 经验教训 |
| recorded_at | datetime | 是 | 记录时间 |
