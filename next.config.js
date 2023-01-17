/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    auth_Url: process.env.NEXT_PUBLIC_Auth_URL,
    base_Url: process.env.NEXT_PUBLIC_BASE_URL,
    PAYU_URL: process.env.PAYU_URL,
    Academic_Url: process.env.NEXT_PUBLIC_ACADEMIC_BASE_URL,
  },
};

module.exports = nextConfig;
