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
          <h1 className="text-[clamp(1.62rem,6vw,4.5rem)] font-semibold leading-[1.12] text-rice md:text-7xl md:leading-[1.08]">
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
   GlobeFlowVisual — 旋转地球 + 真实大陆 + 全球航运路线
   世界地图: 800×400 equirectangular 投影
   ============================================= */
function GlobeFlowVisual({ lang }: { lang: Language }) {
  const zh = lang === "zh";

  /* 全球主要港口坐标 (800×400 空间) */
  const ports = {
    shanghai:    { x: 650, y: 135 },
    singapore:   { x: 622, y: 210 },
    tokyo:       { x: 695, y: 118 },
    busan:       { x: 675, y: 125 },
    hongkong:    { x: 640, y: 155 },
    dubai:       { x: 498, y: 165 },
    rotterdam:   { x: 388, y: 100 },
    losangeles:  { x: 110, y: 125 },
    newyork:     { x: 200, y: 110 },
    capetown:    { x: 425, y: 330 },
    sydney:      { x: 675, y: 305 },
    santos:      { x: 260, y: 280 },
    mombasa:     { x: 460, y: 235 },
    mumbai:      { x: 535, y: 178 },
    london:      { x: 370, y: 92 },
  };

  /* 航运路线定义: [起点, 终点, 弯曲方向, 弯曲程度] */
  const routes = [
    { from: ports.shanghai, to: ports.singapore, curve: 0.15 },
    { from: ports.singapore, to: ports.dubai, curve: -0.12 },
    { from: ports.dubai, to: ports.rotterdam, curve: 0.18 },
    { from: ports.shanghai, to: ports.losangeles, curve: 0.28 },
    { from: ports.shanghai, to: ports.tokyo, curve: 0.08 },
    { from: ports.singapore, to: ports.capetown, curve: -0.14 },
    { from: ports.capetown, to: ports.santos, curve: -0.22 },
    { from: ports.rotterdam, to: ports.newyork, curve: -0.16 },
    { from: ports.shanghai, to: ports.sydney, curve: 0.10 },
    { from: ports.dubai, to: ports.mombasa, curve: 0.08 },
    { from: ports.singapore, to: ports.hongkong, curve: 0.06 },
    { from: ports.losangeles, to: ports.newyork, curve: -0.12 },
  ];

  /* 生成弯曲路径 */
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
      {/* 大气光晕 */}
      <div className="globe-atmosphere" />

      {/* 地球球体 */}
      <div className="globe-sphere">
        {/* 经纬线网格 */}
        <div className="globe-grid" />

        {/* 旋转内容层 */}
        <div className="globe-contents">
          <svg className="globe-map" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            {/* ===== 大陆轮廓 ===== */}
            <g className="continent-group" fill="rgba(31,143,132,0.32)" stroke="rgba(117,212,203,0.20)" strokeWidth="0.6">
              {/* 北美洲 */}
              <path d="M 82,22 C 100,18 125,17 150,20 C 175,22 200,25 220,28
                       C 238,32 255,38 262,48 C 268,56 264,68 256,80
                       C 248,90 240,100 235,112 C 230,125 228,135 222,142
                       C 216,148 208,150 200,148 C 192,145 188,140 182,138
                       C 175,135 168,138 162,142 C 155,146 148,148 140,146
                       C 132,144 125,136 118,126 C 110,116 100,105 92,95
                       C 84,85 75,72 68,60 C 60,48 55,35 60,28
                       C 68,18 75,20 82,22 Z" />

              {/* 南美洲 */}
              <path d="M 180,148 C 188,145 198,148 208,152 C 218,158 228,168 232,180
                       C 238,195 240,212 238,230 C 235,250 228,270 220,288
                       C 212,305 202,318 195,325 C 188,330 182,328 178,320
                       C 172,308 168,290 165,270 C 162,250 160,228 162,210
                       C 164,195 168,178 172,165 C 175,158 178,150 180,148 Z" />

              {/* 非洲 */}
              <path d="M 368,148 C 378,142 392,140 405,142 C 420,145 435,152 445,162
                       C 452,172 455,185 452,200 C 450,215 445,228 442,242
                       C 438,258 432,275 428,290 C 422,308 418,322 410,330
                       C 400,340 390,342 382,338 C 374,332 368,318 364,300
                       C 358,280 355,258 352,240 C 350,222 348,205 350,192
                       C 352,180 356,168 362,158 C 366,152 368,150 368,148 Z" />
              {/* 非洲之角 */}
              <path d="M 442,185 C 452,182 462,186 468,195 C 472,205 470,215 465,220
                       C 458,225 450,218 445,208 C 442,200 442,192 442,185 Z" />
              {/* 马达加斯加 */}
              <path d="M 468,258 C 475,255 480,260 482,272 C 482,285 478,295 472,298
                       C 466,300 462,290 462,278 C 462,268 464,260 468,258 Z" />

              {/* 欧洲 */}
              <path d="M 375,32 C 390,28 405,30 418,35 C 428,38 436,44 440,52
                       C 442,60 438,68 432,75 C 428,80 422,85 418,88
                       C 410,95 405,102 398,108 C 390,115 382,120 375,118
                       C 368,115 365,108 362,100 C 358,88 355,78 358,68
                       C 360,58 365,48 370,42 C 373,36 375,34 375,32 Z" />
              {/* 伊比利亚半岛 */}
              <path d="M 362,95 C 356,90 352,98 350,108 C 348,118 352,125 356,128
                       C 360,130 364,122 365,112 C 366,102 365,97 362,95 Z" />
              {/* 不列颠群岛 */}
              <path d="M 358,78 C 352,74 348,78 346,85 C 346,92 350,98 355,100
                       C 358,100 362,95 362,88 C 362,82 360,80 358,78 Z" />
              {/* 斯堪的纳维亚 */}
              <path d="M 400,18 C 405,12 415,10 422,15 C 428,20 430,28 425,35
                       C 420,40 412,42 405,38 C 398,35 395,28 398,22 C 400,18 400,18 400,18 Z" />

              {/* 亚洲主体 */}
              <path d="M 430,28 C 460,20 500,15 540,18 C 580,20 620,25 660,28
                       C 695,32 720,40 730,52 C 738,62 735,75 728,88
                       C 720,100 708,108 695,115 C 682,120 670,125 660,130
                       C 648,138 640,148 635,160 C 628,172 625,185 622,195
                       C 618,210 615,220 610,225 C 602,232 592,228 585,220
                       C 578,210 572,198 565,188 C 555,178 545,172 535,170
                       C 520,165 505,162 492,160 C 478,158 465,155 455,150
                       C 445,145 438,138 432,128 C 425,118 420,105 418,92
                       C 415,78 418,62 422,48 C 425,38 428,32 430,28 Z" />
              {/* 印度次大陆 */}
              <path d="M 545,158 C 555,155 565,160 572,172 C 578,185 582,200 580,215
                       C 576,228 568,235 558,232 C 548,228 542,218 536,205
                       C 532,195 530,182 532,172 C 534,165 538,160 545,158 Z" />
              {/* 阿拉伯半岛 */}
              <path d="M 492,148 C 502,142 515,140 525,145 C 535,150 540,158 538,168
                       C 535,178 525,182 515,180 C 505,178 495,172 488,162
                       C 484,155 486,150 492,148 Z" />
              {/* 东南亚 */}
              <path d="M 622,192 C 635,188 648,192 658,202 C 665,212 668,225 662,235
                       C 655,245 645,248 635,242 C 625,235 618,222 615,210
                       C 613,202 615,195 622,192 Z" />
              {/* 东南亚群岛 */}
              <path d="M 640,238 C 655,232 668,238 675,250 C 680,262 678,275 670,282
                       C 662,288 652,285 645,275 C 638,265 635,252 638,242 Z" />
              <path d="M 672,275 C 685,270 698,275 705,288 C 708,300 705,312 698,318
                       C 690,322 680,316 675,305 C 670,295 668,285 672,275 Z" />
              <path d="M 700,250 C 710,245 720,248 725,258 C 728,268 725,280 718,285
                       C 710,288 702,282 698,272 C 695,262 695,253 700,250 Z" />
              {/* 日本列岛 */}
              <path d="M 718,95 C 725,88 735,90 738,102 C 740,115 735,128 728,135
                       C 720,140 712,132 710,120 C 708,108 710,98 718,95 Z" />
              {/* 朝鲜半岛 */}
              <path d="M 690,108 C 695,102 702,105 704,115 C 706,125 702,135 696,138
                       C 690,140 685,132 684,122 C 683,114 685,110 690,108 Z" />

              {/* 澳大利亚 */}
              <path d="M 622,288 C 640,280 658,278 672,285 C 685,292 695,305 698,320
                       C 698,335 692,345 680,348 C 665,350 648,345 635,335
                       C 625,325 618,312 615,300 C 613,292 616,290 622,288 Z" />
              {/* 新西兰 */}
              <path d="M 705,335 C 710,328 715,332 716,342 C 716,355 712,365 706,368
                       C 702,370 698,362 698,352 C 698,342 700,338 705,335 Z" />

              {/* 中亚 */}
              <path d="M 422,48 C 440,40 465,35 490,38 C 500,40 505,45 500,52
                       C 495,58 485,60 470,62 C 452,65 435,62 422,55 C 418,52 420,50 422,48 Z" />

              {/* 斯里兰卡 */}
              <path d="M 555,222 C 558,218 562,220 563,228 C 562,235 558,238 555,236
                       C 552,234 551,228 553,224 Z" />

              {/* 台湾 & 菲律宾 */}
              <path d="M 650,165 C 654,160 658,162 658,170 C 657,178 652,182 648,180
                       C 644,178 644,170 648,166 Z" />
              <path d="M 660,198 C 665,192 672,195 674,205 C 675,215 670,225 664,228
                       C 658,230 655,222 654,212 C 653,204 655,200 660,198 Z" />
            </g>

            {/* ===== 全球航运路线 ===== */}
            <g className="route-group" fill="none" strokeWidth="1.3" strokeLinecap="round">
              {routes.map((r, i) => {
                const d = curvePath(r.from, r.to, r.curve);
                const cls = i % 4 === 0 ? "flow-path flow-path--gold"
                  : i % 4 === 1 ? "flow-path flow-path--teal"
                  : i % 4 === 2 ? "flow-path flow-path--warm"
                  : "flow-path flow-path--cool";
                const dash = (3 + (i % 3)) + " " + (4 + (i % 4));
                return <path key={i} className={cls} d={d} strokeDasharray={dash} />;
              })}
            </g>

            {/* ===== 港口城市标签 ===== */}
            <g className="port-labels" fill="rgba(255,250,240,0.35)" fontSize="5.5" fontFamily="system-ui,sans-serif" textAnchor="middle">
              <text x={650} y={128}>{zh ? "上海" : "Shanghai"}</text>
              <text x={622} y={224}>{zh ? "新加坡" : "Singapore"}</text>
              <text x={695} y={110}>{zh ? "东京" : "Tokyo"}</text>
              <text x={505} y={158}>{zh ? "迪拜" : "Dubai"}</text>
              <text x={378} y={92}  >{zh ? "鹿特丹" : "Rotterdam"}</text>
              <text x={115} y={118}>{zh ? "洛杉矶" : "LA"}</text>
              <text x={205} y={103}>{zh ? "纽约" : "New York"}</text>
              <text x={422} y={345}>{zh ? "开普敦" : "Cape Town"}</text>
              <text x={678} y={320}>{zh ? "悉尼" : "Sydney"}</text>
            </g>
          </svg>

          {/* 枢纽节点光点 */}
          <div className="globe-node globe-node--major" style={{ left:"81.2%", top:"33.8%" }} />
          <div className="globe-node" style={{ left:"77.8%", top:"52.5%" }} />
          <div className="globe-node" style={{ left:"86.9%", top:"29.5%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"62.2%", top:"41.2%" }} />
          <div className="globe-node" style={{ left:"48.5%", top:"25.0%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"13.8%", top:"31.2%" }} />
          <div className="globe-node" style={{ left:"25.0%", top:"27.5%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"53.1%", top:"82.5%" }} />
          <div className="globe-node" style={{ left:"84.4%", top:"76.2%" }} />
          <div className="globe-node globe-node--teal" style={{ left:"32.5%", top:"70.0%" }} />
          <div className="globe-node" style={{ left:"63.1%", top:"43.8%" }} />
        </div>
      </div>

      {/* 底部面板 */}
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
