'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * LazyHydration component that defers hydration until the component is in viewport
 * This helps reduce Total Blocking Time by not hydrating components until needed
 */
const LazyHydration = ({
  children,
  fallback = null,
  rootMargin = '50px',
  ssr = true,
  threshold = 0.1,
}) => {
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Small delay to ensure smooth rendering
          setTimeout(() => setShouldHydrate(true), 100);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // If SSR is disabled, render children immediately
  if (!ssr) {
    return <div ref={elementRef}>{children}</div>;
  }

  // If not intersecting yet, render fallback or placeholder
  if (!isIntersecting) {
    return (
      <div ref={elementRef} style={{ minHeight: '200px' }}>
        {fallback}
      </div>
    );
  }

  // If intersecting but not hydrated yet, render children without hydration
  if (!shouldHydrate) {
    return (
      <div suppressHydrationWarning ref={elementRef}>
        {children}
      </div>
    );
  }

  // Fully hydrated
  return <div ref={elementRef}>{children}</div>;
};

export default LazyHydration;
