import type { Metadata } from 'next';
import { Urbanist, Cormorant } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Xploreum — Meet Xavier, your AI agent companion',
  description:
    'The trip that takes 16 hours to plan. Built in one conversation. Ask Xavier — your AI agent companion — what you\'re chasing and he builds the whole trip: flights, lodging, gear, and the local Xperts who make it happen.',
  metadataBase: new URL('https://xploreum.io'),
  icons: {
    icon: [
      { url: '/Favicon%20green.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/Favicon%20white.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  openGraph: {
    title: 'Xploreum — Meet Xavier, your AI agent companion',
    description: 'The trip that takes 16 hours to plan. Built in one conversation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-bone text-forest antialiased">{children}</body>
    </html>
  );
}
