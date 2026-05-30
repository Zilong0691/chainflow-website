import { ArrowUpRight } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type CasesProps = {
  lang: Language;
};

export function Cases({ lang }: CasesProps) {
  const copy = siteContent[lang];

  return (
    <section id="cases" className="section-band bg-ink text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.casesHeader.eyebrow}
          title={copy.casesHeader.title}
          subtitle={copy.casesHeader.subtitle}
          tone="dark"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rice/10 bg-rice/10 md:grid-cols-2">
          {copy.cases.map((item, index) => {
            const ready = index < 2;

            return (
              <article key={item.title} className="bg-ink p-6 transition hover:bg-rice/[0.045] md:p-8">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <span className="text-sm text-rice/50">{item.number}</span>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      ready ? "bg-jade/20 text-[#75d4cb]" : "bg-clay/20 text-[#e1ab86]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#75d4cb]">{item.product}</p>
                <h3 className="mt-2 max-w-xl text-2xl font-semibold leading-tight text-rice">{item.title}</h3>

                <div className="mt-7 grid gap-5">
                  <CaseLine label={copy.labels.problem} value={item.problem} />
                  <CaseLine label={copy.labels.method} value={item.method} />
                  <CaseLine label={copy.labels.output} value={item.output} />
                </div>

                <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-rice/75 hover:text-rice">
                  {item.cta}
                  <ArrowUpRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5 border-t border-rice/10 pt-4">
      <p className="text-sm text-rice/40">{label}</p>
      <p className="text-base leading-7 text-rice/70">{value}</p>
    </div>
  );
}
