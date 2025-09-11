'use client';

import Image from '@/components/globalComponents/Image';
import LazyLoadWrapper from './LazyLoadWrapper';

const LazyImage = ({
  images,
  filename,
  priority = false,
  sizes = '100vw',
  quality = 85,
  className = '',
  style = {},
  ...props
}) => {
  // Don't lazy load if priority is true (above-the-fold images)
  if (priority) {
    return (
      <Image
        images={images}
        filename={filename}
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  // Create a placeholder div with the same dimensions
  const placeholderElement = (
    <div
      className={className}
      style={{
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        ...style,
      }}
    >
      <div style={{ color: '#999', fontSize: '14px' }}>Loading...</div>
    </div>
  );

  return (
    <LazyLoadWrapper
      fallback={placeholderElement}
      threshold={0.1}
      rootMargin="100px"
    >
      <Image
        images={images}
        filename={filename}
        priority={false}
        sizes={sizes}
        quality={quality}
        className={className}
        style={style}
        {...props}
      />
    </LazyLoadWrapper>
  );
};

export default LazyImage;
