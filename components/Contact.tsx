import { ArrowRight, Mail } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";

type ContactProps = {
  lang: Language;
};

export function Contact({ lang }: ContactProps) {
  const copy = siteContent[lang].contact;
  const emailHref = copy.links.find((link) => link.href.startsWith("mailto:"))?.href ?? "#contact";

  return (
    <section id="contact" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-[#75d4cb]">{copy.eyebrow}</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight md:text-6xl">{copy.title}</h2>
            <p className="mt-6 text-2xl leading-tight text-rice/80">{copy.subtitle}</p>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-rice/70">{copy.body}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-rice/60">{copy.pilot}</p>
            <div className="mt-8 grid max-w-3xl gap-3 md:grid-cols-3">
              {copy.paths.map((path) => (
                <div key={path.title} className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-4">
                  <p className="text-sm font-semibold text-gold">{path.title}</p>
                  <p className="mt-2 text-xs leading-6 text-rice/58">{path.description}</p>
                </div>
              ))}
            </div>
            <a href={emailHref} className="btn-primary mt-10">
              <Mail size={18} />
              {copy.cta}
            </a>
          </div>

          <div className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-6 backdrop-blur md:p-8">
            <div className="grid gap-px overflow-hidden rounded-xl border border-rice/10 bg-rice/10">
              {copy.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between gap-5 bg-graphite px-5 py-4 transition hover:bg-rice/[0.05]"
                >
                  <span className="text-sm text-rice/50">{link.label}</span>
                  <span className="flex items-center gap-2 text-sm font-medium text-rice/80">
                    {link.value}
                    <ArrowRight size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
