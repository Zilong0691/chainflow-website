import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {createHash} from 'node:crypto';
const api=await import('../lib/shared-globe.mjs').catch(()=>({}));
test('地球代理原样转发同一制品并核对摘要，不代理业务数据或任意网址',async t=>{
 assert.equal(typeof api.projectGlobeAsset,'function');
 const body='export const shared=true;',digest=createHash('sha256').update(body).digest('hex');let calls=0;
 const server=http.createServer((req,res)=>{calls++;res.setHeader('Content-Type','text/javascript');res.end(body);});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>server.close());
 const config={url:`http://127.0.0.1:${server.address().port}`,artificialOnly:true};
 const response=await api.projectGlobeAsset('globe-renderer.js',config,{preview:true,digest});assert.equal(response.status,200);assert.equal(await response.text(),body);
 const mismatch=await api.projectGlobeAsset('globe-renderer.js',config,{preview:true,digest:'0'.repeat(64)});assert.equal(mismatch.status,409);
 for(const asset of ['app.js','../native-settings.json','https://other.invalid/'])assert.equal((await api.projectGlobeAsset(asset,config,{preview:true})).status,404);
 assert.equal(calls,2);
 assert.equal((await api.projectGlobeAsset('globe-renderer.js',config)).status,503);
 assert.equal((await api.projectGlobeAsset('globe-renderer.js',{url:'https://evil.invalid',artificialOnly:true})).status,503);
});
