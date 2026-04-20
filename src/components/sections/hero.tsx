import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col pt-20 md:pt-28 pb-10 md:pb-14">
      <div className="max-w-7xl mx-auto w-full px-5 md:px-10 flex-1 flex flex-col">
        <div className="rise rise-1 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-forest/70 mb-8 md:mb-12">
          Meet X — Your AI Travel Agent
        </div>

        <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-12 flex-1 items-center">
          <div className="order-last md:order-first">
            <div className="font-black uppercase leading-[0.85] tracking-[-0.04em] text-forest text-[clamp(4rem,13vw,12rem)]">
              <div className="rise rise-2">Ask</div>
              <div className="rise rise-3">Plan</div>
              <div className="rise rise-4">Pack</div>
              <div
                className="rise rise-5 text-transparent"
                style={{ WebkitTextStroke: '0.03em var(--color-forest)' }}
              >
                Go
              </div>
            </div>

            <div className="rise rise-6 mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Button
                href={LINKS.chatWithX}
                external
                variant="primary"
                className="text-base md:text-lg"
              >
                Chat with X
              </Button>
              <span className="text-sm text-forest/70">
                Free. No sign-up. No expertise needed.
              </span>
            </div>
          </div>

          <div className="rise rise-3">
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMedia() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] md:max-w-[480px]">
      <div className="absolute -inset-10 bg-bone-soft/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative aspect-[4/5] rounded-3xl bg-bone-soft/60 overflow-hidden p-5 md:p-6 flex flex-col shadow-[0_30px_60px_-30px_rgba(15,36,23,0.3)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-bone font-bold text-sm">
            X
          </div>
          <span className="font-bold text-forest text-sm">Ask X</span>
        </div>

        <div className="flex-1 flex flex-col justify-end space-y-3">
          <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-forest text-bone text-[13px] md:text-sm leading-relaxed px-4 py-2.5">
            10 days in Patagonia, mid-November. I want trails, not hotels.
          </div>
          <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-bone text-forest text-[13px] md:text-sm leading-relaxed px-4 py-2.5 shadow-sm">
            Let&apos;s go. Starting in El Chaltén — Fitz Roy trek day 1, Laguna de
            los Tres day 2. Pairing you with Mateo, a certified local guide.
          </div>
          <div className="max-w-[72%] rounded-2xl rounded-bl-md bg-bone text-forest text-[13px] md:text-sm leading-relaxed px-4 py-2.5 shadow-sm">
            Weather window looks clean Nov 14–24. Shall I lock it?
          </div>
        </div>

        <div className="mt-4 rounded-full bg-bone border border-line/60 px-4 py-2.5 text-[12px] text-moss flex items-center justify-between">
          <span>Ask X anything…</span>
          <span className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-bone text-xs">
            ↑
          </span>
        </div>
      </div>

      <a
        href={LINKS.chatWithX}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-moss hover:text-forest transition"
      >
        — Try it live
      </a>
    </div>
  );
}
