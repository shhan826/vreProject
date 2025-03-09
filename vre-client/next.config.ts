import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vre-image-resource.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
