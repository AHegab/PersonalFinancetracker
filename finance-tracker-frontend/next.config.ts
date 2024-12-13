import type { NextConfig } from 'next';
require("dotenv").config();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ANALYSIS_URL: (process.env.NEXT_PUBLIC_ANALYSIS_URL),
    NEXT_PUBLIC_TRANSACTIONS_URL: (process.env.NEXT_PUBLIC_TRANSACTIONS_URL),
    NEXT_PUBLIC_AUTH_URL: (process.env.NEXT_PUBLIC_AUTH_URL)
  }
};

export default nextConfig;