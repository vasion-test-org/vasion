# Image Component Optimization Guide

## Overview

The Image component has been optimized to improve LCP (Largest Contentful Paint) performance using Next.js Image component features.

## Key Optimizations

### 1. **Next.js Image Component**

- Automatic image optimization
- WebP/AVIF format conversion
- Lazy loading (except when `priority={true}`)
- Responsive image sizing

### 2. **Priority Loading**

Use `priority={true}` for above-the-fold images to improve LCP:

```jsx
// For hero images or above-the-fold content
<Image images={heroImages} priority={true} sizes="100vw" />
```

### 3. **Responsive Sizing**

Use the `sizes` prop to help the browser choose the right image size:

```jsx
// For full-width images
<Image images={images} sizes="100vw" />

// For images that take up 50% of viewport width
<Image images={images} sizes="50vw" />

// For images in a grid
<Image images={images} sizes="(max-width: 768px) 100vw, 33vw" />
```

### 4. **Fill Mode**

For images that need to fill their container:

```jsx
<Image images={images} fill={true} sizes="100vw" style={{ objectFit: 'cover' }} />
```

## Usage Examples

### Basic Usage (Backward Compatible)

```jsx
import Image from '@/components/globalComponents/Image';

<Image images={images} borderradius={8} />;
```

### Optimized for LCP

```jsx
// Hero image - loads immediately
<Image
  images={heroImages}
  priority={true}
  sizes="100vw"
  borderradius={0}
/>

// Content images - lazy loaded
<Image
  images={contentImages}
  sizes="(max-width: 768px) 100vw, 50vw"
  borderradius={8}
/>
```

### Grid Images

```jsx
// For image grids
<Image
  images={gridImages}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  borderradius={4}
/>
```

## Performance Best Practices

### 1. **Set Priority for Critical Images**

- Hero images
- Above-the-fold content
- Images visible in the initial viewport

### 2. **Use Appropriate Sizes**

- `100vw` for full-width images
- `50vw` for half-width images
- `33vw` for grid items
- Use media queries for responsive sizing

### 3. **Avoid Unnecessary Priority**

Only use `priority={true}` for images that are critical to LCP. Too many priority images can hurt performance.

### 4. **Optimize Image Sources**

- Use appropriate image dimensions
- Consider using different image sizes for different breakpoints
- Use modern formats (WebP, AVIF) when possible

## Migration Notes

- **Backward Compatible**: Existing usage will continue to work
- **New Props Available**: `priority`, `sizes`, `fill`, `width`, `height`
- **Performance**: Images will automatically be optimized and lazy-loaded
- **LCP Improvement**: Use `priority={true}` for critical images

## Monitoring Performance

Use tools like:

- Lighthouse
- WebPageTest
- Chrome DevTools Performance tab
- Core Web Vitals reports

Monitor LCP specifically to ensure your image optimizations are working.
