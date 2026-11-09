/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {outputFileTracingIncludes: {'/globe-assets/*': ['./public/earth-surface.jpg','./public/world-land.geojson']}}
};

export default nextConfig;
