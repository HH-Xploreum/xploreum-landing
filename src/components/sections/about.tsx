export function About() {
  return (
    <section id="about" className="bg-bone border-t border-line">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-36">
        <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-forest/70 mb-10">
          About Xploreum
        </div>

        <p className="font-black tracking-[-0.025em] leading-[1.08] text-forest text-[clamp(1.75rem,3.6vw,3rem)] max-w-4xl">
          We&apos;re building the travel agent we wish existed. One that knows the
          terrain, respects your time, and sends you to people who actually live there.
        </p>

        <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-14">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-forest/60 mb-3">
              The problem
            </div>
            <p className="text-forest/80 leading-relaxed">
              Great adventure trips take 16+ hours to plan and still feel generic.
              Marketplaces hide the good guides. Aggregators churn out the same
              itineraries. The best trips stay inside private group chats.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-forest/60 mb-3">
              The fix
            </div>
            <p className="text-forest/80 leading-relaxed">
              An AI that plans like a well-traveled friend, then hands you off to a
              real local expert who executes. One conversation, one coherent trip,
              one human you actually meet when you land.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-forest/60 mb-3">
              The team
            </div>
            <p className="text-forest/80 leading-relaxed">
              Built by founders who&apos;ve shipped AI products and guided expeditions
              on three continents. Backquartered in San Francisco and Montréal.
              Always hiring curious people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
