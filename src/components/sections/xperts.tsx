'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

type XpertKind = 'Stay' | 'Activity' | 'Rental' | 'Food' | 'Transport';

type Xpert = {
  kind: XpertKind;
  archetype: string;
  vibe: string;
  images: string[];
};

const CDN = 'https://auth.xploreum.io/storage/v1/object/public/landing-assets';
const img = (filename: string) => `${CDN}/${filename}`;

const XPERTS: Xpert[] = [
  {
    kind: 'Stay',
    archetype: 'Lodge keeper',
    vibe: 'Off-grid cabins and lodges only the locals know about.',
    images: [
      img('lodge-keeper-alpine-lake.jpg.png'),
      img('lodge-keeper-hillside-cabin.jpg.png'),
    ],
  },
  {
    kind: 'Activity',
    archetype: 'Trail guide',
    vibe: 'First overnight or fiftieth summit, on foot or in the saddle.',
    images: [
      img('trail-guide-ridge-hike.jpg.png'),
      img('trail-guide-river-rafting.jpg.png'),
      img('trail-guide-whale-watching.jpg.png'),
    ],
  },
  {
    kind: 'Activity',
    archetype: 'Mountain guide',
    vibe: 'Backcountry, alpine, certified. The real route, done safely.',
    images: [
      img('mountain-guide-helping-hand.jpg'),
      img('mountain-guide-ski-jump.jpg.png'),
      img('mountain-guide-rock-climbing.jpg.png'),
    ],
  },
  {
    kind: 'Rental',
    archetype: 'Gear outfitter',
    vibe: 'Snowmobile, packraft, fat-bike. The kit, ready when you arrive.',
    images: [
      img('gear-outfitter-backpack-kit.jpg.png'),
      img('gear-outfitter-camp-kit.jpg.png'),
      img('gear-outfitter-hike-kit.jpg.png'),
    ],
  },
  {
    kind: 'Food',
    archetype: 'Local cook',
    vibe: 'The meal that tells you where you are.',
    images: [
      img('local-cook-braised-stew.jpg.png'),
      img('local-cook-plated-fish.jpg.png'),
      img('local-cook-spread.jpg.png'),
    ],
  },
  {
    kind: 'Transport',
    archetype: 'Bush pilot',
    vibe: 'Float plane, helicopter, dirt strip. The last leg in.',
    images: [
      img('bush-pilot-biplane.jpg'),
      img('bush-pilot-campervan.jpg.png'),
      img('bush-pilot-overland-trailer.jpg.png'),
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-bone/15 bg-forest-deep/40 transition hover:border-bone/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-forest-deep">
        {xpert.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? `${xpert.archetype} — ${xpert.vibe}` : ''}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority && i === 0}
            className={`object-cover transition-opacity duration-[900ms] ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-transparent to-forest-deep/30"
        />

        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-bone/90 px-3 py-1 text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-forest backdrop-blur">
            {xpert.kind}
          </span>
        </div>
      </div>

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
