/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  trailingSlash: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization configuration
  images: {
    domains: [
      'a-us.storyblok.com',
      'a.storyblok.com',
      's3.amazonaws.com',
      'img2.storyblok.com',
      'img.storyblok.com',
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Optimize bundle size
  output: 'standalone',
  experimental: {
    optimizePackageImports: [
      'styled-components',
      '@storyblok/react',
      '@storyblok/richtext',
      // Removed 'react-player' from optimizePackageImports for v3 compatibility
      'axios',
      'clone-deep',
    ],
    optimizeCss: {
      inlineFonts: true,
    },
    scrollRestoration: true,
    // Enable modern bundling optimizations
    esmExternals: true,
    // Enable React 19 concurrent features for better scheduler performance
    reactCompiler: true,
  },

  webpack: (config, { isServer, dev }) => {
    // Optimize WebAssembly loading for Rive
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      };
    }

    // React Player v3 specific fixes
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Ultra-aggressive chunk optimization for better TBT
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 150000, // ~150KB max per chunk
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            // React and core libraries - highest priority
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // React Player - separate chunk for better loading
            reactPlayer: {
              test: /[\\/]node_modules[\\/]react-player[\\/]/,
              name: 'react-player',
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            // GSAP - separate chunk
            gsap: {
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: 'gsap',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Storyblok - separate chunk
            storyblok: {
              test: /[\\/]node_modules[\\/]@storyblok[\\/]/,
              name: 'storyblok',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Styled Components - separate chunk
            styledComponents: {
              test: /[\\/]node_modules[\\/]styled-components[\\/]/,
              name: 'styled-components',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // Default vendor chunk
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }

    return config;
  },

  // ... rest of your existing config
};

module.exports = withBundleAnalyzer(nextConfig);
