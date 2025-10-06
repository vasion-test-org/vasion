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

    // Monitor GTM script loading performance (safer approach)
    const monitorGTMPerformance = () => {
      if (typeof window === 'undefined' || !window.performance) return;

      // Use a more targeted approach that won't interfere with other resources
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Only monitor GTM-specific resources, not all resources
          if (entry.name.includes('googletagmanager.com') && 
              entry.initiatorType === 'script') {
            console.log(`GTM Script Load Time: ${entry.duration}ms`);

            // Warn if GTM takes too long
            if (entry.duration > 100) {
              console.warn(
                'GTM script loading is slow, consider further optimization'
              );

              // Send performance data to analytics if available
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
        // Only observe script entries to avoid conflicts with other resources
        // Also check if React Player is present to avoid conflicts
        if (!document.querySelector('[data-react-player]')) {
          observer.observe({ entryTypes: ['resource'] });
          performanceObserver = observer;
        } else {
          console.log('React Player detected, skipping GTM performance monitoring to avoid conflicts');
        }
      } catch (error) {
        console.log('Performance Observer not supported or blocked');
      }
    };

    // Monitor GTM container size
    const monitorGTMSize = () => {
      const gtmScripts = document.querySelectorAll(
        'script[src*="googletagmanager.com"]'
      );
      let totalSize = 0;
      let completedRequests = 0;

      gtmScripts.forEach((script) => {
        if (script.src) {
          fetch(script.src, { method: 'HEAD' })
            .then((response) => {
              const contentLength = response.headers.get('content-length');
              if (contentLength) {
                totalSize += parseInt(contentLength);
                console.log(`GTM Script Size: ${contentLength} bytes`);
              }
            })
            .catch((error) => {
              console.log('Could not fetch GTM script size');
            })
            .finally(() => {
              completedRequests++;
              if (completedRequests === gtmScripts.length) {
                console.log(`Total GTM Container Size: ${totalSize} bytes`);
                if (totalSize > 200000) {
                  console.warn(
                    'GTM container size is large, consider optimization'
                  );
                }
              }
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
          console.log(`DataLayer push #${pushCount}:`, args);

          // Warn if too many pushes
          if (pushCount > 50) {
            console.warn('High number of dataLayer pushes detected');
          }

          return originalDataLayerPush.apply(this, args);
        };
      }
    };

    // Run monitoring with delay to avoid conflicts with React Player
    const runMonitoring = () => {
      // Delay monitoring to ensure React Player can initialize first
      setTimeout(() => {
        monitorGTMPerformance();
        monitorGTMSize();
        monitorDataLayer();
      }, 1000); // 1 second delay
    };

    runMonitoring();

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
