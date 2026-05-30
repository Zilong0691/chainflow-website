import { ArrowRight, CalendarDays } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-graphite text-rice">
      <img
        src="/chainflow-hero-flow.png"
        alt=""
        className="hero-asset pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,9,0.96)_0%,rgba(8,11,9,0.88)_34%,rgba(8,11,9,0.36)_70%,rgba(8,11,9,0.64)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(180deg,rgba(8,11,9,0)_0%,rgba(8,11,9,1)_85%)]" />

      <div className="mx-auto grid min-h-[82svh] max-w-7xl items-center px-5 py-20 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="mb-7 inline-flex rounded-full border border-rice/20 bg-rice/10 px-4 py-2 text-sm text-rice/70 backdrop-blur">
            From tasks to decisions, from risks to opportunities.
          </p>
          <p className="mb-4 text-xl font-medium text-rice/80 md:text-2xl">ChainFlow</p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.06] text-rice md:text-7xl">
            让供应链，如水流动
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-rice/80 md:text-2xl">
            AI-native tools and intelligence for global supply chain flow.
          </p>
          <div className="mt-7 grid max-w-3xl gap-4 text-base leading-8 text-rice/70 md:grid-cols-2">
            <p>ChainFlow 探索如何用 AI 减少供应链中的摩擦，优化决策，并创造更好的全球连接。</p>
            <p>
              ChainFlow explores how AI can reduce friction, improve decisions, and create better connections across
              global supply chains.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#skills" className="btn-primary">
              Explore Skills
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-ghost">
              <CalendarDays size={18} />
              Book a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
