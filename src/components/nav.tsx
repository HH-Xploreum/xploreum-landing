'use client';

import { useEffect, useState } from 'react';
import { Wordmark } from '@/components/ui/wordmark';
import { MenuOverlay } from '@/components/menu-overlay';
import { LINKS } from '@/lib/links';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-bone/85 backdrop-blur-md border-b border-line/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col items-start gap-[6px] py-2 px-1"
            >
              <span className="block w-6 h-[2px] bg-forest" />
              <span className="block w-3.5 h-[2px] bg-forest" />
            </button>
            <Wordmark tone="dark" />
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <a
              href={LINKS.forGuide}
              className="hidden sm:inline-flex text-sm font-semibold tracking-tight text-forest hover:text-forest-deep transition-colors"
            >
              For Guide
            </a>
            <a
              href={LINKS.chatWithX}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold tracking-tight transition bg-forest text-bone hover:bg-forest-deep"
            >
              <span>Chat with X</span>
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </nav>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
