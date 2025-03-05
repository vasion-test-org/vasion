import { NextResponse } from "next/server";
import { getStoryblokApi } from "@/lib/storyblok";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const redirectPath = searchParams.get("redirect") || "/";
  const slug = searchParams.get("slug") || "home";

  // Replace with your actual preview token
  if (token !== "Qf9Z8O8vNFQw8drmarBGMwtt") {
    return new NextResponse("Invalid preview token", { status: 401 });
  }

  try {
    // Fetch the draft content from Storyblok
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "draft",
    });

    if (!data.story) {
      return new NextResponse("Story not found", { status: 404 });
    }

    // ✅ Fix: Use `new Headers()` instead of `cookies()`
    const headers = new Headers();
    headers.append("Set-Cookie", `__prerender_bypass=1; Path=/; HttpOnly`);
    headers.append("Set-Cookie", `__next_preview_data=1; Path=/; HttpOnly`);

    // ✅ Ensure an absolute URL for redirect
    const absoluteRedirectUrl = new URL(`${redirectPath}?_storyblok_preview=true`, req.nextUrl.origin).toString();

    return NextResponse.redirect(absoluteRedirectUrl, { status: 307, headers });
  } catch (error) {
    console.error(`[❌ Error] Fetching Storyblok Preview: ${error.message}`);
    return new NextResponse(`Error fetching preview content: ${error.message}`, { status: 500 });
  }
}
