/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_AUTH_MODULE_URL,
  },
};

module.exports = nextConfig;