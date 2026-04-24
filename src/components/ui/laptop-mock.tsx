'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type LaptopMockProps = {
  /** Ordered list of screen images. The first entry shows by default. */
  screens: { src: string; alt: string }[];
  /** Which screen is currently visible. Other screens crossfade out. */
  activeIndex?: number;
  /** Optional max-width override (default scales 380px → 720px with viewport). */
  className?: string;
};

/**
 * MacBook-style laptop. Renders all `screens` stacked inside the lid and
 * crossfades between them based on `activeIndex` so the device feels alive
 * as the surrounding section scrolls. Sized via container queries (cqw) so
 * every detail — bezel thickness, notch, hinge — scales together.
 */
export function LaptopMock({
  screens,
  activeIndex = 0,
  className = '',
}: LaptopMockProps) {
  // Preload neighbours so crossfades feel instant.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`relative mx-auto w-full ${className}`}
      style={{
        maxWidth: 'clamp(320px, 52vw, 760px)',
        containerType: 'inline-size',
      }}
    >
      {/* Contact shadow — softbox under the device */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: '-2.5cqw',
          width: '78%',
          height: '6cqw',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(15,36,23,0.32), rgba(15,36,23,0) 70%)',
          filter: 'blur(2.5cqw)',
        }}
      />

      {/* Lid — aluminum frame */}
      <div
        className="relative"
        style={{
          aspectRatio: '16 / 9.4',
          borderRadius: '1.6cqw',
          padding: '0.9cqw',
          background:
            'linear-gradient(160deg, #2a2d33 0%, #1a1d22 35%, #0f1115 100%)',
          boxShadow: [
            '0 2cqw 4cqw -1cqw rgba(15,36,23,0.32)',
            '0 1cqw 2cqw -0.6cqw rgba(0,0,0,0.28)',
            'inset 0 0.12cqw 0 rgba(255,255,255,0.10)',
            'inset 0 -0.12cqw 0 rgba(0,0,0,0.45)',
          ].join(', '),
        }}
      >
        {/* Diagonal aluminum highlight */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '1.6cqw',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.04) 100%)',
          }}
        />

        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: '0.9cqw',
            background: '#06080a',
          }}
        >
          {/* Notch — tiny camera bar at the top center */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{
              top: 0,
              width: '14cqw',
              height: '0.9cqw',
              borderBottomLeftRadius: '0.6cqw',
              borderBottomRightRadius: '0.6cqw',
              background: '#000',
            }}
          />

          {/* Screen images — all stacked, fade controlled by activeIndex */}
          {screens.map((s, i) => (
            <div
              key={s.src}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
              aria-hidden={i !== activeIndex}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0 || (mounted && i === activeIndex)}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Subtle screen glare */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.03) 100%)',
            }}
          />
        </div>
      </div>

      {/* Hinge / lid base — thin silver sliver under the lid */}
      <div
        aria-hidden
        className="relative mx-auto"
        style={{
          marginTop: '0.4cqw',
          width: '102%',
          marginLeft: '-1%',
          height: '0.9cqw',
          borderRadius: '0 0 0.6cqw 0.6cqw',
          background:
            'linear-gradient(180deg, #c2c5cb 0%, #8e9097 55%, #6a6c72 100%)',
          boxShadow: 'inset 0 0.1cqw 0 rgba(255,255,255,0.4), 0 0.3cqw 0.6cqw rgba(15,36,23,0.18)',
        }}
      >
        {/* Hinge cutout */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 0,
            width: '18%',
            height: '0.4cqw',
            borderRadius: '0 0 0.6cqw 0.6cqw',
            background:
              'linear-gradient(180deg, #2a2d33 0%, #1a1d22 100%)',
          }}
        />
      </div>
    </div>
  );
}
