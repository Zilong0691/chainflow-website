import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type WhyChainFlowProps = {
  lang: Language;
};

export function WhyChainFlow({ lang }: WhyChainFlowProps) {
  const copy = siteContent[lang];

  return (
    <section id="vision" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.threeWaysHeader.eyebrow}
          title={copy.threeWaysHeader.title}
          subtitle={copy.threeWaysHeader.subtitle}
          tone="dark"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rice/10 bg-rice/10 lg:grid-cols-3">
          {copy.threeWays.map((item, index) => (
            <article key={item.layer} className="bg-graphite p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm text-rice/40">0{index + 1}</span>
                <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs text-gold">
                  {item.layer}
                </span>
              </div>
              <h3 className="text-3xl font-semibold leading-tight text-rice">{item.title}</h3>
              {lang === "zh" ? <p className="mt-2 text-base text-rice/50">{item.englishTitle}</p> : null}
              <p className="mt-6 text-base leading-8 text-rice/70">{item.description}</p>
              {lang === "zh" ? <p className="mt-3 text-sm leading-7 text-rice/50">{item.englishDescription}</p> : null}
              <div className="mt-7 flex flex-wrap gap-2">
                {item.examples.map((example) => (
                  <span key={example} className="rounded-full border border-rice/10 bg-rice/[0.045] px-3 py-1.5 text-xs text-rice/70">
                    {example}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
