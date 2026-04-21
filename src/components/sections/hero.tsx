import { LINKS } from '@/lib/links';
import { PhoneMock } from '@/components/ui/phone-mock';
import { HeroCaretCursor } from '@/components/ui/hero-caret-cursor';
import { MagneticPill } from '@/components/ui/magnetic-pill';
import { TripsTicker } from '@/components/ui/trips-ticker';

function Crosshair({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 14"
      className={`crosshair ${className}`}
    >
      <path d="M7 0 V14 M0 7 H14" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative isolate md:min-h-screen overflow-hidden bg-bone text-forest">
      {/* Ambient layers — topo contours + soft radial wash + grain */}
      <div aria-hidden className="topo-layer" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 700px at 15% 20%, rgba(30,58,42,0.06), transparent 60%), radial-gradient(900px 600px at 85% 80%, rgba(30,58,42,0.05), transparent 65%)',
        }}
      />
      <div aria-hidden className="grain-layer" />

      {/* Corner registration marks */}
      <Crosshair className="top-4 left-4 md:top-6 md:left-6" />
      <Crosshair className="top-4 right-4 md:top-6 md:right-6" />
      <Crosshair className="bottom-4 left-4 md:bottom-6 md:left-6" />
      <Crosshair className="bottom-4 right-4 md:bottom-6 md:right-6" />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-20 md:pt-32 pb-10 md:pb-20 md:min-h-screen md:flex md:flex-col">
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 sm:gap-8 md:gap-12 lg:gap-14 md:flex-1 md:items-center">
          <div>
            <h1
              data-caret-zone
              className="caret-zone font-black uppercase leading-[0.84] tracking-[-0.045em] text-forest text-[clamp(2.5rem,9vw,9rem)]"
            >
              <span className="rise rise-2 block">Chat Plan</span>
              <span className="rise rise-3 block">
                Pack <span className="text-outline">Go</span>
              </span>
            </h1>

            <div className="rise rise-6 mt-9 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <MagneticPill
                href={LINKS.chatWithX}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-forest text-bone px-7 py-4 text-base md:text-lg font-semibold tracking-tight hover:bg-forest-deep shadow-[0_10px_40px_-10px_rgba(30,58,42,0.35)]"
              >
                <span>Chat with X</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </MagneticPill>
              <span className="text-sm text-forest/70 max-w-xs">
                Free. No sign-up. No expertise needed.
              </span>
            </div>

            <div className="rise rise-6 mt-6 md:mt-8">
              <TripsTicker />
            </div>
          </div>

          <div className="rise rise-4 w-full flex justify-center lg:justify-end">
            <PhoneMock videoSrc="https://auth.xploreum.io/storage/v1/object/public/landing-assets/mobile-app.mov" />
          </div>
        </div>

        <div className="mt-10 md:mt-16 flex items-end justify-between gap-6 font-mono text-[10px] tracking-[0.3em] uppercase text-forest/45">
          <span className="hidden sm:inline-flex items-center gap-3 shrink-0">
            <span className="inline-block w-8 h-px bg-forest/30" />
            Scroll
          </span>
          <div
            aria-hidden
            className="ruler flex-1 max-w-[540px] hidden md:grid text-forest"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <span className="shrink-0">Xploreum · 2026</span>
        </div>
      </div>

      <HeroCaretCursor />
    </section>
  );
}
