import { getStoryblokApi } from '@/lib/storyblok';

// export const dynamic = "force-dynamic";
export const revalidate = 21600;

const locales = ['en', 'de', 'fr'];
const baseUrls = {
  en: 'https://vasion.com',
  de: 'https://vasion.com/de',
  fr: 'https://vasion.com/fr',
};

export async function GET() {
  const storyblokApi = getStoryblokApi();
  const allUrls = [];

  for (const locale of locales) {
    const stories = await storyblokApi.getAll('cdn/stories', {
      version: 'published',
      language: locale,
    });

    const urls = stories
      .filter((story) => !story.is_folder)
      .map((story) => {
        const slug = story.full_slug.replace(/\/$/, '');
        const loc =
          locale === 'en'
            ? `${baseUrls[locale]}/${slug}/`
            : `${baseUrls[locale]}/${slug.replace(`${locale}/`, '')}/`;

        return `
          <url>
            <loc>${loc}</loc>
            <lastmod>${new Date(story.published_at).toISOString()}</lastmod>
          </url>
        `;
      });

    allUrls.push(...urls);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
