import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type AboutProps = {
  lang: Language;
};

export function About({ lang }: AboutProps) {
  const copy = siteContent[lang].about;

  return (
    <section id="about" className="section-band bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
        <div>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
          <div className="mt-10 rounded-2xl border border-line bg-rice p-7 shadow-soft">
            <p className="text-2xl font-semibold leading-tight text-ink md:text-3xl">{copy.statement}</p>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="space-y-6 text-lg leading-9 text-ink/70">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium text-ink/50">{copy.focusLabel}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.focusAreas.map((area) => (
                <span key={area} className="rounded-full border border-line bg-rice px-4 py-2 text-sm text-ink/70">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
