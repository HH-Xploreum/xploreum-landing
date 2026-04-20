import { Button } from '@/components/ui/button';
import { HeroGlobe } from '@/components/ui/hero-globe';
import { PhoneMock } from '@/components/ui/phone-mock';
import { LINKS } from '@/lib/links';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-20 md:pt-28 pb-10 md:pb-14 bg-[#050810] text-bone overflow-hidden">
      <div className="relative max-w-7xl mx-auto w-full px-5 md:px-10 flex-1 flex flex-col">
        <div className="rise rise-1 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-bone/50 mb-8 md:mb-12">
          Meet X — Your AI Travel Agent
        </div>

        <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-12 flex-1 items-center">
          <div className="order-last md:order-first">
            <div className="font-black uppercase leading-[0.9] tracking-[-0.04em] text-bone text-[clamp(4rem,13vw,12rem)]">
              <div className="rise rise-2">Ask</div>
              <div className="rise rise-3">Plan</div>
              <div className="rise rise-4">Pack</div>
              <div className="rise rise-5 flex items-center gap-[0.03em]">
                <span>G</span>
                <span
                  className="relative inline-block aspect-square rounded-full overflow-hidden shrink-0"
                  style={{
                    width: '1.05em',
                    height: '1.05em',
                    boxShadow:
                      '0 0 0 2px rgba(255,255,255,0.95), 0 0 50px 6px rgba(200,220,240,0.18), 0 0 120px 20px rgba(255,255,255,0.08)',
                  }}
                >
                  <HeroGlobe />
                </span>
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
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>
  );
}
