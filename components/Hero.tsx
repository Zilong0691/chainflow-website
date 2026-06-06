import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath, type GeoProjection } from "d3-geo";
import worldTopo from "world-atlas/countries-110m.json";

type HeroProps = {
  lang: Language;
};

/* 用真实地理数据生成 SVG 路径 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const topoAny = worldTopo as any;
const landData = feature(topoAny, topoAny.objects.land);
const proj: GeoProjection = geoEquirectangular().fitSize([800, 400], landData);
const pathGen = geoPath(proj);
const worldPathD: string = pathGen(landData) ?? "";

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
          <h1 className="whitespace-nowrap text-[clamp(1.55rem,5.8vw,4.5rem)] font-semibold leading-[1.12] text-rice md:text-7xl md:leading-[1.08]">
            {zh ? (
              <>
                让供应链，如<span className="flow-word">水</span>一般
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
          <GlobeFlowVisual lang={lang} worldPathD={worldPathD} />
        </div>
      </div>
    </section>
  );
}

/* =============================================
   GlobeFlowVisual — d3-geo 精确世界地图 + 链流
   ============================================= */
function GlobeFlowVisual({ lang, worldPathD }: { lang: Language; worldPathD: string }) {
  const zh = lang === "zh";

  /* 港口坐标 (800×400 equirectangular) */
  const P = {
    shanghai:   { x: 652, y: 134 },
    shenzhen:   { x: 640, y: 152 },
    ningbo:     { x: 658, y: 132 },
    tokyo:      { x: 700, y: 116 },
    busan:      { x: 680, y: 122 },
    singapore:  { x: 620, y: 208 },
    jakarta:    { x: 635, y: 225 },
    bangkok:    { x: 615, y: 195 },
    hongkong:   { x: 644, y: 155 },
    mumbai:     { x: 535, y: 175 },
    dubai:      { x: 498, y: 162 },
    istanbul:   { x: 435, y: 120 },
    rotterdam:  { x: 388, y: 98 },
    hamburg:    { x: 395, y: 92 },
    london:     { x: 368, y: 90 },
    losangeles: { x: 105, y: 122 },
    newyork:    { x: 198, y: 108 },
    miami:      { x: 182, y: 130 },
    capetown:   { x: 422, y: 328 },
    durban:     { x: 438, y: 315 },
    mombasa:    { x: 458, y: 232 },
    lagos:      { x: 385, y: 195 },
    sydney:     { x: 678, y: 302 },
    melbourne:  { x: 672, y: 315 },
    santos:     { x: 258, y: 278 },
    panama:     { x: 192, y: 160 },
    lima:       { x: 185, y: 252 },
    vancouver:  { x: 82, y: 98 },
    seattle:    { x: 92, y: 105 },
  };

  /* 链流：一级(中国出海，粗金) + 二级(全球中转，细弱) */
  const primary = [
    { from: P.shanghai,  to: P.tokyo,      c: 0.10 },
    { from: P.shanghai,  to: P.singapore,  c: 0.12 },
    { from: P.shenzhen,  to: P.jakarta,    c: 0.09 },
    { from: P.shanghai,  to: P.mumbai,     c: -0.10 },
    { from: P.shanghai,  to: P.dubai,      c: -0.14 },
    { from: P.shanghai,  to: P.rotterdam,  c: -0.18 },
    { from: P.shanghai,  to: P.losangeles, c: 0.30 },
    { from: P.shenzhen,  to: P.sydney,     c: 0.08 },
    { from: P.shanghai,  to: P.mombasa,    c: -0.08 },
    { from: P.shanghai,  to: P.capetown,   c: -0.12 },
    { from: P.shanghai,  to: P.santos,     c: -0.22 },
  ];
  const secondary = [
    { from: P.singapore, to: P.dubai,      c: -0.08 },
    { from: P.dubai,     to: P.rotterdam,  c: -0.10 },
    { from: P.singapore, to: P.sydney,     c: 0.06 },
    { from: P.rotterdam, to: P.newyork,    c: -0.14 },
    { from: P.losangeles,to: P.newyork,    c: -0.10 },
    { from: P.dubai,     to: P.capetown,   c: -0.06 },
    { from: P.rotterdam, to: P.lagos,      c: -0.10 },
    { from: P.newyork,   to: P.santos,     c: -0.08 },
  ];

  function cp(a: {x:number,y:number}, b: {x:number,y:number}, crv: number) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return `M${a.x},${a.y} Q${mx - dy * crv},${my + dx * crv} ${b.x},${b.y}`;
  }

  return (
    <div className="globe-visual" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div className="globe-grid" />
        <div className="globe-contents">
          <svg className="globe-map" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            {/* 真实地理数据大陆轮廓 */}
            <path
              d={worldPathD}
              fill="rgba(215,177,93,0.22)"
              stroke="rgba(215,177,93,0.30)"
              strokeWidth="0.6"
            />

            {/* 链流网络 */}
            <g fill="none" strokeLinecap="round">
              {/* 一级链路 — 中国出海，粗金线 */}
              {primary.map((r, i) => (
                <path
                  key={"p"+i}
                  className="flow-path flow-path--primary"
                  d={cp(r.from, r.to, r.c)}
                  strokeDasharray="6 4"
                />
              ))}
              {/* 二级链路 — 全球中转，细弱线 */}
              {secondary.map((r, i) => (
                <path
                  key={"s"+i}
                  className="flow-path flow-path--secondary"
                  d={cp(r.from, r.to, r.c)}
                  strokeDasharray="3 8"
                />
              ))}
            </g>

            {/* 港口标签 */}
            <g fill="rgba(255,250,240,0.42)" fontSize="5" fontFamily="system-ui,sans-serif" textAnchor="middle">
              <text x={652} y={126} fontWeight="bold" fill="rgba(242,199,106,0.72)">{zh ? "上海" : "Shanghai"}</text>
              <text x={700} y={109}>{zh ? "东京" : "Tokyo"}</text>
              <text x={620} y={220}>{zh ? "新加坡" : "Singapore"}</text>
              <text x={535} y={168}>{zh ? "孟买" : "Mumbai"}</text>
              <text x={498} y={155}>{zh ? "迪拜" : "Dubai"}</text>
              <text x={388} y={90}>{zh ? "鹿特丹" : "Rotterdam"}</text>
              <text x={105} y={115}>{zh ? "洛杉矶" : "LA"}</text>
              <text x={198} y={101}>{zh ? "纽约" : "NY"}</text>
              <text x={422} y={342}>{zh ? "开普敦" : "Cape Town"}</text>
              <text x={678} y={316}>{zh ? "悉尼" : "Sydney"}</text>
              <text x={258} y={292}>{zh ? "桑托斯" : "Santos"}</text>
            </g>
          </svg>

          {/* 关键港口光点 */}
          <div className="globe-node globe-node--major" style={{ left:"81.5%", top:"33.5%" }} />
          <div className="globe-node globe-node--major" style={{ left:"80.0%", top:"38.0%" }} />
          <div className="globe-node" style={{ left:"87.5%", top:"29.0%" }} />
          <div className="globe-node" style={{ left:"77.5%", top:"52.0%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"62.2%", top:"40.5%" }} />
          <div className="globe-node" style={{ left:"48.5%", top:"24.5%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"13.1%", top:"30.5%" }} />
          <div className="globe-node" style={{ left:"52.8%", top:"82.0%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"84.8%", top:"75.5%" }} />
          <div className="globe-node" style={{ left:"32.2%", top:"69.5%" }} />
        </div>
      </div>
    </div>
  );
}
