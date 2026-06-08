# ChainFlow Module Standard V0.1 纸面兼容性测试

使用 RouteFlow、NetworkFlow、DemandFlow 三类差异明显的工具，
检验 V0.1 标准是否过紧、过松、或对当前两个工具过度定制。

## 测试结论：通过

三类工具均可容纳在当前公共外壳中，无需修改标准。

## 公共外壳容纳情况

| 字段 | RouteFlow | NetworkFlow | DemandFlow | 是否有问题 |
|------|-----------|-------------|------------|-----------|
| schema_version | ✅ | ✅ | ✅ | 无 |
| request_id | ✅ | ✅ | ✅ | 无 |
| module_id | ✅ | ✅ | ✅ | 无 |
| data | ✅ 订单+车辆 | ✅ 需求+候选仓 | ✅ 历史需求+库存 | 灵活 |
| config | ✅ 车场/车型 | ✅ 成本/半径 | ✅ 预测周期 | 灵活 |
| constraints | ✅ 容量/时间窗 | ✅ 服务半径/容量 | ✅ 缺货阈值 | 灵活 |
| context | ✅ | ✅ | ✅ | 无 |

## 公共对象使用情况（哪些真正通用）

| 对象 | RouteFlow | NetworkFlow | DemandFlow | 判定 |
|------|-----------|-------------|------------|------|
| Organization | ○ | ○ | ○ | 通用但轻量 |
| Location | ● | ● | ○ | 通用 |
| Order | ● | - | - | RouteFlow 专属 |
| Demand | - | ● | ● | NF/DF 共用 |
| Inventory | - | - | ● | DF 专属 |
| Warehouse | - | ● | - | NF 专属 |
| Vehicle | ● | - | - | RF 专属 |
| Cost | - | ● | - | NF 专属 |
| RiskEvent | ● | ● | ● | 通用 |
| Recommendation | ● | ● | ● | 通用 |

● = 核心使用　○ = 轻度使用　- = 不使用

## 哪些字段只应存在于模块内部

- RouteFlow 的 `solver` 参数、`service_time_min`、`time_window` 细节
- NetworkFlow 的 `fixed_cost_monthly`、`transport_cost_per_km`、`service_radius_km`
- DemandFlow 的 `forecast_horizon`、`seasonality`、`promotion_calendar`

这些放在各模块的 `data` 和 `config` 中，由各自的 `input.schema.json` 定义。

## 公共对象定义评估

### 过宽的定义
- **Product/SKU** 目前较轻量。对 RouteFlow 不需要单品级，但对 DemandFlow 可能需要。当前定义为"最小公共字段"，适合 V0.1。

### 过窄的定义
- **Cost** 仅定义了 `type/amount/currency/period`，NetworkFlow 的成本拆分（fixed vs transport）可以通过多条 Cost 记录表达，足够。
- **RiskEvent** 缺少 `probability` 字段的量化标准。后续可在模块扩展中补充。

## 是否存在为当前两个工具过度定制

**否。** 三个 Schema（请求/结果/错误）都是通用结构，未出现 RouteFlow 或 NetworkFlow 专属字段。`data`、`config`、`result` 都用 `type: object` 保持灵活。

## 是否需要删减或调整标准

**当前不需要。** V0.1 标准足够容纳三类工具。建议在至少完成一个完整模块的标准化改造后，再评估是否需要 V0.2。

## 未来潜在调整点

1. DemandFlow 开发时，可能需要增加 `TimeSeries` 公共对象
2. 如果多个模块都需要 `Supplier`，可能需要从轻量升级为中等定义
3. `metrics` 目前是自由对象，如果多个模块都输出相同指标（如 `total_cost`），可以约定公共指标名
