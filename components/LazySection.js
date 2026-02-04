'use client';

import LazyLoadWrapper from './LazyLoadWrapper';

const LazySection = ({
  children,
  className = '',
  rootMargin = '50px',
  threshold = 0.1,
  ...props
}) => {
  return (
    <LazyLoadWrapper className={className} rootMargin={rootMargin} threshold={threshold} {...props}>
      {children}
    </LazyLoadWrapper>
  );
};

export default LazySection;
