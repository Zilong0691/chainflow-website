import { ArrowRight, BookOpen, Target } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type CasesProps = {
  lang: Language;
};

export function Cases({ lang }: CasesProps) {
  const copy = siteContent[lang];

  return (
    <section id="cases" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.casesHeader.eyebrow}
          title={copy.casesHeader.title}
          subtitle={copy.casesHeader.subtitle}
          tone="dark"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {copy.cases.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-6 transition hover:-translate-y-1 hover:border-gold/40 md:p-7">
              <div className="mb-7 flex items-center justify-between">
                <span className="text-sm text-rice/35">0{index + 1}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                  {index === 2 ? <BookOpen size={18} /> : <Target size={18} />}
                </span>
              </div>

              <h3 className="text-2xl font-semibold leading-tight text-rice">{item.title}</h3>
              <p className="mt-3 text-sm font-medium text-gold">{item.audience}</p>

              <div className="mt-7 grid gap-4">
                {[
                  [copy.caseLabels.problem, item.problem],
                  [copy.caseLabels.data, item.data],
                  [copy.caseLabels.method, item.method],
                  [copy.caseLabels.output, item.output],
                  [copy.caseLabels.value, item.value],
                  [copy.caseLabels.limitation, item.limitation],
                  [copy.caseLabels.nextStep, item.nextStep]
                ].map(([label, value]) => (
                  <div key={label} className="border-t border-rice/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold/80">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-rice/68">{value}</p>
                  </div>
                ))}
              </div>

              <a href="#skills" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rice/75 transition hover:text-gold">
                {lang === "zh" ? "查看对应工具包" : "View related toolkit"}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
