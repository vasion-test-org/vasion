import { getStoryblokApi } from "@/lib/storyblok";

export async function GET() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", { version: "published" });

  const urls = data.stories.map((story) => {
    return `
      <url>
        <loc>https://vasion-ten.vercel.app/${story.full_slug}</loc>
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
    },
  });
}
