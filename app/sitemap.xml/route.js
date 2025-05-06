import { getStoryblokApi } from "@/lib/storyblok";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const storyblokApi = getStoryblokApi();
  const locales = ["en", "de", "fr"]; // Add your supported locales here
  const baseUrl = "https://vasion.com";

  const urlEntries = [];

  for (const locale of locales) {
    const stories = await storyblokApi.getAll("cdn/stories", {
      version: "published",
      language: locale,
    });

    stories
      .filter((story) => !story.is_folder)
      .forEach((story) => {
        const slug = story.full_slug.replace(/\/$/, "");
        const loc =
          locale === "en"
            ? `${baseUrl}/${slug}/`
            : `${baseUrl}/${locale}/${slug}/`;

        urlEntries.push(`
          <url>
            <loc>${loc}</loc>
            <lastmod>${new Date(story.published_at).toISOString()}</lastmod>
            <xhtml:link rel="alternate" hreflang="${locale}" href="${loc}"/>
          </url>
        `);
      });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urlEntries.join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
