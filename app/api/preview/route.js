
// app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');   // preview secret token from query (optional)
  const slug = searchParams.get('slug') || ''; // story slug from query (e.g. "home" or "about/team")

  // Optional: verify the secret token for security 
  if ("Qf9Z8O8vNFQw8drmarBGMwtt" && secret !== "Qf9Z8O8vNFQw8drmarBGMwtt") {
    return new Response('Invalid preview token', { status: 401 });
  }

  // Enable Next.js Draft Mode (sets the preview cookie)
  draftMode().enable();  // Next.js will set __prerender_bypass cookie :contentReference[oaicite:0]{index=0}

  // Redirect to the story page (prepend "/" to slug or use home if blank)
  const redirectUrl = '/' + slug;
  redirect(redirectUrl);
}
