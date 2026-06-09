/* RouteFlow 完整数据集 — 提取自旧 Demo (public/demos/routeflow/index.html) */

export interface RouteStop {
  lat: number; lng: number; addr: string; arrival: string;
  weight: number; is_depot: boolean;
}

export interface RouteData {
  id: number; route_id: number; color: string; type: string;
  phys_veh: string; stops: RouteStop[];
}

export interface DriverWorkload {
  name: string; veh_type: string; num_routes: number;
  total_work_min: number; total_stops: number;
  total_dist_km: number; total_load_kg: number;
  total_vol_m3: number; route_indices: number[];
}

export const SUMMARY = {
  totalOrders: 801, totalRoutes: 29, physicalVehicles: 27,
  totalDistanceKm: 1501.97, totalWeightKg: 87969.4,
  totalVolumeM3: 159.63, solveTimeSec: 112,
};

export const DRIVERS: DriverWorkload[] = [
  { name: "6.8米厢货-3", veh_type: "6.8米厢货", num_routes: 1, total_work_min: 1089, total_stops: 49, total_dist_km: 51.79, total_load_kg: 8012.4, total_vol_m3: 14.257, route_indices: [8] },
  { name: "4.2米-2", veh_type: "4.2米", num_routes: 1, total_work_min: 1083, total_stops: 27, total_dist_km: 124.97, total_load_kg: 3002.7, total_vol_m3: 5.031, route_indices: [21] },
  { name: "4.2米-7", veh_type: "4.2米", num_routes: 1, total_work_min: 981, total_stops: 34, total_dist_km: 77.87, total_load_kg: 3005.8, total_vol_m3: 4.849, route_indices: [14] },
  { name: "4.2米-10", veh_type: "4.2米", num_routes: 1, total_work_min: 911, total_stops: 31, total_dist_km: 78.35, total_load_kg: 3010.9, total_vol_m3: 4.973, route_indices: [1] },
  { name: "4.2米-11", veh_type: "4.2米", num_routes: 1, total_work_min: 911, total_stops: 28, total_dist_km: 85.93, total_load_kg: 3004.9, total_vol_m3: 5.054, route_indices: [16] },
  { name: "4.2米-12", veh_type: "4.2米", num_routes: 1, total_work_min: 905, total_stops: 30, total_dist_km: 66.34, total_load_kg: 3006.4, total_vol_m3: 4.623, route_indices: [20] },
  { name: "4.2米-13", veh_type: "4.2米", num_routes: 1, total_work_min: 905, total_stops: 34, total_dist_km: 42.86, total_load_kg: 3010.1, total_vol_m3: 5.771, route_indices: [23] },
  { name: "面包-1", veh_type: "面包", num_routes: 1, total_work_min: 609, total_stops: 8, total_dist_km: 30.52, total_load_kg: 601.4, total_vol_m3: 1.102, route_indices: [2] },
  { name: "4.2米-1", veh_type: "4.2米", num_routes: 1, total_work_min: 540, total_stops: 32, total_dist_km: 145.22, total_load_kg: 2974.3, total_vol_m3: 5.066, route_indices: [7] },
  { name: "6.8米厢货-1", veh_type: "6.8米厢货", num_routes: 1, total_work_min: 539, total_stops: 49, total_dist_km: 80.94, total_load_kg: 6508.5, total_vol_m3: 11.163, route_indices: [3] },
  { name: "6.8米厢货-2", veh_type: "6.8米厢货", num_routes: 1, total_work_min: 537, total_stops: 40, total_dist_km: 88.42, total_load_kg: 4433.6, total_vol_m3: 6.926, route_indices: [5] },
  { name: "面包-2", veh_type: "面包", num_routes: 2, total_work_min: 529, total_stops: 7, total_dist_km: 10.54, total_load_kg: 963.0, total_vol_m3: 1.301, route_indices: [15, 19] },
  { name: "4.2米-3", veh_type: "4.2米", num_routes: 1, total_work_min: 527, total_stops: 29, total_dist_km: 139.0, total_load_kg: 2990.3, total_vol_m3: 4.458, route_indices: [12] },
  { name: "4.2米-4", veh_type: "4.2米", num_routes: 1, total_work_min: 497, total_stops: 35, total_dist_km: 91.39, total_load_kg: 2989.0, total_vol_m3: 5.245, route_indices: [28] },
  { name: "4.2米-5", veh_type: "4.2米", num_routes: 1, total_work_min: 490, total_stops: 30, total_dist_km: 90.06, total_load_kg: 2997.9, total_vol_m3: 5.004, route_indices: [26] },
  { name: "4.2米-6", veh_type: "4.2米", num_routes: 1, total_work_min: 487, total_stops: 34, total_dist_km: 73.39, total_load_kg: 2997.7, total_vol_m3: 4.548, route_indices: [13] },
  { name: "4.2米-8", veh_type: "4.2米", num_routes: 1, total_work_min: 471, total_stops: 35, total_dist_km: 54.06, total_load_kg: 2975.5, total_vol_m3: 5.617, route_indices: [24] },
  { name: "6.8米厢货-4", veh_type: "6.8米厢货", num_routes: 1, total_work_min: 466, total_stops: 36, total_dist_km: 47.66, total_load_kg: 7878.2, total_vol_m3: 21.586, route_indices: [11] },
  { name: "4.2米-9", veh_type: "4.2米", num_routes: 1, total_work_min: 453, total_stops: 33, total_dist_km: 61.82, total_load_kg: 2948.7, total_vol_m3: 6.069, route_indices: [27] },
  { name: "4.2米-14", veh_type: "4.2米", num_routes: 1, total_work_min: 438, total_stops: 25, total_dist_km: 74.65, total_load_kg: 2996.0, total_vol_m3: 4.988, route_indices: [22] },
  { name: "4.2米-15", veh_type: "4.2米", num_routes: 1, total_work_min: 436, total_stops: 28, total_dist_km: 52.57, total_load_kg: 2975.0, total_vol_m3: 5.265, route_indices: [18] },
  { name: "4.2米-16", veh_type: "4.2米", num_routes: 1, total_work_min: 435, total_stops: 32, total_dist_km: 48.09, total_load_kg: 2978.7, total_vol_m3: 5.627, route_indices: [17] },
  { name: "4.2米-17", veh_type: "4.2米", num_routes: 1, total_work_min: 428, total_stops: 26, total_dist_km: 54.33, total_load_kg: 2962.9, total_vol_m3: 5.256, route_indices: [9] },
  { name: "金杯-1", veh_type: "金杯", num_routes: 2, total_work_min: 427, total_stops: 23, total_dist_km: 50.68, total_load_kg: 1942.4, total_vol_m3: 3.702, route_indices: [4, 0] },
  { name: "4.2米-18", veh_type: "4.2米", num_routes: 1, total_work_min: 414, total_stops: 26, total_dist_km: 41.08, total_load_kg: 2996.2, total_vol_m3: 5.368, route_indices: [25] },
  { name: "4.2米-19", veh_type: "4.2米", num_routes: 1, total_work_min: 401, total_stops: 27, total_dist_km: 33.04, total_load_kg: 2843.1, total_vol_m3: 4.976, route_indices: [10] },
  { name: "金杯-2", veh_type: "金杯", num_routes: 1, total_work_min: 312, total_stops: 13, total_dist_km: 19.17, total_load_kg: 963.9, total_vol_m3: 1.808, route_indices: [6] },
];

export const EXCEPTIONS = [
  { driverName: "6.8米厢货-3", type: "work_duration_warning", desc: "工作时长偏长(18h09min)", action: "考虑拆分路线或增加车辆" },
  { driverName: "4.2米-2", type: "work_duration_warning", desc: "工作时长偏长(18h03min)", action: "考虑拆分路线或增加车辆" },
  { driverName: "4.2米-7", type: "work_duration_warning", desc: "工作时长偏长(16h21min)", action: "考虑拆分路线或增加车辆" },
  { driverName: "金杯-1", type: "multi_route", desc: "金杯-1 承担 2 条路线", action: "确认司机可接受多趟任务" },
  { driverName: "面包-2", type: "multi_route", desc: "面包-2 承担 2 条路线", action: "确认司机可接受多趟任务" },
];
