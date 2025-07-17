'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function UTMHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if there are UTM parameters in the URL
    const utmParams = new URLSearchParams();
    let hasUTMParams = false;

    // Extract UTM parameters from current URL
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.set(key, value);
        hasUTMParams = true;
      }
    }

    // If UTM parameters exist, store them and update metadata
    if (hasUTMParams) {
      // Store UTM parameters in localStorage for future use
      const utmData = {
        params: Object.fromEntries(utmParams.entries()),
        timestamp: Date.now(),
        path: pathname,
      };
      localStorage.setItem('utm_data', JSON.stringify(utmData));

      // Update canonical and hreflang tags to include UTM parameters
      updateMetaTags(utmParams);
    } else {
      // Check if we have stored UTM data and should preserve it
      const storedUTM = localStorage.getItem('utm_data');
      if (storedUTM) {
        const utmData = JSON.parse(storedUTM);
        const timeSinceStored = Date.now() - utmData.timestamp;

        // Keep UTM data for 30 minutes (1800000 ms)
        if (timeSinceStored < 1800000) {
          const storedUTMParams = new URLSearchParams();
          Object.entries(utmData.params).forEach(([key, value]) => {
            storedUTMParams.set(key, value);
          });
          updateMetaTags(storedUTMParams);
        } else {
          // Clear old UTM data
          localStorage.removeItem('utm_data');
        }
      }
    }
  }, [searchParams, router, pathname]);

  const updateMetaTags = (utmParams) => {
    const utmString = utmParams.toString();
    const queryString = utmString ? `?${utmString}` : '';

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = canonical.href + queryString;
    }

    // Update hreflang tags
    const hreflangTags = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    hreflangTags.forEach((tag) => {
      tag.href = tag.href + queryString;
    });

    // Update x-default tag
    const xDefaultTag = document.querySelector(
      'link[rel="alternate"][hreflang="x-default"]'
    );
    if (xDefaultTag) {
      xDefaultTag.href = xDefaultTag.href + queryString;
    }
  };

  // This component doesn't render anything
  return null;
}
