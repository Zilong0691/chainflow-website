"use client";

import { useEffect, useRef } from "react";

/* 3D 地球 — Three.js 从 public/three.min.js 加载
   注入 <script> 到 document.head，全局可用 window.THREE */

declare global { interface Window { THREE: any; } }

const SCRIPT_URL = "/three.min.js";

function loadThree(): Promise<any> {
  return new Promise((resolve) => {
    if (window.THREE) return resolve(window.THREE);
    const s = document.createElement("script");
    s.src = SCRIPT_URL;
    s.onload = () => resolve(window.THREE);
    s.onerror = () => console.warn("Three.js failed to load");
    document.head.appendChild(s);
  });
}

const HUBS: [number,number][] = [[31.2,121.5],[22.5,114.1],[39.9,116.4],[1.3,103.8],[35.7,139.8],[25.3,55.3],[51.5,-0.1],[40.7,-74.0],[-118.3,33.7],[-33.9,151.2],[55.8,37.6],[18.9,72.8],[-23.9,-46.3],[41.0,29.0],[129.0,35.1]];
const ROUTES: [number,number,number,number][] = [[31.2,121.5,1.3,103.8],[31.2,121.5,25.3,55.3],[31.2,121.5,-118.3,33.7],[31.2,121.5,51.5,-0.1],[31.2,121.5,-33.9,151.2],[1.3,103.8,25.3,55.3],[25.3,55.3,51.5,-0.1],[51.5,-0.1,40.7,-74.0],[-118.3,33.7,40.7,-74.0],[31.2,121.5,-23.9,-46.3],[25.3,55.3,41.0,29.0],[51.5,-0.1,41.0,29.0],[31.2,121.5,55.8,37.6]];

export default function Globe3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;

    loadThree().then((THREE) => {
      if (!el.isConnected) return;
      const W = el.clientWidth, H = el.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, W/H, 0.1, 100);
      camera.position.set(0, 0.5, 7);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      const G = new THREE.Group(); scene.add(G);
      const R = 2.5;

      const ll = (lat:number,lng:number,r:number) => {
        const p=(90-lat)*Math.PI/180, t=(lng+180)*Math.PI/180;
        return new THREE.Vector3(-r*Math.sin(p)*Math.cos(t),r*Math.cos(p),r*Math.sin(p)*Math.sin(t));
      };

      scene.add(new THREE.AmbientLight(0x334466, 0.5));
      const sun = new THREE.DirectionalLight(0xe8f0ff, 1.5); sun.position.set(5,3,5); scene.add(sun);
      const fill = new THREE.DirectionalLight(0x4466aa, 0.3); fill.position.set(-3,-1,-3); scene.add(fill);

      G.add(new THREE.Mesh(new THREE.SphereGeometry(R,64,64), new THREE.MeshStandardMaterial({color:0x0a1628,roughness:0.9,metalness:0.1,emissive:0x001a33,emissiveIntensity:0.15})));
      G.add(new THREE.Mesh(new THREE.SphereGeometry(R*1.002,64,64), new THREE.MeshStandardMaterial({color:0x0d2137,roughness:0.6,metalness:0.3,transparent:true,opacity:0.4})));

      const grid = new THREE.Group();
      for(let la=-60;la<=60;la+=30){const p:any[]=[];for(let lo=0;lo<=360;lo+=3)p.push(ll(la,lo,R*1.004));grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p),new THREE.LineBasicMaterial({color:0x1e3a5f,transparent:true,opacity:0.25})));}
      for(let lo=0;lo<360;lo+=30){const p:any[]=[];for(let la=-90;la<=90;la+=3)p.push(ll(la,lo,R*1.004));grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p),new THREE.LineBasicMaterial({color:0x1e3a5f,transparent:true,opacity:0.25})));}
      G.add(grid);

      const rG = new THREE.Group();
      ROUTES.forEach(([la1,lo1,la2,lo2])=>{
        const a=ll(la1,lo1,R*1.06), b=ll(la2,lo2,R*1.06), m=a.clone().add(b).normalize().multiplyScalar(R*1.4);
        const c=new THREE.CubicBezierCurve3(a.clone(),m.clone().lerp(a,.3),m.clone().lerp(b,.3),b.clone());
        rG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(35)),new THREE.LineBasicMaterial({color:0xf2c76a,transparent:true,opacity:0.3})));
      });
      G.add(rG);

      const cG = new THREE.Group();
      HUBS.forEach(([la,lo])=>{const d=new THREE.Mesh(new THREE.SphereGeometry(.025,8,8),new THREE.MeshBasicMaterial({color:0xf2c76a}));d.position.copy(ll(la,lo,R*1.015));cG.add(d);});
      G.add(cG);

      const stars = new Float32Array(6000);
      for(let i=0;i<6000;i++)stars[i]=(Math.random()-.5)*40;
      scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(stars,3)),new THREE.PointsMaterial({color:0xffffff,size:.05})));

      let drag=false, px=0, py=0;
      el.addEventListener("pointerdown",e=>{drag=true;px=e.clientX;py=e.clientY});
      window.addEventListener("pointermove",e=>{if(!drag)return;G.rotation.y+=(e.clientX-px)*.005;G.rotation.x+=(e.clientY-py)*.005;px=e.clientX;py=e.clientY});
      window.addEventListener("pointerup",()=>{drag=false});
      el.addEventListener("wheel",e=>{e.preventDefault();camera.position.z=Math.max(3.5,Math.min(10,camera.position.z+e.deltaY*.005))},{passive:false});
      const onResize=()=>{const w=el.clientWidth,h=el.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};
      window.addEventListener("resize",onResize);

      let run=true;
      (function A(){if(!run)return;requestAnimationFrame(A);if(!drag)G.rotation.y+=.0015;renderer.render(scene,camera)})();

      return ()=>{run=false;window.removeEventListener("resize",onResize);renderer.dispose();el.contains(renderer.domElement)&&el.removeChild(renderer.domElement)};
    });
  }, []);

  return <div ref={ref} className="h-full w-full" />;
}
