import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';

test('官网携带完整、同版的三维地球资源，无需访问演示隧道',async()=>{
 const root=new URL('../public/globe-assets/',import.meta.url);
 const manifest=JSON.parse(await readFile(new URL('manifest.json',root),'utf8'));
 assert.equal(manifest.contract,'chainflow-globe-v1');
 assert.equal(manifest.sourceRevision,'2797abd6d8f183772103a62d7c9d14681c1a0876');
 assert.deepEqual(Object.keys(manifest.files).sort(),['earth-surface.jpg','globe-renderer.js','world-land.geojson'].sort());
 for(const name of Object.keys(manifest.files)){
  const bytes=await readFile(new URL(name,root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.files[name],`${name} 摘要与清单一致`);
  assert.ok(bytes.byteLength>1024,`${name} 不是空文件`);
 }
 const renderer=await readFile(new URL('globe-renderer.js',root),'utf8');
 for(const method of ['mountGlobe','setRisks','focusRisk','onRiskSelect'])assert.ok(renderer.includes(method),`兼容API包含 ${method}`);
 assert.doesNotMatch(renderer,/kilometers-survive-attract-border\.trycloudflare\.com/);
});

test('静态球体兜底将本地世界边界映射到正射投影',async()=>{
 const fallback=await import('../lib/globe/static-fallback.mjs');
 const land=JSON.parse(await readFile(new URL('../public/globe-assets/world-land.geojson',import.meta.url),'utf8'));
 const svg=fallback.createStaticGlobeSvg(land);
 assert.match(svg,/<svg[^>]+viewBox="0 0 500 500"/);
 assert.match(svg,/clipPath/);
 assert.match(svg,/linearGradient/);
 assert.ok((svg.match(/<path\b/g)||[]).length>1);
 assert.ok(svg.length>50000,'静态地球应包含实际海岸线而非仅有圆形轮廓');
 assert.equal(await readFile(new URL('../public/earth-fallback.svg',import.meta.url),'utf8'),svg);
});
