/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true, // ✅ Enables strict mode for debugging
  // experimental: {
  //   reactRoot: true, // ✅ Enables concurrent React
  // },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevents build failures due to ESLint warnings
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // ✅ Fixes server-side module issues in Webpack 5

    // ✅ Add SVGR support for SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true, // Allows auto-scaling for icons
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
