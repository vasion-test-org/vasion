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

- **Strategic Loading**: Already optimized in layout.js:
  - GTM: `afterInteractive` strategy
  - Marketo: `afterInteractive` strategy
  - Intercom: `lazyOnload` with user interaction triggers
  - Hotjar: `lazyOnload` with user interaction triggers
  - VWO: Optimized loading
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
  - Interaction-based deferring
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

## 🎯 Next Steps

1. **Run Bundle Analysis**: Use `npm run build:analyze` to identify remaining optimization opportunities
2. **Monitor Performance**: Track TBT improvements in production
3. **Further Optimizations**: Consider implementing:
   - Service Worker for caching
   - Resource hints for critical resources
   - Image optimization improvements
   - Additional lazy loading strategies

## 📝 Notes

- All optimizations maintain functionality while improving performance
- Loading states prevent layout shift during dynamic imports
- Third-party scripts are optimized to not block initial page load
- Bundle splitting improves caching efficiency
- Dynamic imports reduce initial JavaScript payload
