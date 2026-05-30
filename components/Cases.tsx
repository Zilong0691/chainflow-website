import { ArrowUpRight } from "lucide-react";
import { cases } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Cases() {
  return (
    <section id="cases" className="section-band bg-ink text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="Case Library"
          title="Real problems. Practical tools. Reusable methods."
          subtitle="From classroom prototypes to practical supply chain workflows."
          tone="dark"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rice/10 bg-rice/10 md:grid-cols-2">
          {cases.map((item) => (
            <article key={item.title} className="bg-ink p-6 transition hover:bg-rice/[0.045] md:p-8">
              <div className="mb-7 flex items-start justify-between gap-4">
                <span className="text-sm text-rice/50">{item.number}</span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    item.status === "Prototype Ready" ? "bg-jade/20 text-[#75d4cb]" : "bg-clay/20 text-[#e1ab86]"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="max-w-xl text-2xl font-semibold leading-tight text-rice">{item.title}</h3>

              <div className="mt-7 grid gap-5">
                <CaseLine label="Problem" value={item.problem} />
                <CaseLine label="Method" value={item.method} />
                <CaseLine label="Output" value={item.output} />
              </div>

              <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-rice/75 hover:text-rice">
                {item.cta}
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5 border-t border-rice/10 pt-4">
      <p className="text-sm text-rice/40">{label}</p>
      <p className="text-base leading-7 text-rice/70">{value}</p>
    </div>
  );
}
