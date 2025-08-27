// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { extractActualPath, updateSentryEvent } from '@/lib/sentryUtils';

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
      console.log('[Sentry Edge] Processing dynamic route event:', {
        originalTransaction: event.transaction,
        eventType: event.type,
        hasHint: !!hint,
      });

      const actualPath = extractActualPath(event, hint);
      if (actualPath) {
        console.log(
          '[Sentry Edge] Updating transaction from',
          event.transaction,
          'to',
          actualPath
        );
        updateSentryEvent(event, actualPath);
      } else {
        console.log(
          '[Sentry Edge] Could not extract actual path for transaction:',
          event.transaction
        );
      }
    }

    return event;
  },
});
