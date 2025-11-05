/**
 * SimpleImage - Optimized wrapper for simple images
 * 
 * Use this instead of plain <img> tags to automatically get:
 * - Next.js Image optimization (WebP/AVIF conversion)
 * - Lazy loading
 * - Responsive sizing
 * - Better performance
 * 
 * Usage:
 * <SimpleImage src="/images/logo.webp" alt="Logo" width={100} height={50} />
 * <SimpleImage src={storyblokImage.filename} alt="Description" width={200} height={200} />
 */
'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const SimpleImage = ({
  src,
  alt = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  className,
  style,
  quality = 80,
  sizes,
  ...props
}) => {
  if (!src) return null;

  // Determine if it's a local image or external URL
  const isLocal = src.startsWith('/');
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  // For external images from Storyblok or other CDNs, use Next.js Image
  // For local images, also use Next.js Image
  if (isLocal || isExternal) {
    // Determine appropriate sizes if not provided
    const defaultSizes = sizes || (width ? `${Math.ceil(width)}px` : '100vw');

    return (
      <Image
        src={src}
        alt={alt}
        width={width || 100}
        height={height || 100}
        priority={priority}
        loading={loading === 'lazy' ? undefined : loading}
        quality={quality}
        sizes={defaultSizes}
        className={className}
        style={{
          width: '100%',
          height: 'auto',
          ...style,
        }}
        {...props}
      />
    );
  }

  // Fallback for edge cases
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default SimpleImage;

