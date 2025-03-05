// app/api/exit-preview/route.js
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  // Disable Draft Mode
  draftMode().disable();

  // Redirect to the homepage or a specified route
  return NextResponse.redirect('/');
}
