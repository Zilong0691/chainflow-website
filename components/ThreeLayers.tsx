import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type ThreeLayersProps = {
  lang: Language;
};

export function ThreeLayers({ lang }: ThreeLayersProps) {
  const copy = siteContent[lang];

  return (
    <section className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.layersHeader.eyebrow}
          title={copy.layersHeader.title}
          subtitle={copy.layersHeader.subtitle}
          tone="dark"
        />

        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-5 top-10 hidden h-px w-[calc(100%-2.5rem)] bg-rice/10 lg:block" />
          {copy.layers.map((layer) => (
            <article key={layer.title} className="relative rounded-2xl border border-rice/10 bg-rice/[0.045] p-7">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-gold/10 text-sm font-semibold text-gold">
                  {layer.number}
                </span>
                <span className="h-px flex-1 bg-rice/10" />
              </div>
              <h3 className="text-2xl font-semibold text-rice">{layer.title}</h3>
              <p className="mt-4 min-h-16 text-base leading-7 text-rice/70">{layer.summary}</p>

              <div className="mt-7">
                <p className="text-sm font-medium text-rice/50">{copy.labels.bestFor}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.scenes.map((scene) => (
                    <span key={scene} className="rounded-full border border-rice/10 bg-rice/[0.04] px-3 py-1.5 text-sm text-rice/70">
                      {scene}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-rice/10 pt-5">
                <p className="text-sm leading-7 text-rice/50">{layer.keywords.join(" / ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
