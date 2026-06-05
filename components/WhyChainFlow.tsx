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
              <p className="mt-6 text-base leading-8 text-rice/70">{item.description}</p>
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

        <div className="mt-10 rounded-2xl border border-gold/20 bg-[linear-gradient(135deg,rgba(215,177,93,0.11),rgba(31,143,132,0.06))] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-gold">{copy.flowLogic.eyebrow}</p>
              <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-rice md:text-4xl">
                {copy.flowLogic.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-rice/70">{copy.flowLogic.body}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-5">
              {copy.flowLogic.steps.map((step, index) => (
                <div key={step.label} className="relative rounded-xl border border-rice/10 bg-graphite/70 p-4">
                  <p className="text-xs text-rice/35">0{index + 1}</p>
                  <p className="mt-3 text-base font-semibold text-gold">{step.label}</p>
                  {step.cn !== step.label ? <p className="mt-1 text-sm font-medium text-rice">{step.cn}</p> : null}
                  <p className="mt-3 text-xs leading-5 text-rice/55">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
