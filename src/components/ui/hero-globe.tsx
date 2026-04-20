'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Point = {
  lat: number;
  lng: number;
  city: string;
  country: string;
  name?: string;
  role: 'xpert' | 'xplorer' | 'density';
};

const XPERTS: Point[] = [
  { lat: -49.33, lng: -72.89, name: 'Mateo R.', city: 'El Chaltén', country: 'Argentina', role: 'xpert' },
  { lat: 43.06, lng: 141.35, name: 'Ayaka S.', city: 'Hokkaido', country: 'Japan', role: 'xpert' },
  { lat: -2.33, lng: 34.83, name: 'Kwame O.', city: 'Serengeti', country: 'Tanzania', role: 'xpert' },
  { lat: 24.14, lng: -110.31, name: 'Lucía V.', city: 'Baja California', country: 'Mexico', role: 'xpert' },
  { lat: 65.84, lng: -22.63, name: 'Finn B.', city: 'West Fjords', country: 'Iceland', role: 'xpert' },
  { lat: 34.17, lng: 77.58, name: 'Priya N.', city: 'Ladakh', country: 'India', role: 'xpert' },
  { lat: 39.19, lng: -106.82, name: 'Jesse C.', city: 'Aspen', country: 'USA', role: 'xpert' },
  { lat: 38.57, lng: -109.55, name: 'River H.', city: 'Moab', country: 'USA', role: 'xpert' },
  { lat: 35.01, lng: 135.77, name: 'Haruki T.', city: 'Kyoto', country: 'Japan', role: 'xpert' },
  { lat: -45.03, lng: 168.66, name: 'Ruben T.', city: 'Queenstown', country: 'New Zealand', role: 'xpert' },
  { lat: -13.53, lng: -71.97, name: 'Inti Q.', city: 'Cusco', country: 'Peru', role: 'xpert' },
  { lat: 45.92, lng: 6.87, name: 'Élise M.', city: 'Chamonix', country: 'France', role: 'xpert' },
];

const HOTSPOTS: Point[] = [
  // USA
  { lat: 40.71, lng: -74.01, city: 'New York', country: 'USA', role: 'xplorer' },
  { lat: 34.05, lng: -118.24, city: 'Los Angeles', country: 'USA', role: 'xplorer' },
  { lat: 37.77, lng: -122.42, city: 'San Francisco', country: 'USA', role: 'xplorer' },
  { lat: 32.72, lng: -117.16, city: 'San Diego', country: 'USA', role: 'xplorer' },
  { lat: 41.88, lng: -87.63, city: 'Chicago', country: 'USA', role: 'xplorer' },
  { lat: 47.61, lng: -122.33, city: 'Seattle', country: 'USA', role: 'xplorer' },
  { lat: 45.52, lng: -122.68, city: 'Portland', country: 'USA', role: 'xplorer' },
  { lat: 30.27, lng: -97.74, city: 'Austin', country: 'USA', role: 'xplorer' },
  { lat: 29.76, lng: -95.37, city: 'Houston', country: 'USA', role: 'xplorer' },
  { lat: 32.78, lng: -96.80, city: 'Dallas', country: 'USA', role: 'xplorer' },
  { lat: 39.74, lng: -104.99, city: 'Denver', country: 'USA', role: 'xplorer' },
  { lat: 40.76, lng: -111.89, city: 'Salt Lake City', country: 'USA', role: 'xplorer' },
  { lat: 36.17, lng: -115.14, city: 'Las Vegas', country: 'USA', role: 'xplorer' },
  { lat: 33.45, lng: -112.07, city: 'Phoenix', country: 'USA', role: 'xplorer' },
  { lat: 42.36, lng: -71.06, city: 'Boston', country: 'USA', role: 'xplorer' },
  { lat: 38.91, lng: -77.04, city: 'Washington DC', country: 'USA', role: 'xplorer' },
  { lat: 39.95, lng: -75.17, city: 'Philadelphia', country: 'USA', role: 'xplorer' },
  { lat: 40.44, lng: -79.99, city: 'Pittsburgh', country: 'USA', role: 'xplorer' },
  { lat: 42.33, lng: -83.05, city: 'Detroit', country: 'USA', role: 'xplorer' },
  { lat: 44.98, lng: -93.27, city: 'Minneapolis', country: 'USA', role: 'xplorer' },
  { lat: 36.16, lng: -86.78, city: 'Nashville', country: 'USA', role: 'xplorer' },
  { lat: 35.22, lng: -80.84, city: 'Charlotte', country: 'USA', role: 'xplorer' },
  { lat: 35.78, lng: -78.64, city: 'Raleigh', country: 'USA', role: 'xplorer' },
  { lat: 33.75, lng: -84.39, city: 'Atlanta', country: 'USA', role: 'xplorer' },
  { lat: 25.77, lng: -80.19, city: 'Miami', country: 'USA', role: 'xplorer' },
  { lat: 28.54, lng: -81.38, city: 'Orlando', country: 'USA', role: 'xplorer' },
  { lat: 29.95, lng: -90.07, city: 'New Orleans', country: 'USA', role: 'xplorer' },
  { lat: 42.88, lng: -78.88, city: 'Buffalo', country: 'USA', role: 'xplorer' },
  // Canada
  { lat: 43.65, lng: -79.38, city: 'Toronto', country: 'Canada', role: 'xplorer' },
  { lat: 45.50, lng: -73.57, city: 'Montréal', country: 'Canada', role: 'xplorer' },
  { lat: 45.42, lng: -75.70, city: 'Ottawa', country: 'Canada', role: 'xplorer' },
  { lat: 49.28, lng: -123.12, city: 'Vancouver', country: 'Canada', role: 'xplorer' },
  { lat: 51.05, lng: -114.07, city: 'Calgary', country: 'Canada', role: 'xplorer' },
  { lat: 44.65, lng: -63.58, city: 'Halifax', country: 'Canada', role: 'xplorer' },
  // Mexico
  { lat: 19.43, lng: -99.13, city: 'Mexico City', country: 'Mexico', role: 'xplorer' },
  { lat: 20.67, lng: -103.35, city: 'Guadalajara', country: 'Mexico', role: 'xplorer' },
  // Europe
  { lat: 51.51, lng: -0.13, city: 'London', country: 'UK', role: 'xplorer' },
  { lat: 48.85, lng: 2.35, city: 'Paris', country: 'France', role: 'xplorer' },
  { lat: 52.52, lng: 13.40, city: 'Berlin', country: 'Germany', role: 'xplorer' },
  { lat: 52.37, lng: 4.90, city: 'Amsterdam', country: 'Netherlands', role: 'xplorer' },
  { lat: 55.68, lng: 12.57, city: 'Copenhagen', country: 'Denmark', role: 'xplorer' },
  { lat: 59.33, lng: 18.06, city: 'Stockholm', country: 'Sweden', role: 'xplorer' },
  { lat: 41.39, lng: 2.17, city: 'Barcelona', country: 'Spain', role: 'xplorer' },
  { lat: 40.42, lng: -3.70, city: 'Madrid', country: 'Spain', role: 'xplorer' },
  { lat: 45.46, lng: 9.19, city: 'Milan', country: 'Italy', role: 'xplorer' },
  { lat: 41.90, lng: 12.50, city: 'Rome', country: 'Italy', role: 'xplorer' },
  { lat: 47.38, lng: 8.54, city: 'Zurich', country: 'Switzerland', role: 'xplorer' },
  { lat: 41.01, lng: 28.98, city: 'Istanbul', country: 'Turkey', role: 'xplorer' },
  // Asia
  { lat: 35.69, lng: 139.69, city: 'Tokyo', country: 'Japan', role: 'xplorer' },
  { lat: 37.57, lng: 126.98, city: 'Seoul', country: 'South Korea', role: 'xplorer' },
  { lat: 22.32, lng: 114.17, city: 'Hong Kong', country: 'China', role: 'xplorer' },
  { lat: 31.23, lng: 121.47, city: 'Shanghai', country: 'China', role: 'xplorer' },
  { lat: 1.35, lng: 103.82, city: 'Singapore', country: 'Singapore', role: 'xplorer' },
  { lat: 13.76, lng: 100.50, city: 'Bangkok', country: 'Thailand', role: 'xplorer' },
  { lat: 19.08, lng: 72.88, city: 'Mumbai', country: 'India', role: 'xplorer' },
  { lat: 28.61, lng: 77.21, city: 'Delhi', country: 'India', role: 'xplorer' },
  { lat: 25.20, lng: 55.27, city: 'Dubai', country: 'UAE', role: 'xplorer' },
  { lat: 32.08, lng: 34.78, city: 'Tel Aviv', country: 'Israel', role: 'xplorer' },
  // South America
  { lat: -23.55, lng: -46.63, city: 'São Paulo', country: 'Brazil', role: 'xplorer' },
  { lat: -22.91, lng: -43.17, city: 'Rio de Janeiro', country: 'Brazil', role: 'xplorer' },
  { lat: -34.61, lng: -58.38, city: 'Buenos Aires', country: 'Argentina', role: 'xplorer' },
  { lat: -33.45, lng: -70.65, city: 'Santiago', country: 'Chile', role: 'xplorer' },
  { lat: -12.05, lng: -77.04, city: 'Lima', country: 'Peru', role: 'xplorer' },
  { lat: 4.71, lng: -74.07, city: 'Bogotá', country: 'Colombia', role: 'xplorer' },
  // Oceania + Africa
  { lat: -33.87, lng: 151.21, city: 'Sydney', country: 'Australia', role: 'xplorer' },
  { lat: -37.81, lng: 144.96, city: 'Melbourne', country: 'Australia', role: 'xplorer' },
  { lat: -36.85, lng: 174.76, city: 'Auckland', country: 'New Zealand', role: 'xplorer' },
  { lat: -33.92, lng: 18.42, city: 'Cape Town', country: 'South Africa', role: 'xplorer' },
  { lat: -1.29, lng: 36.82, city: 'Nairobi', country: 'Kenya', role: 'xplorer' },
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
    [40.7, -74.0, 35, 3.5], [42.3, -71.0, 15, 2.0], [41.88, -87.6, 20, 2.5],
    [42.3, -83.0, 10, 1.8], [34.05, -118.2, 25, 3.0], [37.7, -122.4, 15, 2.0],
    [47.6, -122.3, 10, 1.5], [45.5, -122.6, 8, 1.5], [39.7, -105.0, 8, 1.5],
    [33.4, -112.0, 8, 1.5], [30.3, -97.7, 10, 2.0], [29.7, -95.3, 10, 2.0],
    [33.7, -84.4, 10, 2.0], [25.8, -80.2, 10, 1.8], [28.5, -81.3, 6, 1.5],
    [36.1, -86.7, 6, 1.5], [43.6, -79.4, 12, 2.0], [45.5, -73.5, 8, 1.5],
    [49.3, -123.1, 6, 1.5], [19.4, -99.1, 12, 2.0], [20.7, -103.3, 6, 1.5],
    [51.5, -0.1, 15, 2.0], [48.85, 2.35, 12, 2.0], [52.5, 13.4, 10, 2.0],
    [52.4, 4.9, 8, 1.5], [41.4, 2.2, 8, 1.5], [40.4, -3.7, 8, 1.5],
    [45.5, 9.2, 8, 1.5], [55.7, 37.6, 8, 2.0], [35.7, 139.7, 15, 2.0],
    [37.6, 127.0, 8, 1.5], [31.2, 121.5, 12, 2.0], [22.3, 114.2, 8, 1.5],
    [1.35, 103.8, 6, 1.0], [13.7, 100.5, 6, 1.5], [28.6, 77.2, 12, 2.0],
    [19.1, 72.9, 10, 1.8], [25.2, 55.3, 6, 1.5], [30.0, 31.2, 8, 1.5],
    [-26.2, 28.0, 6, 1.5], [-33.9, 18.4, 6, 1.5], [-23.5, -46.6, 10, 2.0],
    [-34.6, -58.4, 8, 1.5], [-33.9, 151.2, 8, 1.5], [-37.8, 145.0, 6, 1.5],
  ];
  clusters.forEach(([lat, lng, count, spread]) => {
    for (let i = 0; i < count; i++) {
      out.push({
        lat: lat + (rand() - 0.5) * spread,
        lng: lng + (rand() - 0.5) * spread,
        city: '',
        country: '',
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
    if (size.w === 0) return;
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let setupStarted = false;

    const tryRun = () => {
      const g = globeRef.current;
      if (!g || setupStarted) return !!setupStarted;
      setupStarted = true;

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
      g.pointOfView({ lat: 30, lng: -95, altitude: 1.3 }, 0);

      runBloom(g);
      return true;
    };

    const runBloom = (g: GlobeMethods) => (async () => {
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

      const rendererAny = renderer as unknown as {
        render: (...args: unknown[]) => unknown;
      };
      const origRender = rendererAny.render.bind(rendererAny);
      let rendering = false;
      rendererAny.render = (...args: unknown[]) => {
        if (rendering) return origRender(...args);
        rendering = true;
        composer.render();
        rendering = false;
      };
    })();

    if (!tryRun()) {
      intervalId = setInterval(() => {
        if (cancelled) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        if (tryRun() && intervalId) clearInterval(intervalId);
      }, 60);
    }

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [size.w === 0]);

  return (
    <div className="relative mx-auto w-full max-w-[800px]">
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
              if (p.role === 'xpert') return 0.012 + v * 0.003;
              if (p.role === 'xplorer') return 0.005 + v * 0.002;
              return 0.003 + v * 0.002;
            }}
            pointRadius={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat + 1, p.lng);
              if (p.role === 'xpert') return 0.14 * (0.9 + v * 0.4);
              if (p.role === 'xplorer') return 0.1 * (0.8 + v * 0.5);
              return 0.09 * (0.7 + v * 0.8);
            }}
            pointLabel={(d: object) => {
              const p = d as Point;
              if (p.role === 'density') return '';
              const isXpert = p.role === 'xpert';
              const primary = isXpert ? (p.name ?? '') : p.city;
              const secondary = isXpert ? `${p.city}, ${p.country}` : p.country;
              const tag = isXpert ? 'Xpert' : 'Xplorers';
              return `
                <div style="
                  background: rgba(10,10,12,0.92);
                  color: #FFFFFF;
                  padding: 10px 14px;
                  border-radius: 10px;
                  font-family: var(--font-urbanist), 'Urbanist', system-ui, sans-serif;
                  border: 1px solid rgba(255,236,192,0.22);
                  box-shadow: 0 12px 32px rgba(0,0,0,0.6);
                  backdrop-filter: blur(8px);
                  min-width: 140px;
                ">
                  <div style="font-weight:700;font-size:14px;letter-spacing:-0.01em">${primary}</div>
                  <div style="opacity:0.65;font-size:12px;margin-top:2px;font-weight:500">${secondary}</div>
                  <div style="opacity:0.5;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;margin-top:8px;font-weight:600">— ${tag}</div>
                </div>
              `;
            }}
          />
        )}
      </div>

      <div className="mt-5 flex justify-between items-center font-sans text-[11px] tracking-[0.2em] uppercase text-bone/55">
        <span>— Xploreum Network</span>
        <span>Live now</span>
      </div>
      <div className="mt-1 font-sans text-[11px] tracking-[0.2em] uppercase text-bone/35">
        Live across North America · +22 countries
      </div>
    </div>
  );
}
