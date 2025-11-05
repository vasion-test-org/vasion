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
      .filter((story) => {
        // Exclude folders
        if (story.is_folder) return false;
        
        // Exclude Next.js internal paths and API routes
        const fullSlug = story.full_slug || '';
        if (
          fullSlug.startsWith('_next/') ||
          fullSlug.startsWith('api/') ||
          fullSlug.includes('/_next/') ||
          fullSlug.includes('/api/')
        ) {
          return false;
        }
        
        return true;
      })
      .map((story) => {
        let slug = story.full_slug.replace(/\/$/, '');

        // Remove locale prefix if present
        if (locale !== 'en') {
          slug = slug.replace(new RegExp(`^${locale}/`), '');
        } else {
          slug = slug.replace(/^en\//, '');
        }

        // Always strip "home" from the slug when it's a complete segment
        // Match "home" only when it's standalone or delimited by slashes (not part of words)
        // This handles: "home", "home/", "/home", "/home/", "path/home", "home/path"
        slug = slug.replace(/^home$/, ''); // Standalone "home"
        slug = slug.replace(/^home\//, ''); // "home/" at start
        slug = slug.replace(/\/home$/, ''); // "/home" at end
        slug = slug.replace(/\/home\//, '/'); // "/home/" in middle, replace with "/"
        slug = slug.replace(/\/+$/, ''); // Remove trailing slashes

        // Build the URL with trailing slash
        // If slug is empty after processing, it's the homepage (baseUrl with trailing slash)
        const loc = slug
          ? `${baseUrls[locale]}/${slug}/`
          : `${baseUrls[locale]}/`;

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
