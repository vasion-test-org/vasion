'use client';
import { useEffect } from 'react';

/**
 * GTM Performance Monitor Component
 * Monitors and optimizes Google Tag Manager performance
 */
const GTMPerformanceMonitor = () => {
  useEffect(() => {
    let performanceObserver = null;
    let originalDataLayerPush = null;

    // Monitor GTM script loading performance
    const monitorGTMPerformance = () => {
      if (typeof window === 'undefined' || !window.performance) return;

      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('googletagmanager.com')) {
            if (entry.duration > 100) {
              if (window.gtag) {
                window.gtag('event', 'gtm_performance_warning', {
                  event_category: 'Performance',
                  event_label: 'Slow GTM Load',
                  value: Math.round(entry.duration),
                });
              }
            }
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['resource'] });
        performanceObserver = observer;
      } catch (error) {
      }
    };

    // Monitor GTM container size
    const monitorGTMSize = () => {
      const gtmScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
      let totalSize = 0;
      let completedRequests = 0;

      gtmScripts.forEach((script) => {
        if (script.src) {
          fetch(script.src, { method: 'HEAD' })
            .then((response) => {
              const contentLength = response.headers.get('content-length');
              if (contentLength) {
                totalSize += parseInt(contentLength);
              }
            })
            .catch(() => {})
            .finally(() => {
              completedRequests++;
            });
        }
      });
    };

    // Monitor dataLayer performance
    const monitorDataLayer = () => {
      if (window.dataLayer) {
        originalDataLayerPush = window.dataLayer.push;
        let pushCount = 0;

        window.dataLayer.push = function (...args) {
          pushCount++;
          return originalDataLayerPush.apply(this, args);
        };
      }
    };

    // Run monitoring
    monitorGTMPerformance();
    monitorGTMSize();
    monitorDataLayer();

    // Cleanup function
    return () => {
      // Disconnect performance observer
      if (performanceObserver) {
        performanceObserver.disconnect();
      }

      // Restore original dataLayer.push function
      if (originalDataLayerPush && window.dataLayer) {
        window.dataLayer.push = originalDataLayerPush;
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GTMPerformanceMonitor;
