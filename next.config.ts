import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://media.base44.com/**"),
      // Project listing imagery, served from the source so it matches exactly.
      new URL("https://files.alnair.ae/**"),
    ],
  },
};

export default nextConfig;
