import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {checkGlobeAssets} from '../lib/globe/health.mjs';

const fetchLocal=async url=>{
 const pathname=url.pathname;
 const bytes=await readFile(new URL('../public'+pathname,import.meta.url));
 return new Response(bytes);
};
test('监测检查发布清单、实际资源内容和静态兜底',async()=>{
 const result=await checkGlobeAssets('https://site.example',{fetchImpl:fetchLocal});
 assert.equal(result.ok,true);assert.deepEqual(result.errors,[]);
});
test('返回成功状态但内容被替换时监测仍然失败',async()=>{
 const result=await checkGlobeAssets('https://site.example',{fetchImpl:url=>url.pathname.endsWith('globe-renderer.js')?new Response('错误页面'):fetchLocal(url)});
 assert.equal(result.ok,false);assert.ok(result.errors.some(error=>error.includes('globe-renderer.js')));
});
test('临时隧道跳转或资源请求失败不会被当成健康',async()=>{
 const result=await checkGlobeAssets('https://site.example',{fetchImpl:async()=>({ok:true,url:'https://other.example/manifest.json'})});
 assert.equal(result.ok,false);assert.match(result.errors[0],/其他域名/);
 const down=await checkGlobeAssets('https://site.example',{fetchImpl:async()=>new Response('',{status:503})});
 assert.equal(down.ok,false);assert.match(down.errors[0],/503/);
});
