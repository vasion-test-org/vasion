/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // env: {
  //   STORYBLOK_ACCESS_TOKEN: process.env.NEXT_PUBLIC_STORYBLOK_API_KEY,
  // },
  reactStrictMode: true, // ✅ Enables strict mode for debugging
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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // ✅ Allows embedding your site in an iframe
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com https://editor.storyblok.com https://m.storyblok.com;", // ✅ Ensures all Storyblok domains can embed your site
          },
        ],
      },
      {
        source: "/api/draft",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
