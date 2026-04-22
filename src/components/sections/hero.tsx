import { LINKS } from '@/lib/links';
import { PhoneMock } from '@/components/ui/phone-mock';
import { TypewriterPhrases } from '@/components/ui/typewriter-phrases';
import { MagneticPill } from '@/components/ui/magnetic-pill';

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
      {/* Background video */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source
          src="https://auth.xploreum.io/storage/v1/object/public/landing-assets/video11.mp4"
          type="video/mp4"
        />
      </video>
      {/* Legibility wash — soft bone veil over video so forest text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-bone/55"
      />

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

      {/* Corner registration marks — desktop only, too noisy on phones */}
      <Crosshair className="hidden md:block top-6 left-6" />
      <Crosshair className="hidden md:block top-6 right-6" />
      <Crosshair className="hidden md:block bottom-6 left-6" />
      <Crosshair className="hidden md:block bottom-6 right-6" />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-24 md:pt-32 pb-14 md:pb-20 md:min-h-screen md:flex md:flex-col">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 lg:gap-16 md:flex-1 md:items-center">
          <div className="max-w-[640px]">
            <h1
              className="font-black uppercase leading-[0.88] tracking-[-0.045em] text-forest text-[clamp(3.25rem,10vw,9.5rem)]"
            >
              <span className="rise rise-2 block">
                <TypewriterPhrases />
              </span>
            </h1>

            <div className="rise rise-5 mt-14 md:mt-20 space-y-1.5 text-forest leading-snug">
              <p className="font-normal text-[clamp(1.125rem,1.9vw,1.5rem)]">
                You don&apos;t need a guidebook. You don&apos;t need a spreadsheet.
              </p>
              <p className="font-normal text-[clamp(1.125rem,1.9vw,1.5rem)]">
                You don&apos;t need six tabs open at midnight.
              </p>
              <p className="font-handwriting font-semibold leading-tight text-[clamp(1.75rem,3.2vw,2.75rem)] mt-2">
                You just need to start talking.
              </p>
            </div>

            <div className="rise rise-6 mt-7 md:mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
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
            </div>
          </div>

          <div className="rise rise-4 w-full flex justify-center md:justify-end">
            <PhoneMock videoSrc="https://auth.xploreum.io/storage/v1/object/public/landing-assets/mobile-app.mov" />
          </div>
        </div>

        <div className="hidden md:flex mt-10 md:mt-16 items-end justify-between gap-6 font-mono text-[10px] tracking-[0.3em] uppercase text-forest/45">
          <span className="inline-flex items-center gap-3 shrink-0">
            <span className="inline-block w-8 h-px bg-forest/30" />
            Scroll
          </span>
          <div
            aria-hidden
            className="ruler flex-1 max-w-[540px] grid text-forest"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <span className="shrink-0">Xploreum · 2026</span>
        </div>
      </div>
    </section>
  );
}
