"use client";

import { useState } from "react";

/* 模型参数调整面板 — 简化版
   旧 Demo 包含完整 slider + 重新求解，本组件为参数展示+可调 */

interface ParamsPanelProps {
  onApply: (params: Params) => void;
}

export interface Params {
  fixedCost: number;      // 仓库年固定成本 (万元)
  transportRate: number;  // 运输费率 (元/吨·公里)
  avgWeight: number;      // 每单平均重量 (吨)
  capacityFactor: number; // 容量系数
  speedKph: number;       // 平均速度
}

const DEFAULTS: Params = {
  fixedCost: 50,
  transportRate: 0.5,
  avgWeight: 10,
  capacityFactor: 1.5,
  speedKph: 60,
};

export default function ParamsPanel({ onApply }: ParamsPanelProps) {
  const [params, setParams] = useState<Params>(DEFAULTS);
  const [visible, setVisible] = useState(false);

  const update = (key: keyof Params, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <button
        onClick={() => setVisible(!visible)}
        className="text-xs text-rice/50 hover:text-gold px-3 py-1.5 w-full text-left border-b border-rice/10 flex items-center gap-1"
      >
        ⚙ 参数调整 {visible ? "▲" : "▼"}
      </button>

      {visible && (
        <div className="px-3 py-2 space-y-2 border-b border-rice/10 text-xs">
          <div>
            <label className="text-rice/50">仓库年固定成本 <span className="text-gold/60">{params.fixedCost}万元</span></label>
            <input type="range" min={10} max={200} value={params.fixedCost} step={5}
              onChange={e => update("fixedCost", Number(e.target.value))}
              className="w-full h-1 accent-gold" />
          </div>
          <div>
            <label className="text-rice/50">运输费率 <span className="text-gold/60">{params.transportRate}元/吨·公里</span></label>
            <input type="range" min={0.1} max={2.0} value={params.transportRate} step={0.1}
              onChange={e => update("transportRate", Number(e.target.value))}
              className="w-full h-1 accent-gold" />
          </div>
          <div>
            <label className="text-rice/50">每单平均重量 <span className="text-gold/60">{params.avgWeight}吨</span></label>
            <input type="range" min={2} max={30} value={params.avgWeight} step={1}
              onChange={e => update("avgWeight", Number(e.target.value))}
              className="w-full h-1 accent-gold" />
          </div>
          <div>
            <label className="text-rice/50">容量系数 <span className="text-gold/60">×{params.capacityFactor}</span></label>
            <input type="range" min={1.0} max={3.0} value={params.capacityFactor} step={0.1}
              onChange={e => update("capacityFactor", Number(e.target.value))}
              className="w-full h-1 accent-gold" />
          </div>
          <div>
            <label className="text-rice/50">平均速度 <span className="text-gold/60">{params.speedKph}km/h</span></label>
            <input type="range" min={30} max={120} value={params.speedKph} step={5}
              onChange={e => update("speedKph", Number(e.target.value))}
              className="w-full h-1 accent-gold" />
          </div>
          <button
            onClick={() => onApply(params)}
            className="w-full rounded border border-gold/25 bg-gold/10 px-3 py-1.5 text-gold hover:bg-gold/20 transition"
          >
            应用参数（演示）
          </button>
          <p className="text-rice/25 leading-relaxed">
            参数调整在当前 Demo 中展示参数对成本的影响。
            实际求解需后端优化引擎支持。
          </p>
        </div>
      )}
    </div>
  );
}
