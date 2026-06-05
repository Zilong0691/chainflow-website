import { ArrowRight, NotebookText } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";

type OpenNotesProps = {
  lang: Language;
};

export function OpenNotes({ lang }: OpenNotesProps) {
  const copy = siteContent[lang].openNotes;

  return (
    <section className="section-band bg-rice text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="grid gap-8 rounded-2xl border border-ink/10 bg-white/50 p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-jade/20 bg-jade/10 text-jade">
              <NotebookText size={20} />
            </span>
            <div>
              <p className="text-sm font-medium text-jade">{copy.eyebrow}</p>
              <h2 className="mt-1 text-2xl font-semibold text-ink">{copy.title}</h2>
            </div>
          </div>

          <div>
            <p className="text-base leading-8 text-ink/70">{copy.body}</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-ink">
              {copy.cta}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
