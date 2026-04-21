import { LINKS } from '@/lib/links';
import { PhoneMock } from '@/components/ui/phone-mock';
import { TypewriterWords } from '@/components/ui/typewriter-words';

export function Hero() {
  return (
    <section className="relative isolate md:min-h-screen overflow-hidden bg-bone text-forest">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 700px at 15% 20%, rgba(30,58,42,0.06), transparent 60%), radial-gradient(900px 600px at 85% 80%, rgba(30,58,42,0.05), transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-20 md:pt-32 pb-10 md:pb-20 md:min-h-screen md:flex md:flex-col">
        <div className="rise rise-1 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-forest/65 mb-6 md:mb-14 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-forest/40" />
          Meet X — Your AI Travel Agent
        </div>

        <div className="grid grid-cols-[1.2fr_1fr] gap-4 sm:gap-8 md:gap-12 lg:gap-14 md:flex-1 md:items-center">
          <div>
            <h1 className="font-black uppercase leading-[0.84] tracking-[-0.045em] text-forest text-[clamp(3rem,11vw,13rem)]">
              <span className="rise rise-2 block">Chat</span>
              <span className="rise rise-3 block">
                <TypewriterWords />
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

        <div className="mt-10 md:mt-16 flex items-end justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-forest/45">
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
