import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret'); // preview secret token (optional)
  const slug = searchParams.get('slug') || ''; // page slug

  // Secure the preview mode by checking the secret token
  const PREVIEW_SECRET = "Qf9Z8O8vNFQw8drmarBGMwtt";
  if (PREVIEW_SECRET && secret !== PREVIEW_SECRET) {
    return new NextResponse('Invalid preview token', { status: 401 });
  }

  // Enable Next.js Draft Mode (sets preview cookie)
  draftMode().enable();

  // Redirect to the requested page (or home if no slug provided)
  const redirectUrl = `/${slug}`;
  return NextResponse.redirect(redirectUrl);
}
