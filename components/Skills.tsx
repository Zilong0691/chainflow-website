"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Hammer, MapPin, PlayCircle, Sparkles } from "lucide-react";
import { siteContent, type Language, type ToolSlug } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type SkillsProps = {
  lang: Language;
};

type SiteLanguage = keyof typeof siteContent;
type Tool = (typeof siteContent)[SiteLanguage]["tools"][number];
type Labels = (typeof siteContent)[SiteLanguage]["labels"];

export function Skills({ lang }: SkillsProps) {
  const copy = siteContent[lang];
  const [selectedSlug, setSelectedSlug] = useState<ToolSlug>("routeflow");
  const selectedTool = copy.tools.find((tool) => tool.slug === selectedSlug) ?? copy.tools[0];

  return (
    <section id="skills" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={copy.toolsHeader.eyebrow}
            title={copy.toolsHeader.title}
            subtitle={copy.toolsHeader.subtitle}
            tone="dark"
          />
          <button type="button" onClick={() => setSelectedSlug(selectedTool.slug)} className="btn-outline w-fit">
            <PlayCircle size={16} />
            {copy.toolsDemoCta}
          </button>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {copy.tools.map((tool) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              labels={copy.labels}
              lang={lang}
              active={tool.slug === selectedSlug}
            />
          ))}
        </div>

        <DemoWorkbench lang={lang} tool={selectedTool} />

        <div className="mt-8 rounded-2xl border border-rice/10 bg-rice/[0.045] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-gold">{copy.comingSoonHeader}</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-rice/60">
                {lang === "zh"
                  ? "后续工具包会逐步补可体验演示，现在先把两个可演示工具做深。"
                  : "Future toolkits will receive interactive demos gradually. The current focus is making the two ready demos strong."}
              </p>
            </div>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold">
              {lang === "zh" ? "长期工具包" : "Long-term toolbox"}
            </span>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {copy.comingSoonTools.map((tool) => (
              <div key={tool.name} className="rounded-xl border border-rice/10 bg-graphite/70 p-4">
                <p className="text-sm font-semibold text-rice">{tool.name}</p>
                <p className="mt-2 text-sm leading-6 text-rice/60">{tool.title}</p>
                <p className="mt-4 text-xs font-medium text-gold">{lang === "zh" ? "规划中" : "Coming Soon"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({
  tool,
  labels,
  lang,
  active
}: {
  tool: Tool;
  labels: Labels;
  lang: Language;
  active: boolean;
}) {
  return (
    <article
      className={`group rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/50 md:p-8 ${
        active ? "border-gold/55 bg-gold/[0.08]" : "border-rice/10 bg-rice/[0.045]"
      }`}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
          <Hammer size={19} />
        </div>
        <span className="inline-flex rounded-full bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold">{tool.status}</span>
      </div>

      <p className="text-sm font-medium text-gold">{tool.name}</p>
      <h3 className="mt-2 text-3xl font-semibold leading-tight text-rice">{tool.title}</h3>
      <p className="mt-5 text-base leading-8 text-rice/70">{tool.value}</p>

      <div className="mt-7 grid gap-5 border-t border-rice/10 pt-6">
        <ToolLine label={labels.problem} value={tool.problem} />
        <ToolList label={labels.bestFor} items={tool.bestFor} />
        <ToolList label={labels.input} items={tool.inputs} />
        <ToolList label={labels.output} items={tool.outputs} />
      </div>

      <div className="mt-7 grid gap-2 sm:grid-cols-3">
        {tool.plans.map((plan) => (
          <div key={plan.name} className="rounded-xl border border-rice/10 bg-graphite/60 p-3">
            <p className="text-xs text-rice/50">{plan.name}</p>
            <p className="mt-1 text-base font-semibold text-rice">{plan.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-3">
        {tool.plans.map((plan, index) =>
          index === 0 ? (
            <a key={plan.name} href={tool.href} className="btn-primary">
              <Sparkles size={16} />
              {plan.cta}
            </a>
          ) : (
            <a key={plan.name} href="#contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-rice/10 px-4 py-2 text-sm font-semibold text-rice/80 transition hover:border-gold/40 hover:text-gold">
              {plan.cta}
              <ArrowRight size={16} />
            </a>
          )
        )}
      </div>
    </article>
  );
}

function ToolLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-rice">{label}</p>
      <p className="mt-2 text-sm leading-7 text-rice/60">{value}</p>
    </div>
  );
}

function ToolList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-rice">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-rice/10 bg-rice/[0.055] px-3 py-1.5 text-xs text-rice/65">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function DemoWorkbench({ lang, tool }: { lang: Language; tool: Tool }) {
  const [mode, setMode] = useState<"balanced" | "cost" | "speed">("balanced");
  const demo = getDemoConfig(tool.slug, lang, mode);

  return (
    <div className="mt-8 rounded-2xl border border-gold/25 bg-[linear-gradient(135deg,rgba(215,177,93,0.12),rgba(255,250,240,0.035))] p-5 shadow-soft md:p-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-gold">{lang === "zh" ? `${tool.name} 演示` : `${tool.name} Demo`}</p>
          <h3 className="mt-2 text-3xl font-semibold leading-tight text-rice">{demo.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-rice/65">{demo.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demo.modes.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setMode(item.value)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
                mode === item.value ? "border-gold bg-gold text-graphite" : "border-rice/10 bg-graphite/60 text-rice/70 hover:text-rice"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-xl border border-rice/10 bg-graphite/70 p-4">
          <div className="demo-map min-h-[22rem]">
            {demo.nodes.map((node) => (
              <span key={node} className={`demo-map__node ${node}`} />
            ))}
            <span className="demo-map__path demo-map__path--one" />
            <span className="demo-map__path demo-map__path--two" />
            <span className="demo-map__path demo-map__path--three" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-rice/10 bg-graphite/80 p-4 backdrop-blur">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {demo.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-xs text-rice/45">{metric.label}</p>
                    <p className="mt-1 text-lg font-semibold text-rice">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DemoMiniPanel icon={<MapPin size={16} />} title={demo.inputTitle} items={tool.demoInput} />
            <DemoMiniPanel icon={<CheckCircle2 size={16} />} title={demo.outputTitle} items={tool.demoOutput} />
          </div>

          <div className="overflow-hidden rounded-xl border border-rice/10 bg-graphite/70">
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-rice/10 bg-rice/[0.04] px-4 py-3 text-xs font-semibold text-rice/50">
              {demo.tableHeaders.map((header) => (
                <span key={header}>{header}</span>
              ))}
            </div>
            {demo.rows.map((row) => (
              <div key={row.join("-")} className="grid grid-cols-[1fr_1fr_1fr] border-b border-rice/10 px-4 py-3 text-sm text-rice/70 last:border-0">
                {row.map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary">
              {demo.primaryCta}
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              {demo.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoMiniPanel({ icon, title, items }: { icon: ReactNode; title: string; items: readonly string[] }) {
  return (
    <div className="rounded-xl border border-rice/10 bg-graphite/70 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gold">
        {icon}
        {title}
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-lg border border-rice/10 bg-rice/[0.04] px-3 py-2 text-xs leading-5 text-rice/65">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function getDemoConfig(slug: ToolSlug, lang: Language, mode: "balanced" | "cost" | "speed") {
  const zh = lang === "zh";

  if (slug === "networkflow") {
    const metrics = {
      balanced: zh
        ? [
            { label: "推荐仓点", value: "2 个" },
            { label: "覆盖率", value: "94%" },
            { label: "成本变化", value: "-11.8%" },
            { label: "备用方案", value: "2 个" }
          ]
        : [
            { label: "Sites", value: "2" },
            { label: "Coverage", value: "94%" },
            { label: "Cost change", value: "-11.8%" },
            { label: "Backup plans", value: "2" }
          ],
      cost: zh
        ? [
            { label: "推荐仓点", value: "1 个" },
            { label: "覆盖率", value: "88%" },
            { label: "成本变化", value: "-16.4%" },
            { label: "备用方案", value: "3 个" }
          ]
        : [
            { label: "Sites", value: "1" },
            { label: "Coverage", value: "88%" },
            { label: "Cost change", value: "-16.4%" },
            { label: "Backup plans", value: "3" }
          ],
      speed: zh
        ? [
            { label: "推荐仓点", value: "3 个" },
            { label: "覆盖率", value: "98%" },
            { label: "成本变化", value: "-6.2%" },
            { label: "备用方案", value: "1 个" }
          ]
        : [
            { label: "Sites", value: "3" },
            { label: "Coverage", value: "98%" },
            { label: "Cost change", value: "-6.2%" },
            { label: "Backup plans", value: "1" }
          ]
    };

    return {
      title: zh ? "脱敏仓网评估工作台" : "Sanitized Warehouse Network Workbench",
      subtitle: zh ? "点击不同目标，模拟仓点数量、覆盖率和成本的权衡。" : "Switch objectives to simulate the trade-off between site count, coverage, and cost.",
      inputTitle: zh ? "脱敏输入" : "Sanitized input",
      outputTitle: zh ? "输出摘要" : "Output summary",
      tableHeaders: zh ? ["候选仓", "覆盖城市", "判断"] : ["Candidate", "Covered cities", "Decision"],
      rows: zh
        ? [
            ["苏州", "上海 / 杭州 / 南京", "主仓"],
            ["武汉", "长沙 / 南昌 / 合肥", "主仓"],
            ["郑州", "华中备用覆盖", "备选"]
          ]
        : [
            ["Suzhou", "Shanghai / Hangzhou / Nanjing", "Primary"],
            ["Wuhan", "Changsha / Nanchang / Hefei", "Primary"],
            ["Zhengzhou", "Central backup coverage", "Backup"]
          ],
      modes: [
        { label: zh ? "均衡方案" : "Balanced", value: "balanced" as const },
        { label: zh ? "成本优先" : "Cost first", value: "cost" as const },
        { label: zh ? "服务优先" : "Service first", value: "speed" as const }
      ],
      metrics: metrics[mode],
      nodes: ["left-[22%] top-[28%]", "left-[42%] top-[20%]", "left-[66%] top-[35%]", "left-[74%] top-[62%]", "left-[48%] top-[72%]", "left-[25%] top-[60%]"],
      primaryCta: zh ? "获取标准版 ¥399" : "Get Standard Version ¥399",
      secondaryCta: zh ? "定制这个工具" : "Customize This Skill"
    };
  }

  const metrics = {
    balanced: zh
      ? [
          { label: "配送路线", value: "3 条" },
          { label: "预计里程", value: "86.4km" },
          { label: "装载率", value: "82%" },
          { label: "异常地址", value: "1 个" }
        ]
      : [
          { label: "Routes", value: "3" },
          { label: "Distance", value: "86.4km" },
          { label: "Load rate", value: "82%" },
          { label: "Exceptions", value: "1" }
        ],
    cost: zh
      ? [
          { label: "配送路线", value: "3 条" },
          { label: "预计里程", value: "78.9km" },
          { label: "装载率", value: "88%" },
          { label: "异常地址", value: "2 个" }
        ]
      : [
          { label: "Routes", value: "3" },
          { label: "Distance", value: "78.9km" },
          { label: "Load rate", value: "88%" },
          { label: "Exceptions", value: "2" }
        ],
    speed: zh
      ? [
          { label: "配送路线", value: "4 条" },
          { label: "预计里程", value: "92.3km" },
          { label: "准时率", value: "98%" },
          { label: "异常地址", value: "0 个" }
        ]
      : [
          { label: "Routes", value: "4" },
          { label: "Distance", value: "92.3km" },
          { label: "On-time", value: "98%" },
          { label: "Exceptions", value: "0" }
        ]
  };

  return {
    title: zh ? "脱敏配送排线工作台" : "Sanitized Route Planning Workbench",
    subtitle: zh ? "点击不同目标，模拟里程、准时率和车辆装载的权衡。" : "Switch objectives to simulate the trade-off between mileage, on-time rate, and vehicle load.",
    inputTitle: zh ? "脱敏输入" : "Sanitized input",
    outputTitle: zh ? "输出摘要" : "Output summary",
    tableHeaders: zh ? ["车辆", "订单", "建议"] : ["Vehicle", "Orders", "Suggestion"],
    rows: zh
      ? [
          ["车辆 A", "7 单 / 31.2km", "先送高时效"],
          ["车辆 B", "6 单 / 28.7km", "避开拥堵区"],
          ["车辆 C", "5 单 / 26.5km", "复核 1 个地址"]
        ]
      : [
          ["Vehicle A", "7 orders / 31.2km", "Serve urgent stops first"],
          ["Vehicle B", "6 orders / 28.7km", "Avoid congested zone"],
          ["Vehicle C", "5 orders / 26.5km", "Review 1 address"]
        ],
    modes: [
      { label: zh ? "均衡方案" : "Balanced", value: "balanced" as const },
      { label: zh ? "成本优先" : "Cost first", value: "cost" as const },
      { label: zh ? "时效优先" : "Speed first", value: "speed" as const }
    ],
    metrics: metrics[mode],
    nodes: ["left-[18%] top-[32%]", "left-[38%] top-[20%]", "left-[62%] top-[36%]", "left-[76%] top-[62%]", "left-[48%] top-[74%]", "left-[24%] top-[58%]"],
    primaryCta: zh ? "获取标准版 ¥399" : "Get Standard Version ¥399",
    secondaryCta: zh ? "定制这个工具" : "Customize This Skill"
  };
}
