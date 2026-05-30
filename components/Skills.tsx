import { ArrowRight, Hammer, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type SkillsProps = {
  lang: Language;
};

type SiteLanguage = keyof typeof siteContent;
type Tool = (typeof siteContent)[SiteLanguage]["tools"][number];
type Labels = (typeof siteContent)[SiteLanguage]["labels"];

export function Skills({ lang }: SkillsProps) {
  const copy = siteContent[lang];

  return (
    <section id="skills" className="section-band bg-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={copy.toolsHeader.eyebrow}
            title={copy.toolsHeader.title}
            subtitle={copy.toolsHeader.subtitle}
          />
          <a href="#demo" className="btn-outline w-fit">
            {copy.toolsDemoCta}
          </a>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {copy.tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} labels={copy.labels} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-jade">{copy.comingSoonHeader}</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/60">
                {lang === "zh" ? "后续工具只做轻量展示，避免抢掉当前两个可演示工具的重点。" : "Future tools are shown lightly so the two demo-ready Skills remain the focus."}
              </p>
            </div>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold text-ink">
              Long-term toolbox
            </span>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {copy.comingSoonTools.map((tool) => (
              <div key={tool.name} className="rounded-xl border border-line bg-rice p-4">
                <p className="text-sm font-semibold text-ink">{tool.name}</p>
                <p className="mt-2 text-sm leading-6 text-ink/60">{tool.title}</p>
                <p className="mt-4 text-xs font-medium text-clay">Coming Soon</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, labels }: { tool: Tool; labels: Labels }) {
  return (
    <article className="group rounded-2xl border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft md:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-rice text-jade">
          <Hammer size={19} />
        </div>
        <span className="inline-flex rounded-full bg-jade/10 px-3 py-1.5 text-xs font-medium text-jade">{tool.status}</span>
      </div>

      <p className="text-sm font-medium text-jade">{tool.name}</p>
      <h3 className="mt-2 text-3xl font-semibold leading-tight text-ink">{tool.title}</h3>
      <p className="mt-5 text-base leading-8 text-ink/70">{tool.value}</p>

      <div className="mt-7 grid gap-5 border-t border-line pt-6">
        <ToolLine label={labels.problem} value={tool.problem} />
        <ToolList label={labels.bestFor} items={tool.bestFor} />
        <ToolList label={labels.input} items={tool.inputs} />
        <ToolList label={labels.output} items={tool.outputs} />
      </div>

      <div className="mt-7 rounded-xl border border-gold/25 bg-gold/10 p-4">
        <p className="text-sm font-semibold text-ink">{labels.pricing}</p>
        <p className="mt-2 text-sm leading-7 text-ink/70">{tool.pricing}</p>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a href={tool.href} className="btn-outline bg-rice">
          <Sparkles size={16} />
          {tool.cta}
        </a>
        <a href="#contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:text-jade">
          Customize
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

function ToolLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink">{label}</p>
      <p className="mt-2 text-sm leading-7 text-ink/60">{value}</p>
    </div>
  );
}

function ToolList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-line bg-rice px-3 py-1.5 text-xs text-ink/60">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
