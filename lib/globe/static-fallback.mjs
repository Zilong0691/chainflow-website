import {geoOrthographic,geoPath} from 'd3-geo';

export function createStaticGlobeSvg(land){
 const projection=geoOrthographic().translate([250,250]).scale(220).rotate([-25,-15]).clipAngle(90);
 const path=geoPath(projection);
 const surface=path({type:'Sphere'});
 const continents=path(land);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img" aria-label="地球" preserveAspectRatio="xMidYMid meet"><defs><radialGradient id="ocean" cx="34%" cy="28%" r="76%"><stop offset="0" stop-color="#357786"/><stop offset=".52" stop-color="#244d61"/><stop offset="1" stop-color="#101e30"/></radialGradient><linearGradient id="land" x1="15%" y1="10%" x2="80%" y2="90%"><stop stop-color="#b7b09a"/><stop offset="1" stop-color="#596f71"/></linearGradient><clipPath id="earth-clip"><circle cx="250" cy="250" r="220"/></clipPath></defs><g clip-path="url(#earth-clip)"><path d="${surface}" fill="url(#ocean)"/><path d="${continents}" fill="url(#land)" stroke="#a9c1c0" stroke-opacity=".34" stroke-width=".75"/><circle cx="250" cy="250" r="219.5" fill="none" stroke="#a7c2d2" stroke-opacity=".55" stroke-width="1"/></g></svg>`;
}
