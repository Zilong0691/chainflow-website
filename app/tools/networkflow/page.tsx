"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================
   NetworkFlow Next.js — 阶段 7 MVP
   ============================================ */

const D = {
  summary: { candidates:5, demandCities:386 },
  scenarios: [
    { id:"balanced", name:"均衡方案", sites:["芜湖","开封"], coverage:0.89, cost:95000, desc:"两仓 89% 覆盖，月成本 ¥9.5 万" },
    { id:"service", name:"服务优先", sites:["芜湖","福州","重庆"], coverage:0.94, cost:152000, desc:"三仓 94% 覆盖，月成本 ¥15.2 万" },
    { id:"cost", name:"成本优先", sites:["开封"], coverage:0.72, cost:45000, desc:"单仓最低成本，72% 覆盖" }
  ],
  sites: [
    { id:"WH001", name:"芜湖", lat:31.35, lng:118.43, selected:true, orders:145, util:0.73, avgKm:218, color:"#f2c76a",
      cities:["上海","杭州","南京","合肥","苏州","无锡","宁波","扬州","南通","温州","徐州","金华","黄山"] },
    { id:"WH002", name:"开封", lat:34.80, lng:114.31, selected:true, orders:176, util:0.98, avgKm:312, color:"#75d4cb",
      cities:["郑州","西安","济南","石家庄","太原","洛阳","邯郸","保定","菏泽","临沂","泰安"] },
    { id:"WH003", name:"福州", lat:26.07, lng:119.30, selected:false, orders:88, util:0.59, avgKm:185, color:"#d7b15d",
      cities:["福州","厦门","泉州","漳州","龙岩","汕头","梅州"] },
    { id:"WH004", name:"广州", lat:23.13, lng:113.26, selected:false, orders:65, util:0.43, avgKm:156, color:"#e8a87c",
      cities:["广州","深圳","东莞","佛山","中山","珠海","惠州"] },
    { id:"WH005", name:"重庆", lat:29.56, lng:106.55, selected:false, orders:72, util:0.48, avgKm:245, color:"#c4a35a",
      cities:["重庆","成都","绵阳","南充","泸州","宜宾","乐山"] }
  ],
  uncovered: ["拉萨","乌鲁木齐","呼和浩特","哈尔滨","昆明","贵阳","南宁","海口","西宁","银川"]
};

export default function NetworkFlowPage() {
  const [scenario, setScenario] = useState("balanced");
  const [showExport, setShowExport] = useState(false);
  const cur = D.scenarios.find(s=>s.id===scenario) || D.scenarios[0];

  return (
    <main className="flex h-svh flex-col bg-graphite text-rice">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rice/10 bg-graphite/90 px-3 py-2 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <a href="/#skills" className="text-rice/40 hover:text-gold">← 返回</a>
          <span className="font-semibold text-rice">NetworkFlow</span>
          <span className="text-rice/30">仓网选址评估</span>
        </div>
        <div className="flex items-center gap-3 text-rice/45">
          <span>{cur.sites.length}推荐仓 · {Math.round(cur.coverage*100)}%覆盖 · ¥{(cur.cost/10000).toFixed(1)}万/月</span>
          <button onClick={()=>setShowExport(!showExport)} className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-gold hover:bg-gold/20">导出 JSON</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <div className="flex-1 min-h-0 relative">
          <NFMap sites={D.sites} scenario={scenario} />
        </div>

        <div className="flex flex-col border-t border-rice/10 bg-[#0b100d] lg:w-[400px] lg:border-l lg:border-t-0">
          <div className="flex border-b border-rice/10 text-xs">
            {D.scenarios.map(s=>(
              <button key={s.id} onClick={()=>setScenario(s.id)}
                className={`flex-1 py-2.5 transition ${scenario===s.id?"bg-gold/15 text-gold border-b-2 border-gold":"text-rice/50 hover:text-rice/80"}`}>{s.name}</button>
            ))}
          </div>
          <div className="border-b border-rice/10 px-3 py-2.5 text-xs">
            <p className="text-rice/70">{cur.desc}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Stat label="推荐仓点" val={cur.sites.length} />
              <Stat label="覆盖率" val={`${Math.round(cur.coverage*100)}%`} />
              <Stat label="月成本" val={`¥${(cur.cost/10000).toFixed(1)}万`} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {D.sites.filter(w=>cur.sites.includes(w.name)).map(w=>(
              <div key={w.id} className="border-b border-rice/5 px-3 py-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-rice">{w.name}</span>
                  <span className="rounded-full px-2 py-0.5 text-xs bg-gold/15 text-gold">推荐</span>
                </div>
                <div className="mt-1.5 flex gap-3 text-rice/45">
                  <span>{w.orders}单</span><span>{Math.round(w.util*100)}%利用率</span><span>{w.avgKm}km均距</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {w.cities.slice(0,8).map(c=><span key={c} className="rounded border border-rice/10 px-1.5 py-0.5 text-rice/35" style={{fontSize:10}}>{c}</span>)}
                </div>
              </div>
            ))}
            <div className="px-3 py-2.5 text-xs">
              <p className="text-rice/30 mb-1.5">暂未覆盖 ({D.uncovered.length}城)</p>
              <div className="flex flex-wrap gap-1">
                {D.uncovered.map(c=><span key={c} className="rounded border border-rice/10 px-1.5 py-0.5 text-rice/25" style={{fontSize:10}}>{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExport&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={()=>setShowExport(false)}>
          <div className="max-h-[80vh] w-[90vw] max-w-2xl overflow-auto rounded-xl border border-rice/10 bg-graphite p-4" onClick={e=>e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between"><p className="text-sm font-medium text-gold">结构化结果</p><button onClick={()=>setShowExport(false)} className="text-rice/40 hover:text-rice">✕</button></div>
            <pre className="text-xs text-rice/60 max-h-[60vh] overflow-auto whitespace-pre-wrap">{JSON.stringify({scenario:cur,sites:D.sites,exportedAt:new Date().toISOString()},null,2)}</pre>
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({label,val}:{label:string;val:any}){return <div className="rounded bg-rice/[0.04] p-2 text-center"><span className="block text-lg font-bold text-rice">{val}</span><span className="text-rice/35">{label}</span></div>}

function NFMap({sites,scenario}:{sites:any[];scenario:string}){
  const mRef=useRef<any>(null), cRef=useRef<HTMLDivElement>(null), lRef=useRef<any[]>([]);
  const sel=D.scenarios.find(s=>s.id===scenario)?.sites||[];
  const upd=useCallback(()=>{
    const L=(window as any).L, m=mRef.current; if(!L||!m)return;
    lRef.current.forEach((l:any)=>m.removeLayer(l)); lRef.current=[];
    sites.forEach((w:any)=>{
      const is=sel.includes(w.name), r=is?280:180;
      lRef.current.push(L.circle([w.lat,w.lng],{radius:r*1000,color:w.color,weight:is?2:0.5,opacity:is?.25:.06,fillColor:w.color,fillOpacity:is?.10:.02}).addTo(m));
      const ic=L.divIcon({html:`<div style="width:${is?12:7}px;height:${is?12:7}px;border-radius:50%;background:${w.color};border:2px solid #fff;box-shadow:0 0 ${is?8:3}px ${w.color}"></div>`,className:"",iconSize:[is?12:7,is?12:7],iconAnchor:[is?6:3,is?6:3]});
      lRef.current.push(L.marker([w.lat,w.lng],{icon:ic}).addTo(m).bindTooltip(`${w.name}${is?" ✓":""}`));
      if(is&&w.cities) w.cities.slice(0,15).forEach((_:string,i:number)=>{lRef.current.push(L.circleMarker([w.lat+(Math.random()-.5)*2.2,w.lng+(Math.random()-.5)*3.2],{radius:2,color:w.color,fillColor:w.color,fillOpacity:.4,weight:.5}).addTo(m))});
    });
    try{const p=sites.map((w:any)=>[w.lat,w.lng]);if(p.length)m.fitBounds(L.latLngBounds(p),{padding:[30,30]})}catch(e){}
  },[sites,scenario,sel]);

  useEffect(()=>{
    if(typeof window==="undefined")return;
    if(!(window as any).L){
      const lk=document.createElement("link");lk.rel="stylesheet";lk.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(lk);
      const sc=document.createElement("script");sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";sc.onload=()=>{const L=(window as any).L;mRef.current=L.map(cRef.current,{center:[32,113],zoom:5,zoomControl:true,attributionControl:false});L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18}).addTo(mRef.current);upd()};document.head.appendChild(sc);
    }else if(!mRef.current){const L=(window as any).L;mRef.current=L.map(cRef.current,{center:[32,113],zoom:5,zoomControl:true,attributionControl:false});L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18}).addTo(mRef.current);upd()}
  },[]);
  useEffect(()=>{if(mRef.current&&(window as any).L)upd()},[scenario,upd]);
  return <div ref={cRef} className="h-full w-full bg-[#0d1512]"/>;
}
