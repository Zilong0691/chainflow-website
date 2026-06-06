import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";

type HeroProps = {
  lang: Language;
};

export function Hero({ lang }: HeroProps) {
  const copy = siteContent[lang].hero;
  const zh = lang === "zh";

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
            {zh ? (
              <>
                让供应链，如<span className="flow-word">水一般</span>
              </>
            ) : (
              copy.title
            )}
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-xl leading-8 text-rice/80 md:text-2xl">{copy.subtitle}</p>
          <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-rice/70 md:text-lg">{copy.body}</p>
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
          <GlobeFlowVisual lang={lang} />
        </div>
      </div>
    </section>
  );
}

/* =============================================
   GlobeFlowVisual — 旋转地球 + 供应链流动线
   ============================================= */
function GlobeFlowVisual({ lang }: { lang: Language }) {
  const zh = lang === "zh";

  return (
    <div className="globe-visual" aria-hidden="true">
      {/* 大气光晕 */}
      <div className="globe-atmosphere" />

      {/* 地球 */}
      <div className="globe-sphere">
        {/* 经纬线网格 */}
        <div className="globe-grid" />

        {/* 旋转内容层：大陆 + 路线 + 节点 */}
        <div className="globe-contents">
          {/* 简化大陆轮廓 */}
          <svg className="globe-land" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            {/* 东亚 */}
            <path d="M230,80 Q270,60 310,75 Q350,90 355,130 Q360,170 330,195 Q310,210 280,205 Q255,200 240,175 Q225,150 225,115 Z" />
            {/* 东南亚群岛 */}
            <path d="M300,210 Q320,200 340,215 Q355,235 340,255 Q320,265 305,250 Q295,235 300,210 Z" />
            <path d="M325,255 Q340,250 355,260 Q360,275 350,285 Q335,290 325,275 Z" />
            {/* 南亚次大陆 */}
            <path d="M200,140 Q220,130 235,150 Q250,180 240,210 Q225,230 205,220 Q190,200 190,170 Z" />
            {/* 中东 */}
            <path d="M170,130 Q190,120 200,140 Q195,160 180,165 Q165,160 165,145 Z" />
            {/* 非洲 */}
            <path d="M140,160 Q165,145 175,170 Q185,210 170,250 Q155,280 140,285 Q125,270 120,230 Q115,195 130,170 Z" />
            {/* 欧洲 */}
            <path d="M125,75 Q155,55 185,70 Q200,85 190,105 Q175,115 150,110 Q125,105 115,90 Z" />
            {/* 北美 */}
            <path d="M65,65 Q95,45 120,55 Q140,65 135,90 Q130,115 105,125 Q80,120 65,105 Q50,90 55,72 Z" />
            {/* 南美 */}
            <path d="M80,145 Q100,135 105,155 Q110,180 100,210 Q90,225 78,215 Q68,195 70,168 Z" />
            {/* 澳大利亚 */}
            <path d="M310,285 Q335,275 350,290 Q355,310 340,320 Q320,322 310,308 Q300,295 310,285 Z" />
            {/* 中亚/俄罗斯 */}
            <path d="M120,55 Q180,30 240,55 Q260,68 250,85 Q220,95 170,90 Q130,85 115,70 Z" />
            {/* 日本 */}
            <path d="M355,100 Q365,95 368,110 Q366,128 358,130 Q352,120 355,100 Z" />
          </svg>

          {/* 供应链流动路线 */}
          <svg className="globe-routes" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="flowGradientWarm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d7b15d" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#f2c76a" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#d7b15d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d7b15d" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="flowGradientCool" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#75d4cb" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#75d4cb" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#1f8f84" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#75d4cb" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* 上海 → 新加坡 */}
            <path className="flow-path flow-path--gold" d="M318,95 Q340,150 335,235" strokeDasharray="4 6" />
            {/* 上海 → 迪拜 */}
            <path className="flow-path flow-path--teal" d="M315,100 Q270,120 195,155" strokeDasharray="3 7" />
            {/* 上海 → 鹿特丹 */}
            <path className="flow-path flow-path--warm" d="M312,105 Q240,70 155,95" strokeDasharray="5 8" />
            {/* 新加坡 → 开普敦 */}
            <path className="flow-path flow-path--cool" d="M330,240 Q290,270 148,275" strokeDasharray="3 6" />
            {/* 迪拜 → 内罗毕 */}
            <path className="flow-path flow-path--gold" d="M190,158 Q180,200 155,250" strokeDasharray="4 5" />
            {/* 鹿特丹 → 纽约 */}
            <path className="flow-path flow-path--teal" d="M148,92 Q100,80 78,80" strokeDasharray="3 6" />
            {/* 新加坡 → 悉尼 */}
            <path className="flow-path flow-path--warm" d="M332,232 Q345,260 345,300" strokeDasharray="3 7" />
            {/* 上海 → 东京 */}
            <path className="flow-path flow-path--cool" d="M322,90 Q340,88 358,108" strokeDasharray="2 5" />
            {/* 上海 → 洛杉矶 */}
            <path className="flow-path flow-path--gold" d="M308,108 Q250,60 85,58" strokeDasharray="5 10" />
          </svg>

          {/* 节点光点 */}
          <div className="globe-node globe-node--major" style={{ left: "79%", top: "24%" }} />   {/* 上海 */}
          <div className="globe-node" style={{ left: "82.5%", top: "59%" }} />                    {/* 新加坡 */}
          <div className="globe-node globe-node--teal" style={{ left: "47.5%", top: "39%" }} />    {/* 迪拜 */}
          <div className="globe-node" style={{ left: "37%", top: "23.5%" }} />                    {/* 鹿特丹 */}
          <div className="globe-node globe-node--teal" style={{ left: "37%", top: "70%" }} />      {/* 开普敦 */}
          <div className="globe-node" style={{ left: "19%", top: "19.5%" }} />                    {/* 纽约 */}
          <div className="globe-node globe-node--teal" style={{ left: "86.5%", top: "76%" }} />    {/* 悉尼 */}
          <div className="globe-node" style={{ left: "89.5%", top: "28%" }} />                    {/* 东京 */}
          <div className="globe-node globe-node--teal" style={{ left: "21%", top: "14%" }} />      {/* 洛杉矶 */}
          <div className="globe-node" style={{ left: "34%", top: "68%" }} />                      {/* 内罗毕 */}
        </div>
      </div>

      {/* 底部结果面板 */}
      <div className="globe-panel">
        <div className="globe-panel__text">
          <p>{zh ? "ChainFlow 正在处理" : "ChainFlow Processing"}</p>
          <strong>{zh ? "订单表 → 路线 / 仓网 / 报告" : "Orders → Routes / Network / Report"}</strong>
        </div>
        <div className="globe-panel__metrics">
          <span>{zh ? "路线" : "Routes"}&nbsp;29</span>
          <span>{zh ? "车辆" : "Vehicles"}&nbsp;27</span>
          <span>{zh ? "覆盖" : "Cover"}&nbsp;94%</span>
        </div>
      </div>
    </div>
  );
}
