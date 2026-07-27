import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next guess the wrong workspace root,
  // which throws off file tracing. Pin it to this project.
  turbopack: { root: path.resolve(__dirname) },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cloudflare.steamstatic.com",
        pathname: "/apps/dota2/images/**",
      },
    ],
  },
};

export default nextConfig;
