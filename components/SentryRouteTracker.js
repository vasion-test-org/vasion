'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SentryRouteTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if Sentry is available
    if (window.Sentry) {
      // Set the transaction name to the actual pathname
      window.Sentry.setTag('transaction', pathname);
      window.Sentry.setContext('route', {
        pathname,
        fullPath: pathname,
      });

      // Also set the transaction name if available
      if (window.Sentry.getCurrentHub) {
        const hub = window.Sentry.getCurrentHub();
        if (hub.getScope) {
          const scope = hub.getScope();
          if (scope.setTag) {
            scope.setTag('transaction', pathname);
          }
        }
      }
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default SentryRouteTracker;
