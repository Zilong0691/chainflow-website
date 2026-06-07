"use client";

import { Hammer, Sparkles, Wrench } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type SkillsProps = { lang: Language };

export function Skills({ lang }: SkillsProps) {
  const copy = siteContent[lang];
  const zh = lang === "zh";

  return (
    <section id="skills" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.toolsHeader.eyebrow}
          title={copy.toolsHeader.title}
          subtitle={copy.toolsHeader.subtitle}
          tone="dark"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.tools.map((tool) => (
            <div key={tool.name} className="tool-card">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold/10 text-gold">
                {tool.slug === "routeflow" ? <Wrench size={16} /> : <Hammer size={16} />}
              </div>
              <p className="mt-3 text-xs font-medium text-gold">{tool.name}</p>
              <h3 className="mt-1 whitespace-nowrap text-lg font-semibold leading-tight text-rice">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-rice/55 line-clamp-2">{tool.problem}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a href={tool.href} className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-graphite transition hover:bg-ember">
                  <Sparkles size={14} />{zh ? "体验演示" : "View Demo"}
                </a>
                {tool.plans.filter(p=>p.name!=='Demo 免费'&&p.name!=='Free Demo').map(p=>(
                  <a key={p.name} href="#contact" className="rounded-full border border-rice/15 px-3 py-1.5 text-xs text-rice/55 transition hover:border-gold/40 hover:text-gold">
                    {p.name} {p.price}
                  </a>
                ))}
              </div>
            </div>
          ))}
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
