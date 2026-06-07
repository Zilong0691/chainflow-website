"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink, Hammer, Sparkles, Wrench } from "lucide-react";
import { siteContent, type Language, type ToolSlug } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type SkillsProps = { lang: Language };
type SiteLanguage = keyof typeof siteContent;
type Tool = (typeof siteContent)[SiteLanguage]["tools"][number];

export function Skills({ lang }: SkillsProps) {
  const copy = siteContent[lang];
  const [expanded, setExpanded] = useState<ToolSlug | null>(null);
  const zh = lang === "zh";

  /* 匹配案例数据 */
  function getCase(slug: ToolSlug) {
    return copy.cases.find((c) => c.title.toLowerCase().includes(slug)) ?? null;
  }

  return (
    <section id="skills" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.toolsHeader.eyebrow}
          title={copy.toolsHeader.title}
          subtitle={copy.toolsHeader.subtitle}
          tone="dark"
        />

        {/* ===== 工具墙 ===== */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.tools.map((tool) => {
            const isOpen = expanded === tool.slug;
            const cas = getCase(tool.slug);
            return (
              <div key={tool.name}>
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : tool.slug)}
                  className={`tool-card w-full text-left transition ${
                    isOpen ? "tool-card--open" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold/10 text-gold">
                      {tool.slug === "routeflow" ? <Wrench size={16} /> : <Hammer size={16} />}
                    </div>
                    {isOpen ? (
                      <ChevronUp size={16} className="shrink-0 text-gold/60" />
                    ) : (
                      <ChevronDown size={16} className="shrink-0 text-rice/30" />
                    )}
                  </div>
                  <p className="mt-3 text-xs font-medium text-gold">{tool.name}</p>
                  <h3 className="mt-1 text-lg font-semibold leading-tight text-rice">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-rice/55 line-clamp-2">{tool.problem}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tool.plans.map((p) => (
                      <span key={p.name} className="rounded-md border border-rice/10 bg-rice/[0.04] px-2 py-0.5 text-xs text-rice/45">
                        {p.name}&nbsp;{p.price}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={tool.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-graphite transition hover:bg-ember"
                    >
                      <Sparkles size={12} />
                      {zh ? "体验演示" : "View Demo"}
                    </a>
                    <span className="text-xs text-rice/35">{tool.status}</span>
                  </div>
                </button>

                {/* ===== 展开详情：案例 + 方法 + 价格 ===== */}
                {isOpen && cas && (
                  <div className="tool-detail mt-3 rounded-2xl border border-gold/20 bg-[linear-gradient(135deg,rgba(215,177,93,0.08),rgba(31,143,132,0.04))] p-5 md:p-6">
                    {/* 业务场景 */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold text-gold/80">{zh ? "业务场景" : "Scenario"}</p>
                        <p className="mt-2 text-sm leading-7 text-rice/70">{cas.problem}</p>
                        <p className="mt-2 text-xs text-rice/40">{cas.audience}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gold/80">{zh ? "典型痛点" : "Pain Points"}</p>
                        <p className="mt-2 text-sm leading-7 text-rice/70">{cas.data}</p>
                      </div>
                    </div>

                    {/* ChainFlow 方法 */}
                    <div className="mt-5 rounded-xl border border-rice/10 bg-graphite/50 p-4">
                      <p className="text-xs font-semibold text-gold/80">{zh ? "ChainFlow 方法" : "Method"}</p>
                      <p className="mt-2 text-sm leading-7 text-rice/70">{cas.method}</p>
                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                        <div className="rounded-lg border border-rice/10 bg-rice/[0.03] p-3">
                          <p className="text-xs text-rice/40">{zh ? "输入" : "Input"}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {tool.inputs.slice(0, 3).map((s) => (
                              <span key={s} className="rounded-full border border-rice/10 px-2 py-0.5 text-xs text-rice/55">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-lg border border-rice/10 bg-rice/[0.03] p-3">
                          <p className="text-xs text-rice/40">{zh ? "输出" : "Output"}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {tool.outputs.slice(0, 3).map((s) => (
                              <span key={s} className="rounded-full border border-rice/10 px-2 py-0.5 text-xs text-rice/55">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 业务价值 */}
                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      <div className="text-sm leading-7 text-rice/60">
                        <span className="text-xs font-semibold text-gold/70">{zh ? "业务价值：" : "Value: "}</span>
                        {cas.value}
                      </div>
                      <div className="text-sm leading-7 text-rice/60">
                        <span className="text-xs font-semibold text-gold/70">{zh ? "下一步：" : "Next: "}</span>
                        {cas.nextStep}
                      </div>
                    </div>

                    {/* 价格路径 */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-rice/10 pt-4">
                      {tool.plans.map((p, i) => (
                        <a
                          key={p.name}
                          href={i === 0 ? tool.href : "#contact"}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            i === 0
                              ? "bg-gold text-graphite hover:bg-ember"
                              : "border border-rice/15 text-rice/65 hover:border-gold/40 hover:text-gold"
                          }`}
                        >
                          {p.name} {p.price}
                          <ArrowRight size={11} />
                        </a>
                      ))}
                    </div>

                    {/* Demo 直达 */}
                    <a
                      href={tool.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold/70 transition hover:text-gold"
                    >
                      <ExternalLink size={12} />
                      {zh ? "打开可交互 Demo 页面" : "Open interactive demo"}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== 即将推出 ===== */}
        <div className="mt-12 rounded-2xl border border-rice/10 bg-rice/[0.03] p-6">
          <p className="text-sm font-medium text-gold">{copy.comingSoonHeader}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.comingSoonTools.map((t) => (
              <div key={t.name} className="rounded-xl border border-rice/10 bg-graphite/60 p-4 transition hover:border-gold/25">
                <p className="text-sm font-semibold text-rice/80">{t.name}</p>
                <p className="mt-1.5 text-sm leading-6 text-rice/50">{t.title}</p>
                <p className="mt-3 text-xs font-medium text-gold/60">{zh ? "规划中" : "Coming Soon"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
