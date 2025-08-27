import { headers } from 'next/headers';

const SentryServerWrapper = ({ children, params }) => {
  // This runs on the server side
  if (typeof window === 'undefined') {
    try {
      // Try to import Sentry server-side
      const Sentry = require('@sentry/nextjs/server');

      // Get the current pathname from headers
      const headersList = headers();
      const pathname =
        headersList.get('x-invoke-path') ||
        headersList.get('x-matched-path') ||
        '/';

      // Set the transaction name for this route
      if (Sentry && Sentry.setTag) {
        Sentry.setTag('transaction', pathname);
        Sentry.setContext('route', {
          pathname,
          params: params?.slug || [],
          fullPath: pathname,
        });
      }
    } catch (error) {
      // Sentry might not be available in development
      console.warn(
        'Sentry not available for server-side context setting:',
        error
      );
    }
  }

  return children;
};

export default SentryServerWrapper;
