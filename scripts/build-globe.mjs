// 官网只打包通用绘制能力，不携带内部工作区数据和高德接口。
import {build} from 'esbuild';
await build({entryPoints:['lib/globe/engine.js'],outfile:'public/marketing/globe-engine.js',bundle:true,format:'esm',target:'es2022',minify:true,legalComments:'eof'});
