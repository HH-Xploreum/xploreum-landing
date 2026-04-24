const STEPS = [
  {
    n: '01',
    title: 'Tell Xavier where you want to go.',
    body:
      'Or describe the feeling. "Something quiet, near water, in October." Xavier listens in plain language and asks the right follow-ups.',
  },
  {
    n: '02',
    title: 'Watch the trip come together.',
    body:
      'Flights, lodging, routes, permits, gear: all mapped live in front of you. Edit anything by just saying what you want to change.',
  },
  {
    n: '03',
    title: 'Meet your Xpert.',
    body:
      'We match you with a certified local guide for the ground part: the hike, the dive, the ride. Real humans, booked through us, fairly paid.',
  },
  {
    n: '04',
    title: 'Go live the thing.',
    body:
      'Offline itineraries, real-time check-ins, one-tap rescheduling if weather turns. The plan bends so the adventure doesn\'t break.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line bg-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-36">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-forest/70 mb-6">
            How it works
          </div>
          <h2 className="font-black tracking-[-0.03em] leading-[0.98] text-forest text-[clamp(2.5rem,5.5vw,4.75rem)]">
            From chat to trip to guide. Four steps.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-20">
          {STEPS.map((step) => (
            <div key={step.n} className="border-t border-forest/20 pt-8">
              <div className="font-mono text-sm tracking-[0.2em] text-forest/60 mb-6">
                {step.n} / 04
              </div>
              <h3 className="font-black tracking-[-0.02em] leading-tight text-forest text-3xl md:text-4xl mb-5">
                {step.title}
              </h3>
              <p className="text-base md:text-lg text-forest/75 leading-relaxed max-w-md">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
