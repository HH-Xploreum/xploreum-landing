import Image from 'next/image';

type LaptopMockProps = {
  src: string;
  alt: string;
  /** Preload the image — use on the first laptop above the fold. */
  priority?: boolean;
  className?: string;
};

/**
 * Renders a pre-composited laptop PNG (frame + screenshot baked together).
 * Images live in the Supabase `landing-assets` bucket and are exported with
 * a transparent background so they drop into any surface cleanly.
 *
 * The wrapper has no fixed aspect ratio — the image's intrinsic dimensions
 * drive the layout (width 100%, height auto).
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
      <Image
        src={src}
        alt={alt}
        width={3910}
        height={2236}
        priority={priority}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="block w-full h-auto"
      />
    </div>
  );
}
