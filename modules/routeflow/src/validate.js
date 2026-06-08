/**
 * RouteFlow 输入校验 V0.1
 *
 * 使用方式：
 *   node src/validate.js <input.json>
 *
 * 功能：
 *   检查输入 JSON 是否符合 RouteFlow 的输入要求。
 *   不依赖任何 npm 包，使用纯 Node.js 实现。
 *   输出 JSON 格式的校验报告。
 *
 * 当前阶段：
 *   本脚本是适配层。RouteFlow 的 Demo 尚不接受外部输入（数据硬编码）。
 *   此校验脚本用于定义"如果 RouteFlow 接受标准输入，应该检查什么"。
 *   后续 RouteFlow 重写时可直接复用此校验逻辑。
 */

const fs = require("fs");

// ---- 校验规则 ----

function validate(input) {
  const errors = [];
  const warnings = [];

  // 1. 外层结构检查
  if (!input || typeof input !== "object") {
    errors.push({ code: "INVALID_INPUT", message: "输入必须是一个 JSON 对象", recoverable: false });
    return { valid: false, errors, warnings };
  }

  const data = input.data || input; // 兼容直接传 data 或完整请求

  // 2. 必填字段检查
  if (!data.orders || !Array.isArray(data.orders)) {
    errors.push({ code: "MISSING_FIELD", field: "data.orders", message: "缺少订单列表 (orders 数组)", recoverable: false });
  }
  if (!data.depot || typeof data.depot !== "object") {
    errors.push({ code: "MISSING_FIELD", field: "data.depot", message: "缺少配送中心信息 (depot)", recoverable: false });
  }
  if (!data.vehicles || !Array.isArray(data.vehicles)) {
    errors.push({ code: "MISSING_FIELD", field: "data.vehicles", message: "缺少车辆信息 (vehicles 数组)", recoverable: false });
  }

  if (errors.length > 0) return { valid: false, errors, warnings };

  // 3. 订单列表检查
  if (data.orders.length === 0) {
    errors.push({ code: "INSUFFICIENT_DATA", message: "订单列表为空", recoverable: false });
  }
  if (data.orders.length > 10000) {
    warnings.push({ code: "LARGE_DATASET", message: `订单数量 ${data.orders.length} 较大，求解时间可能较长`, severity: "warning" });
  }

  const missingAddress = [];
  const invalidCoords = [];
  data.orders.forEach((order, i) => {
    if (!order.id) missingAddress.push(`订单[${i}] 缺少 id`);
    if (order.lat === undefined || order.lng === undefined) {
      invalidCoords.push(`订单[${i}] (${order.id || "无ID"}) 缺少坐标`);
    } else {
      if (order.lat < -90 || order.lat > 90) invalidCoords.push(`订单[${i}] (${order.id}) 纬度 ${order.lat} 超出范围 [-90,90]`);
      if (order.lng < -180 || order.lng > 180) invalidCoords.push(`订单[${i}] (${order.id}) 经度 ${order.lng} 超出范围 [-180,180]`);
    }
    if (order.weight_kg !== undefined && order.weight_kg < 0) {
      invalidCoords.push(`订单[${i}] (${order.id}) 重量不能为负数`);
    }
  });

  if (missingAddress.length > 0) {
    errors.push({ code: "MISSING_FIELD", message: `${missingAddress.length} 个订单缺少必填信息`, details: missingAddress.slice(0, 5), recoverable: true, suggested_action: "请补充订单 ID 或收货地址" });
  }
  if (invalidCoords.length > 0) {
    errors.push({ code: "INVALID_FORMAT", message: `${invalidCoords.length} 个订单坐标无效`, details: invalidCoords.slice(0, 5), recoverable: true, suggested_action: "请修正经纬度" });
  }

  // 4. 配送中心检查
  if (data.depot.lat === undefined || data.depot.lng === undefined) {
    errors.push({ code: "MISSING_FIELD", field: "data.depot", message: "配送中心缺少坐标", recoverable: true });
  }

  // 5. 车辆检查
  let totalCapacity = 0;
  data.vehicles.forEach((v, i) => {
    if (!v.type) errors.push({ code: "MISSING_FIELD", field: `data.vehicles[${i}]`, message: "车辆缺少类型名称", recoverable: true });
    if (!v.count || v.count < 1) errors.push({ code: "INVALID_INPUT", field: `data.vehicles[${i}].count`, message: `车辆 ${v.type || i} 数量必须 ≥ 1`, recoverable: true });
    else totalCapacity += (v.capacity_kg || 0) * v.count;
  });

  // 6. 容量预估
  const totalWeight = data.orders.reduce((s, o) => s + (o.weight_kg || 0), 0);
  if (totalCapacity > 0 && totalWeight > totalCapacity) {
    warnings.push({ code: "CAPACITY_WARNING", message: `总货重 ${totalWeight}kg 超过车队总容量 ${totalCapacity}kg，部分订单可能无法配送`, severity: "warning" });
  }

  // 7. 时间检查
  if (data.depot.departure_time && data.depot.return_time) {
    if (new Date(data.depot.departure_time) >= new Date(data.depot.return_time)) {
      errors.push({ code: "INVALID_INPUT", field: "data.depot", message: "发车时间必须早于回站时间", recoverable: true });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      orders: data.orders.length,
      vehicles: data.vehicles.reduce((s, v) => s + (v.count || 0), 0),
      vehicle_types: data.vehicles.length,
      total_weight_kg: totalWeight,
      total_capacity_kg: totalCapacity
    }
  };
}

// ---- 主程序 ----

if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log(JSON.stringify({ error: "用法: node src/validate.js <input.json>" }, null, 2));
    process.exit(1);
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const input = JSON.parse(raw);
    const report = validate(input);
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.valid ? 0 : 1);
  } catch (e) {
    console.log(JSON.stringify({ valid: false, errors: [{ code: "INVALID_FORMAT", message: `无法解析 JSON: ${e.message}`, recoverable: true }] }, null, 2));
    process.exit(1);
  }
}

module.exports = { validate };
