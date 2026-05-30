import { ArrowRight, Map } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type DemoSectionProps = {
  lang: Language;
};

export function DemoSection({ lang }: DemoSectionProps) {
  const copy = siteContent[lang];

  return (
    <section id="demo" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.demoHeader.eyebrow}
          title={copy.demoHeader.title}
          subtitle={copy.demoHeader.subtitle}
          tone="dark"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {copy.tools.map((tool) => (
            <a
              key={tool.slug}
              href={tool.href}
              className="group rounded-2xl border border-rice/10 bg-rice/[0.045] p-6 transition hover:-translate-y-1 hover:border-gold/40 hover:bg-rice/[0.07] md:p-8"
            >
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-sm font-medium text-gold">{tool.name}</p>
                  <h3 className="mt-2 text-3xl font-semibold leading-tight text-rice">{tool.title}</h3>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                  <Map size={20} />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <DemoColumn title={copy.labels.input} items={tool.demoInput} />
                <DemoColumn title={copy.labels.output} items={tool.demoOutput} />
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-rice group-hover:text-gold">
                {tool.cta}
                <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-rice/50">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-lg border border-rice/10 bg-graphite/70 px-3 py-2 text-xs leading-5 text-rice/70">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
