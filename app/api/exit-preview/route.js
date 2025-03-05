import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Optional: Extract slug from query params (not needed for clearing preview)
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "/"; // Default to home if no slug is provided

  // Clear the preview mode cookies
  cookies().delete("__prerender_bypass");
  cookies().delete("__next_preview_data");

  // Redirect to the slug (or homepage if not provided)
  return NextResponse.redirect(slug, 307);
}
