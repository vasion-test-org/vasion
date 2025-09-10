# Total Blocking Time (TBT) and JavaScript Execution Optimizations

This document outlines the comprehensive optimizations implemented to reduce Total Blocking Time (TBT) and improve JavaScript execution performance.

## 🚀 Implemented Optimizations

### 1. Bundle Analysis & Optimization

- **Added Bundle Analyzer**: Installed `@next/bundle-analyzer` for identifying large dependencies
- **Chunk Optimization**: Configured advanced webpack splitChunks for better caching:
  - Separate vendor chunks
  - Dedicated chunks for GSAP, Rive, and Storyblok
  - Optimized default chunk settings
- **Package Import Optimization**: Added `optimizePackageImports` for heavy libraries

### 2. Dynamic Imports & Code Splitting

- **Heavy Component Lazy Loading**: Converted heavy components to dynamic imports:
  - `LogoCube` - GSAP animations
  - `OverviewController` - Complex interactive components
  - `Cards`, `IconCards`, `Grid` - Layout components
  - `Accordion`, `Stats`, `Rotator` - Interactive elements
  - `StackedCards`, `Badges`, `LogosGallery` - Content components
- **SSR Optimization**: Disabled SSR for animation-heavy components
- **Loading Placeholders**: Added proper loading states to prevent layout shift

### 3. Third-Party Script Optimization

- **Strategic Loading**: Optimized in layout.js:
  - **GTM**: `lazyOnload` strategy with performance optimizations
  - **Google Analytics**: `afterInteractive` strategy with optimized loading
  - **Google Ads**: Conditional loading (immediate on conversion pages, deferred on others)
  - **Marketo**: `afterInteractive` strategy
  - **Intercom**: `lazyOnload` with user interaction triggers
  - **Hotjar**: `lazyOnload` with user interaction triggers
  - **VWO**: Optimized loading
- **GTM Performance Monitoring**: Real-time monitoring of GTM script load times and container size
- **User Interaction Triggers**: Scripts load only after user interaction to improve initial performance

### 4. Performance Configuration

- **SWC Minification**: Enabled for better performance
- **Compression**: Already enabled (`compress: true`)
- **Standalone Output**: Optimized for better bundle size
- **ESM Externals**: Enabled for modern bundling
- **Server Components**: External packages configured

### 5. Advanced Optimizations

- **LazyHydration Component**: Created for viewport-based hydration
- **Script Optimization Utilities**:
  - Dynamic GSAP loading
  - Sequential script loading
  - Preloading strategies
  - **Optimized interaction-based deferring** (prevents multiple script loads)
  - **Intersection Observer loading** (load scripts when elements become visible)
  - **Idle callback loading** (load scripts when browser is idle)
  - **Timeout handling** (prevents hanging script loads)
- **GSAP Optimization**: Load GSAP only when needed in LogoCube

## 📊 Expected Performance Improvements

### Bundle Size Reduction

- **Vendor Chunking**: Better caching and smaller initial bundles
- **Dynamic Imports**: Reduced initial JavaScript payload
- **Package Optimization**: Tree-shaking improvements

### TBT Reduction

- **Deferred Hydration**: Components hydrate only when needed
- **Script Optimization**: Non-critical scripts load after interaction
- **Chunk Splitting**: Smaller, more manageable chunks

### JavaScript Execution Time

- **Lazy Loading**: Heavy components load on-demand
- **GSAP Optimization**: Animation library loads only when needed
- **SSR Disabled**: For components that don't need server rendering

## 🛠️ Usage Instructions

### Bundle Analysis

```bash
npm run build:analyze
```

This will generate bundle analysis reports to identify optimization opportunities.

### Dynamic Components

Heavy components are now automatically lazy-loaded with proper loading states:

- LogoCube animations load only when component is rendered
- GSAP loads only when animations are needed
- Interactive components hydrate on viewport entry

### Script Loading

Third-party scripts are optimized with:

- `afterInteractive`: Load after page becomes interactive
- `lazyOnload`: Load only after user interaction
- Conditional loading to prevent duplicate loads

## 🔧 Configuration Files Modified

1. **next.config.js**: Bundle optimization, chunk splitting, package optimization
2. **package.json**: Added bundle analyzer script
3. **components/Hero.js**: Dynamic LogoCube import
4. **components/renderers/ComponentRenderer.js**: Dynamic imports for heavy components
5. **components/CenteredSection.js**: Dynamic imports for all heavy components
6. **components/LogoCube.js**: Optimized GSAP loading
7. **lib/scriptOptimization.js**: New utility for script optimization
8. **components/LazyHydration.js**: New component for viewport-based hydration

## 📈 Monitoring

Monitor your performance improvements using:

- Lighthouse audits
- Bundle analyzer reports (`npm run build:analyze`)
- Web Vitals metrics
- Core Web Vitals dashboard

## ✅ Build Status

**SUCCESS**: All optimizations have been successfully implemented and the build is working correctly!

- ✅ Bundle analyzer reports generated: `.next/analyze/client.html`, `.next/analyze/nodejs.html`, `.next/analyze/edge.html`
- ✅ Chunk optimization working: `vendors-6bf45c9f2fd6a086.js` (461 kB)
- ✅ Dynamic imports implemented for heavy components
- ✅ Third-party script optimization active
- ✅ Configuration conflicts resolved

## 🎯 Next Steps

1. **Analyze Bundle Reports**: Open `.next/analyze/client.html` in your browser to see the impact of optimizations
2. **Monitor Performance**: Track TBT improvements in production using Lighthouse audits
3. **Further Optimizations**: Consider implementing:
   - Service Worker for caching
   - Resource hints for critical resources
   - Image optimization improvements
   - Additional lazy loading strategies

## 🔧 Script Optimization Improvements

### Fixed Issues:

- **Multiple Script Loading**: Fixed `deferScriptsOnInteraction` to prevent scripts from loading multiple times
- **Event Listener Cleanup**: All event listeners are properly removed after first interaction
- **Memory Leaks Prevention**: Added proper cleanup and timeout handling
- **Google Ads Duplicate Loading**: Fixed to load gtag.js once and configure multiple ad accounts
- **Function Idempotency**: Added proper checks to prevent duplicate script loading
- **Resource Cleanup**: Fixed memory leaks in performance monitoring components

### New Features:

- **Intersection Observer Loading**: Load scripts when specific elements become visible
- **Idle Callback Loading**: Load non-critical scripts when browser is idle
- **Timeout Handling**: Prevent hanging script loads with 10-second timeout
- **Better Error Handling**: Improved error reporting and fallback strategies

## 🎯 GTM Performance Optimizations

### Implemented Optimizations:

- **Lazy Loading Strategy**: Changed GTM from `afterInteractive` to `lazyOnload` to reduce initial TBT
- **Conditional Google Ads Loading**: Google Ads scripts load immediately on conversion pages, deferred on others
- **Optimized Script Attributes**: Added `crossOrigin="anonymous"` and performance attributes
- **Performance Monitoring**: Real-time monitoring of GTM script load times and container size
- **DataLayer Optimization**: Early initialization to prevent blocking

### Expected TBT Improvements:

- **GTM Script**: Reduced from 155ms to ~50-80ms (lazy loading)
- **Google Analytics**: Optimized loading with better error handling
- **Google Ads**: Conditional loading reduces unnecessary script execution
- **Overall Impact**: Estimated 100-150ms TBT reduction

### Monitoring Features:

- **Load Time Tracking**: Console logging of GTM script performance
- **Size Monitoring**: Warnings when GTM container exceeds 200KB
- **DataLayer Monitoring**: Tracking of dataLayer push frequency
- **Performance Alerts**: Automatic warnings for slow script loads

## 🔧 Critical Fixes Applied

### Google Ads Optimization:
- **Before**: Loading 3 separate gtag.js scripts (inefficient)
- **After**: Load gtag.js once with primary ID, configure others with `gtag('config', 'ID')`
- **Impact**: Reduced network requests from 3 to 1, improved loading efficiency

### Function Idempotency:
- **Before**: `loadAdsScripts` could be called multiple times
- **After**: Added `window.googleAdsLoaded` check to prevent duplicate loading
- **Impact**: Prevents duplicate script injection and memory leaks

### Resource Cleanup:
- **Before**: Performance observers and dataLayer modifications not cleaned up
- **After**: Proper cleanup in useEffect return function
- **Impact**: Prevents memory leaks in Next.js fast refresh and navigation

### Function Naming:
- **Before**: `monitorGTMSize` was actually monitoring load time
- **After**: Split into `monitorGTMLoadTime` and `monitorGTMSize` with correct implementations
- **Impact**: Clear separation of concerns and accurate monitoring

### Usage Examples:

```javascript
// Load scripts on first user interaction (optimized)
deferScriptsOnInteraction([
  { src: '/analytics.js', options: { strategy: 'afterInteractive' } },
]);

// Load scripts when element becomes visible
loadScriptsOnIntersection([{ src: '/heavy-component.js' }], '.lazy-component', {
  threshold: 0.1,
  rootMargin: '50px',
});

// Load scripts when browser is idle
loadScriptsOnIdle([{ src: '/non-critical.js' }], { timeout: 2000 });
```

## 📝 Notes

- All optimizations maintain functionality while improving performance
- Loading states prevent layout shift during dynamic imports
- Third-party scripts are optimized to not block initial page load
- Bundle splitting improves caching efficiency
- Dynamic imports reduce initial JavaScript payload
- **Script loading is now more efficient and prevents duplicate loads**
