import { LINKS } from '@/lib/links';
import { PhoneMock } from '@/components/ui/phone-mock';
import { TypewriterPhrases } from '@/components/ui/typewriter-phrases';
import { MagneticPill } from '@/components/ui/magnetic-pill';

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] md:min-h-screen overflow-hidden bg-bone text-forest">
      {/* Background video */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source
          src="https://auth.xploreum.io/storage/v1/object/public/landing-assets/video13.mp4"
          type="video/mp4"
        />
      </video>
      {/* Legibility wash — soft bone veil over video so forest text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-bone/70"
      />

      {/* Soft radial wash + grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 700px at 15% 20%, rgba(30,58,42,0.06), transparent 60%), radial-gradient(900px 600px at 85% 80%, rgba(30,58,42,0.05), transparent 65%)',
        }}
      />
      <div aria-hidden className="grain-layer" />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-20 md:pt-32 pb-6 md:pb-20 min-h-[100svh] md:min-h-screen flex flex-col">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[auto_auto] gap-4 md:gap-x-14 lg:gap-x-16 md:gap-y-8 flex-1 md:items-center">
          <div className="max-w-[640px] md:col-start-1 md:row-start-1 md:self-end">
            <h1
              className="font-black uppercase leading-[0.88] tracking-[-0.045em] text-forest text-[2.5rem] md:text-[clamp(4.25rem,10vw,9.5rem)]"
            >
              <span className="rise rise-2 block">
                <TypewriterPhrases />
              </span>
            </h1>

            <div className="rise rise-5 mt-4 md:mt-24 space-y-1.5 text-forest leading-snug">
              <p className="font-normal text-[13px] md:text-[clamp(1.125rem,1.9vw,1.5rem)]">
                You don&apos;t need a guidebook. You don&apos;t need a spreadsheet.
              </p>
              <p className="font-normal text-[13px] md:text-[clamp(1.125rem,1.9vw,1.5rem)]">
                You don&apos;t need six tabs open at midnight.
              </p>
              <p className="font-serif italic font-medium leading-snug text-[13px] md:text-[clamp(1.125rem,1.9vw,1.5rem)] text-[#a05a16] mt-2">
                You just need to start talking.
              </p>
            </div>
          </div>

          <div className="rise rise-4 w-full flex justify-center md:justify-end md:col-start-2 md:row-start-1 md:row-span-2 md:self-center">
            <PhoneMock videoSrc="https://auth.xploreum.io/storage/v1/object/public/landing-assets/mobile-app.mov" />
          </div>

          <div className="rise rise-6 md:col-start-1 md:row-start-2 md:self-start flex justify-center md:justify-start mt-0">
            <MagneticPill
              href={LINKS.chatWithX}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-forest text-bone px-7 py-3 md:py-4 text-base md:text-lg font-semibold tracking-tight hover:bg-forest-deep"
            >
              Chat with X
            </MagneticPill>
          </div>
        </div>

      </div>
    </section>
  );
}
