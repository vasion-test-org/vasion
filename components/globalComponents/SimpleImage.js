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
  alt = '',
  className,
  height,
  loading = 'lazy',
  priority = false,
  quality = 80,
  sizes,
  src,
  style,
  width,
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
        style={{
          height: 'auto',
          width: '100%',
          ...style,
        }}
        alt={alt}
        className={className}
        height={height || 100}
        loading={loading === 'lazy' ? undefined : loading}
        priority={priority}
        quality={quality}
        sizes={defaultSizes}
        src={src}
        width={width || 100}
        {...props}
      />
    );
  }

  // Fallback for edge cases
  return (
    <img
      alt={alt}
      className={className}
      height={height}
      loading={loading}
      src={src}
      style={style}
      width={width}
      {...props}
    />
  );
};

export default SimpleImage;
