import { flowSteps } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function WhyChainFlow() {
  return (
    <section id="vision" className="section-band bg-graphite text-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            eyebrow="Why ChainFlow"
            title="全球供应链正在变得更加复杂。"
            subtitle="企业出海、地缘变化、市场波动、库存压力、供应商风险和信息不对称，都在增加系统中的摩擦。"
            tone="dark"
          />
          <div className="space-y-6 text-lg leading-9 text-rice/70">
            <p>
              ChainFlow 相信：未来最有价值的企业，不是拥有更多信息，而是拥有更好的判断能力、连接能力和行动能力。
            </p>
            <p>
              第一版从可落地的 AI Skill 开始，用真实工具减少重复劳动，让数据和经验逐步沉淀成可以复用的供应链智能。
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid gap-3 md:grid-cols-5">
            {flowSteps.map((step, index) => (
              <div key={step.term} className="flow-step">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-rice/50">0{index + 1}</span>
                  {index < flowSteps.length - 1 ? <span className="hidden h-px flex-1 bg-rice/20 md:ml-4 md:block" /> : null}
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-rice">{step.term}</h3>
                <p className="mt-3 text-sm leading-6 text-rice/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
