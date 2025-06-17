/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
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
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  "prefixIds",
                  {
                    name: "preset-default",
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
        source:
          "/blog/news-release-lamar-cisd-eliminates-print-servers-across-school-district-with-printerlogic/",
        destination: "/print/",
        permanent: true,
      },
      {
        source: "/coming-soon/",
        destination: "/automate/",
        permanent: true,
      },
      {
        source: "/assets/how-to-convince-your-boss-you-need-printerlogic/",
        destination: "/assets/how-to-convince-your-boss-you-need-vasion-print/",
        permanent: true,
      },
      {
        source: "/product-detail-e-forms/",
        destination: "/eforms/",
        permanent: true,
      },
      {
        source: "/blog/all/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/product-detail-content/",
        destination: "/automate/content-management/",
        permanent: true,
      },
      {
        source: "/workflow/",
        destination: "/automate/workflow/",
        permanent: true,
      },
      {
        source: "/product-detail-capture/",
        destination: "/automate/capture/",
        permanent: true,
      },
      {
        source: "/whitepaper-success/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/4-questions-about-digital-transformation-platform/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/benefits-of-cloud-based-content-management/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/common-challenges-in-digital-transformation/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/first-steps-toward-paperless-content-management/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/four-reasons-to-use-online-forms-automation/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/how-automating-hr-document-management-can-save-time-/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source:
          "/blog/how-going-paperless-will-improve-your-use-of-information/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/hr-document-management-system-automate-to-save-time/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source:
          "/blog/manage-document-workflow-software-to-boost-productivity/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/online-forms-automation-and-growing-your-business/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source:
          "/blog/revolutionize-your-customer-service-with-document-management/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/saving-lives-with-document-management-in-healthcare/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/secure-document-control-solutions-for-business/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source:
          "/blog/the-benefits-of-moving-to-a-content-management-system-for-productivity/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/the-top-four-factors-in-a-cloud-content-service/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/the-top-four-factors-in-a-cloud-content-service-2/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source:
          "/blog/why-online-document-management-must-replace-traditional-systems/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source:
          "/blog/printerlogic-acquires-maxxvault-rebrands-solution-as-vasion/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/storage/",
        destination: "/automate/content-management/",
        permanent: true,
      },
      {
        source: "/content/",
        destination: "/automate/content-management/",
        permanent: true,
      },
      {
        source: "/capture/",
        destination: "/automate/capture/",
        permanent: true,
      },
      {
        source: "/platform/",
        destination: "/vasion-overview/",
        permanent: true,
      },
      {
        source: "/why/",
        destination: "/vasion-overview/",
        permanent: true,
      },
      {
        source: "/vasion-partner-connect-2023/",
        destination: "/vasion-partner-connect/",
        permanent: true,
      },
      {
        source: "/manufactoring/",
        destination: "/industries/manufacturing/",
        permanent: true,
      },
      {
        source: "/wifi/",
        destination: "https://www.vasion.com",
        permanent: true,
      },
      {
        source: "/heathcare-vasion-suite/",
        destination: "/healthcare-vasion-suite/",
        permanent: true,
      },
      {
        source: "/healthcare/",
        destination: "/industries/healthcare/",
        permanent: true,
      },
      {
        source: "/higher-education/",
        destination: "industries/higher-education/",
        permanent: true,
      },
      {
        source: "/signature/",
        destination: "/automate/signature/",
        permanent: true,
      },
      {
        source: "/slg-integration/",
        destination: "/industries/government/",
        permanent: true,
      },
      {
        source: "/aws-s3/",
        destination: "/integrations/aws-s3/",
        permanent: true,
      },
      {
        source: "/aws-textract/",
        destination: "/integrations/aws-textract/",
        permanent: true,
      },
      {
        source: "/resources/digital-transformation-in-a-pandemic/",
        destination: "/resources/john-boner-neighborhood-centers/",
        permanent: true,
      },
      {
        source: "/resources/all/",
        destination: "/resources/",
        permanent: true,
      },
      {
        source: "/experience-the-vasion-platform/",
        destination: "/resources/experience-the-vasion-platform/",
        permanent: true,
      },
      {
        source: "/vasion-master-software-agreement/",
        destination:
          "https://info.printerlogic.com/rs/338-HTA-134/images/Master_Software_Agreement_MSA_EN.pdf?version=3",
        permanent: true,
      },
      {
        source: "/cookies/",
        destination: "/cookie-information/",
        permanent: true,
      },
      {
        source: "/global-sla/",
        destination:
          "https://info.printerlogic.com/rs/338-HTA-134/images/Service_Level_Agreement_SLA_EN.pdf?version=0",
        permanent: true,
      },
      {
        source: "/software-support-service-level-terms-and-conditions/",
        destination:
          "https://info.printerlogic.com/rs/338-HTA-134/images/Service_Level_Agreement_SLA_EN.pdf?version=0",
        permanent: true,
      },
      {
        source: "/pga/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/vasion-automate-pro-faq/",
        destination: "/resources/vasion-automate-pro-faq/",
        permanent: true,
      },
      {
        source: "/launches/",
        destination: "/whats-new/",
        permanent: true,
      },
      {
        source: "/fall-launch-2024/",
        destination: "/launches/fall-launch-2024/",
        permanent: true,
      },
      {
        source: "/support-request/",
        destination: "https://va.vasion.com/Vasion/formName/1125",
        permanent: true,
      },
      {
        source: "/partners/",
        destination: "/sales-partners/",
        permanent: true,
      },
      {
        source: "/event/channel-partners-spring-2024/",
        destination: "/partner-overview/",
        permanent: true,
      },
      {
        source: "/company/",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/advanced-security-bundle/",
        destination: "/advanced-security/",
        permanent: true,
      },
      {
        source: "/vasion-homepage-2025/",
        destination: "https//vasion.com/",
        permanent: true,
      },
      {
        source: "/eco-friendly-print-management/",
        destination: "https://vasion.com/print/eco-friendly-print-management/",
        permanent: true,
      },
      {
        source: "/v3-2025/",
        destination: "/v3/",
        permanent: true,
      },
      {
        source: "/executive-breifing-thank-you/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/partners-coming-soon/",
        destination: "/partner-overview/",
        permanent: true,
      },
      {
        source: "/cko2024/",
        destination: "/v3/",
        permanent: true,
      },
      {
        source: "/eliminate-printers/",
        destination: "/print/",
        permanent: true,
      },
      {
        source: "/testing/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cisco/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/government-automation-for-citizens/",
        destination: "/industries/government/",
        permanent: true,
      },
      {
        source: "/government-automation-for-efficiency/",
        destination: "/industries/government/",
        permanent: true,
      },
      {
        source: "/financial-document-management/",
        destination: "/industries/financial-services/",
        permanent: true,
      },
      {
        source: "/manufacturing/",
        destination: "/industries/manufacturing/",
        permanent: true,
      },
      {
        source: "/financial-services/",
        destination: "/industries/financial-services/",
        permanent: true,
      },
      {
        source: "/va-partner-overview/",
        destination: "/partner-overview/",
        permanent: true,
      },
      {
        source: "/government/",
        destination: "/industries/government/",
        permanent: true,
      },
      {
        source: "/home/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/launches/eliminate-print-servers/",
        destination: "/whats-new/",
        permanent: true,
      },
      {
        source: "/event/msp-free-tee/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/event/free-tee/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      // {
      //   source: "/event/tradeshow-demo-emea/",
      //   destination: "/connect-with-vasion/",
      //   permanent: true,
      // },
      {
        source: "/event/testing-thank-you/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/event/2024-partners-connect/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      // {
      //   source: "/event/tradeshow-demo/",
      //   destination: "/connect-with-vasion/",
      //   permanent: true,
      // },
      {
        source: "/event/texas-erecord-conference/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/tech-check-up-ep4/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/tech-check-up-ep3/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/tech-check-up-ep1/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/aws-howdy-partner-healthcare/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/aws-howdy-partner-public-sector/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/automate-reseller-overview/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/automate-partner-overview/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/webinar/automate-overview/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/register/on-the-road-los-angeles/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/register/on-the-road-las-vegas/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/register/on-the-road-dc/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/register/pga-tour/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/register/on-the-road-chicago/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/register/on-the-road-fort-worth/",
        destination: "/connect-with-vasion/",
        permanent: true,
      },
      {
        source: "/channel-daze-giveaway/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/event-thank-you-subscribed/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/event-thank-you/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/gomo-thank-you/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/output-optimizer-demo/",
        destination: "/demo/",
        permanent: true,
      },
      {
        source: "/program-thank-you/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/sys-admin-thank-you/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/thank-you-resource/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/thank-you-webinar/",
        destination: "/thank-you/",
        permanent: true,
      },
      {
        source: "/yubikey/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/de/home/",
        destination: "/de",
        permanent: true,
      },
      {
        source: "/fr/home/",
        destination: "/fr",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "de.vasion.com",
          },
        ],
        destination: "https://vasion.com/de/:path*",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "fr.vasion.com",
          },
        ],
        destination: "https://vasion.com/fr/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "de.vasion.com",
          },
        ],
        destination: "/de/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "fr.vasion.com",
          },
        ],
        destination: "/fr/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://app.storyblok.com https://editor.storyblok.com https://m.storyblok.com;",
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
