import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";

type HeroProps = {
  lang: Language;
};

export function Hero({ lang }: HeroProps) {
  const copy = siteContent[lang].hero;

  return (
    <section id="top" className="relative isolate overflow-hidden bg-graphite text-rice">
      <img
        src="/chainflow-hero-flow.png"
        alt=""
        className="hero-asset pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(215,177,93,0.24)_0%,rgba(31,143,132,0.10)_28%,rgba(8,11,9,0.72)_58%,rgba(8,11,9,0.98)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,9,0.98)_0%,rgba(8,11,9,0.9)_42%,rgba(8,11,9,0.48)_74%,rgba(8,11,9,0.86)_100%)]" />

      <div className="mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.92fr_0.9fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="mb-7 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm text-gold backdrop-blur">
            {copy.eyebrow}
          </p>
          <p className="mb-4 text-xl font-medium text-rice/80 md:text-2xl">{copy.brand}</p>
          <h1 className="text-balance text-[clamp(1.78rem,7.2vw,4.5rem)] font-semibold leading-[1.12] text-rice md:text-7xl md:leading-[1.08]">
            {lang === "zh" ? (
              <>
                让供应链，如<span className="flow-word">水一般</span>
              </>
            ) : (
              copy.title
            )}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-rice/80 md:text-2xl">{copy.subtitle}</p>
          <p className="mt-7 max-w-3xl text-base leading-8 text-rice/70 md:text-lg">{copy.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#skills" className="btn-primary">
              {copy.primaryCta}
              <ArrowRight size={18} />
            </a>
            <a href="#skills" className="btn-ghost">
              <Sparkles size={18} />
              {copy.secondaryCta}
            </a>
            <a href="#contact" className="btn-ghost">
              <CalendarDays size={18} />
              {copy.tertiaryCta}
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[18rem] items-center justify-center sm:min-h-[24rem] lg:min-h-[34rem]">
          <SupplyChainFlowVisual lang={lang} />
        </div>
      </div>
    </section>
  );
}

function SupplyChainFlowVisual({ lang }: { lang: Language }) {
  const zh = lang === "zh";
  const flows = [
    { label: zh ? "采购" : "Buy", className: "flow-dashboard__node--supplier" },
    { label: zh ? "库存" : "Stock", className: "flow-dashboard__node--stock" },
    { label: zh ? "配送" : "Delivery", className: "flow-dashboard__node--route" },
    { label: zh ? "仓网" : "Network", className: "flow-dashboard__node--network" }
  ];

  return (
    <div className="flow-dashboard" aria-hidden="true">
      {/* Stage labels */}
      <span className="flow-dashboard__stage flow-dashboard__stage--input">
        {zh ? "数据输入" : "Input"}
      </span>
      <span className="flow-dashboard__stage flow-dashboard__stage--ai">
        {zh ? "AI 判断" : "AI"}
      </span>
      <span className="flow-dashboard__stage flow-dashboard__stage--output">
        {zh ? "执行输出" : "Output"}
      </span>

      <div className="flow-dashboard__map">
        <div className="flow-dashboard__terrain" />
        <div className="flow-dashboard__river flow-dashboard__river--one" />
        <div className="flow-dashboard__river flow-dashboard__river--two" />
        <div className="flow-dashboard__river flow-dashboard__river--three" />
        <div className="flow-dashboard__route flow-dashboard__route--one" />
        <div className="flow-dashboard__route flow-dashboard__route--two" />
        <div className="flow-dashboard__route flow-dashboard__route--three" />
        {/* Flow particles along routes */}
        <div className="flow-dashboard__particle flow-dashboard__particle--one" />
        <div className="flow-dashboard__particle flow-dashboard__particle--two" />
        <div className="flow-dashboard__particle flow-dashboard__particle--three" />
        {flows.map((flow) => (
          <div key={flow.label} className={`flow-dashboard__node ${flow.className}`}>
            <span>{flow.label}</span>
          </div>
        ))}
        <div className="flow-dashboard__hub">
          <strong>AI</strong>
          <span>{zh ? "判断" : "Engine"}</span>
        </div>
      </div>

      <div className="flow-dashboard__panel">
        <div>
          <p>{zh ? "ChainFlow 正在处理" : "ChainFlow Processing"}</p>
          <strong>{zh ? "订单表 → 路线 / 仓网 / 报告" : "Orders → Routes / Network / Report"}</strong>
        </div>
        <div className="flow-dashboard__result-mini">
          <span>{zh ? "路线" : "Routes"}&nbsp;29</span>
          <span>{zh ? "车辆" : "Vehicles"}&nbsp;27</span>
          <span>{zh ? "覆盖" : "Cover"}&nbsp;94%</span>
        </div>
      </div>
    </div>
  );
}
