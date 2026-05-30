import { ArrowRight } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type BeyondScriptsProps = {
  lang: Language;
};

export function BeyondScripts({ lang }: BeyondScriptsProps) {
  const copy = siteContent[lang].beyond;

  return (
    <section className="section-band bg-graphite text-rice">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
        <div>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} tone="dark" />
          <a href="#contact" className="btn-ghost mt-9">
            {copy.cta}
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-rice/10 bg-rice/10">
          {copy.items.map((item, index) => (
            <div key={item} className="grid grid-cols-[3.5rem_1fr] items-center bg-graphite px-5 py-5">
              <span className="text-sm text-rice/40">0{index + 1}</span>
              <p className="text-base leading-7 text-rice/75">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
