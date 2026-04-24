'use client';

import Image from 'next/image';

type LaptopMockProps = {
  src: string;
  alt: string;
  /** Preload the screen image (use on the first laptop above the fold). */
  priority?: boolean;
  className?: string;
};

/**
 * Space-gray MacBook Pro mock rendered in pure CSS.
 *   - Thin dark bezel around a 16:10 screen with a centered camera notch
 *   - Etched "MacBook Pro" chin label
 *   - Darker hinge strip separating lid from base
 *   - Lighter aluminum base with rounded bottom corners
 *   - Soft contact shadow on the ground
 * Sized via container queries (cqw) so every detail scales with the frame.
 */
export function LaptopMock({
  src,
  alt,
  priority = false,
  className = '',
}: LaptopMockProps) {
  return (
    <div
      className={`relative mx-auto w-full ${className}`}
      style={{
        maxWidth: 'clamp(320px, 52vw, 720px)',
        containerType: 'inline-size',
      }}
    >
      {/* Ground shadow */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: '-3.5cqw',
          width: '92%',
          height: '5cqw',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(15,36,23,0.35), rgba(15,36,23,0) 72%)',
          filter: 'blur(3cqw)',
        }}
      />

      {/* LID — space gray frame around the display */}
      <div
        className="relative"
        style={{
          aspectRatio: '1.54 / 1',
          borderRadius: '1cqw 1cqw 0.2cqw 0.2cqw',
          padding: '0.7cqw 0.7cqw 0.5cqw 0.7cqw',
          background:
            'linear-gradient(160deg, #3b3e44 0%, #2a2d33 30%, #1e2025 100%)',
          boxShadow: [
            'inset 0 0.12cqw 0 rgba(255,255,255,0.10)',
            'inset 0 -0.12cqw 0 rgba(0,0,0,0.40)',
            'inset 0.12cqw 0 0 rgba(255,255,255,0.04)',
            'inset -0.12cqw 0 0 rgba(255,255,255,0.04)',
          ].join(', '),
        }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '16 / 10',
            borderRadius: '0.35cqw',
            background: '#05070a',
          }}
        >
          {/* Camera notch */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{
              top: 0,
              width: '13cqw',
              height: '0.75cqw',
              borderBottomLeftRadius: '0.45cqw',
              borderBottomRightRadius: '0.45cqw',
              background: '#000',
            }}
          />

          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />

          {/* Subtle screen glare */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.035) 100%)',
            }}
          />
        </div>

        {/* Chin with etched "MacBook Pro" label */}
        <div
          className="flex items-center justify-center"
          style={{
            height: '2.2cqw',
            paddingTop: '0.4cqw',
          }}
        >
          <span
            className="font-sans"
            style={{
              fontSize: '1.05cqw',
              letterSpacing: '0.14em',
              fontWeight: 500,
              color: 'rgba(210,212,218,0.55)',
              textShadow: '0 0.05cqw 0 rgba(0,0,0,0.6)',
            }}
          >
            MacBook Pro
          </span>
        </div>
      </div>

      {/* HINGE — thin dark band between lid and base */}
      <div
        aria-hidden
        className="relative mx-auto"
        style={{
          width: '100%',
          height: '0.55cqw',
          background:
            'linear-gradient(180deg, #141619 0%, #0a0b0d 50%, #16181c 100%)',
          boxShadow: 'inset 0 0.08cqw 0 rgba(255,255,255,0.04)',
        }}
      />

      {/* BASE — lighter aluminum face with rounded bottom + hinge cutout */}
      <div
        aria-hidden
        className="relative mx-auto"
        style={{
          width: '103%',
          marginLeft: '-1.5%',
          height: '2.6cqw',
          borderRadius: '0 0 1.8cqw 1.8cqw',
          background:
            'linear-gradient(180deg, #565860 0%, #3e4046 45%, #2a2c31 100%)',
          boxShadow: [
            'inset 0 0.18cqw 0 rgba(255,255,255,0.22)',
            'inset 0 -0.12cqw 0 rgba(0,0,0,0.4)',
            '0 0.5cqw 0.9cqw rgba(15,36,23,0.2)',
          ].join(', '),
        }}
      >
        {/* Hinge notch cutout (the slot that lets you open the lid) */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 0,
            width: '22%',
            height: '0.7cqw',
            borderRadius: '0 0 0.8cqw 0.8cqw',
            background:
              'linear-gradient(180deg, #0a0b0d 0%, #1a1c20 100%)',
          }}
        />
      </div>
    </div>
  );
}
