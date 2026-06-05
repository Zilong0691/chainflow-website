import { ArrowLeft, ArrowRight, CheckCircle2, FileSpreadsheet, Route, Wrench } from "lucide-react";
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
          <a href="/#skills" className="inline-flex items-center gap-2 text-sm text-rice/70 transition hover:text-gold">
            <ArrowLeft size={16} />
            返回 ChainFlow
          </a>

          <div className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-medium text-gold">{demo.name} 演示</p>
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

      <section className="border-t border-rice/10 bg-graphite text-rice">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="rounded-2xl border border-gold/30 bg-gold/10 p-6 md:p-8">
              <p className="text-sm font-medium text-gold">{demo.storyTitle}</p>
              <p className="mt-4 text-xl leading-9 text-rice/82">{demo.story}</p>
            </article>

            <div className="grid gap-5 md:grid-cols-2">
              <DemoPanel title={demo.painTitle} items={demo.pains} icon="route" />
              <DemoPanel title={demo.dataTitle} items={demo.inputs} icon="sheet" />
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <DemoPanel title={demo.processTitle} items={demo.process} icon="tool" />
            <DemoPanel title={demo.outputTitle} items={demo.outputs} featured icon="route" />
          </div>

          <div className="mt-6">
            <DemoPanel title={demo.reportTitle} items={demo.report} icon="sheet" compact />
          </div>
        </div>
      </section>

      <section className="bg-graphite text-rice">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="rounded-2xl border border-rice/10 bg-rice/[0.045] p-6 md:p-8">
            <p className="text-sm font-medium text-gold">交付说明</p>
            <p className="mt-3 max-w-4xl text-base leading-8 text-rice/70">
              当前页面展示的是工具能力和业务流程。正式使用时可以手把手部署到本地电脑，或按你的表格字段做定制适配；网站端不要求你上传真实业务数据，也不公开源码、API Key 或不该公开的原始材料。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function DemoPanel({
  title,
  items,
  featured = false,
  compact = false,
  icon = "route"
}: {
  title: string;
  items: readonly string[];
  featured?: boolean;
  compact?: boolean;
  icon?: "route" | "sheet" | "tool";
}) {
  const Icon = icon === "sheet" ? FileSpreadsheet : icon === "tool" ? Wrench : Route;

  return (
    <article className={`rounded-2xl border p-6 ${featured ? "border-gold/35 bg-gold/10" : "border-rice/10 bg-rice/[0.045]"}`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
          <Icon size={18} />
        </span>
        <h2 className="text-xl font-semibold text-rice">{title}</h2>
      </div>
      <div className={`mt-6 grid gap-3 ${compact ? "md:grid-cols-3" : ""}`}>
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-7 text-rice/70">
            <CheckCircle2 className="mt-1 shrink-0 text-gold" size={16} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
