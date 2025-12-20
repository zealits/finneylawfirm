import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images from the public directory
    remotePatterns: [],
    // Disable image optimization for local files if needed (uncomment if issues persist)
    // unoptimized: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
