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
  size: number;
};

const OPTIONS: Option[] = [
  {
    key: 'night',
    label: 'A · Night Lights',
    blurb:
      'NASA Black Marble. Warm city-light clusters on deep blue oceans. Current default — most atmospheric and cinematic.',
    size: 715,
  },
  {
    key: 'topo',
    label: 'B · Topographic',
    blurb:
      'Greyscale relief. Mountains, ridges, coastlines readable. Editorial, map-like, least photographic.',
    size: 378,
  },
  {
    key: 'minimal',
    label: 'C · Minimal',
    blurb:
      'Barely-there silhouettes. Reads as a sphere first, continents second. The most restrained / premium option.',
    size: 95,
  },
  {
    key: 'day',
    label: 'D · Day Color',
    blurb:
      'Standard blue marble. Brighter, more earth-like, less moody. A fallback if night feels too dark.',
    size: 245,
  },
];

export default function GlobePreview() {
  return (
    <main className="min-h-screen bg-[#05080b] text-bone">
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 700px at 15% 20%, rgba(30,58,42,0.45), transparent 60%), radial-gradient(900px 600px at 85% 80%, rgba(20,40,70,0.35), transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <header className="mb-14 md:mb-20 max-w-3xl">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/50 mb-5">
            Internal · Globe style picker
          </div>
          <h1 className="font-black uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)] text-bone">
            Pick a globe.
          </h1>
          <p className="mt-5 text-bone/65 text-base md:text-lg leading-relaxed max-w-xl">
            Four textures, same geometry, same rotation. Whichever you pick becomes
            the O in GO on the hero. City-pin layer is a separate decision.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
          {OPTIONS.map((opt) => (
            <article
              key={opt.key}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="relative"
                style={{ width: 'min(360px, 80vw)', fontSize: 'min(360px, 80vw)' }}
              >
                <GlobeO style={opt.key} size="1em" />
              </div>

              <div className="mt-8 md:mt-10 max-w-xs">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/45 mb-2">
                  {opt.label.split(' · ')[0]} · {opt.size} kB
                </div>
                <h2 className="font-black uppercase tracking-[-0.02em] text-2xl md:text-3xl text-bone">
                  {opt.label.split(' · ')[1]}
                </h2>
                <p className="mt-3 text-sm text-bone/65 leading-relaxed">
                  {opt.blurb}
                </p>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-20 md:mt-28 border-t border-bone/10 pt-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40">
          <span>All textures bundled locally · no API key · no Mapbox</span>
          <a href="/" className="hover:text-bone transition">← Back to hero</a>
        </footer>
      </div>
    </main>
  );
}
