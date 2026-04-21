'use client';

import { useEffect, useState } from 'react';

const LINE1 = 'Chat Plan';
const LINE2 = 'Pack Go';
const OUTLINE_START = 'Pack '.length;

const TYPE_MS = 85;
const LINE_GAP_MS = 260;
const HOLD_MS = 2200;
const ERASE_MS = 32;

type Phase = 'typing1' | 'pausing' | 'typing2' | 'holding' | 'erasing';

export function TypewriterPhrases() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [phase, setPhase] = useState<Phase>('typing1');

  useEffect(() => {
    if (phase === 'typing1') {
      if (line1 === LINE1) {
        const t = setTimeout(() => setPhase('pausing'), LINE_GAP_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setLine1(LINE1.slice(0, line1.length + 1)),
        TYPE_MS,
      );
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      setPhase('typing2');
      return;
    }

    if (phase === 'typing2') {
      if (line2 === LINE2) {
        const t = setTimeout(() => setPhase('holding'), 0);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setLine2(LINE2.slice(0, line2.length + 1)),
        TYPE_MS,
      );
      return () => clearTimeout(t);
    }

    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('erasing'), HOLD_MS);
      return () => clearTimeout(t);
    }

    // erasing: drop line2 first, then line1, then loop
    if (line2.length > 0) {
      const t = setTimeout(() => setLine2(line2.slice(0, -1)), ERASE_MS);
      return () => clearTimeout(t);
    }
    if (line1.length > 0) {
      const t = setTimeout(() => setLine1(line1.slice(0, -1)), ERASE_MS);
      return () => clearTimeout(t);
    }
    setPhase('typing1');
  }, [phase, line1, line2]);

  const line1Active = phase === 'typing1';
  const line2Active =
    phase === 'typing2' || phase === 'holding' || phase === 'erasing';

  const line2Plain = line2.slice(0, Math.min(line2.length, OUTLINE_START));
  const line2Outlined = line2.slice(OUTLINE_START);

  return (
    <>
      <span className="block whitespace-nowrap">
        <span>{line1}</span>
        {line1Active && <span aria-hidden className="caret" />}
      </span>
      <span className="block whitespace-nowrap">
        <span>{line2Plain}</span>
        {line2Outlined && <span className="text-outline">{line2Outlined}</span>}
        {line2Active && <span aria-hidden className="caret" />}
      </span>
      <span className="sr-only">Chat. Plan. Pack. Go.</span>
    </>
  );
}
