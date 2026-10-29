const radians=Math.PI/180,R=6378137;
const text=v=>typeof v==='string'?v.trim():'';
export const geographyPointKey=p=>p&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)?[p.coordinateSystem,p.lat,p.lon].join(':'):'';
export function supplierGeography(p){
 let country=text(p.country),province=text(p.province),city=text(p.city),district=text(p.district),adcode=text(p.adcode);
 const countries={CN:'中国',China:'中国',中国大陆:'中国',JP:'日本',Japan:'日本',US:'美国',USA:'美国','United States':'美国',DE:'德国',Germany:'德国',GB:'英国',UK:'英国'};
 country=countries[country]||country;
 if(!country&&/^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|81|82)\d{4}$/.test(adcode))country='中国';
 if(!country&&/^(?:北京市|天津市|上海市|重庆市|河北省|山西省|辽宁省|吉林省|黑龙江省|江苏省|浙江省|安徽省|福建省|江西省|山东省|河南省|湖北省|湖南省|广东省|海南省|四川省|贵州省|云南省|陕西省|甘肃省|青海省|台湾省|内蒙古自治区|广西壮族自治区|西藏自治区|宁夏回族自治区|新疆维吾尔自治区|香港特别行政区|澳门特别行政区)$/.test(province))country='中国';
 // 直辖市的逆地理编码可能不返回city；以明确的省级直辖市补齐。
 if(!city&&/^(?:北京|天津|上海|重庆|香港特别行政区|澳门特别行政区)/.test(province))city=province;
 return {country,province,city,district,adcode};
}
// 同一地域内按稳定供应商ID去重；行政区缺项单列，不切换到其他聚合维度。
// 国内底图的自动视角不被海外点拉空；海外点仍用于完整统计和地球。
export const amapViewPoints=points=>points.filter(p=>!supplierGeography(p).country||supplierGeography(p).country==='中国');
export function aggregateSupplierGeography(points,unit='city'){
 const groups=new Map(),fields=['country','province','city','district'],level=fields.indexOf(unit);
 for(const p of points){if(!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||!p.supplierId)continue;
  const g=supplierGeography(p),parents=fields.slice(0,Math.max(0,level)).map(k=>g[k]).filter(Boolean),region=g[unit],complete=!!region;
  const x=R*p.lon*radians,y=R*Math.log(Math.tan(Math.PI/4+Math.max(-85,Math.min(85,p.lat))*radians/2)),grid=Math.floor(x/50000)+':'+Math.floor(y/50000);
  const direct=unit==='district'&&(!g.district||g.district===g.city)&&['441900','442000','620200','460400'].includes(g.adcode);
  const key=unit==='grid'?'grid:'+grid:JSON.stringify([unit,...fields.slice(0,level+1).map(k=>g[k])]);
  const foreignCity=unit==='district'&&!g.district&&g.city&&g.country&&g.country!=='中国';
  const missing={country:'国家待补充',province:'省份待补充',city:'城市待补充',district:'区县待补充'};
  const label=unit==='grid'?'50 km 网格 '+grid:direct?(g.city||g.province)+'（市直管）':foreignCity?g.city+'（城市级）':unit==='district'?[g.city||g.province,region||missing[unit]].filter(Boolean).join(' / '):region||[...new Set(parents),missing[unit]||'地区待补充'].join(' / ');
  if(!groups.has(key))groups.set(key,{key,label,complete:unit==='grid'||complete||direct,parents,suppliers:new Map(),positions:[]});
  const group=groups.get(key);if(!group.suppliers.has(p.supplierId)){group.suppliers.set(p.supplierId,p);group.positions.push([p.lon,p.lat]);}
 }
 const rows=[...groups.values()].map(g=>({key:g.key,label:g.label,complete:g.complete,parents:g.parents,count:g.suppliers.size,candidates:[...g.suppliers.values()].filter(p=>p.candidate).length,supplierIds:[...g.suppliers.keys()],lon:g.positions.reduce((n,p)=>n+p[0],0)/g.positions.length,lat:g.positions.reduce((n,p)=>n+p[1],0)/g.positions.length}));
 const duplicates=new Set(rows.filter(row=>rows.some(other=>other!==row&&other.label===row.label)).map(row=>row.label));
 for(const row of rows)if(duplicates.has(row.label))row.label=[...new Set([...row.parents,row.label])].join(' / ');
 return rows.sort((a,b)=>Number(b.complete)-Number(a.complete)||b.count-a.count||a.label.localeCompare(b.label,'zh-CN'));
}
export function referenceLinkFeatures(points,reference,selected=''){
 if(!reference||!Number.isFinite(reference.lon)||!Number.isFinite(reference.lat))return [];
 return points.filter(p=>!p.candidate||p.id===selected).map(p=>({type:'Feature',properties:{pointId:p.id,selected:p.id===selected,candidate:!!p.candidate,relation:'基准位置参照'},geometry:{type:'LineString',coordinates:[[reference.lon,reference.lat],[p.lon,p.lat]]}}));
}
export function referenceDistributionFeatures(points,reference,unit='city',selected=''){
 if(points.length<=40)return referenceLinkFeatures(points,reference,selected);
 if(!reference)return [];
 const regions=aggregateSupplierGeography(points,unit).map(g=>({type:'Feature',properties:{aggregate:true,label:g.label,count:g.count,candidate:g.candidates>0,selected:false,relation:'基准与地域分布参照'},geometry:{type:'LineString',coordinates:[[reference.lon,reference.lat],[g.lon,g.lat]]}}));
 return [...regions,...referenceLinkFeatures(points.filter(p=>p.id===selected),reference,selected)];
}

// 图层没有绘制条件时给出具体原因，避免开关勾选却静默空白。
export function mapLayerConditions(points,reference,{selected='',aggregation='city',reducedMotion=false,pulse=true}={}){
 const referenceReady=!!reference&&Number.isFinite(reference.lat)&&Number.isFinite(reference.lon);
 const lineCount=referenceDistributionFeatures(points,referenceReady?reference:null,aggregation,selected).length,warnings=[];
 if(!referenceReady)warnings.push('尚未设置地图基准，基准连线与动态连线暂不显示。');
 if(!points.length)warnings.push('当前范围没有可落图地点，请清除筛选或核对地点资料。');
 else if(referenceReady&&!lineCount)warnings.push('当前只有待核候选地点，点选一个地点后可查看其基准参照线。');
 if(reducedMotion&&pulse)warnings.push('已按系统“减少动态效果”设置暂停动画；静态连线仍按地点与基准条件显示。');
 return {referenceReady,lineCount,pulseActive:!!pulse&&!reducedMotion&&lineCount>0,warnings};
}
