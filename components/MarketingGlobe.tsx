"use client";
import {useEffect,useRef,useState} from 'react';

export type GlobeRisk={id:string;title:string;summary:string;topic:string;topicLabel:string;kind:string;place:string;lon:number;lat:number;publishedAt:string;source:string|null;level:string};

// 仅为官网构造城市级示意点位，不读取供应网络的公司位置。
const cities=[[121.47,31.23],[114.06,22.55],[120.16,30.28],[116.4,39.9],[104.06,30.67],[139.69,35.68],[135.5,34.69],[126.98,37.56],[103.82,1.35],[100.5,13.75],[106.85,-6.2],[77.2,28.61],[55.27,25.2],[8.68,50.11],[2.35,48.86],[-.12,51.5],[-74,40.7],[-118.24,34.05],[151.2,-33.87],[-46.63,-23.55]];
const BASE:[number,number]=[121.47,31.23];

// 三链各取若干条示意弧线：同一批城市按不同配对方式表达物流、资金与信息的流向。
function chainArcs(){
 const pick=(step:number,offset:number)=>cities.filter((_,i)=>(i+offset)%step===0).slice(0,7);
 const logistics=pick(3,0),capital=pick(4,1),information=pick(5,2);
 return [
  ...logistics.map(([lon,lat])=>({chain:'logistics',color:'#4ea8ff',from:[lon,lat] as [number,number],to:BASE,opacity:.5})),
  ...capital.map(([lon,lat])=>({chain:'capital',color:'#f0c674',from:[lon,lat] as [number,number],to:BASE,opacity:.42})),
  ...information.map(([lon,lat])=>({chain:'information',color:'#5fd6c4',from:[lon,lat] as [number,number],to:BASE,opacity:.46}))
 ];
}

export function MarketingGlobe({lang,risks=[],activeId='',onPick,hoverId='',onHover,onOpen}:{lang:'zh'|'en';risks?:GlobeRisk[];activeId?:string;onPick?:(id:string)=>void;hoverId?:string;onHover?:(id:string)=>void;onOpen?:()=>void}){
 const host=useRef<HTMLDivElement>(null),engine=useRef<any>(null);
 const [failed,setFailed]=useState(false);
 const [running,setRunning]=useState(true);
 const riskRef=useRef<GlobeRisk[]>(risks);riskRef.current=risks;

 useEffect(()=>{
  let active=true;
  const url='/marketing/globe-engine.js';
  Promise.all([import(/* webpackIgnore: true */ url),fetch('/world-land.geojson').then(r=>r.json())]).then(([module,land])=>{
   if(!active||!host.current)return;
   engine.current=module.mountGlobe({
    host:host.current,
    land,
    points:cities.map(([lon,lat],i)=>({id:'public-city-'+i,supplierId:'fictional-'+i,company:'',lon,lat,coordinateSystem:'WGS84',kind:i%3?'office':'factory',verified:true})),
    reference:{lon:BASE[0],lat:BASE[1],coordinateSystem:'WGS84'},
    scrollZoom:false,
    layers:{heat:false,scatter:true,pulse:true,links:true},
    chainArcs:chainArcs(),
    riskPoints:riskRef.current.map(r=>({id:r.id,lon:r.lon,lat:r.lat,level:r.level,color:r.level==='important'?'#ff5a4d':'#ff9a5c'})),
    onView:(view:any)=>{if(host.current)host.current.dataset.globeView=JSON.stringify(view);},
    onRiskHover:(id:string)=>onHover?.(id),
    onRiskSelect:(id:string)=>{onPick?.(id);onOpen?.();},
    onSelect:()=>onOpen?.(),
    onError:()=>setFailed(true)
   });
   const canvas=host.current.querySelector('canvas');
   if(canvas)canvas.style.touchAction='pan-y';
  }).catch(()=>setFailed(true));
  return()=>{active=false;engine.current?.dispose();engine.current=null;};
 },[]);

 // 风险数据到达后重建图形，保持圆环与数据集一致。
 useEffect(()=>{
  const e=engine.current;
  if(!e||!host.current)return;
  e.setRisks?.(risks.map(r=>({id:r.id,lon:r.lon,lat:r.lat,level:r.level,color:r.level==='important'?'#ff5a4d':'#ff9a5c'})));
 }, [risks]);

 return <div className="cf-globe-wrap" data-risks={risks.length}>
  <div ref={host} className="cf-globe" data-testid="marketing-globe"/>
  {failed&&<img className="cf-earth-fallback" src="/earth-surface.jpg" alt={lang==='zh'?'地球表面参照图':'Earth surface reference'}/>}
  <div className="cf-globe-actions">
   <button onClick={()=>{engine.current?.motion();setRunning(!running);}} aria-label={lang==='zh'?(running?'暂停地球自转':'继续地球自转'):(running?'Pause rotation':'Resume rotation')}>{running?'Ⅱ':'▷'}</button>
   <button onClick={()=>engine.current?.global()} aria-label={lang==='zh'?'复位地球':'Reset globe'}>↺</button>
  </div>
  <div className="cf-globe-legend" aria-hidden="true">
   <span><i style={{background:'#4ea8ff'}}/>{lang==='zh'?'物流':'Logistics'}</span>
   <span><i style={{background:'#f0c674'}}/>{lang==='zh'?'资金':'Capital'}</span>
   <span><i style={{background:'#5fd6c4'}}/>{lang==='zh'?'信息':'Information'}</span>
   <span><i style={{background:'#ff5a4d',borderRadius:0}}/>{lang==='zh'?'风险事件':'Risk events'}</span>
  </div>
  <p className="cf-earth-credit">NASA Blue Marble <span>· {lang==='zh'?'城市与连线为示意':'Cities and links are illustrative'}</span></p>
 </div>;
}
