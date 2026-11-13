/** @type {import('next').NextConfig} */
export default async function nextConfig(phase) {
  // 直接执行 next build 或 next dev 时，也必须生成并校验地球资源。
  if (phase === 'phase-production-build' || phase === 'phase-development-server') {
    await import('./scripts/build-globe-assets.mjs');
    await import('./scripts/verify-globe-assets.mjs');
  }
  return {reactStrictMode: true};
}
