import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/how-we-think',
        destination: '/what-we-do',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
