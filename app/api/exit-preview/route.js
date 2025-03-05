export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/${slug}`, 
      "Set-Cookie": "__prerender_bypass=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0",
    },
  });
}
