import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits in the parent directory, outside this repo.
  // Pin the workspace root so Turbopack doesn't try to adopt it.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
