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
      // '@sentry/nextjs', // Commented out to disable Sentry during build
      'react-player',
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

  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { isServer, dev }) => {
  //   if (!isServer && !dev) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     );
  //   }
  //   return config;
  // },
  webpack: (config, { isServer, dev }) => {
    // Optimize WebAssembly loading for Rive
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
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
            // Next.js framework
            nextjs: {
              test: /[\\/]node_modules[\\/]next[\\/]/,
              name: 'nextjs',
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            // GSAP - separate chunk for animations
            gsap: {
              test: /[\\/]node_modules[\\/](gsap|@gsap)[\\/]/,
              name: 'gsap',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Rive - separate chunk for animations
            rive: {
              test: /[\\/]node_modules[\\/]@rive-app[\\/]/,
              name: 'rive',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Storyblok CMS
            storyblok: {
              test: /[\\/]node_modules[\\/]@storyblok[\\/]/,
              name: 'storyblok',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Styled Components
            styled: {
              test: /[\\/]node_modules[\\/]styled-components[\\/]/,
              name: 'styled-components',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Sentry monitoring
            sentry: {
              test: /[\\/]node_modules[\\/]@sentry[\\/]/,
              name: 'sentry',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // React Player
            reactPlayer: {
              test: /[\\/]node_modules[\\/]react-player[\\/]/,
              name: 'react-player',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Utility libraries
            utils: {
              test: /[\\/]node_modules[\\/](axios|clone-deep)[\\/]/,
              name: 'utils',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // VWO
            vwo: {
              test: /[\\/]node_modules[\\/]vwo-smartcode-nextjs[\\/]/,
              name: 'vwo',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Web Vitals
            webVitals: {
              test: /[\\/]node_modules[\\/]web-vitals[\\/]/,
              name: 'web-vitals',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Remaining vendor libraries - split into smaller chunks
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              minChunks: 1,
              maxSize: 100000, // Smaller vendor chunks
            },
            // Default chunk optimization
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: { and: [/\.[jt]sx?$/] },
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  'prefixIds',
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  async redirects() {
    return [
      {
        source: '/cpa/',
        destination: '/print/printer-apps/',
        permanent: true,
      },
      {
        source: '/content-management/',
        destination: '/automate/content-management/',
        permanent: true,
      },
      {
        source:
          '/blog/news-release-lamar-cisd-eliminates-print-servers-across-school-district-with-printerlogic/',
        destination: '/print/',
        permanent: true,
      },
      {
        source: '/coming-soon/',
        destination: '/automate/',
        permanent: true,
      },
      {
        source: '/assets/how-to-convince-your-boss-you-need-printerlogic/',
        destination: '/assets/how-to-convince-your-boss-you-need-vasion-print/',
        permanent: true,
      },
      {
        source: '/product-detail-e-forms/',
        destination: '/eforms/',
        permanent: true,
      },
      {
        source: '/blog/all/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/product-detail-content/',
        destination: '/automate/content-management/',
        permanent: true,
      },
      {
        source: '/workflow/',
        destination: '/automate/workflow/',
        permanent: true,
      },
      {
        source: '/product-detail-capture/',
        destination: '/automate/capture/',
        permanent: true,
      },
      {
        source: '/whitepaper-success/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/4-questions-about-digital-transformation-platform/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/benefits-of-cloud-based-content-management/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/common-challenges-in-digital-transformation/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/first-steps-toward-paperless-content-management/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/four-reasons-to-use-online-forms-automation/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/how-automating-hr-document-management-can-save-time-/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source:
          '/blog/how-going-paperless-will-improve-your-use-of-information/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/hr-document-management-system-automate-to-save-time/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source:
          '/blog/manage-document-workflow-software-to-boost-productivity/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/online-forms-automation-and-growing-your-business/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source:
          '/blog/revolutionize-your-customer-service-with-document-management/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/saving-lives-with-document-management-in-healthcare/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/secure-document-control-solutions-for-business/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source:
          '/blog/the-benefits-of-moving-to-a-content-management-system-for-productivity/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/the-top-four-factors-in-a-cloud-content-service/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/the-top-four-factors-in-a-cloud-content-service-2/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source:
          '/blog/why-online-document-management-must-replace-traditional-systems/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source:
          '/blog/printerlogic-acquires-maxxvault-rebrands-solution-as-vasion/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/storage/',
        destination: '/automate/content-management/',
        permanent: true,
      },
      {
        source: '/content/',
        destination: '/automate/content-management/',
        permanent: true,
      },
      {
        source: '/capture/',
        destination: '/automate/capture/',
        permanent: true,
      },
      {
        source: '/platform/',
        destination: '/vasion-overview/',
        permanent: true,
      },
      {
        source: '/why/',
        destination: '/vasion-overview/',
        permanent: true,
      },
      {
        source: '/vasion-partner-connect-2023/',
        destination: '/vasion-partner-connect/',
        permanent: true,
      },
      {
        source: '/manufactoring/',
        destination: '/industries/manufacturing/',
        permanent: true,
      },
      {
        source: '/wifi/',
        destination: 'https://www.vasion.com',
        permanent: true,
      },
      {
        source: '/heathcare-vasion-suite/',
        destination: '/healthcare-vasion-suite/',
        permanent: true,
      },
      {
        source: '/healthcare/',
        destination: '/industries/healthcare/',
        permanent: true,
      },
      {
        source: '/higher-education/',
        destination: 'industries/higher-education/',
        permanent: true,
      },
      {
        source: '/signature/',
        destination: '/automate/signature/',
        permanent: true,
      },
      {
        source: '/slg-integration/',
        destination: '/industries/government/',
        permanent: true,
      },
      {
        source: '/aws-s3/',
        destination: '/integrations/aws-s3/',
        permanent: true,
      },
      {
        source: '/aws-textract/',
        destination: '/integrations/aws-textract/',
        permanent: true,
      },
      {
        source: '/resources/digital-transformation-in-a-pandemic/',
        destination: '/resources/john-boner-neighborhood-centers/',
        permanent: true,
      },
      {
        source: '/resources/all/',
        destination: '/resources/',
        permanent: true,
      },
      {
        source: '/experience-the-vasion-platform/',
        destination: '/resources/experience-the-vasion-platform/',
        permanent: true,
      },
      {
        source: '/vasion-master-software-agreement/',
        destination:
          'https://info.printerlogic.com/rs/338-HTA-134/images/Master_Software_Agreement_MSA_EN.pdf?version=3',
        permanent: true,
      },
      {
        source: '/cookies/',
        destination: '/cookie-information/',
        permanent: true,
      },
      {
        source: '/global-sla/',
        destination:
          'https://info.printerlogic.com/rs/338-HTA-134/images/Service_Level_Agreement_SLA_EN.pdf?version=0',
        permanent: true,
      },
      {
        source: '/software-support-service-level-terms-and-conditions/',
        destination:
          'https://info.printerlogic.com/rs/338-HTA-134/images/Service_Level_Agreement_SLA_EN.pdf?version=0',
        permanent: true,
      },
      {
        source: '/pga/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/vasion-automate-pro-faq/',
        destination: '/resources/vasion-automate-pro-faq/',
        permanent: true,
      },
      {
        source: '/launches/',
        destination: '/whats-new/',
        permanent: true,
      },
      {
        source: '/fall-launch-2024/',
        destination: '/launches/fall-launch-2024/',
        permanent: true,
      },
      {
        source: '/support-request/',
        destination: 'https://va.vasion.com/Vasion/formName/1125',
        permanent: true,
      },
      {
        source: '/partners/',
        destination: '/sales-partners/',
        permanent: true,
      },
      {
        source: '/event/channel-partners-spring-2024/',
        destination: '/partner-overview/',
        permanent: true,
      },
      {
        source: '/company/',
        destination: '/about-us/',
        permanent: true,
      },
      {
        source: '/advanced-security-bundle/',
        destination: '/advanced-security/',
        permanent: true,
      },
      {
        source: '/vasion-homepage-2025/',
        destination: 'https//vasion.com/',
        permanent: true,
      },
      {
        source: '/eco-friendly-print-management/',
        destination: 'https://vasion.com/print/eco-friendly-print-management/',
        permanent: true,
      },
      {
        source: '/v3-2025/',
        destination: '/v3/',
        permanent: true,
      },
      {
        source: '/executive-breifing-thank-you/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/partners-coming-soon/',
        destination: '/partner-overview/',
        permanent: true,
      },
      {
        source: '/cko2024/',
        destination: '/v3/',
        permanent: true,
      },
      {
        source: '/eliminate-printers/',
        destination: '/print/',
        permanent: true,
      },
      {
        source: '/testing/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cisco/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/government-automation-for-citizens/',
        destination: '/industries/government/',
        permanent: true,
      },
      {
        source: '/government-automation-for-efficiency/',
        destination: '/industries/government/',
        permanent: true,
      },
      {
        source: '/financial-document-management/',
        destination: '/industries/financial-services/',
        permanent: true,
      },
      {
        source: '/manufacturing/',
        destination: '/industries/manufacturing/',
        permanent: true,
      },
      {
        source: '/financial-services/',
        destination: '/industries/financial-services/',
        permanent: true,
      },
      {
        source: '/va-partner-overview/',
        destination: '/partner-overview/',
        permanent: true,
      },
      {
        source: '/government/',
        destination: '/industries/government/',
        permanent: true,
      },
      // {
      //   source: '/home/',
      //   destination: '/',
      //   permanent: true,
      // },
      {
        source: '/launches/eliminate-print-servers/',
        destination: '/whats-new/',
        permanent: true,
      },
      {
        source: '/event/msp-free-tee/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/event/free-tee/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      // {
      //   source: "/event/tradeshow-demo-emea/",
      //   destination: "/connect-with-vasion/",
      //   permanent: true,
      // },
      {
        source: '/event/testing-thank-you/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/event/2024-partners-connect/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      // {
      //   source: "/event/tradeshow-demo/",
      //   destination: "/connect-with-vasion/",
      //   permanent: true,
      // },
      {
        source: '/event/texas-erecord-conference/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/tech-check-up-ep4/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/tech-check-up-ep3/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/tech-check-up-ep1/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/aws-howdy-partner-healthcare/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/aws-howdy-partner-public-sector/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/automate-reseller-overview/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/automate-partner-overview/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/webinar/automate-overview/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/register/on-the-road-los-angeles/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/register/on-the-road-las-vegas/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/register/on-the-road-dc/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/register/pga-tour/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/register/on-the-road-chicago/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/register/on-the-road-fort-worth/',
        destination: '/connect-with-vasion/',
        permanent: true,
      },
      {
        source: '/channel-daze-giveaway/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/event-thank-you-subscribed/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/event-thank-you/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/gomo-thank-you/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/output-optimizer-demo/',
        destination: '/demo/',
        permanent: true,
      },
      {
        source: '/program-thank-you/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/sys-admin-thank-you/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/thank-you-resource/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/thank-you-webinar/',
        destination: '/thank-you/',
        permanent: true,
      },
      {
        source: '/yubikey/',
        destination: '/',
        permanent: true,
      },
      // {
      //   source: '/home',
      //   destination: '/',
      //   permanent: true,
      // },
      // {
      //   source: '/de/home/',
      //   destination: '/de',
      //   permanent: true,
      // },
      // {
      //   source: '/fr/home/',
      //   destination: '/fr',
      //   permanent: true,
      // },
      {
        source: '/spring-launch-2025/',
        destination: '/launches/spring-launch-2025/',
        permanent: true,
      },
      {
        source: '/go/superman/t&c/',
        destination: '/go/superman/t-c/',
        permanent: true,
      },

      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'de.vasion.com',
          },
        ],
        destination: 'https://vasion.com/de/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fr.vasion.com',
          },
        ],
        destination: 'https://vasion.com/fr/:path*',
        permanent: false,
      },
      {
        source: '/resources/experience-the-printerlogic-platform/',
        destination: '/resources/experience-vasion-print/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'de.vasion.com',
          },
        ],
        destination: '/de/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fr.vasion.com',
          },
        ],
        destination: '/fr/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fr.vasion.com',
          },
        ],
        destination: '/fr/:path*',
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://app.storyblok.com https://editor.storyblok.com https://m.storyblok.com https://app.zoominfo.com;",
          },
        ],
      },
      {
        source: '/api/draft',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
      // Aggressive caching for static assets
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'vasion-hl',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
