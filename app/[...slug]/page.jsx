import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { StoryblokStory } from '@storyblok/react/rsc';

import ClientSchemaWrapper from '@/components/ClientSchemaWrapper';
import PageDataUpdater from '@/components/PageDataUpdater';
import {
  buildAlternateLanguageUrls,
  buildCanonicalUrl,
  shouldIncludeSelfReferencingHreflang,
} from '@/lib/seoUtils';
import { getStoryblokApi } from '@/lib/storyblok';
export const revalidate = 3600; // Revalidate every hour for better performance

export async function generateMetadata({ params, searchParams }) {
  // Next.js 16+: params and searchParams must be awaited
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slugArray = resolvedParams.slug || [];
  const isLocalized = ['fr', 'de'].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : 'en';
  const storySlug = isLocalized
    ? slugArray?.length === 1
      ? 'home'
      : slugArray.slice(1).join('/')
    : slugArray.join('/');

  const story = await fetchStory(storySlug, locale);

  if (!story) {
    return {
      description: 'The requested page could not be found.',
      title: 'Page Not Found',
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
  if (currentLocale !== 'en' && slugArray?.length === 1) {
    canonicalPath = currentLocale;
  }

  const canonicalUrl = buildCanonicalUrl(basePath, canonicalPath);

  // Check if we should include self-referencing hreflang
  const includeSelfReferencing = shouldIncludeSelfReferencingHreflang(resolvedSearchParams);

  // Build alternate links using utility function
  const alternateLinks = await buildAlternateLanguageUrls(
    basePath,
    currentLocale,
    storySlug,
    slugArray,
    story.translated_slugs
  );

  // Remove self-referencing hreflang if UTM parameters are present
  if (!includeSelfReferencing) {
    delete alternateLinks[currentLocale];
  }

  // Check if page should be no-index, no-follow
  const shouldNoIndex = content.index === false;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLinks,
    },
    description,
    robots: shouldNoIndex ? 'noindex, nofollow' : undefined,
    title,
  };
}

async function fetchStory(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const sbParams = {
    language: locale,
    version: 'published',
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
  // Next.js 16+: params must be awaited
  const resolvedParams = await params;

  const slugArray = resolvedParams.slug || [];
  const isLocalized = ['fr', 'de'].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : 'en';
  const storySlug = isLocalized
    ? slugArray?.length === 1
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
  // Next.js 16+: headers() must be awaited
  const headersList = await headers();
  const host = headersList.get('host');
  const isPreview =
    host === 'localhost:3010' || host === 'vasion-ten.vercel.app' || host === 'vasion.vercel.app';

  const sbParams = {
    language: locale,
    version: isPreview ? 'draft' : 'published',
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return data.story;
  } catch (error) {
    if (!isPreview) {
      console.error(`[❌ Server] Error fetching published story: ${error.message}`);
      return null;
    }

    try {
      sbParams.version = 'draft';
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
      return data.story;
    } catch (draftError) {
      console.error(`[❌ Server] Error fetching draft story: ${draftError.message}`);
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
    params.push({ locale: 'en', slug: splitSlug });

    if (story.translated_slugs) {
      for (const translation of story.translated_slugs) {
        const translatedSlug = translation.path === '' ? [] : translation.path.split('/');
        params.push({
          locale: translation.lang,
          slug: [translation.lang, ...translatedSlug],
        });
      }
    }
  }

  return params;
}
