// Sentry commented out for build without monitoring
// import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Sentry initialization commented out
  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  //   await import('./sentry.server.config');
  // }
  // if (process.env.NEXT_RUNTIME === 'edge') {
  //   await import('./sentry.edge.config');
  // }
}

// export const onRequestError = Sentry.captureRequestError;
