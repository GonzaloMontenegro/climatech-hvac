import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/e-commerce",
        destination: "/",
        permanent: true,
      },
      {
        source: "/e-commerce/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
