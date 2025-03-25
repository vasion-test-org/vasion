import StoryblokProvider from '@/components/StoryblokProvider';
import { ThemeProviderWrapper } from '@/context/ThemeContext';
import { ThankYouProvider } from '@/context/ThankYouContext';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import FormTracking from '@/components/FormTracking';
import Script from 'next/script';
import './globals.css';
import ScrollSmootherWrapper from '@/components/ScollSmoothWraper';

export const metadata = {
  title: 'Vasion',
  description: 'Vasion site',
};

export default function RootLayout({ children }) {
  return (
    <ThemeProviderWrapper>
      <StoryblokProvider>
        <StyledComponentsRegistry>
          <html lang='en'>
            <head>
              <Script
                id='marketo-munchkin'
                strategy='afterInteractive'
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
            </head>
            <body>
              <ThankYouProvider>
                <FormTracking />
                <ScrollSmootherWrapper>
                {children}
                </ScrollSmootherWrapper>
              </ThankYouProvider>
            </body>
          </html>
        </StyledComponentsRegistry>
      </StoryblokProvider>
    </ThemeProviderWrapper>
  );
}
