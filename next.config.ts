import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/login', 
        destination: '/api/auth/signin',
      },
    ];
  },
};

export default nextConfig;
