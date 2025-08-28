// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { extractActualPath, updateSentryEvent } from './lib/sentryUtils';

Sentry.init({
  dsn: 'https://09f9acc311b7fa710a017a9d751987c5@o4509917808885760.ingest.us.sentry.io/4509917809737728',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Add beforeSend to properly name transactions for dynamic routes
  beforeSend(event, hint) {
    // Handle dynamic route naming for catch-all routes
    if (event.transaction && event.transaction.includes('[...slug]')) {
      console.log('[Sentry Server] Processing dynamic route event:', {
        originalTransaction: event.transaction,
        eventType: event.type,
        hasHint: !!hint,
      });

      const actualPath = extractActualPath(event, hint);
      if (actualPath) {
        console.log(
          '[Sentry Server] Updating transaction from',
          event.transaction,
          'to',
          actualPath
        );
        updateSentryEvent(event, actualPath);
      } else {
        console.log(
          '[Sentry Server] Could not extract actual path for transaction:',
          event.transaction
        );
      }
    }

    return event;
  },

  // Add beforeSendTransaction to handle performance transactions
  beforeSendTransaction(event) {
    console.log('[Sentry Server] beforeSendTransaction called with event:', {
      type: event.type,
      transaction: event.transaction,
      op: event.contexts?.trace?.op,
      description: event.contexts?.trace?.description,
      timestamp: event.timestamp,
      event_id: event.event_id,
    });

    // Handle dynamic route naming for catch-all routes in performance transactions
    if (event.transaction && event.transaction.includes('[...slug]')) {
      console.log('[Sentry Server] Processing performance transaction:', {
        originalTransaction: event.transaction,
        eventType: event.type,
        op: event.contexts?.trace?.op,
      });

      // For performance transactions, we need to extract path differently
      let actualPath: string | null = null;

      // Try to get from event contexts
      if (event.contexts?.trace?.data?.url) {
        try {
          const url = new URL(event.contexts.trace.data.url);
          actualPath = url.pathname;
          console.log(
            '[Sentry Server] Found path from trace context:',
            actualPath
          );
        } catch (error) {
          console.warn('Failed to parse trace URL for Sentry:', error);
        }
      }

      // Also check for custom headers in the trace data
      if (!actualPath && event.contexts?.trace?.data?.headers) {
        const headers = event.contexts.trace.data.headers;
        console.log('[Sentry Server] Checking headers for path:', headers);

        if (headers['x-sentry-route']) {
          actualPath = headers['x-sentry-route'];
          console.log(
            '[Sentry Server] Found path from x-sentry-route header:',
            actualPath
          );
        } else if (headers['x-sentry-transaction']) {
          actualPath = headers['x-sentry-transaction'];
          console.log(
            '[Sentry Server] Found path from x-sentry-transaction header:',
            actualPath
          );
        }
      }

      if (actualPath) {
        console.log(
          '[Sentry Server] Updating performance transaction from',
          event.transaction,
          'to',
          actualPath
        );
        event.transaction = actualPath;
        if (event.contexts?.trace) {
          event.contexts.trace.description = actualPath;
        }
      } else {
        console.log(
          '[Sentry Server] Could not extract actual path for performance transaction:',
          event.transaction
        );
        // Log all available data for debugging
        console.log(
          '[Sentry Server] Full event context:',
          JSON.stringify(event.contexts, null, 2)
        );
      }
    }

    return event;
  },
});
