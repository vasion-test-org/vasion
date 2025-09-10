'use client';

import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const reportWebVitals = (metric) => {
      // Send to analytics service (Google Analytics, etc.)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(
            metric.name === 'CLS' ? metric.value * 1000 : metric.value
          ),
          non_interaction: true,
        });
      }

      // Log to console for debugging
      console.log('Web Vital:', metric);
    };

    // Import and initialize web-vitals
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      })
      .catch((error) => {
        console.warn('Failed to load web-vitals:', error);
      });

    // Monitor resource loading performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navTiming = entry;
          console.log('Navigation timing:', {
            domContentLoaded:
              navTiming.domContentLoadedEventEnd -
              navTiming.domContentLoadedEventStart,
            loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
            totalTime: navTiming.loadEventEnd - navTiming.fetchStart,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
