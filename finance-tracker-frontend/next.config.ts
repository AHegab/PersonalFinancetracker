import type { NextConfig } from 'next';
require('dotenv').config();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ANALYSIS_URL: process.env.NEXT_PUBLIC_ANALYSIS_URL,
    NEXT_PUBLIC_TRANSACTIONS_URL: process.env.NEXT_PUBLIC_TRANSACTIONS_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*', // Proxy requests to the auth service
        destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/:path*`,
      },
      {
        source: '/api/transactions/:path*', // Proxy requests to the transactions service
        destination: `${process.env.NEXT_PUBLIC_TRANSACTIONS_URL}/:path*`,
      },
      {
        source: '/api/analysis/:path*', // Proxy requests to the analysis service
        destination: `${process.env.NEXT_PUBLIC_ANALYSIS_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;