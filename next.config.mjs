/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["three"],
  transpilePackages: ["three"]
};

export default nextConfig;
