import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

type XpertKind = 'Stay' | 'Activity' | 'Rental' | 'Food' | 'Transport';

type Xpert = {
  kind: XpertKind;
  archetype: string;
  vibe: string;
  icon: ReactNode;
};

const Icon = {
  lodge: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 26 24 10l18 16" />
      <path d="M10 24v14h28V24" />
      <path d="M20 38V28h8v10" />
      <path d="M4 42h40" />
    </svg>
  ),
  horse: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 38c0-6 3-11 9-13l3-8 4 3 3-4 4 6c3 1 5 4 5 8v8" />
      <path d="M14 38v-6" />
      <path d="M32 38v-6" />
      <path d="M22 20l2 2" />
      <circle cx="28" cy="15" r="0.6" fill="currentColor" />
    </svg>
  ),
  ski: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 40 36 8" />
      <path d="M14 40 40 8" />
      <path d="M9 40h6" />
      <path d="M13 40h6" />
      <path d="M34 10l4 4" />
    </svg>
  ),
  snowmobile: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 34h10l6-10h12l6 8" />
      <path d="M6 38h32" />
      <path d="M22 24l-3-6h8" />
      <path d="M38 18l-4 6" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 6v16a4 4 0 0 1-8 0V6" />
      <path d="M12 22v20" />
      <path d="M36 6c-4 2-6 6-6 12s2 8 6 8" />
      <path d="M36 6v36" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M24 6c2 0 3 4 3 10v6l14 8v3l-14-4v8l4 3v2l-7-2-7 2v-2l4-3v-8l-14 4v-3l14-8v-6c0-6 1-10 3-10Z" />
      <path d="M10 40h28" />
    </svg>
  ),
};

const XPERTS: Xpert[] = [
  {
    kind: 'Stay',
    archetype: 'Lodge keeper',
    vibe: 'Off-grid cabins and lodges only the locals know about.',
    icon: Icon.lodge,
  },
  {
    kind: 'Activity',
    archetype: 'Trail guide',
    vibe: 'First overnight or fiftieth summit, on foot or in the saddle.',
    icon: Icon.horse,
  },
  {
    kind: 'Activity',
    archetype: 'Mountain guide',
    vibe: 'Backcountry, alpine, certified. The real route, done safely.',
    icon: Icon.ski,
  },
  {
    kind: 'Rental',
    archetype: 'Gear outfitter',
    vibe: 'Snowmobile, packraft, fat-bike. The kit, ready when you arrive.',
    icon: Icon.snowmobile,
  },
  {
    kind: 'Food',
    archetype: 'Local cook',
    vibe: 'The meal that tells you where you are.',
    icon: Icon.food,
  },
  {
    kind: 'Transport',
    archetype: 'Bush pilot',
    vibe: 'Float plane, helicopter, dirt strip. The last leg in.',
    icon: Icon.plane,
  },
];

function XpertCard({ xpert }: { xpert: Xpert }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-bone/15 bg-forest-deep/40 transition hover:border-bone/30 hover:bg-forest-deep/70">
      {/* Icon panel */}
      <div className="relative aspect-square w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'radial-gradient(120% 80% at 30% 20%, rgba(107,133,112,0.22), transparent 60%), radial-gradient(120% 80% at 80% 90%, rgba(160,90,22,0.18), transparent 65%), linear-gradient(180deg, #0F2417 0%, #1E3A2A 100%)',
          }}
        >
          <div className="h-24 w-24 md:h-28 md:w-28 text-bone/50 transition duration-500 group-hover:text-bone/80 group-hover:scale-105">
            {xpert.icon}
          </div>
        </div>

        {/* Kind chip */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-bone/90 px-3 py-1 text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-forest backdrop-blur">
            {xpert.kind}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2 p-5 md:p-6">
        <div className="font-bold tracking-tight text-lg md:text-xl text-bone">
          {xpert.archetype}
        </div>
        <div className="font-serif italic text-[13px] md:text-[14px] text-[#E0B080] leading-snug">
          {xpert.vibe}
        </div>
      </div>
    </li>
  );
}

export function Xperts() {
  return (
    <section id="xperts" className="relative bg-forest text-bone overflow-hidden">
      <div aria-hidden className="grain-layer opacity-[0.05]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-36">
        {/* Header */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-16 md:mb-20">
          <div>
            <div className="font-semibold text-xs md:text-sm tracking-[0.2em] uppercase text-bone/60 mb-6">
              Meet the Xperts
            </div>
            <h2 className="font-black tracking-[-0.03em] leading-[0.98] text-[2rem] md:text-[clamp(3.5rem,5.5vw,4.75rem)]">
              Planned by AI.
              <br className="hidden md:block" />{' '}
              <span className="text-bone/80">Powered by locals.</span>
            </h2>
            <p className="font-serif italic font-medium text-[14px] md:text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-[#E0B080] mt-6 md:mt-8">
              Stays, activities, rentals, food, transport. One conversation,
              every booking.
            </p>
          </div>
          <p className="text-[14px] md:text-lg text-bone/80 leading-relaxed max-w-md">
            Xperts are the lodge keepers, guides, outfitters, cooks, and
            pilots who make a trip real on the ground. Certified, insured,
            paid fairly. Xavier matches the right ones to your trip inside
            the chat, so you never juggle six bookings to get out the door.
          </p>
        </div>

        {/* Cards */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {XPERTS.map((x) => (
            <XpertCard key={x.archetype} xpert={x} />
          ))}
        </ul>

        {/* Closing CTA */}
        <div className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-bone/15 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6 md:gap-8">
          <p className="font-serif italic text-[14px] md:text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-bone max-w-xl">
            Run a lodge, guide trips, or rent gear?
            <br className="hidden md:block" />{' '}
            <span className="text-bone/70">These could be your people too.</span>
          </p>
          <Button
            href={LINKS.forGuide}
            variant="primary"
            className="bg-bone text-forest hover:bg-bone-soft"
          >
            Join the network
          </Button>
        </div>
      </div>
    </section>
  );
}
