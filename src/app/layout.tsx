import type { Metadata } from 'next';
import { Urbanist, Caveat } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Xploreum — Your AI travel agent',
  description:
    'The trip that takes 16 hours to plan. Built in one conversation. Ask X what you\'re chasing and it builds the whole trip — flights, lodging, gear, and the local experts who make it happen.',
  metadataBase: new URL('https://xploreum.io'),
  icons: {
    icon: [
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
  },
  openGraph: {
    title: 'Xploreum — Your AI travel agent',
    description: 'The trip that takes 16 hours to plan. Built in one conversation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${caveat.variable}`}>
      <body className="font-sans bg-bone text-forest antialiased">{children}</body>
    </html>
  );
}
