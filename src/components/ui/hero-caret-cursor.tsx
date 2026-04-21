'use client';

import { useEffect, useState } from 'react';

export function HeroCaretCursor() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const getZone = () =>
      document.querySelector<HTMLElement>('[data-caret-zone]');

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const zone = getZone();
      if (!zone) {
        setActive(false);
        return;
      }
      const r = zone.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      setActive(inside);
    };

    const onLeave = () => setActive(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`caret-cursor ${active ? 'is-active' : ''}`}
      style={{ transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)` }}
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M5 5 L19 19 M19 5 L5 19"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
