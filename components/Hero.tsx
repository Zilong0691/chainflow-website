import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath, type GeoProjection } from "d3-geo";
import worldTopo from "world-atlas/countries-110m.json";

type HeroProps = { lang: Language };
type Pt = {x:number,y:number};

const topoAny = worldTopo as any;
const landData = feature(topoAny, topoAny.objects.land);
const proj: GeoProjection = geoEquirectangular().fitSize([800, 400], landData);
const pathGen = geoPath(proj);
const worldPathD: string = pathGen(landData) ?? "";

/* 经纬度→投影坐标 */
function ll(lon:number, lat:number): Pt {
  const p = proj([lon, lat])!;
  return {x: p[0], y: p[1]};
}

/* 真实经纬度港口 & 枢纽 */
const N = {
  sh:ll(121.5,31.2), sz:ll(114.1,22.5), nb:ll(121.6,29.9), qd:ll(120.4,36.1),
  tj:ll(117.7,39.0), dl:ll(121.6,38.9), xm:ll(118.1,24.5), gz:ll(113.3,23.1),
  qhd:ll(119.6,39.9),
  heb:ll(126.6,45.8), cc:ll(125.3,43.9), hr:ll(116.4,39.9), zz:ll(113.7,34.8),
  wh:ll(114.3,30.6), cd:ll(104.1,30.6), cq:ll(106.5,29.5), xa:ll(109.0,34.3),
  tk:ll(139.8,35.7), bs:ll(129.0,35.1), os:ll(135.5,34.7), hk:ll(114.2,22.3),
  sg:ll(103.8,1.3), jk:ll(106.8,-6.2), bk:ll(100.5,13.8), mn:ll(120.9,14.6),
  kl:ll(101.7,3.1),
  mb:ll(72.8,18.9), dlh:ll(77.2,28.6), klk:ll(88.4,22.6),
  db:ll(55.3,25.3), ad:ll(54.4,24.5), kw:ll(48.0,29.4), ms:ll(39.9,32.7),
  rt:ll(4.5,51.9), hg:ll(9.9,53.5), ld:ll(-0.1,51.5), fr:ll(8.7,50.1),
  pr:ll(2.3,48.9), br:ll(13.4,52.5), vn:ll(16.4,48.2), rm:ll(12.5,41.9),
  ct:ll(18.4,-33.9), dr:ll(31.0,-29.9), mbk:ll(39.7,-4.0), lg:ll(3.4,6.5),
  alx:ll(29.9,31.2), la:ll(-118.3,33.7), sf:ll(-122.4,37.8), se:ll(-122.3,47.6),
  vc:ll(-123.1,49.3), ny:ll(-74.0,40.7), ch:ll(-87.6,41.9),
  sp:ll(-46.3,-23.9), rj:ll(-43.2,-22.9), lm:ll(-77.0,-12.0),
  sy:ll(151.2,-33.9), ml:ll(144.9,-37.8), ak:ll(174.8,-36.8),
  mc:ll(37.6,55.8), al:ll(76.9,43.3), pan:ll(-79.5,9.0),
};

function Q(a:Pt,b:Pt,c:number){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y;return `M${a.x},${a.y} Q${mx-dy*c},${my+dx*c} ${b.x},${b.y}`;}

/* 航运(经海峡/运河) */
function buildShip(): string[][] {
  const r: string[][] = [];
  const mal={x:N.sg.x-12,y:N.sg.y-6}, szC={x:proj([33,31])![0],y:proj([33,31])![1]},
        gib={x:proj([-5,36])![0],y:proj([-5,36])![1]}, gh={x:N.ct.x-5,y:N.ct.y-5},
        bab={x:proj([44,12])![0],y:proj([44,12])![1]};
  [N.sh,N.sz,N.nb].forEach(cn=>{
    r.push([Q(cn,N.sg,0.06),Q(N.sg,mal,0.02),Q(mal,N.db,-0.05),Q(N.db,szC,-0.03),Q(szC,N.rt,-0.06)]);
    r.push([Q(cn,N.sg,0.06),Q(N.sg,mal,0.02),Q(mal,N.db,-0.05),Q(N.db,szC,-0.03),Q(szC,N.rm,-0.04)]);
  });
  [N.sh,N.sz].forEach(cn=>{r.push([Q(cn,N.sg,0.06),Q(N.sg,N.mbk,-0.04),Q(N.mbk,gh,-0.02),Q(gh,N.rt,-0.08)]);});
  [N.sh,N.sz,N.nb,N.qd,N.tj].forEach(cn=>{r.push([Q(cn,N.la,0.18)]);});
  r.push([Q(N.sh,N.la,0.18),Q(N.la,N.pan,0.05),Q(N.pan,N.ny,0.05)]);
  [N.sh,N.sz].forEach(cn=>{r.push([Q(cn,N.sg,0.06),Q(N.sg,N.ct,-0.06),Q(N.ct,N.sp,-0.12)]);});
  [N.sh,N.sz,N.xm,N.gz].forEach(cn=>{r.push([Q(cn,N.sy,0.05)]);});
  [N.sh,N.sz,N.nb,N.qd].forEach(cn=>{r.push([Q(cn,N.sg,0.06),Q(N.sg,N.db,-0.06)]);});
  [N.sh,N.sz,N.gz].forEach(cn=>{r.push([Q(cn,N.sg,0.06),Q(N.sg,N.mbk,-0.04)]);});
  [N.sh,N.qd,N.tj,N.dl].forEach(cn=>{r.push([Q(cn,N.tk,0.04)]);r.push([Q(cn,N.bs,0.03)]);});
  [N.sh,N.sz,N.xm,N.gz].forEach(cn=>{r.push([Q(cn,N.jk,0.06)]);r.push([Q(cn,N.bk,0.05)]);});
  r.push([Q(N.db,szC,-0.03),Q(szC,N.rt,-0.06)]);
  [N.rt,N.hg,N.ld].forEach(eu=>{r.push([Q(eu,N.ny,-0.08)]);});
  r.push([Q(N.la,N.ny,-0.08)]);
  [[N.tk,N.bs],[N.sg,N.jk],[N.jk,N.bk],[N.mb,N.dlh],[N.db,N.ad],
   [N.rt,N.hg],[N.hg,N.br],[N.rt,N.ld],[N.ct,N.dr],[N.la,N.sf],
   [N.sf,N.se],[N.se,N.vc],[N.ny,N.ch],[N.sy,N.ml],
  ].forEach(([a,b])=>r.push([Q(a,b,0.01)]));
  return r;
}

/* 铁路 */
function buildRail(): string[][] {
  const r: string[][] = [];
  r.push([Q(N.xa,N.al,0.03),Q(N.al,N.mc,0.03)]);
  r.push([Q(N.cq,N.al,0.03),Q(N.al,N.mc,0.03)]);
  r.push([Q(N.zz,N.mc,0.04)]);
  [N.fr,N.br,N.rt,N.hg,N.pr,N.ld,N.rm,N.vn].forEach(e=>r.push([Q(N.mc,e,0.02)]));
  r.push([Q(N.hr,N.mc,0.04)],[Q(N.cc,N.mc,0.05)],[Q(N.dl,N.mc,0.05)]);
  [[N.heb,N.zz],[N.zz,N.wh],[N.wh,N.cq],[N.cq,N.cd],[N.zz,N.xa],
   [N.xa,N.cd],[N.heb,N.cc],[N.cc,N.hr],[N.heb,N.qd],[N.wh,N.xa],
   [N.zz,N.heb],[N.wh,N.cd],[N.cq,N.xa],[N.wh,N.sz],[N.heb,N.tj],[N.tj,N.qd],
  ].forEach(([a,b])=>r.push([Q(a,b,0.01)]));
  [[N.rt,N.fr],[N.fr,N.pr],[N.pr,N.rm],[N.rt,N.hg],[N.hg,N.br],
   [N.br,N.vn],[N.rt,N.ld],[N.fr,N.br],[N.hg,N.vn],[N.ld,N.pr],[N.rt,N.rm],[N.hg,N.ld],
  ].forEach(([a,b]:Pt[])=>r.push([Q(a,b,0.01)]));
  r.push([Q(N.la,N.ch,0.03)],[Q(N.sf,N.ch,0.03)],[Q(N.se,N.ch,0.03)],[Q(N.ch,N.ny,0.03)]);
  r.push([Q(N.mb,N.dlh,0.01)],[Q(N.dlh,N.klk,0.01)]);
  r.push([Q(N.cd,N.mb,0.04)],[Q(N.cq,N.dlh,0.04)]);
  return r;
}

/* 公路 */
function buildRoad(): string[][] {
  const r: string[][] = [];
  const all = Object.values(N);
  all.forEach((a,i) => {
    for(let j=i+1;j<all.length;j++){
      const dx=a.x-all[j].x, dy=a.y-all[j].y;
      if(Math.sqrt(dx*dx+dy*dy)<55) r.push([Q(a,all[j],0.003+Math.random()*0.015)]);
    }
  });
  return r;
}

const ship = buildShip(), rail = buildRail(), road = buildRoad();

function MapLayer() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="globe-map-svg">
      <path d={worldPathD} fill="rgba(215,177,93,0.18)" stroke="rgba(215,177,93,0.24)" strokeWidth="0.5" />
      <g fill="none" strokeLinecap="round">
        {ship.map((s,i)=><path key={"s"+i} d={s.join(" ")} className="flow-path flow-path--shipping"/>)}
        {rail.map((s,i)=><path key={"r"+i} d={s.join(" ")} className="flow-path flow-path--rail"/>)}
        {road.map((s,i)=><path key={"d"+i} d={s.join(" ")} className="flow-path flow-path--road"/>)}
      </g>
      {/* 精简光点: 仅核心港口+枢纽 */}
      <g>
        {[N.sh,N.sz,N.nb,N.qd,N.tj,N.dl].map((p,i)=><circle key={"C"+i} cx={p.x} cy={p.y} r="1.6" fill="#f2c76a" opacity="0.9" filter="url(#gl)"/>)}
        {[N.tk,N.sg,N.db,N.rt,N.la,N.ny,N.ct,N.sy,N.mb,N.ld].map((p,i)=><circle key={"W"+i} cx={p.x} cy={p.y} r="1.2" fill="#f2c76a" opacity="0.6"/>)}
        {[N.cq,N.wh,N.zz,N.ch,N.fr,N.al,N.xa,N.cd,N.hr,N.heb,N.mc].map((p,i)=><circle key={"D"+i} cx={p.x} cy={p.y} r="1.3" fill="rgba(117,212,203,0.8)" opacity="0.65" filter="url(#gl)"/>)}
        {[N.ny,N.la,N.mb,N.db,N.br,N.vn,N.ld,N.sp,N.sy,N.rt].map((p,i)=><circle key={"T"+i} cx={p.x} cy={p.y} r="1.0" fill="rgba(255,250,240,0.6)" opacity="0.5"/>)}
      </g>
      <defs><filter id="gl"><feGaussianBlur stdDeviation="1"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    </svg>
  );
}

export function Hero({ lang }: HeroProps) {
  const copy = siteContent[lang].hero;
  const zh = lang === "zh";
  return (
    <section id="top" className="relative isolate overflow-hidden bg-graphite text-rice">
      <img src="/chainflow-hero-flow.png" alt="" className="hero-asset pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(215,177,93,0.24)_0%,rgba(31,143,132,0.10)_28%,rgba(8,11,9,0.72)_58%,rgba(8,11,9,0.98)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,9,0.98)_0%,rgba(8,11,9,0.9)_42%,rgba(8,11,9,0.48)_74%,rgba(8,11,9,0.86)_100%)]" />
      <div className="mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24">
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

function GlobeFlowVisual({ lang }: { lang: Language }) {
  return (
    <div className="globe-visual" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div className="globe-grid" />
        <div className="globe-scroll">
          <MapLayer /><MapLayer /><MapLayer />
        </div>
      </div>
    </div>
  );
}
