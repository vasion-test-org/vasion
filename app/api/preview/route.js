import { getStoryblokApi } from "@/lib/storyblok";

export async function GET(req) {
  const token = req.nextUrl.searchParams.get("token");
  const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";

  if (token !== 'Qf9Z8O8vNFQw8drmarBGMwtt') {
    return new Response("Invalid preview token", { status: 401 });
  }

  return Response.redirect(`${redirectUrl}?_storyblok_preview=true`, 307);
}
