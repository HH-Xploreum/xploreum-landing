'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { trackCta } from '@/lib/track';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  cta: string;
  location: string;
  children: ReactNode;
};

export function TrackedLink({ cta, location, onClick, children, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackCta({ cta, location });
    onClick?.(e);
  };
  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
