'use client';

import LazyLoadWrapper from './LazyLoadWrapper';

const LazySection = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}) => {
  return (
    <LazyLoadWrapper
      threshold={threshold}
      rootMargin={rootMargin}
      className={className}
      {...props}
    >
      {children}
    </LazyLoadWrapper>
  );
};

export default LazySection;
