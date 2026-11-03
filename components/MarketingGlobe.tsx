"use client";
import {useEffect,useRef,useState} from 'react';

export type GlobeRisk={id:string;title:string;summary:string;topic:string;topicLabel:string;kind:string;place:string;lon:number;lat:number;publishedAt:string;source:string|null;level:string};

// 仅为官网构造城市级示意点位，不读取供应网络的公司位置。
const cities=[[121.47,31.23],[114.06,22.55],[120.16,30.28],[116.4,39.9],[104.06,30.67],[139.69,35.68],[135.5,34.69],[126.98,37.56],[103.82,1.35],[100.5,13.75],[106.85,-6.2],[77.2,28.61],[55.27,25.2],[8.68,50.11],[2.35,48.86],[-.12,51.5],[-74,40.7],[-118.24,34.05],[151.2,-33.87],[-46.63,-23.55]];

export function MarketingGlobe({lang,risks=[],activeId='',onPick}:{lang:'zh'|'en';risks?:GlobeRisk[];activeId?:string;onPick?:(id:string)=>void}){
 const host=useRef<HTMLDivElement>(null),engine=useRef<any>(null);
 const [failed,setFailed]=useState(false);
 const [running,setRunning]=useState(true);
 const [hover,setHover]=useState<string>('');

 useEffect(()=>{
  let active=true;
  const url='/marketing/globe-engine.js';
  Promise.all([import(/* webpackIgnore: true */ url),fetch('/world-land.geojson').then(r=>r.json())]).then(([module,land])=>{
   if(!active||!host.current)return;
   engine.current=module.mountGlobe({
    host:host.current,
    land,
    points:cities.map(([lon,lat],i)=>({id:'public-city-'+i,supplierId:'fictional-'+i,company:'',lon,lat,coordinateSystem:'WGS84',kind:i%3?'office':'factory',verified:true})),
    reference:{lon:121.47,lat:31.23,coordinateSystem:'WGS84'},
    scrollZoom:false,
    layers:{heat:false,scatter:true,pulse:true,links:true},
    riskRegions:risks.map(r=>({lon:r.lon,lat:r.lat})),
    onView:(view:any)=>{if(host.current)host.current.dataset.globeView=JSON.stringify(view);},
    onError:()=>setFailed(true)
   });
   const canvas=host.current.querySelector('canvas');
   if(canvas)canvas.style.touchAction='pan-y';
  }).catch(()=>setFailed(true));
  return()=>{active=false;engine.current?.dispose();engine.current=null;};
 },[]);

 // 风险点随数据集变化重建，保持与地球几何一致。
 useEffect(()=>{
  const el=host.current;
  if(!el||!engine.current)return;
  const canvas=el.querySelector('canvas');
  if(canvas)canvas.style.touchAction='pan-y';
 },[risks.length]);

 return <div className="cf-globe-wrap" data-risks={risks.length}>
  <div ref={host} className="cf-globe" data-testid="marketing-globe">
   {risks.map((r,i)=><span key={r.id} className={'cf-risk-pin'+(activeId===r.id?' is-active':'')} data-globe-risk={i} data-topic={r.topic} onMouseEnter={()=>setHover(r.id)} onMouseLeave={()=>setHover('')} onClick={()=>onPick?.(r.id)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onPick?.(r.id);}}} aria-label={r.title}>
    <span className="cf-risk-pin-dot"/>
    {hover===r.id&&<span className="cf-risk-tip" role="tooltip"><b>{r.title}</b><small>{r.topicLabel} · {r.kind}</small><em>{r.place}</em></span>}
   </span>)}
  </div>
  {failed&&<img className="cf-earth-fallback" src="/earth-surface.jpg" alt={lang==='zh'?'地球表面参照图':'Earth surface reference'}/>}
  <div className="cf-globe-actions">
   <button onClick={()=>{engine.current?.motion();setRunning(!running);}} aria-label={lang==='zh'?(running?'暂停地球自转':'继续地球自转'):(running?'Pause rotation':'Resume rotation')}>{running?'Ⅱ':'▷'}</button>
   <button onClick={()=>engine.current?.global()} aria-label={lang==='zh'?'复位地球':'Reset globe'}>↺</button>
  </div>
  <p className="cf-earth-credit">NASA Blue Marble <span>· {lang==='zh'?'城市示意':'City references'}</span></p>
 </div>;
}
