import Script from 'next/script';

import { Analytics } from '@vercel/analytics/next';
import { VWOScript } from 'vwo-smartcode-nextjs';

import Config from '@/components/Config';
import ConversicaChat from '@/components/ConversicaChat';
import CriticalCSS from '@/components/CriticalCSS';
import FormTracking from '@/components/FormTracking';

import './globals.css';
import GTMPerformanceMonitor from '@/components/GTMPerformanceMonitor';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import Providers from '@/components/providers';
import StoryblokProvider from '@/components/StoryblokProvider';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { PageDataProvider } from '@/context/PageDataContext';
import { ThankYouProvider } from '@/context/ThankYouContext';
import { ThemeProviderWrapper } from '@/context/ThemeContext';
import { getStoryblokApi } from '@/lib/storyblok';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WMKX59W';

export const metadata = {
  description: 'Vasion site',
  metadataBase: new URL('https://vasion.com'),
  title: {
    default: 'Vasion',
    template: '%s | Vasion',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `,
          }}
          id="gtm"
          strategy="afterInteractive"
        />
        <meta
          content="9aTxhC978Sh5yhlRXic1mj23gCh4RcexRTfgiwMKbks"
          name="google-site-verification"
        />
        <meta content="vw5hfzh0aj764x59srftw18eksj8nq" name="facebook-domain-verification" />

        {/* Resource hints for performance optimization */}
        <link href="https://a-us.storyblok.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://a-us.storyblok.com" rel="preconnect" />
        <link href="https://a-us.storyblok.com" rel="dns-prefetch" />
        <link href="https://www.googletagmanager.com" rel="preconnect" />
        <link href="https://www.google.com" rel="preconnect" />
        <link href="https://unpkg.com" rel="preconnect" />
        <link href="https://chat.conversica.com" rel="dns-prefetch" />
        <link href="https://static.hotjar.com" rel="dns-prefetch" />
        <link href="https://dev.visualwebsiteoptimizer.com" rel="dns-prefetch" />
        <link href="https://www.gstatic.com" rel="dns-prefetch" />
        <link href="https://www.google-analytics.com" rel="dns-prefetch" />

        {/* Preload critical fonts */}
        <link
          as="font"
          crossOrigin="anonymous"
          fetchPriority="high"
          href="/fonts/Archivo-Regular.woff2"
          rel="preload"
          type="font/woff2"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          fetchPriority="high"
          href="/fonts/Archivo-Bold.woff2"
          rel="preload"
          type="font/woff2"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          fetchPriority="high"
          href="/fonts/Archivo-SemiBold.woff2"
          rel="preload"
          type="font/woff2"
        />

        {/* Preload critical CSS */}
        <link as="style" fetchPriority="high" href="/globals.css" rel="preload" />

        {/* Rive WASM will be loaded on-demand when animations are needed */}

        {/* Marketo Munchkin - Load after page is interactive */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        var didInit = false;
        function initMunchkin() {
          if(didInit === false) {
            didInit = true;
            Munchkin.init('338-HTA-134');
          }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function() {
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            initMunchkin();
          }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
      })();
    `,
          }}
          id="marketo-munchkin"
          strategy="afterInteractive"
        />

        {/* CookieYes - Load after page is interactive */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/c1cc367c126e833f0301eb2c/script.js"
          strategy="afterInteractive"
        />

        {/* GA4 handled via GTM - direct GA script removed */}

        {/* Google Ads handled via GTM - direct Ads script removed */}

        {/* VWO - Load after page is interactive */}
        <VWOScript accountId="827254" />

        {/* Hotjar - Load only after user interaction to improve initial performance */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
        // Only load Hotjar after user interaction to improve initial page performance
        let hotjarLoaded = false;
        
        function loadHotjar() {
          if (hotjarLoaded) return;
          hotjarLoaded = true;
          
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2119079,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        }
        
        // Load Hotjar on first user interaction
        ['click', 'scroll', 'mousemove'].forEach(event => {
          document.addEventListener(event, loadHotjar, { once: true, passive: true });
        });
      `,
          }}
          id="hotjar"
          strategy="lazyOnload"
        />
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <ThemeProviderWrapper>
          <StoryblokProvider>
            <StyledComponentsRegistry>
              <Providers>
                <ThankYouProvider>
                  <PageDataProvider>
                    <FormTracking />
                    <CriticalCSS />
                    <PerformanceMonitor />
                    <GTMPerformanceMonitor />
                    <Config>
                      {children}
                      <Analytics />
                      <ConversicaChat />
                    </Config>
                  </PageDataProvider>
                </ThankYouProvider>
              </Providers>
            </StyledComponentsRegistry>
          </StoryblokProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
