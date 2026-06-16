"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { feature } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";

/* ═══════════════════════════════════════
   3D 地球 — Three.js + 玻璃拟态
   国际航线 · 铁路公路网 · 人口热力 · 拖拽旋转
   ═══════════════════════════════════════ */

const topoAny = worldTopo as any;
const landData = feature(topoAny, topoAny.objects.land);
const countriesData = feature(topoAny, topoAny.objects.countries);

// 经纬度→3D球面坐标
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ═══ 航线数据 ═══
const HUB_CITIES: [string, number, number][] = [
  ["上海", 31.2, 121.5], ["深圳", 22.5, 114.1], ["北京", 39.9, 116.4], ["广州", 23.1, 113.3],
  ["东京", 35.7, 139.8], ["新加坡", 1.3, 103.8], ["迪拜", 25.3, 55.3], ["伦敦", 51.5, -0.1],
  ["纽约", 40.7, -74.0], ["洛杉矶", 33.7, -118.3], ["鹿特丹", 51.9, 4.5], ["悉尼", -33.9, 151.2],
  ["香港", 22.3, 114.2], ["釜山", 35.1, 129.0], ["孟买", 18.9, 72.8], ["开普敦", -33.9, 18.4],
  ["圣保罗", -23.9, -46.3], ["莫斯科", 55.8, 37.6], ["伊斯坦布尔", 41.0, 29.0],
];

const SHIPPING_ROUTES: [number, number, number, number][] = [
  [31.2, 121.5, 1.3, 103.8], [31.2, 121.5, 22.3, 114.2], [31.2, 121.5, 35.7, 139.8],
  [31.2, 121.5, 25.3, 55.3], [31.2, 121.5, -118.3, 33.7], [1.3, 103.8, 25.3, 55.3],
  [25.3, 55.3, 51.5, -0.1], [51.5, -0.1, 40.7, -74.0], [-118.3, 33.7, 40.7, -74.0],
  [31.2, 121.5, -33.9, 151.2], [1.3, 103.8, -33.9, 151.2], [22.5, 114.1, 1.3, 103.8],
  [39.9, 116.4, 25.3, 55.3], [22.5, 114.1, -118.3, 33.7], [-33.9, 151.2, -23.9, -46.3],
  [51.5, -0.1, 25.3, 55.3], [31.2, 121.5, -23.9, -46.3], [35.7, 139.8, -118.3, 33.7],
  [25.3, 55.3, -33.9, 18.4], [1.3, 103.8, 18.9, 72.8], [31.2, 121.5, 55.8, 37.6],
  [22.5, 114.1, 55.8, 37.6], [25.3, 55.3, 41.0, 29.0], [51.5, -0.1, 41.0, 29.0],
];

// ═══ 曲航线 ═══
function ArcCurve(start: THREE.Vector3, end: THREE.Vector3, radius: number): THREE.Vector3[] {
  const mid = start.clone().add(end).normalize().multiplyScalar(radius * 1.35);
  const curve = new THREE.QuadraticBezierCurve3(start.clone(), mid, end.clone());
  return curve.getPoints(40);
}

function EarthSurface({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const bordersRef = useRef<THREE.Group>(null);

  // 海洋底色 + 大陆边界
  const borderLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    if (landData) {
      const coords = (landData as any).geometry?.coordinates || [];
      const processRing = (ring: number[][]) => {
        const pts: THREE.Vector3[] = [];
        ring.forEach(([lng, lat]) => {
          if (lat == null || lng == null) return;
          pts.push(latLngToVec3(lat, lng, radius * 1.002));
        });
        if (pts.length > 2) lines.push(pts);
      };
      coords.forEach((poly: any) => {
        if (Array.isArray(poly[0]?.[0]?.[0])) {
          poly.forEach((ring: number[][]) => processRing(ring));
        } else if (Array.isArray(poly[0]?.[0])) {
          processRing(poly[0]);
        }
      });
    }
    return lines;
  }, [radius]);

  return (
    <group>
      {/* 海洋球体 */}
      <Sphere ref={meshRef} args={[radius, 64, 64]}>
        <meshStandardMaterial
          color="#0a1628"
          roughness={0.9}
          metalness={0.1}
          emissive="#001a33"
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* 大陆轮廓 — 发光蓝线 */}
      <group ref={bordersRef}>
        {borderLines.map((pts, i) => (
          <Line key={i} points={pts} color="#1e90ff" lineWidth={0.6} transparent opacity={0.5} />
        ))}
      </group>

      {/* 大陆填充 — 微光半透明 */}
      <Sphere args={[radius * 1.001, 64, 64]}>
        <meshStandardMaterial
          color="#0d2137"
          roughness={0.6}
          metalness={0.3}
          transparent
          opacity={0.5}
          side={THREE.FrontSide}
        />
      </Sphere>

      {/* 经纬网 */}
      <GridLines radius={radius} />
    </group>
  );
}

function GridLines({ radius }: { radius: number }) {
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    // 纬线
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 2)
        pts.push(latLngToVec3(lat, lng, radius * 1.003));
      lines.push(pts);
    }
    // 经线
    for (let lng = 0; lng < 360; lng += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2)
        pts.push(latLngToVec3(lat, lng, radius * 1.003));
      lines.push(pts);
    }
    return lines;
  }, [radius]);

  return (
    <group>
      {gridLines.map((pts, i) => (
        <Line key={`grid-${i}`} points={pts} color="#1e3a5f" lineWidth={0.3} transparent opacity={0.25} />
      ))}
    </group>
  );
}

function ShippingRoutes({ radius }: { radius: number }) {
  const arcs = useMemo(() => {
    return SHIPPING_ROUTES.map(([lat1, lng1, lat2, lng2]) => {
      const start = latLngToVec3(lat1, lng1, radius * 1.06);
      const end = latLngToVec3(lat2, lng2, radius * 1.06);
      return ArcCurve(start, end, radius);
    });
  }, [radius]);

  return (
    <group>
      {arcs.map((pts, i) => (
        <Line key={`route-${i}`} points={pts} color="#00bfff" lineWidth={0.5} transparent opacity={0.3} />
      ))}
    </group>
  );
}

function CityDots({ radius }: { radius: number }) {
  const dots = useMemo(() => {
    return HUB_CITIES.map(([, lat, lng]) => ({
      position: latLngToVec3(lat, lng, radius * 1.015),
    }));
  }, [radius]);

  return (
    <group>
      {dots.map((d, i) => (
        <mesh key={i} position={d.position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      ))}
    </group>
  );
}

function PopulationHeatmap({ radius }: { radius: number }) {
  const heatPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const cities: [number, number, number][] = [
      [31.2, 121.5, 1.2], [39.9, 116.4, 0.9], [22.5, 114.1, 0.8], [23.1, 113.3, 0.7],
      [35.7, 139.8, 0.9], [1.3, 103.8, 0.5], [25.3, 55.3, 0.1], [51.5, -0.1, 0.4],
      [40.7, -74.0, 0.5], [-118.3, 33.7, 0.3], [-33.9, 151.2, 0.2], [18.9, 72.8, 0.8],
      [-23.9, -46.3, 0.4], [19.4, -99.1, 0.3], [55.8, 37.6, 0.3], [41.0, 29.0, 0.2],
    ];
    cities.forEach(([lat, lng, sz]) => {
      pts.push(latLngToVec3(lat, lng, radius * 1.008));
    });
    return pts;
  }, [radius]);

  return (
    <group>
      {heatPoints.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ff4400" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function StarfieldBackground() {
  return (
    <Stars
      radius={80}
      depth={50}
      count={2000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  );
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.5;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04; // 缓慢自转
    }
  });

  return (
    <group ref={groupRef}>
      <EarthSurface radius={radius} />
      <ShippingRoutes radius={radius} />
      <CityDots radius={radius} />
      <PopulationHeatmap radius={radius} />
    </group>
  );
}

export default function Globe3D() {
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-cyan-500/15 bg-[#030b17]"
      style={{ background: "radial-gradient(ellipse at center, #0a1a30 0%, #030b17 70%)" }}>
      {/* 玻璃拟态边框 */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.04] backdrop-blur-[2px] pointer-events-none z-10" />

      <Canvas
        camera={{ position: [0, 0.5, 6.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1.2} color="#e8f0ff" />
          <directionalLight position={[-3, -1, -3]} intensity={0.3} color="#4466aa" />
          <StarfieldBackground />
          <GlobeScene />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3.5}
            maxDistance={10}
            rotateSpeed={0.5}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* 玻璃拟态叠加层 */}
      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md px-4 py-2.5">
        <div className="flex items-center justify-between text-xs text-cyan-300/70">
          <span>🌍 Global Supply Chain Network</span>
          <span className="text-cyan-400/50">24 routes · 19 hubs · 2000–2026</span>
        </div>
      </div>
    </div>
  );
}
