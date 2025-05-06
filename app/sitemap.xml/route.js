import { getStoryblokApi } from '@/lib/storyblok';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const storyblokApi = getStoryblokApi();
  const languages = ['en', 'de', 'fr'];

  const allStories = await storyblokApi.getAll('cdn/stories', {
    version: 'published',
  });

  const urls = allStories
    .filter((story) => !story.is_folder) // Exclude folders
    .flatMap((story) => {
      const baseSlug = story.full_slug
        .replace(/^(fr|de)\//, '')
        .replace(/\/$/, '');

      return languages.map((lang) => {
        const slug = lang === 'en' ? baseSlug : `${lang}/${baseSlug}`;
        return `
          <url>
            <loc>https://vasion.com/${slug}/</loc>
            <lastmod>${new Date(story.published_at).toISOString()}</lastmod>
            <xhtml:link 
              rel="alternate" 
              hreflang="${lang}" 
              href="https://vasion.com/${slug}/"
            />
          </url>
        `;
      });
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
