'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

type XpertKind = 'Stay' | 'Activity' | 'Sports' | 'Rental' | 'Food' | 'Transport';

type Xpert = {
  kind: XpertKind;
  archetype: string;
  vibe: string;
  images: string[];
};

const CDN = 'https://auth.xploreum.io/storage/v1/object/public/landing-assets';
const img = (name: string) => `${CDN}/${name}.jpg`;

const XPERTS: Xpert[] = [
  {
    kind: 'Stay',
    archetype: 'Lodge keeper',
    vibe: 'Off-grid cabins and lodges only the locals know about.',
    images: [
      img('lodge-keeper-alpine-lake'),
      img('lodge-keeper-ice-hotel'),
      img('lodge-keeper-hillside-cabin'),
    ],
  },
  {
    kind: 'Activity',
    archetype: 'Nature crafter',
    vibe: 'First overnight or fiftieth summit, on foot or in the saddle.',
    images: [
      img('trail-guide-ice-fishing'),
      img('trail-guide-river-rafting'),
      img('trail-guide-horseback'),
    ],
  },
  {
    kind: 'Sports',
    archetype: 'Mountain guide',
    vibe: 'Backcountry, alpine, certified. The real route, done safely.',
    images: [
      img('mountain-guide-helping-hand'),
      img('mountain-guide-ski'),
      img('mountain-guide-rock-climbing'),
    ],
  },
  {
    kind: 'Rental',
    archetype: 'Gear outfitter',
    vibe: 'Snowmobile, packraft, fat-bike. The kit, ready when you arrive.',
    images: [
      img('gear-outfitter-snowmobile'),
      img('gear-outfitter-backpack-kit'),
      img('gear-outfitter-rib-boat'),
    ],
  },
  {
    kind: 'Food',
    archetype: 'Local cook',
    vibe: 'The meal that tells you where you are.',
    images: [
      img('local-cook-braised-stew'),
      img('local-cook-plated-fish'),
      img('local-cook-spread'),
    ],
  },
  {
    kind: 'Transport',
    archetype: 'Bush pilot',
    vibe: 'Float plane, helicopter, dirt strip. The last leg in.',
    images: [
      img('bush-pilot-floatplane'),
      img('bush-pilot-cessna'),
      img('bush-pilot-snowcat'),
    ],
  },
];

const ROTATION_MS = 4500;

function XpertCard({
  xpert,
  startIndex,
  priority,
}: {
  xpert: Xpert;
  startIndex: number;
  priority: boolean;
}) {
  const [index, setIndex] = useState(startIndex % xpert.images.length);
  const [paused, setPaused] = useState(false);
  const imageCount = xpert.images.length;

  useEffect(() => {
    if (imageCount < 2 || paused) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % imageCount);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [imageCount, paused]);

  return (
    <li
      className="group relative flex overflow-hidden rounded-2xl border border-bone/15 bg-forest-deep/40 transition hover:border-bone/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-deep">
        {xpert.images.map((src, i) => {
          const active = i === index;
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={i === 0 ? `${xpert.archetype} — ${xpert.vibe}` : ''}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={priority && i === 0}
                className={`object-cover ${active ? 'ken-burns' : ''}`}
              />
            </div>
          );
        })}

        {/* Editorial veil — keeps copy legible across any photograph */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/45 to-forest-deep/0"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
        />

        {/* Category pill */}
        <div className="absolute left-4 top-4 z-10 md:left-5 md:top-5">
          <span className="inline-flex items-center rounded-full bg-bone/95 px-3 py-1 text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-forest backdrop-blur">
            {xpert.kind}
          </span>
        </div>

        {/* Overlay copy — magazine-style, lives on the image */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
          <div className="font-black tracking-[-0.01em] text-[1.25rem] md:text-[1.5rem] leading-[1.05] text-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            {xpert.archetype}
          </div>
          <div className="font-serif italic font-medium text-[12.5px] md:text-[13.5px] text-[#E8C9A4] leading-snug mt-1.5 max-w-[90%] drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
            {xpert.vibe}
          </div>

          {/* Image step indicators — clickable to jump frames */}
          {imageCount > 1 && (
            <div
              className="mt-4 flex gap-1.5"
              role="tablist"
              aria-label={`${xpert.archetype} images`}
            >
              {xpert.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show image ${i + 1} of ${imageCount}`}
                  onClick={() => setIndex(i)}
                  className={`group/dot h-3 flex items-center cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/70 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep/60`}
                >
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-500 ${
                      i === index
                        ? 'w-6 bg-bone'
                        : 'w-3 bg-bone/35 group-hover/dot:bg-bone/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function Xperts() {
  return (
    <section id="xperts" className="relative bg-forest text-bone overflow-hidden">
      <div aria-hidden className="grain-layer opacity-[0.05]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-14 items-end mb-10 md:mb-12">
          <div>
            <div className="font-semibold text-xs md:text-sm tracking-[0.2em] uppercase text-bone/60 mb-6">
              Meet the Xperts
            </div>
            <h2 className="font-black tracking-[-0.03em] leading-[0.98] text-[1.75rem] md:text-[clamp(2.75rem,4.5vw,4rem)]">
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
          {XPERTS.map((x, i) => (
            <XpertCard
              key={x.archetype}
              xpert={x}
              startIndex={i}
              priority={i < 3}
            />
          ))}
        </ul>

        {/* Closing CTA */}
        <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-bone/15 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6 md:gap-8">
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
