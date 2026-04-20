'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { TextureLoader, SRGBColorSpace, type Mesh } from 'three';

function Earth() {
  const tex = useLoader(TextureLoader, '/earth-night.jpg');
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  const mesh = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.04;
  });

  return (
    <mesh ref={mesh} rotation={[0.35, -1.2, 0]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#ffd7a3"
        emissiveIntensity={0.9}
        roughness={0.85}
        metalness={0}
      />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <mesh scale={1.035}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color="#7fb3ff"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

export function GlobeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.55], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 2, 5]} intensity={0.45} color="#cfe2ff" />
      <directionalLight position={[-4, -1, -3]} intensity={0.15} color="#ffb27a" />
      <Suspense fallback={null}>
        <Earth />
        <Atmosphere />
      </Suspense>
    </Canvas>
  );
}
