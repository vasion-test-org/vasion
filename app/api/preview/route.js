import { getStoryblokApi } from "@/lib/storyblok";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.nextUrl.searchParams.get("token");
  const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";

  // Replace with your actual preview token
  if (token !== "Qf9Z8O8vNFQw8drmarBGMwtt") {
    return new NextResponse("Invalid preview token", { status: 401 });
  }

  // Extract the slug from the redirect URL
  const url = new URL(req.nextUrl);
  const slug = url.searchParams.get("slug") || "home";

  try {
    // Fetch the draft content from Storyblok
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "draft", // Ensures we get the latest unpublished content
    });

    if (!data.story) {
      return new NextResponse("Story not found", { status: 404 });
    }

    // Set Next.js Preview Mode
    const response = NextResponse.redirect(`${redirectUrl}?_storyblok_preview=true`, 307);
    response.cookies.set("__prerender_bypass", "1", { httpOnly: true, path: "/" });
    response.cookies.set("__next_preview_data", "1", { httpOnly: true, path: "/" });

    return response;
  } catch (error) {
    return new NextResponse(`Error fetching preview content: ${error.message}`, { status: 500 });
  }
}
