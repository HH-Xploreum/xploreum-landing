import Image from 'next/image';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

type XpertKind = 'Stay' | 'Activity' | 'Rental' | 'Food' | 'Transport';

type Xpert = {
  kind: XpertKind;
  specialty: string;
  name: string;
  location: string;
  image: string | null;
  icon: ReactNode;
};

// Line icons sized to inherit currentColor; kept minimal so the card reads
// as an editorial placeholder until real photography is in the CDN.
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
    specialty: 'Wilderness lodge',
    name: 'Nordik Lake Lodge',
    location: 'Mauricie, Québec',
    image: null,
    icon: Icon.lodge,
  },
  {
    kind: 'Activity',
    specialty: 'Horseback excursions',
    name: 'Estancia Cruz del Sur',
    location: 'Kananaskis, Alberta',
    image: null,
    icon: Icon.horse,
  },
  {
    kind: 'Activity',
    specialty: 'Backcountry ski certification',
    name: 'Powder Collective',
    location: 'Revelstoke, British Columbia',
    image: null,
    icon: Icon.ski,
  },
  {
    kind: 'Rental',
    specialty: 'Snowmobile rental',
    name: 'Boréal Motorsports',
    location: 'Saguenay, Québec',
    image: null,
    icon: Icon.snowmobile,
  },
  {
    kind: 'Food',
    specialty: 'Indigenous restaurant',
    name: 'Sagamité',
    location: 'Wendake, Québec',
    image: null,
    icon: Icon.food,
  },
  {
    kind: 'Transport',
    specialty: 'Float plane air taxi',
    name: 'Borealis Air',
    location: 'Yellowknife, NWT',
    image: null,
    icon: Icon.plane,
  },
];

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
          </div>
          <p className="text-[14px] md:text-lg text-bone/80 leading-relaxed max-w-md">
            Every excursion, activity, stay, or rental is run by a vetted local
            Xpert — certified, insured, and paid fairly because no middleman takes
            a cut. These are the people who make your trip real on the ground.
          </p>
        </div>

        {/* Cards */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {XPERTS.map((x) => (
            <li
              key={x.specialty}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-bone/15 bg-forest-deep/40 transition hover:border-bone/30 hover:bg-forest-deep/70"
            >
              {/* Picture slot — 4:5 editorial portrait */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-forest-deep">
                {x.image ? (
                  <Image
                    src={x.image}
                    alt={`${x.name}, ${x.specialty} in ${x.location}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background:
                        'radial-gradient(120% 80% at 30% 20%, rgba(107,133,112,0.22), transparent 60%), radial-gradient(120% 80% at 80% 90%, rgba(160,90,22,0.18), transparent 65%), linear-gradient(180deg, #0F2417 0%, #1E3A2A 100%)',
                    }}
                  >
                    <div className="h-20 w-20 md:h-24 md:w-24 text-bone/45 transition duration-500 group-hover:text-bone/70 group-hover:scale-105">
                      {x.icon}
                    </div>
                  </div>
                )}

                {/* Kind chip — top-left overlay */}
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full bg-bone/90 px-3 py-1 text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-forest backdrop-blur">
                    {x.kind}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-1 p-5 md:p-6">
                <div className="font-serif italic text-[13px] md:text-[14px] text-[#E0B080]">
                  {x.specialty}
                </div>
                <div className="font-bold tracking-tight text-lg md:text-xl text-bone">
                  {x.name}
                </div>
                <div className="text-[13px] md:text-sm text-bone/60">
                  {x.location}
                </div>
              </div>
            </li>
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
