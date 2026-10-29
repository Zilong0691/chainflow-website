// 官网地球仅需坐标校验，不携带企业业务处理。
export function validPoint(point){return !!point&&Number.isFinite(point.lat)&&Number.isFinite(point.lon)&&point.lat>=-90&&point.lat<=90&&point.lon>=-180&&point.lon<=180&&['WGS84','GCJ02'].includes(point.coordinateSystem);}
