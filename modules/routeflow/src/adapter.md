# RouteFlow 适配层说明

## 当前状态

RouteFlow 的 Demo（`public/demos/routeflow/index.html`）是一个单文件 HTML，
所有数据硬编码，不接受外部输入，不输出结构化 JSON。

## 适配策略

**不动现有 Demo。** 本适配层"包裹"在 Demo 外面，提供标准接口。

## 输入适配（标准 JSON → Demo 可理解的格式）

当前 Demo 不接受外部输入，因此输入适配分为两个阶段：

**阶段 A（当前）**：校验
- `src/validate.js` 检查输入是否符合标准
- 如果格式正确但 Demo 尚不支持，返回明确信息："Demo 当前使用预计算数据，不支持自定义上传。请查看示例结果。"

**阶段 B（Next.js 重写后）**：
- 标准 JSON → 内部 solver 调用 → 标准 JSON 输出
- 本目录下的 Schema 和校验逻辑可直接复用

## 输出适配（Demo 的 DOM 状态 → 标准 JSON）

Demo 的结果散落在 Leaflet 地图图层和 DOM 元素中。

**当前阶段**：
- 手动整理了一份示例输出 JSON（`docs/module-briefs/routeflow-example-output.json`）
- 该 JSON 展示了"如果 Demo 能输出标准格式，应该长什么样"

**后续可增加**：
- 一个浏览器端 JS 小脚本，从 Demo 页面的 DOM 中提取当前显示的数据，
  组装成标准 JSON 格式，提供"导出 JSON"按钮。

## 数据映射

| Demo 中的概念 | 标准格式字段 |
|-------------|------------|
| 订单表行 | `data.orders[]` |
| 车型选择器 | `data.vehicles[].type` |
| 求解参数面板 | `config.solver` |
| 地图路线 | `result.routes[]` |
| 异常面板 | `result.exceptions[]` |
| 里程/载重汇总 | `result.summary` + `metrics` |

## 向后兼容

本适配层不修改原有 HTML。所有新功能以独立文件形式存在。
未来可以用 Next.js 组件替换 HTML 时，Schema 和校验逻辑保持不变。
