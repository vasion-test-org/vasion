'use client';

import { useEffect, useRef, useState } from 'react';

const LazyLoadWrapper = ({
  children,
  className = '',
  fallback = null,
  rootMargin = '50px',
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after first load
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div className={className} ref={elementRef} {...props}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazyLoadWrapper;
