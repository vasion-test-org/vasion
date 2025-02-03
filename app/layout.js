import { storyblokInit, apiPlugin} from "@storyblok/react/rsc"
import StoryblokProvider from "@/components/StoryblokProvider"
import { ThemeProviderWrapper } from "@/context/ThemeContext";
import './globals.css';

export const metadata = {
  title: 'Vasion',
  description: 'Vasion site',
}

storyblokInit({
  accessToken: 'Qf9Z8O8vNFQw8drmarBGMwtt',
  use: [apiPlugin],
  apiOptions: {
  region: "us",
},
})

export default function RootLayout({ children }) {
  return (
    <ThemeProviderWrapper>
    <StoryblokProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoryblokProvider>
    </ThemeProviderWrapper>
  )
}
