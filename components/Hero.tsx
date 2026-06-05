import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";

type HeroProps = {
  lang: Language;
};

export function Hero({ lang }: HeroProps) {
  const copy = siteContent[lang].hero;

  return (
    <section id="top" className="relative isolate overflow-hidden bg-graphite text-rice">
      <img
        src="/chainflow-hero-flow.png"
        alt=""
        className="hero-asset pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(215,177,93,0.24)_0%,rgba(31,143,132,0.10)_28%,rgba(8,11,9,0.72)_58%,rgba(8,11,9,0.98)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,9,0.98)_0%,rgba(8,11,9,0.9)_42%,rgba(8,11,9,0.48)_74%,rgba(8,11,9,0.86)_100%)]" />

      <div className="mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.92fr_0.9fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="mb-7 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm text-gold backdrop-blur">
            {copy.eyebrow}
          </p>
          <p className="mb-4 text-xl font-medium text-rice/80 md:text-2xl">{copy.brand}</p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.06] text-rice md:text-7xl">
            {lang === "zh" ? (
              <>
                让供应链，如<span className="flow-word">水流动</span>
              </>
            ) : (
              copy.title
            )}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-rice/80 md:text-2xl">{copy.subtitle}</p>
          <p className="mt-7 max-w-3xl text-base leading-8 text-rice/70 md:text-lg">{copy.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#skills" className="btn-primary">
              {copy.primaryCta}
              <ArrowRight size={18} />
            </a>
            <a href="#skills" className="btn-ghost">
              <Sparkles size={18} />
              {copy.secondaryCta}
            </a>
            <a href="#contact" className="btn-ghost">
              <CalendarDays size={18} />
              {copy.tertiaryCta}
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[18rem] items-center justify-center sm:min-h-[24rem] lg:min-h-[34rem]">
          <GlobalFlowOrb />
        </div>
      </div>
    </section>
  );
}

function GlobalFlowOrb() {
  const nodes = [
    "left-[16%] top-[30%]",
    "left-[30%] top-[22%]",
    "left-[48%] top-[28%]",
    "left-[66%] top-[35%]",
    "left-[75%] top-[52%]",
    "left-[58%] top-[68%]",
    "left-[36%] top-[72%]",
    "left-[22%] top-[56%]",
    "left-[48%] top-[48%]"
  ];

  return (
    <div className="supply-flow" aria-hidden="true">
      <div className="supply-flow__hemisphere" />
      <div className="supply-flow__grid supply-flow__grid--one" />
      <div className="supply-flow__grid supply-flow__grid--two" />
      <div className="supply-flow__ribbon supply-flow__ribbon--one" />
      <div className="supply-flow__ribbon supply-flow__ribbon--two" />
      <div className="supply-flow__ribbon supply-flow__ribbon--three" />
      <div className="supply-flow__pulse supply-flow__pulse--one" />
      <div className="supply-flow__pulse supply-flow__pulse--two" />
      <div className="supply-flow__pulse supply-flow__pulse--three" />
      {nodes.map((position, index) => (
        <span key={position} className={`supply-flow__node ${position}`} style={{ animationDelay: `${index * 0.28}s` }} />
      ))}
    </div>
  );
}
