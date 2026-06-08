/**
 * ChainFlow Module Foundation V0.1 基础测试
 *
 * 使用 Node.js 内置 assert——不引入外部测试框架。
 * 覆盖：公共 Schema 合法性、模块模板合法性、RouteFlow/NetworkFlow 校验。
 *
 * 用法：node test/standards.test.js
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

// ──────────────────────────────────────────
// 1. 公共 JSON Schema 合法性
// ──────────────────────────────────────────

const schemaDir = path.join(__dirname, "..", "standards");

test("common-request.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(schemaDir, "common-request.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.$schema === "https://json-schema.org/draft/2020-12/schema", "缺少 $schema 声明");
  assert(s.title, "缺少 title");
  assert(s.type === "object", "type 应为 object");
  assert(s.properties.schema_version, "缺少 schema_version 字段");
  assert(s.properties.request_id, "缺少 request_id 字段");
  assert(s.properties.module_id, "缺少 module_id 字段");
  assert(s.properties.data, "缺少 data 字段");
});

test("common-response.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(schemaDir, "common-response.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.$schema === "https://json-schema.org/draft/2020-12/schema", "缺少 $schema 声明");
  assert(s.title, "缺少 title");
  assert(s.type === "object", "type 应为 object");
  assert(s.properties.status, "缺少 status 字段");
  assert(s.properties.status.enum.includes("success"), "status 应包含 success");
  assert(s.properties.status.enum.includes("partial"), "status 应包含 partial");
  assert(s.properties.status.enum.includes("error"), "status 应包含 error");
  assert(s.properties.result, "缺少 result 字段");
  assert(s.properties.requires_human_review, "缺少 requires_human_review 字段");
});

test("common-error.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(schemaDir, "common-error.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.$schema === "https://json-schema.org/draft/2020-12/schema", "缺少 $schema 声明");
  assert(s.title, "缺少 title");
  assert(s.properties.error.properties.code, "缺少 error.code");
  assert(s.properties.error.properties.recoverable, "缺少 error.recoverable");
  assert(s.properties.error.properties.suggested_action, "缺少 error.suggested_action");
});

// ──────────────────────────────────────────
// 2. 模块模板合法性
// ──────────────────────────────────────────

const templateDir = path.join(__dirname, "..", "templates", "module-template");

test("模板 module.json 是合法 JSON 且包含必要字段", () => {
  const raw = fs.readFileSync(path.join(templateDir, "module.json"), "utf-8");
  const m = JSON.parse(raw);
  assert(m.id, "缺少 id");
  assert(m.name, "缺少 name");
  assert(m.version, "缺少 version");
  assert(m.layer, "缺少 layer");
  assert(m.capabilities, "缺少 capabilities");
  assert(m.status, "缺少 status");
  assert(typeof m.requires_human_review === "boolean", "requires_human_review 应为布尔值");
});

test("模板 input.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(templateDir, "input.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.type === "object", "type 应为 object");
});

test("模板 output.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(templateDir, "output.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.type === "object", "type 应为 object");
});

// ──────────────────────────────────────────
// 3. RouteFlow 校验
// ──────────────────────────────────────────

const rfValidate = require("../modules/routeflow/src/validate.js").validate;

test("RouteFlow 合法示例通过输入校验", () => {
  const input = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "modules", "routeflow", "examples", "valid-input.json"), "utf-8")
  );
  const report = rfValidate(input);
  assert(report.valid === true, `验证应通过，但得到: ${JSON.stringify(report.errors)}`);
});

test("RouteFlow 非法示例被正确拒绝", () => {
  const input = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "modules", "routeflow", "examples", "invalid-input.json"), "utf-8")
  );
  const report = rfValidate(input);
  assert(report.valid === false, "验证应失败");
  assert(report.errors.length > 0, "应有错误信息");
  // 至少应捕获：缺少订单 id、坐标无效、车辆列表为空
  assert(report.errors.length >= 3, `应至少有 3 个错误，实际 ${report.errors.length}`);
});

test("RouteFlow 校验报告包含标准错误码", () => {
  const input = { data: { orders: [], depot: {}, vehicles: [] } };
  const report = rfValidate(input);
  const codes = report.errors.map(e => e.code);
  assert(codes.includes("INSUFFICIENT_DATA"), "应包含 INSUFFICIENT_DATA");
  codes.forEach(c => {
    assert(
      ["INVALID_INPUT","MISSING_FIELD","INVALID_FORMAT","UNSUPPORTED_CONSTRAINT",
       "INSUFFICIENT_DATA","MODEL_FAILED","EXTERNAL_SERVICE_ERROR","INTERNAL_ERROR"].includes(c),
      `${c} 不在标准错误码中`
    );
  });
});

// ──────────────────────────────────────────
// 4. NetworkFlow 校验
// ──────────────────────────────────────────

const nfValidate = require("../modules/networkflow/src/validate.js").validate;

test("NetworkFlow 合法示例通过输入校验", () => {
  const input = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "modules", "networkflow", "examples", "valid-input.json"), "utf-8")
  );
  const report = nfValidate(input);
  assert(report.valid === true, `验证应通过，但得到: ${JSON.stringify(report.errors)}`);
});

test("NetworkFlow 非法示例被正确拒绝", () => {
  const input = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "modules", "networkflow", "examples", "invalid-input.json"), "utf-8")
  );
  const report = nfValidate(input);
  assert(report.valid === false, "验证应失败");
  assert(report.errors.length > 0, "应有错误信息");
  // 至少应捕获：缺少需求城市 id/name、候选仓列表为空
  assert(report.errors.length >= 2, `应至少有 2 个错误，实际 ${report.errors.length}`);
});

test("NetworkFlow 校验报告包含警告信息", () => {
  const input = { data: { demand_cities: [{ id:"A", name:"A市", lat:10, lng:10 }], candidate_warehouses: [{ id:"W1", name:"W1", lat:80, lng:80 }] } };
  const report = nfValidate(input);
  assert(report.valid === true, "基本字段应通过");
  assert(report.warnings.length > 0, "应产生覆盖度警告");
});

// ──────────────────────────────────────────
// 5. 示例输出包含公共响应必要字段
// ──────────────────────────────────────────

test("RouteFlow 示例输出包含公共响应必要字段", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "docs", "module-briefs", "routeflow-example-output.json"), "utf-8"
  );
  const out = JSON.parse(raw);
  assert(out.schema_version, "缺少 schema_version");
  assert(out.request_id, "缺少 request_id");
  assert(out.module_id, "缺少 module_id");
  assert(out.module_version, "缺少 module_version");
  assert(out.status, "缺少 status");
  assert(out.result, "缺少 result");
  assert(out.generated_at, "缺少 generated_at");
});

test("NetworkFlow 示例输出包含公共响应必要字段", () => {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "docs", "module-briefs", "networkflow-example-output.json"), "utf-8"
  );
  const out = JSON.parse(raw);
  assert(out.schema_version, "缺少 schema_version");
  assert(out.request_id, "缺少 request_id");
  assert(out.module_id, "缺少 module_id");
  assert(out.module_version, "缺少 module_version");
  assert(out.status, "缺少 status");
  assert(out.result, "缺少 result");
  assert(out.generated_at, "缺少 generated_at");
});

// ──────────────────────────────────────────
// 6. DemandFlow Schema 可正常读取
// ──────────────────────────────────────────

test("DemandFlow module.json 可读取且包含必要字段", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "modules", "demandflow", "module.json"), "utf-8");
  const m = JSON.parse(raw);
  assert(m.id === "demandflow", "id 应为 demandflow");
  assert(m.layer === "decision", "应属于 decision 层");
  assert(m.status === "idea", "当前状态应为 idea");
});

test("DemandFlow input.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "modules", "demandflow", "input.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.type === "object", "type 应为 object");
});

test("DemandFlow output.schema.json 是合法 JSON", () => {
  const raw = fs.readFileSync(path.join(__dirname, "..", "modules", "demandflow", "output.schema.json"), "utf-8");
  const s = JSON.parse(raw);
  assert(s.type === "object", "type 应为 object");
});

// ──────────────────────────────────────────
// 结果汇总
// ──────────────────────────────────────────

console.log(`\n${"─".repeat(40)}`);
console.log(`通过: ${passed}  失败: ${failed}  总计: ${passed + failed}`);
if (failed > 0) {
  console.log("❌ 测试失败");
  process.exit(1);
} else {
  console.log("✅ 全部测试通过");
}
