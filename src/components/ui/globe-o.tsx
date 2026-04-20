'use client';

import dynamic from 'next/dynamic';
import type { GlobeStyle } from './globe';

const GlobeCanvas = dynamic(
  () => import('./globe').then((m) => m.GlobeCanvas),
  { ssr: false, loading: () => null },
);

export function GlobeO({
  style = 'night',
  size = '0.74em',
}: {
  style?: GlobeStyle;
  size?: string;
}) {
  return (
    <span
      aria-hidden
      className="relative inline-block align-baseline"
      style={{
        width: size,
        height: size,
        transform: 'translateY(0.02em)',
      }}
    >
      {/* Soft halo — pure white, tight, sits just outside the globe rim */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '-0.06em',
          background:
            'radial-gradient(closest-side, rgba(255,255,255,0) 83%, rgba(255,255,255,0.20) 90%, rgba(255,255,255,0) 100%)',
          filter: 'blur(0.008em)',
        }}
      />

      {/* Globe disc */}
      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ background: '#0a1420' }}
      >
        <GlobeCanvas style={style} />

        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.10), rgba(255,255,255,0) 50%)',
          }}
        />
      </span>
    </span>
  );
}
