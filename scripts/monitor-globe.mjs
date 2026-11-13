import {checkGlobeAssets} from '../lib/globe/health.mjs';
const result=await checkGlobeAssets(process.argv[2]||'https://www.chainflowlab.com');
console.log(JSON.stringify(result,null,2));
if(!result.ok)process.exitCode=1;
