import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret'); // Preview secret token
  const slug = searchParams.get('slug') || ''; // Default to an empty slug

  // Secure preview mode by checking the secret token
  const PREVIEW_SECRET = process.env.STORYBLOK_PREVIEW_SECRET;
  if (!PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    console.error(`[❌ Error] Invalid preview token. Received: ${secret}`);
    return NextResponse.json({ message: 'Invalid preview token' }, { status: 401 });
  }

  // Enable Next.js Draft Mode (sets preview cookie)
  draftMode().enable();

  // Fix: Use absolute URL for redirection
  const redirectUrl = new URL(`/${slug}`, request.nextUrl.origin).toString();
  console.log(`[✅ Success] Draft mode enabled. Redirecting to: ${redirectUrl}`);

  return NextResponse.redirect(redirectUrl);
}
