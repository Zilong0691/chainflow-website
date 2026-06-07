import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";

type CommunityPilotProps = { lang: Language };

export function CommunityPilot({ lang }: CommunityPilotProps) {
  const copy = siteContent[lang].community;
  const contactCopy = siteContent[lang].contact;
  const emailHref = contactCopy.links.find((link) => link.href.startsWith("mailto:"))?.href ?? "#contact";
  const zh = lang === "zh";

  return (
    <section id="community" className="section-band bg-graphite text-rice border-t border-rice/10">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-medium text-gold">{copy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-rice/65 md:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Panel title={copy.fitTitle} items={copy.fit} tone="gold" />
          <Panel title={copy.includesTitle} items={copy.includes} tone="teal" />
          <Panel title={copy.excludesTitle} items={copy.excludes} tone="quiet" />
        </div>

        <p className="mt-6 text-sm leading-7 text-rice/40">{copy.note}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={emailHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-graphite transition hover:-translate-y-0.5 hover:bg-ember hover:shadow-soft">
            <Mail size={16} />
            {zh ? "申请免费试点" : "Apply for Free Pilot"}
          </a>
          <a href={emailHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-rice/20 bg-rice/10 px-6 py-3 text-sm font-semibold text-rice transition hover:-translate-y-0.5 hover:border-rice/30 hover:bg-rice/20">
            {zh ? "开始付费试点" : "Start a Paid Pilot"}
            <ArrowRight size={16} />
          </a>
        </div>

        <div id="contact" className="mt-14 scroll-mt-24 border-t border-rice/10 pt-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-xl font-semibold leading-tight text-rice md:text-3xl">{contactCopy.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-rice/50">{contactCopy.body}</p>
            </div>
            <div className="rounded-xl border border-rice/10 bg-rice/[0.04] p-4">
              <div className="grid gap-px overflow-hidden rounded-lg border border-rice/10 bg-rice/5">
                {contactCopy.links.map((link) => (
                  <a key={link.label} href={link.href} className="flex items-center justify-between gap-5 bg-graphite px-4 py-3 transition hover:bg-rice/[0.05]">
                    <span className="text-xs text-rice/40">{link.label}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-rice/70">{link.value}<ArrowRight size={12} /></span>
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

function Panel({ title, items, tone }: { title: string; items: readonly string[]; tone: "gold" | "teal" | "quiet" }) {
  const iconColor = tone === "gold" ? "text-gold" : tone === "teal" ? "text-[#75d4cb]" : "text-rice/30";
  const borderColor = tone === "gold" ? "border-gold/20" : tone === "teal" ? "border-[#75d4cb]/15" : "border-rice/10";
  const bgColor = tone === "gold" ? "bg-gold/5" : tone === "teal" ? "bg-[#75d4cb]/5" : "bg-rice/[0.03]";
  return (
    <article className={`rounded-2xl border p-5 ${borderColor} ${bgColor}`}>
      <div className="flex items-center gap-2">
        <ShieldCheck className={iconColor} size={16} />
        <h3 className="text-sm font-semibold text-rice">{title}</h3>
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5 text-sm leading-6 text-rice/55">
            <CheckCircle2 className={`mt-0.5 shrink-0 ${iconColor}`} size={13} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
