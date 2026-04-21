'use client';

import { useEffect, useState } from 'react';

const COORDS = [
  { place: 'Tokyo', lat: '35.6762° N', lon: '139.6503° E' },
  { place: 'Lisbon', lat: '38.7223° N', lon: '9.1393° W' },
  { place: 'Reykjavík', lat: '64.1466° N', lon: '21.9426° W' },
  { place: 'Patagonia', lat: '50.9423° S', lon: '73.5408° W' },
  { place: 'Kyoto', lat: '35.0116° N', lon: '135.7681° E' },
  { place: 'Cape Town', lat: '33.9249° S', lon: '18.4241° E' },
  { place: 'Marrakech', lat: '31.6295° N', lon: '7.9811° W' },
  { place: 'Oaxaca', lat: '17.0732° N', lon: '96.7266° W' },
];

export function CoordTicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % COORDS.length), 3800);
    return () => clearInterval(t);
  }, []);

  const c = COORDS[i];
  return (
    <span
      key={i}
      className="coord-fade inline-flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-forest/55"
    >
      <span className="text-forest/40">Now</span>
      <span>{c.lat}</span>
      <span className="text-forest/30">/</span>
      <span>{c.lon}</span>
      <span className="text-forest/30">—</span>
      <span className="text-forest/75">{c.place}</span>
    </span>
  );
}
