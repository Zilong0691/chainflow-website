import { ArrowLeft, ArrowRight, CheckCircle2, FileSpreadsheet, Route, Wrench } from "lucide-react";
import { demoPages, type ToolSlug } from "@/lib/content";

type ToolDemoPageProps = {
  slug: ToolSlug;
};

export function ToolDemoPage({ slug }: ToolDemoPageProps) {
  const demo = demoPages[slug];
  const liveDemo = liveDemos[slug];

  return (
    <main className="min-h-screen bg-graphite text-rice">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_32%,rgba(215,177,93,0.18)_0%,rgba(31,143,132,0.08)_32%,rgba(8,11,9,0.96)_70%)]" />
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <a href="/#skills" className="inline-flex items-center gap-2 text-sm text-rice/70 transition hover:text-gold">
            <ArrowLeft size={16} />
            返回 ChainFlow
          </a>

          <div className="grid gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-medium text-gold">{demo.name} 演示</p>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-tight md:text-7xl">{demo.title}</h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-rice/70">{demo.subtitle}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-rice/60">{liveDemo.promise}</p>
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
              <div className="grid gap-4">
                <div className="rounded-xl border border-gold/20 bg-gold/10 p-4">
                  <p className="text-sm font-semibold text-gold">{liveDemo.contextTitle}</p>
                  <p className="mt-2 text-sm leading-7 text-rice/70">{liveDemo.context}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {liveDemo.highlights.map((item) => (
                    <div key={item.label} className="rounded-xl border border-rice/10 bg-graphite/50 p-4">
                      <p className="text-xs text-rice/50">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-rice">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-rice/10 bg-[#0b100d] text-rice">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-gold">可交互 Demo</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{liveDemo.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-rice/70">{liveDemo.description}</p>
            </div>
            <a href={liveDemo.src} target="_blank" rel="noreferrer" className="btn-outline shrink-0">
              打开全屏 Demo
              <ArrowRight size={16} />
            </a>
          </div>

          {/* 三步引导 */}
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <div className="flex gap-3 rounded-xl border border-rice/10 bg-rice/[0.03] p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-sm font-bold text-gold">1</span>
              <div>
                <p className="text-sm font-semibold text-rice">先看</p>
                <p className="mt-1 text-xs leading-5 text-rice/55">浏览地图、路线、结果表和指标，理解这个工具能输出什么。</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-rice/10 bg-rice/[0.03] p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-sm font-bold text-gold">2</span>
              <div>
                <p className="text-sm font-semibold text-rice">再试</p>
                <p className="mt-1 text-xs leading-5 text-rice/55">拖拽地图、切换参数、点选路线，看不同选择怎么影响结果。</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-rice/10 bg-rice/[0.03] p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-sm font-bold text-gold">3</span>
              <div>
                <p className="text-sm font-semibold text-rice">想用</p>
                <p className="mt-1 text-xs leading-5 text-rice/55">觉得有用？联系我，用你的数据和字段做定制部署。</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-rice/10 bg-rice/[0.04] shadow-soft">
            <div className="flex flex-col gap-2 border-b border-rice/10 bg-graphite/80 px-4 py-3 text-xs text-rice/55 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-rice/70">{liveDemo.browserLabel}</span>
              <span>脱敏示例数据 · 页面内交互体验 · 不上传真实业务资料</span>
            </div>
            <iframe
              src={liveDemo.src}
              title={`${demo.name} interactive demo`}
              className="h-[78vh] min-h-[640px] w-full bg-white"
              sandbox="allow-scripts allow-same-origin allow-popups"
              loading="lazy"
            />
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

const liveDemos: Record<
  ToolSlug,
  {
    src: string;
    promise: string;
    contextTitle: string;
    context: string;
    highlights: { label: string; value: string }[];
    title: string;
    description: string;
    browserLabel: string;
  }
> = {
  routeflow: {
    src: "/demos/routeflow/",
    promise: "不用上传文件也能先体验：下面展示脱敏调度工作台，用户可以直接查看地图、车辆路线、司机任务表、作业甘特图、异常处置建议和结果面板。",
    contextTitle: "脱敏业务场景",
    context:
      "一个本地配送团队拿到 801 个订单、多个车型和凌晨配送窗口，需要快速判断怎么排车、怎么排序、哪里可能超容或超时，以及哪些路线需要人工复核。",
    highlights: [
      { label: "输入", value: "801 单 / 车型 / 时窗" },
      { label: "过程", value: "VRP 排线与异常判断" },
      { label: "输出", value: "司机表 / 地图 / 甘特图" }
    ],
    title: "像使用一个真实调度工作台一样体验 RouteFlow",
    description:
      "这不是截图。你可以在嵌入页面里拖动地图、筛选车型和路线、查看司机任务表、调整作业参数，并阅读异常处置建议，理解一张杂乱订单表如何变成可执行排线初稿。",
    browserLabel: "RouteFlow 脱敏调度工作台"
  },
  networkflow: {
    src: "/demos/networkflow/",
    promise: "不用先理解模型，也能先体验：下面保留原版选址评估网页，用户可以直接查看候选仓、服务范围、成本拆解和方案对比。",
    contextTitle: "模拟业务场景",
    context:
      "一个区域经营团队想扩展仓网，但需求城市、候选点、成本和服务半径都不够精确，需要先做一版可讨论的布局判断。",
    highlights: [
      { label: "输入", value: "需求城市 / 候选仓" },
      { label: "过程", value: "成本与覆盖评估" },
      { label: "输出", value: "仓网方案对比" }
    ],
    title: "像使用一个真实选址工具一样体验 NetworkFlow",
    description:
      "这不是静态展示。你可以在嵌入页面里查看地图、切换参数和阅读结果表，理解一组粗糙业务数据如何变成仓网评估方案。",
    browserLabel: "NetworkFlow 原版演示网页"
  }
};

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
