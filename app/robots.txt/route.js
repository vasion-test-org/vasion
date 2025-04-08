export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://vasion.com/sitemap.xml/`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
