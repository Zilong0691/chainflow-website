import { ArrowRight } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type AboutProps = { lang: Language };

export function About({ lang }: AboutProps) {
  const copy = siteContent[lang].about;
  const notesCopy = siteContent[lang].openNotes;

  return (
    <section id="about" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} tone="dark" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3 text-base leading-8 text-rice/70">
            {copy.paragraphs.map((p) => p.split("\n").map((line,i) => <p key={i}>{line}</p>))}
            <div>
              <p className="text-sm font-medium text-rice/40">{copy.focusLabel}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {copy.focusAreas.map((a) => (
                  <span key={a} className="rounded-full border border-rice/10 bg-rice/[0.04] px-3 py-1 text-xs text-rice/60">{a}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-rice/10 bg-rice/[0.03] p-5">
            <p className="text-xs font-medium text-gold">{notesCopy.eyebrow}</p>
            <p className="mt-2 text-sm leading-7 text-rice/55">{notesCopy.body}</p>
            <a href="https://github.com/Zilong0691" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rice/60 transition hover:text-gold">
              {notesCopy.cta}<ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
