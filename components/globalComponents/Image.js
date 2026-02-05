'use client';

import React from 'react';

import Image from 'next/image';

import styled from 'styled-components';

import useMedia from '@/functions/useMedia';
import media from '@/styles/media';

const OptimizedImage = ({
  borderradius,
  className,
  fetchPriority,
  filename,
  fill = false,
  height,
  images,
  priority = false,
  quality = 85,
  sizes = '100vw',
  style,
  width,
}) => {
  // console.log(borderradius)
  const imageSrc = filename
    ? filename
    : useMedia(
        images?.[0]?.filename,
        images?.[0]?.filename,
        images?.[1]?.filename || images?.[0]?.filename,
        images?.[2]?.filename || images?.[0]?.filename
      );

  if (!imageSrc) return null;

  // Extract alt text from the images array
  const getAltText = () => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return 'Image';
    }

    // Find the image that matches the selected imageSrc
    const selectedImage = images.find((img) => img.filename === imageSrc);
    if (selectedImage && selectedImage.alt) {
      return selectedImage.alt;
    }

    // Fallback to first image's alt if no match found
    if (images[0] && images[0].alt) {
      return images[0].alt;
    }

    return 'Image';
  };

  const altText = getAltText();
  // If fill is true, we need a container with relative positioning
  if (fill) {
    return (
      <ImageContainer borderradius={borderradius} className={className} style={style}>
        <Image
          fill
          style={{
            borderRadius: `${borderradius || 0}px`,
            objectFit: 'contain',
          }}
          alt={altText}
          fetchPriority={fetchPriority || (priority ? 'high' : undefined)}
          priority={priority}
          quality={quality}
          sizes={sizes}
          src={imageSrc}
        />
      </ImageContainer>
    );
  }

  // For non-fill images, use width and height props
  return (
    <Image
      style={{
        borderRadius: `${borderradius || 0}px`,
        height: 'auto',
        width: '100%',
        ...style,
      }}
      alt={altText}
      className={className}
      fetchPriority={fetchPriority || (priority ? 'high' : undefined)}
      height={height || 600}
      priority={priority}
      quality={quality}
      sizes={sizes}
      src={imageSrc}
      width={width || 800}
    />
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};
  overflow: hidden;

  ${media.fullWidth} {
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }

  ${media.tablet} {
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }

  ${media.mobile} {
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }
`;

export default OptimizedImage;
export { OptimizedImage as Image };
