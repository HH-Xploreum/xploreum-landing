'use client';

import { useState } from 'react';
import { Wordmark } from '@/components/ui/wordmark';
import { Button } from '@/components/ui/button';
import { MenuOverlay } from '@/components/menu-overlay';
import { LINKS } from '@/lib/links';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-bone/80 backdrop-blur-md border-b border-line/40">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-[5px] py-2 px-1"
            >
              <span className="block w-6 h-[2px] bg-forest" />
              <span className="block w-6 h-[2px] bg-forest" />
              <span className="block w-6 h-[2px] bg-forest" />
            </button>
            <Wordmark />
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <Button
              href={LINKS.forGuide}
              variant="link"
              className="hidden sm:inline-flex text-sm"
            >
              For Guide
            </Button>
            <Button
              href={LINKS.chatWithX}
              variant="primary"
              external
              className="text-sm md:text-base py-2.5 md:py-3 px-5 md:px-6"
            >
              Chat with X
            </Button>
          </div>
        </div>
      </nav>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
