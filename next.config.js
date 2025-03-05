/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
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
            value: "ALLOWALL", // ✅ Allows embedding your site in an iframe (Storyblok Visual Editor)
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com;", // ✅ Allows Storyblok to embed your site
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
