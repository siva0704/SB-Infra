import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/SB-Infra' : '', // Only apply basePath for production build (GitHub Pages)
};

export default nextConfig;
