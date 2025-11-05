# Complete Image Optimization Guide

## Overview

Next.js automatically optimizes images when using the `next/image` component. This guide shows you how to optimize ALL images on your site.

## Current Setup ✅

### 1. Next.js Image Configuration
Your `next.config.js` is configured with:
- ✅ WebP and AVIF format support
- ✅ Responsive image sizes
- ✅ 30-day cache TTL
- ✅ Storyblok CDN domains configured
- ✅ SVG support with security policies

### 2. Custom Image Component
You have `components/globalComponents/Image.js` which wraps Next.js Image for Storyblok images.

## New: SimpleImage Component 🆕

I've created `components/globalComponents/SimpleImage.js` for easy conversion of plain `<img>` tags.

### Usage Examples

**Before (unoptimized):**
```jsx
<img src="/images/logo.webp" alt="Logo" />
<img src={badge.logo?.filename} alt="Badge" loading="lazy" />
```

**After (optimized):**
```jsx
import SimpleImage from '@/components/globalComponents/SimpleImage';

<SimpleImage src="/images/logo.webp" alt="Logo" width={100} height={50} />
<SimpleImage 
  src={badge.logo?.filename} 
  alt="Badge" 
  width={200} 
  height={100}
  loading="lazy"
/>
```

## Components That Need Updating

### High Priority (Above-the-fold / Frequently Used)

1. **Hero.js**
   - Badge images (`BadgeImage`)
   - Social logos (`SocailLogo`)
   - Review buttons (`ReviewButton`)

2. **MasonryGrid.js**
   - Gallery images (currently using styled `img`)

3. **PaginatedCards.js**
   - Circle icons (`Circle` component)

### Medium Priority

4. **Nav.js** & **MobileNav.js**
   - Icons and chevrons

5. **Footer.js**
   - Logo images

6. **G2Reviews.js** & **G2Banner.js**
   - Review images

## Quick Conversion Guide

### Pattern 1: Simple Images with Known Dimensions

**Before:**
```jsx
const BadgeImage = styled.img`
  width: 100%;
`;

<BadgeImage src={badge.logo?.filename} alt="Badge" />
```

**After:**
```jsx
import SimpleImage from '@/components/globalComponents/SimpleImage';

const BadgeImageWrapper = styled.div`
  width: 100%;
`;

<BadgeImageWrapper>
  <SimpleImage 
    src={badge.logo?.filename} 
    alt="Badge" 
    width={200}
    height={100}
    sizes="(max-width: 768px) 100vw, 200px"
  />
</BadgeImageWrapper>
```

### Pattern 2: Icons & Small Images

**Before:**
```jsx
<SocailLogo src="/images/icons/Facebook.webp" alt="facebook" />
```

**After:**
```jsx
import SimpleImage from '@/components/globalComponents/SimpleImage';

<SimpleImage 
  src="/images/icons/Facebook.webp" 
  alt="facebook" 
  width={32}
  height={32}
  sizes="32px"
/>
```

### Pattern 3: Styled Images

**Before:**
```jsx
const ReviewButton = styled.img`
  width: 12.25vw;
  height: 4vw;
`;

<ReviewButton src="/images/reviewButton.webp" alt="Review" />
```

**After:**
```jsx
import SimpleImage from '@/components/globalComponents/SimpleImage';

const ReviewButtonWrapper = styled.div`
  width: 12.25vw;
  height: 4vw;
  cursor: pointer;
`;

<ReviewButtonWrapper>
  <SimpleImage 
    src="/images/reviewButton.webp" 
    alt="Review" 
    width={164}
    height={62}
    sizes="(max-width: 768px) 27.5vw, 12.25vw"
  />
</ReviewButtonWrapper>
```

## Benefits of Next.js Image Optimization

1. **Automatic Format Conversion**
   - Converts to WebP/AVIF when supported
   - Can reduce file size by 30-50%

2. **Responsive Images**
   - Serves appropriate size based on device
   - Reduces bandwidth usage

3. **Lazy Loading**
   - Images load only when needed
   - Improves initial page load

4. **Better Performance**
   - Optimized encoding
   - CDN caching
   - Faster page loads

## Migration Strategy

### Phase 1: Critical Images (Do First)
- Hero badges
- Social icons
- Above-the-fold images

### Phase 2: High-Traffic Components
- Navigation icons
- Footer logos
- Review badges

### Phase 3: Content Images
- Gallery images
- Card images
- Blog images

## Testing

After converting images:
1. Check Network tab - images should come from `/_next/image`
2. Verify format - should be WebP/AVIF in supported browsers
3. Test responsive - different sizes should load on different devices
4. Check Lighthouse - should see improved LCP scores

## Notes

- Always provide `width` and `height` for better performance
- Use `sizes` prop to help browser choose correct image size
- Set `priority={true}` only for above-the-fold images
- Keep `loading="lazy"` for below-the-fold images

