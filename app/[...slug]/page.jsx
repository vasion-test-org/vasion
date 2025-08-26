import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';
import { headers } from 'next/headers';
import PageDataUpdater from '@/components/PageDataUpdater';
import ClientSchemaWrapper from '@/components/ClientSchemaWrapper';
export const revalidate = 60;

export async function generateMetadata({ params, searchParams }) {
  const slugArray = params.slug || [];
  const isLocalized = ['fr', 'de'].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : 'en';
  const storySlug = isLocalized
    ? slugArray.length === 1
      ? 'home'
      : slugArray.slice(1).join('/')
    : slugArray.join('/');

  const story = await fetchStory(storySlug, locale);

  if (!story) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const { content } = story;
  const title = content.metadata?.title || 'Default Title';
  const description = content.metadata?.description || 'Default Description';

  const basePath = 'https://vasion.com';
  const currentLocale = locale;

  // Build canonical URL
  let canonicalPath = story.full_slug;
  if (currentLocale === 'en') {
    canonicalPath = canonicalPath.replace(/^en\//, '');
  }

  // For localized homepages, remove /home/ from the canonical URL
  if (currentLocale !== 'en' && slugArray.length === 1) {
    canonicalPath = currentLocale;
  }

  const canonicalUrl = `${basePath}/${canonicalPath}`.replace(/\/+$/, '');

  // Build alternate links including self-referencing
  const alternateLinks = {};

  // Add self-referencing hreflang for current page
  if (currentLocale === 'en') {
    alternateLinks['en'] = canonicalUrl;
  } else {
    // For localized homepages, don't include /home/ in the URL
    const localizedUrl =
      slugArray.length === 1
        ? `${basePath}/${currentLocale}`
        : `${basePath}/${currentLocale}/${storySlug}`;
    alternateLinks[currentLocale] = localizedUrl.replace(/\/+$/, '');
  }

  // Add other language versions if they exist
  if (story.translated_slugs) {
    for (const translation of story.translated_slugs) {
      // Check if the translation is published
      const translatedStory = await fetchStory(
        translation.path,
        translation.lang
      );

      if (translatedStory) {
        let translatedUrl;
        if (translation.lang === 'en') {
          // For English translations, remove /home/ if it's a homepage
          const path = translation.path === 'home' ? '' : translation.path;
          translatedUrl = `${basePath}/${path}`.replace(/\/+$/, '');
        } else {
          // For other languages, handle homepages correctly
          const path =
            translation.path === 'home'
              ? translation.lang
              : `${translation.lang}/${translation.path}`;
          translatedUrl = `${basePath}/${path}`.replace(/\/+$/, '');
        }

        alternateLinks[translation.lang] = translatedUrl;
      }
    }
  }

  // Always ensure English version is included for non-English pages
  if (currentLocale !== 'en') {
    // Try to get the English version from translated_slugs first
    let englishUrl = null;
    if (story.translated_slugs) {
      const englishTranslation = story.translated_slugs.find(
        (t) => t.lang === 'en'
      );
      if (englishTranslation) {
        // For English translations, remove /home/ if it's a homepage
        const path =
          englishTranslation.path === 'home' ? '' : englishTranslation.path;
        englishUrl = `${basePath}/${path}`.replace(/\/+$/, '');
      }
    }

    // If no English translation found, construct the English URL
    if (!englishUrl) {
      // For localized homepages, the English version should point to root
      if (slugArray.length === 1) {
        englishUrl = basePath;
      } else {
        englishUrl = `${basePath}/${storySlug}`.replace(/\/+$/, '');
      }
    }

    alternateLinks['en'] = englishUrl;
  }

  // Always set x-default to point to the English version
  const englishVersion = alternateLinks['en'];
  if (englishVersion) {
    alternateLinks['x-default'] = englishVersion;
  }

  // Check if page should be no-index, no-follow
  const shouldNoIndex = content.index === false;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLinks,
    },
    robots: shouldNoIndex ? 'noindex, nofollow' : undefined,
  };
}

async function fetchStory(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const sbParams = {
    version: 'published',
    language: locale,
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return data.story;
  } catch (error) {
    console.error(`Error fetching story: ${error.message}`);
    return null;
  }
}

export default async function DynamicPage({ params }) {
  const slugArray = params.slug || [];
  const isLocalized = ['fr', 'de'].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : 'en';
  const storySlug = isLocalized
    ? slugArray.length === 1
      ? 'home'
      : slugArray.slice(1).join('/')
    : slugArray.join('/');

  const story = await fetchData(storySlug, locale);

  if (!story) {
    return notFound();
  }

  return (
    <div>
      <PageDataUpdater story={story} />
      <ClientSchemaWrapper />
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const headersList = await headers();
  const host = headersList.get('host');
  const isPreview =
    host === 'localhost:3010' ||
    host === 'vasion-ten.vercel.app' ||
    host === 'vasion.vercel.app';

  const sbParams = {
    version: isPreview ? 'draft' : 'published',
    language: locale,
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return data.story;
  } catch (error) {
    if (!isPreview) {
      console.error(
        `[❌ Server] Error fetching published story: ${error.message}`
      );
      return null;
    }

    try {
      sbParams.version = 'draft';
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
      return data.story;
    } catch (draftError) {
      console.error(
        `[❌ Server] Error fetching draft story: ${draftError.message}`
      );
      return null;
    }
  }
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: 'published',
  });

  const params = [];

  for (const story of data.stories) {
    const slug = story.slug;
    const splitSlug = slug === 'home' ? [] : slug.split('/');
    params.push({ slug: splitSlug, locale: 'en' });

    if (story.translated_slugs) {
      for (const translation of story.translated_slugs) {
        const translatedSlug =
          translation.path === '' ? [] : translation.path.split('/');
        params.push({
          slug: [translation.lang, ...translatedSlug],
          locale: translation.lang,
        });
      }
    }
  }

  return params;
}
