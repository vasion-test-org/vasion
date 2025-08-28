// Utility functions for Sentry configuration to handle dynamic routes properly

/**
 * Custom Sentry integration to properly name transactions for dynamic routes
 */
export function createDynamicRouteIntegration() {
  return {
    name: 'DynamicRouteIntegration',
    setupOnce() {
      // We'll use the global event processor approach instead
      // This will be handled by the beforeSend hooks
    },
  };
}

/**
 * Helper function to manually set transaction name for a specific route
 */
export function setTransactionName(name: string) {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.setTag('transaction', name);
    (window as any).Sentry.setContext('route', { name });
  }
}

/**
 * Helper function to add route context to Sentry events
 */
export function addRouteContext(
  slug: string | string[],
  locale: string = 'en'
) {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.setContext('route', {
      slug: Array.isArray(slug) ? slug.join('/') : slug,
      locale,
      fullPath: `/${Array.isArray(slug) ? slug.join('/') : slug}`,
    });
  }
}

/**
 * Function to extract actual path from various sources for Sentry
 */
export function extractActualPath(event: any, hint: any): string | null {
  let actualPath: string | null = null;

  // Debug logging
  console.log('[Sentry Debug] Extracting path from event:', {
    transaction: event.transaction,
    hasContexts: !!event.contexts,
    hasTrace: !!event.contexts?.trace,
    hasHint: !!hint,
  });

  // Method 1: Try to get from request URL in hint
  if (hint && (hint as any).request) {
    try {
      const request = (hint as any).request;
      if (request.url) {
        const url = new URL(request.url);
        actualPath = url.pathname;
        console.log('[Sentry Debug] Found path from request URL:', actualPath);
      }
      // Also check for custom headers set by middleware
      if (request.headers) {
        const sentryRoute = request.headers.get('x-sentry-route');
        const sentryTransaction = request.headers.get('x-sentry-transaction');
        if (sentryRoute) {
          actualPath = sentryRoute;
          console.log(
            '[Sentry Debug] Found path from x-sentry-route header:',
            actualPath
          );
        } else if (sentryTransaction) {
          actualPath = sentryTransaction;
          console.log(
            '[Sentry Debug] Found path from x-sentry-transaction header:',
            actualPath
          );
        }
      }
    } catch (error) {
      console.warn('Failed to parse request URL for Sentry:', error);
    }
  }

  // Method 2: Try to get from event contexts
  if (!actualPath && event.contexts?.trace?.data?.url) {
    try {
      const url = new URL(event.contexts.trace.data.url);
      actualPath = url.pathname;
      console.log('[Sentry Debug] Found path from trace context:', actualPath);
    } catch (error) {
      console.warn('Failed to parse trace URL for Sentry:', error);
    }
  }

  // Method 3: Try to get from event tags
  if (!actualPath && event.tags) {
    const urlTag = event.tags.find(
      (tag: any) => tag.key === 'url' || tag.key === 'pathname'
    );
    if (urlTag && urlTag.value) {
      actualPath = urlTag.value;
      console.log('[Sentry Debug] Found path from event tags:', actualPath);
    }
  }

  console.log('[Sentry Debug] Final extracted path:', actualPath);
  return actualPath;
}

/**
 * Function to update Sentry event with proper transaction naming
 */
export function updateSentryEvent(event: any, actualPath: string) {
  if (actualPath) {
    event.transaction = actualPath;
    // Also update the transaction name in the event context
    if (event.contexts?.trace) {
      event.contexts.trace.op = 'pageload';
      event.contexts.trace.description = actualPath;
    }

    // Add additional context
    if (!event.contexts) {
      event.contexts = {};
    }
    if (!event.contexts.route) {
      event.contexts.route = {};
    }
    event.contexts.route.pathname = actualPath;
    event.contexts.route.fullPath = actualPath;
  }

  return event;
}
