import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';
import { headers } from 'next/headers';
import PageDataUpdater from '@/components/PageDataUpdater';
export const revalidate = 60;

export async function generateMetadata({ params }) {
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
  const currentLocale = locale; // 'en', 'fr', or 'de'

  // Always include the current page as canonical
  let canonicalPath = story.full_slug;
  if (currentLocale === 'en') {
    // Remove 'en' prefix for canonical
    canonicalPath = canonicalPath.replace(/^en\//, '');
  }
  const canonicalUrl = `${basePath}/${canonicalPath}`.replace(/\/+$/, '/');

  // Build alternate links only for published translations
  const alternateLinks = {};
  if (story.translated_slugs) {
    for (const translation of story.translated_slugs) {
      // Check if the translation is published
      const translatedStory = await fetchStory(
        translation.path,
        translation.lang
      );

      if (translatedStory) {
        alternateLinks[translation.lang] =
          `${basePath}/${translation.lang}/${translation.path}`.replace(
            /\/+$/,
            '/'
          );
      }
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLinks,
    },
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
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const host = headers().get('host');
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
