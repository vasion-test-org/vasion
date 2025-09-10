/**
 * Google Tag Manager optimization utilities for better TBT performance
 */

/**
 * Optimized GTM initialization with performance improvements
 */
export const initializeOptimizedGTM = () => {
  // Prevent multiple initializations
  if (window.gtmLoaded) return;
  window.gtmLoaded = true;

  // Initialize dataLayer early to prevent blocking
  window.dataLayer = window.dataLayer || [];

  // Push initial GTM event
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  // Create optimized GTM script
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WMKX59W';

  // Add performance optimizations
  script.crossOrigin = 'anonymous';
  script.setAttribute('data-gtm-optimized', 'true');

  // Insert script in head for better performance
  document.head.appendChild(script);
};

/**
 * Deferred GTM initialization - loads GTM after user interaction
 */
export const initializeDeferredGTM = () => {
  let gtmInitialized = false;

  const initGTM = () => {
    if (gtmInitialized) return;
    gtmInitialized = true;

    // Remove event listeners after initialization
    const events = ['click', 'scroll', 'mousemove', 'keydown'];
    events.forEach((event) => {
      document.removeEventListener(event, initGTM);
    });

    initializeOptimizedGTM();
  };

  // Load GTM on first user interaction
  const events = ['click', 'scroll', 'mousemove', 'keydown'];
  events.forEach((event) => {
    document.addEventListener(event, initGTM, { passive: true });
  });
};

/**
 * Conditional GTM loading based on page importance
 */
export const initializeConditionalGTM = () => {
  // Only load GTM on important pages or after user engagement
  const isImportantPage = () => {
    const importantPaths = ['/', '/contact', '/demo', '/pricing'];
    return importantPaths.some((path) => window.location.pathname === path);
  };

  const hasUserEngagement = () => {
    // Check for user engagement signals
    return (
      window.sessionStorage.getItem('userEngaged') === 'true' ||
      document.querySelector('[data-user-interacted]') !== null
    );
  };

  if (isImportantPage() || hasUserEngagement()) {
    initializeOptimizedGTM();
  } else {
    // Defer for less important pages
    initializeDeferredGTM();
  }
};

/**
 * Optimized Google Analytics loading
 */
export const initializeOptimizedGA = () => {
  if (window.gtagLoaded) return;
  window.gtagLoaded = true;

  // Initialize gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());

  // Load GA script with optimizations
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-407WZSYMN0';
  script.crossOrigin = 'anonymous';

  document.head.appendChild(script);
};

/**
 * Lazy load Google Ads conversion scripts
 */
export const initializeLazyGoogleAds = () => {
  const adsScripts = [
    'https://www.googletagmanager.com/gtag/js?id=AW-977173538&cx=c&gtm=4e5981',
    'https://www.googletagmanager.com/gtag/js?id=AW-11184646465&cx=c&gtm=4e5981',
    'https://www.googletagmanager.com/gtag/js?id=AW-11184713828&cx=c&gtm=4e5981',
  ];

  // Load Google Ads scripts only when needed (e.g., on conversion pages)
  const loadAdsScripts = () => {
    adsScripts.forEach((src) => {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = src;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    });
  };

  // Load on conversion-related pages or user interaction
  const isConversionPage = () => {
    const conversionPaths = [
      '/thank-you',
      '/conversion',
      '/purchase',
      '/signup',
    ];
    return conversionPaths.some((path) =>
      window.location.pathname.includes(path)
    );
  };

  if (isConversionPage()) {
    loadAdsScripts();
  } else {
    // Defer until user shows conversion intent
    const events = ['click', 'scroll', 'mousemove'];
    events.forEach((event) => {
      document.addEventListener(event, loadAdsScripts, {
        once: true,
        passive: true,
      });
    });
  }
};

/**
 * GTM container size monitoring
 */
export const monitorGTMSize = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('googletagmanager.com')) {
          console.log(`GTM Script Load Time: ${entry.duration}ms`);

          // Warn if GTM takes too long
          if (entry.duration > 100) {
            console.warn('GTM script loading is slow, consider optimization');
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
};

/**
 * Clean up unused GTM tags (to be called periodically)
 */
export const auditGTMTags = () => {
  // This would typically be done in GTM interface, but we can log suggestions
  console.log('GTM Audit Suggestions:');
  console.log('- Review and remove unused tags');
  console.log('- Consolidate similar tracking scripts');
  console.log('- Use triggers to fire tags only when needed');
  console.log('- Consider server-side tagging for heavy tags');
};
