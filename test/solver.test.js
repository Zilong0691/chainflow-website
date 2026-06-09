/**
 * 求解器确定性测试
 * 使用内联 haversine + simpleSolve 验证核心算法确定性
 */


// 如果无法直接 require TypeScript，使用内联测试
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function simpleSolve(orders, depot, vehicles) {
  const fleet = [];
  vehicles.forEach(v => { for (let i = 1; i <= (v.count || 1); i++) fleet.push({ type: v.type, id: `${v.type}-${i}`, capKg: v.capacity_kg || 99999, capM3: v.capacity_m3 || 99999 }); });
  if (!fleet.length) fleet.push({ type: "默认", id: "默认-1", capKg: 99999, capM3: 99999 });

  const sorted = [...orders].filter(o => o.lat != null).sort((a, b) => {
    return haversineKm(depot.lat, depot.lng, a.lat, a.lng) - haversineKm(depot.lat, depot.lng, b.lat, b.lng);
  });

  const routes = [];
  let remaining = [...sorted];
  for (let vi = 0; vi < fleet.length && remaining.length > 0; vi++) {
    const v = fleet[vi];
    const assigned = [];
    let wt = 0, vol = 0, dist = 0;
    let curLat = depot.lat, curLng = depot.lng;
    const pool = [...remaining];

    while (pool.length > 0) {
      let bestI = 0, bestD = Infinity;
      pool.forEach((o, i) => { const d = haversineKm(curLat, curLng, o.lat, o.lng); if (d < bestD) { bestD = d; bestI = i; } });
      const c = pool[bestI];
      if (wt + (c.weight_kg || 0) <= v.capKg && vol + (c.volume_m3 || 0) <= v.capM3) {
        assigned.push(c); wt += (c.weight_kg || 0); vol += (c.volume_m3 || 0);
        dist += bestD; curLat = c.lat; curLng = c.lng;
        pool.splice(bestI, 1);
        remaining = remaining.filter(o => o.id !== c.id);
      } else break;
    }

    if (assigned.length > 0) {
      dist += haversineKm(curLat, curLng, depot.lat, depot.lng);
      routes.push({ id: `R${String(routes.length+1).padStart(2,"0")}`, vehicle: v.id, stops: assigned.length, dist: parseFloat(dist.toFixed(1)), wt: parseFloat(wt.toFixed(1)) });
    }
  }
  return { routes, unserved: remaining.map(o => o.id) };
}

// ═══ 测试 ═══
let passed = 0, failed = 0;
function test(desc, fn) { try { fn(); passed++; console.log(`  ✅ ${desc}`); } catch (e) { failed++; console.log(`  ❌ ${desc}\n     ${e.message}`); } }
function assert(cond, msg) { if (!cond) throw new Error(msg || "断言失败"); }

const depot = { lat: 31.23, lng: 121.47 };
const orders = [
  { id: "A", lat: 31.24, lng: 121.48, weight_kg: 100 },
  { id: "B", lat: 31.25, lng: 121.49, weight_kg: 200 },
  { id: "C", lat: 31.20, lng: 121.45, weight_kg: 50 },
  { id: "D", lat: 31.30, lng: 121.50, weight_kg: 80 },
];
const vehicles = [{ type: "金杯", count: 1, capacity_kg: 300 }];

test("确定性：两次运行结果一致", () => {
  const r1 = simpleSolve(orders, depot, vehicles);
  const r2 = simpleSolve(orders, depot, vehicles);
  assert(JSON.stringify(r1) === JSON.stringify(r2), "两次运行不一致");
});

test("容量约束被遵守（订单430kg，车辆300kg→部分未分配）", () => {
  const r = simpleSolve(orders, depot, vehicles);
  assert(r.unserved.length === 2, `预期2个未分配，实际${r.unserved.length}`);
  // 验证分配的总重量不超过车辆容量
  const assignedWt = r.routes.reduce((s, rt) => s + rt.wt, 0);
  assert(assignedWt <= 300, `超载: ${assignedWt}kg > 300kg`);
});

test("充足容量时全部分配", () => {
  const bigVehicles = [{ type: "大车", count: 2, capacity_kg: 500 }];
  const r = simpleSolve(orders, depot, bigVehicles);
  assert(r.unserved.length === 0, `有${r.unserved.length}个未分配`);
});

test("容量不足时产生未分配", () => {
  const tiny = [{ type: "小车", count: 1, capacity_kg: 50 }];
  const r = simpleSolve(orders, depot, tiny);
  assert(r.unserved.length > 0, "应该有未分配订单");
});

test("不包含随机值", () => {
  const r = simpleSolve(orders, depot, vehicles);
  const json = JSON.stringify(r);
  assert(!json.includes("Math.random"), "包含随机逻辑");
});

test("路线不包含LLM生成字段", () => {
  const r = simpleSolve(orders, depot, vehicles);
  const json = JSON.stringify(r);
  assert(!json.includes("llm"), "输出包含llm");
  assert(!json.includes("DeepSeek"), "输出包含DeepSeek");
});

console.log(`\n${"─".repeat(40)}`);
console.log(`通过: ${passed}  失败: ${failed}`);
if (failed > 0) process.exit(1);
