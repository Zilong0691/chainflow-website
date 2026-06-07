import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type CommunityPilotProps = { lang: Language };

export function CommunityPilot({ lang }: CommunityPilotProps) {
  const copy = siteContent[lang].community;
  const contactCopy = siteContent[lang].contact;
  const emailHref = contactCopy.links.find((link) => link.href.startsWith("mailto:"))?.href ?? "#contact";
  const zh = lang === "zh";

  return (
    <section id="community" className="section-band bg-rice text-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-medium text-jade">{copy.eyebrow}</p>
          <h2 className="mt-4 whitespace-nowrap text-3xl font-semibold leading-tight md:text-5xl">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-ink/70 md:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <PilotPanel title={copy.fitTitle} items={copy.fit} tone="jade" />
          <PilotPanel title={copy.includesTitle} items={copy.includes} tone="gold" />
          <PilotPanel title={copy.excludesTitle} items={copy.excludes} tone="quiet" />
        </div>

        <p className="mt-6 text-sm leading-7 text-ink/50">{copy.note}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={emailHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-graphite transition hover:-translate-y-0.5 hover:bg-ember hover:shadow-soft">
            <Mail size={16} />
            {zh ? "申请免费试点" : "Apply for Free Pilot"}
          </a>
          <a href={emailHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-semibold text-ink/80 transition hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold">
            {zh ? "开始付费试点" : "Start a Paid Pilot"}
            <ArrowRight size={16} />
          </a>
        </div>

        <div id="contact" className="mt-14 scroll-mt-24 border-t border-ink/10 pt-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-xl font-semibold leading-tight md:text-3xl">{contactCopy.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-ink/60">{contactCopy.body}</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-white/55 p-4">
              <div className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/5">
                {contactCopy.links.map((link) => (
                  <a key={link.label} href={link.href} className="flex items-center justify-between gap-5 bg-white/80 px-4 py-3 transition hover:bg-jade/5">
                    <span className="text-xs text-ink/50">{link.label}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-ink/80">{link.value}<ArrowRight size={12} /></span>
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
  const iconColor = tone === "jade" ? "text-jade" : tone === "gold" ? "text-gold" : "text-ink/35";
  const bgColor = tone === "jade" ? "border-jade/15 bg-jade/5" : tone === "gold" ? "border-gold/20 bg-gold/5" : "border-ink/8 bg-white/50";
  return (
    <article className={`rounded-2xl border p-5 ${bgColor}`}>
      <div className="flex items-center gap-2">
        <ShieldCheck className={iconColor} size={16} />
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5 text-sm leading-6 text-ink/65">
            <CheckCircle2 className={`mt-0.5 shrink-0 ${iconColor}`} size={13} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
