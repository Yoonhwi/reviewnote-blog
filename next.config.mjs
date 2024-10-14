/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.SUPABASE_DOMAIN],
  },
};

export default nextConfig;
