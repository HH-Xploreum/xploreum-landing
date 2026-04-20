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
  // NYC metro (8)
  { lat: 40.71, lng: -74.01, name: 'Jordan', region: 'New York', role: 'xplorer' },
  { lat: 40.68, lng: -73.94, name: 'Alex', region: 'Brooklyn', role: 'xplorer' },
  { lat: 40.76, lng: -73.98, name: 'Taylor', region: 'Manhattan', role: 'xplorer' },
  { lat: 40.73, lng: -74.17, name: 'Sam', region: 'Newark', role: 'xplorer' },
  { lat: 40.79, lng: -73.96, name: 'Morgan', region: 'New York', role: 'xplorer' },
  { lat: 40.74, lng: -74.00, name: 'Riley', region: 'Chelsea', role: 'xplorer' },
  { lat: 40.72, lng: -74.05, name: 'Casey', region: 'Jersey City', role: 'xplorer' },
  { lat: 40.65, lng: -73.95, name: 'Avery', region: 'Brooklyn', role: 'xplorer' },
  // LA metro (6)
  { lat: 34.05, lng: -118.24, name: 'Maya', region: 'Los Angeles', role: 'xplorer' },
  { lat: 34.02, lng: -118.49, name: 'Logan', region: 'Santa Monica', role: 'xplorer' },
  { lat: 34.08, lng: -118.37, name: 'Harper', region: 'Hollywood', role: 'xplorer' },
  { lat: 33.78, lng: -118.19, name: 'Ellis', region: 'Long Beach', role: 'xplorer' },
  { lat: 34.14, lng: -118.14, name: 'River', region: 'Pasadena', role: 'xplorer' },
  { lat: 33.92, lng: -118.40, name: 'Quinn', region: 'El Segundo', role: 'xplorer' },
  // SF Bay (6)
  { lat: 37.77, lng: -122.42, name: 'Alex', region: 'San Francisco', role: 'xplorer' },
  { lat: 37.80, lng: -122.27, name: 'Remy', region: 'Oakland', role: 'xplorer' },
  { lat: 37.44, lng: -122.16, name: 'Sage', region: 'Palo Alto', role: 'xplorer' },
  { lat: 37.54, lng: -122.00, name: 'Rowan', region: 'Fremont', role: 'xplorer' },
  { lat: 37.87, lng: -122.27, name: 'Wren', region: 'Berkeley', role: 'xplorer' },
  { lat: 37.33, lng: -121.89, name: 'Blake', region: 'San Jose', role: 'xplorer' },
  // PNW (5)
  { lat: 47.61, lng: -122.33, name: 'Phoenix', region: 'Seattle', role: 'xplorer' },
  { lat: 45.52, lng: -122.68, name: 'Sawyer', region: 'Portland', role: 'xplorer' },
  { lat: 47.66, lng: -117.43, name: 'Dakota', region: 'Spokane', role: 'xplorer' },
  { lat: 49.28, lng: -123.12, name: 'Nikola', region: 'Vancouver', role: 'xplorer' },
  { lat: 44.05, lng: -123.09, name: 'Emery', region: 'Eugene', role: 'xplorer' },
  // Mountain West (5)
  { lat: 39.74, lng: -104.99, name: 'Ari', region: 'Denver', role: 'xplorer' },
  { lat: 40.76, lng: -111.89, name: 'Juno', region: 'Salt Lake City', role: 'xplorer' },
  { lat: 36.17, lng: -115.14, name: 'Kit', region: 'Las Vegas', role: 'xplorer' },
  { lat: 33.45, lng: -112.07, name: 'Sol', region: 'Phoenix', role: 'xplorer' },
  { lat: 43.61, lng: -116.20, name: 'North', region: 'Boise', role: 'xplorer' },
  // Texas (5)
  { lat: 30.27, lng: -97.74, name: 'Hayden', region: 'Austin', role: 'xplorer' },
  { lat: 29.76, lng: -95.37, name: 'Parker', region: 'Houston', role: 'xplorer' },
  { lat: 32.78, lng: -96.80, name: 'Sloane', region: 'Dallas', role: 'xplorer' },
  { lat: 29.42, lng: -98.49, name: 'Lennon', region: 'San Antonio', role: 'xplorer' },
  { lat: 31.76, lng: -106.49, name: 'Winter', region: 'El Paso', role: 'xplorer' },
  // Midwest (6)
  { lat: 41.88, lng: -87.63, name: 'Frankie', region: 'Chicago', role: 'xplorer' },
  { lat: 41.94, lng: -87.68, name: 'Drew', region: 'Chicago', role: 'xplorer' },
  { lat: 42.33, lng: -83.05, name: 'Rory', region: 'Detroit', role: 'xplorer' },
  { lat: 44.98, lng: -93.27, name: 'Micah', region: 'Minneapolis', role: 'xplorer' },
  { lat: 39.10, lng: -94.58, name: 'Corey', region: 'Kansas City', role: 'xplorer' },
  { lat: 38.63, lng: -90.20, name: 'Iris', region: 'St. Louis', role: 'xplorer' },
  // South (6)
  { lat: 33.75, lng: -84.39, name: 'Finley', region: 'Atlanta', role: 'xplorer' },
  { lat: 25.77, lng: -80.19, name: 'Lux', region: 'Miami', role: 'xplorer' },
  { lat: 28.54, lng: -81.38, name: 'Reese', region: 'Orlando', role: 'xplorer' },
  { lat: 36.16, lng: -86.78, name: 'Ember', region: 'Nashville', role: 'xplorer' },
  { lat: 29.95, lng: -90.07, name: 'Beau', region: 'New Orleans', role: 'xplorer' },
  { lat: 32.78, lng: -79.93, name: 'Piper', region: 'Charleston', role: 'xplorer' },
  // Northeast (6)
  { lat: 42.36, lng: -71.06, name: 'Teagan', region: 'Boston', role: 'xplorer' },
  { lat: 38.91, lng: -77.04, name: 'Presley', region: 'Washington DC', role: 'xplorer' },
  { lat: 39.95, lng: -75.17, name: 'Ashton', region: 'Philadelphia', role: 'xplorer' },
  { lat: 40.44, lng: -79.99, name: 'Briar', region: 'Pittsburgh', role: 'xplorer' },
  { lat: 42.88, lng: -78.88, name: 'Hollis', region: 'Buffalo', role: 'xplorer' },
  { lat: 41.31, lng: -72.92, name: 'Reeve', region: 'New Haven', role: 'xplorer' },
  // Canada (4)
  { lat: 43.65, lng: -79.38, name: 'Kai', region: 'Toronto', role: 'xplorer' },
  { lat: 45.50, lng: -73.57, name: 'Chloé', region: 'Montréal', role: 'xplorer' },
  { lat: 45.42, lng: -75.70, name: 'Théo', region: 'Ottawa', role: 'xplorer' },
  { lat: 51.05, lng: -114.07, name: 'Noa', region: 'Calgary', role: 'xplorer' },
  // Mexico (2)
  { lat: 19.43, lng: -99.13, name: 'Diego', region: 'Mexico City', role: 'xplorer' },
  { lat: 20.67, lng: -103.35, name: 'Paloma', region: 'Guadalajara', role: 'xplorer' },
  // International sprinkle (10)
  { lat: 51.51, lng: -0.13, name: 'Rachel', region: 'London', role: 'xplorer' },
  { lat: 48.85, lng: 2.35, name: 'Léa', region: 'Paris', role: 'xplorer' },
  { lat: 52.52, lng: 13.40, name: 'Niko', region: 'Berlin', role: 'xplorer' },
  { lat: 41.39, lng: 2.17, name: 'Elena', region: 'Barcelona', role: 'xplorer' },
  { lat: 59.33, lng: 18.06, name: 'Lars', region: 'Stockholm', role: 'xplorer' },
  { lat: 35.69, lng: 139.69, name: 'Kenji', region: 'Tokyo', role: 'xplorer' },
  { lat: -33.87, lng: 151.21, name: 'Hugh', region: 'Sydney', role: 'xplorer' },
  { lat: -23.55, lng: -46.63, name: 'Bruna', region: 'São Paulo', role: 'xplorer' },
  { lat: 25.20, lng: 55.27, name: 'Omar', region: 'Dubai', role: 'xplorer' },
  { lat: 1.35, lng: 103.82, name: 'Wei', region: 'Singapore', role: 'xplorer' },
];

const ALL: Point[] = [...XPLORERS, ...XPERTS];

const RING_CITIES = [
  ...XPERTS,
  ...XPLORERS.filter((p) =>
    ['New York', 'Los Angeles', 'San Francisco', 'Chicago', 'Seattle', 'Toronto', 'Denver', 'Austin', 'Miami', 'Washington DC', 'Boston', 'London', 'Tokyo', 'Portland', 'Atlanta'].includes(p.region),
  ),
];

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
    c.autoRotateSpeed = 0.35;
    c.enableZoom = false;
    g.pointOfView({ lat: 38, lng: -95, altitude: 1.7 }, 0);
  }, [size]);

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
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
            atmosphereColor="#F4E4C1"
            atmosphereAltitude={0.2}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            pointsData={ALL}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: object) => ((d as Point).role === 'xpert' ? '#FFF5D9' : '#F4E4C1')}
            pointAltitude={(d: object) => ((d as Point).role === 'xpert' ? 0.025 : 0.012)}
            pointRadius={(d: object) => ((d as Point).role === 'xpert' ? 0.45 : 0.28)}
            pointLabel={(d: object) => {
              const p = d as Point;
              const tag = p.role === 'xpert' ? 'Xpert' : 'Xplorer';
              return `
                <div style="background:#0a0a0a;color:#FFFFFF;padding:8px 12px;border-radius:8px;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.08em;border:1px solid rgba(244,228,193,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.6);">
                  <div style="font-weight:700">${p.name}</div>
                  <div style="opacity:0.6;font-size:10px;margin-top:2px">${p.region}</div>
                  <div style="opacity:0.5;font-size:9px;text-transform:uppercase;letter-spacing:0.2em;margin-top:4px">${tag}</div>
                </div>
              `;
            }}
            ringsData={RING_CITIES}
            ringLat="lat"
            ringLng="lng"
            ringAltitude={0.005}
            ringColor={() => (t: number) => `rgba(255,236,192,${0.7 * (1 - t)})`}
            ringMaxRadius={3.2}
            ringPropagationSpeed={1.4}
            ringRepeatPeriod={1800}
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
