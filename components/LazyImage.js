'use client';

import Image from '@/components/globalComponents/Image';

import LazyLoadWrapper from './LazyLoadWrapper';

const LazyImage = ({
  className = '',
  filename,
  images,
  priority = false,
  quality = 85,
  sizes = '100vw',
  style = {},
  ...props
}) => {
  // Don't lazy load if priority is true (above-the-fold images)
  if (priority) {
    return (
      <Image
        className={className}
        filename={filename}
        images={images}
        priority={priority}
        quality={quality}
        sizes={sizes}
        style={style}
        {...props}
      />
    );
  }

  // Create a placeholder div with the same dimensions
  const placeholderElement = (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '200px',
        ...style,
      }}
      className={className}
    >
      <div style={{ color: '#999', fontSize: '14px' }}>Loading...</div>
    </div>
  );

  return (
    <LazyLoadWrapper fallback={placeholderElement} rootMargin="100px" threshold={0.1}>
      <Image
        className={className}
        filename={filename}
        images={images}
        priority={false}
        quality={quality}
        sizes={sizes}
        style={style}
        {...props}
      />
    </LazyLoadWrapper>
  );
};

export default LazyImage;
