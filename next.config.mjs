/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.SUPABASE_DOMAIN],
  },
};

export default nextConfig;
