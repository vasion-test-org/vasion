import StoryblokProvider from "@/components/StoryblokProvider";
import { ThemeProviderWrapper } from "@/context/ThemeContext";
import { ThankYouProvider } from "@/context/ThankYouContext";
import { PageDataProvider } from "@/context/PageDataContext";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import FormTracking from "@/components/FormTracking";
import Script from "next/script";
import "./globals.css";
import ScrollSmootherWrapper from "@/components/ScrollSmoothWrapper";
import Providers from "@/components/providers";
import Config from "@/components/Config";
import { getStoryblokApi } from "@/lib/storyblok";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://vasion.com"),
  title: {
    template: "%s | Vasion",
    default: "Vasion",
  },
  description: "Vasion site",
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
        <link rel="preconnect" href="https://munchkin.marketo.net" />
        <link rel="preconnect" href="https://cdn-cookieyes.com" />
        <link rel="dns-prefetch" href="https://js.intercomcdn.com" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        <link
          rel="dns-prefetch"
          href="https://dev.visualwebsiteoptimizer.com"
        />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://info.printerlogic.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Archivo-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Archivo-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload Rive WASM to improve LCP - largest payload at 512KB */}
        <link
          rel="preload"
          href="https://unpkg.com/@rive-app/canvas@2.30.1/rive.wasm"
          as="fetch"
          crossOrigin="anonymous"
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="beforeInteractive"
          g
          dangerouslySetInnerHTML={{
            __html: `
        // Optimize GTM loading to reduce payload and prevent multiple loads
        if (!window.gtmLoaded) {
          window.gtmLoaded = true;
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.defer=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WMKX59W');
        }
      `,
          }}
        />

        {/* Google reCAPTCHA - Load only when forms are present */}
        <Script
          id="recaptcha"
          strategy="lazyOnload"
          src="https://www.google.com/recaptcha/api.js"
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

        {/* VWO - Load before page is interactive */}
        <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
        <Script
          id="vwo-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window._vwo_code || (function() {
        var account_id=827254,
        version=2.1,
        settings_tolerance=6000,
        hide_element='body',
        hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;',
        /* DO NOT EDIT BELOW THIS LINE */
        f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='_vwo_'+account_id+'_settings',cc={};try{var c=JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config'));cc=c&&typeof c==='object'?c:{}}catch(e){}var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;code={nonce:v&&v.nonce,library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},hide_element:function(){if(performance.getEntriesByName('first-contentful-paint')[0]){return''}return typeof cc.hE==='string'?cc.hE:hide_element},getVersion:function(){return version},finish:function(e){if(!f){f=true;var t=d.getElementById('_vis_opt_path_hides');if(t)t.parentNode.removeChild(t);if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e}},finished:function(){return f},addScript:function(e){var t=d.createElement('script');t.type='text/javascript';if(e.src){t.src=e.src}else{t.text=e.text}v&&t.setAttribute('nonce',v.nonce);d.getElementsByTagName('head')[0].appendChild(t)},load:function(e,t){var n=this.getSettings(),i=d.createElement('script'),r=this;t=t||{};if(n){i.textContent=n;d.getElementsByTagName('head')[0].appendChild(i);if(!w.VWO||VWO.caE){stT.removeItem(cK);r.load(e)}}else{var o=new XMLHttpRequest;o.open('GET',e,true);o.withCredentials=!t.dSC;o.responseType=t.responseType||'text';o.onload=function(){if(t.onloadCb){return t.onloadCb(o,e)}if(o.status===200||o.status===304){_vwo_code.addScript({text:o.responseText})}else{_vwo_code.finish('&e=loading_failure:'+e)}};o.onerror=function(){if(t.onerrorCb){return t.onerrorCb(e)}_vwo_code.finish('&e=loading_failure:'+e)};o.send()}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t;if(this.hide_element()!=='body'){t=d.createElement('style');var n=this.hide_element(),i=n?n+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');v&&t.setAttribute('nonce',v.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=i;else t.appendChild(d.createTextNode(i));r.appendChild(t)}else{t=d.getElementsByTagName('head')[0];var i=d.createElement('div');i.style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;display: block !important;';i.setAttribute('id','_vis_opt_path_hides');i.classList.add('_vis_hide_layer');t.parentNode.insertBefore(i,t.nextSibling)}var o=window._vis_opt_url||d.URL,s='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(o)+'&vn='+version;if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:s})}else{this.load(s+'&x=true')}}};w._vwo_code=code;code.init();})();
    `,
          }}
        />

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
                    <ScrollSmootherWrapper>
                      <Config>
                        {children}
                        <Analytics />
                      </Config>
                    </ScrollSmootherWrapper>
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
