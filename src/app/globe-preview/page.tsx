import type { Metadata } from 'next';
import { GlobeO } from '@/components/ui/globe-o';
import type { GlobeStyle } from '@/components/ui/globe';

export const metadata: Metadata = {
  title: 'Globe preview — Xploreum',
  robots: { index: false, follow: false },
};

type Option = {
  key: GlobeStyle;
  label: string;
  blurb: string;
};

const OPTIONS: Option[] = [
  {
    key: 'night',
    label: 'Premium Night',
    blurb:
      'Dark navy oceans, near-black continents, warm cream city-light clusters. Selective bloom so only the lights glow — coastlines and rim stay clean. Current hero default — the premium, cinematic, quiet direction.',
  },
  {
    key: 'live',
    label: 'Live',
    blurb:
      'Realistic day/night shader. Sunlit blue oceans and continents on one hemisphere, glowing city lights on the other, warm terminator glow between them. Sun sweeps as it rotates.',
  },
  {
    key: 'neon',
    label: 'Neon',
    blurb:
      'Dark ocean, traced continents. Coastlines glow bright blue-white, land interiors shimmer with cool-toned city clusters. Data-viz feel — reads as an interface, not a photo.',
  },
  {
    key: 'day',
    label: 'Day',
    blurb:
      'Classic Blue Marble. Bright blue oceans, green and brown continents, visible ice caps. Optimistic and earth-like. Less moody, more editorial nature.',
  },
  {
    key: 'topo',
    label: 'Topographic',
    blurb:
      'Greyscale relief. Mountains, ridges and coastlines visible. Map-like, editorial, less photographic. Feels like a piece of cartography.',
  },
  {
    key: 'brand',
    label: 'Brand Green',
    blurb:
      'Monochrome in Xploreum forest green. Earth rendered in a single brand-aligned tone. Most on-brand, reads as a sigil rather than a planet.',
  },
  {
    key: 'minimal',
    label: 'Minimal',
    blurb:
      'Barely-there silhouettes on a near-black sphere. Reads as a form first, earth second. The most restrained and premium option.',
  },
  {
    key: 'wireframe',
    label: 'Wireframe',
    blurb:
      'Geometric forest-green lines on white. No photography, pure structure. Most abstract and most graphic — diagram, not planet.',
  },
];

export default function GlobePreview() {
  return (
    <main className="min-h-screen bg-bone text-forest">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <header className="mb-14 md:mb-20 max-w-3xl">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest/55 mb-5">
            Internal · Globe style picker
          </div>
          <h1 className="font-black uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)] text-forest">
            Pick a globe.
          </h1>
          <p className="mt-5 text-forest/70 text-base md:text-lg leading-relaxed max-w-xl">
            Seven styles, same geometry, same rotation and drag controls. Tell
            me the label of the one you want and I&apos;ll wire it into the hero.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 md:gap-x-14">
          {OPTIONS.map((opt) => (
            <article
              key={opt.key}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="relative"
                style={{ width: 'min(280px, 70vw)', fontSize: 'min(280px, 70vw)' }}
              >
                <GlobeO style={opt.key} size="1em" />
              </div>

              <div className="mt-8 max-w-xs">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-forest/45 mb-2">
                  {opt.key}
                </div>
                <h2 className="font-black uppercase tracking-[-0.02em] text-2xl md:text-3xl text-forest">
                  {opt.label}
                </h2>
                <p className="mt-3 text-sm text-forest/70 leading-relaxed">
                  {opt.blurb}
                </p>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-20 md:mt-28 border-t border-forest/15 pt-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-forest/50">
          <span>All globes are live · drag to rotate · zoom locked</span>
          <a href="/" className="hover:text-forest-deep transition">
            ← Back to hero
          </a>
        </footer>
      </div>
    </main>
  );
}
