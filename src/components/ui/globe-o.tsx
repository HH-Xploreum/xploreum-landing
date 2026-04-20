'use client';

import dynamic from 'next/dynamic';

const GlobeCanvas = dynamic(
  () => import('./globe').then((m) => m.GlobeCanvas),
  { ssr: false, loading: () => null },
);

export function GlobeO() {
  return (
    <span
      aria-hidden
      className="relative inline-block align-baseline"
      style={{
        width: '0.74em',
        height: '0.74em',
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
            '0 0 0 1.5px rgba(255,255,255,0.92), 0 10px 40px -10px rgba(140,190,255,0.35), inset 0 0 25px rgba(0,0,0,0.55)',
          background: '#05090f',
        }}
      >
        <GlobeCanvas />

        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.12), rgba(255,255,255,0) 45%), radial-gradient(circle at 70% 75%, rgba(0,0,0,0.45), rgba(0,0,0,0) 55%)',
          }}
        />
      </span>
    </span>
  );
}
