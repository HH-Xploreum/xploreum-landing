'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { TextureLoader, SRGBColorSpace, type Mesh } from 'three';

export type GlobeStyle = 'night' | 'topo' | 'minimal' | 'day';

const TEX: Record<GlobeStyle, string> = {
  night: '/textures/night.jpg',
  topo: '/textures/topo.png',
  minimal: '/textures/minimal.jpg',
  day: '/textures/day.jpg',
};

type StyleParams = {
  ambient: number;
  directional: number;
  emissiveColor: string;
  emissiveIntensity: number;
  tint?: string;
  useEmissiveMap: boolean;
  atmosphere: string;
};

const PARAMS: Record<GlobeStyle, StyleParams> = {
  night: {
    ambient: 0.75,
    directional: 0.45,
    emissiveColor: '#ffd7a3',
    emissiveIntensity: 0.9,
    useEmissiveMap: true,
    atmosphere: '#7fb3ff',
  },
  topo: {
    ambient: 0.55,
    directional: 0.9,
    emissiveColor: '#ffffff',
    emissiveIntensity: 0,
    useEmissiveMap: false,
    tint: '#b8c6cf',
    atmosphere: '#9fc0ff',
  },
  minimal: {
    ambient: 0.35,
    directional: 1.2,
    emissiveColor: '#ffffff',
    emissiveIntensity: 0,
    useEmissiveMap: false,
    tint: '#cfd7de',
    atmosphere: '#b0c8ff',
  },
  day: {
    ambient: 0.5,
    directional: 1.1,
    emissiveColor: '#ffffff',
    emissiveIntensity: 0,
    useEmissiveMap: false,
    atmosphere: '#9fc0ff',
  },
};

function Earth({ style }: { style: GlobeStyle }) {
  const tex = useLoader(TextureLoader, TEX[style]);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  const mesh = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.04;
  });

  const p = PARAMS[style];

  return (
    <mesh ref={mesh} rotation={[0.35, -1.2, 0]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={p.useEmissiveMap ? tex : undefined}
        emissive={p.emissiveColor}
        emissiveIntensity={p.emissiveIntensity}
        color={p.tint ?? '#ffffff'}
        roughness={0.85}
        metalness={0}
      />
    </mesh>
  );
}

function Atmosphere({ color }: { color: string }) {
  return (
    <mesh scale={1.035}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

export function GlobeCanvas({ style = 'night' }: { style?: GlobeStyle }) {
  const p = PARAMS[style];
  return (
    <Canvas
      camera={{ position: [0, 0, 2.55], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={p.ambient} />
      <directionalLight position={[4, 2, 5]} intensity={p.directional} color="#cfe2ff" />
      <directionalLight position={[-4, -1, -3]} intensity={0.15} color="#ffb27a" />
      <Suspense fallback={null}>
        <Earth style={style} />
        <Atmosphere color={p.atmosphere} />
      </Suspense>
    </Canvas>
  );
}
