# React Player v3 Migration Guide - Step by Step

## The Problem
React Player v3 works locally but shows gray screen in production. This is a common issue caused by:
1. Next.js optimization settings conflicting with v3
2. Missing error boundaries
3. Bundle splitting issues
4. CSS loading problems

## Step-by-Step Solution

### Step 1: Update Next.js Configuration

Replace your current `next.config.js` with the v3-compatible version:

```bash
# Backup your current config
cp next.config.js next.config.backup.js

# Use the v3-compatible config
cp next.config.v3.js next.config.js
```

**Key changes:**
- Removed `react-player` from `optimizePackageImports`
- Added React Player specific webpack fallbacks
- Created separate chunk for React Player

### Step 2: Update Package.json

```bash
npm install react-player@^3.3.0
```

### Step 3: Use the Enhanced Component

Replace your current `CookieConsentVideo` with the v3-compatible version:

```bash
# Backup current component
cp components/CookieConsentVideo.js components/CookieConsentVideo.backup.js

# Use the v3-compatible component
cp components/CookieConsentVideoV3.js components/CookieConsentVideo.js
```

**Key improvements:**
- Lazy loading with `React.lazy()`
- Error boundary for better error handling
- Suspense fallback for loading states
- Better production compatibility

### Step 4: Add Required CSS (if needed)

If you still see styling issues, add this to your global CSS:

```css
/* Add to app/globals.css */
@import 'react-player/dist/ReactPlayer.css';
```

### Step 5: Test the Migration

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   - Check browser console for errors
   - Test video playback
   - Test cookie consent functionality

2. **Build Testing:**
   ```bash
   npm run build
   npm run start
   ```
   - Verify build completes without errors
   - Test in production mode locally

3. **Deploy Testing:**
   - Deploy to staging environment
   - Test video functionality
   - Check browser console for errors

### Step 6: Debugging Production Issues

If you still see gray screens in production:

1. **Check Browser Console:**
   - Look for `Module not found` errors
   - Check for `ReactPlayer is not a function` errors
   - Look for CSS loading errors

2. **Check Network Tab:**
   - Verify video files are loading
   - Check for 404 errors
   - Verify CORS headers

3. **Add Debug Logging:**
   ```jsx
   <LazyReactPlayer
     url={url || videoSrc}
     onReady={() => console.log('Player ready')}
     onError={(error) => console.error('Player error:', error)}
     onLoadStart={() => console.log('Loading started')}
     onLoad={() => console.log('Load completed')}
     {...otherProps}
   />
   ```

### Step 7: Fallback Strategy

If v3 still doesn't work, you can use a hybrid approach:

```jsx
// components/CookieConsentVideoHybrid.js
import React from 'react';

const CookieConsentVideoHybrid = (props) => {
  // Use v2 in production, v3 in development
  const ReactPlayer = process.env.NODE_ENV === 'production' 
    ? require('react-player').default
    : require('react-player/lazy').default;

  return <ReactPlayer {...props} />;
};
```

## Common Issues and Solutions

### Issue 1: "Module not found" errors
**Solution:** Remove `react-player` from `optimizePackageImports`

### Issue 2: Gray screen with no errors
**Solution:** Add error boundary and check CSS loading

### Issue 3: Videos work but cookie consent doesn't
**Solution:** Check CookieYes API calls and event listeners

### Issue 4: Build fails
**Solution:** Add webpack fallbacks for fs, path, crypto

## Testing Checklist

- [ ] Videos load and play in development
- [ ] Videos load and play in production build
- [ ] Videos load and play in deployed environment
- [ ] Cookie consent message shows when cookies not accepted
- [ ] Cookie consent message hides when cookies accepted
- [ ] Error boundary catches and displays errors gracefully
- [ ] Loading states work properly
- [ ] No console errors in production

## Rollback Plan

If v3 doesn't work after trying all solutions:

```bash
# Restore v2
npm install react-player@^2.16.1

# Restore original config
cp next.config.backup.js next.config.js

# Restore original component
cp components/CookieConsentVideo.backup.js components/CookieConsentVideo.js
```

## Success Indicators

You'll know the migration is successful when:
- Videos play correctly in production
- No gray screens
- Cookie consent works properly
- No console errors
- Build completes successfully
- Performance is maintained or improved
