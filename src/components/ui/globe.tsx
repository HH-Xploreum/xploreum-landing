'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense, useMemo } from 'react';
import {
  TextureLoader,
  SRGBColorSpace,
  Vector3,
  ShaderMaterial,
} from 'three';

export type GlobeStyle = 'night' | 'topo' | 'minimal' | 'day';

const INITIAL_ROTATION: [number, number, number] = [0.3, -2.4, 0];

const DAY_NIGHT_VERTEX = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DAY_NIGHT_FRAGMENT = `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb;

    float sunDot = dot(vWorldNormal, sunDirection);
    float dayFactor = smoothstep(-0.12, 0.28, sunDot);

    // Warm, slightly boosted city lights
    vec3 nightColor = night * vec3(1.35, 1.15, 0.85) * 1.55;

    // Subtle desaturation on the day side for a cinematic mood
    vec3 dayColor = day * vec3(0.95, 1.0, 1.05);

    vec3 color = mix(nightColor, dayColor, dayFactor);

    // Warm atmospheric glow along the day/night terminator
    float terminator = 1.0 - abs(sunDot - 0.08) * 5.0;
    terminator = clamp(terminator, 0.0, 1.0);
    color += vec3(1.0, 0.55, 0.25) * terminator * 0.14;

    // Cool rim fresnel so the silhouette reads on light backgrounds
    float rim = 1.0 - max(0.0, dot(vWorldNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 2.5);
    color += vec3(0.55, 0.75, 1.0) * rim * 0.25;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function LiveEarth() {
  const [dayTex, nightTex] = useLoader(TextureLoader, [
    '/textures/day.jpg',
    '/textures/night.jpg',
  ]);
  dayTex.colorSpace = SRGBColorSpace;
  nightTex.colorSpace = SRGBColorSpace;
  dayTex.anisotropy = 8;
  nightTex.anisotropy = 8;

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          dayMap: { value: dayTex },
          nightMap: { value: nightTex },
          sunDirection: { value: new Vector3(0.9, 0.15, 0.4).normalize() },
        },
        vertexShader: DAY_NIGHT_VERTEX,
        fragmentShader: DAY_NIGHT_FRAGMENT,
      }),
    [dayTex, nightTex],
  );

  return (
    <mesh rotation={INITIAL_ROTATION} material={material}>
      <sphereGeometry args={[1, 128, 128]} />
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
    night: { ambient: 0, directional: 0, atmosphere: '#3a5680', atmOpacity: 0.0 },
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
      {!isNight && (
        <>
          <ambientLight intensity={lighting.ambient} />
          <directionalLight position={[4, 2, 5]} intensity={lighting.directional} color="#ffffff" />
          <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#a8c6ff" />
        </>
      )}
      <Suspense fallback={null}>
        {style === 'night' && <LiveEarth />}
        {style === 'topo' && (
          <SingleTextureEarth src="/textures/topo.png" tint="#c0ccd4" />
        )}
        {style === 'minimal' && (
          <SingleTextureEarth src="/textures/minimal.jpg" tint="#d0d7de" />
        )}
        {style === 'day' && (
          <SingleTextureEarth src="/textures/day.jpg" tint="#ffffff" />
        )}
        {!isNight && <Atmosphere color={lighting.atmosphere} opacity={lighting.atmOpacity} />}
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
            intensity={0.75}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.6}
            mipmapBlur
            radius={0.55}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
