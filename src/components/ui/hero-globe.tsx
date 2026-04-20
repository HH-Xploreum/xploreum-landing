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

const XPLORERS: Point[] = [
  { lat: 40.71, lng: -74.01, name: 'Jordan', region: 'New York', role: 'xplorer' },
  { lat: 34.05, lng: -118.24, name: 'Maya', region: 'Los Angeles', role: 'xplorer' },
  { lat: 37.77, lng: -122.41, name: 'Alex', region: 'San Francisco', role: 'xplorer' },
  { lat: 43.65, lng: -79.38, name: 'Sam', region: 'Toronto', role: 'xplorer' },
  { lat: 45.50, lng: -73.57, name: 'Chloé', region: 'Montréal', role: 'xplorer' },
  { lat: 19.43, lng: -99.13, name: 'Diego', region: 'Mexico City', role: 'xplorer' },
  { lat: 51.51, lng: -0.13, name: 'Rachel', region: 'London', role: 'xplorer' },
  { lat: 48.85, lng: 2.35, name: 'Léa', region: 'Paris', role: 'xplorer' },
  { lat: 52.52, lng: 13.40, name: 'Niko', region: 'Berlin', role: 'xplorer' },
  { lat: 40.42, lng: -3.70, name: 'Sofía', region: 'Madrid', role: 'xplorer' },
  { lat: 41.39, lng: 2.17, name: 'Elena', region: 'Barcelona', role: 'xplorer' },
  { lat: 52.37, lng: 4.90, name: 'Eva', region: 'Amsterdam', role: 'xplorer' },
  { lat: 55.68, lng: 12.57, name: 'Ida', region: 'Copenhagen', role: 'xplorer' },
  { lat: 59.33, lng: 18.06, name: 'Lars', region: 'Stockholm', role: 'xplorer' },
  { lat: 47.38, lng: 8.54, name: 'Noah', region: 'Zurich', role: 'xplorer' },
  { lat: 45.46, lng: 9.19, name: 'Marco', region: 'Milan', role: 'xplorer' },
  { lat: 41.01, lng: 28.98, name: 'Zeynep', region: 'Istanbul', role: 'xplorer' },
  { lat: 30.04, lng: 31.24, name: 'Hana', region: 'Cairo', role: 'xplorer' },
  { lat: -33.92, lng: 18.42, name: 'Thando', region: 'Cape Town', role: 'xplorer' },
  { lat: -1.29, lng: 36.82, name: 'David', region: 'Nairobi', role: 'xplorer' },
  { lat: 25.20, lng: 55.27, name: 'Omar', region: 'Dubai', role: 'xplorer' },
  { lat: 19.08, lng: 72.88, name: 'Aanya', region: 'Mumbai', role: 'xplorer' },
  { lat: 13.76, lng: 100.50, name: 'Anong', region: 'Bangkok', role: 'xplorer' },
  { lat: 1.35, lng: 103.82, name: 'Wei', region: 'Singapore', role: 'xplorer' },
  { lat: 37.57, lng: 126.98, name: 'Mina', region: 'Seoul', role: 'xplorer' },
  { lat: 35.69, lng: 139.69, name: 'Kenji', region: 'Tokyo', role: 'xplorer' },
  { lat: -33.87, lng: 151.21, name: 'Hugh', region: 'Sydney', role: 'xplorer' },
  { lat: -37.81, lng: 144.96, name: 'Olivia', region: 'Melbourne', role: 'xplorer' },
  { lat: -36.85, lng: 174.76, name: 'Nathan', region: 'Auckland', role: 'xplorer' },
  { lat: 4.71, lng: -74.07, name: 'Camila', region: 'Bogotá', role: 'xplorer' },
  { lat: -12.05, lng: -77.04, name: 'Santiago', region: 'Lima', role: 'xplorer' },
  { lat: -33.45, lng: -70.65, name: 'Javier', region: 'Santiago', role: 'xplorer' },
  { lat: -34.61, lng: -58.38, name: 'Valentina', region: 'Buenos Aires', role: 'xplorer' },
  { lat: -23.55, lng: -46.63, name: 'Bruna', region: 'São Paulo', role: 'xplorer' },
];

const ALL: Point[] = [...XPLORERS, ...XPERTS];

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
    const c = g.controls() as { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean };
    c.autoRotate = true;
    c.autoRotateSpeed = 0.4;
    c.enableZoom = false;
    g.pointOfView({ lat: 20, lng: -20, altitude: 2.2 }, 0);
  }, [size]);

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        ref={containerRef}
        className="relative aspect-square rounded-3xl overflow-hidden bg-forest-deep shadow-[0_40px_80px_-30px_rgba(15,36,23,0.5)]"
      >
        {size.w > 0 && (
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere
            atmosphereColor="#6B8570"
            atmosphereAltitude={0.18}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            pointsData={ALL}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: object) => ((d as Point).role === 'xpert' ? '#E0D8C2' : '#6B8570')}
            pointAltitude={(d: object) => ((d as Point).role === 'xpert' ? 0.015 : 0.005)}
            pointRadius={(d: object) => ((d as Point).role === 'xpert' ? 0.5 : 0.28)}
            pointLabel={(d: object) => {
              const p = d as Point;
              const tag = p.role === 'xpert' ? 'Xpert' : 'Xplorer';
              return `
                <div style="background:#0F2417;color:#FFFFFF;padding:8px 12px;border-radius:8px;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.08em;border:1px solid rgba(224,216,194,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.4);">
                  <div style="font-weight:700">${p.name}</div>
                  <div style="opacity:0.6;font-size:10px;margin-top:2px">${p.region}</div>
                  <div style="opacity:0.5;font-size:9px;text-transform:uppercase;letter-spacing:0.2em;margin-top:4px">${tag}</div>
                </div>
              `;
            }}
          />
        )}

        <div className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/60">
          — Xploreum Network
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end font-mono text-[10px] tracking-[0.2em] uppercase text-bone/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-moss" />
            <span>128 Xplorers</span>
          </div>
          <div className="flex items-center gap-2">
            <span>46 Xperts · 18 countries</span>
            <span className="w-1.5 h-1.5 rounded-full bg-bone-soft" />
          </div>
        </div>
      </div>

      <div className="block text-center mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-moss">
        — Live now
      </div>
    </div>
  );
}
