import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getStoryblokApi } from "@/lib/storyblok";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const redirectUrl = searchParams.get("redirect") || "/";
  const slug = searchParams.get("slug") || "home";

  // Replace with your actual preview token
  if (token !== "Qf9Z8O8vNFQw8drmarBGMwtt") {
    return new NextResponse("Invalid preview token", { status: 401 });
  }

  try {
    // Fetch the draft content from Storyblok
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "draft", // Fetch latest unpublished content
    });

    if (!data.story) {
      return new NextResponse("Story not found", { status: 404 });
    }

    // Set Next.js preview mode cookies using `cookies()`
    cookies().set("__prerender_bypass", "1", { httpOnly: true, path: "/" });
    cookies().set("__next_preview_data", "1", { httpOnly: true, path: "/" });

    return NextResponse.redirect(`${redirectUrl}?_storyblok_preview=true`, 307);
  } catch (error) {
    return new NextResponse(`Error fetching preview content: ${error.message}`, { status: 500 });
  }
}
