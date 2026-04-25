import { LINKS } from '@/lib/links';

export function About() {
  return (
    <section id="about" className="bg-bone border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-36">
        <div className="font-semibold text-xs md:text-sm tracking-[0.2em] uppercase text-forest/70 mb-10">
          About Xploreum
        </div>

        <p className="font-black tracking-[-0.025em] leading-[1.08] text-forest text-[clamp(1.75rem,3.6vw,3rem)] max-w-4xl">
          We&apos;re building the travel agent we wish existed. One that knows
          your preferences and the terrain, respects your time, and sends you
          to people who actually live there.
        </p>

        <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-14">
          <div>
            <div className="font-semibold text-xs tracking-[0.2em] uppercase text-forest/60 mb-3">
              The problem
            </div>
            <p className="text-[14px] md:text-base text-forest/80 leading-relaxed">
              Great adventure trips take 16+ hours to plan and still feel
              generic. Marketplaces eat through the already thin margins of
              local providers. Aggregators churn out the same itineraries. The
              best trips stay inside private group chats.
            </p>
          </div>
          <div>
            <div className="font-semibold text-xs tracking-[0.2em] uppercase text-forest/60 mb-3">
              The fix
            </div>
            <p className="text-[14px] md:text-base text-forest/80 leading-relaxed">
              An AI that plans like a well-traveled friend, helps you find the
              best local services, then guides you when navigating the terrain.
              One conversation, one coherent itinerary, one companion to help
              you execute on the most memorable moments of your life.
            </p>
          </div>
          <div>
            <div className="font-semibold text-xs tracking-[0.2em] uppercase text-forest/60 mb-3">
              The team
            </div>
            <p className="text-[14px] md:text-base text-forest/80 leading-relaxed">
              Built by Armin and Hadis, founders who&apos;ve shipped AI
              products and guided expeditions on three continents. Based in San
              Francisco and Montréal. We believe great adventure travel should
              be both accessible and regenerative, for travelers, for locals,
              and for the places themselves.
            </p>
            <p className="text-[14px] md:text-base text-forest/80 leading-relaxed mt-4">
              <a
                href={LINKS.contact}
                className="underline decoration-forest/30 underline-offset-4 hover:decoration-forest/80 transition"
              >
                Drop us a note
              </a>{' '}
              if you&apos;re interested in joining our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
