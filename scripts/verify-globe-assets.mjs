import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';

const root=new URL('../public/globe-assets/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('manifest.json',root),'utf8'));
assert.equal(manifest.contract,'chainflow-globe-v1');
for(const name of ['globe-renderer.js','earth-surface.jpg','world-land.geojson']){
 const bytes=await readFile(new URL(name,root));
 const digest=createHash('sha256').update(bytes).digest('hex');
 assert.equal(digest,manifest.files[name],`${name} 摘要不匹配`);
}
const renderer=await readFile(new URL('globe-renderer.js',root),'utf8');
for(const api of ['mountGlobe','setRisks','focusRisk','onRiskSelect'])assert.ok(renderer.includes(api),`缺少渲染器接口 ${api}`);
assert.doesNotMatch(renderer,/kilometers-survive-attract-border\.trycloudflare\.com/);
const fallback=await readFile(new URL('../public/earth-fallback.svg',import.meta.url),'utf8');
assert.match(fallback,/clipPath/);
assert.ok(fallback.length>50000,'静态兜底没有包含足够的世界边界数据');
console.log('地球bundle摘要、交互契约、同源资源与静态兜底均有效。');
