export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /config
Disallow: /fr/config
Disallow: /de/config
Sitemap: https://vasion.com/sitemap.xml/`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
