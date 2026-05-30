import { layers } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function ThreeLayers() {
  return (
    <section className="section-band bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="Operating Layers"
          title="From Tasks to Decisions to Networks"
          subtitle="Start small. Build real value. Grow into intelligence."
        />

        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-5 top-10 hidden h-px w-[calc(100%-2.5rem)] bg-line lg:block" />
          {layers.map((layer) => (
            <article key={layer.title} className="relative rounded-2xl border border-line/80 bg-rice p-7 shadow-soft">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-jade/25 bg-jade/10 text-sm font-semibold text-jade">
                  {layer.number}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="text-2xl font-semibold text-ink">{layer.title}</h3>
              <p className="mt-4 min-h-16 text-base leading-7 text-ink/70">{layer.summary}</p>

              <div className="mt-7">
                <p className="text-sm font-medium text-ink/50">Covers</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.scenes.map((scene) => (
                    <span key={scene} className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/70">
                      {scene}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-line pt-5">
                <p className="text-sm leading-7 text-ink/50">{layer.keywords.join(" / ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
