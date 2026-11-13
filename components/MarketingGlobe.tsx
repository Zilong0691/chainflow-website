"use client";
import {useEffect,useRef,useState} from 'react';
import {createGlobeRecovery} from '../lib/globe/recovery.mjs';

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
// 主要港口：与制造枢纽分开标注，帮助理解实物流路径。
const PORTS:Array<{name:string;lat:number;lng:number}>=[
 {name:'新加坡港',lat:1.26,lng:103.84},{name:'上海港',lat:31.22,lng:121.5},
 {name:'深圳港',lat:22.5,lng:114.1},{name:'釜山港',lat:35.1,lng:129.04},
 {name:'鹿特丹港',lat:51.92,lng:4.48},{name:'香港港',lat:22.31,lng:114.17}
];
const byName=(n:string)=>HUBS.find(h=>h.name===n)!;

// 三流弧线：节点之间互联，不汇聚单点。
const GOODS:[string,string][]=[['台北','上海'],['首尔','苏州'],['东京','深圳'],['新加坡','深圳'],['上海','慕尼黑'],['深圳','新加坡'],['慕尼黑','埃因霍温'],['奥斯汀','瓜达拉哈拉'],['上海','奥斯汀'],['台北','深圳'],['埃因霍温','苏州']];
const CAPITAL:[string,string][]=[['上海','台北'],['苏州','首尔'],['深圳','东京'],['深圳','新加坡'],['慕尼黑','上海'],['瓜达拉哈拉','奥斯汀'],['埃因霍温','慕尼黑']];
const INFORMATION:[string,string][]=[['上海','苏州'],['苏州','深圳'],['深圳','台北'],['慕尼黑','埃因霍温'],['奥斯汀','慕尼黑'],['上海','新加坡'],['新加坡','埃因霍温']];

const CHAIN_COLOR={goods:'#2A76BB',capital:'#E9C46A',information:'#2EC4B6'} as const;
const buildArc=(from:string,to:string,kind:keyof typeof CHAIN_COLOR)=>{
 const a=byName(from),b=byName(to);
 return {from:{lat:a.lat,lon:a.lng},to:{lat:b.lat,lon:b.lng},kind};
};
const points=[...HUBS,...PORTS].map((p,i)=>({id:'illustrative-'+i,supplierId:'illustrative-'+i,company:p.name,city:p.name,lat:p.lat,lon:p.lng,coordinateSystem:'WGS84',kind:i<HUBS.length?'factory':'office',verified:true}));
const flows=[...GOODS.map(([a,b])=>buildArc(a,b,'goods')),...CAPITAL.map(([a,b])=>buildArc(a,b,'capital')),...INFORMATION.map(([a,b])=>buildArc(a,b,'information'))];

export function MarketingGlobe({lang,risks=[],activeId='',onPick,hoverId='',onHover,onOpen}:{lang:'zh'|'en';risks?:GlobeRisk[];activeId?:string;onPick?:(id:string)=>void;hoverId?:string;onHover?:(id:string)=>void;onOpen?:()=>void}){
 const host=useRef<HTMLDivElement>(null),globe=useRef<any>(null);
 const recovery=useRef<ReturnType<typeof createGlobeRecovery>|null>(null);
 const rendererModule=useRef<{digest:string;module:any}|null>(null);
 const [failed,setFailed]=useState(false),[ready,setReady]=useState(false);
 const riskRef=useRef<GlobeRisk[]>(risks);riskRef.current=risks;
 const pickRef=useRef(onPick);pickRef.current=onPick;

 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{
  const controller=createGlobeRecovery({onRetry:()=>setAttempt(value=>value+1)});
  recovery.current=controller;
  return()=>{controller.dispose();if(recovery.current===controller)recovery.current=null;};
 },[]);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let disposed=false,failedThisAttempt=false,instance:any=null,frame=0,watchdog=0,visibleWait=0;
  const requests=new AbortController();
  const inactive=()=>disposed||failedThisAttempt;
  const stopWatching=()=>{cancelAnimationFrame(frame);window.clearInterval(watchdog);window.clearTimeout(loadDeadline);requests.abort();};
  const fail=(error:unknown)=>{
   if(inactive())return;
   failedThisAttempt=true;stopWatching();
   console.error('官网地球正在自动恢复',error);
   setReady(false);setFailed(true);el.dataset.globeReady='0';
   instance?.dispose();instance=null;globe.current=null;
   recovery.current?.failed();
  };
  // 网络等待有上限；后台页和屏幕外的球体不按首帧超时处理。
  const loadDeadline=window.setTimeout(()=>fail(Error('地球资源加载超时')),25000);
  setReady(false);el.dataset.globeReady='0';el.dataset.globeCalls='0';
  el.dataset.globeAttempt=String(attempt);
  const isVisible=()=>{
   const rect=el.getBoundingClientRect();
   return document.visibilityState==='visible'&&rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<window.innerHeight&&rect.right>0&&rect.left<window.innerWidth;
  };
  const confirmFirstFrame=()=>{
   if(inactive())return;
   if(Number(el.dataset.globeCalls)>0&&el.querySelector('canvas')){
    window.clearTimeout(loadDeadline);
    el.dataset.globeReady='1';setFailed(false);setReady(true);
    recovery.current?.recovered();
    return;
   }
   frame=requestAnimationFrame(confirmFirstFrame);
  };
  const onRenderError=(event:ErrorEvent)=>{
   if(event.filename?.includes('/globe-assets/globe-renderer.js'))fail(event.error||Error(event.message));
  };
  window.addEventListener('error',onRenderError);
  (async()=>{
   try{
    const response=await fetch('/globe-assets/manifest.json',{cache:'no-store',signal:requests.signal});
    if(!response.ok)throw Error('地球版本清单暂不可用');
    const manifest=await response.json();if(inactive())return;
    if(manifest.contract!=='chainflow-globe-v1')throw Error('地球版本不兼容');
    const asset=(name:string)=>{
     const digest=manifest.files?.[name];if(!/^[a-f0-9]{64}$/.test(digest))throw Error('地球资源摘要无效');
     return '/globe-assets/'+name+'?v='+digest;
    };
    // 更换重试地址，避免浏览器缓存失败的模块导入。
    const rendererUrl=asset('globe-renderer.js')+(attempt?'&retry='+attempt:'');
    const digest=manifest.files['globe-renderer.js'];
    // 显卡故障只重建实例，复用已经成功载入的同版模块。
    const cachedRenderer=rendererModule.current;
    const renderer=cachedRenderer&&cachedRenderer.digest===digest
     ?Promise.resolve(cachedRenderer.module)
     :import(/* webpackIgnore: true */ rendererUrl).then(module=>{
       if(!disposed)rendererModule.current={digest,module};
       return module;
      });
    const [mod,landResponse]=await Promise.all([
     renderer,
     fetch(asset('world-land.geojson'),{cache:'force-cache',signal:requests.signal})
    ]);
    if(!landResponse.ok)throw Error('地球世界边界暂不可用');
    const land=await landResponse.json();if(inactive())return;
    instance=mod.mountGlobe({host:el,points,flows,land,scrollZoom:false,textureUrl:asset('earth-surface.jpg'),riskRegions:riskRef.current,layers:{scatter:true,links:true,pulse:true,heat:true,aggregation:'city'},onRiskSelect:(id:string)=>pickRef.current?.(id),onError:(reason:string)=>fail(Error(reason))});
    if(inactive()){instance?.dispose();return;}
    window.clearTimeout(loadDeadline);
    globe.current=instance;el.dataset.globeDigest=manifest.files['globe-renderer.js'];
    frame=requestAnimationFrame(confirmFirstFrame);
    watchdog=window.setInterval(()=>{
     if(inactive()||!isVisible())return;
     if(!instance?.isActive()||!el.querySelector('canvas')){fail(Error('地球绘制已中断'));return;}
     if(el.dataset.globeReady!=='1'){
      visibleWait+=1000;
      if(visibleWait>=12000)fail(Error('地球未能完成首帧渲染'));
     }
    },1000);
   }catch(error){fail(error);}
  })();
  return()=>{
   disposed=true;stopWatching();window.removeEventListener('error',onRenderError);
   instance?.dispose();if(globe.current===instance)globe.current=null;
  };
 },[attempt]);
 useEffect(()=>{globe.current?.setRisks(risks);},[risks,ready]);
 useEffect(()=>{if(activeId)globe.current?.focusRisk(activeId);},[activeId,ready]);

 return <div className="cf-globe-wrap" data-risks={risks.length} data-ready={ready?'1':'0'}>
  <div ref={host} className="cf-globe" data-testid="marketing-globe">
   <img className="cf-earth-fallback" src="/earth-fallback.svg" alt="" aria-hidden="true"/>
   {points.map(p=><div key={p.id} hidden data-globe-region data-lon={p.lon} data-lat={p.lat} style={{position:'absolute',left:0,top:0,pointerEvents:'none',zIndex:2,fontSize:11,color:'#d7e7ee'}}>{p.company}</div>)}
  </div>
  {failed&&<span className="cf-globe-recovery-state cf-sr-only" role="status" aria-live="polite">{lang==='zh'?'正在恢复地球':'Restoring globe'}</span>}
  <div className="cf-globe-actions">
   <button disabled={!ready} onClick={()=>{globe.current?.motion();}} aria-label={lang==='zh'?'暂停或继续自转':'Pause or resume rotation'}>Ⅱ</button>
   <button disabled={!ready} onClick={()=>globe.current?.global()} aria-label={lang==='zh'?'复位地球':'Reset globe'}>↺</button>
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
