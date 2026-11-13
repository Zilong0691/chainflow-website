import {createHash} from 'node:crypto';
import {globeContract,globeSourceRevision,globeAssetHashes} from './asset-contract.mjs';

export async function checkGlobeAssets(baseUrl,{fetchImpl=fetch,timeoutMs=15000}={}){
 const base=new URL(baseUrl);
 if(!['https:','http:'].includes(base.protocol))throw Error('地球检查地址必须是网页地址');
 const errors=[];
 const read=async pathname=>{
  const response=await fetchImpl(new URL(pathname,base),{cache:'no-store',signal:AbortSignal.timeout(timeoutMs)});
  if(!response.ok)throw Error(`${pathname} 返回 ${response.status}`);
  if(response.url&&new URL(response.url).origin!==base.origin)throw Error(`${pathname} 跳转到了其他域名`);
  return response;
 };
 try{
  const manifest=await (await read('/globe-assets/manifest.json')).json();
  if(manifest.contract!==globeContract||manifest.sourceRevision!==globeSourceRevision)throw Error('地球版本与当前发布契约不一致');
  for(const [name,digest] of Object.entries(globeAssetHashes)){
   if(manifest.files?.[name]!==digest)throw Error(`${name} 未使用锁定版本`);
  }
  const checks=await Promise.allSettled(Object.entries(globeAssetHashes).map(async([name,digest])=>{
   const bytes=Buffer.from(await (await read('/globe-assets/'+name)).arrayBuffer());
   if(createHash('sha256').update(bytes).digest('hex')!==digest)throw Error(`${name} 内容校验失败`);
  }));
  for(const result of checks)if(result.status==='rejected')errors.push(result.reason.message);
  const fallback=await (await read('/earth-fallback.svg')).text();
  if(!fallback.includes('viewBox="0 0 500 500"')||!fallback.includes('clipPath')||fallback.length<50000)errors.push('静态地球兜底缺失或不完整');
 }catch(error){errors.push(error.message);}
 return {ok:errors.length===0,checkedAt:new Date().toISOString(),errors};
}
