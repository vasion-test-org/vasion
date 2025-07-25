'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Lazy load components that use heavy GSAP animations
const LazyGSAPComponent = ({ 
  component: Component, 
  fallback = <div>Loading...</div>,
  threshold = 0.1,
  rootMargin = '50px',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={setRef}>
      {isLoaded ? (
        <Suspense fallback={fallback}>
          <Component {...props} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

// Dynamic imports for heavy GSAP components
export const LazyVideoCarousel = dynamic(
  () => import('./VideoCarousel'),
  { 
    ssr: false,
    loading: () => <div>Loading video carousel...</div>
  }
);

export const LazyImageCarousel = dynamic(
  () => import('./ImageCarousel'),
  { 
    ssr: false,
    loading: () => <div>Loading image carousel...</div>
  }
);

export const LazyCustomerLogos = dynamic(
  () => import('./CustomerLogos'),
  { 
    ssr: false,
    loading: () => <div>Loading customer logos...</div>
  }
);

export const LazyPressTimeline = dynamic(
  () => import('./PressTimeline'),
  { 
    ssr: false,
    loading: () => <div>Loading press timeline...</div>
  }
);

export const LazyPaginatedCards = dynamic(
  () => import('./PaginatedCards'),
  { 
    ssr: false,
    loading: () => <div>Loading cards...</div>
  }
);

export default LazyGSAPComponent; 