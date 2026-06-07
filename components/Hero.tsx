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

/* ---- 航运网络：连接所有沿海港口 ---- */
function buildShipping(): [Pt,Pt,number][] {
  const res: [Pt,Pt,number][] = [];
  // 中国→全球各区域
  const cnPorts = [N.sh,N.sz,N.nb,N.qd,N.tj,N.dl,N.xm,N.gz,N.qhd,N.hk];
  const asiaPorts = [N.tk,N.bs,N.os,N.sg,N.jk,N.bk,N.mn,N.kl,N.tp];
  const southAsia = [N.mb,N.dlh,N.klk];
  const midEast = [N.db,N.ad,N.kw,N.ms];
  const europe = [N.rt,N.hg,N.ld,N.pr,N.br,N.vn,N.rm];
  const africa = [N.ct,N.dr,N.mbk,N.lg,N.alx];
  const northAm = [N.la,N.sf,N.se,N.vc,N.ny];
  const southAm = [N.sp,N.rj,N.lm];
  const oceania = [N.sy,N.ml,N.ak];

  // 中国→各区域
  cnPorts.forEach(cn => {
    asiaPorts.forEach(a => res.push([cn,a,0.06+Math.random()*0.1]));
    southAsia.forEach(a => res.push([cn,a,-0.06-Math.random()*0.1]));
    midEast.forEach(a => res.push([cn,a,-0.08-Math.random()*0.1]));
    europe.forEach(a => res.push([cn,a,-0.10-Math.random()*0.12]));
    northAm.forEach(a => res.push([cn,a,0.15+Math.random()*0.2]));
    southAm.forEach(a => res.push([cn,a,-0.12-Math.random()*0.15]));
    africa.forEach(a => res.push([cn,a,-0.06-Math.random()*0.1]));
    oceania.forEach(a => res.push([cn,a,0.04+Math.random()*0.06]));
  });

  // 区域内部
  [...asiaPorts,...southAsia].forEach((a,i) => {
    for(let j=i+1; j<[...asiaPorts,...southAsia].length; j++) {
      if(Math.random()<0.25) res.push([a,[...asiaPorts,...southAsia][j],0.03+Math.random()*0.06]);
    }
  });
  midEast.forEach((a,i) => {
    for(let j=i+1; j<midEast.length; j++) res.push([a,midEast[j],0.02+Math.random()*0.04]);
  });
  europe.forEach((a,i) => {
    for(let j=i+1; j<europe.length; j++) res.push([a,europe[j],0.01+Math.random()*0.03]);
  });
  northAm.forEach((a,i) => {
    for(let j=i+1; j<northAm.length; j++) res.push([a,northAm[j],0.02+Math.random()*0.05]);
  });

  // 跨区域连接
  midEast.forEach(m => {africa.forEach(a => res.push([m,a,0.03+Math.random()*0.05]));});
  europe.forEach(e => {africa.forEach(a => res.push([e,a,-0.04-Math.random()*0.06]));});
  europe.forEach(e => {northAm.forEach(a => res.push([e,a,-0.08-Math.random()*0.1]));});
  northAm.forEach(n => {southAm.forEach(a => res.push([n,a,0.04+Math.random()*0.08]));});
  southAsia.forEach(s => {midEast.forEach(m => res.push([s,m,0.02+Math.random()*0.04]));});
  southAsia.forEach(s => {africa.forEach(a => res.push([s,a,0.03+Math.random()*0.06]));});
  asiaPorts.forEach(a => {oceania.forEach(o => res.push([a,o,0.03+Math.random()*0.06]));});

  return res;
}

/* ---- 铁路网络 ---- */
function buildRail(): [Pt,Pt,number][] {
  const res: [Pt,Pt,number][] = [];
  const cnInland = [N.heb,N.cc,N.hr,N.zz,N.wh,N.cd,N.cq,N.xa];
  const euInland = [N.mc,N.fr,N.br,N.vn,N.rm,N.rt,N.hg,N.pr,N.ld,N.al];
  const naInland = [N.ch,N.ny,N.se,N.vc,N.sf,N.la];

  // 中国内陆互联
  cnInland.forEach((a,i) => {
    for(let j=i+1; j<cnInland.length; j++) if(Math.random()<0.45) res.push([a,cnInland[j],0.01+Math.random()*0.03]);
  });
  // 中欧班列路径: 西安→阿拉木图→莫斯科→欧洲
  res.push([N.xa,N.al,0.04]); res.push([N.al,N.mc,0.04]);
  euInland.forEach(e => { if(Math.random()<0.5) res.push([N.mc,e,0.02+Math.random()*0.04]); });
  // 欧洲内部
  euInland.forEach((a,i) => {
    for(let j=i+1; j<euInland.length; j++) if(Math.random()<0.35) res.push([a,euInland[j],0.01+Math.random()*0.03]);
  });
  // 北美内部
  naInland.forEach((a,i) => {
    for(let j=i+1; j<naInland.length; j++) res.push([a,naInland[j],0.02+Math.random()*0.04]);
  });
  // 西伯利亚铁路
  res.push([N.hr,N.mc,0.06]);
  // 中国→南亚铁路
  res.push([N.cd,N.mb,0.05]);
  cnInland.forEach(c => {[N.mb,N.dlh,N.klk].forEach(s => {if(Math.random()<0.3) res.push([c,s,0.04+Math.random()*0.06]);});});

  return res;
}

/* ---- 公路/内陆连接 ---- */
function buildRoad(): [Pt,Pt,number][] {
  const res: [Pt,Pt,number][] = [];
  const all = [N.sh,N.sz,N.nb,N.qd,N.tj,N.dl,N.xm,N.gz,N.qhd,N.hk,N.tp,
              N.heb,N.cc,N.hr,N.zz,N.wh,N.cd,N.cq,N.xa,
              N.tk,N.bs,N.os,N.sg,N.jk,N.bk,N.mn,N.kl,
              N.mb,N.dlh,N.klk,N.db,N.ad,N.kw,N.ms,
              N.rt,N.hg,N.ld,N.fr,N.pr,N.br,N.vn,N.rm,
              N.ct,N.dr,N.mbk,N.lg,N.alx,
              N.la,N.sf,N.se,N.vc,N.ny,N.ch,
              N.sp,N.rj,N.lm,N.sy,N.ml,N.ak,N.mc,N.al];
  // 邻近节点连接(模拟毛细血管)
  all.forEach((a,i) => {
    for(let j=i+1; j<all.length; j++) {
      const dx=a.x-all[j].x, dy=a.y-all[j].y, dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<35 && Math.random()<0.3) res.push([a,all[j],0.01+Math.random()*0.03]);
    }
  });
  return res;
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
