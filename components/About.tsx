import { focusAreas } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="section-band bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
        <div>
          <SectionHeader eyebrow="About the Builder" title="赵子龙 / 走了尤" subtitle="Supply Chain × AI Builder" />
          <div className="mt-10 rounded-2xl border border-line bg-rice p-7 shadow-soft">
            <p className="text-lg leading-9 text-ink/70">“走了尤”来自对“赵子龙”的变体、减法与抽象。</p>
            <div className="mt-7 grid gap-3 text-2xl font-semibold leading-tight text-ink md:text-3xl">
              <p>去掉冗余。</p>
              <p>保留本质。</p>
              <p>让复杂系统更轻、更顺、更有流动性。</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="space-y-6 text-lg leading-9 text-ink/70">
            <p>
              ChainFlow 是一次长期探索：从实用工具开始，逐步走向决策智能、风险感知和全球连接。
            </p>
            <p>
              它不是一套宏大的空中系统，而是先进入真实流程，理解重复劳动、信息断点、库存压力和供应商协同中的小摩擦。
            </p>
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium text-ink/50">I focus on</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span key={area} className="rounded-full border border-line bg-rice px-4 py-2 text-sm text-ink/70">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
