'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Point = {
  lat: number;
  lng: number;
  intensity: number;
};

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

function buildCityLights(): Point[] {
  const rand = mulberry32(7);
  const out: Point[] = [];
  const clusters: Array<[number, number, number, number]> = [
    [40.7, -74.0, 45, 3.5], [42.3, -71.0, 18, 2.0], [41.88, -87.6, 25, 2.5],
    [42.3, -83.0, 12, 1.8], [34.05, -118.2, 30, 3.0], [37.7, -122.4, 18, 2.0],
    [47.6, -122.3, 12, 1.5], [45.5, -122.6, 10, 1.5], [39.7, -105.0, 10, 1.5],
    [33.4, -112.0, 10, 1.5], [30.3, -97.7, 12, 2.0], [29.7, -95.3, 12, 2.0],
    [33.7, -84.4, 12, 2.0], [25.8, -80.2, 12, 1.8], [28.5, -81.3, 8, 1.5],
    [36.1, -86.7, 8, 1.5], [43.6, -79.4, 14, 2.0], [45.5, -73.5, 10, 1.5],
    [49.3, -123.1, 8, 1.5], [19.4, -99.1, 14, 2.0], [20.7, -103.3, 8, 1.5],
    [51.5, -0.1, 20, 2.5], [48.85, 2.35, 16, 2.0], [52.5, 13.4, 12, 2.0],
    [52.4, 4.9, 10, 1.5], [41.4, 2.2, 10, 1.5], [40.4, -3.7, 10, 1.5],
    [45.5, 9.2, 10, 1.5], [55.7, 37.6, 12, 2.5], [35.7, 139.7, 20, 2.5],
    [37.6, 127.0, 10, 1.5], [31.2, 121.5, 14, 2.0], [22.3, 114.2, 10, 1.5],
    [1.35, 103.8, 8, 1.0], [13.7, 100.5, 8, 1.5], [28.6, 77.2, 14, 2.0],
    [19.1, 72.9, 12, 1.8], [25.2, 55.3, 8, 1.5], [30.0, 31.2, 10, 1.5],
    [-26.2, 28.0, 8, 1.5], [-33.9, 18.4, 8, 1.5], [-23.5, -46.6, 12, 2.0],
    [-34.6, -58.4, 10, 1.5], [-33.9, 151.2, 10, 1.5], [-37.8, 145.0, 8, 1.5],
  ];
  clusters.forEach(([lat, lng, count, spread]) => {
    for (let i = 0; i < count; i++) {
      out.push({
        lat: lat + (rand() - 0.5) * spread,
        lng: lng + (rand() - 0.5) * spread,
        intensity: 0.5 + rand() * 0.5,
      });
    }
  });
  return out;
}

const CITY_LIGHTS = buildCityLights();

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
      if (!g || setupStarted) return setupStarted;
      setupStarted = true;

      const c = g.controls() as {
        autoRotate: boolean;
        autoRotateSpeed: number;
        enableZoom: boolean;
        enableDamping: boolean;
        dampingFactor: number;
        enablePan: boolean;
        enableRotate: boolean;
      };
      c.autoRotate = true;
      c.autoRotateSpeed = 0.3;
      c.enableZoom = false;
      c.enableDamping = true;
      c.dampingFactor = 0.08;
      c.enablePan = false;
      c.enableRotate = false;
      g.pointOfView({ lat: 20, lng: -30, altitude: 1.8 }, 0);

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
            maybeLight.intensity *= 0.2;
          }
        });

        const sun = new THREE.DirectionalLight(0xfff0d0, 0.5);
        sun.position.set(-180, 60, 100);
        scene.add(sun);

        const hemi = new THREE.HemisphereLight(0xaabed0, 0x050810, 0.3);
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
            mesh.material.emissiveIntensity = 1.8;
            mesh.material.needsUpdate = true;
          }
        });

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;

        const composer = new composerMod.EffectComposer(renderer);
        composer.addPass(new renderPassMod.RenderPass(scene, camera));
        const bloom = new bloomMod.UnrealBloomPass(
          new THREE.Vector2(size.w, size.h),
          0.95,
          0.6,
          0.15,
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
      return true;
    };

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
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    >
      {size.w > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere
          atmosphereColor="#C8D8E6"
          atmosphereAltitude={0.18}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={CITY_LIGHTS}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d: object) =>
            (d as Point).intensity > 0.75 ? '#FFF4D0' : '#FFE8A8'
          }
          pointAltitude={(d: object) => 0.002 + (d as Point).intensity * 0.004}
          pointRadius={(d: object) => 0.08 * (0.7 + (d as Point).intensity * 0.6)}
          pointLabel={() => ''}
        />
      )}
    </div>
  );
}
