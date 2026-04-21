import { LINKS } from '@/lib/links';
import { PhoneMock } from '@/components/ui/phone-mock';
import { MagneticPill } from '@/components/ui/magnetic-pill';
import { GlobeLazy } from '@/components/ui/globe-lazy';

export function Hero() {
  return (
    <section
      className="relative isolate md:min-h-screen overflow-hidden text-bone"
      style={{
        background:
          'radial-gradient(ellipse 130% 95% at 72% 50%, #0a1510 0%, #060c08 55%, #020504 100%)',
      }}
    >
      {/* Atmospheric wash from the globe side */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(720px 540px at 80% 48%, rgba(70,110,190,0.10), transparent 62%)',
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      {/* Soft grain */}
      <div aria-hidden className="grain-dark" />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-20 md:pt-28 pb-14 md:pb-20 md:min-h-screen md:flex md:flex-col">
        <div className="rise rise-1 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-bone/50 mb-8 md:mb-14 inline-flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-bone/30" />
          Meet X — Your AI Travel Agent
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 md:gap-16 lg:gap-20 md:flex-1 md:items-center">
          <div className="max-w-[640px]">
            <h1 className="rise rise-2 font-black leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,5.2vw,5.1rem)]">
              <span className="block text-bone/60">
                The trip that takes 16&nbsp;hours to plan.
              </span>
              <span className="block text-bone mt-1">
                Built in one conversation.
              </span>
            </h1>

            <p className="rise rise-3 mt-7 md:mt-9 text-base md:text-lg leading-relaxed text-bone/65 max-w-[54ch]">
              Ask X what you&apos;re chasing — the trails, the food, the quiet.
              It builds the whole trip: flights, lodging, gear, and the local
              Xperts who make it happen.
            </p>

            <div className="rise rise-4 mt-9 md:mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <MagneticPill
                href={LINKS.chatWithX}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-bone text-forest-deep px-7 py-4 text-base md:text-lg font-semibold tracking-tight hover:bg-bone-soft shadow-[0_24px_60px_-20px_rgba(200,220,255,0.28)]"
              >
                <span>Chat with X</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </MagneticPill>
              <span className="text-sm text-bone/55 max-w-xs">
                Free. No sign-up. No expertise needed.
              </span>
            </div>

            <div className="rise rise-5 mt-8 md:mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.22em] uppercase text-bone/55">
              <span className="inline-flex items-center gap-2 text-bone/75">
                <span className="live-dot" />
                <span>Live</span>
              </span>
              <span className="text-bone/25">·</span>
              <span>
                <span className="text-bone/95 font-semibold">498</span> Xplorers
              </span>
              <span className="text-bone/25">·</span>
              <span>Xpert-guided</span>
              <span className="text-bone/25">·</span>
              <span>Starting in North America</span>
            </div>
          </div>

          <div className="rise rise-4 w-full flex justify-center lg:justify-end">
            <div
              className="relative"
              style={{ width: 'clamp(200px, 30vw, 340px)' }}
            >
              {/* Globe halo — Black Marble earth behind the phone */}
              <div
                aria-hidden
                className="absolute pointer-events-none globe-halo"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '210%',
                  aspectRatio: '1 / 1',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                }}
              >
                <GlobeLazy style="night" interactive={false} />
              </div>

              {/* Phone in front */}
              <div className="relative z-10">
                <PhoneMock videoSrc="https://auth.xploreum.io/storage/v1/object/public/landing-assets/mobile-app.mov" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex items-end justify-between gap-6 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/30">
          <span className="inline-flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-bone/20" />
            Scroll
          </span>
          <span>Xploreum · 2026</span>
        </div>
      </div>
    </section>
  );
}
