import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'auth.xploreum.io',
        pathname: '/storage/v1/object/public/landing-assets/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  async redirects() {
    const goHost = [{ type: 'host' as const, value: 'go.xploreum.io' }];
    return [
      // Path-preserving legal docs from go.xploreum.io → /legal/<slug>
      {
        source: '/platform/xplorer-terms-and-conditions',
        has: goHost,
        destination: 'https://xploreum.io/legal/terms',
        permanent: true,
      },
      {
        source: '/platform/thrillmaster-terms-and-conditions',
        has: goHost,
        destination: 'https://xploreum.io/legal/thrillmaster-terms',
        permanent: true,
      },
      {
        source: '/platform/privacy-policy',
        has: goHost,
        destination: 'https://xploreum.io/legal/privacy',
        permanent: true,
      },
      {
        source: '/platform/acceptable-use-policy',
        has: goHost,
        destination: 'https://xploreum.io/legal/acceptable-use',
        permanent: true,
      },
      {
        source: '/platform/payment-terms',
        has: goHost,
        destination: 'https://xploreum.io/legal/payment-terms',
        permanent: true,
      },
      {
        source: '/platform/content-and-licensing',
        has: goHost,
        destination: 'https://xploreum.io/legal/content-licensing',
        permanent: true,
      },
      {
        source: '/platform/code-of-conduct',
        has: goHost,
        destination: 'https://xploreum.io/legal/code-of-conduct',
        permanent: true,
      },
      {
        source: '/platform/safety-guidelines',
        has: goHost,
        destination: 'https://xploreum.io/legal/safety-guidelines',
        permanent: true,
      },
      // Non-legal go.xploreum.io paths → homepage
      {
        source: '/platform/data-deletion',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/platform/help-center',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/content-exchange',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/thrillmasters',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/sign-up-forms/sign-up-2',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/sign-up-forms/apply',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/start-your-journey/xplorers',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/contact/contact-xploreum',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/white-paper',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      {
        source: '/about-xploreum',
        has: goHost,
        destination: 'https://xploreum.io/#about',
        permanent: true,
      },
      {
        source: '/blog-variations/blog',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
      // Wildcard catch-all — must remain last
      {
        source: '/:path*',
        has: goHost,
        destination: 'https://xploreum.io/',
        permanent: true,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
