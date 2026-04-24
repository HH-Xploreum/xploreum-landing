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
};

export default nextConfig;
