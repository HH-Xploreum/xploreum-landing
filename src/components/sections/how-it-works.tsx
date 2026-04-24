import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

// Placeholder atmospheric photography — swap with brand-shot imagery from
// the `landing-assets` Supabase bucket when ready. Sized at 1200w for retina
// crispness inside a ~600px column.
const STEPS = [
  {
    n: '01',
    eyebrow: 'The conversation',
    title: 'Tell Xavier what you’re looking for.',
    body:
      'Or describe the feeling. “Something quiet, near water, in October.” Xavier listens in plain language and asks the right follow-ups.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=70',
    alt: 'Mist rising off a still alpine lake at first light.',
  },
  {
    n: '02',
    eyebrow: 'The build',
    title: 'Watch the Xpedition come together.',
    body:
      'Flights, lodging, routes, permits, gear. All mapped live in front of you. Edit anything by saying what you want to change.',
    image:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=70',
    alt: 'Topographic map with a route traced across mountain contours.',
  },
  {
    n: '03',
    eyebrow: 'The booking',
    title: 'Book it all in one place.',
    body:
      'Handpicked guides, trusted lodges, local outfitters and rental shops. All bookable in one conversation.',
    image:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=70',
    alt: 'Warm-lit cabin tucked into the trees at dusk.',
  },
  {
    n: '04',
    eyebrow: 'The adventure',
    title: 'Get out there and live it.',
    body:
      'All-terrain navigation for land, water, and air. Offline maps, live weather, dynamic checklists, every booking in one place. The plan bends if the weather turns.',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=70',
    alt: 'A hiker cresting a ridge above a sea of clouds.',
  },
];

export function HowItWorks() {
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

        {/* Steps — alternating editorial rows */}
        <ol className="space-y-20 md:space-y-32">
          {STEPS.map((step, i) => {
            const imageRight = i % 2 === 0;
            return (
              <li
                key={step.n}
                className="border-t border-forest/15 pt-10 md:pt-14"
              >
                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                  {/* Text block */}
                  <div
                    className={[
                      'md:col-span-6',
                      imageRight ? 'md:order-1' : 'md:order-2',
                    ].join(' ')}
                  >
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="font-mono text-sm tracking-[0.2em] text-forest/60">
                        {step.n} / 04
                      </span>
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-forest/50">
                        {step.eyebrow}
                      </span>
                    </div>
                    <h3 className="font-black tracking-[-0.02em] leading-[1.05] text-forest text-3xl md:text-[2.5rem] mb-5">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-forest/75 leading-relaxed max-w-lg">
                      {step.body}
                    </p>
                  </div>

                  {/* Image block */}
                  <div
                    className={[
                      'md:col-span-6',
                      imageRight ? 'md:order-2' : 'md:order-1',
                    ].join(' ')}
                  >
                    <figure className="relative aspect-[5/4] md:aspect-[6/5] overflow-hidden rounded-2xl bg-bone-soft ring-1 ring-forest/10">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Warm wash to unify photos with the bone palette */}
                      <div
                        aria-hidden
                        className="absolute inset-0 mix-blend-multiply"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(30,58,42,0.10) 0%, rgba(30,58,42,0.22) 100%)',
                        }}
                      />
                      {/* Step index badge — anchors the photo to the rhythm */}
                      <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/90 bg-forest/70 backdrop-blur-sm rounded-full px-3 py-1.5">
                        Step {step.n}
                      </div>
                    </figure>
                  </div>
                </div>
              </li>
            );
          })}
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
