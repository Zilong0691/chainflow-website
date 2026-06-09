# RouteFlow — 短途配送排线助手

## 当前状态：Prototype（完整 Demo + Next.js 外壳）

| 版本 | 路径 | 定位 |
|------|------|------|
| 旧 HTML Demo | `public/demos/routeflow/index.html` | **完整功能版**（29条路线、甘特图、司机面板、参数调整、站点详情） |
| Next.js 页面 | `app/tools/routeflow/page.tsx` | iframe 嵌入完整 Demo + 顶栏统计 + JSON 导出 |

Next.js 页面通过 iframe 保留旧 Demo 全部交互，不做功能替换。

## 解决什么问题

把一张不完美的订单表，整理成车辆排线方案、司机任务表、异常处置建议和可视化路线图。

## 适合谁

同城配送团队、小型车队、门店补货、区域分拨调度人员。

## 输入

| 字段 | 必填 | 说明 |
|------|------|------|
| 订单列表 | 是 | 每条含编号、经纬度、重量、体积、时间窗 |
| 配送中心 | 是 | 经纬度、发车时间、回站时间 |
| 车辆信息 | 是 | 车型、可用数量、载重/体积上限 |
| 人工规则 | 否 | 不可分装订单组、车型指定等 |

完整定义见 `input.schema.json`。

## 输出

- 排线方案（每车路线和配送顺序）
- 司机任务表（每站到达时间、货量）
- 异常处置建议（超载、超时、地址异常）
- 量化指标（总里程、车辆数、利用率）
- 交互地图和甘特图（HTML）

完整定义见 `output.schema.json`。示例输出见 `docs/module-briefs/routeflow-example-output.json`。

## 当前限制

- 数据硬编码在 HTML 中，不接受外部上传
- 无输入校验和错误处理
- 距离为直线估算
- 移动端交互有问题

## 适配说明

当前 Demo 是硬编码 HTML。本模块目录提供的是**适配层**：

- `module.json`：定义模块身份
- `input.schema.json`：定义如果接受标准输入应该长什么样
- `output.schema.json`：定义如果输出标准 JSON 应该长什么样
- `src/validate.js`：输入校验脚本（可独立运行）
- `examples/`：示例数据

适配层不修改原有 HTML，而是"描述"它应该遵守的合同。
后续 Next.js 重写时，可直接复用这些 Schema 和校验逻辑。

## 数据安全

- 本模块默认使用脱敏或模拟数据
- Demo 不承载真实业务文件
- 如需使用真实数据，请确认已完成脱敏

## 如何运行校验

```bash
node src/validate.js examples/valid-input.json
```

## 长期定位

履约规划与物流决策模块。可被 DemandFlow（预测需求→规划运力）、
StockCheck（缺货→紧急配送）等上层模块调用。
