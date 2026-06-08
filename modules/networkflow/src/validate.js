/**
 * NetworkFlow 输入校验 V0.1
 *
 * 使用方式：node src/validate.js <input.json>
 * 功能：检查输入是否符合 NetworkFlow 要求
 * 当前阶段：适配层。Demo 尚不接受外部输入（数据硬编码），
 *           本脚本定义"如果接受标准输入，应该检查什么"。
 */

const fs = require("fs");

function validate(input) {
  const errors = [];
  const warnings = [];
  if (!input || typeof input !== "object") {
    errors.push({ code: "INVALID_INPUT", message: "输入必须是一个 JSON 对象", recoverable: false });
    return { valid: false, errors, warnings };
  }

  const data = input.data || input;

  if (!data.demand_cities || !Array.isArray(data.demand_cities)) {
    errors.push({ code: "MISSING_FIELD", field: "data.demand_cities", message: "缺少需求城市列表", recoverable: false });
  }
  if (!data.candidate_warehouses || !Array.isArray(data.candidate_warehouses)) {
    errors.push({ code: "MISSING_FIELD", field: "data.candidate_warehouses", message: "缺少候选仓列表", recoverable: false });
  }
  if (errors.length > 0) return { valid: false, errors, warnings };

  // 需求城市检查
  if (data.demand_cities.length === 0) {
    errors.push({ code: "INSUFFICIENT_DATA", message: "需求城市列表为空", recoverable: false });
  }
  const badCities = [];
  data.demand_cities.forEach((c, i) => {
    if (!c.id || !c.name) badCities.push(`城市[${i}] 缺少 id 或 name`);
    if (c.lat === undefined || c.lng === undefined) badCities.push(`城市[${i}] (${c.name || "无名"}) 缺少坐标`);
    else {
      if (c.lat < -90 || c.lat > 90) badCities.push(`城市[${i}] (${c.name}) 纬度无效`);
      if (c.lng < -180 || c.lng > 180) badCities.push(`城市[${i}] (${c.name}) 经度无效`);
    }
  });
  if (badCities.length > 0) {
    errors.push({ code: "INVALID_FORMAT", message: `${badCities.length} 个需求城市数据有问题`, details: badCities.slice(0, 5), recoverable: true });
  }

  // 候选仓检查
  if (data.candidate_warehouses.length === 0) {
    errors.push({ code: "INSUFFICIENT_DATA", message: "候选仓列表为空", recoverable: false });
  }
  const badWH = [];
  data.candidate_warehouses.forEach((w, i) => {
    if (!w.id || !w.name) badWH.push(`候选仓[${i}] 缺少 id 或 name`);
    if (w.lat === undefined || w.lng === undefined) badWH.push(`候选仓[${i}] (${w.name || "无名"}) 缺少坐标`);
    if (w.fixed_cost_monthly !== undefined && w.fixed_cost_monthly < 0) badWH.push(`候选仓[${i}] (${w.name}) 固定成本不能为负`);
    if (w.service_radius_km !== undefined && w.service_radius_km <= 0) badWH.push(`候选仓[${i}] (${w.name}) 服务半径必须 > 0`);
  });
  if (badWH.length > 0) {
    errors.push({ code: "INVALID_FORMAT", message: `${badWH.length} 个候选仓数据有问题`, details: badWH.slice(0, 5), recoverable: true });
  }

  // 候选仓 vs 需求城市数量逻辑检查
  if (data.candidate_warehouses.length > data.demand_cities.length) {
    warnings.push({ code: "MORE_WAREHOUSES_THAN_CITIES", message: `候选仓(${data.candidate_warehouses.length})比需求城市(${data.demand_cities.length})还多，可能不合理`, severity: "info" });
  }

  // 成本检查
  const allNoCost = data.candidate_warehouses.every(w => w.fixed_cost_monthly === undefined);
  if (allNoCost) {
    warnings.push({ code: "NO_COST_DATA", message: "所有候选仓都未提供固定成本，方案比较可能不准确", severity: "warning" });
  }

  const totalDemand = data.demand_cities.reduce((s, c) => s + (c.orders || 1), 0);
  const totalCapacity = data.candidate_warehouses.reduce((s, w) => s + (w.capacity_orders || 0), 0);
  if (totalCapacity > 0 && totalDemand > totalCapacity) {
    warnings.push({ code: "CAPACITY_SHORTFALL", message: `总需求 ${totalDemand} 单超过总仓容 ${totalCapacity} 单`, severity: "warning" });
  }

  const covered = data.demand_cities.filter(c => {
    return data.candidate_warehouses.some(w => {
      const d = Math.sqrt((c.lat - w.lat) ** 2 + (c.lng - w.lng) ** 2) * 111;
      return d <= (w.service_radius_km || 350);
    });
  }).length;
  if (data.demand_cities.length > 0 && covered / data.demand_cities.length < 0.5) {
    warnings.push({ code: "LOW_COVERAGE", message: `仅 ${Math.round(covered / data.demand_cities.length * 100)}% 需求城市在候选仓服务范围内`, severity: "warning" });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      demand_cities: data.demand_cities.length,
      candidate_warehouses: data.candidate_warehouses.length,
      total_demand_orders: totalDemand,
      total_capacity_orders: totalCapacity,
      coverage_estimate: `${Math.round(covered / Math.max(1, data.demand_cities.length) * 100)}%`
    }
  };
}

if (require.main === module) {
  const fp = process.argv[2];
  if (!fp) { console.log(JSON.stringify({ error: "用法: node src/validate.js <input.json>" }, null, 2)); process.exit(1); }
  try {
    const raw = fs.readFileSync(fp, "utf-8");
    const report = validate(JSON.parse(raw));
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.valid ? 0 : 1);
  } catch (e) {
    console.log(JSON.stringify({ valid: false, errors: [{ code: "INVALID_FORMAT", message: `无法解析 JSON: ${e.message}`, recoverable: true }] }, null, 2));
    process.exit(1);
  }
}

module.exports = { validate };
