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

        {/* Optimized Google Tag Manager */}
        <Script
          id="gtm-optimized"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
        // Optimized GTM loading with performance improvements
        (function() {
          if (window.gtmLoaded) return;
          
          // Initialize dataLayer early to prevent blocking
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
          
          // Create optimized GTM script
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WMKX59W';
          script.crossOrigin = 'anonymous';
          script.setAttribute('data-gtm-optimized', 'true');
          
          // Insert in head for better performance
          document.head.appendChild(script);
          window.gtmLoaded = true;
        })();
      `,
          }}
        />

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

        {/* Optimized Google Analytics - Load after page is interactive */}
        <Script
          id="ga-optimized"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        // Optimized Google Analytics loading
        (function() {
          if (window.gtagLoaded) return;
          
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=G-407WZSYMN0';
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
          
          window.gtagLoaded = true;
        })();
      `,
          }}
        />

        {/* Optimized Google Ads - Load only on conversion pages or after user interaction */}
        <Script
          id="google-ads-optimized"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
        // Optimized Google Ads loading - single script with multiple configs
        (function() {
          if (window.googleAdsLoaded) return;
          
          const primaryAdsId = 'AW-977173538';
          const additionalAdsIds = ['AW-11184646465', 'AW-11184713828'];
          
          const loadAdsScripts = () => {
            if (window.googleAdsLoaded) return;
            window.googleAdsLoaded = true;
            
            // Load gtag.js once with primary ID
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + primaryAdsId + '&cx=c&gtm=4e5981';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
            
            // Configure additional ad accounts using gtag config
            script.onload = function() {
              additionalAdsIds.forEach(function(id) {
                if (window.gtag) {
                  window.gtag('config', id);
                }
              });
            };
          };
          
          // Load on conversion pages immediately
          const isConversionPage = window.location.pathname.includes('thank-you') || 
                                 window.location.pathname.includes('conversion') ||
                                 window.location.pathname.includes('purchase');
          
          if (isConversionPage) {
            loadAdsScripts();
          } else {
            // Defer until user interaction
            const events = ['click', 'scroll', 'mousemove'];
            events.forEach(function(event) {
              document.addEventListener(event, loadAdsScripts, { once: true, passive: true });
            });
          }
        })();
      `,
          }}
        />

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
