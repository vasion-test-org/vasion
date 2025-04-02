import StoryblokProvider from '@/components/StoryblokProvider';
import { ThemeProviderWrapper } from '@/context/ThemeContext';
import { ThankYouProvider } from '@/context/ThankYouContext';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import FormTracking from '@/components/FormTracking';
import Script from 'next/script';
import './globals.css';
import ScrollSmootherWrapper from '@/components/ScollSmoothWraper';
import Providers from '@/components/providers';
import Config from '@/components/Config';
import { getStoryblokApi } from "@/lib/storyblok";
import { Metadata } from 'next';

export const metadata = {
  metadataBase: new URL('https://www.vasion.com'),
  title: {
    template: '%s | Vasion',
    default: 'Vasion',
  },
  description: 'Vasion site',
};

export default async function RootLayout({ children }) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: 'draft', 
  });
  const configData = data ? data.story.content : null;
  return (
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
        <ThemeProviderWrapper>
          <StoryblokProvider>
            <StyledComponentsRegistry>
              <Providers>
                <ThankYouProvider>
                  <FormTracking />
                  <ScrollSmootherWrapper>
                    <Config blok={configData}>
                    {children}
                    </Config>
                    </ScrollSmootherWrapper>
                </ThankYouProvider>
              </Providers>
            </StyledComponentsRegistry>
          </StoryblokProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
