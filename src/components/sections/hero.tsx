import { Button } from '@/components/ui/button';
import { PhoneMock } from '@/components/ui/phone-mock';
import { LINKS } from '@/lib/links';

export function Hero() {
  return (
    <section className="pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-center">
        <div>
          <div className="rise rise-1 font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-forest/70 mb-8">
            Meet X — Your AI Travel Agent
          </div>

          <h1 className="rise rise-2 font-black tracking-[-0.035em] leading-[0.95] text-forest text-[clamp(3rem,7.5vw,6.5rem)]">
            The trip that takes 16 hours to plan. Built in one conversation.
          </h1>

          <p className="rise rise-3 mt-10 text-lg md:text-xl text-forest/80 max-w-xl leading-relaxed">
            Ask X what you&apos;re chasing — the food, the trails, the quiet. It builds
            the whole trip on a live map: flights, lodging, gear, and the local experts
            who make it happen.
          </p>

          <div className="rise rise-4 mt-10">
            <Button href={LINKS.chatWithX} external variant="primary" className="text-base md:text-lg">
              Ask X
            </Button>
          </div>

          <div className="rise rise-5 mt-6 text-sm text-forest/70">
            Free. No sign-up. No expertise needed.
          </div>

          <div className="rise rise-6 mt-10 flex items-center gap-3 text-sm text-forest/80">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            128 Xplorers. 46 Xperts. One week live.
          </div>
        </div>

        <div className="rise rise-3 order-first lg:order-last">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}
