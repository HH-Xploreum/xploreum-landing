'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { TextureLoader, SRGBColorSpace, type Mesh } from 'three';

export type GlobeStyle = 'night' | 'topo' | 'minimal' | 'day';

function NightEarth() {
  const [dayTex, nightTex] = useLoader(TextureLoader, [
    '/textures/day.jpg',
    '/textures/night.jpg',
  ]);
  dayTex.colorSpace = SRGBColorSpace;
  nightTex.colorSpace = SRGBColorSpace;
  dayTex.anisotropy = 8;
  nightTex.anisotropy = 8;

  const mesh = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.055;
  });

  return (
    <mesh ref={mesh} rotation={[0.35, -1.2, 0]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        map={dayTex}
        emissiveMap={nightTex}
        emissive="#ffb877"
        emissiveIntensity={1.8}
        color="#7d98b3"
        roughness={0.85}
        metalness={0}
      />
    </mesh>
  );
}

function SingleTextureEarth({ src, tint }: { src: string; tint: string }) {
  const tex = useLoader(TextureLoader, src);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  const mesh = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.055;
  });

  return (
    <mesh ref={mesh} rotation={[0.35, -1.2, 0]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        map={tex}
        color={tint}
        roughness={0.85}
        metalness={0}
      />
    </mesh>
  );
}

function Atmosphere({ color }: { color: string }) {
  return (
    <>
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export function GlobeCanvas({ style = 'night' }: { style?: GlobeStyle }) {
  const lighting = {
    night: { ambient: 1.1, directional: 1.0, atmosphere: '#8fb8ff' },
    topo: { ambient: 0.7, directional: 1.1, atmosphere: '#a0c0ff' },
    minimal: { ambient: 0.5, directional: 1.3, atmosphere: '#b0c8ff' },
    day: { ambient: 0.7, directional: 1.2, atmosphere: '#9fc0ff' },
  }[style];

  return (
    <Canvas
      camera={{ position: [0, 0, 2.55], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={lighting.ambient} />
      <directionalLight position={[4, 2, 5]} intensity={lighting.directional} color="#ffffff" />
      <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#a8c6ff" />
      <Suspense fallback={null}>
        {style === 'night' && <NightEarth />}
        {style === 'topo' && (
          <SingleTextureEarth src="/textures/topo.png" tint="#c0ccd4" />
        )}
        {style === 'minimal' && (
          <SingleTextureEarth src="/textures/minimal.jpg" tint="#d0d7de" />
        )}
        {style === 'day' && (
          <SingleTextureEarth src="/textures/day.jpg" tint="#ffffff" />
        )}
        <Atmosphere color={lighting.atmosphere} />
      </Suspense>
    </Canvas>
  );
}
