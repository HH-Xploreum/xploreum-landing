import { Button } from '@/components/ui/button';
import { LaptopMock } from '@/components/ui/laptop-mock';
import { LINKS } from '@/lib/links';

const STEPS = [
  {
    n: '01',
    eyebrow: 'The conversation',
    title: 'Start with the vibe, not the logistics.',
    body:
      '“Three days around Québec, just me and nature.” Xavier listens in plain language and asks the right follow-ups. Dates, starting point, skill level, budget. He keeps going until he knows enough to build something real.',
    image:
      'https://auth.xploreum.io/storage/v1/object/public/landing-assets/how-it-works-01-conversation.png.png',
    alt: 'Xavier chat: visitor describes a 3-day Québec adventure and Xavier asks where they’re starting from.',
  },
  {
    n: '02',
    eyebrow: 'The brief',
    title: 'Review it before a single mile is planned.',
    body:
      'Xavier hands you a one-glance summary: destination, dates, activity, skill level, budget, vehicle. Change anything by tapping a chip or typing a sentence. When it’s right, say build it.',
    image:
      'https://auth.xploreum.io/storage/v1/object/public/landing-assets/how-it-works-02-brief.png.png',
    alt: 'Trip summary card titled “3 Days Solo in Mauricie Wilderness” with a Looks perfect, build it button.',
  },
  {
    n: '03',
    eyebrow: 'The build',
    title: 'Watch the Xpedition come together.',
    body:
      'In under a minute, Xavier stitches the full arc: driving legs, trailheads, dispersed campsites, resupply stops, meals. The route draws itself across the map as he works.',
    image:
      'https://auth.xploreum.io/storage/v1/object/public/landing-assets/how-it-works-03-build.png.png',
    alt: 'Loading state with a compass animation and the message “Preparing your Xpedition…”',
  },
  {
    n: '04',
    eyebrow: 'The Xpedition',
    title: 'Get out there with a local in your pocket.',
    body:
      'Every stop comes with notes from the Xpert who knows it best: which dépanneur has the right sandwich, when the trail thins out. Offline maps, bookings, live conditions, all in one place. The plan bends if the weather turns.',
    image:
      'https://auth.xploreum.io/storage/v1/object/public/landing-assets/how-it-works-04-xpedition.png.png',
    alt: 'Full Mauricie itinerary: live map with route pins, day-by-day stops, and an Expert Guide panel for a local dépanneur.',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-line bg-bone overflow-hidden"
    >
      <div aria-hidden className="grain-layer opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <div className="font-semibold text-xs md:text-sm tracking-[0.2em] uppercase text-forest/70 mb-5">
            How it works
          </div>
          <h2 className="font-black tracking-[-0.03em] leading-[0.98] text-forest text-[2rem] md:text-[clamp(3.5rem,5.5vw,4.75rem)]">
            Tell Xavier what you&rsquo;re after.
            <br className="hidden md:block" />{' '}
            <span className="text-forest/85">He builds the whole Xpedition.</span>
          </h2>
          <p className="font-serif italic font-medium text-[14px] md:text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-[#a05a16] mt-6 md:mt-8">
            Conversation to adventure. Four steps.
          </p>
        </div>

        {/* Four editorial rows: laptop + text, alternating sides */}
        <ol className="space-y-14 md:space-y-20">
          {STEPS.map((step, i) => {
            const laptopLeft = i % 2 === 0;
            return (
              <li
                key={step.n}
                className="border-t border-forest/15 pt-8 md:pt-12"
              >
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Laptop */}
                  <div
                    className={[
                      'md:col-span-7',
                      laptopLeft ? 'md:order-1' : 'md:order-2',
                    ].join(' ')}
                  >
                    <LaptopMock
                      src={step.image}
                      alt={step.alt}
                      priority={i === 0}
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={[
                      'md:col-span-5',
                      laptopLeft ? 'md:order-2' : 'md:order-1',
                    ].join(' ')}
                  >
                    <div className="flex items-baseline gap-4 mb-5">
                      <span className="font-semibold text-sm tracking-[0.2em] text-forest/60">
                        {step.n} / 04
                      </span>
                      <span className="font-semibold text-[10px] md:text-xs tracking-[0.25em] uppercase text-forest/50">
                        {step.eyebrow}
                      </span>
                    </div>
                    <h3 className="font-black tracking-[-0.02em] leading-[1.05] text-forest text-[1.5rem] md:text-[2.5rem] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[14px] md:text-lg text-forest/75 leading-relaxed max-w-lg">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing CTA resolves the section into the next chapter */}
        <div className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-forest/15 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6 md:gap-8">
          <p className="font-serif italic text-[14px] md:text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-forest max-w-xl">
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
