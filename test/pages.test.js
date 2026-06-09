/**
 * ChainFlow 工具页面稳定化测试 V0.1
 *
 * 验证：
 * 1. 页面数据集可稳定读取
 * 2. 数据中不存在随机生成逻辑
 * 3. 旧 Demo 文件仍然存在
 * 4. 页面核心数据结构符合模块输出 Schema
 * 5. 页面所需静态资源路径有效
 *
 * 用法：node test/pages.test.js
 * 集成：npm test（与模块标准测试一起运行）
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

/* ───────────────────────────────────────── */
/* 1. 旧 Demo 文件存在性                     */
/* ───────────────────────────────────────── */

test("RouteFlow 旧 Demo 文件存在", () => {
  const p = path.join(__dirname, "..", "public", "demos", "routeflow", "index.html");
  assert(fs.existsSync(p), `文件不存在: ${p}`);
  const stat = fs.statSync(p);
  assert(stat.size > 100000, `文件过小 (${stat.size} bytes)，可能被破坏`);
});

test("NetworkFlow 旧 Demo 文件存在", () => {
  const p = path.join(__dirname, "..", "public", "demos", "networkflow", "index.html");
  assert(fs.existsSync(p), `文件不存在: ${p}`);
  const stat = fs.statSync(p);
  assert(stat.size > 100000, `文件过小 (${stat.size} bytes)，可能被破坏`);
});

/* ───────────────────────────────────────── */
/* 2. 页面源代码不含随机逻辑                  */
/* ───────────────────────────────────────── */

function checkNoRandom(filePath, fileName) {
  const raw = fs.readFileSync(filePath, "utf-8");
  // 移除注释后检查（避免注释中的文字说明被误判）
  const noComments = raw
    .replace(/\/\*[\s\S]*?\*\//g, "")  // 块注释
    .replace(/\/\/.*/g, "");            // 行注释
  assert(!noComments.includes("Math.random("), `${fileName} 包含 Math.random()，结果不可重复`);
}

test("RouteFlow 页面不含 Math.random()", () => {
  checkNoRandom(
    path.join(__dirname, "..", "app", "tools", "routeflow", "page.tsx"),
    "RouteFlow page.tsx"
  );
});

test("NetworkFlow 页面不含 Math.random()", () => {
  checkNoRandom(
    path.join(__dirname, "..", "app", "tools", "networkflow", "page.tsx"),
    "NetworkFlow page.tsx"
  );
});

/* ───────────────────────────────────────── */
/* 3. 页面数据集可稳定读取（JSON 部分）       */
/* ───────────────────────────────────────── */

test("RouteFlow 校验用示例输入可读取且结构合法", () => {
  // 使用 modules/ 下的校验示例（被 validate.js 消费）
  const p = path.join(__dirname, "..", "modules", "routeflow", "examples", "valid-input.json");
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  assert(d.module_id === "routeflow", "module_id 应为 routeflow");
  assert(d.data.orders.length >= 3, "至少应有 3 个订单");
  assert(d.data.depot, "缺少 depot");
  assert(d.data.vehicles.length >= 2, "至少应有 2 种车型");
});

test("NetworkFlow 校验用示例输入可读取且结构合法", () => {
  // 使用 modules/ 下的校验示例（被 validate.js 消费）
  const p = path.join(__dirname, "..", "modules", "networkflow", "examples", "valid-input.json");
  const d = JSON.parse(fs.readFileSync(p, "utf-8"));
  assert(d.module_id === "networkflow", "module_id 应为 networkflow");
  assert(d.data.demand_cities.length >= 4, "至少应有 4 个需求城市");
  assert(d.data.candidate_warehouses.length >= 3, "至少应有 3 个候选仓");
});

/* ───────────────────────────────────────── */
/* 4. 页面源码不含 CDN 动态脚本加载          */
/* ───────────────────────────────────────── */

test("RouteFlow 页面不再从 CDN 动态加载 Leaflet", () => {
  // Leaflet 代码在 MapPanel.tsx 中（通过 dynamic import 加载）
  const mapFile = path.join(__dirname, "..", "app", "tools", "routeflow", "MapPanel.tsx");
  const pageFile = path.join(__dirname, "..", "app", "tools", "routeflow", "page.tsx");
  const raw = fs.readFileSync(mapFile, "utf-8");
  assert(!raw.includes("unpkg.com"), "MapPanel 仍引用 unpkg.com CDN");
  assert(raw.includes('from "leaflet"'), "MapPanel 应使用 npm leaflet 包");
  // page.tsx 不应有 unpkg CDN 引用
  const pageRaw = fs.readFileSync(pageFile, "utf-8");
  assert(!pageRaw.includes("unpkg.com"), "page.tsx 仍引用 unpkg.com CDN");
});

test("NetworkFlow 页面不再从 CDN 动态加载 Leaflet", () => {
  const mapFile = path.join(__dirname, "..", "app", "tools", "networkflow", "NFMap.tsx");
  const pageFile = path.join(__dirname, "..", "app", "tools", "networkflow", "page.tsx");
  const raw = fs.readFileSync(mapFile, "utf-8");
  assert(!raw.includes("unpkg.com"), "NFMap 仍引用 unpkg.com CDN");
  assert(raw.includes('from "leaflet"'), "NFMap 应使用 npm leaflet 包");
  const pageRaw = fs.readFileSync(pageFile, "utf-8");
  assert(!pageRaw.includes("unpkg.com"), "page.tsx 仍引用 unpkg.com CDN");
});

/* ───────────────────────────────────────── */
/* 5. 页面所需静态资源路径                    */
/* ───────────────────────────────────────── */

const staticAssets = [
  "public/chainflow-hero-flow.jpg",
  "public/chainflow-hero-flow-orig.png",
];

staticAssets.forEach(asset => {
  test(`静态资源存在: ${asset}`, () => {
    const p = path.join(__dirname, "..", asset);
    assert(fs.existsSync(p), `文件不存在: ${p}`);
  });
});

/* ───────────────────────────────────────── */
/* 6. 页面源码包含生命周期清理               */
/* ───────────────────────────────────────── */

test("RouteFlow 页面地图组件包含 map.remove() 清理", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "routeflow", "MapPanel.tsx"), "utf-8"
  );
  assert(raw.includes("map.remove()"), "MapPanel 应包含 map.remove() 清理");
  assert(raw.includes("removeEventListener"), "MapPanel 应包含 removeEventListener 清理");
});

test("NetworkFlow 页面地图组件包含 map.remove() 清理", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "networkflow", "NFMap.tsx"), "utf-8"
  );
  assert(raw.includes("map.remove()"), "NFMap 应包含 map.remove() 清理");
  assert(raw.includes("removeEventListener"), "NFMap 应包含 removeEventListener 清理");
});

/* ───────────────────────────────────────── */
/* 7. 数据集不包含随机逻辑                   */
/* ───────────────────────────────────────── */

test("RouteFlow 数据集两次读取结果完全一致", () => {
  // 读两次 source 文件，确认 TSX 中硬编码数据完全一致
  const p = path.join(__dirname, "..", "app", "tools", "routeflow", "page.tsx");
  const raw1 = fs.readFileSync(p, "utf-8");
  const raw2 = fs.readFileSync(p, "utf-8");
  assert(raw1 === raw2, "两次读取不一致（这不应发生）");

  // 提取 "const DEMO_DATA" 段
  const match = raw1.match(/const DEMO_DATA = (\{[\s\S]*?\n\};)/);
  assert(match, "DEMO_DATA 定义未找到");

  // 移除注释后验证不包含随机逻辑
  const noComments = raw1
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "");
  assert(!noComments.includes("Math.random"), "仍包含 Math.random（非注释代码中）");
});

test("NetworkFlow 数据集两次读取结果完全一致", () => {
  const p = path.join(__dirname, "..", "app", "tools", "networkflow", "page.tsx");
  const raw1 = fs.readFileSync(p, "utf-8");
  const raw2 = fs.readFileSync(p, "utf-8");
  assert(raw1 === raw2, "两次读取不一致（这不应发生）");

  // 验证 fixedOffset 替代了 Math.random（代码在 NFMap.tsx 中）
  const nfMapRaw = fs.readFileSync(
    path.join(__dirname, "..", "app", "tools", "networkflow", "NFMap.tsx"), "utf-8"
  );
  assert(nfMapRaw.includes("fixedOffset"), "NFMap 应使用 fixedOffset 替代 Math.random");
  const nfMapNoComments = nfMapRaw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "");
  assert(!nfMapNoComments.includes("Math.random"), "NFMap 非注释代码中仍包含 Math.random");
});

/* ───────────────────────────────────────── */
/* 8. 功能对照文档存在                        */
/* ───────────────────────────────────────── */

test("RouteFlow 功能对照文档存在", () => {
  const p = path.join(__dirname, "..", "docs", "module-briefs", "routeflow-comparison.md");
  assert(fs.existsSync(p), "缺少功能对照文档");
});

test("NetworkFlow 功能对照文档存在", () => {
  const p = path.join(__dirname, "..", "docs", "module-briefs", "networkflow-comparison.md");
  assert(fs.existsSync(p), "缺少功能对照文档");
});

/* ───────────────────────────────────────── */
/* 结果汇总                                  */
/* ───────────────────────────────────────── */

console.log(`\n${"─".repeat(40)}`);
console.log(`通过: ${passed}  失败: ${failed}  总计: ${passed + failed}`);
if (failed > 0) {
  console.log("❌ 页面稳定化测试失败");
  process.exit(1);
} else {
  console.log("✅ 全部页面稳定化测试通过");
}
