import { Button } from '@/components/ui/button';
import { HeroGlobe } from '@/components/ui/hero-globe';
import { LINKS } from '@/lib/links';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-20 md:pt-28 pb-10 md:pb-14 bg-[#050810] text-bone overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(255,236,192,0.06),transparent_55%)]"
      />

      <div className="relative max-w-7xl mx-auto w-full px-5 md:px-10 flex-1 flex flex-col">
        <div className="rise rise-1 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-bone/50 mb-8 md:mb-12">
          Meet X — Your AI Travel Agent
        </div>

        <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-12 flex-1 items-center">
          <div className="order-last md:order-first">
            <div className="font-black uppercase leading-[0.85] tracking-[-0.04em] text-bone text-[clamp(4rem,13vw,12rem)]">
              <div className="rise rise-2">Ask</div>
              <div className="rise rise-3">Plan</div>
              <div className="rise rise-4">Pack</div>
              <div
                className="rise rise-5 text-transparent"
                style={{ WebkitTextStroke: '0.03em var(--color-bone)' }}
              >
                Go
              </div>
            </div>

            <div className="rise rise-6 mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Button
                href={LINKS.chatWithX}
                external
                variant="primary"
                className="!bg-bone !text-forest hover:!bg-bone-soft text-base md:text-lg"
              >
                Chat with X
              </Button>
              <span className="text-sm text-bone/60">
                Free. No sign-up. No expertise needed.
              </span>
            </div>
          </div>

          <div className="rise rise-3">
            <HeroGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
