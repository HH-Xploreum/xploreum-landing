import { LINKS } from '@/lib/links';
import { GlobeO } from '@/components/ui/globe-o';
import { PhoneMock } from '@/components/ui/phone-mock';

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-bone text-forest">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 700px at 15% 20%, rgba(30,58,42,0.06), transparent 60%), radial-gradient(900px 600px at 85% 80%, rgba(30,58,42,0.05), transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-28 md:pt-32 pb-14 md:pb-20 min-h-screen flex flex-col">
        <div className="rise rise-1 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-forest/65 mb-10 md:mb-14 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-forest/40" />
          Meet X — Your AI Travel Agent
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 flex-1 items-center">
          <div className="order-last lg:order-first">
            <h1 className="font-black uppercase leading-[0.84] tracking-[-0.045em] text-forest text-[clamp(4.5rem,13.5vw,13rem)]">
              <span className="rise rise-2 block">Chat</span>
              <span className="rise rise-3 block">Plan</span>
              <span className="rise rise-4 block">Pack</span>
              <span className="rise rise-5 flex items-baseline gap-[0.05em]">
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: '0.028em var(--color-forest)' }}
                >
                  G
                </span>
                <GlobeO />
              </span>
            </h1>

            <div className="rise rise-6 mt-9 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <a
                href={LINKS.chatWithX}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-forest text-bone px-7 py-4 text-base md:text-lg font-semibold tracking-tight hover:bg-forest-deep transition shadow-[0_10px_40px_-10px_rgba(30,58,42,0.35)]"
              >
                <span>Chat with X</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <span className="text-sm text-forest/70 max-w-xs">
                Free. No sign-up. No expertise needed.
              </span>
            </div>
          </div>

          <div className="rise rise-4 w-full flex justify-center lg:justify-end">
            <PhoneMock videoSrc="https://auth.xploreum.io/storage/v1/object/public/landing-assets/mobile-app.mov" />
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex items-end justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-forest/45">
          <span className="hidden sm:inline-flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-forest/30" />
            Scroll
          </span>
          <span>Xploreum · 2026</span>
        </div>
      </div>
    </section>
  );
}
