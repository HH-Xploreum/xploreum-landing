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
      <div className="max-w-md mx-auto px-6 pt-6 pb-16">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 -ml-2 text-forest hover:opacity-70 transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>

        <Section title="Product" items={PRODUCT} onNavigate={onClose} />
        <Section title="Mobile" items={MOBILE} onNavigate={onClose} />

        <div className="mt-12 flex items-center gap-8 font-semibold text-forest">
          <a
            href={LINKS.contact}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 hover:opacity-70 transition"
          >
            Contact <span aria-hidden>→</span>
          </a>
          <a
            href={LINKS.signIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 hover:opacity-70 transition"
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
    <div className="mt-10">
      <div className="font-mono text-xs tracking-[0.2em] uppercase text-forest/70 mb-4">
        {title}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="group flex items-start justify-between gap-4 rounded-2xl bg-bone-soft hover:bg-bone-deep transition px-6 py-5"
          >
            <div>
              <div className="font-bold text-forest text-xl tracking-tight uppercase">
                {item.label}
              </div>
              <div className="text-forest/70 text-sm mt-1">{item.caption}</div>
            </div>
            <span
              aria-hidden
              className="text-forest text-2xl mt-0.5 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
