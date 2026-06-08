# RouteFlow 能力说明

## 当前状态

- 阶段：Prototype（可交互 Demo）
- Demo 位置：`public/demos/routeflow/index.html`
- 网站入口：`/tools/routeflow`
- 数据：硬编码 801 个脱敏订单，预计算 29 条路线

## 当前能力

将订单表转化为：
- 车辆分配方案
- 配送顺序
- 司机任务信息
- 交互式路线地图
- 作业甘特图
- 异常处置建议（超载、超时等）

## 当前限制

- 数据硬编码，不接受外部上传
- 无输入校验
- 无结构化 JSON 输出
- 移动端地图显示和面板滚动有问题
- 暂不支持实时地址解析
- 暂不支持动态插单

## 长期能力定位

**履约规划与物流决策模块**

在 ChainFlow 三层中属于第一层（效率层），
可被第二层 Decision 模块调用，作为决策链的"执行"环节。

未来：
- DemandFlow 预测需求 → RouteFlow 生成履约方案
- StockCheck 识别缺货 → RouteFlow 规划紧急配送
- 与 NetworkFlow 组合：先定仓网，再排配送

## 标准化改造路线

1. 保持现有 Demo 不动
2. 撰写 `module.json`（已完成模板）
3. 整理示例输入 JSON（从硬编码数据中提取）
4. 整理示例输出 JSON（Route + Vehicle + Exception + Metric）
5. 增加输入校验逻辑
6. Next.js 重写前端（替代 WorkBuddy HTML）
7. 输出结构化为 JSON + Excel + 地图
