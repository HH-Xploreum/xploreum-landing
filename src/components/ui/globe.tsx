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

export type GlobeStyle =
  | 'neon'        // dark ocean, traced coastlines, glowing land
  | 'live'        // day/night shader, realistic rotating earth
  | 'night'       // pure Black Marble with heavy bloom
  | 'topo'        // greyscale topographic relief
  | 'minimal'     // very restrained silhouette
  | 'day'         // classic Blue Marble day
  | 'brand'       // forest-green monochrome
  | 'wireframe';  // geometric lines only

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

    vec3 nightColor = night * vec3(1.35, 1.15, 0.85) * 1.55;
    vec3 dayColor = day * vec3(0.95, 1.0, 1.05);

    vec3 color = mix(nightColor, dayColor, dayFactor);

    float terminator = 1.0 - abs(sunDot - 0.08) * 5.0;
    terminator = clamp(terminator, 0.0, 1.0);
    color += vec3(1.0, 0.55, 0.25) * terminator * 0.14;

    float rim = 1.0 - max(0.0, dot(vWorldNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 2.5);
    color += vec3(0.55, 0.75, 1.0) * rim * 0.25;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const NEON_FRAGMENT = `
  uniform sampler2D landMap;
  uniform sampler2D cityMap;
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  float land(vec2 uv) {
    return smoothstep(0.015, 0.18, texture2D(landMap, uv).r);
  }

  void main() {
    float l = land(vUv);

    // Coastline edge via gradient sampling on the land mask
    float e = 0.0022;
    float lu = land(vUv + vec2(0.0, e));
    float ld = land(vUv + vec2(0.0, -e));
    float ll = land(vUv + vec2(-e, 0.0));
    float lr = land(vUv + vec2(e, 0.0));
    float edge = abs(lu - ld) + abs(ll - lr);

    // Base land glow — cool blue-white, dim
    vec3 base = vec3(0.32, 0.55, 0.95) * l * 0.45;

    // Bright coastline trace
    vec3 coastline = vec3(0.85, 0.95, 1.0) * edge * 5.0;

    // City clusters sparkling across the land, cool-tinted
    vec3 cities = texture2D(cityMap, vUv).rgb * l;
    cities *= vec3(1.0, 1.3, 2.2) * 2.4;

    vec3 color = base + coastline + cities;

    // Outer rim atmosphere
    float rim = 1.0 - max(0.0, dot(vWorldNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 3.0);
    color += vec3(0.55, 0.8, 1.0) * rim * 0.35;

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

function NeonEarth() {
  const [landTex, cityTex] = useLoader(TextureLoader, [
    '/textures/topo.png',
    '/textures/night.jpg',
  ]);
  landTex.colorSpace = SRGBColorSpace;
  cityTex.colorSpace = SRGBColorSpace;
  landTex.anisotropy = 8;
  cityTex.anisotropy = 8;

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          landMap: { value: landTex },
          cityMap: { value: cityTex },
        },
        vertexShader: DAY_NIGHT_VERTEX,
        fragmentShader: NEON_FRAGMENT,
      }),
    [landTex, cityTex],
  );

  return (
    <mesh rotation={INITIAL_ROTATION} material={material}>
      <sphereGeometry args={[1, 128, 128]} />
    </mesh>
  );
}

function PureNightEarth() {
  const tex = useLoader(TextureLoader, '/textures/night.jpg');
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  return (
    <mesh rotation={INITIAL_ROTATION}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#fff0c8"
        emissiveIntensity={3.0}
        color="#0a0c12"
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

  return (
    <mesh rotation={INITIAL_ROTATION}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial map={tex} color={tint} roughness={0.85} metalness={0} />
    </mesh>
  );
}

function BrandEarth() {
  const tex = useLoader(TextureLoader, '/textures/topo.png');
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;

  return (
    <mesh rotation={INITIAL_ROTATION}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#1E3A2A"
        emissiveIntensity={1.8}
        color="#0f2417"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

function WireframeEarth() {
  return (
    <>
      <mesh rotation={INITIAL_ROTATION}>
        <sphereGeometry args={[1, 32, 20]} />
        <meshBasicMaterial color="#1E3A2A" wireframe opacity={0.85} transparent />
      </mesh>
      <mesh rotation={INITIAL_ROTATION}>
        <sphereGeometry args={[0.995, 64, 64]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </>
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
  style = 'neon',
  interactive = true,
}: {
  style?: GlobeStyle;
  interactive?: boolean;
}) {
  const usesExternalShader = style === 'live' || style === 'neon' || style === 'wireframe';
  const needsBloom = style === 'night' || style === 'live' || style === 'neon';

  const lightPreset = {
    neon: { ambient: 0, directional: 0, atmosphere: '#2a4a7a', atmOpacity: 0 },
    live: { ambient: 0, directional: 0, atmosphere: '#3a5680', atmOpacity: 0 },
    night: { ambient: 0.15, directional: 0.25, atmosphere: '#2a3d5a', atmOpacity: 0.08 },
    topo: { ambient: 0.7, directional: 1.1, atmosphere: '#a0c0ff', atmOpacity: 0.12 },
    minimal: { ambient: 0.5, directional: 1.3, atmosphere: '#b0c8ff', atmOpacity: 0.12 },
    day: { ambient: 0.7, directional: 1.2, atmosphere: '#9fc0ff', atmOpacity: 0.12 },
    brand: { ambient: 0.35, directional: 0.9, atmosphere: '#4a7560', atmOpacity: 0.08 },
    wireframe: { ambient: 0, directional: 0, atmosphere: '#1E3A2A', atmOpacity: 0 },
  }[style];

  return (
    <Canvas
      camera={{ position: [0, 0, 2.55], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      {!usesExternalShader && (
        <>
          <ambientLight intensity={lightPreset.ambient} />
          <directionalLight position={[4, 2, 5]} intensity={lightPreset.directional} color="#ffffff" />
          {style !== 'night' && (
            <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#a8c6ff" />
          )}
        </>
      )}
      <Suspense fallback={null}>
        {style === 'neon' && <NeonEarth />}
        {style === 'live' && <LiveEarth />}
        {style === 'night' && <PureNightEarth />}
        {style === 'topo' && (
          <SingleTextureEarth src="/textures/topo.png" tint="#c0ccd4" />
        )}
        {style === 'minimal' && (
          <SingleTextureEarth src="/textures/minimal.jpg" tint="#d0d7de" />
        )}
        {style === 'day' && (
          <SingleTextureEarth src="/textures/day.jpg" tint="#ffffff" />
        )}
        {style === 'brand' && <BrandEarth />}
        {style === 'wireframe' && <WireframeEarth />}
        {lightPreset.atmOpacity > 0 && (
          <Atmosphere color={lightPreset.atmosphere} opacity={lightPreset.atmOpacity} />
        )}
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

      {needsBloom && (
        <EffectComposer>
          <Bloom
            intensity={style === 'night' ? 1.3 : style === 'neon' ? 1.15 : 0.75}
            luminanceThreshold={style === 'night' ? 0.3 : style === 'neon' ? 0.35 : 0.55}
            luminanceSmoothing={0.6}
            mipmapBlur
            radius={style === 'night' ? 0.75 : style === 'neon' ? 0.7 : 0.55}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
