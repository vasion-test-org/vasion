export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /config
Disallow: /fr/config
Disallow: /de/config
Disallow: /api/
Disallow: /go/
Disallow: /fr/go/
Disallow: /de/go/
Disallow: /_next/static/chunks/
Allow: /_next/static/css/
Allow: /_next/static/media/
Sitemap: https://vasion.com/sitemap.xml`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
