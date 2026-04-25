'use client';

import posthog from 'posthog-js';

type CtaProps = {
  cta: string;
  location: string;
} & Record<string, string | number | boolean | undefined>;

export function trackCta(props: CtaProps) {
  if (typeof window === 'undefined') return;
  posthog.capture('cta_click', props);
}
