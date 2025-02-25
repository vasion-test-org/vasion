// app/layout.js
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import StoryblokProvider from '@/components/StoryblokProvider';
import { ThemeProviderWrapper } from '@/context/ThemeContext';
import './globals.css';

export const metadata = {
  title: 'Vasion',
  description: 'Vasion site',
};

export default function RootLayout({ children }) {
  return (
    <ThemeProviderWrapper>
      <StoryblokProvider>
        <html lang='en'>
          <body>{children}</body>
          {/* <StoryblokBridgeLoader options={{}} /> */}
        </html>
      </StoryblokProvider>
    </ThemeProviderWrapper>
  );
}
