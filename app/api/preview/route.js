// app/api/preview/route.js
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const slug = searchParams.get('slug') || '';

  // Verify the secret token
  if (token !== "Qf9Z8O8vNFQw8drmarBGMwtt") {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Enable Draft Mode
  draftMode().enable();

  // Redirect to the specified slug
  const redirectUrl = `/${slug}`;
  return NextResponse.redirect(redirectUrl);
}
