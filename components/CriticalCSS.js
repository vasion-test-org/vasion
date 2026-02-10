'use client';

import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadCSS = (href, media = 'all') => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media;
      // Use the media="print" trick for non-critical CSS
      if (media === 'all') {
        link.media = 'print';
        link.onload = function () {
          this.media = 'all';
        };
      }

      document.head.appendChild(link);
    };

    // Load non-critical stylesheets after page load
    const loadNonCriticalCSS = () => {
      // Add any non-critical CSS files here
      // loadCSS('/path/to/non-critical.css');
    };

    // Load after a short delay to prioritize critical rendering
    const timer = setTimeout(loadNonCriticalCSS, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default CriticalCSS;
