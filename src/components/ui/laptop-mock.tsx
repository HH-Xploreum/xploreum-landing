import Image from 'next/image';

// Frame asset: PommePlate MacBook Pro 16" Space Gray (CC0 1.0).
// https://github.com/ephread/PommePlate
const FRAME_SRC = '/macbook-frame.png';
const FRAME_W = 3910;
const FRAME_H = 2236;

// Screen window inside the frame, measured to the pixel on macbook-frame.png.
// The screenshot is overlaid into this rectangle so it sits cleanly within
// the bezel — no halo, no overflow.
const SCREEN = {
  left: 9.642,
  top: 0.492,
  width: 80.742,
  height: 94.231,
};

type LaptopMockProps = {
  src: string;
  alt: string;
  /** Preload the screen image — use on the first laptop above the fold. */
  priority?: boolean;
  className?: string;
};

/**
 * Photorealistic laptop mock built around the PommePlate CC0 MacBook Pro PNG.
 * The frame image renders at its natural aspect ratio (width 100% / height auto)
 * so it always defines the box. The screenshot is absolutely positioned over
 * the measured screen window — percentages map exactly to the PNG, regardless
 * of any parent constraints.
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
      style={{ maxWidth: 'clamp(320px, 56vw, 760px)' }}
    >
      {/* Frame defines the box. Width 100%, height auto preserves the
          intrinsic aspect ratio so % offsets always land correctly. */}
      <Image
        src={FRAME_SRC}
        alt=""
        width={FRAME_W}
        height={FRAME_H}
        priority={priority}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="block w-full h-auto pointer-events-none select-none"
      />

      {/* Screenshot — sits exactly inside the screen window. */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          width: `${SCREEN.width}%`,
          height: `${SCREEN.height}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Subtle screen glare — sells the glossy display */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.035) 100%)',
          }}
        />
      </div>
    </div>
  );
}
