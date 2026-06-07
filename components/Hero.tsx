import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath, type GeoProjection } from "d3-geo";
import worldTopo from "world-atlas/countries-110m.json";

type HeroProps = { lang: Language };

/* d3-geo + Natural Earth 真实大陆路径 */
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
      <img src="/chainflow-hero-flow.png" alt="" className="hero-asset pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(215,177,93,0.24)_0%,rgba(31,143,132,0.10)_28%,rgba(8,11,9,0.72)_58%,rgba(8,11,9,0.98)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,9,0.98)_0%,rgba(8,11,9,0.9)_42%,rgba(8,11,9,0.48)_74%,rgba(8,11,9,0.86)_100%)]" />
      <div className="mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.92fr_0.9fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="mb-7 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm text-gold backdrop-blur">{copy.eyebrow}</p>
          <h1 className="whitespace-nowrap text-[clamp(1.55rem,5.8vw,4.5rem)] font-semibold leading-[1.12] text-rice md:text-7xl md:leading-[1.08]">
            {zh ? (<>让供应链，如<span className="flow-word">水</span>一般</>) : copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-xl leading-8 text-rice/80 md:text-2xl">{copy.subtitle}</p>
          <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-rice/70 md:text-lg">{copy.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#skills" className="btn-primary">{copy.primaryCta}<ArrowRight size={18} /></a>
            <a href="#skills" className="btn-ghost"><Sparkles size={18} />{copy.secondaryCta}</a>
            <a href="#contact" className="btn-ghost"><CalendarDays size={18} />{copy.tertiaryCta}</a>
          </div>
        </div>
        <div className="relative flex min-h-[18rem] items-center justify-center sm:min-h-[24rem] lg:min-h-[34rem]">
          <GlobeFlowVisual lang={lang} />
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Globe — 全球港口 + 航运/铁路/公路多式联运网络
   "地球的脉络" — 日夜不息地运作
   ============================================ */
function GlobeFlowVisual({ lang }: { lang: Language }) {
  const zh = lang === "zh";

  /* ---- 港口与内陆枢纽 (800×400) ---- */
  const H = {
    // 中国港口
    qinhuangdao:{x:665,y:122}, tianjin:{x:660,y:128}, dalian:{x:668,y:118},
    qingdao:   {x:656,y:134}, shanghai:{x:652,y:140}, ningbo:{x:656,y:145},
    xiamen:    {x:648,y:154}, shenzhen:{x:642,y:157}, guangzhou:{x:638,y:160},
    // 国际港口
    tokyo:{x:700,y:118}, busan:{x:682,y:124}, singapore:{x:622,y:212},
    mumbai:{x:536,y:176}, dubai:{x:498,y:164}, rotterdam:{x:388,y:98},
    hamburg:{x:394,y:93}, london:{x:368,y:90}, losangeles:{x:105,y:126},
    newyork:{x:198,y:108}, capetown:{x:422,y:330}, sydney:{x:678,y:305},
    santos:{x:258,y:278}, panama:{x:192,y:160}, istanbul:{x:435,y:120},
    // 内陆枢纽
    chongqing:{x:630,y:148}, chengdu:{x:618,y:150}, xian:{x:635,y:138},
    zhengzhou:{x:644,y:134}, wuhan:{x:641,y:146}, harbin:{x:672,y:112},
    moscow:{x:445,y:75}, chicago:{x:160,y:115}, frankfurt:{x:394,y:98},
    almaty:{x:550,y:110},
  };

  function cp(a:{x:number,y:number}, b:{x:number,y:number}, crv:number) {
    const mx=(a.x+b.x)/2, my=(a.y+b.y)/2, dx=b.x-a.x, dy=b.y-a.y;
    return `M${a.x},${a.y} Q${mx-dy*crv},${my+dx*crv} ${b.x},${b.y}`;
  }

  /* 航运主线 — 全球海运大动脉 */
  const shipping = [
    {f:H.shanghai,t:H.singapore,c:0.12},{f:H.singapore,t:H.dubai,c:-0.10},{f:H.dubai,t:H.rotterdam,c:-0.12},
    {f:H.shanghai,t:H.losangeles,c:0.28},{f:H.shanghai,t:H.tokyo,c:0.08},{f:H.shanghai,t:H.sydney,c:0.08},
    {f:H.shenzhen,t:H.capetown,c:-0.10},{f:H.singapore,t:H.mumbai,c:-0.08},{f:H.rotterdam,t:H.newyork,c:-0.14},
    {f:H.shanghai,t:H.santos,c:-0.20},{f:H.dubai,t:H.capetown,c:-0.06},{f:H.losangeles,t:H.panama,c:0.08},
    {f:H.tokyo,t:H.losangeles,c:0.22},{f:H.shanghai,t:H.istanbul,c:-0.16},
  ];

  /* 铁路大动脉 — 中欧班列、西伯利亚铁路等 */
  const rail = [
    {f:H.xian,t:H.almaty,c:0.05},{f:H.almaty,t:H.moscow,c:0.05},{f:H.moscow,t:H.frankfurt,c:-0.06},
    {f:H.moscow,t:H.harbin,c:0.08},{f:H.zhengzhou,t:H.xian,c:0.03},{f:H.chongqing,t:H.xian,c:-0.03},
    {f:H.chicago,t:H.newyork,c:-0.06},{f:H.losangeles,t:H.chicago,c:0.05},
    {f:H.chengdu,t:H.chongqing,c:0.02},{f:H.wuhan,t:H.zhengzhou,c:0.02},
  ];

  /* 公路/内陆连接 */
  const road = [
    {f:H.tianjin,t:H.qinhuangdao,c:-0.02},{f:H.tianjin,t:H.qingdao,c:0.02},{f:H.qingdao,t:H.shanghai,c:0.02},
    {f:H.shanghai,t:H.ningbo,c:-0.01},{f:H.ningbo,t:H.xiamen,c:0.02},{f:H.xiamen,t:H.shenzhen,c:-0.01},
    {f:H.shanghai,t:H.wuhan,c:-0.04},{f:H.wuhan,t:H.chongqing,c:-0.03},{f:H.zhengzhou,t:H.wuhan,c:0.02},
    {f:H.tianjin,t:H.zhengzhou,c:-0.03},{f:H.dalian,t:H.harbin,c:0.03},{f:H.hamburg,t:H.frankfurt,c:0.02},
    {f:H.chicago,t:H.newyork,c:-0.04},{f:H.rotterdam,t:H.hamburg,c:-0.02},{f:H.london,t:H.rotterdam,c:0.03},
  ];

  return (
    <div className="globe-visual" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div className="globe-grid" />
        <div className="globe-contents">
          <svg className="globe-map" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            {/* 大陆 */}
            <path d={worldPathD} fill="rgba(215,177,93,0.18)" stroke="rgba(215,177,93,0.26)" strokeWidth="0.5" />

            <g fill="none" strokeLinecap="round">
              {/* 航运 — 粗金，动脉 */}
              {shipping.map((r,i) => (
                <path key={"sh"+i} className="flow-path flow-path--shipping" d={cp(r.f,r.t,r.c)} strokeDasharray="6 5" />
              ))}
              {/* 铁路 — 中粗青，骨骼 */}
              {rail.map((r,i) => (
                <path key={"rl"+i} className="flow-path flow-path--rail" d={cp(r.f,r.t,r.c)} strokeDasharray="3 7" />
              ))}
              {/* 公路/内陆 — 细弱，毛细血管 */}
              {road.map((r,i) => (
                <path key={"rd"+i} className="flow-path flow-path--road" d={cp(r.f,r.t,r.c)} strokeDasharray="1 10" />
              ))}
            </g>

            {/* 港口光点 — 中国金色，国际青白 */}
            <g>
              {[H.shanghai,H.shenzhen,H.ningbo,H.tianjin,H.qingdao,H.dalian,H.xiamen,H.guangzhou,H.qinhuangdao].map((p,i) => (
                <circle key={"cn"+i} cx={p.x} cy={p.y} r="1.8" fill="#f2c76a" opacity="0.9" filter="url(#glow)" />
              ))}
              {[H.tokyo,H.busan,H.singapore,H.dubai,H.rotterdam,H.losangeles,H.newyork,H.capetown,H.sydney,H.santos,H.mumbai,H.london,H.hamburg,H.panama,H.istanbul].map((p,i) => (
                <circle key={"gl"+i} cx={p.x} cy={p.y} r="1.2" fill="rgba(255,250,240,0.7)" opacity="0.7" />
              ))}
              {/* 内陆枢纽 */}
              {[H.chongqing,H.chengdu,H.xian,H.zhengzhou,H.wuhan,H.moscow,H.chicago,H.frankfurt,H.almaty].map((p,i) => (
                <circle key={"in"+i} cx={p.x} cy={p.y} r="0.8" fill="rgba(117,212,203,0.6)" opacity="0.55" />
              ))}
            </g>

            <defs>
              <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
