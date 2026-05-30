import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { demoPages, type ToolSlug } from "@/lib/content";

type ToolDemoPageProps = {
  slug: ToolSlug;
};

export function ToolDemoPage({ slug }: ToolDemoPageProps) {
  const demo = demoPages[slug];

  return (
    <main className="min-h-screen bg-graphite text-rice">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_32%,rgba(215,177,93,0.18)_0%,rgba(31,143,132,0.08)_32%,rgba(8,11,9,0.96)_70%)]" />
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <a href="/#demo" className="inline-flex items-center gap-2 text-sm text-rice/70 transition hover:text-gold">
            <ArrowLeft size={16} />
            Back to ChainFlow
          </a>

          <div className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-medium text-gold">{demo.name} Demo</p>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-tight md:text-7xl">{demo.title}</h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-rice/70">{demo.subtitle}</p>
              <p className="mt-5 text-base font-medium text-rice/60">{demo.price}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="/#contact" className="btn-primary">
                  {demo.primaryCta}
                  <ArrowRight size={18} />
                </a>
                <a href="/#contact" className="btn-ghost">
                  {demo.secondaryCta}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-5 shadow-soft backdrop-blur">
              <div className="demo-map">
                <span className="demo-map__node left-[18%] top-[32%]" />
                <span className="demo-map__node left-[38%] top-[20%]" />
                <span className="demo-map__node left-[62%] top-[36%]" />
                <span className="demo-map__node left-[76%] top-[62%]" />
                <span className="demo-map__node left-[48%] top-[74%]" />
                <span className="demo-map__node left-[24%] top-[58%]" />
                <span className="demo-map__path demo-map__path--one" />
                <span className="demo-map__path demo-map__path--two" />
                <span className="demo-map__path demo-map__path--three" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rice/10 bg-rice text-ink">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 lg:grid-cols-3 lg:px-8 lg:py-24">
          <DemoPanel title={demo.inputTitle} items={demo.inputs} />
          <DemoPanel title={demo.outputTitle} items={demo.outputs} featured />
          <DemoPanel title={demo.reportTitle} items={demo.report} />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="rounded-2xl border border-line bg-rice p-6 md:p-8">
            <p className="text-sm font-medium text-jade">Safety note</p>
            <p className="mt-3 max-w-4xl text-base leading-8 text-ink/70">
              当前 Demo 使用脱敏 mock data，仅展示输入结构、输出形式、地图预览和报告结构。不公开课程题目、原始 Excel、API Key、完整源码或任何真实企业 / 个人敏感数据。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function DemoPanel({ title, items, featured = false }: { title: string; items: readonly string[]; featured?: boolean }) {
  return (
    <article className={`rounded-2xl border p-6 shadow-soft ${featured ? "border-gold/35 bg-gold/10" : "border-line bg-paper"}`}>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-7 text-ink/70">
            <CheckCircle2 className="mt-1 shrink-0 text-jade" size={16} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
