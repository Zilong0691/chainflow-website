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
      <div className="mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl lg:pr-4">
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
   节点数据
   ============================================ */
type Pt = {x:number,y:number};
function Q(a:Pt,b:Pt,c:number){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y;return `M${a.x},${a.y} Q${mx-dy*c},${my+dx*c} ${b.x},${b.y}`;}

const N = {
  dl:{x:668,y:118},qhd:{x:665,y:122},tj:{x:660,y:128},qd:{x:656,y:134},
  sh:{x:652,y:140},nb:{x:656,y:145},xm:{x:648,y:154},sz:{x:642,y:157},gz:{x:638,y:160},
  heb:{x:658,y:125},cc:{x:672,y:110},hr:{x:672,y:112},zz:{x:644,y:134},
  wh:{x:641,y:146},cd:{x:618,y:150},cq:{x:630,y:148},xa:{x:635,y:138},
  tk:{x:700,y:118},bs:{x:682,y:124},os:{x:690,y:130},hk:{x:644,y:154},tp:{x:648,y:165},
  sg:{x:622,y:212},jk:{x:636,y:225},bk:{x:615,y:195},mn:{x:618,y:178},kl:{x:625,y:200},
  mb:{x:536,y:176},dlh:{x:548,y:162},klk:{x:555,y:200},
  db:{x:498,y:164},ad:{x:492,y:170},kw:{x:490,y:158},ms:{x:445,y:155},
  rt:{x:388,y:98},hg:{x:394,y:93},ld:{x:368,y:90},fr:{x:394,y:98},
  pr:{x:382,y:105},br:{x:410,y:90},vn:{x:405,y:82},rm:{x:380,y:115},
  ct:{x:422,y:330},dr:{x:440,y:316},mbk:{x:458,y:232},lg:{x:385,y:195},alx:{x:405,y:145},
  la:{x:105,y:126},sf:{x:95,y:120},se:{x:92,y:105},vc:{x:82,y:98},
  ny:{x:198,y:108},ch:{x:160,y:115},
  sp:{x:262,y:282},rj:{x:268,y:290},lm:{x:185,y:252},
  sy:{x:678,y:305},ml:{x:672,y:316},ak:{x:698,y:325},
  mc:{x:445,y:75},al:{x:550,y:110},
};

/* 航运中途点(海峡、运河等) */
const WP = {
  malacca: {x:610,y:205}, suez: {x:440,y:148}, gibraltar: {x:365,y:130},
  panamaC: {x:192,y:160}, goodHope: {x:425,y:340}, bab: {x:470,y:175},
  sunda: {x:628,y:220}, dover: {x:372,y:88}, bosporus: {x:435,y:122},
};

/* ---- 真实航运路线(经海峡/运河/好望角) ---- */
function buildShipping(): string[][] {
  const paths: string[][] = [];
  // 亚欧(苏伊士): 上海→新加坡→马六甲→亚丁湾→苏伊士→鹿特丹
  [N.sh,N.sz,N.nb].forEach(cn => {
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,WP.malacca,0.03), Q(WP.malacca,N.db,-0.06), Q(N.db,WP.suez,-0.04), Q(WP.suez,N.rt,-0.08)]);
    // 中国→地中海
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,WP.malacca,0.03), Q(WP.malacca,N.db,-0.06), Q(N.db,WP.suez,-0.04), Q(WP.suez,N.rm,-0.05)]);
  });
  // 亚欧(好望角): 上海→新加坡→好望角→鹿特丹
  [N.sh,N.sz].forEach(cn => {
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,N.mbk,-0.06), Q(N.mbk,WP.goodHope,-0.03), Q(WP.goodHope,N.rt,-0.10)]);
  });
  // 亚欧(中欧班列海运段→地中海)
  [N.sh,N.nb].forEach(cn => {
    paths.push([Q(cn,N.sg,0.10), Q(N.sg,N.db,-0.08), Q(N.db,WP.bab,0.03), Q(WP.bab,N.ms,-0.04)]);
  });
  // 跨太平洋: 上海→洛杉矶
  [N.sh,N.sz,N.nb,N.qd,N.tj].forEach(cn => {
    paths.push([Q(cn,N.la,0.22)]);
  });
  // 上海→巴拿马→纽约
  paths.push([Q(N.sh,N.la,0.22), Q(N.la,WP.panamaC,0.06), Q(WP.panamaC,N.ny,0.06)]);
  // 中国→南美(好望角)
  [N.sh,N.sz].forEach(cn => {
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,N.ct,-0.08), Q(N.ct,N.sp,-0.15)]);
  });
  // 中国→澳新
  [N.sh,N.sz,N.xm,N.gz].forEach(cn => {
    paths.push([Q(cn,N.sy,0.06)]);
    paths.push([Q(cn,N.ak,0.06)]);
  });
  // 中国→中东
  [N.sh,N.sz,N.nb,N.qd].forEach(cn => {
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,N.db,-0.08)]);
  });
  // 中国→东非
  [N.sh,N.sz,N.gz].forEach(cn => {
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,N.mbk,-0.05)]);
  });
  // 中国→西非
  [N.sh,N.sz].forEach(cn => {
    paths.push([Q(cn,N.sg,0.08), Q(N.sg,N.ct,-0.08), Q(N.ct,N.lg,-0.05)]);
  });
  // 中国→日韩
  [N.sh,N.qd,N.tj,N.dl].forEach(cn => {
    paths.push([Q(cn,N.tk,0.05)]);
    paths.push([Q(cn,N.bs,0.04)]);
  });
  // 中国→东南亚
  [N.sh,N.sz,N.xm,N.gz].forEach(cn => {
    paths.push([Q(cn,N.jk,0.08)]);
    paths.push([Q(cn,N.bk,0.06)]);
    paths.push([Q(cn,N.mn,0.06)]);
  });
  // 中东→欧洲
  paths.push([Q(N.db,WP.suez,-0.04), Q(WP.suez,N.rt,-0.08)]);
  // 中东→东非
  paths.push([Q(N.db,N.mbk,0.04)]);
  // 欧洲→北美(跨大西洋)
  [N.rt,N.hg,N.ld,N.pr].forEach(eu => {
    paths.push([Q(eu,N.ny,-0.10)]);
  });
  // 欧洲→西非
  [N.rt,N.ld].forEach(eu => {
    paths.push([Q(eu,N.lg,-0.08)]);
  });
  // 欧洲→南美
  [N.rt,N.ld,N.pr].forEach(eu => {
    paths.push([Q(eu,N.sp,-0.15)]);
  });
  // 北美→南美
  [N.la,N.ny].forEach(na => {
    paths.push([Q(na,N.sp,0.08)]);
    paths.push([Q(na,N.rj,0.08)]);
  });
  // 区域内
  [[N.tk,N.bs],[N.bs,N.os],[N.sg,N.jk],[N.jk,N.bk],[N.bk,N.sg],
   [N.mb,N.dlh],[N.dlh,N.klk],[N.db,N.ad],[N.ad,N.kw],
   [N.rt,N.hg],[N.hg,N.br],[N.rt,N.ld],[N.ld,N.pr],[N.rt,N.pr],
   [N.ct,N.dr],[N.la,N.sf],[N.sf,N.se],[N.se,N.vc],[N.ny,N.ch],
   [N.sy,N.ml],
  ].forEach(([a,b]) => paths.push([Q(a,b,0.01)]));

  return paths;
}

/* ---- 铁路网络 ---- */
function buildRail(): string[][] {
  const r: string[][] = [];
  // 中欧班列
  r.push([Q(N.xa,N.al,0.03), Q(N.al,N.mc,0.03)]);
  r.push([Q(N.cq,N.al,0.04), Q(N.al,N.mc,0.03)]);
  r.push([Q(N.zz,N.al,0.03), Q(N.al,N.mc,0.03)]);
  r.push([Q(N.zz,N.mc,0.05)]);
  // 莫斯科→欧洲
  [N.fr,N.br,N.rt,N.hg,N.pr,N.ld,N.rm,N.vn].forEach(e => r.push([Q(N.mc,e,0.02)]));
  // 西伯利亚
  r.push([Q(N.hr,N.mc,0.05)], [Q(N.cc,N.mc,0.06)], [Q(N.dl,N.mc,0.06)]);
  // 中国国内
  [[N.heb,N.zz],[N.zz,N.wh],[N.wh,N.cq],[N.cq,N.cd],[N.zz,N.xa],
   [N.xa,N.cd],[N.heb,N.cc],[N.cc,N.hr],[N.heb,N.qd],[N.wh,N.xa],
   [N.zz,N.heb],[N.wh,N.cd],[N.cq,N.xa],[N.wh,N.sz],
   [N.heb,N.tj],[N.tj,N.qd],[N.wh,N.heb],
  ].forEach(([a,b]) => r.push([Q(a,b,0.01)]));
  // 欧洲铁路网
  [[N.rt,N.fr],[N.fr,N.pr],[N.pr,N.rm],[N.rt,N.hg],[N.hg,N.br],
   [N.br,N.vn],[N.rt,N.ld],[N.fr,N.br],[N.hg,N.vn],[N.ld,N.pr],
   [N.rt,N.rm],[N.hg,N.ld],[N.fr,N.rm],
  ].forEach(([a,b]:Pt[])=>r.push([Q(a,b,0.01)]));
  // 北美
  r.push([Q(N.la,N.ch,0.04)],[Q(N.sf,N.ch,0.04)],[Q(N.se,N.ch,0.04)],
    [Q(N.ch,N.ny,0.04)],[Q(N.vc,N.ch,0.04)]);
  // 印度
  r.push([Q(N.mb,N.dlh,0.02)],[Q(N.dlh,N.klk,0.02)],[Q(N.mb,N.klk,0.02)]);
  // 中印通道
  r.push([Q(N.cd,N.mb,0.05)],[Q(N.cq,N.dlh,0.05)]);
  return r;
}

/* ---- 公路毛细血管 ---- */
function buildRoad(): string[][] {
  const r: string[][] = [];
  const all = Object.values(N);
  all.forEach((a,i) => {
    for(let j=i+1;j<all.length;j++){
      const dx=a.x-all[j].x, dy=a.y-all[j].y;
      if(Math.sqrt(dx*dx+dy*dy)<50) r.push([Q(a,all[j],0.005+Math.random()*0.02)]);
    }
  });
  return r;
}

const shippingPaths = buildShipping();
const railPaths = buildRail();
const roadPaths = buildRoad();

/* 渲染一张地图(大陆+路线+光点) */
function MapLayer() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="globe-map-svg">
      <path d={worldPathD} fill="rgba(215,177,93,0.18)" stroke="rgba(215,177,93,0.24)" strokeWidth="0.5" />
      <g fill="none" strokeLinecap="round">
        {/* 航运 — 金色 */}
        {shippingPaths.map((segs,i) => (
          <path key={"s"+i} d={segs.join(" ")} className="flow-path flow-path--shipping" />
        ))}
        {/* 铁路 — 青色 */}
        {railPaths.map((segs,i) => (
          <path key={"r"+i} d={segs.join(" ")} className="flow-path flow-path--rail" />
        ))}
        {/* 公路 — 微白 */}
        {roadPaths.map((segs,i) => (
          <path key={"d"+i} d={segs.join(" ")} className="flow-path flow-path--road" />
        ))}
      </g>
      {/* 节点光点：港口·集散地·铁路枢纽 */}
      <g>
        {/* 中国港口 — 金色大圆 */}
        {[N.sh,N.sz,N.nb,N.qd,N.tj,N.dl,N.xm,N.gz,N.qhd].map((p,i)=>(
          <circle key={"Pc"+i} cx={p.x} cy={p.y} r="1.6" fill="#f2c76a" opacity="0.9" filter="url(#gl)" />
        ))}
        {/* 国际港口 — 金色小圆 */}
        {[N.tk,N.bs,N.sg,N.db,N.rt,N.la,N.ny,N.ct,N.sy,N.sp,N.mb,N.ld,N.hg,N.sf,N.jk,N.mbk,N.os,N.bk,N.mn,N.kl,N.ad,N.kw,N.pr,N.br,N.rm,N.lg,N.alx,N.dr,N.ml,N.ak,N.vc,N.se,N.rj,N.lm,N.dlh,N.klk,N.tp].map((p,i)=>(
          <circle key={"Pi"+i} cx={p.x} cy={p.y} r="1.0" fill="#f2c76a" opacity="0.6" />
        ))}
        {/* 集散地/内陆物流枢纽 — 青色 */}
        {[N.cq,N.wh,N.zz,N.heb,N.ch,N.fr,N.al,N.mc,N.hr,N.cc,N.sg].map((p,i)=>(
          <circle key={"D"+i} cx={p.x} cy={p.y} r="1.4" fill="rgba(117,212,203,0.8)" opacity="0.7" filter="url(#gl)" />
        ))}
        {/* 铁路枢纽 — 白色 */}
        {[N.xa,N.cd,N.hg,N.rt,N.ny,N.la,N.mb,N.ms,N.db,N.ct,N.br,N.vn,N.ld,N.pr,N.rm,N.sp,N.sy].map((p,i)=>(
          <circle key={"R"+i} cx={p.x} cy={p.y} r="1.1" fill="rgba(255,250,240,0.7)" opacity="0.6" />
        ))}
      </g>
      <defs><filter id="gl"><feGaussianBlur stdDeviation="1"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    </svg>
  );
}

function GlobeFlowVisual({ lang }: { lang: Language }) {
  return (
    <div className="globe-visual" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div className="globe-grid" />
        <div className="globe-scroll">
          <MapLayer />
          <MapLayer />
        </div>
      </div>
    </div>
  );
}
