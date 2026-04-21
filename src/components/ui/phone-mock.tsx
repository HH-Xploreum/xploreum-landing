import { LINKS } from '@/lib/links';

type PhoneMockProps = {
  videoSrc?: string;
  posterSrc?: string;
};

export function PhoneMock({ videoSrc, posterSrc }: PhoneMockProps = {}) {
  return (
    <div className="relative mx-auto" style={{ width: 320 }}>
      {/* Contact shadow under the device — studio softbox feel */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] w-[72%] h-10 rounded-[50%] pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(15,36,23,0.38), rgba(15,36,23,0) 70%)',
          filter: 'blur(14px)',
        }}
      />

      <div className="phone-float">
        {/* Phone body — titanium frame */}
        <div
          className="relative aspect-[9/19.5] rounded-[42px]"
          style={{
            background:
              'linear-gradient(142deg, #3a3d42 0%, #25282d 22%, #16181c 55%, #0c0e12 100%)',
            boxShadow: [
              '0 40px 70px -20px rgba(15,36,23,0.35)',
              '0 20px 40px -15px rgba(0,0,0,0.28)',
              'inset 0 1px 0 rgba(255,255,255,0.12)',
              'inset 0 -1px 0 rgba(0,0,0,0.4)',
              'inset 0 0 0 1px rgba(255,255,255,0.03)',
            ].join(', '),
          }}
        >
          {/* Subtle diagonal metal highlight */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[42px] pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.05) 100%)',
            }}
          />

          {/* Side hardware — left: volume + action buttons */}
          <div className="absolute left-[-2px] top-[22%] w-[2px] h-[28px] rounded-l-sm bg-gradient-to-b from-[#2a2d32] via-[#1b1d21] to-[#121418]" />
          <div className="absolute left-[-2px] top-[29%] w-[2px] h-[44px] rounded-l-sm bg-gradient-to-b from-[#2a2d32] via-[#1b1d21] to-[#121418]" />
          <div className="absolute left-[-2px] top-[36%] w-[2px] h-[44px] rounded-l-sm bg-gradient-to-b from-[#2a2d32] via-[#1b1d21] to-[#121418]" />

          {/* Side hardware — right: power */}
          <div className="absolute right-[-2px] top-[28%] w-[2px] h-[60px] rounded-r-sm bg-gradient-to-b from-[#2a2d32] via-[#1b1d21] to-[#121418]" />

          {/* Black screen bezel — thin inner border */}
          <div className="absolute inset-[6px] rounded-[36px] bg-black" />

          {/* Screen */}
          <div
            className="absolute inset-[9px] rounded-[33px] overflow-hidden"
            style={{
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

            {/* Dynamic Island — floats inside the display, on top of content */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[92px] h-[28px] bg-black rounded-full z-20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[108px] h-[4px] rounded-full bg-bone/75 z-20" />
          </div>
        </div>
      </div>

      {/* Caption */}
      <a
        href={LINKS.chatWithX}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-8 font-mono text-[10px] tracking-[0.25em] uppercase text-forest/55 hover:text-forest transition"
      >
        — Try it live
      </a>
    </div>
  );
}

function AnimatedChat() {
  return (
    <>
      {/* Top status-bar spacer + app header */}
      <div className="relative h-[52px] flex items-end px-5 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-bone flex items-center justify-center text-forest-deep font-black text-[11px]">
            X
          </div>
          <span className="font-semibold text-bone text-[11px] tracking-tight">
            Ask X
          </span>
        </div>
        <span className="ml-auto font-mono text-[8px] tracking-[0.25em] uppercase text-bone/40">
          Live
        </span>
      </div>

      <div className="px-3.5 py-4 space-y-2">
        <div className="bubble-1 ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-bone text-forest-deep text-[11px] leading-relaxed px-3 py-2 shadow-sm">
          10 days in Patagonia, mid-November. I want trails, not hotels.
        </div>
        <div className="bubble-2 max-w-[86%] rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/[0.06] text-bone/90 text-[11px] leading-relaxed px-3 py-2 backdrop-blur-sm">
          Let&apos;s go. El Chaltén — Fitz Roy day 1, Laguna de los Tres day 2.
          Pairing you with Mateo, a certified local guide.
        </div>
        <div className="bubble-3 ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-bone text-forest-deep text-[11px] leading-relaxed px-3 py-2 shadow-sm">
          Lock it.
        </div>
        <div className="bubble-4 max-w-[74%] rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/[0.06] text-bone/90 text-[11px] leading-relaxed px-3 py-2 backdrop-blur-sm">
          Flights held. Mateo confirmed. Packing list drafted.
        </div>
      </div>

      {/* Input */}
      <div className="absolute bottom-6 left-3 right-3">
        <div className="rounded-full bg-white/[0.05] border border-white/10 px-3.5 py-2 text-[10px] text-bone/50 flex items-center justify-between backdrop-blur-sm">
          <span>Ask X anything…</span>
          <span className="w-5 h-5 rounded-full bg-bone flex items-center justify-center text-forest-deep text-[10px] font-bold">
            ↑
          </span>
        </div>
      </div>
    </>
  );
}
