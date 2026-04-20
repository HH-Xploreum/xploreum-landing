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
  role: 'xpert' | 'xplorer';
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
  { lat: 45.52, lng: -122.68, name: 'Xplorers', region: 'Portland', role: 'xplorer' },
  { lat: 30.27, lng: -97.74, name: 'Xplorers', region: 'Austin', role: 'xplorer' },
  { lat: 39.74, lng: -104.99, name: 'Xplorers', region: 'Denver', role: 'xplorer' },
  { lat: 42.36, lng: -71.06, name: 'Xplorers', region: 'Boston', role: 'xplorer' },
  { lat: 38.91, lng: -77.04, name: 'Xplorers', region: 'Washington DC', role: 'xplorer' },
  { lat: 25.77, lng: -80.19, name: 'Xplorers', region: 'Miami', role: 'xplorer' },
  { lat: 33.75, lng: -84.39, name: 'Xplorers', region: 'Atlanta', role: 'xplorer' },
  { lat: 43.65, lng: -79.38, name: 'Xplorers', region: 'Toronto', role: 'xplorer' },
  { lat: 45.50, lng: -73.57, name: 'Xplorers', region: 'Montréal', role: 'xplorer' },
  { lat: 49.28, lng: -123.12, name: 'Xplorers', region: 'Vancouver', role: 'xplorer' },
  { lat: 19.43, lng: -99.13, name: 'Xplorers', region: 'Mexico City', role: 'xplorer' },
  { lat: 51.51, lng: -0.13, name: 'Xplorers', region: 'London', role: 'xplorer' },
  { lat: 48.85, lng: 2.35, name: 'Xplorers', region: 'Paris', role: 'xplorer' },
  { lat: 52.52, lng: 13.40, name: 'Xplorers', region: 'Berlin', role: 'xplorer' },
  { lat: 35.69, lng: 139.69, name: 'Xplorers', region: 'Tokyo', role: 'xplorer' },
  { lat: -33.87, lng: 151.21, name: 'Xplorers', region: 'Sydney', role: 'xplorer' },
  { lat: -23.55, lng: -46.63, name: 'Xplorers', region: 'São Paulo', role: 'xplorer' },
];

const ALL: Point[] = [...HOTSPOTS, ...XPERTS];

// Deterministic jitter so brightness/size vary per dot without hydration mismatch.
function hashVariation(lat: number, lng: number) {
  const h = Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453);
  return h - Math.floor(h);
}

export function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
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
    const g = globeRef.current;
    if (!g) return;
    let cancelled = false;

    const c = g.controls() as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      enableDamping: boolean;
      dampingFactor: number;
    };
    c.autoRotate = true;
    c.autoRotateSpeed = 0.3;
    c.enableZoom = false;
    c.enableDamping = true;
    c.dampingFactor = 0.08;

    g.pointOfView({ lat: 30, lng: -95, altitude: 1.45 }, 0);

    import('three').then((THREE) => {
      if (cancelled) return;
      const scene = g.scene();
      scene.children.forEach((child) => {
        const maybeLight = child as { isLight?: boolean; intensity?: number };
        if (maybeLight.isLight && typeof maybeLight.intensity === 'number') {
          maybeLight.intensity *= 0.25;
        }
      });

      const sun = new THREE.DirectionalLight(0xffecc0, 1.6);
      sun.position.set(-180, 80, 120);
      scene.add(sun);

      const hemi = new THREE.HemisphereLight(0x8899aa, 0x0a1020, 0.25);
      scene.add(hemi);

      const ambient = new THREE.AmbientLight(0xffffff, 0.08);
      scene.add(ambient);

      const renderer = g.renderer();
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;
    });

    return () => {
      cancelled = true;
    };
  }, [size]);

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div
        ref={containerRef}
        className="relative aspect-square rounded-3xl overflow-hidden bg-black"
      >
        {size.w > 0 && (
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere
            atmosphereColor="#93A5B8"
            atmosphereAltitude={0.14}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            pointsData={ALL}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat, p.lng);
              if (p.role === 'xpert') return '#FFFBE6';
              return v > 0.6 ? '#FFF3C4' : '#FFE99A';
            }}
            pointAltitude={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat, p.lng);
              return (p.role === 'xpert' ? 0.022 : 0.008) + v * 0.004;
            }}
            pointRadius={(d: object) => {
              const p = d as Point;
              const v = hashVariation(p.lat + 1, p.lng);
              return (p.role === 'xpert' ? 0.45 : 0.26) * (0.8 + v * 0.5);
            }}
            pointLabel={(d: object) => {
              const p = d as Point;
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
            ringsData={ALL}
            ringLat="lat"
            ringLng="lng"
            ringAltitude={0.005}
            ringColor={(d: object) => {
              const role = (d as Point).role;
              return (t: number) =>
                role === 'xpert'
                  ? `rgba(255,251,230,${0.85 * (1 - t)})`
                  : `rgba(255,233,154,${0.55 * (1 - t)})`;
            }}
            ringMaxRadius={(d: object) => ((d as Point).role === 'xpert' ? 4.5 : 2.6)}
            ringPropagationSpeed={(d: object) =>
              (d as Point).role === 'xpert' ? 1.8 : 1.2
            }
            ringRepeatPeriod={(d: object) =>
              (d as Point).role === 'xpert' ? 1500 : 2200
            }
          />
        )}

        <div className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/60">
          — Xploreum Network
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end font-mono text-[10px] tracking-[0.2em] uppercase text-bone/60">
          <span>Lighting up where we&apos;re live</span>
          <span>North America · +22 countries</span>
        </div>
      </div>

      <div className="block text-center mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-moss">
        — Live now
      </div>
    </div>
  );
}
