/**
 * ChainFlow 工具页面稳定化测试 V0.2
 *
 * 页面架构：Next.js 外壳 + iframe 嵌入完整旧 Demo
 * 旧 Demo 为完整功能参考版，iframe 保留全部交互
 */

const fs = require("fs");
const path = require("path");

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✅ ${description}`);
  } catch (e) {
    failed++;
    console.log(`  ❌ ${description}`);
    console.log(`     ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || "断言失败");
}

function noComments(raw) {
  return raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "");
}

/* ── 1. 旧 Demo 完整保留 ── */

test("RouteFlow 旧 Demo 文件存在且完整", () => {
  const p = path.join(__dirname, "..", "public", "demos", "routeflow", "index.html");
  assert(fs.existsSync(p), `文件不存在: ${p}`);
  assert(fs.statSync(p).size > 100000, "文件过小，可能被破坏");
});

test("NetworkFlow 旧 Demo 文件存在且完整", () => {
  const p = path.join(__dirname, "..", "public", "demos", "networkflow", "index.html");
  assert(fs.existsSync(p), `文件不存在: ${p}`);
  assert(fs.statSync(p).size > 100000, "文件过小，可能被破坏");
});

/* ── 2. 页面使用 iframe 嵌入旧 Demo ── */

test("RouteFlow 页面包含 iframe 嵌入", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "routeflow", "page.tsx"), "utf-8"
  );
  assert(raw.includes("/demos/routeflow/"), "应引用旧 Demo 路径");
  assert(raw.includes("<iframe"), "应使用 iframe");
});

test("NetworkFlow 页面包含 iframe 嵌入", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "networkflow", "page.tsx"), "utf-8"
  );
  assert(raw.includes("/demos/networkflow/"), "应引用旧 Demo 路径");
  assert(raw.includes("<iframe"), "应使用 iframe");
});

/* ── 3. 页面数据不含随机逻辑 ── */

test("RouteFlow page.tsx 不含 Math.random()", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "routeflow", "page.tsx"), "utf-8"
  );
  assert(!noComments(raw).includes("Math.random("), "page.tsx 包含 Math.random()");
});

test("RouteFlow data.ts 不含 Math.random()", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "routeflow", "data.ts"), "utf-8"
  );
  assert(!noComments(raw).includes("Math.random("), "data.ts 包含 Math.random()");
});

test("NetworkFlow page.tsx 不含 Math.random()", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "networkflow", "page.tsx"), "utf-8"
  );
  assert(!noComments(raw).includes("Math.random("), "page.tsx 包含 Math.random()");
});

/* ── 4. 数据文件可读取 ── */

test("RouteFlow data.ts 导出 SUMMARY/DRIVERS/EXCEPTIONS", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "routeflow", "data.ts"), "utf-8"
  );
  assert(raw.includes("export const SUMMARY"), "应导出 SUMMARY");
  assert(raw.includes("export const DRIVERS"), "应导出 DRIVERS");
  assert(raw.includes("export const EXCEPTIONS"), "应导出 EXCEPTIONS");
  assert(raw.includes("totalOrders: 801"), "SUMMARY 应包含 totalOrders");
  assert(raw.includes("totalRoutes: 29"), "SUMMARY 应包含 totalRoutes");
  assert(raw.includes("physicalVehicles: 27"), "SUMMARY 应包含 physicalVehicles");
});

/* ── 5. 校验示例有效 ── */

test("RouteFlow 校验用示例输入可读取且结构合法", () => {
  const p = path.join(__dirname, "..", "modules", "routeflow", "examples", "valid-input.json");
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  assert(d.module_id === "routeflow", "module_id 应为 routeflow");
  assert(d.data.orders.length >= 3, "至少应有 3 个订单");
  assert(d.data.depot, "缺少 depot");
  assert(d.data.vehicles.length >= 2, "至少应有 2 种车型");
});

test("NetworkFlow 校验用示例输入可读取且结构合法", () => {
  const p = path.join(__dirname, "..", "modules", "networkflow", "examples", "valid-input.json");
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  assert(d.module_id === "networkflow", "module_id 应为 networkflow");
  assert(d.data.demand_cities.length >= 4, "至少应有 4 个需求城市");
  assert(d.data.candidate_warehouses.length >= 3, "至少应有 3 个候选仓");
});

/* ── 6. 静态资源存在 ── */

const staticAssets = [
  "public/chainflow-hero-flow.jpg",
  "public/chainflow-hero-flow-orig.png",
];

staticAssets.forEach(asset => {
  test(`静态资源存在: ${asset}`, () => {
    assert(fs.existsSync(path.join(__dirname, "..", asset)), `文件不存在: ${asset}`);
  });
});

/* ── 7. 文档存在 ── */

test("RouteFlow 功能对照文档存在", () => {
  assert(fs.existsSync(path.join(__dirname, "..", "docs", "module-briefs", "routeflow-comparison.md")), "缺少对照文档");
});

test("NetworkFlow 功能对照文档存在", () => {
  assert(fs.existsSync(path.join(__dirname, "..", "docs", "module-briefs", "networkflow-comparison.md")), "缺少对照文档");
});

/* ── 结果 ── */

console.log(`\n${"─".repeat(40)}`);
console.log(`通过: ${passed}  失败: ${failed}  总计: ${passed + failed}`);
if (failed > 0) { console.log("❌ 页面稳定化测试失败"); process.exit(1); }
else { console.log("✅ 全部页面稳定化测试通过"); }
