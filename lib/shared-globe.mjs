import {createHash} from 'node:crypto';
const types={'manifest.json':'application/json','globe-renderer.js':'text/javascript','earth-surface.jpg':'image/jpeg','world-land.geojson':'application/geo+json'};
// 仅投射已登记人工站的通用资产，不转发客户端提供的网址、身份或业务请求。
export async function projectGlobeAsset(asset,entry,{preview=false,digest}={}){
 if(!Object.hasOwn(types,asset))return new Response('Not found',{status:404});
 try{
  const base=new URL(entry.url),local=preview&&base.protocol==='http:'&&['127.0.0.1','localhost'].includes(base.hostname);
  if(entry.artificialOnly!==true||base.username||base.password||(!local&&(base.protocol!=='https:'||!(base.hostname.endsWith('.trycloudflare.com')||base.hostname==='demo.chainflowlab.com'))))throw Error('地球来源无效');
  const upstream=await fetch(new URL('/globe-assets/'+asset,base),{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(12000)});
  if(!upstream.ok)throw Error('共享地球暂未在线');
  const bytes=await upstream.arrayBuffer(),sha=createHash('sha256').update(Buffer.from(bytes)).digest('hex');
  if(digest&&digest!==sha)return new Response('Globe version changed',{status:409,headers:{'Cache-Control':'no-store'}});
  return new Response(bytes,{headers:{'Content-Type':types[asset],'Cache-Control':'no-store','X-Globe-SHA256':sha,'X-Content-Type-Options':'nosniff'}});
 }catch{return new Response('Shared globe unavailable',{status:503,headers:{'Cache-Control':'no-store'}});}
}
