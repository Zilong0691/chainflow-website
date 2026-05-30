import { ArrowRight, Check } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type ServicesProps = {
  lang: Language;
};

export function Services({ lang }: ServicesProps) {
  const copy = siteContent[lang];

  return (
    <section id="services" className="section-band bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={copy.servicesHeader.eyebrow}
            title={copy.servicesHeader.title}
            subtitle={copy.servicesHeader.subtitle}
          />
          <a href="#contact" className="btn-outline w-fit">
            {copy.servicesCta}
          </a>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {copy.services.map((service, index) => (
            <article key={service.name} className="relative rounded-2xl border border-line bg-rice p-6 shadow-soft">
              <div className="mb-7 flex items-center justify-between">
                <span className="text-sm text-ink/50">0{index + 1}</span>
                <span className="h-px w-12 bg-line" />
              </div>
              <p className="text-sm font-medium text-jade">{service.name}</p>
              <h3 className="mt-3 min-h-16 text-2xl font-semibold leading-tight text-ink">{service.title}</h3>
              <p className="mt-5 text-sm leading-7 text-ink/60">{service.fit}</p>

              <div className="mt-6 grid gap-3 border-y border-line py-6">
                {service.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-ink/70">
                    <Check className="mt-0.5 shrink-0 text-jade" size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 min-h-14 text-sm leading-7 text-ink/60">{service.description}</p>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-jade">
                {service.cta}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
