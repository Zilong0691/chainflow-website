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
          <h1 className="text-balance text-5xl font-semibold leading-[1.06] text-rice md:text-7xl">{copy.title}</h1>
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

        <div className="relative hidden min-h-[34rem] items-center justify-center lg:flex">
          <GlobalFlowOrb />
        </div>
      </div>
    </section>
  );
}

function GlobalFlowOrb() {
  const nodes = [
    "left-[18%] top-[28%]",
    "left-[34%] top-[16%]",
    "left-[56%] top-[22%]",
    "left-[70%] top-[38%]",
    "left-[62%] top-[64%]",
    "left-[40%] top-[76%]",
    "left-[22%] top-[58%]",
    "left-[48%] top-[46%]"
  ];

  return (
    <div className="network-orb" aria-hidden="true">
      <div className="network-orb__ring" />
      <div className="network-orb__ring network-orb__ring--tilt" />
      <div className="network-orb__mesh" />
      <div className="network-orb__pulse network-orb__pulse--one" />
      <div className="network-orb__pulse network-orb__pulse--two" />
      <div className="network-orb__pulse network-orb__pulse--three" />
      {nodes.map((position, index) => (
        <span key={position} className={`network-orb__node ${position}`} style={{ animationDelay: `${index * 0.35}s` }} />
      ))}
    </div>
  );
}
