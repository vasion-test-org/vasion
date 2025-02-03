import { getStoryblokApi } from "@storyblok/react/rsc";

export async function GET(req) {
  const token = req.nextUrl.searchParams.get("token");
  const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";

  if (token !== process.env.STORYBLOK_PREVIEW_TOKEN) {
    return new Response("Invalid preview token", { status: 401 });
  }

  return Response.redirect(`${redirectUrl}?_storyblok_preview=true`, 307);
}
