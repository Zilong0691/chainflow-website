"use client";

import { useState, useCallback } from "react";

/* 输入校验面板
   复用 modules/routeflow/src/validate.js 的校验规则，
   输出符合 common-error.schema.json 的错误格式 */

interface ValidationError {
  code: string; message: string; field?: string;
  recoverable: boolean; suggested_action?: string;
}

interface ValidationWarning {
  code: string; message: string; severity: "info" | "warning";
}

interface ValidationReport {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  summary?: { orders: number; vehicles: number; total_weight_kg: number };
}

function validate(input: any): ValidationReport {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  if (!input || typeof input !== "object") {
    errors.push({ code: "INVALID_INPUT", message: "输入必须是一个 JSON 对象", recoverable: false });
    return { valid: false, errors, warnings };
  }
  const data = input.data || input;

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

  if (data.orders.length === 0) {
    errors.push({ code: "INSUFFICIENT_DATA", message: "订单列表为空", recoverable: false });
  }
  if (data.orders.length > 10000) {
    warnings.push({ code: "LARGE_DATASET", message: `订单数量 ${data.orders.length} 较大，求解时间可能较长`, severity: "warning" });
  }

  const missingId: string[] = [];
  const invalidCoords: string[] = [];
  data.orders.forEach((order: any, i: number) => {
    if (!order.id) missingId.push(`订单[${i}] 缺少 id`);
    if (order.lat === undefined || order.lng === undefined) {
      invalidCoords.push(`订单[${i}] (${order.id || "无ID"}) 缺少坐标`);
    } else {
      if (order.lat < -90 || order.lat > 90) invalidCoords.push(`订单[${i}] (${order.id}) 纬度 ${order.lat} 超出范围`);
      if (order.lng < -180 || order.lng > 180) invalidCoords.push(`订单[${i}] (${order.id}) 经度 ${order.lng} 超出范围`);
    }
    if (order.weight_kg !== undefined && order.weight_kg < 0) {
      invalidCoords.push(`订单[${i}] (${order.id}) 重量不能为负数`);
    }
  });

  if (missingId.length > 0) {
    errors.push({ code: "MISSING_FIELD", message: `${missingId.length} 个订单缺少 id`, recoverable: true, suggested_action: "请为每个订单补充唯一编号" });
  }
  if (invalidCoords.length > 0) {
    errors.push({ code: "INVALID_FORMAT", message: `${invalidCoords.length} 个订单坐标无效`, recoverable: true, suggested_action: "请修正经纬度，纬度范围-90~90，经度范围-180~180" });
  }

  if (data.depot.lat === undefined || data.depot.lng === undefined) {
    errors.push({ code: "MISSING_FIELD", field: "data.depot", message: "配送中心缺少坐标", recoverable: true });
  }

  let totalCapacity = 0;
  data.vehicles.forEach((v: any, i: number) => {
    if (!v.type) errors.push({ code: "MISSING_FIELD", field: `data.vehicles[${i}]`, message: "车辆缺少类型名称", recoverable: true });
    if (!v.count || v.count < 1) errors.push({ code: "INVALID_INPUT", message: `车辆 ${v.type || i} 数量必须 ≥ 1`, recoverable: true });
    else totalCapacity += (v.capacity_kg || 0) * v.count;
  });

  const totalWeight = data.orders.reduce((s: number, o: any) => s + (o.weight_kg || 0), 0);
  if (totalCapacity > 0 && totalWeight > totalCapacity) {
    warnings.push({ code: "CAPACITY_WARNING", message: `总货重 ${totalWeight}kg 超过车队总容量 ${totalCapacity}kg`, severity: "warning" });
  }

  return {
    valid: errors.length === 0,
    errors, warnings,
    summary: { orders: data.orders.length, vehicles: data.vehicles.reduce((s: number, v: any) => s + (v.count || 0), 0), total_weight_kg: totalWeight },
  };
}

export default function ValidatePanel({ onValid }: { onValid: (data: any, report: ValidationReport) => void }) {
  const [jsonText, setJsonText] = useState("");
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = useCallback(() => {
    setLoading(true);
    try {
      const parsed = JSON.parse(jsonText);
      const r = validate(parsed);
      setReport(r);
      if (r.valid) onValid(parsed, r);
    } catch (e: any) {
      setReport({ valid: false, errors: [{ code: "INVALID_FORMAT", message: `JSON 解析失败: ${e.message}`, recoverable: true, suggested_action: "请检查 JSON 格式是否正确，确保所有引号和逗号配对" }], warnings: [] });
    }
    setLoading(false);
  }, [jsonText, onValid]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setJsonText(ev.target?.result as string || "");
    };
    reader.readAsText(file);
  }, []);

  const loadExample = () => {
    setJsonText(JSON.stringify({
      schema_version: "0.1",
      request_id: "req_demo_001",
      module_id: "routeflow",
      data: {
        orders: [
          { id: "ORD001", lat: 31.2304, lng: 121.4737, weight_kg: 120, volume_m3: 0.25 },
          { id: "ORD002", lat: 31.2000, lng: 121.4500, weight_kg: 80 },
          { id: "ORD003", lat: 31.2500, lng: 121.5000, weight_kg: 200 },
        ],
        depot: { name: "上海配送中心", lat: 31.2304, lng: 121.4737 },
        vehicles: [
          { type: "金杯", count: 2, capacity_kg: 800 },
          { type: "4.2米", count: 1, capacity_kg: 2500 },
        ],
      },
    }, null, 2));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-rice/10 text-xs">
        <span className="text-rice/70">📥 上传订单数据（JSON）</span>
        <div className="flex gap-2">
          <button onClick={loadExample} className="text-gold/60 hover:text-gold">加载示例</button>
          <label className="cursor-pointer text-gold/60 hover:text-gold">
            📁 选择文件
            <input type="file" accept=".json" onChange={handleFile} className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-0">
        {/* 输入区 */}
        <div className="flex-1 flex flex-col border-r border-rice/10">
          <textarea
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            placeholder='在此粘贴 JSON 数据，或点击"加载示例"查看格式...'
            className="flex-1 bg-graphite text-rice/70 text-xs p-3 resize-none outline-none font-mono"
            spellCheck={false}
          />
          <div className="px-3 py-2 border-t border-rice/10">
            <button
              onClick={handleValidate}
              disabled={!jsonText.trim() || loading}
              className="w-full rounded bg-gold/20 border border-gold/30 text-gold py-1.5 text-xs hover:bg-gold/30 disabled:opacity-30 transition"
            >
              {loading ? "校验中…" : "🔍 校验输入"}
            </button>
          </div>
        </div>

        {/* 结果区 */}
        <div className="lg:w-[380px] overflow-y-auto bg-[#0b100d] text-xs">
          {!report && (
            <div className="p-4 text-rice/25 leading-relaxed">
              <p>粘贴或上传 JSON 数据后点击"校验输入"。</p>
              <p className="mt-2">数据格式需符合 ChainFlow 统一请求格式（<code>data.orders</code>、<code>data.depot</code>、<code>data.vehicles</code>）。</p>
            </div>
          )}

          {report && report.valid && (
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 text-lg">✓</span>
                <span className="text-rice/70 font-medium">校验通过</span>
              </div>
              {report.summary && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded bg-rice/[0.04] p-2 text-center">
                    <span className="block text-rice font-semibold">{report.summary.orders}</span>
                    <span className="text-rice/35">订单</span>
                  </div>
                  <div className="rounded bg-rice/[0.04] p-2 text-center">
                    <span className="block text-rice font-semibold">{report.summary.vehicles}</span>
                    <span className="text-rice/35">车辆</span>
                  </div>
                  <div className="rounded bg-rice/[0.04] p-2 text-center">
                    <span className="block text-rice font-semibold">{(report.summary.total_weight_kg / 1000).toFixed(1)}t</span>
                    <span className="text-rice/35">总重</span>
                  </div>
                </div>
              )}
              {report.warnings.length > 0 && (
                <div className="space-y-1">
                  <p className="text-gold/60 mb-1">⚠ 警告</p>
                  {report.warnings.map((w, i) => (
                    <div key={i} className="rounded border border-gold/10 bg-gold/[0.04] px-2 py-1.5 text-gold/60">{w.message}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {report && !report.valid && (
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-ember text-lg">✗</span>
                <span className="text-ember font-medium">{report.errors.length} 个错误</span>
              </div>
              <div className="space-y-2">
                {report.errors.map((e, i) => (
                  <div key={i} className="rounded border border-ember/20 bg-ember/[0.04] px-2 py-1.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-ember/80 font-mono" style={{ fontSize: 10 }}>{e.code}</span>
                      {e.field && <span className="text-rice/25" style={{ fontSize: 10 }}>{e.field}</span>}
                      <span className="text-rice/25" style={{ fontSize: 10 }}>{e.recoverable ? "可修复" : "阻断"}</span>
                    </div>
                    <p className="text-rice/60 leading-relaxed">{e.message}</p>
                    {e.suggested_action && (
                      <p className="text-gold/50 mt-0.5">→ {e.suggested_action}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
