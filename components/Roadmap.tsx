import { roadmap } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Roadmap() {
  return (
    <section className="section-band bg-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="Productization Path"
          title="Prototype → Template → Pilot → Deployment"
          subtitle="ChainFlow does not sell a rough script. It offers a path from working prototype to real workflow adoption."
          align="center"
        />

        <div className="relative mt-14 grid gap-4 md:grid-cols-4">
          <div className="absolute left-10 right-10 top-11 hidden h-px bg-line md:block" />
          {roadmap.map((step, index) => (
            <article key={step.title} className="relative rounded-2xl border border-line bg-paper p-6 text-center shadow-soft">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-jade/25 bg-rice text-sm font-semibold text-jade">
                0{index + 1}
              </span>
              <h3 className="mt-7 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/62">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
