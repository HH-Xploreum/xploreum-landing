import { LINKS } from '@/lib/links';

export function PhoneMock() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 340 }}>
      <div
        className="absolute -inset-12 rounded-[50%] pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(120,180,255,0.10), rgba(120,180,255,0) 70%)',
          filter: 'blur(14px)',
        }}
      />

      <div className="relative aspect-[9/19] rounded-[2.6rem] p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)]"
        style={{
          background:
            'linear-gradient(180deg, #1b2228 0%, #0a0d11 60%, #050709 100%)',
          boxShadow:
            '0 50px 100px -30px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="relative h-full w-full rounded-[2rem] overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, #0b1512 0%, #0a1410 50%, #050a08 100%)',
          }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10" />

          <div className="h-10" />

          <div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-bone flex items-center justify-center text-forest-deep font-black text-sm">
                X
              </div>
              <span className="font-semibold text-bone text-sm tracking-tight">
                Ask X
              </span>
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone/40">
              Live
            </div>
          </div>

          <div className="px-4 py-5 space-y-2.5">
            <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-bone/95 text-forest-deep text-[12px] leading-relaxed px-3.5 py-2.5 shadow-sm">
              10 days in Patagonia, mid-November. I want trails, not hotels.
            </div>
            <div className="max-w-[86%] rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.05] text-bone/90 text-[12px] leading-relaxed px-3.5 py-2.5 backdrop-blur-sm">
              Let&apos;s go. El Chaltén — Fitz Roy day 1, Laguna de los Tres day 2.
              Pairing you with Mateo, a certified local guide.
            </div>
            <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.05] text-bone/90 text-[12px] leading-relaxed px-3.5 py-2.5 backdrop-blur-sm">
              Weather window looks clean Nov 14–24. Shall I lock it?
            </div>
          </div>

          <div className="absolute bottom-6 left-4 right-4">
            <div className="rounded-full bg-white/[0.05] border border-white/10 px-4 py-2.5 text-[11px] text-bone/50 flex items-center justify-between backdrop-blur-sm">
              <span>Ask X anything…</span>
              <span className="w-6 h-6 rounded-full bg-bone flex items-center justify-center text-forest-deep text-xs font-bold">
                ↑
              </span>
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-bone/40" />
        </div>
      </div>

      <a
        href={LINKS.chatWithX}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/45 hover:text-bone transition"
      >
        — Try it live
      </a>
    </div>
  );
}
