import { LINKS } from '@/lib/links';

type PhoneMockProps = {
  videoSrc?: string;
  posterSrc?: string;
};

export function PhoneMock({ videoSrc, posterSrc }: PhoneMockProps = {}) {
  return (
    <div
      className="relative mx-auto w-full"
      style={{
        width: 'clamp(120px, 28vw, 320px)',
        containerType: 'inline-size',
      }}
    >
      {/* Contact shadow — studio softbox feel */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: '-5cqw',
          width: '72%',
          height: '12cqw',
          borderRadius: '50%',
          background:
            'radial-gradient(closest-side, rgba(15,36,23,0.38), rgba(15,36,23,0) 70%)',
          filter: 'blur(4cqw)',
        }}
      />

      <div className="phone-float">
        {/* Phone body — titanium frame */}
        <div
          className="relative aspect-[9/19.5]"
          style={{
            borderRadius: '13cqw',
            background:
              'linear-gradient(142deg, #3a3d42 0%, #25282d 22%, #16181c 55%, #0c0e12 100%)',
            boxShadow: [
              '0 12cqw 22cqw -6cqw rgba(15,36,23,0.35)',
              '0 6cqw 12cqw -4cqw rgba(0,0,0,0.28)',
              'inset 0 0.3cqw 0 rgba(255,255,255,0.12)',
              'inset 0 -0.3cqw 0 rgba(0,0,0,0.4)',
              'inset 0 0 0 0.25cqw rgba(255,255,255,0.03)',
            ].join(', '),
          }}
        >
          {/* Diagonal metal highlight */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: '13cqw',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.05) 100%)',
            }}
          />

          {/* Side hardware — left: volume + action */}
          <SideNub side="left" top="22%" length="9cqw" />
          <SideNub side="left" top="29%" length="14cqw" />
          <SideNub side="left" top="38%" length="14cqw" />
          {/* Side hardware — right: power */}
          <SideNub side="right" top="28%" length="19cqw" />

          {/* Black screen bezel */}
          <div
            className="absolute"
            style={{
              inset: '1.9cqw',
              borderRadius: '11cqw',
              background: '#000',
            }}
          />

          {/* Screen */}
          <div
            className="absolute overflow-hidden"
            style={{
              inset: '2.8cqw',
              borderRadius: '10cqw',
              background:
                'linear-gradient(180deg, #0b1512 0%, #0a1410 55%, #050a08 100%)',
            }}
          >
            {videoSrc ? (
              <video
                src={videoSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <AnimatedChat />
            )}

            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-20 bg-black"
              style={{
                top: '3cqw',
                width: '29cqw',
                height: '8.5cqw',
                borderRadius: '4.5cqw',
                boxShadow: 'inset 0 0 0 0.25cqw rgba(255,255,255,0.04)',
              }}
            />

            {/* Home indicator */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-20"
              style={{
                bottom: '1.8cqw',
                width: '34cqw',
                height: '1.2cqw',
                borderRadius: '0.6cqw',
                background: 'rgba(255,255,250,0.75)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <a
        href={LINKS.chatWithX}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-6 md:mt-8 font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-forest/55 hover:text-forest transition"
      >
        — Try it live
      </a>
    </div>
  );
}

function SideNub({
  side,
  top,
  length,
}: {
  side: 'left' | 'right';
  top: string;
  length: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        [side]: '-0.6cqw',
        top,
        width: '0.6cqw',
        height: length,
        borderRadius: side === 'left' ? '0.3cqw 0 0 0.3cqw' : '0 0.3cqw 0.3cqw 0',
        background:
          'linear-gradient(180deg, #2a2d32 0%, #1b1d21 50%, #121418 100%)',
      }}
    />
  );
}

function AnimatedChat() {
  return (
    <>
      <div
        className="relative flex items-end px-[5cqw] pb-[1.5cqw]"
        style={{ height: '16cqw' }}
      >
        <div className="flex items-center" style={{ gap: '1.5cqw' }}>
          <div
            className="rounded-full bg-bone flex items-center justify-center text-forest-deep font-black"
            style={{ width: '6cqw', height: '6cqw', fontSize: '3.4cqw' }}
          >
            X
          </div>
          <span
            className="font-semibold text-bone tracking-tight"
            style={{ fontSize: '3.4cqw' }}
          >
            Ask X
          </span>
        </div>
        <span
          className="ml-auto font-mono uppercase text-bone/40"
          style={{ fontSize: '2.5cqw', letterSpacing: '0.25em' }}
        >
          Live
        </span>
      </div>

      <div style={{ padding: '3cqw 3.5cqw 0 3.5cqw', display: 'flex', flexDirection: 'column', gap: '2cqw' }}>
        <div
          className="bubble-1 ml-auto rounded-2xl rounded-br-md bg-bone text-forest-deep shadow-sm"
          style={{ maxWidth: '82%', padding: '2cqw 3cqw', fontSize: '3.2cqw', lineHeight: 1.35 }}
        >
          10 days in Patagonia, mid-November. I want trails, not hotels.
        </div>
        <div
          className="bubble-2 rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/[0.06] text-bone/90 backdrop-blur-sm"
          style={{ maxWidth: '86%', padding: '2cqw 3cqw', fontSize: '3.2cqw', lineHeight: 1.35 }}
        >
          Let&apos;s go. El Chaltén — Fitz Roy day 1, Laguna de los Tres day 2.
          Pairing you with Mateo, a certified local guide.
        </div>
        <div
          className="bubble-3 ml-auto rounded-2xl rounded-br-md bg-bone text-forest-deep shadow-sm"
          style={{ maxWidth: '70%', padding: '2cqw 3cqw', fontSize: '3.2cqw', lineHeight: 1.35 }}
        >
          Lock it.
        </div>
        <div
          className="bubble-4 rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/[0.06] text-bone/90 backdrop-blur-sm"
          style={{ maxWidth: '74%', padding: '2cqw 3cqw', fontSize: '3.2cqw', lineHeight: 1.35 }}
        >
          Flights held. Mateo confirmed. Packing list drafted.
        </div>
      </div>

      <div
        className="absolute left-0 right-0"
        style={{ bottom: '6cqw', padding: '0 3cqw' }}
      >
        <div
          className="rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-sm flex items-center justify-between text-bone/50"
          style={{ padding: '1.6cqw 3.5cqw', fontSize: '3cqw' }}
        >
          <span>Ask X anything…</span>
          <span
            className="rounded-full bg-bone flex items-center justify-center text-forest-deep font-bold"
            style={{ width: '5cqw', height: '5cqw', fontSize: '3cqw' }}
          >
            ↑
          </span>
        </div>
      </div>
    </>
  );
}
