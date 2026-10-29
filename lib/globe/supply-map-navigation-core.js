import {aggregateSupplierGeography} from './supplier-map-visual-core.js';
import {globeLocationUse} from './supplier-globe-core.js';
const valid=p=>p&&Number.isFinite(p.lon)&&Number.isFinite(p.lat)&&Math.abs(p.lon)<=180&&Math.abs(p.lat)<=90;
// 连接表示登记的供给方向；没有运单或数量，不生成客户、运输状态及流量权重。
export function supplyDirectionFeatures(points,reference){
 if(!valid(reference))return [];
 const rank=p=>(p.verified?100:0)+({factory:30,headquarters:20,office:10,registered:5}[globeLocationUse(p)]||0),bySupplier=new Map();
 for(const point of points.filter(valid)){const old=bySupplier.get(point.supplierId);if(!point.supplierId)continue;if(!old||rank(point)>rank(old))bySupplier.set(point.supplierId,point);}
 return [...bySupplier.values()].filter(p=>Math.hypot(p.lon-reference.lon,p.lat-reference.lat)>.00001).map(p=>({type:'Feature',properties:{pointId:p.id,supplierId:p.supplierId,candidate:!!p.candidate,direction:'supplier-to-base',relation:'登记供给方向'},geometry:{type:'LineString',coordinates:[[p.lon,p.lat],[reference.lon,reference.lat]]}}));
}
export function supplyRegionScope(points,unit,key){
 const group=aggregateSupplierGeography(points,unit).find(g=>g.key===key);if(!group)return null;
 return {...group,unit,points:points.filter(p=>aggregateSupplierGeography([p],unit)[0]?.key===key)};
}
export function supplyRegionView(points,{width=900,height=600}={}){
 const rows=points.filter(valid);if(!rows.length)return null;const anchor=rows[0].lon,longitudes=rows.map(p=>{let lon=p.lon;while(lon-anchor>180)lon-=360;while(lon-anchor< -180)lon+=360;return lon;}),west=Math.min(...longitudes),east=Math.max(...longitudes),south=Math.min(...rows.map(p=>p.lat)),north=Math.max(...rows.map(p=>p.lat));let lon=(west+east)/2;while(lon>180)lon-=360;while(lon< -180)lon+=360;
 const span=Math.max((east-west)*Math.cos((south+north)/2*Math.PI/180),(north-south)*1.3,.012),zoom=Math.max(2,Math.min(16,Math.log2(360/span*Math.max(256,Math.min(width,height))/256)-.35));
 return {center:[lon,(south+north)/2],zoom,pitch:0};
}
