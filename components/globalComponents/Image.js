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

  // Extract alt text from imageSrc if it's an object, otherwise use a default
  const altText = typeof imageSrc === 'object' ? imageSrc.imageAlt : 'Image';

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
