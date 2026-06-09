/**
 * ChainFlow 工具页面测试 V0.3
 * 页面 = ToolDemoPage (iframe 嵌入完整旧 Demo)
 */

const fs = require("fs");
const path = require("path");

let passed = 0;
let failed = 0;

function test(description, fn) {
  try { fn(); passed++; console.log(`  ✅ ${description}`); }
  catch (e) { failed++; console.log(`  ❌ ${description}`); console.log(`     ${e.message}`); }
}
function assert(condition, message) { if (!condition) throw new Error(message || "断言失败"); }
function noComments(raw) { return raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, ""); }

/* ── 1. 旧 Demo 完整保留 ── */
test("RouteFlow 旧 Demo 文件存在且完整", () => {
  const p = path.join(__dirname, "..", "public", "demos", "routeflow", "index.html");
  assert(fs.existsSync(p), "文件不存在");
  assert(fs.statSync(p).size > 100000, "文件可能被破坏");
});
test("NetworkFlow 旧 Demo 文件存在且完整", () => {
  const p = path.join(__dirname, "..", "public", "demos", "networkflow", "index.html");
  assert(fs.existsSync(p), "文件不存在");
  assert(fs.statSync(p).size > 100000, "文件可能被破坏");
});

/* ── 2. ToolDemoPage 组件引用 Demo ── */
test("ToolDemoPage 组件引用 RouteFlow Demo", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "components", "ToolDemoPage.tsx"), "utf-8");
  assert(raw.includes("/demos/routeflow/"), "应引用 RouteFlow Demo 路径");
});
test("ToolDemoPage 组件引用 NetworkFlow Demo", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "components", "ToolDemoPage.tsx"), "utf-8");
  assert(raw.includes("/demos/networkflow/"), "应引用 NetworkFlow Demo 路径");
});

/* ── 3. 页面引用完整 Demo ── */
test("RouteFlow 页面引用旧 Demo", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "app", "tools", "routeflow", "page.tsx"), "utf-8");
  assert(raw.includes("/demos/routeflow/"), "应引用 RouteFlow Demo");
});
test("NetworkFlow 页面使用 ToolDemoPage", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "app", "tools", "networkflow", "page.tsx"), "utf-8");
  assert(raw.includes("ToolDemoPage"), "应使用 ToolDemoPage");
});

/* ── 4. 不含随机逻辑 ── */
test("ToolDemoPage 不含 Math.random()", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "components", "ToolDemoPage.tsx"), "utf-8");
  assert(!noComments(raw).includes("Math.random("), "包含 Math.random()");
});

/* ── 5. 校验示例有效 ── */
test("RouteFlow 校验示例合法", () => {
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "modules", "routeflow", "examples", "valid-input.json"), "utf-8"));
  assert(d.module_id === "routeflow", "module_id 错误");
  assert(d.data.orders.length >= 3, "订单数不足");
});
test("NetworkFlow 校验示例合法", () => {
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "modules", "networkflow", "examples", "valid-input.json"), "utf-8"));
  assert(d.module_id === "networkflow", "module_id 错误");
  assert(d.data.demand_cities.length >= 4, "需求城市不足");
});

/* ── 6. 静态资源 ── */
["public/chainflow-hero-flow.jpg", "public/chainflow-hero-flow-orig.png"].forEach(a => {
  test(`静态资源: ${a}`, () => assert(fs.existsSync(path.join(__dirname, "..", a)), "不存在"));
});

/* ── 结果 ── */
console.log(`\n${"─".repeat(40)}`);
console.log(`通过: ${passed}  失败: ${failed}  总计: ${passed + failed}`);
if (failed > 0) { console.log("❌ 失败"); process.exit(1); }
else { console.log("✅ 全部通过"); }
