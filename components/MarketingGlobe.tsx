"use client";
import {useEffect,useRef,useState} from 'react';

export type GlobeRisk={id:string;title:string;summary:string;topic:string;topicLabel:string;kind:string;place:string;lon:number;lat:number;publishedAt:string;source:string|null;level:string;flow?:'goods'|'capital'|'information'};

// 全球供应链枢纽：制造、集散与客户端节点，均为示意。
const HUBS:Array<{name:string;lat:number;lng:number;size:number}>=[
 {name:'上海',lat:31.23,lng:121.47,size:.42},{name:'苏州',lat:31.32,lng:120.62,size:.36},
 {name:'深圳',lat:22.55,lng:114.06,size:.42},{name:'台北',lat:25.03,lng:121.56,size:.34},
 {name:'首尔',lat:37.56,lng:126.98,size:.32},{name:'东京',lat:35.68,lng:139.69,size:.34},
 {name:'新加坡',lat:1.35,lng:103.82,size:.36},{name:'慕尼黑',lat:48.14,lng:11.58,size:.34},
 {name:'埃因霍温',lat:51.44,lng:5.47,size:.28},{name:'奥斯汀',lat:30.27,lng:-97.74,size:.34},
 {name:'瓜达拉哈拉',lat:20.67,lng:-103.35,size:.28}
];
const byName=(n:string)=>HUBS.find(h=>h.name===n)!;

// 三流弧线：节点之间互联，不汇聚单点。
const GOODS:[string,string][]=[['台北','上海'],['首尔','苏州'],['东京','深圳'],['新加坡','深圳'],['上海','慕尼黑'],['深圳','新加坡'],['慕尼黑','埃因霍温'],['奥斯汀','瓜达拉哈拉'],['上海','奥斯汀'],['台北','深圳'],['埃因霍温','苏州']];
const CAPITAL:[string,string][]=[['上海','台北'],['苏州','首尔'],['深圳','东京'],['深圳','新加坡'],['慕尼黑','上海'],['瓜达拉哈拉','奥斯汀'],['埃因霍温','慕尼黑']];
const INFORMATION:[string,string][]=[['上海','苏州'],['苏州','深圳'],['深圳','台北'],['慕尼黑','埃因霍温'],['奥斯汀','慕尼黑'],['上海','新加坡'],['新加坡','埃因霍温']];

const CHAIN_COLOR={goods:'#2A76BB',capital:'#E9C46A',information:'#2EC4B6'} as const;
const riskColor=(level:string)=>level==='important'?'#C1272D':'#D4764E';

const buildArc=(from:string,to:string,flow:keyof typeof CHAIN_COLOR)=>{
 const a=byName(from),b=byName(to);
 return {startLat:a.lat,startLng:a.lng,endLat:b.lat,endLng:b.lng,color:CHAIN_COLOR[flow],flow};
};

export function MarketingGlobe({lang,risks=[],activeId='',onPick,hoverId='',onHover,onOpen}:{lang:'zh'|'en';risks?:GlobeRisk[];activeId?:string;onPick?:(id:string)=>void;hoverId?:string;onHover?:(id:string)=>void;onOpen?:()=>void}){
 const host=useRef<HTMLDivElement>(null),globe=useRef<any>(null);
 const [failed,setFailed]=useState(false),[ready,setReady]=useState(false);
 const riskRef=useRef<GlobeRisk[]>(risks);riskRef.current=risks;

 const ringsFor=(list:GlobeRisk[])=>list.map(r=>({
  id:r.id,lat:r.lat,lng:r.lon,
  maxR:r.level==='important'?5.2:3.0,
  propagationSpeed:r.level==='important'?1.1:1.6,
  repeatPeriod:r.level==='important'?2200:1650,
  color:riskColor(r.level),level:r.level
 }));

 useEffect(()=>{
  let disposed=false;
  (async()=>{
   try{
    const mod:any=await import('globe.gl');
    const Globe=mod.default||mod;
    if(disposed||!host.current)return;
    const el=host.current,width=()=>el.clientWidth||640,height=()=>el.clientHeight||520;
    const g=new Globe(el,{animateIn:false,rendererConfig:{antialias:true,alpha:true,powerPreference:'low-power'}})
      .width(width()).height(height())
      .backgroundColor('rgba(0,0,0,0)')
      .globeImageUrl('/earth-surface.jpg')
      .atmosphereColor('#6aa6cc').atmosphereAltitude(.18)
      .showAtmosphere(true);
    globe.current=g;

    // 城市标注：用 HTML 元素叠加，保证在任何缩放下都清晰可见。
    const labelEls=new Map<string,HTMLElement>();
    const labelData=HUBS.map(h=>{
      const div=document.createElement('div');
      div.className='cf-city-tag';
      div.textContent=h.name;
      labelEls.set(h.name,div);
      return {...h,__el:div};
    });
    g.htmlElementsData(labelData)
     .htmlLat('lat').htmlLng('lng').htmlAltitude(.008)
     .htmlElement((d:any)=>d.__el);

// 热力：按节点权重的低透明热力斑，不抢主视觉
    g.heatmapsData([HUBS.map(h=>({lat:h.lat,lng:h.lng,weight:h.size}))])
     .heatmapPointLat('lat').heatmapPointLng('lng')
     .heatmapPointWeight((d:any)=>d.weight||.3)
     .heatmapTopAltitude(.14)
     .heatmapBandwidth(4.5)
     .heatmapColorSaturation(1.2)
     .heatmapBaseAltitude(.006);

    // 三流弧线
    const arcs=[...GOODS.map(([a,b])=>buildArc(a,b,'goods')),...CAPITAL.map(([a,b])=>buildArc(a,b,'capital')),...INFORMATION.map(([a,b])=>buildArc(a,b,'information'))];
    g.arcsData(arcs)
     .arcColor((d:any)=>d.color)
     .arcAltitudeAutoScale(.3)
     .arcStroke(.26)
     .arcDashLength(.4).arcDashGap(.3)
     .arcDashInitialGap(()=>Math.random())
     .arcDashAnimateTime((d:any)=>d.flow==='capital'?5200:d.flow==='information'?4400:3800)
     .arcsTransitionDuration(0);

    // 风险：水波环
    g.ringsData(ringsFor(riskRef.current))
     .ringColor((d:any)=>d.color)
     .ringMaxRadius('maxR').ringPropagationSpeed('propagationSpeed').ringRepeatPeriod('repeatPeriod')
     .ringAltitude(.008);

    g.pointOfView({lat:20,lng:100,altitude:2.3},0);
    const controls=g.controls();
    controls.autoRotate=true;controls.autoRotateSpeed=.32;
    controls.enableZoom=false;controls.minDistance=180;controls.maxDistance=560;

    const onResize=()=>{g.width(width()).height(height());};
    window.addEventListener('resize',onResize);
    (el as any).__cfResize=onResize;
    el.dataset.globeReady='1';
    setReady(true);
   }catch(error){console.error('globe init failed',error);setFailed(true);}
  })();
  return()=>{
   disposed=true;
   const el=host.current as any;
   if(el?.__cfResize)window.removeEventListener('resize',el.__cfResize);
   globe.current?._destructor?.();globe.current=null;
  };
 },[]);

 // 风险数据集变化时更新水波
 useEffect(()=>{
  const g=globe.current;if(!g)return;
  g.ringsData(ringsFor(risks));
 },[risks]);

 // 选中风险时飞向该点
 useEffect(()=>{
  const g=globe.current;if(!g||!activeId)return;
  const r=risks.find(x=>x.id===activeId);if(!r)return;
  g.pointOfView({lat:r.lat,lng:r.lon,altitude:1.8},900);
 },[activeId,risks]);

 return <div className="cf-globe-wrap" data-risks={risks.length} data-ready={ready?'1':'0'}>
  <div ref={host} className="cf-globe" data-testid="marketing-globe"/>
  {failed&&<img className="cf-earth-fallback" src="/earth-surface.jpg" alt={lang==='zh'?'地球表面参照图':'Earth surface reference'}/>}
  <div className="cf-globe-actions">
   <button onClick={()=>{const c=globe.current?.controls();if(!c)return;c.autoRotate=!c.autoRotate;}} aria-label={lang==='zh'?'暂停或继续自转':'Pause or resume rotation'}>Ⅱ</button>
   <button onClick={()=>globe.current?.pointOfView({lat:20,lng:100,altitude:2.3},900)} aria-label={lang==='zh'?'复位地球':'Reset globe'}>↺</button>
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
