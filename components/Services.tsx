import { ArrowRight, Check } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type ServicesProps = {
  lang: Language;
};

export function Services({ lang }: ServicesProps) {
  const copy = siteContent[lang];

  return (
    <section id="pricing" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={copy.pricingHeader.eyebrow}
          title={copy.pricingHeader.title}
          subtitle={copy.pricingHeader.subtitle}
          align="left"
          tone="dark"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {copy.pricingCards.map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-6">
              <p className="text-sm font-medium text-gold">{plan.name}</p>
              <p className="mt-4 text-3xl font-semibold text-rice">{plan.price}</p>
              <div className="mt-6 grid gap-3 border-y border-rice/10 py-6">
                {plan.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-rice/70">
                    <Check className="mt-0.5 shrink-0 text-gold" size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rice/80 hover:text-gold">
                {plan.cta}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

        {copy.pricingNotes.length > 0 ? (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {copy.pricingNotes.map((note) => (
              <span key={note} className="rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm text-gold">
                {note}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
