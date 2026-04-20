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
      {/* Soft diffused halo — tight, restrained, off-white */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '-0.07em',
          background:
            'radial-gradient(closest-side, rgba(245,245,248,0) 74%, rgba(245,245,248,0.14) 86%, rgba(240,240,245,0.06) 94%, rgba(240,240,245,0) 100%)',
        }}
      />

      {/* Globe disc — gentle lift, no glow */}
      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow: '0 0 0.04em rgba(240,240,245,0.08)',
          background: '#0a1420',
        }}
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
