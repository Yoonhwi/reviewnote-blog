/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.SUPABASE_DOMAIN,
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
