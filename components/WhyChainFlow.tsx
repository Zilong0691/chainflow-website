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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            eyebrow={copy.why.eyebrow}
            title={copy.why.title}
            subtitle={copy.why.subtitle}
            tone="dark"
          />
          <div className="space-y-6 text-lg leading-9 text-rice/70">
            {copy.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="grid gap-3 md:grid-cols-5">
            {copy.flowSteps.map((step, index) => (
              <div key={step.term} className="flow-step">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-rice/50">0{index + 1}</span>
                  {index < copy.flowSteps.length - 1 ? (
                    <span className="hidden h-px flex-1 bg-rice/20 md:ml-4 md:block" />
                  ) : null}
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-rice">{step.term}</h3>
                <p className="mt-3 text-sm leading-6 text-rice/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
