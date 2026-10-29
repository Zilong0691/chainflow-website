import {validPoint} from './supplier-core.js';
const radians=Math.PI/180;
// 经纬度保持来源坐标；GCJ02 仅作为带精度提示的全球概览，不伪造反向转换。
export function globePosition(point,radius=1){if(!validPoint(point))throw new Error('地球点位坐标无效');const lat=point.lat*radians,lon=point.lon*radians;return {x:radius*Math.cos(lat)*Math.cos(lon),y:radius*Math.sin(lat),z:-radius*Math.cos(lat)*Math.sin(lon)};}
export function globeLocations(rows){return rows.flatMap((supplier,index)=>(supplier.locations||[]).filter(p=>(p.verified||p.candidate&&p.showCandidate)&&validPoint(p)).map((p,i)=>({...p,id:JSON.stringify([supplier.id,p.id||i]),locationId:p.id,supplierId:supplier.id,company:supplier.company,categories:supplier.categories||[],networkKind:supplier.kind,entityType:supplier.entityType,index:index+1,distance:p.candidate?null:supplier.distance??null,approximate:p.coordinateSystem==='GCJ02'})));}
export function globeCenter(points){if(!points.length)return {lat:26,lon:110};const sum=points.reduce((s,p)=>{const v=globePosition(p);return {x:s.x+v.x,y:s.y+v.y,z:s.z+v.z};},{x:0,y:0,z:0}),length=Math.hypot(sum.x,sum.y,sum.z);if(length<.000001)return {lat:points[0].lat,lon:points[0].lon};return {lat:Math.asin(sum.y/length)/radians,lon:-Math.atan2(sum.z,sum.x)/radians};}
export function globeOccluded(point,camera,radius=1){const dx=point.x-camera.x,dy=point.y-camera.y,dz=point.z-camera.z,length=Math.hypot(dx,dy,dz);if(length<.000001)return false;const direction={x:dx/length,y:dy/length,z:dz/length},b=camera.x*direction.x+camera.y*direction.y+camera.z*direction.z,c=camera.x**2+camera.y**2+camera.z**2-radius**2,disc=b*b-c;if(disc<0)return false;const hit=-b-Math.sqrt(disc);return hit>=0&&hit<length-.004;}
export function globeLabelLayout(labels,width,height){const placed=[];for(const item of [...labels].sort((a,b)=>Number(Boolean(b.selected))-Number(Boolean(a.selected)))){if(!item.visible||item.x<0||item.y<0||item.x>width||item.y>height)continue;const w=item.width||100,h=25,candidates=[[item.x+12,item.y-h/2],[item.x-w-12,item.y-h/2],[item.x+12,item.y-h-14],[item.x+12,item.y+14]];const position=candidates.find(([x,y])=>x>=4&&y>=4&&x+w<=width-4&&y+h<=height-4&&!placed.some(p=>x<p.x+p.width+5&&x+w+5>p.x&&y<p.y+p.height+4&&y+h+4>p.y));if(position)placed.push({...item,x:position[0],y:position[1],width:w,height:h});}return placed;}
// 保留既有投影验证的纯函数，新视图使用 Three.js 实际三维渲染。
export function globeVector(point,center={lat:25,lon:110}){const lat=point.lat*radians,dl=(point.lon-center.lon)*radians,cl=center.lat*radians;return {x:Math.cos(lat)*Math.sin(dl),y:Math.cos(cl)*Math.sin(lat)-Math.sin(cl)*Math.cos(lat)*Math.cos(dl),z:Math.sin(cl)*Math.sin(lat)+Math.cos(cl)*Math.cos(lat)*Math.cos(dl)};}
export function clipGlobeRing(points){const result=[];if(points.length<3)return result;for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],insideA=a.z>=0,insideB=b.z>=0;if(insideA)result.push(a);if(insideA!==insideB){const t=a.z/(a.z-b.z),x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t,n=Math.hypot(x,y);result.push({x:x/n,y:y/n,z:0});}}return result;}

export const globeLocationStyles={headquarters:{label:'总部',color:'#b99aff',symbol:'◇'},factory:{label:'工厂',color:'#ffb45c',symbol:'▣'},office:{label:'办公室',color:'#55cef3',symbol:'●'},registered:{label:'注册地',color:'#79d3a6',symbol:'□'},unknown:{label:'用途待核',color:'#879bb7',symbol:'·'}};
export function globeLocationUse(point){
 if(point.verified&&Object.hasOwn(globeLocationStyles,point.kind)&&point.kind!=='unknown')return point.kind;
 if(Object.hasOwn(globeLocationStyles,point.useKind)&&point.useSource?.startsWith('https://'))return point.useKind;
 return 'unknown';
}
// 同一供应商的地点参照，弧线保持在球体外；不表达物流、订单或实际运输。
export function globeArcPoints(from,to,steps=64,lift=.18){
 const a=globePosition(from),b=globePosition(to),dot=Math.max(-1,Math.min(1,a.x*b.x+a.y*b.y+a.z*b.z)),angle=Math.acos(dot),sin=Math.sin(angle),rows=[];
 for(let i=0;i<=steps;i++){const t=i/steps;let x,y,z;if(Math.abs(sin)<1e-7){if(dot>0){x=a.x;y=a.y;z=a.z;}else{const axis=Math.abs(a.y)<.9?{x:-a.z,y:0,z:a.x}:{x:0,y:a.z,z:-a.y},length=Math.hypot(axis.x,axis.y,axis.z),u=Math.cos(Math.PI*t),v=Math.sin(Math.PI*t)/length;x=a.x*u+axis.x*v;y=a.y*u+axis.y*v;z=a.z*u+axis.z*v;}}else{const u=Math.sin((1-t)*angle)/sin,v=Math.sin(t*angle)/sin;x=a.x*u+b.x*v;y=a.y*u+b.y*v;z=a.z*u+b.z*v;}const radius=1.012+lift*Math.sin(Math.PI*t),n=Math.hypot(x,y,z);rows.push({x:x/n*radius,y:y/n*radius,z:z/n*radius});}return rows;
}
