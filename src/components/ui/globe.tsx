'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import { TextureLoader, SRGBColorSpace, type Mesh } from 'three';

export type GlobeStyle = 'night' | 'topo' | 'minimal' | 'day';

function NightEarth() {
  const tex = useLoader(TextureLoader, '/textures/night.jpg');
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  const mesh = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.055;
  });

  return (
    <mesh ref={mesh} rotation={[0.35, -1.2, 0]}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#fff1d0"
        emissiveIntensity={3.2}
        color="#1a1f28"
        roughness={0.95}
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

function Atmosphere({ color, opacity = 0.12 }: { color: string; opacity?: number }) {
  return (
    <>
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <mesh scale={1.1}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={color} transparent opacity={opacity * 0.3} depthWrite={false} />
      </mesh>
    </>
  );
}

export function GlobeCanvas({ style = 'night' }: { style?: GlobeStyle }) {
  const isNight = style === 'night';

  const lighting = {
    night: { ambient: 0.15, directional: 0.2, atmosphere: '#2a3d5a', atmOpacity: 0.08 },
    topo: { ambient: 0.7, directional: 1.1, atmosphere: '#a0c0ff', atmOpacity: 0.12 },
    minimal: { ambient: 0.5, directional: 1.3, atmosphere: '#b0c8ff', atmOpacity: 0.12 },
    day: { ambient: 0.7, directional: 1.2, atmosphere: '#9fc0ff', atmOpacity: 0.12 },
  }[style];

  return (
    <Canvas
      camera={{ position: [0, 0, 2.55], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={lighting.ambient} />
      <directionalLight position={[4, 2, 5]} intensity={lighting.directional} color="#ffffff" />
      {!isNight && (
        <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#a8c6ff" />
      )}
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
        <Atmosphere color={lighting.atmosphere} opacity={lighting.atmOpacity} />
      </Suspense>

      {isNight && (
        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.6}
            mipmapBlur
            radius={0.75}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
