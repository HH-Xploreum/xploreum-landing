'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LaptopMock } from '@/components/ui/laptop-mock';
import { LINKS } from '@/lib/links';

const STEPS = [
  {
    n: '01',
    eyebrow: 'The conversation',
    title: 'Start with the vibe, not the logistics.',
    body:
      '“Three days around Québec, just me and nature.” Xavier listens in plain language and asks the right follow-ups — dates, starting point, skill level, budget — until he knows enough to build something real.',
    image: '/laptop-image1.png',
    alt: 'Xavier chat: visitor describes a 3-day Québec adventure and Xavier asks where they’re starting from.',
  },
  {
    n: '02',
    eyebrow: 'The brief',
    title: 'Review it before a single mile is planned.',
    body:
      'Xavier hands you a one-glance summary — destination, dates, activity, skill level, budget, vehicle. Change anything by tapping a chip or typing a sentence. When it’s right, say build it.',
    image: '/laptop-image2.png',
    alt: 'Trip summary card titled “3 Days Solo in Mauricie Wilderness” with a Looks perfect, build it button.',
  },
  {
    n: '03',
    eyebrow: 'The build',
    title: 'Watch the Xpedition come together.',
    body:
      'In under a minute, Xavier stitches the full arc — driving legs, trailheads, dispersed campsites, resupply stops, meals. The route draws itself across the map as he works.',
    image: '/laptop-image3.png',
    alt: 'Loading state with a compass animation and the message “Preparing your Xpedition…”',
  },
  {
    n: '04',
    eyebrow: 'The Xpedition',
    title: 'Get out there with a local in your pocket.',
    body:
      'Every stop comes with notes from the Xpert who knows it best — which dépanneur has the right sandwich, when the trail thins out. Offline maps, bookings, live conditions, all in one place. The plan bends if the weather turns.',
    image: '/laptop-image4.png',
    alt: 'Full Mauricie itinerary: live map with route pins, day-by-day stops, and an Expert Guide panel for a local dépanneur.',
  },
];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the "trigger line" (40% from top of viewport).
        // Filter to entries that are at least partially visible, then choose the
        // one whose top is highest above the trigger line.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const triggerLine = window.innerHeight * 0.4;
        let bestIndex = activeIndex;
        let bestDistance = Infinity;

        visible.forEach((entry) => {
          const idx = Number(
            (entry.target as HTMLElement).dataset.stepIndex ?? '0',
          );
          const distance = Math.abs(entry.boundingClientRect.top - triggerLine);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = idx;
          }
        });

        setActiveIndex(bestIndex);
      },
      {
        // Wide vertical band so we always have at least one step intersecting.
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [activeIndex]);

  const screens = STEPS.map((s) => ({ src: s.image, alt: s.alt }));

  return (
    <section
      id="how-it-works"
      className="relative border-t border-line bg-bone overflow-hidden"
    >
      <div aria-hidden className="grain-layer opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-36 pb-32 md:pb-48">
        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-4xl">
          <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-forest/70 mb-6">
            How it works
          </div>
          <h2 className="font-black tracking-[-0.03em] leading-[0.98] text-forest text-[clamp(2.5rem,5.5vw,4.75rem)]">
            Tell Xavier what you&rsquo;re after.
            <br className="hidden md:block" />{' '}
            <span className="text-forest/85">He builds the whole Xpedition.</span>
          </h2>
          <p className="font-serif italic font-medium text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-[#a05a16] mt-8 md:mt-10">
            Conversation to adventure. Four steps.
          </p>
        </div>

        {/* Desktop: sticky laptop on the left, scrolling steps on the right */}
        <div className="hidden lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24 lg:items-start">
          <div className="sticky top-24 self-start">
            <LaptopMock screens={screens} activeIndex={activeIndex} />
            <StepDots activeIndex={activeIndex} count={STEPS.length} />
          </div>

          <ol className="space-y-40">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step-index={i}
                className="border-t border-forest/15 pt-10 min-h-[55vh] flex flex-col justify-center"
              >
                <StepHeader n={step.n} eyebrow={step.eyebrow} />
                <StepTitle>{step.title}</StepTitle>
                <StepBody>{step.body}</StepBody>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet: each step gets its own laptop above */}
        <ol className="lg:hidden space-y-20 md:space-y-28">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="border-t border-forest/15 pt-10 md:pt-14"
            >
              <div className="mb-10 md:mb-12">
                <LaptopMock screens={[screens[i]]} activeIndex={0} />
              </div>
              <StepHeader n={step.n} eyebrow={step.eyebrow} />
              <StepTitle>{step.title}</StepTitle>
              <StepBody>{step.body}</StepBody>
            </li>
          ))}
        </ol>

        {/* Closing CTA — resolves the section into the next chapter */}
        <div className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-forest/15 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <p className="font-serif italic text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-forest max-w-xl">
            That&rsquo;s the whole loop. Now meet the humans who run the ground game.
          </p>
          <Button href={LINKS.chatWithX} variant="primary" external>
            Chat with Xavier
          </Button>
        </div>
      </div>
    </section>
  );
}

function StepHeader({ n, eyebrow }: { n: string; eyebrow: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-mono text-sm tracking-[0.2em] text-forest/60">
        {n} / 04
      </span>
      <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-forest/50">
        {eyebrow}
      </span>
    </div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-black tracking-[-0.02em] leading-[1.05] text-forest text-3xl md:text-[2.75rem] mb-5">
      {children}
    </h3>
  );
}

function StepBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-lg text-forest/75 leading-relaxed max-w-lg">
      {children}
    </p>
  );
}

function StepDots({
  activeIndex,
  count,
}: {
  activeIndex: number;
  count: number;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="block h-1 rounded-full transition-all duration-500"
          style={{
            width: i === activeIndex ? '28px' : '8px',
            background:
              i === activeIndex
                ? 'var(--color-forest)'
                : 'rgba(30,58,42,0.20)',
          }}
        />
      ))}
    </div>
  );
}
