'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import media from '@/styles/media';
import useMedia from '@/functions/useMedia';

const OptimizedImage = ({
  images,
  borderradius,
  filename,
  priority = false,
  sizes = '100vw',
  fill = false,
  width,
  height,
  className,
  style,
  quality = 85,
}) => {
  // console.log(borderradius)
  let imageSrc = filename
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
      <ImageContainer
        borderradius={borderradius}
        className={className}
        style={style}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          style={{
            objectFit: 'contain',
            borderRadius: `${borderradius || 0}px`,
          }}
        />
      </ImageContainer>
    );
  }

  // For non-fill images, use width and height props
  return (
    <Image
      src={imageSrc}
      alt={altText}
      width={width || 800}
      height={height || 600}
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={className}
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: `${borderradius || 0}px`,
        ...style,
      }}
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
