import { futureDirections } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function FutureDirections() {
  return (
    <section className="section-band bg-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="Where ChainFlow is Heading"
          title="A long-term intelligence layer for supply chain flow."
          align="center"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {futureDirections.map((direction) => (
            <article key={direction.title} className="bg-rice p-8 md:p-10">
              <h3 className="text-2xl font-semibold leading-tight text-ink">{direction.title}</h3>
              <p className="mt-5 text-base leading-8 text-ink/60">{direction.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
