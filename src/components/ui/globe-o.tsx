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
      {/* Very subtle off-white halo — planet first, glow secondary */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '-0.04em',
          background:
            'radial-gradient(closest-side, rgba(255,250,240,0) 82%, rgba(255,250,240,0.14) 92%, rgba(255,250,240,0) 100%)',
        }}
      />

      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow: '0 0 0 0.028em var(--color-forest)',
          background: '#0a1018',
        }}
      >
        <GlobeCanvas style={style} />
      </span>
    </span>
  );
}
