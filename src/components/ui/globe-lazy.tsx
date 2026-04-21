'use client';

import dynamic from 'next/dynamic';
import type { GlobeStyle } from './globe';

const GlobeCanvasDyn = dynamic(
  () => import('./globe').then((m) => m.GlobeCanvas),
  {
    ssr: false,
    loading: () => null,
  },
);

export function GlobeLazy(props: {
  style?: GlobeStyle;
  interactive?: boolean;
}) {
  return <GlobeCanvasDyn {...props} />;
}
