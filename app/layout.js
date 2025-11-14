import StoryblokProvider from '@/components/StoryblokProvider';
import { ThemeProviderWrapper } from '@/context/ThemeContext';
import { ThankYouProvider } from '@/context/ThankYouContext';
import { PageDataProvider } from '@/context/PageDataContext';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import FormTracking from '@/components/FormTracking';
import Script from 'next/script';
import './globals.css';
import Providers from '@/components/providers';
import Config from '@/components/Config';
import CriticalCSS from '@/components/CriticalCSS';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import GTMPerformanceMonitor from '@/components/GTMPerformanceMonitor';
import { getStoryblokApi } from '@/lib/storyblok';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { VWOScript } from 'vwo-smartcode-nextjs';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WMKX59W';

export const metadata = {
  metadataBase: new URL('https://vasion.com'),
  title: {
    template: '%s | Vasion',
    default: 'Vasion',
  },
  description: 'Vasion site',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `,
          }}
        />
        <meta
          name="google-site-verification"
          content="9aTxhC978Sh5yhlRXic1mj23gCh4RcexRTfgiwMKbks"
        />
        <meta
          name="facebook-domain-verification"
          content="vw5hfzh0aj764x59srftw18eksj8nq"
        />

        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://a-us.storyblok.com" />
        <link
          rel="preconnect"
          href="https://a-us.storyblok.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://a-us.storyblok.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://js.intercomcdn.com" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        <link
          rel="dns-prefetch"
          href="https://dev.visualwebsiteoptimizer.com"
        />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Archivo-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/Archivo-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/Archivo-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Preload critical CSS */}
        <link
          rel="preload"
          href="/globals.css"
          as="style"
          fetchPriority="high"
        />

        {/* Rive WASM will be loaded on-demand when animations are needed */}

        {/* Marketo Munchkin - Load after page is interactive */}
        <Script
          id="marketo-munchkin"
          strategy="afterInteractive"
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
        />

        {/* CookieYes - Load after page is interactive */}
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/c1cc367c126e833f0301eb2c/script.js"
        />

        {/* Intercom - Load with conditional loading based on user interaction */}
        <Script
          id="intercom"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      // Only load Intercom after user interaction to improve initial page performance
      let intercomLoaded = false;
      
      function loadIntercom() {
        if (intercomLoaded) return;
        intercomLoaded = true;
        
        window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: "h87qerzy"
        };
        (function(){var w=window;var ic=w.Intercom;
        if(typeof ic==="function"){
          ic('reattach_activator');
          ic('update',w.intercomSettings);
        }else{
          var d=document;var i=function(){i.c(arguments);};
          i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;
          var l=function(){
            var s=d.createElement('script');
            s.type='text/javascript';s.async=true;
            s.src='https://widget.intercom.io/widget/h87qerzy';
            var x=d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s,x);
          };
          if(document.readyState==='complete'){l();}
          else if(w.attachEvent){w.attachEvent('onload',l);}
          else{w.addEventListener('load',l,false);}
        }})();
      }
      
      // Load Intercom on first user interaction
      ['click', 'scroll', 'mousemove'].forEach(event => {
        document.addEventListener(event, loadIntercom, { once: true, passive: true });
      });
    `,
          }}
        />

        {/* GA4 handled via GTM - direct GA script removed */}

        {/* Google Ads handled via GTM - direct Ads script removed */}

        {/* VWO - Load after page is interactive */}
        <VWOScript accountId="827254" />

        {/* Hotjar - Load only after user interaction to improve initial performance */}
        <Script
          id="hotjar"
          strategy="lazyOnload"
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
