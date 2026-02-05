import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid Next.js inferring the wrong workspace root if other lockfiles exist.
    root: __dirname,
  },
};

export default nextConfig;
