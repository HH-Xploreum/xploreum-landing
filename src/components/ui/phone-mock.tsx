import { LINKS } from '@/lib/links';

export function PhoneMock() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 360 }}>
      {/* device frame */}
      <div className="relative aspect-[9/19] rounded-[2.75rem] bg-forest-deep p-[14px] shadow-[0_40px_80px_-20px_rgba(15,36,23,0.4)]">
        {/* screen */}
        <div className="relative h-full w-full rounded-[2.1rem] bg-bone overflow-hidden">
          {/* notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-forest-deep rounded-full z-10" />

          {/* status bar spacer */}
          <div className="h-12" />

          {/* app header */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-line/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-forest flex items-center justify-center text-bone font-bold text-sm">
                X
              </div>
              <span className="font-bold text-forest text-sm">Ask X</span>
            </div>
            <div className="w-5 h-5 rounded-full border border-forest/30" />
          </div>

          {/* chat body */}
          <div className="px-4 py-5 space-y-3">
            <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-forest text-bone text-[13px] leading-relaxed px-4 py-2.5">
              10 days in Patagonia, mid-November. I want trails, not hotels.
            </div>
            <div className="max-w-[86%] rounded-2xl rounded-bl-md bg-bone-soft text-forest text-[13px] leading-relaxed px-4 py-2.5">
              Let&apos;s go. Starting in El Chaltén — Fitz Roy trek day 1, Laguna
              de los Tres day 2. Pairing you with Mateo, a certified local guide.
            </div>
            <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-bone-soft text-forest text-[13px] leading-relaxed px-4 py-2.5">
              Weather window looks clean Nov 14–24. Shall I lock it?
            </div>
          </div>

          {/* input */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="rounded-full bg-bone-soft border border-line/60 px-4 py-2.5 text-[12px] text-moss flex items-center justify-between">
              <span>Ask X anything…</span>
              <span className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-bone text-xs">
                ↑
              </span>
            </div>
          </div>

          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-forest/30" />
        </div>
      </div>

      {/* caption */}
      <a
        href={LINKS.chatWithX}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-moss hover:text-forest transition"
      >
        — Try it live
      </a>
    </div>
  );
}
