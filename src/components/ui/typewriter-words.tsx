'use client';

import { useEffect, useState } from 'react';

const WORDS = ['Plan,', 'Pack,', 'Go.'];

const TYPE_MS = 90;
const ERASE_MS = 45;
const HOLD_MS = 1800;
const GAP_MS = 350;

type Phase = 'typing' | 'holding' | 'erasing' | 'gap';

export function TypewriterWords() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const word = WORDS[index];

    if (phase === 'typing') {
      if (text === word) {
        const t = setTimeout(() => setPhase('holding'), 0);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('erasing'), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'erasing') {
      if (text === '') {
        const t = setTimeout(() => setPhase('gap'), 0);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(text.slice(0, -1)), ERASE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % WORDS.length);
      setPhase('typing');
    }, GAP_MS);
    return () => clearTimeout(t);
  }, [text, phase, index]);

  return (
    <span
      className={`inline-flex items-baseline ${phase === 'holding' ? 'word-breathe' : ''}`}
    >
      <span aria-hidden>
        {text.split('').map((ch, i) => (
          <span
            key={`${index}-${i}`}
            className="char-in"
            style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}
          >
            {ch}
          </span>
        ))}
      </span>
      <span aria-hidden className="caret" />
      <span className="sr-only">{WORDS[index]}</span>
    </span>
  );
}
