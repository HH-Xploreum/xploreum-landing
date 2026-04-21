'use client';

import { useEffect, useState } from 'react';

const START = 42318;
const TICK_MS = 2400;

export function TripsTicker() {
  const [n, setN] = useState(START);

  useEffect(() => {
    const t = setInterval(() => setN((x) => x + 1), TICK_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-forest/45">
      <span className="inline-block w-6 h-px bg-forest/30" />
      <span>{n.toLocaleString('en-US')}</span>
      <span>trips planned this month</span>
    </span>
  );
}
