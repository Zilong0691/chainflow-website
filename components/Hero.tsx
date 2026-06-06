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
          <h1 className="whitespace-nowrap text-[clamp(1.55rem,5.8vw,4.5rem)] font-semibold leading-[1.12] text-rice md:text-7xl md:leading-[1.08]">
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
   GlobeFlowVisual — 旋转地球 + 中国出海链流
   800×400 equirectangular，路线从中国辐射全球
   ============================================= */
function GlobeFlowVisual({ lang }: { lang: Language }) {
  const zh = lang === "zh";

  /* 中国出海港口 */
  const cn = { shanghai: { x: 652, y: 134 }, shenzhen: { x: 640, y: 152 }, ningbo: { x: 658, y: 132 } };
  /* 全球目的港 */
  const world = {
    tokyo:      { x: 700, y: 116 },
    singapore:  { x: 620, y: 208 },
    mumbai:     { x: 535, y: 175 },
    dubai:      { x: 498, y: 162 },
    rotterdam:  { x: 388, y: 98 },
    losangeles: { x: 105, y: 122 },
    capetown:   { x: 422, y: 328 },
    sydney:     { x: 678, y: 302 },
    santos:     { x: 258, y: 278 },
    mombasa:    { x: 458, y: 232 },
    london:     { x: 368, y: 90 },
    newyork:    { x: 198, y: 108 },
    jakarta:    { x: 635, y: 225 },
    istanbul:   { x: 435, y: 120 },
  };

  /* 所有路线从中国出发 */
  const routes = [
    { from: cn.shanghai, to: world.tokyo,      curve: 0.10, label: "中日近洋" },
    { from: cn.shanghai, to: world.singapore,  curve: 0.12, label: "东南亚" },
    { from: cn.shenzhen, to: world.jakarta,    curve: 0.08, label: "印尼" },
    { from: cn.shanghai, to: world.mumbai,     curve: -0.10, label: "南亚" },
    { from: cn.shanghai, to: world.dubai,      curve: -0.14, label: "中东" },
    { from: cn.shanghai, to: world.istanbul,   curve: -0.16, label: "地中海" },
    { from: cn.shanghai, to: world.rotterdam,  curve: -0.18, label: "北欧" },
    { from: cn.shanghai, to: world.losangeles, curve: 0.30, label: "北美西岸" },
    { from: cn.ningbo,   to: world.sydney,     curve: 0.08, label: "澳新" },
    { from: cn.shanghai, to: world.mombasa,    curve: -0.08, label: "东非" },
    { from: cn.shanghai, to: world.capetown,   curve: -0.12, label: "南非" },
    { from: cn.shanghai, to: world.santos,     curve: -0.22, label: "南美东岸" },
  ];

  function curvePath(from: {x:number,y:number}, to: {x:number,y:number}, curve: number) {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx = mx - dy * curve;
    const cy = my + dx * curve;
    return `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`;
  }

  return (
    <div className="globe-visual" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div className="globe-grid" />
        <div className="globe-contents">
          <svg className="globe-map" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            {/* ===== 大陆轮廓 ===== */}
            <g className="continent-group" fill="rgba(31,143,132,0.30)" stroke="rgba(117,212,203,0.18)" strokeWidth="0.6">
              <path d="M82,22 C100,18 125,17 150,20 C175,22 200,25 220,28 C238,32 255,38 262,48 C268,56 264,68 256,80 C248,90 240,100 235,112 C230,125 228,135 222,142 C216,148 208,150 200,148 C192,145 188,140 182,138 C175,135 168,138 162,142 C155,146 148,148 140,146 C132,144 125,136 118,126 C110,116 100,105 92,95 C84,85 75,72 68,60 C60,48 55,35 60,28 C68,18 75,20 82,22 Z" />
              <path d="M180,148 C188,145 198,148 208,152 C218,158 228,168 232,180 C238,195 240,212 238,230 C235,250 228,270 220,288 C212,305 202,318 195,325 C188,330 182,328 178,320 C172,308 168,290 165,270 C162,250 160,228 162,210 C164,195 168,178 172,165 C175,158 178,150 180,148 Z" />
              <path d="M368,148 C378,142 392,140 405,142 C420,145 435,152 445,162 C452,172 455,185 452,200 C450,215 445,228 442,242 C438,258 432,275 428,290 C422,308 418,322 410,330 C400,340 390,342 382,338 C374,332 368,318 364,300 C358,280 355,258 352,240 C350,222 348,205 350,192 C352,180 356,168 362,158 C366,152 368,150 368,148 Z" />
              <path d="M442,185 C452,182 462,186 468,195 C472,205 470,215 465,220 C458,225 450,218 445,208 C442,200 442,192 442,185 Z" />
              <path d="M468,258 C475,255 480,260 482,272 C482,285 478,295 472,298 C466,300 462,290 462,278 C462,268 464,260 468,258 Z" />
              <path d="M375,32 C390,28 405,30 418,35 C428,38 436,44 440,52 C442,60 438,68 432,75 C428,80 422,85 418,88 C410,95 405,102 398,108 C390,115 382,120 375,118 C368,115 365,108 362,100 C358,88 355,78 358,68 C360,58 365,48 370,42 C373,36 375,34 375,32 Z" />
              <path d="M362,95 C356,90 352,98 350,108 C348,118 352,125 356,128 C360,130 364,122 365,112 C366,102 365,97 362,95 Z" />
              <path d="M358,78 C352,74 348,78 346,85 C346,92 350,98 355,100 C358,100 362,95 362,88 C362,82 360,80 358,78 Z" />
              <path d="M400,18 C405,12 415,10 422,15 C428,20 430,28 425,35 C420,40 412,42 405,38 C398,35 395,28 398,22 C400,18 400,18 400,18 Z" />
              <path d="M430,28 C460,20 500,15 540,18 C580,20 620,25 660,28 C695,32 720,40 730,52 C738,62 735,75 728,88 C720,100 708,108 695,115 C682,120 670,125 660,130 C648,138 640,148 635,160 C628,172 625,185 622,195 C618,210 615,220 610,225 C602,232 592,228 585,220 C578,210 572,198 565,188 C555,178 545,172 535,170 C520,165 505,162 492,160 C478,158 465,155 455,150 C445,145 438,138 432,128 C425,118 420,105 418,92 C415,78 418,62 422,48 C425,38 428,32 430,28 Z" />
              <path d="M545,158 C555,155 565,160 572,172 C578,185 582,200 580,215 C576,228 568,235 558,232 C548,228 542,218 536,205 C532,195 530,182 532,172 C534,165 538,160 545,158 Z" />
              <path d="M492,148 C502,142 515,140 525,145 C535,150 540,158 538,168 C535,178 525,182 515,180 C505,178 495,172 488,162 C484,155 486,150 492,148 Z" />
              <path d="M622,192 C635,188 648,192 658,202 C665,212 668,225 662,235 C655,245 645,248 635,242 C625,235 618,222 615,210 C613,202 615,195 622,192 Z" />
              <path d="M640,238 C655,232 668,238 675,250 C680,262 678,275 670,282 C662,288 652,285 645,275 C638,265 635,252 638,242 Z" />
              <path d="M672,275 C685,270 698,275 705,288 C708,300 705,312 698,318 C690,322 680,316 675,305 C670,295 668,285 672,275 Z" />
              <path d="M700,250 C710,245 720,248 725,258 C728,268 725,280 718,285 C710,288 702,282 698,272 C695,262 695,253 700,250 Z" />
              <path d="M718,95 C725,88 735,90 738,102 C740,115 735,128 728,135 C720,140 712,132 710,120 C708,108 710,98 718,95 Z" />
              <path d="M690,108 C695,102 702,105 704,115 C706,125 702,135 696,138 C690,140 685,132 684,122 C683,114 685,110 690,108 Z" />
              <path d="M622,288 C640,280 658,278 672,285 C685,292 695,305 698,320 C698,335 692,345 680,348 C665,350 648,345 635,335 C625,325 618,312 615,300 C613,292 616,290 622,288 Z" />
              <path d="M705,335 C710,328 715,332 716,342 C716,355 712,365 706,368 C702,370 698,362 698,352 C698,342 700,338 705,335 Z" />
              <path d="M422,48 C440,40 465,35 490,38 C500,40 505,45 500,52 C495,58 485,60 470,62 C452,65 435,62 422,55 C418,52 420,50 422,48 Z" />
              <path d="M555,222 C558,218 562,220 563,228 C562,235 558,238 555,236 C552,234 551,228 553,224 Z" />
              <path d="M650,165 C654,160 658,162 658,170 C657,178 652,182 648,180 C644,178 644,170 648,166 Z" />
              <path d="M660,198 C665,192 672,195 674,205 C675,215 670,225 664,228 C658,230 655,222 654,212 C653,204 655,200 660,198 Z" />
            </g>

            {/* ===== 中国出海链流 ===== */}
            <g className="route-group" fill="none" strokeWidth="1.5" strokeLinecap="round">
              {routes.map((r, i) => {
                const d = curvePath(r.from, r.to, r.curve);
                const cls = i % 3 === 0 ? "flow-path flow-path--gold"
                  : i % 3 === 1 ? "flow-path flow-path--teal"
                  : "flow-path flow-path--warm";
                const dash = (4 + (i % 2)) + " " + (5 + (i % 3));
                return <path key={i} className={cls} d={d} strokeDasharray={dash} />;
              })}
            </g>

            {/* 港口标签 */}
            <g fill="rgba(255,250,240,0.38)" fontSize="5.2" fontFamily="system-ui,sans-serif" textAnchor="middle">
              <text x={652} y={126} fontWeight="bold" fill="rgba(242,199,106,0.7)">{zh ? "上海" : "Shanghai"}</text>
              <text x={700} y={109}>{zh ? "东京" : "Tokyo"}</text>
              <text x={620} y={222}>{zh ? "新加坡" : "Singapore"}</text>
              <text x={535} y={168}>{zh ? "孟买" : "Mumbai"}</text>
              <text x={498} y={155}>{zh ? "迪拜" : "Dubai"}</text>
              <text x={388} y={90} >{zh ? "鹿特丹" : "Rotterdam"}</text>
              <text x={105} y={115}>{zh ? "洛杉矶" : "LA"}</text>
              <text x={422} y={342}>{zh ? "开普敦" : "Cape Town"}</text>
              <text x={678} y={316}>{zh ? "悉尼" : "Sydney"}</text>
              <text x={258} y={292}>{zh ? "桑托斯" : "Santos"}</text>
            </g>
          </svg>

          {/* 节点光点：中国三个港口用金色 */}
          <div className="globe-node globe-node--major" style={{ left:"81.5%", top:"33.5%" }} />
          <div className="globe-node globe-node--major" style={{ left:"80.0%", top:"38.0%" }} />
          <div className="globe-node globe-node--major" style={{ left:"82.2%", top:"33.0%" }} />
          <div className="globe-node" style={{ left:"87.5%", top:"29.0%" }} />
          <div className="globe-node" style={{ left:"77.5%", top:"52.0%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"66.9%", top:"43.8%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"62.2%", top:"40.5%" }} />
          <div className="globe-node" style={{ left:"48.5%", top:"24.5%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"13.1%", top:"30.5%" }} />
          <div className="globe-node" style={{ left:"52.8%", top:"82.0%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"84.8%", top:"75.5%" }} />
          <div className="globe-node" style={{ left:"32.2%", top:"69.5%" }} />
        </div>
      </div>

      <div className="globe-panel">
        <div className="globe-panel__text">
          <p>{zh ? "中国出海供应链 · AI 实时处理" : "China Outbound Supply Chain · AI Processing"}</p>
          <strong>{zh ? "12 条全球链路 → 路线 / 仓网 / 报告" : "12 global routes → Network / Report"}</strong>
        </div>
        <div className="globe-panel__metrics">
          <span>{zh ? "链路" : "Routes"}&nbsp;12</span>
          <span>{zh ? "目的港" : "Ports"}&nbsp;10</span>
          <span>{zh ? "覆盖" : "Cover"}&nbsp;6{zh ? "大洲" : "Cont."}</span>
        </div>
      </div>
    </div>
  );
}
