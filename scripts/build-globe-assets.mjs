import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createStaticGlobeSvg} from '../lib/globe/static-fallback.mjs';
import {globeContract,globeSourceRevision,globeAssetHashes} from '../lib/globe/asset-contract.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicDir=path.join(root,'public');
const assetsDir=path.join(publicDir,'globe-assets');
const sourceRevision=globeSourceRevision;
const input={
 'globe-renderer.js':'lib/globe/globe-renderer.js',
 'world-land.geojson':'public/globe-assets/world-land.geojson',
 'earth-surface.jpg':'public/globe-assets/earth-surface.jpg'
};
const hashes=globeAssetHashes;
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const writeAtomic=async(destination,bytes)=>{
 const temporary=destination+'.'+process.pid+'.tmp';
 await writeFile(temporary,bytes);
 await rename(temporary,destination);
};

await mkdir(assetsDir,{recursive:true});
await writeAtomic(path.join(assetsDir,'globe-renderer.js'),await readFile(path.join(root,input['globe-renderer.js'])));
await writeAtomic(path.join(assetsDir,'world-land.geojson'),await readFile(path.join(publicDir,'world-land.geojson')));
await writeAtomic(path.join(assetsDir,'earth-surface.jpg'),await readFile(path.join(publicDir,'earth-surface.jpg')));
const files={};
for(const [name,relativePath] of Object.entries(input)){
 const bytes=await readFile(path.join(root,relativePath));
 files[name]=digest(bytes);
 if(files[name]!==hashes[name])throw new Error(`地球资源摘要与锁定版本不一致：${name}`);
}
const manifest={contract:globeContract,sourceRevision,files};
await writeAtomic(path.join(assetsDir,'manifest.json'),`${JSON.stringify(manifest,null,2)}\n`);
const land=JSON.parse(await readFile(path.join(assetsDir,'world-land.geojson'),'utf8'));
await writeAtomic(path.join(publicDir,'earth-fallback.svg'),createStaticGlobeSvg(land));
console.log('地球静态资源、版本清单与投影兜底已校验并生成。');
