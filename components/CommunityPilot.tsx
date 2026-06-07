import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type CommunityPilotProps = { lang: Language };

export function CommunityPilot({ lang }: CommunityPilotProps) {
  const copy = siteContent[lang].community;
  const contactCopy = siteContent[lang].contact;
  const emailHref = contactCopy.links.find((link) => link.href.startsWith("mailto:"))?.href ?? "#contact";

  return (
    <section id="community" className="section-band bg-rice text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-ink/70 md:text-lg">{copy.body}</p>
            <p className="mt-8 rounded-2xl border border-jade/15 bg-jade/10 p-5 text-pretty text-sm leading-7 text-ink/68">{copy.note}</p>
          </div>

          <div className="grid gap-5">
            <PilotPanel title={copy.fitTitle} items={copy.fit} tone="jade" />
            <div className="grid gap-5 md:grid-cols-2">
              <PilotPanel title={copy.includesTitle} items={copy.includes} tone="gold" />
              <PilotPanel title={copy.excludesTitle} items={copy.excludes} tone="quiet" />
            </div>
          </div>
        </div>

        <div id="contact" className="mt-14 scroll-mt-24 border-t border-ink/10 pt-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold leading-tight md:text-4xl">{contactCopy.title}</h2>
              <p className="mt-4 max-w-xl text-pretty text-base leading-8 text-ink/70">{contactCopy.body}</p>
              <a href={emailHref} className="btn-primary mt-6">
                <Mail size={18} />
                {contactCopy.cta}
              </a>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/55 p-5">
              <div className="grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/5">
                {contactCopy.links.map((link) => (
                  <a key={link.label} href={link.href} className="flex items-center justify-between gap-5 bg-white/80 px-5 py-4 transition hover:bg-jade/5">
                    <span className="text-sm text-ink/50">{link.label}</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-ink/80">{link.value}<ArrowRight size={15} /></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PilotPanel({ title, items, tone }: { title: string; items: readonly string[]; tone: "jade" | "gold" | "quiet" }) {
  const iconColor = tone === "jade" ? "text-jade" : tone === "gold" ? "text-gold" : "text-ink/45";
  return (
    <article className="rounded-2xl border border-ink/10 bg-white/55 p-5 md:p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className={iconColor} size={18} />
        <h3 className="text-base font-semibold text-ink">{title}</h3>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-ink/68">
            <CheckCircle2 className={`mt-0.5 shrink-0 ${iconColor}`} size={15} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
