'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Point = {
  lat: number;
  lng: number;
  name: string;
  region: string;
  role: 'xpert' | 'xplorer' | 'density';
};

const XPERTS: Point[] = [
  { lat: -49.33, lng: -72.89, name: 'Mateo R.', region: 'Patagonia, AR', role: 'xpert' },
  { lat: 43.06, lng: 141.35, name: 'Ayaka S.', region: 'Hokkaido, JP', role: 'xpert' },
  { lat: -2.33, lng: 34.83, name: 'Kwame O.', region: 'Serengeti, TZ', role: 'xpert' },
  { lat: 24.14, lng: -110.31, name: 'Lucía V.', region: 'Baja, MX', role: 'xpert' },
  { lat: 65.84, lng: -22.63, name: 'Finn B.', region: 'West Fjords, IS', role: 'xpert' },
  { lat: 34.17, lng: 77.58, name: 'Priya N.', region: 'Ladakh, IN', role: 'xpert' },
];

const HOTSPOTS: Point[] = [
  { lat: 40.71, lng: -74.01, name: 'Xplorers', region: 'New York', role: 'xplorer' },
  { lat: 34.05, lng: -118.24, name: 'Xplorers', region: 'Los Angeles', role: 'xplorer' },
  { lat: 37.77, lng: -122.42, name: 'Xplorers', region: 'San Francisco', role: 'xplorer' },
  { lat: 41.88, lng: -87.63, name: 'Xplorers', region: 'Chicago', role: 'xplorer' },
  { lat: 47.61, lng: -122.33, name: 'Xplorers', region: 'Seattle', role: 'xplorer' },
  { lat: 30.27, lng: -97.74, name: 'Xplorers', region: 'Austin', role: 'xplorer' },
  { lat: 39.74, lng: -104.99, name: 'Xplorers', region: 'Denver', role: 'xplorer' },
  { lat: 42.36, lng: -71.06, name: 'Xplorers', region: 'Boston', role: 'xplorer' },
  { lat: 38.91, lng: -77.04, name: 'Xplorers', region: 'Washington DC', role: 'xplorer' },
  { lat: 25.77, lng: -80.19, name: 'Xplorers', region: 'Miami', role: 'xplorer' },
  { lat: 33.75, lng: -84.39, name: 'Xplorers', region: 'Atlanta', role: 'xplorer' },
  { lat: 43.65, lng: -79.38, name: 'Xplorers', region: 'Toronto', role: 'xplorer' },
  { lat: 45.50, lng: -73.57, name: 'Xplorers', region: 'Montréal', role: 'xplorer' },
  { lat: 49.28, lng: -123.12, name: 'Xplorers', region: 'Vancouver', role: 'xplorer' },
  { lat: 51.51, lng: -0.13, name: 'Xplorers', region: 'London', role: 'xplorer' },
  { lat: 48.85, lng: 2.35, name: 'Xplorers', region: 'Paris', role: 'xplorer' },
  { lat: 35.69, lng: 139.69, name: 'Xplorers', region: 'Tokyo', role: 'xplorer' },
  { lat: -33.87, lng: 151.21, name: 'Xplorers', region: 'Sydney', role: 'xplorer' },
  { lat: -23.55, lng: -46.63, name: 'Xplorers', region: 'São Paulo', role: 'xplorer' },
];

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDensity(): Point[] {
  const rand = mulberry32(42);
  const out: Point[] = [];
  const clusters: Array<[number, number, number, number]> = [
    // [lat, lng, count, spread]
    [40.7, -74.0, 35, 3.5],    // NE corridor NYC/Philly/DC
    [42.3, -71.0, 15, 2.0],    // Boston
    [41.88, -87.6, 20, 2.5],   // Chicago / Great Lakes
    [42.3, -83.0, 10, 1.8],    // Detroit
    [34.05, -118.2, 25, 3.0],  // LA basin
    [37.7, -122.4, 15, 2.0],   // Bay Area
    [47.6, -122.3, 10, 1.5],   // Seattle
    [45.5, -122.6, 8, 1.5],    // Portland
    [39.7, -105.0, 8, 1.5],    // Denver
    [33.4, -112.0, 8, 1.5],    // Phoenix
    [30.3, -97.7, 10, 2.0],    // Austin/Dallas/Houston
    [29.7, -95.3, 10, 2.0],    // Houston
    [33.7, -84.4, 10, 2.0],    // Atlanta
    [25.8, -80.2, 10, 1.8],    // Miami/FL
    [28.5, -81.3, 6, 1.5],     // Orlando
    [36.1, -86.7, 6, 1.5],     // Nashville
    [43.6, -79.4, 12, 2.0],    // Toronto
    [45.5, -73.5, 8, 1.5],     // Montreal
    [49.3, -123.1, 6, 1.5],    // Vancouver
    [19.4, -99.1, 12, 2.0],    // Mexico City
    [20.7, -103.3, 6, 1.5],    // Guadalajara
    [51.5, -0.1, 15, 2.0],     // London
    [48.85, 2.35, 12, 2.0],    // Paris
    [52.5, 13.4, 10, 2.0],     // Berlin
    [52.4, 4.9, 8, 1.5],       // Amsterdam
    [41.4, 2.2, 8, 1.5],       // Barcelona
    [40.4, -3.7, 8, 1.5],      // Madrid
    [45.5, 9.2, 8, 1.5],       // Milan
    [55.7, 37.6, 8, 2.0],      // Moscow
    [35.7, 139.7, 15, 2.0],    // Tokyo
    [37.6, 127.0, 8, 1.5],     // Seoul
    [31.2, 121.5, 12, 2.0],    // Shanghai
    [22.3, 114.2, 8, 1.5],     // Hong Kong
    [1.35, 103.8, 6, 1.0],     // Singapore
    [13.7, 100.5, 6, 1.5],     // Bangkok
    [28.6, 77.2, 12, 2.0],     // Delhi
    [19.1, 72.9, 10, 1.8],     // Mumbai
    [25.2, 55.3, 6, 1.5],      // Dubai
    [30.0, 31.2, 8, 1.5],      // Cairo
    [-26.2, 28.0, 6, 1.5],     // Johannesburg
    [-33.9, 18.4, 6, 1.5],     // Cape Town
    [-23.5, -46.6, 10, 2.0],   // Sao Paulo
    [-34.6, -58.4, 8, 1.5],    // Buenos Aires
    [-33.9, 151.2, 8, 1.5],    // Sydney
    [-37.8, 145.0, 6, 1.5],    // Melbourne
  ];
  clusters.forEach(([lat, lng, count, spread]) => {
    for (let i = 0; i < count; i++) {
      out.push({
        lat: lat + (rand() - 0.5) * spread,
        lng: lng + (rand() - 0.5) * spread,
        name: '',
        region: '',
        role: 'density',
      });
    }
  });
  return out;
}

const DENSITY = buildDensity();
const ALL: Point[] = [...DENSITY, ...HOTSPOTS, ...XPERTS];

function hashVariation(lat: number, lng: number) {
  const h = Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453);
  return h - Math.floor(h);
}

export function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const composerRef = useRef<{ setSize: (w: number, h: number) => void } | null>(null);
  const bloomRef = useRef<{ setSize: (w: number, h: number) => void } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (composerRef.current && size.w > 0) {
      composerRef.current.setSize(size.w, size.h);
      bloomRef.current?.setSize(size.w, size.h);
    }
  }, [size]);

  useEffect(() => {
    const g = globeRef.current;
    if (!g || size.w === 0) return;
    let cancelled = false;

    const c = g.controls() as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      enableDamping: boolean;
      dampingFactor: number;
    };
    c.autoRotate = true;
    c.autoRotateSpeed = 0.25;
    c.enableZoom = false;
    c.enableDamping = true;
    c.dampingFactor = 0.08;
    g.pointOfView({ lat: 30, lng: -95, altitude: 1.5 }, 0);

    (async () => {
      const [THREE, composerMod, renderPassMod, bloomMod] = await Promise.all([
        import('three'),
        import('three/examples/jsm/postprocessing/EffectComposer.js'),
        import('three/examples/jsm/postprocessing/RenderPass.js'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
      ]);
      if (cancelled) return;

      const scene = g.scene();
      const camera = g.camera();
      const renderer = g.renderer();

      scene.children.forEach((child) => {
        const maybeLight = child as { isLight?: boolean; intensity?: number };
        if (maybeLight.isLight && typeof maybeLight.intensity === 'number') {
          maybeLight.intensity *= 0.15;
        }
      });

      const sun = new THREE.DirectionalLight(0xfff0d0, 0.6);
      sun.position.set(-180, 60, 100);
      scene.add(sun);

      const hemi = new THREE.HemisphereLight(0x9fb4c8, 0x050810, 0.25);
      scene.add(hemi);

      scene.traverse((obj) => {
        const mesh = obj as {
          type?: string;
          material?: {
            map?: unknown;
            emissiveMap?: unknown;
            emissive?: { set?: (c: number) => void };
            emissiveIntensity?: number;
            needsUpdate?: boolean;
          };
        };
        if (mesh.type === 'Mesh' && mesh.material?.map && !mesh.material.emissiveMap) {
          mesh.material.emissiveMap = mesh.material.map;
          mesh.material.emissive?.set?.(0xffffff);
          mesh.material.emissiveIntensity = 1.4;
          mesh.material.needsUpdate = true;
        }
      });

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const composer = new composerMod.EffectComposer(renderer);
      composer.addPass(new renderPassMod.RenderPass(scene, camera));
      const bloom = new bloomMod.UnrealBloomPass(
        new THREE.Vector2(size.w, size.h),
        0.75,
        0.55,
        0.22,
      );
      composer.addPass(bloom);
      composerRef.current = composer;
      bloomRef.current = bloom;

      renderer.render = () => composer.render();
    })();

    return () => {
      cancelled = true;
    };
  }, [size.w === 0]);

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,236,192,0.10),transparent_65%)] blur-2xl"
      />
      <div ref={containerRef} className="relative aspect-square">
        {size.w > 0 && (
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere
            atmosphereColor="#C8D8E6"
            atmosphereAltitude={0.22}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            pointsData={ALL}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat, p.lng);
              if (p.role === 'xpert') return '#FFFBE6';
              if (p.role === 'xplorer') return v > 0.5 ? '#FFF3C4' : '#FFE99A';
              return v > 0.5 ? '#FFE8A0' : '#FFDC80';
            }}
            pointAltitude={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat, p.lng);
              if (p.role === 'xpert') return 0.022 + v * 0.004;
              if (p.role === 'xplorer') return 0.01 + v * 0.003;
              return 0.003 + v * 0.002;
            }}
            pointRadius={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat + 1, p.lng);
              if (p.role === 'xpert') return 0.45 * (0.9 + v * 0.4);
              if (p.role === 'xplorer') return 0.22 * (0.8 + v * 0.5);
              return 0.09 * (0.7 + v * 0.8);
            }}
            pointLabel={(d: object) => {
              const p = d as Point;
              if (p.role === 'density') return '';
              const tag = p.role === 'xpert' ? 'Xpert' : 'Xplorers here';
              const primary = p.role === 'xpert' ? p.name : p.region;
              const secondary = p.role === 'xpert' ? p.region : '';
              return `
                <div style="background:#0a0a0a;color:#FFFFFF;padding:8px 12px;border-radius:8px;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.08em;border:1px solid rgba(255,236,192,0.3);box-shadow:0 8px 24px rgba(0,0,0,0.6);">
                  <div style="font-weight:700">${primary}</div>
                  ${secondary ? `<div style="opacity:0.6;font-size:10px;margin-top:2px">${secondary}</div>` : ''}
                  <div style="opacity:0.55;font-size:9px;text-transform:uppercase;letter-spacing:0.2em;margin-top:4px">${tag}</div>
                </div>
              `;
            }}
            ringsData={XPERTS}
            ringLat="lat"
            ringLng="lng"
            ringAltitude={0.006}
            ringColor={() => (t: number) => `rgba(255,251,230,${0.85 * (1 - t)})`}
            ringMaxRadius={4.2}
            ringPropagationSpeed={1.6}
            ringRepeatPeriod={1600}
          />
        )}
      </div>

      <div className="mt-5 flex justify-between items-center font-mono text-[10px] tracking-[0.2em] uppercase text-bone/55">
        <span>— Xploreum Network</span>
        <span>Live now</span>
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-bone/35">
        Live across North America · +22 countries
      </div>
    </div>
  );
}
