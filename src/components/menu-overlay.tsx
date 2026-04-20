'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { LINKS } from '@/lib/links';

type MenuItem = {
  label: string;
  caption: string;
  href: string;
  external?: boolean;
};

const PRODUCT: MenuItem[] = [
  { label: 'How it works', caption: 'From chat to trip to guide, step by step', href: LINKS.howItWorks },
  { label: 'About Xploreum', caption: 'The team, the mission, the story', href: LINKS.about },
];

const MOBILE: MenuItem[] = [
  { label: 'Get the iOS & Android app', caption: 'Launching soon', href: LINKS.mobile },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bone overflow-y-auto">
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-5 md:pt-8 pb-24">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 -ml-2 text-forest hover:opacity-70 transition"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>

        <Section title="Product" items={PRODUCT} onNavigate={onClose} />
        <Section title="Mobile" items={MOBILE} onNavigate={onClose} />

        <div className="mt-16 md:mt-24 pt-8 border-t border-line flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-xs tracking-[0.2em] uppercase text-forest/60">
          <a
            href={LINKS.contact}
            onClick={onClose}
            className="inline-flex items-center gap-2 hover:text-forest transition"
          >
            Contact <span aria-hidden>→</span>
          </a>
          <a
            href={LINKS.signIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-2 hover:text-forest transition"
          >
            Sign in <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="mt-14 md:mt-20">
      <div className="font-mono text-xs tracking-[0.25em] uppercase text-forest/50 mb-5 md:mb-7">
        {title}
      </div>
      <div className="border-t border-line/60">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="group flex items-start justify-between gap-6 py-6 md:py-8 border-b border-line/60"
          >
            <div>
              <div className="font-black text-forest tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,5vw,3.75rem)] transition-transform group-hover:translate-x-1">
                {item.label}
              </div>
              <div className="text-forest/60 text-sm md:text-base mt-2 md:mt-3 max-w-md">
                {item.caption}
              </div>
            </div>
            <span
              aria-hidden
              className="text-forest/40 group-hover:text-forest text-2xl md:text-3xl mt-2 md:mt-4 transition-all group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
