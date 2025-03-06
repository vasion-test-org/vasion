import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret'); 
  const slug = searchParams.get('slug') || ''; 

  const PREVIEW_SECRET = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_SECRET;
  if (!PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    console.error(`[❌ Error] Invalid preview token. Received: ${secret}`);
    return NextResponse.json({ message: 'Invalid preview token' }, { status: 401 });
  }

  draftMode().enable();

  const redirectUrl = new URL(`/${slug}`, request.nextUrl.origin).toString();
  console.log(`[✅ Success] Draft mode enabled. Redirecting to: ${redirectUrl}`);

  return NextResponse.redirect(redirectUrl);
}
