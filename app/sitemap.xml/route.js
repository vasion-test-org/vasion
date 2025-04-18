import { getStoryblokApi } from "@/lib/storyblok";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const storyblokApi = getStoryblokApi();

  const allStories = await storyblokApi.getAll("cdn/stories", {
    version: "draft",
  });

  const urls = allStories
    .filter((story) => !story.is_folder) // Exclude folders
    .map((story) => {
      const slug = story.full_slug.replace(/\/$/, "");
      return `
        <url>
          <loc>https://vasion.com/${slug}/</loc>
          <lastmod>${new Date(story.published_at).toISOString()}</lastmod>
        </url>
      `;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
