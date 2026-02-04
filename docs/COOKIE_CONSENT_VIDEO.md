# Cookie Consent Video Component

## Overview

The `CookieConsentVideo` component is a wrapper around `ReactPlayer` that checks for cookie consent before displaying videos. If cookies haven't been accepted, it shows a user-friendly message asking users to accept cookies to enjoy media content.

## How It Works

### Cookie Detection

The component checks for cookie consent in multiple ways:

1. **CookieYes API**: Uses `window.getCkyConsent()` to get detailed consent data
2. **CookieYes Cookie**: Falls back to checking the `cookieyes-consent` cookie directly
3. **Event Listeners**: Listens for consent change events (`ckyConsentChanged`, `cookieyes-consent`, `cookieconsent`)

### States

- **Loading**: Shows while checking cookie status
- **Cookie Consent Required**: Shows message when cookies not accepted
- **Video Ready**: Shows video when cookies are accepted
- **Test Environment**: Automatically allows videos in development/test environments

## Usage

### Basic Usage

```jsx
import CookieConsentVideo from '@/components/CookieConsentVideo';

<CookieConsentVideo
  url="https://www.youtube.com/watch?v=example"
  width="100%"
  height="300px"
  controls={true}
/>;
```

### With Thumbnail

```jsx
<CookieConsentVideo
  url="https://www.youtube.com/watch?v=example"
  width="100%"
  height="300px"
  controls={true}
  light="https://img.youtube.com/vi/example/maxresdefault.jpg"
/>
```

### All Available Props

```jsx
<CookieConsentVideo
  // Video source
  url="https://www.youtube.com/watch?v=example"
  // Legacy props (for backward compatibility)
  videos={videos}
  filename="video.mp4"
  thumbnails={thumbnails}
  // ReactPlayer props
  width="100%"
  height="300px"
  controls={true}
  light="thumbnail.jpg"
  playsinline={true}
  playing={false}
  volume={1}
  muted={false}
  loop={false}
  playIcon={<></>}
  // Styling
  borderradius={8}
  isSideBySideVideo={false}
  // Testing
  forceConsentMessage={false} // Set to true to force consent message in test environments
  // Any other ReactPlayer props
  {...otherProps}
/>
```

## Integration with Existing Components

All existing video components have been updated to use `CookieConsentVideo`:

### Video.js

```jsx
// Before
<ReactPlayer url={videoSrc} controls={true} />

// After (automatic)
<CookieConsentVideo url={videoSrc} controls={true} />
```

### ComparisonSelect.js

```jsx
// Before
<ReactPlayer url={blok?.video_url?.url} controls={true} />

// After (automatic)
<CookieConsentVideo url={blok?.video_url?.url} controls={true} />
```

### CardModal.js

```jsx
// Before
<ReactPlayer url={videoSrc} controls={true} />

// After (automatic)
<CookieConsentVideo url={videoSrc} controls={true} />
```

### VideoCarousel.js

```jsx
// Before
<ReactPlayer url={video?.video.filename} controls={true} />

// After (automatic)
<CookieConsentVideo url={video?.video.filename} controls={true} />
```

## Cookie Consent Message

When cookies are not accepted, the component displays:

- **Icon**: Cookie emoji (🍪)
- **Message**: "Please accept our site cookies to enjoy Media from Vasion.com"
- **Button**: "Accept Cookies" (opens CookieYes consent modal)

## Styling

The cookie consent message uses your site's design system:

- **Background**: Gradient from primary purple to primary blue
- **Text**: White text using your typography system
- **Button**: White background with purple text
- **Responsive**: Adapts to mobile, tablet, and desktop

## Testing

### Test Environments

The component automatically detects test environments and allows videos by default:

- **Development** (`NODE_ENV === 'development'`)
- **Vercel previews** (hostname contains `vercel.app`)
- **Local development** (hostname contains `localhost` or `127.0.0.1`)

### Force Consent Message

To test the consent message in test environments, use the `forceConsentMessage` prop:

```jsx
<CookieConsentVideo
  url="https://example.com/video.mp4"
  forceConsentMessage={true} // Forces consent message even in test environments
/>
```

### Test Component

Use the `CookieConsentTest` component to test the functionality:

```jsx
import CookieConsentTest from '@/components/CookieConsentTest';

// Add to any page for testing
<CookieConsentTest />;
```

## CookieYes Integration

The component is designed to work with CookieYes (which is already loaded in your `layout.js`):

```jsx
// In layout.js
<Script
  id="cookieyes"
  strategy="afterInteractive"
  src="https://cdn-cookieyes.com/client_data/c1cc367c126e833f0301eb2c/script.js"
/>
```

## Browser Support

- **Modern Browsers**: Full support
- **Older Browsers**: Graceful fallback to checking cookies directly
- **No JavaScript**: Shows loading state (graceful degradation)

## Performance

- **Lazy Loading**: Only checks cookies when component mounts
- **Event Listeners**: Efficiently listens for consent changes
- **Cleanup**: Properly removes event listeners on unmount
- **Timeout**: Stops checking after 10 seconds to prevent infinite loops

## Troubleshooting

### Videos Not Showing

1. Check if CookieYes is loaded: `window.getCkyConsent` should be a function
2. Check cookie value: Look for `cookieyes-consent` cookie in browser dev tools
3. Check console for any JavaScript errors
4. Verify consent data: `window.getCkyConsent()` should return an object with `isUserActionCompleted` and `categories`

### Cookie Consent Not Updating

1. Ensure CookieYes events are firing
2. Check if event listeners are properly attached
3. Verify CookieYes configuration

### Styling Issues

1. Check if styled-components are properly configured
2. Verify media queries are working
3. Check if colors and text styles are imported correctly

## Future Enhancements

Potential improvements:

- **Analytics**: Track cookie consent interactions
- **Customization**: Allow custom consent messages per component
- **Multiple Providers**: Support other cookie consent providers
- **Accessibility**: Enhanced ARIA labels and keyboard navigation
