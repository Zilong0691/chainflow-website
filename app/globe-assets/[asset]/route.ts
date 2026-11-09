import entry from '@/public/product-demo.json';
import {projectGlobeAsset} from '@/lib/shared-globe.mjs';
export const dynamic='force-dynamic';
export async function GET(request:Request,{params}:{params:{asset:string}}){
 const preview=process.env.NODE_ENV==='development'&&Boolean(process.env.CHAINFLOW_GLOBE_PREVIEW);
 return projectGlobeAsset(params.asset,preview?{url:process.env.CHAINFLOW_GLOBE_PREVIEW,artificialOnly:true}:entry,{preview,digest:new URL(request.url).searchParams.get('v')||undefined});
}
