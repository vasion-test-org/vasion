import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;

  // Create a response
  const response = NextResponse.next();

  // Add custom headers that Sentry can use to identify the actual route
  response.headers.set('x-sentry-route', pathname);
  response.headers.set('x-sentry-transaction', pathname);

  return response;
}

export const config = {
  // Apply middleware to all routes except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - monitoring (Sentry tunnel)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|monitoring).*)',
  ],
};
