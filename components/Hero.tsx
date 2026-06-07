import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath, type GeoProjection } from "d3-geo";
import worldTopo from "world-atlas/countries-110m.json";

type HeroProps = { lang: Language };

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
   全球供应链网络 — 地球的脉络
   ============================================ */

type Pt = {x:number,y:number};

function cp(a:Pt, b:Pt, c:number) {
  const mx=(a.x+b.x)/2, my=(a.y+b.y)/2, dx=b.x-a.x, dy=b.y-a.y;
  return `M${a.x},${a.y} Q${mx-dy*c},${my+dx*c} ${b.x},${b.y}`;
}

/* 全球 60 个节点 */
const N = {
  // 中国港口 (9)
  dl: {x:668,y:118}, qhd:{x:665,y:122}, tj:{x:660,y:128}, qd:{x:656,y:134},
  sh: {x:652,y:140}, nb:{x:656,y:145}, xm:{x:648,y:154}, sz:{x:642,y:157}, gz:{x:638,y:160},
  // 中国内陆枢纽 (7)
  heb:{x:658,y:125}, cc:{x:672,y:110}, hr:{x:672,y:112}, zz:{x:644,y:134},
  wh:{x:641,y:146}, cd:{x:618,y:150}, cq:{x:630,y:148}, xa:{x:635,y:138},
  // 东亚 (5)
  tk:{x:700,y:118}, bs:{x:682,y:124}, os:{x:690,y:130}, hk:{x:644,y:154}, tp:{x:648,y:165},
  // 东南亚 (5)
  sg:{x:622,y:212}, jk:{x:636,y:225}, bk:{x:615,y:195}, mn:{x:618,y:178}, kl:{x:625,y:200},
  // 南亚 (3)
  mb:{x:536,y:176}, dlh:{x:548,y:162}, klk:{x:555,y:200},
  // 中东 (4)
  db:{x:498,y:164}, ad:{x:492,y:170}, kw:{x:490,y:158}, ms:{x:445,y:155},
  // 欧洲 (8)
  rt:{x:388,y:98}, hg:{x:394,y:93}, ld:{x:368,y:90}, fr:{x:394,y:98},
  pr:{x:382,y:105}, br:{x:410,y:90}, vn:{x:405,y:82}, rm:{x:380,y:115},
  // 非洲 (5)
  ct:{x:422,y:330}, dr:{x:440,y:316}, mbk:{x:458,y:232}, lg:{x:385,y:195}, alx:{x:405,y:145},
  // 北美 (6)
  la:{x:105,y:126}, sf:{x:95,y:120}, se:{x:92,y:105}, vc:{x:82,y:98},
  ny:{x:198,y:108}, ch:{x:160,y:115},
  // 南美 (3)
  sp:{x:262,y:282}, rj:{x:268,y:290}, lm:{x:185,y:252},
  // 大洋洲 (3)
  sy:{x:678,y:305}, ml:{x:672,y:316}, ak:{x:698,y:325},
  // 中亚/俄罗斯 (2)
  mc:{x:445,y:75}, al:{x:550,y:110},
};

/* ---- 真实航运大动脉 ---- */
function buildShipping(): [Pt,Pt,number][] {
  const r: [Pt,Pt,number][] = [];
  // 中国主要出口港
  const CN = [N.sh, N.sz, N.nb, N.qd, N.tj, N.dl, N.xm, N.gz];
  // 各区域枢纽港
  const ASIA = [N.tk,N.bs,N.os,N.sg,N.jk,N.bk,N.mn,N.kl,N.hk,N.tp];
  const SA   = [N.mb,N.dlh,N.klk];
  const ME   = [N.db,N.ad,N.kw,N.ms];
  const EU   = [N.rt,N.hg,N.ld,N.pr,N.br,N.vn,N.rm];
  const AF   = [N.ct,N.dr,N.mbk,N.lg,N.alx];
  const NA   = [N.la,N.sf,N.se,N.vc,N.ny];
  const SAM  = [N.sp,N.rj,N.lm];
  const OC   = [N.sy,N.ml,N.ak];

  // 中国三大港→全球 (上海/深圳/宁波)
  [N.sh,N.sz,N.nb].forEach(cn => {
    ASIA.forEach(a => r.push([cn,a,0.04+Math.random()*0.08]));
    SA.forEach(a => r.push([cn,a,-0.06-Math.random()*0.08]));
    ME.forEach(a => r.push([cn,a,-0.08-Math.random()*0.08]));
    EU.forEach(a => r.push([cn,a,-0.10-Math.random()*0.10]));
    NA.forEach(a => r.push([cn,a,0.15+Math.random()*0.18]));
    SAM.forEach(a => r.push([cn,a,-0.14-Math.random()*0.12]));
    AF.forEach(a => r.push([cn,a,-0.06-Math.random()*0.08]));
    OC.forEach(a => r.push([cn,a,0.04+Math.random()*0.05]));
  });
  // 中国二三线港→区域枢纽
  CN.filter(c=>c!==N.sh&&c!==N.sz&&c!==N.nb).forEach(cn => {
    [N.tk,N.sg,N.jk,N.db,N.mb,N.ct,N.la,N.sy,N.sp].forEach(hub => {
      r.push([cn,hub,(cn.x<hub.x?0.04:-0.04)+Math.random()*0.06]);
    });
  });

  // 区域内互联
  [ASIA,SA,ME,EU,AF,NA,SAM,OC].forEach(region => {
    region.forEach((a,i) => {
      for(let j=i+1;j<region.length;j++) r.push([a,region[j],0.01+Math.random()*0.04]);
    });
  });

  // 跨区域枢纽连接 (真实航线)
  [[N.sg,N.db],[N.db,N.rt],[N.rt,N.ny],[N.la,N.ny],[N.sg,N.mb],
   [N.db,N.mbk],[N.rt,N.lg],[N.rt,N.ct],[N.ny,N.sp],[N.la,N.sp],
   [N.sg,N.sy],[N.tk,N.la],[N.tk,N.sg],[N.db,N.ct],[N.mb,N.db],
   [N.mb,N.mbk],[N.sg,N.ct],[N.rt,N.sf],[N.ny,N.rt],[N.la,N.tk],
   [N.db,N.ms],[N.sg,N.jk],[N.sh,N.hk],[N.hk,N.sg],
  ].forEach(([a,b]) => { if(a&&b) r.push([a,b,a.x<b.x?0.05:-0.05]); });

  return r;
}

/* ---- 真实铁路走廊 ---- */
function buildRail(): [Pt,Pt,number][] {
  const r: [Pt,Pt,number][] = [];
  // 中欧班列三大通道
  r.push([N.xa,N.al,0.04]); r.push([N.al,N.mc,0.04]); // 阿拉山口→莫斯科
  r.push([N.xa,N.mc,0.06]); // 西安→莫斯科(经蒙古)
  r.push([N.cq,N.al,0.05]); // 重庆→阿拉木图
  r.push([N.zz,N.al,0.04]); // 郑州→阿拉木图
  // 莫斯科→欧洲各枢纽
  [N.fr,N.br,N.rt,N.hg,N.pr,N.ld,N.rm,N.vn].forEach(e => r.push([N.mc,e,0.02+Math.random()*0.03]));
  // 西伯利亚铁路
  r.push([N.hr,N.mc,0.06]); r.push([N.cc,N.mc,0.07]); r.push([N.dl,N.mc,0.08]);
  // 中国国内铁路网
  [[N.heb,N.zz],[N.zz,N.wh],[N.wh,N.cq],[N.cq,N.cd],[N.zz,N.xa],
   [N.xa,N.cd],[N.heb,N.cc],[N.cc,N.hr],[N.heb,N.qd],[N.wh,N.xa],
   [N.zz,N.heb],[N.wh,N.cd],[N.cq,N.xa],[N.wh,N.sz],
  ].forEach(([a,b]) => { if(a&&b) r.push([a,b,0.01+Math.random()*0.03]); });
  // 欧洲铁路网
  [[N.rt,N.fr],[N.fr,N.pr],[N.pr,N.rm],[N.rt,N.hg],[N.hg,N.br],
   [N.br,N.vn],[N.rt,N.ld],[N.fr,N.br],[N.hg,N.vn],[N.ld,N.pr],
  ].forEach(([a,b]) => { if(a&&b) r.push([a,b,0.01+Math.random()*0.02]); });
  // 北美横贯铁路
  r.push([N.la,N.ch,0.04]); r.push([N.sf,N.ch,0.05]); r.push([N.se,N.ch,0.06]);
  r.push([N.ch,N.ny,0.04]); r.push([N.vc,N.ch,0.05]);
  // 印度铁路
  r.push([N.mb,N.dlh,0.02]); r.push([N.dlh,N.klk,0.02]); r.push([N.mb,N.klk,0.03]);
  // 中国→南亚
  r.push([N.cd,N.mb,0.05]); r.push([N.cq,N.dlh,0.06]);
  return r;
}

/* ---- 公路毛细血管：所有邻近节点全连接 ---- */
function buildRoad(): [Pt,Pt,number][] {
  const r: [Pt,Pt,number][] = [];
  const all = Object.values(N);
  all.forEach((a,i) => {
    for(let j=i+1;j<all.length;j++){
      const dx=a.x-all[j].x, dy=a.y-all[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<50) r.push([a,all[j],0.005+Math.random()*0.02]); // 50单位≈中国沿海到内陆
    }
  });
  return r;
}

const shippingRoutes = buildShipping();
const railRoutes = buildRail();
const roadRoutes = buildRoad();

function GlobeFlowVisual({ lang }: { lang: Language }) {
  return (
    <div className="globe-visual" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div className="globe-grid" />
        <div className="globe-contents">
          <svg className="globe-map" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <path d={worldPathD} fill="rgba(215,177,93,0.16)" stroke="rgba(215,177,93,0.22)" strokeWidth="0.5" />
            <g fill="none" strokeLinecap="round">
              {/* 航运 — 金色动脉 */}
              {shippingRoutes.map((r,i) => (
                <path key={"sh"+i} className="flow-path flow-path--shipping" d={cp(r[0],r[1],r[2])} />
              ))}
              {/* 铁路 — 青色骨骼 */}
              {railRoutes.map((r,i) => (
                <path key={"rl"+i} className="flow-path flow-path--rail" d={cp(r[0],r[1],r[2])} />
              ))}
              {/* 公路 — 微光毛细血管 */}
              {roadRoutes.map((r,i) => (
                <path key={"rd"+i} className="flow-path flow-path--road" d={cp(r[0],r[1],r[2])} />
              ))}
            </g>
            {/* 光点 */}
            <g>
              {[N.sh,N.sz,N.nb,N.qd,N.tj,N.dl,N.xm,N.gz,N.qhd].map((p,i) => (
                <circle key={"c"+i} cx={p.x} cy={p.y} r="1.8" fill="#f2c76a" opacity="0.85" filter="url(#g)" />
              ))}
              {[N.tk,N.bs,N.sg,N.db,N.rt,N.la,N.ny,N.ct,N.sy,N.sp,N.mb,N.ld,N.hg,N.mc,N.sf,N.jk,N.mbk].map((p,i) => (
                <circle key={"w"+i} cx={p.x} cy={p.y} r="1.0" fill="rgba(255,250,240,0.65)" opacity="0.6" />
              ))}
              {[N.cq,N.xa,N.zz,N.wh,N.cd,N.ch,N.fr,N.al].map((p,i) => (
                <circle key={"i"+i} cx={p.x} cy={p.y} r="0.7" fill="rgba(117,212,203,0.5)" opacity="0.45" />
              ))}
            </g>
            <defs><filter id="g"><feGaussianBlur stdDeviation="1.2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
