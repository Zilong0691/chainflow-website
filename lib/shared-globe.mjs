import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const types={'manifest.json':'application/json','globe-renderer.js':'text/javascript','earth-surface.jpg':'image/jpeg','world-land.geojson':'application/geo+json'};
// 仅投射已登记人工站的通用资产，不转发客户端提供的网址、身份或业务请求。
export async function projectGlobeAsset(asset,entry,{preview=false,digest}={}){
 if(!Object.hasOwn(types,asset))return new Response('Not found',{status:404});
 try{
  const base=new URL(entry.url),local=preview&&base.protocol==='http:'&&['127.0.0.1','localhost'].includes(base.hostname);
  if(entry.artificialOnly!==true||base.username||base.password||(!local&&(base.protocol!=='https:'||!(base.hostname.endsWith('.trycloudflare.com')||base.hostname==='demo.chainflowlab.com'))))throw Error('地球来源无效');
  const success=(bytes,sha)=>new Response(bytes,{headers:{'Content-Type':types[asset],'Cache-Control':digest&&asset!=='manifest.json'?'public, max-age=31536000, immutable':'no-store','X-Globe-SHA256':sha,'X-Content-Type-Options':'nosniff'}});
  // 本地底图仅在摘要与当前发布完全一致时作为缓存，不维护不同版本。
  if(digest&&['earth-surface.jpg','world-land.geojson'].includes(asset)){try{const bytes=await readFile(path.join(process.cwd(),'public',asset)),sha=createHash('sha256').update(bytes).digest('hex');if(sha===digest)return success(bytes,sha);}catch{}}
  const upstream=await fetch(new URL('/globe-assets/'+asset,base),{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(55000)});
  if(!upstream.ok)throw Error('共享地球暂未在线');
  const bytes=await upstream.arrayBuffer(),sha=createHash('sha256').update(Buffer.from(bytes)).digest('hex');
  if(digest&&digest!==sha)return new Response('Globe version changed',{status:409,headers:{'Cache-Control':'no-store'}});
  return success(bytes,sha);
 }catch{return new Response('Shared globe unavailable',{status:503,headers:{'Cache-Control':'no-store'}});}
}
