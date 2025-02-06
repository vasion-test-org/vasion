/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true, // ✅ Enables strict mode for debugging
  experimental: {
    reactRoot: true, // ✅ Enables concurrent React
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevents build failures due to ESLint warnings
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // ✅ Fixes server-side module issues in Webpack 5
    return config;
  },
};

module.exports = nextConfig;
