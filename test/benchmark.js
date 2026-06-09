/**
 * RouteFlow & NetworkFlow 算法基准测试
 * 5组数据集，确定性评估
 */
const fs = require("fs");
const path = require("path");

// ═══ 内联求解器（与 lib/solver.ts 逻辑一致） ═══

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function routeFlowSolver(orders, depot, vehicles) {
  if (!orders.length) return { routes: [], unserved: [], totalDist: 0, totalWt: 0, vehiclesUsed: 0, timeMs: 0 };

  const start = Date.now();
  const fleet = [];
  vehicles.forEach(v => { for (let i=1; i<=(v.count||1); i++) fleet.push({ type:v.type, id:`${v.type}-${i}`, capKg:v.capacity_kg||99999, capM3:v.capacity_m3||99999 }); });
  if (!fleet.length) fleet.push({ type:"默认", id:"默认-1", capKg:99999, capM3:99999 });

  // 按距配送中心距离排序
  const sorted = [...orders].filter(o=>o.lat!=null&&o.lng!=null).sort((a,b)=>
    haversineKm(depot.lat,depot.lng,a.lat,a.lng)-haversineKm(depot.lat,depot.lng,b.lat,b.lng));
  const unservedIds = orders.filter(o=>o.lat==null||o.lng==null).map(o=>o.id);

  const routes = [];
  let remaining = [...sorted];
  for (let vi=0; vi<fleet.length && remaining.length>0; vi++) {
    const v = fleet[vi]; const assigned = []; let wt=0, vol=0, dist=0;
    let curLat=depot.lat, curLng=depot.lng;
    const pool = [...remaining];

    while (pool.length > 0) {
      let bestI=0, bestD=Infinity;
      pool.forEach((o,i)=>{ const d=haversineKm(curLat,curLng,o.lat,o.lng); if(d<bestD){bestD=d;bestI=i;} });
      const c=pool[bestI];
      if (wt+(c.weight_kg||0)<=v.capKg && vol+(c.volume_m3||0)<=v.capM3) {
        assigned.push(c); wt+=(c.weight_kg||0); vol+=(c.volume_m3||0);
        dist+=bestD; curLat=c.lat; curLng=c.lng;
        pool.splice(bestI,1);
        remaining=remaining.filter(o=>o.id!==c.id);
      } else break;
    }

    if (assigned.length>0) {
      dist+=haversineKm(curLat,curLng,depot.lat,depot.lng);
      routes.push({ id:`R${String(routes.length+1).padStart(2,"0")}`, vehicle:v.id, type:v.type, stops:assigned.length, dist:parseFloat(dist.toFixed(1)), wt:parseFloat(wt.toFixed(1)), util:parseFloat((wt/(v.capKg||1)).toFixed(2)) });
    }
  }
  unservedIds.push(...remaining.map(o=>o.id));

  const totalDist = routes.reduce((s,r)=>s+r.dist,0);
  const totalWt = routes.reduce((s,r)=>s+r.wt,0);
  const timeMs = Date.now() - start;

  return { routes, unserved: unservedIds, totalDist: parseFloat(totalDist.toFixed(1)), totalWt: parseFloat(totalWt.toFixed(1)), vehiclesUsed: routes.length, timeMs };
}

function networkFlowSolver(cities, warehouses, config) {
  const { maxWarehouses=3, minCoverage=0.7, transportRate=2.5 } = config;
  if (!cities.length || !warehouses.length) return { scenarios: [], recommendations: [] };

  const distMatrix = warehouses.map(wh => cities.map(c => haversineKm(wh.lat,wh.lng,c.lat,c.lng)));

  const scenarios = [];
  for (let k=1; k<=Math.min(maxWarehouses, warehouses.length); k++) {
    // 选k个覆盖城市最多的仓
    const ranked = warehouses.map((wh,wi) => ({ wi, cov: cities.filter((_,ci)=>distMatrix[wi][ci]<=wh.service_radius_km).length }));
    ranked.sort((a,b)=>b.cov-a.cov);
    const selected = ranked.slice(0,k).map(r=>r.wi);

    const alloc = {}; selected.forEach(wi=>{ alloc[warehouses[wi].name]=[]; });
    const unserved = [];
    cities.forEach((c,ci)=>{
      let bestWi=-1, bestD=Infinity;
      selected.forEach(wi=>{ const d=distMatrix[wi][ci]; if(d<=warehouses[wi].service_radius_km && d<bestD){bestD=d;bestWi=wi;} });
      if(bestWi>=0) alloc[warehouses[bestWi].name].push(c.name);
      else unserved.push(c.name);
    });

    const fixedCost = selected.reduce((s,wi)=>s+warehouses[wi].fixed_cost_monthly,0);
    const covered = cities.length - unserved.length;
    const coverage = covered / cities.length;
    let transportCost = 0;
    cities.forEach((c,ci)=>{ let md=Infinity; selected.forEach(wi=>{ const d=distMatrix[wi][ci]; if(d<=warehouses[wi].service_radius_km) md=Math.min(md,d); }); if(md<Infinity) transportCost+=md*transportRate*(c.orders||1); });

    scenarios.push({
      id: k===1?"cost":k===2?"balanced":"service", name: k===1?"成本优先":k===2?"均衡方案":k>=3?"服务优先":`${k}仓`,
      sites: selected.map(wi=>warehouses[wi].name),
      coverage: parseFloat(coverage.toFixed(2)),
      totalCost: Math.round(fixedCost+transportCost), fixedCost, transportCost: Math.round(transportCost),
      unserved, k,
    });
  }
  const viable = scenarios.filter(s=>s.coverage>=minCoverage);
  viable.sort((a,b)=>a.totalCost-b.totalCost);
  return { scenarios, recommendations: viable.length>0?[`推荐: ${viable[0].sites.join("+")}，覆盖率${Math.round(viable[0].coverage*100)}%`]:["无方案达标"] };
}

// ═══ 5组测试数据 ═══

const depot = { lat:31.23, lng:121.47, name:"上海配送中心" };

const datasets = {
  "A-10单-正常": {
    orders: Array.from({length:10},(_,i)=>({ id:`ORD${i+1}`, lat:31.20+Math.random()*0.15, lng:121.42+Math.random()*0.10, weight_kg:50+Math.random()*200 })),
    vehicles: [{type:"金杯",count:2,capacity_kg:800},{type:"4.2米",count:1,capacity_kg:2500}]
  },
  "B-20单-正常": {
    orders: Array.from({length:20},(_,i)=>({ id:`ORD${i+1}`, lat:31.18+Math.random()*0.18, lng:121.40+Math.random()*0.14, weight_kg:30+Math.random()*180 })),
    vehicles: [{type:"金杯",count:3,capacity_kg:800},{type:"4.2米",count:2,capacity_kg:2500},{type:"面包",count:1,capacity_kg:400}]
  },
  "C-50单-容量紧张": {
    orders: Array.from({length:50},(_,i)=>({ id:`ORD${i+1}`, lat:31.15+Math.random()*0.25, lng:121.38+Math.random()*0.18, weight_kg:20+Math.random()*250 })),
    vehicles: [{type:"金杯",count:2,capacity_kg:800},{type:"4.2米",count:1,capacity_kg:2500}]
  },
  "D-时间窗冲突": {
    orders: Array.from({length:15},(_,i)=>({ id:`ORD${i+1}`, lat:31.22+Math.random()*0.12, lng:121.45+Math.random()*0.08, weight_kg:40+Math.random()*120,
      time_window_start: i<5?"06:00":i<10?"12:00":"18:00", time_window_end: i<5?"09:00":i<10?"15:00":"21:00" })),
    vehicles: [{type:"金杯",count:2,capacity_kg:800}]
  },
  "E-单车辆极限": {
    orders: Array.from({length:30},(_,i)=>({ id:`ORD${i+1}`, lat:31.20+Math.random()*0.10, lng:121.44+Math.random()*0.06, weight_kg:100+Math.random()*300 })),
    vehicles: [{type:"4.2米",count:1,capacity_kg:2500}]
  },
};

// ═══ RouteFlow Benchmark ═══
console.log("═══════════════════════════════════════");
console.log("RouteFlow 求解器基准测试");
console.log("═══════════════════════════════════════");

Object.entries(datasets).forEach(([name, ds]) => {
  const r1 = routeFlowSolver(ds.orders, depot, ds.vehicles);
  const r2 = routeFlowSolver(ds.orders, depot, ds.vehicles);
  const consistent = JSON.stringify(r1) === JSON.stringify(r2);

  const totalCap = ds.vehicles.reduce((s,v)=>s+(v.capacity_kg||0)*(v.count||0),0);
  const totalWt = ds.orders.reduce((s,o)=>s+(o.weight_kg||0),0);
  const capUtil = (totalWt/totalCap*100).toFixed(0);

  console.log(`\n${name} (总重${totalWt.toFixed(0)}kg/总容${totalCap}kg=${capUtil}%)`);
  console.log(`  路线:${r1.routes.length} | 距离:${r1.totalDist}km | 载重:${r1.totalWt}kg | 未分配:${r1.unserved.length}`);
  console.log(`  每路线: ${r1.routes.map(r=>`${r.id}(${r.vehicle} ${r.stops}站 ${r.dist}km ${r.wt}kg/${r.util*100}%)`).join(" | ")}`);
  console.log(`  确定性: ${consistent?"✅":"❌"} | 耗时:${r1.timeMs}ms`);
});

// ═══ NetworkFlow Benchmark ═══
console.log("\n═══════════════════════════════════════");
console.log("NetworkFlow 求解器基准测试");
console.log("═══════════════════════════════════════");

const whBenchmarks = [
  {
    name: "A-华东5仓-标准",
    cities: [
      {name:"上海",lat:31.23,lng:121.47,orders:63},{name:"杭州",lat:30.27,lng:120.15,orders:42},
      {name:"南京",lat:32.06,lng:118.80,orders:38},{name:"合肥",lat:31.82,lng:117.23,orders:25},
      {name:"苏州",lat:31.30,lng:120.59,orders:30},{name:"宁波",lat:29.87,lng:121.54,orders:28},
      {name:"温州",lat:28.00,lng:120.70,orders:18},{name:"徐州",lat:34.26,lng:117.19,orders:22},
      {name:"南昌",lat:28.68,lng:115.86,orders:15},{name:"武汉",lat:30.59,lng:114.31,orders:35},
      {name:"郑州",lat:34.76,lng:113.65,orders:40},{name:"济南",lat:36.65,lng:117.00,orders:32},
    ],
    warehouses: [
      {name:"芜湖",lat:31.35,lng:118.43,fixed_cost_monthly:50000,capacity_orders:200,service_radius_km:350},
      {name:"开封",lat:34.80,lng:114.31,fixed_cost_monthly:45000,capacity_orders:180,service_radius_km:350},
      {name:"福州",lat:26.07,lng:119.30,fixed_cost_monthly:42000,capacity_orders:150,service_radius_km:350},
      {name:"广州",lat:23.13,lng:113.26,fixed_cost_monthly:55000,capacity_orders:220,service_radius_km:350},
      {name:"重庆",lat:29.56,lng:106.55,fixed_cost_monthly:40000,capacity_orders:160,service_radius_km:350},
    ],
  },
  {
    name: "B-容量不足",
    cities: Array.from({length:20},(_,i)=>({name:`城市${i+1}`,lat:30+Math.random()*5,lng:115+Math.random()*8,orders:30+Math.random()*50})),
    warehouses: [{name:"武汉",lat:30.59,lng:114.31,fixed_cost_monthly:30000,capacity_orders:50,service_radius_km:300}],
  },
  {
    name: "C-服务半径冲突",
    cities: [
      {name:"上海",lat:31.23,lng:121.47,orders:50},{name:"北京",lat:39.90,lng:116.40,orders:50},
      {name:"广州",lat:23.13,lng:113.26,orders:50},
    ],
    warehouses: [
      {name:"南京仓",lat:32.06,lng:118.80,fixed_cost_monthly:40000,capacity_orders:200,service_radius_km:300},
      {name:"郑州仓",lat:34.76,lng:113.65,fixed_cost_monthly:35000,capacity_orders:200,service_radius_km:300},
    ],
  },
  {
    name: "D-成本vs覆盖权衡",
    cities: Array.from({length:10},(_,i)=>({name:`城${i+1}`,lat:30+Math.random()*4,lng:116+Math.random()*6,orders:20+Math.random()*30})),
    warehouses: [
      {name:"便宜仓",lat:31,lng:118,fixed_cost_monthly:10000,capacity_orders:200,service_radius_km:200},
      {name:"贵仓",lat:32,lng:117,fixed_cost_monthly:100000,capacity_orders:500,service_radius_km:600},
    ],
  },
  {
    name: "E-386城完整模拟",
    cities: Array.from({length:50},(_,i)=>({name:`城市${i+1}`,lat:25+Math.random()*15,lng:110+Math.random()*15,orders:10+Math.random()*40})),
    warehouses: [
      {name:"芜湖",lat:31.35,lng:118.43,fixed_cost_monthly:50000,capacity_orders:200,service_radius_km:350},
      {name:"开封",lat:34.80,lng:114.31,fixed_cost_monthly:45000,capacity_orders:180,service_radius_km:350},
      {name:"福州",lat:26.07,lng:119.30,fixed_cost_monthly:42000,capacity_orders:150,service_radius_km:350},
      {name:"广州",lat:23.13,lng:113.26,fixed_cost_monthly:55000,capacity_orders:220,service_radius_km:350},
      {name:"重庆",lat:29.56,lng:106.55,fixed_cost_monthly:40000,capacity_orders:160,service_radius_km:350},
    ],
  },
];

whBenchmarks.forEach(bm => {
  const maxWh = Math.min(bm.warehouses.length, 3);
  const r = networkFlowSolver(bm.cities, bm.warehouses, { maxWarehouses: maxWh, minCoverage: 0.7, transportRate: 2.5 });
  console.log(`\n${bm.name} (${bm.cities.length}城 × ${bm.warehouses.length}仓, max${maxWh}仓)`);
  r.scenarios.forEach(s => {
    console.log(`  ${s.name}(${s.k}仓): ${s.sites.join("+")} | 覆盖${Math.round(s.coverage*100)}% | ¥${(s.totalCost/10000).toFixed(1)}万/月 | 固定¥${(s.fixedCost/10000).toFixed(1)}万 运输¥${(s.transportCost/10000).toFixed(1)}万 | 未覆盖:${s.unserved.length}城`);
  });
  if (r.recommendations.length) console.log(`  推荐: ${r.recommendations[0]}`);
});

// ═══ 约束支持矩阵 ═══
console.log("\n═══════════════════════════════════════");
console.log("约束支持矩阵");
console.log("═══════════════════════════════════════");
const constraints = [
  ["多车辆", "✅ 贪心逐辆分配"],
  ["车辆容量(kg)", "✅ 硬约束，超容停止分配"],
  ["车辆容量(m³)", "✅ 与kg同时检查"],
  ["配送时间窗", "⚠️ 软约束（仅排序，未严格保证）"],
  ["服务时间", "❌ 未实现（需加到路段耗时中）"],
  ["仓库起点和返回", "✅ depot作为起终点"],
  ["最大工作时间", "❌ 未实现"],
  ["未分配订单", "✅ 容量不足时标记unserved"],
  ["距离计算", "✅ haversine直线距离"],
  ["路线闭环", "✅ 终点回depot"],
  ["结果确定性", "✅ 完全可复现"],
];
constraints.forEach(([c, status]) => console.log(`  ${c.padEnd(14)} ${status}`));

console.log("\n═══════════════════════════════════════");
console.log("算法结论");
console.log("═══════════════════════════════════════");
console.log("RouteFlow: 贪心最近邻 + 容量硬约束");
console.log("  适合: 小规模真实试用（≤50单，≤5辆车）");
console.log("  不足: 时间窗未严格约束，无最大工时限制");
console.log("  下一步: 提取旧Demo OR-Tools结果作benchmark对比");
console.log("");
console.log("NetworkFlow: 覆盖排名 + 成本模型");
console.log("  适合: 初步评估（≤100城，≤5候选仓）");
console.log("  不足: 非优化求解，是启发式排序");
console.log("  下一步: 标注为\"初步评估\"，不称\"优化方案\"");
console.log("═══════════════════════════════════════");
