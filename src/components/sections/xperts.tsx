import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';

const XPERTS = [
  { name: 'Mateo R.', region: 'Patagonia, AR', specialty: 'Alpine trekking', years: 12 },
  { name: 'Ayaka S.', region: 'Hokkaido, JP', specialty: 'Backcountry ski', years: 9 },
  { name: 'Kwame O.', region: 'Serengeti, TZ', specialty: 'Wildlife safari', years: 15 },
  { name: 'Lucía V.', region: 'Baja, MX', specialty: 'Free-diving', years: 8 },
  { name: 'Finn B.', region: 'West Fjords, IS', specialty: 'Sea kayak', years: 11 },
  { name: 'Priya N.', region: 'Ladakh, IN', specialty: 'High-altitude trek', years: 10 },
];

export function Xperts() {
  return (
    <section id="xperts" className="bg-forest text-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-36">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-16 md:mb-20">
          <div>
            <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-bone/60 mb-6">
              Meet the Xperts
            </div>
            <h2 className="font-black tracking-[-0.03em] leading-[0.98] text-[clamp(2.5rem,5.5vw,4.75rem)]">
              AI plans it. Humans run it.
            </h2>
          </div>
          <p className="text-lg text-bone/80 leading-relaxed max-w-md">
            Every Xpedition is led by a vetted local: certified, insured, and paid
            fairly because no middleman takes a cut. These are the people who make
            your trip real on the ground.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {XPERTS.map((x) => (
            <div
              key={x.name}
              className="border border-bone/15 rounded-2xl p-6 hover:bg-bone/[0.04] transition"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-bone/10 flex items-center justify-center font-bold text-bone/80">
                  {x.name.split(' ').map((s) => s[0]).join('')}
                </div>
                <span className="font-mono text-xs text-bone/50">
                  {x.years}Y
                </span>
              </div>
              <div className="font-bold text-xl tracking-tight">{x.name}</div>
              <div className="text-sm text-bone/60 mt-1">{x.region}</div>
              <div className="text-sm text-bone/80 mt-4 pt-4 border-t border-bone/10">
                {x.specialty}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Button
            href={LINKS.forGuide}
            variant="primary"
            className="bg-bone text-forest hover:bg-bone-soft"
          >
            Become an Xpert
          </Button>
          <span className="text-sm text-bone/60">
            Guiding in a region we don&apos;t cover yet? We want to hear from you.
          </span>
        </div>
      </div>
    </section>
  );
}
