"use client";

/* 成本拆分详情 — 固定成本 vs 运输成本 */

interface CostBreakdownProps {
  scenario: string;
  sites: { name: string; fixedCost?: number; transportCost?: number }[];
}

export default function CostBreakdown({ scenario, sites }: CostBreakdownProps) {
  // 模拟成本数据（旧 Demo 预计算结果）
  const costData: Record<string, { name: string; fixed: number; transport: number; total: number }[]> = {
    balanced: [
      { name: "芜湖", fixed: 50000, transport: 25000, total: 75000 },
      { name: "开封", fixed: 15000, transport: 5000, total: 20000 },
    ],
    service: [
      { name: "芜湖", fixed: 50000, transport: 32000, total: 82000 },
      { name: "福州", fixed: 25000, transport: 15000, total: 40000 },
      { name: "重庆", fixed: 20000, transport: 10000, total: 30000 },
    ],
    cost: [
      { name: "开封", fixed: 30000, transport: 15000, total: 45000 },
    ],
  };

  const data = costData[scenario] || [];
  const grandTotal = data.reduce((s, d) => s + d.total, 0);
  const grandFixed = data.reduce((s, d) => s + d.fixed, 0);
  const grandTransport = data.reduce((s, d) => s + d.transport, 0);

  const maxTotal = Math.max(...data.map(d => d.total), 1);

  return (
    <div className="border-t border-rice/10 px-3 py-2.5 text-xs">
      <p className="font-medium text-rice/70 mb-2">💰 成本拆分</p>

      {data.map(d => (
        <div key={d.name} className="mb-2">
          <div className="flex justify-between mb-0.5">
            <span className="text-rice/60">{d.name}</span>
            <span className="text-rice/50">{d.name === "开封" && scenario === "cost" ? "（单仓方案）" : ""}</span>
          </div>
          {/* 成本条 */}
          <div className="flex h-4 rounded-sm overflow-hidden bg-rice/[0.05]">
            <div
              className="bg-gold/40 flex items-center justify-center text-rice/80 font-semibold transition"
              style={{ width: `${(d.fixed / d.total) * 100}%`, fontSize: 9 }}
            >
              固定 ¥{(d.fixed / 10000).toFixed(1)}万
            </div>
            <div
              className="bg-gold/70 flex items-center justify-center text-white font-semibold transition"
              style={{ width: `${(d.transport / d.total) * 100}%`, fontSize: 9 }}
            >
              运输 ¥{(d.transport / 10000).toFixed(1)}万
            </div>
          </div>
        </div>
      ))}

      {/* 总计 */}
      <div className="mt-2 pt-2 border-t border-rice/10 grid grid-cols-3 gap-2 text-center">
        <div className="rounded bg-rice/[0.04] p-1.5">
          <span className="block text-rice font-semibold">¥{(grandFixed / 10000).toFixed(1)}万</span>
          <span className="text-rice/35">固定成本</span>
        </div>
        <div className="rounded bg-rice/[0.04] p-1.5">
          <span className="block text-rice font-semibold">¥{(grandTransport / 10000).toFixed(1)}万</span>
          <span className="text-rice/35">运输成本</span>
        </div>
        <div className="rounded bg-gold/[0.08] p-1.5">
          <span className="block text-gold font-semibold">¥{(grandTotal / 10000).toFixed(1)}万</span>
          <span className="text-rice/35">月总计</span>
        </div>
      </div>
      <p className="text-rice/25 mt-2 leading-relaxed">
        以上为估算值。实际成本需结合运输合同、油价、路桥费和人力成本综合计算。
      </p>
    </div>
  );
}
