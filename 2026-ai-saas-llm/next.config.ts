import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Manually sets the root to the current directory
    root: __dirname,
  },
};

export default nextConfig;
