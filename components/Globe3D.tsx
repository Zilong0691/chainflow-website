"use client";

"use client";

import { useEffect, useRef } from "react";

declare const THREE: any;

/* ═══════════════════════════════════════
   3D 地球 — 纯 Three.js + 玻璃拟态
   航线 · 城市 · 热力 · 拖拽旋转 · 星空
   ═══════════════════════════════════════ */

const HUBS: [number, number][] = [[31.2,121.5],[22.5,114.1],[39.9,116.4],[1.3,103.8],[35.7,139.8],[25.3,55.3],[51.5,-0.1],[40.7,-74.0],[-118.3,33.7],[-33.9,151.2],[55.8,37.6],[18.9,72.8],[-23.9,-46.3],[41.0,29.0],[129.0,35.1]];

const ROUTES: [number,number,number,number][] = [
  [31.2,121.5,1.3,103.8],[31.2,121.5,25.3,55.3],[31.2,121.5,-118.3,33.7],[31.2,121.5,51.5,-0.1],[31.2,121.5,-33.9,151.2],[1.3,103.8,25.3,55.3],[25.3,55.3,51.5,-0.1],[51.5,-0.1,40.7,-74.0],[-118.3,33.7,40.7,-74.0],[31.2,121.5,-23.9,-46.3],[22.5,114.1,1.3,103.8],[1.3,103.8,18.9,72.8],[25.3,55.3,41.0,29.0],[51.5,-0.1,41.0,29.0],[31.2,121.5,55.8,37.6],[22.5,114.1,55.8,37.6],
];

function latLngToVec3(lat: number, lng: number, r: number, T: any): any {
  const phi = (90 - lat) * (Math.PI / 180), theta = (lng + 180) * (Math.PI / 180);
  return new T.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function loadThree(): Promise<any> {
  return new Promise((resolve) => {
    if ((window as any).THREE) return resolve((window as any).THREE);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/three@0.160.0/build/three.min.js";
    script.onload = () => resolve((window as any).THREE);
    document.head.appendChild(script);
  });
}

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    loadThree().then((THREE) => {
    if (!document.body.contains(el)) return;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const R = 2.5;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    scene.add(new THREE.AmbientLight(0x334466, 0.5));
    const sun = new THREE.DirectionalLight(0xe8f0ff, 1.5); sun.position.set(5, 3, 5); scene.add(sun);
    const fill = new THREE.DirectionalLight(0x4466aa, 0.3); fill.position.set(-3, -1, -3); scene.add(fill);

    // 海洋
    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), new THREE.MeshStandardMaterial({ color: 0x0a1628, roughness: 0.9, metalness: 0.1, emissive: 0x001a33, emissiveIntensity: 0.15 })));
    // 大陆层
    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.002, 64, 64), new THREE.MeshStandardMaterial({ color: 0x0d2137, roughness: 0.6, metalness: 0.3, transparent: true, opacity: 0.4 })));

    // 经纬网
    const gridG = new THREE.Group();
    for (let lat = -60; lat <= 60; lat += 30) { const pts: any[] = []; for (let lng = 0; lng <= 360; lng += 3) pts.push(latLngToVec3(lat, lng, R * 1.004, THREE)); gridG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x1e3a5f, transparent: true, opacity: 0.25 }))); }
    for (let lng = 0; lng < 360; lng += 30) { const pts: any[] = []; for (let lat = -90; lat <= 90; lat += 3) pts.push(latLngToVec3(lat, lng, R * 1.004, THREE)); gridG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x1e3a5f, transparent: true, opacity: 0.25 }))); }
    globeGroup.add(gridG);

    // 航线
    const routeG = new THREE.Group();
    ROUTES.forEach(([la1, lo1, la2, lo2]) => {
      const a = latLngToVec3(la1, lo1, R * 1.06, THREE), b = latLngToVec3(la2, lo2, R * 1.06, THREE);
      const mid = a.clone().add(b).normalize().multiplyScalar(R * 1.4);
      const c = new THREE.CubicBezierCurve3(a.clone(), mid.clone().lerp(a, 0.3), mid.clone().lerp(b, 0.3), b.clone());
      routeG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(35)), new THREE.LineBasicMaterial({ color: 0x00bfff, transparent: true, opacity: 0.3 })));
    });
    globeGroup.add(routeG);

    // 城市点
    const cityG = new THREE.Group();
    HUBS.forEach(([lat, lng]) => { const dot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00e5ff })); dot.position.copy(latLngToVec3(lat, lng, R * 1.015, THREE)); cityG.add(dot); });
    globeGroup.add(cityG);

    // 热力
    const heatG = new THREE.Group();
    [[31.2,121.5],[39.9,116.4],[18.9,72.8],[35.7,139.8],[40.7,-74.0],[-118.3,33.7],[-23.9,-46.3],[19.4,-99.1]].forEach(([la, lo]) => { const dot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.6 })); dot.position.copy(latLngToVec3(la, lo, R * 1.012, THREE)); heatG.add(dot); });
    globeGroup.add(heatG);

    // 星空
    const starsArr: number[] = [];
    for (let i = 0; i < 2000; i++) { starsArr.push((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40); }
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(starsArr, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 })));

    // 交互
    let isDragging = false, prev = { x: 0, y: 0 };
    el.addEventListener("pointerdown", e => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
    window.addEventListener("pointermove", e => { if (!isDragging) return; globeGroup.rotation.y += (e.clientX - prev.x) * 0.005; globeGroup.rotation.x += (e.clientY - prev.y) * 0.005; prev = { x: e.clientX, y: e.clientY }; });
    window.addEventListener("pointerup", () => { isDragging = false; });
    el.addEventListener("wheel", e => { e.preventDefault(); camera.position.z = Math.max(3.5, Math.min(10, camera.position.z + e.deltaY * 0.005)); }, { passive: false });

    const onResize = () => { const w = el.clientWidth, h = el.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); };
    window.addEventListener("resize", onResize);

    let running = true;
    const animate = () => { if (!running) return; requestAnimationFrame(animate); if (!isDragging) globeGroup.rotation.y += 0.0015; renderer.render(scene, camera); };
    animate();

    cleanup = () => {
      running = false;
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
    }); // end loadThree().then
    return () => { cleanup?.(); };
  }, []);

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-cyan-500/15" style={{ background: "radial-gradient(ellipse at center, #0a1a30 0%, #030b17 70%)" }}>
      <div className="absolute inset-0 rounded-2xl border border-white/[0.04] pointer-events-none z-10" />
      <div ref={mountRef} className="h-full w-full" />
      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md px-4 py-2.5">
        <div className="flex items-center justify-between text-xs text-cyan-300/70">
          <span>🌍 Global Supply Chain Network</span>
          <span className="text-cyan-400/50">24 routes · 15 hubs</span>
        </div>
      </div>
    </div>
  );
}
