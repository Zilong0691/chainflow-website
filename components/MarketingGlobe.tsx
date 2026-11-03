"use client";
import {useEffect,useRef,useState} from 'react';

export type GlobeRisk={id:string;title:string;summary:string;topic:string;topicLabel:string;kind:string;place:string;lon:number;lat:number;publishedAt:string;source:string|null;level:string;flow?:'logistics'|'capital'|'information'};

// 仅为官网构造城市级示意点位，不读取供应网络的公司位置。
const cities=[[121.47,31.23],[114.06,22.55],[120.16,30.28],[116.4,39.9],[104.06,30.67],[139.69,35.68],[135.5,34.69],[126.98,37.56],[103.82,1.35],[100.5,13.75],[106.85,-6.2],[77.2,28.61],[55.27,25.2],[8.68,50.11],[2.35,48.86],[-.12,51.5],[-74,40.7],[-118.24,34.05],[151.2,-33.87],[-46.63,-23.55]];
// 多个制造与集散枢纽作为网络节点，弧线在节点之间互联，不汇聚到单一城市。
const HUBS:Record<string,[number,number]>={shanghai:[121.47,31.23],suzhou:[120.62,31.32],shenzhen:[114.06,22.55],taipei:[121.56,25.03],seoul:[126.98,37.56],tokyo:[139.69,35.68],singapore:[103.82,1.35],munich:[11.58,48.14],eindhoven:[5.47,51.44],austin:[-97.74,30.27],guadalajara:[-103.35,20.67]};

// 实物流：供应商与工厂、客户之间的实物跨区流转，可双向。
const GOODS:Array<[number,number]>[]=[
 [HUBS.taipei,HUBS.shanghai],[HUBS.seoul,HUBS.suzhou],[HUBS.tokyo,HUBS.shenzhen],
 [HUBS.singapore,HUBS.shenzhen],[HUBS.shanghai,HUBS.munich],[HUBS.shenzhen,HUBS.singapore],
 [HUBS.munich,HUBS.eindhoven],[HUBS.austin,HUBS.guadalajara],[HUBS.shanghai,HUBS.austin],
 [HUBS.taipei,HUBS.shenzhen],[HUBS.eindhoven,HUBS.suzhou]
];
// 资金流：下游向上游结算，方向与实物流相反。
const CAPITAL:Array<[number,number]>[]=[
 [HUBS.shanghai,HUBS.taipei],[HUBS.suzhou,HUBS.seoul],[HUBS.shenzhen,HUBS.tokyo],
 [HUBS.shenzhen,HUBS.singapore],[HUBS.munich,HUBS.shanghai],[HUBS.guadalajara,HUBS.austin],
 [HUBS.eindhoven,HUBS.munich]
];
// 信息流：订单、交期、质量与变更协同，双向互通。
const INFORMATION:Array<[number,number]>[]=[
 [HUBS.shanghai,HUBS.suzhou],[HUBS.suzhou,HUBS.shenzhen],[HUBS.shenzhen,HUBS.taipei],
 [HUBS.munich,HUBS.eindhoven],[HUBS.austin,HUBS.munich],[HUBS.shanghai,HUBS.singapore],
 [HUBS.singapore,HUBS.eindhoven]
];

function buildArcs(){
 const make=(list:Array<[number,number]>[],color:string,opacity:number)=>list.map(([from,to])=>({color,from,to,opacity}));
 return [
  ...make(GOODS,'#2A76BB',.42),
  ...make(CAPITAL,'#E9C46A',.38),
  ...make(INFORMATION,'#2EC4B6',.34)
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
    points:Object.values(HUBS).map(([lon,lat],i)=>({id:'public-city-'+i,supplierId:'fictional-'+i,company:'',lon,lat,coordinateSystem:'WGS84',kind:i%3?'office':'factory',verified:true})),
    reference:{lon:HUBS.shanghai[0],lat:HUBS.shanghai[1],coordinateSystem:'WGS84'},
    scrollZoom:false,
    layers:{heat:false,scatter:true,pulse:true,links:true},
    chainArcs:buildArcs(),
    riskPoints:riskRef.current.map(r=>({id:r.id,lon:r.lon,lat:r.lat,level:r.level,color:r.level==='important'?'#C1272D':'#D4764E'})),
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
  e.setRisks?.(risks.map(r=>({id:r.id,lon:r.lon,lat:r.lat,level:r.level,color:r.level==='important'?'#C1272D':'#D4764E'})));
 }, [risks]);

 return <div className="cf-globe-wrap" data-risks={risks.length}>
  <div ref={host} className="cf-globe" data-testid="marketing-globe"/>
  {failed&&<img className="cf-earth-fallback" src="/earth-surface.jpg" alt={lang==='zh'?'地球表面参照图':'Earth surface reference'}/>}
  <div className="cf-globe-actions">
   <button onClick={()=>{engine.current?.motion();setRunning(!running);}} aria-label={lang==='zh'?(running?'暂停地球自转':'继续地球自转'):(running?'Pause rotation':'Resume rotation')}>{running?'Ⅱ':'▷'}</button>
   <button onClick={()=>engine.current?.global()} aria-label={lang==='zh'?'复位地球':'Reset globe'}>↺</button>
  </div>
  <div className="cf-globe-legend" aria-hidden="true">
   <span><i style={{background:'#2A76BB'}}/>{lang==='zh'?'实物流':'Physical flow'}</span>
   <span><i style={{background:'#E9C46A'}}/>{lang==='zh'?'资金流':'Capital flow'}</span>
   <span><i style={{background:'#2EC4B6'}}/>{lang==='zh'?'信息流':'Information flow'}</span>
   <span className="is-risk"><i className="ring-red"/>{lang==='zh'?'系统性供应链风险':'Systemic supply risk'}</span>
   <span className="is-risk"><i className="ring-amber"/>{lang==='zh'?'局部履约与物流风险':'Local fulfillment risk'}</span>
  </div>
  <p className="cf-earth-credit">NASA Blue Marble <span>· {lang==='zh'?'城市与连线为示意':'Cities and links are illustrative'}</span></p>
 </div>;
}
