/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    auth_Url:process.env.NEXT_PUBLIC_Auth_URL,
    base_Url: process.env.NEXT_PUBLIC_BASE_URL,
  },
}

module.exports = nextConfig
