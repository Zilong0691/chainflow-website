import { ArrowRight } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type AboutProps = {
  lang: Language;
};

export function About({ lang }: AboutProps) {
  const copy = siteContent[lang].about;
  const notesCopy = siteContent[lang].openNotes;

  return (
    <section id="about" className="section-band bg-graphite text-rice">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
        <div>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} tone="dark" />
          <div className="mt-10 rounded-2xl border border-gold/25 bg-gold/10 p-7">
            <p className="text-2xl font-semibold leading-tight text-rice md:text-3xl">{copy.statement}</p>
          </div>

          {/* 开放笔记 — 整合自原 OpenNotes */}
          <div className="mt-8 rounded-2xl border border-rice/10 bg-rice/[0.035] p-6">
            <p className="text-sm font-medium text-gold">{notesCopy.eyebrow}</p>
            <p className="mt-2 text-sm leading-7 text-rice/60">{notesCopy.body}</p>
            <a
              href="https://github.com/Zilong0691"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rice/70 transition hover:text-gold"
            >
              {notesCopy.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="space-y-6 text-pretty text-lg leading-9 text-rice/70">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium text-rice/50">{copy.focusLabel}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.focusAreas.map((area) => (
                <span key={area} className="rounded-full border border-rice/10 bg-rice/[0.045] px-4 py-2 text-sm text-rice/70">
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
