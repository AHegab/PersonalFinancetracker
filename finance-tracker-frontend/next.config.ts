/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in production
  webpack(config: any, { dev }: { dev: boolean }) {
      if (dev) {
          config.devtool = false; // Disable source maps in development
      }
      return config;
  },
};

module.exports = nextConfig;
