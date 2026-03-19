import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.noroff.dev", pathname: "/**" },
      // add the exact API image host if different
    ],
  },
};

export default nextConfig;
