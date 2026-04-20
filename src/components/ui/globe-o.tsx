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
        transform: 'translateY(0.04em)',
      }}
    >
      <span
        className="absolute rounded-full"
        style={{
          inset: '-0.08em',
          background:
            'radial-gradient(closest-side, rgba(150,200,255,0.22), rgba(150,200,255,0) 70%)',
          filter: 'blur(6px)',
        }}
      />

      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow:
            '0 0 0 1.5px rgba(255,255,255,0.92), 0 10px 40px -10px rgba(140,190,255,0.4)',
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
