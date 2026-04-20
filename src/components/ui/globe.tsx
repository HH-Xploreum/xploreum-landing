'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { TextureLoader, SRGBColorSpace } from 'three';

export type GlobeStyle = 'night' | 'topo' | 'minimal' | 'day';

const INITIAL_ROTATION: [number, number, number] = [0.3, -2.4, 0];

function NightEarth() {
  const tex = useLoader(TextureLoader, '/textures/night.jpg');
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  return (
    <mesh rotation={INITIAL_ROTATION}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#ffe8b8"
        emissiveIntensity={2.4}
        color="#3a4a60"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

function SingleTextureEarth({ src, tint }: { src: string; tint: string }) {
  const tex = useLoader(TextureLoader, src);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  return (
    <mesh rotation={INITIAL_ROTATION}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial map={tex} color={tint} roughness={0.85} metalness={0} />
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

export function GlobeCanvas({
  style = 'night',
  interactive = true,
}: {
  style?: GlobeStyle;
  interactive?: boolean;
}) {
  const isNight = style === 'night';

  const lighting = {
    night: { ambient: 0.45, directional: 0.55, atmosphere: '#3a5680', atmOpacity: 0.12 },
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

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={interactive}
        autoRotate
        autoRotateSpeed={0.7}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />

      {isNight && (
        <EffectComposer>
          <Bloom
            intensity={0.95}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.55}
            mipmapBlur
            radius={0.6}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
