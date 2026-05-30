import { ArrowRight, Mail } from "lucide-react";
import { contactLinks } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-[#75d4cb]">Contact</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Let&apos;s make supply chains flow better.
            </h2>
            <p className="mt-6 text-2xl leading-tight text-rice/80">让供应链，如水流动。</p>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-rice/70">
              如果你正在探索供应链 AI、企业出海、物流优化、库存预测、采购流程自动化，欢迎交流。
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-rice/60">
              Looking for the first pilot users and real supply chain problems to build with.
              <br />
              正在寻找第一批真实供应链场景与试点用户。
            </p>
            <a href="mailto:your-email@example.com" className="btn-primary mt-10">
              <Mail size={18} />
              Book a Conversation
            </a>
          </div>

          <div className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-6 backdrop-blur md:p-8">
            <div className="grid gap-px overflow-hidden rounded-xl border border-rice/10 bg-rice/10">
              {contactLinks.map((link) => (
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
