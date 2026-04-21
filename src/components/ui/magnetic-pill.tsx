'use client';

import { useEffect, useRef } from 'react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  range?: number;
  strength?: number;
};

export function MagneticPill({
  children,
  className = '',
  range = 170,
  strength = 14,
  ...props
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dist < range && dist > 0.5) {
          const pull = (1 - dist / range) * strength;
          el.style.transform = `translate(${(dx / dist) * pull}px, ${
            (dy / dist) * pull
          }px)`;
        } else {
          el.style.transform = '';
        }
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('blur', reset);
      cancelAnimationFrame(raf);
    };
  }, [range, strength]);

  return (
    <a ref={ref} className={`magnetic ${className}`} {...props}>
      {children}
    </a>
  );
}
