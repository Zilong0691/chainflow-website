"use client";

import { useState, useCallback } from "react";

/* 文件上传 + 字段映射组件
   支持 Excel(.xlsx/.xls) 和 CSV，自动检测列名并提供映射 */

interface FileUploadProps {
  onDataReady: (orders: any[], depot: any, vehicles: any[]) => void;
}

// 常见列名→标准字段的自动映射
const FIELD_ALIASES: Record<string, string> = {
  "订单号": "id", "编号": "id", "订单编号": "id", "order_id": "id", "orderid": "id", "id": "id",
  "地址": "address", "收货地址": "address", "delivery_address": "address", "address": "address",
  "纬度": "lat", "lat": "lat", "latitude": "lat",
  "经度": "lng", "lng": "lng", "longitude": "lng", "lon": "lng",
  "重量": "weight_kg", "重量(kg)": "weight_kg", "weight": "weight_kg", "weight_kg": "weight_kg", "货重": "weight_kg",
  "体积": "volume_m3", "体积(m³)": "volume_m3", "volume": "volume_m3", "volume_m3": "volume_m3",
  "最早到达": "time_window_start", "时间窗开始": "time_window_start", "time_start": "time_window_start",
  "最晚到达": "time_window_end", "时间窗结束": "time_window_end", "time_end": "time_window_end",
  "服务时间": "service_time_min", "服务时长": "service_time_min", "service_time": "service_time_min",
  "备注": "notes", "联系人": "notes", "notes": "notes",
};

export default function FileUpload({ onDataReady }: FileUploadProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [depot, setDepot] = useState({ lat: 31.23, lng: 121.47, name: "" });
  const [vehicles, setVehicles] = useState("金杯,2,800,4.5\n4.2米,1,2500,16");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<any[]>([]);

  const autoDetect = useCallback((headers: string[]) => {
    const map: Record<string, string> = {};
    headers.forEach(h => {
      const clean = h.trim();
      for (const [alias, field] of Object.entries(FIELD_ALIASES)) {
        if (clean === alias || clean.toLowerCase() === alias.toLowerCase()) {
          map[h] = field; break;
        }
      }
    });
    setMapping(map);
    return map;
  }, []);

  const parseFile = useCallback(async (file: File) => {
    setError("");
    const text = await file.text();
    const ext = file.name.split(".").pop()?.toLowerCase();

    let parsedHeaders: string[] = [];
    let parsedRows: string[][] = [];

    if (ext === "csv" || ext === "txt") {
      const lines = text.split("\n").filter(l => l.trim());
      if (lines.length < 2) { setError("文件至少需要标题行+1行数据"); return; }
      parsedHeaders = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
      parsedRows = lines.slice(1).map(l => l.split(",").map(c => c.trim().replace(/^"|"$/g, "")));
    } else if (ext === "xlsx" || ext === "xls") {
      setError("Excel 需要 .csv 格式。请用 Excel/WPS 另存为 CSV (UTF-8) 后上传。");
      return;
    } else {
      setError("不支持的文件格式，请上传 CSV"); return;
    }

    if (parsedRows.length > 1000) { setError("单次最多 1000 条订单"); return; }

    setHeaders(parsedHeaders);
    setRows(parsedRows);
    const map = autoDetect(parsedHeaders);
    applyMapping(parsedHeaders, parsedRows, map);
  }, [autoDetect]);

  const applyMapping = (headers: string[], rows: string[][], map: Record<string, string>) => {
    const orders = rows.map((row, ri) => {
      const order: any = { id: `ORD${String(ri+1).padStart(4,"0")}` };
      headers.forEach((h, hi) => {
        const field = map[h];
        if (!field) return;
        const val = row[hi]?.trim();
        if (!val) return;
        if (field === "lat" || field === "lng" || field === "weight_kg" || field === "volume_m3" || field === "service_time_min") {
          order[field] = parseFloat(val) || 0;
        } else if (field === "id") {
          order.id = val;
        } else {
          order[field] = val;
        }
      });
      return order;
    }).filter(o => o.lat && o.lng);
    setPreview(orders.slice(0, 5));
  };

  const handleUpload = () => {
    const orders = rows.map((row, ri) => {
      const order: any = { id: `ORD${String(ri+1).padStart(4,"0")}` };
      headers.forEach((h, hi) => {
        const field = mapping[h]; if (!field) return;
        const val = row[hi]?.trim(); if (!val) return;
        if (["lat","lng","weight_kg","volume_m3","service_time_min"].includes(field)) order[field] = parseFloat(val)||0;
        else if (field==="id") order.id = val;
        else order[field] = val;
      });
      return order;
    }).filter(o => o.lat && o.lng);

    const vehLines = vehicles.split("\n").filter(l=>l.trim());
    const parsedVehicles = vehLines.map(l=>{
      const [type,count,capKg,capM3] = l.split(",");
      return {type:type?.trim()||"默认",count:parseInt(count)||1,capacity_kg:parseFloat(capKg)||0,capacity_m3:parseFloat(capM3)||0};
    });

    onDataReady(orders, depot, parsedVehicles);
  };

  const updateMapping = (header: string, field: string) => {
    const newMap = { ...mapping, [header]: field };
    setMapping(newMap);
    applyMapping(headers, rows, newMap);
  };

  return (
    <div className="space-y-3 text-xs">
      {/* 文件上传 */}
      <div className="flex items-center gap-2">
        <label className="cursor-pointer rounded border border-gold/30 bg-gold/10 px-3 py-1.5 text-gold hover:bg-gold/20 transition">
          📁 选择 CSV 文件
          <input type="file" accept=".csv,.txt" onChange={e => { const f = e.target.files?.[0]; if (f) parseFile(f); }} className="hidden" />
        </label>
        <span className="text-rice/30">
          <a href="#" onClick={e=>{e.preventDefault();}} className="text-gold/50 hover:text-gold">下载模板</a>
        </span>
        {rows.length > 0 && <span className="text-rice/40">{rows.length} 条数据</span>}
      </div>

      {error && <p className="text-ember">{error}</p>}

      {/* 字段映射 */}
      {headers.length > 0 && (
        <div className="rounded border border-rice/10 bg-rice/[0.02] p-2">
          <p className="text-rice/50 mb-1.5">字段映射（自动检测，可手动调整）</p>
          <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto">
            {headers.map(h => (
              <div key={h} className="flex items-center gap-1.5">
                <span className="text-rice/40 w-20 truncate" title={h}>{h}</span>
                <span className="text-rice/20">→</span>
                <select value={mapping[h] || ""} onChange={e => updateMapping(h, e.target.value)}
                  className="flex-1 rounded border border-rice/10 bg-graphite text-rice/60 px-1 py-0.5 text-xs">
                  <option value="">忽略</option>
                  {["id","address","lat","lng","weight_kg","volume_m3","time_window_start","time_window_end","service_time_min","notes"].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 车辆配置 */}
      <div>
        <p className="text-rice/50 mb-1">车辆（格式：车型,数量,载重kg,体积m³）</p>
        <textarea value={vehicles} onChange={e=>setVehicles(e.target.value)}
          className="w-full rounded border border-rice/10 bg-graphite text-rice/60 px-2 py-1 text-xs font-mono resize-none" rows={3} />
      </div>

      {/* 配送中心 */}
      <div className="flex gap-2">
        <input placeholder="配送中心名称" value={depot.name} onChange={e=>setDepot({...depot,name:e.target.value})}
          className="flex-1 rounded border border-rice/10 bg-graphite text-rice/60 px-2 py-1" />
        <input placeholder="纬度" type="number" step="0.01" value={depot.lat} onChange={e=>setDepot({...depot,lat:parseFloat(e.target.value)||0})}
          className="w-24 rounded border border-rice/10 bg-graphite text-rice/60 px-2 py-1" />
        <input placeholder="经度" type="number" step="0.01" value={depot.lng} onChange={e=>setDepot({...depot,lng:parseFloat(e.target.value)||0})}
          className="w-24 rounded border border-rice/10 bg-graphite text-rice/60 px-2 py-1" />
      </div>

      {/* 预览 */}
      {preview.length > 0 && (
        <div className="rounded border border-rice/10 bg-rice/[0.02] p-2">
          <p className="text-rice/50 mb-1">数据预览（前5条）</p>
          <div className="overflow-x-auto">
            <table className="text-rice/40 text-xs w-full">
              <thead><tr>{Object.keys(preview[0]).filter(k=>k!=="__parsed").slice(0,6).map(k=><th key={k} className="text-left pr-2">{k}</th>)}</tr></thead>
              <tbody>{preview.map((o,i)=><tr key={i}>{Object.entries(o).filter(([k])=>k!=="__parsed").slice(0,6).map(([,v])=><td key={Math.random()} className="pr-2">{String(v).substring(0,20)}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      )}

      {rows.length > 0 && (
        <button onClick={handleUpload}
          className="w-full rounded bg-gold/20 border border-gold/30 text-gold py-2 text-sm font-medium hover:bg-gold/30 transition">
          🚀 开始排线
        </button>
      )}
    </div>
  );
}
