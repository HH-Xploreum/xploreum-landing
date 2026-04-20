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
      {/* Soft diffused halo — no hard line, just atmosphere */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '-0.18em',
          background:
            'radial-gradient(closest-side, rgba(180,210,250,0) 58%, rgba(200,220,255,0.32) 70%, rgba(170,200,245,0.18) 80%, rgba(140,180,235,0.08) 92%, rgba(140,180,235,0) 100%)',
          filter: 'blur(0.018em)',
        }}
      />

      {/* Globe disc — no stroke, just a soft outer glow for dimension */}
      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow:
            '0 0 0.04em rgba(220,230,255,0.18), 0 0 0.12em rgba(170,200,245,0.22), 0 0 0.28em rgba(130,170,230,0.14)',
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
