'use client';

import { useEffect, useState } from 'react';

const LINE1 = 'Chat Plan';
const LINE2 = 'Pack Go';
const OUTLINE_START = 'Pack '.length;
const OUTLINE_END = 'Pack Go'.length;

const TYPE_MS = 85;
const LINE_GAP_MS = 260;

type Phase = 'typing1' | 'pausing' | 'typing2' | 'done';

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
        setPhase('done');
        return;
      }
      const t = setTimeout(
        () => setLine2(LINE2.slice(0, line2.length + 1)),
        TYPE_MS,
      );
      return () => clearTimeout(t);
    }
  }, [phase, line1, line2]);

  const line1Active = phase === 'typing1';
  const line2Active = phase === 'typing2';

  const line2Pre = line2.slice(0, Math.min(line2.length, OUTLINE_START));
  const line2Outlined = line2.slice(
    OUTLINE_START,
    Math.min(line2.length, OUTLINE_END),
  );
  const line2Tail = line2.slice(OUTLINE_END);

  return (
    <>
      <span className="block whitespace-nowrap">
        <span>{line1}</span>
        {line1Active && <span aria-hidden className="caret" />}
      </span>
      <span className="block whitespace-nowrap">
        <span>{line2Pre}</span>
        {line2Outlined && <span className="text-outline">{line2Outlined}</span>}
        {line2Tail && (
          <span className="text-outline" style={{ fontSize: '0.55em' }}>
            {line2Tail}
          </span>
        )}
        {line2Active && <span aria-hidden className="caret" />}
      </span>
      <span className="sr-only">Chat. Plan. Pack. Go.</span>
    </>
  );
}
