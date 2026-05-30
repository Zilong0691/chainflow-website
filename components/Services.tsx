import { ArrowRight, Check } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type ServicesProps = {
  lang: Language;
};

export function Services({ lang }: ServicesProps) {
  const copy = siteContent[lang];

  return (
    <section id="pricing" className="section-band bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.pricingHeader.eyebrow}
          title={copy.pricingHeader.title}
          subtitle={copy.pricingHeader.subtitle}
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {copy.pricingCards.map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-line bg-rice p-6 shadow-soft">
              <p className="text-sm font-medium text-jade">{plan.name}</p>
              <p className="mt-4 text-3xl font-semibold text-ink">{plan.price}</p>
              <div className="mt-6 grid gap-3 border-y border-line py-6">
                {plan.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-ink/70">
                    <Check className="mt-0.5 shrink-0 text-jade" size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-jade">
                {plan.cta}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {copy.pricingNotes.map((note) => (
            <span key={note} className="rounded-full border border-line bg-rice px-4 py-2 text-sm text-ink/70">
              {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
