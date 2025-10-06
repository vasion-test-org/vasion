import { draftMode } from 'next/headers';
import { getStoryblokApi } from '@/lib/storyblok';
import StoryRenderer from '@/components/renderers/StoryRenderer';
import PageDataUpdater from '@/components/PageDataUpdater';
import {
  shouldIncludeSelfReferencingHreflang,
  buildCanonicalUrl,
} from '@/lib/seoUtils';

export default async function Home() {
  const { isEnabled } = draftMode();
  const story = await fetchStory('home', isEnabled);

  return (
    <div>
      <PageDataUpdater story={story} />
      <StoryRenderer story={story} />
    </div>
  );
}

// Use static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ searchParams }) {
  const story = await fetchStory('home');

  const { content } = story;
  const title = content.metadata?.title || 'Default Homepage Title';
  const description =
    content.metadata?.description || 'Default homepage description.';

  const basePath = 'https://vasion.com';
  const locales = ['en', 'fr', 'de'];

  // Check if we should include self-referencing hreflang
  const includeSelfReferencing =
    shouldIncludeSelfReferencingHreflang(searchParams);

  // Build alternate links for all locales
  const alternateLinks = {};
  for (const loc of locales) {
    // For homepage, we don't want /home/ in the URL
    const path = loc === 'en' ? '' : loc;
    alternateLinks[loc] = buildCanonicalUrl(basePath, path);
  }

  // Add x-default pointing to English version
  alternateLinks['x-default'] = alternateLinks['en'];

  // Remove self-referencing hreflang if UTM parameters are present
  if (!includeSelfReferencing) {
    delete alternateLinks['en'];
  }

  // Check if page should be no-index, no-follow
  const shouldNoIndex = content.index === false;

  return {
    title,
    description,
    alternates: {
      canonical: alternateLinks['en'] || buildCanonicalUrl(basePath),
      languages: alternateLinks,
    },
    robots: shouldNoIndex ? 'noindex, nofollow' : undefined,
  };
}

import { headers } from 'next/headers';

async function fetchStory(slug, locale = 'en') {
  const storyblokApi = getStoryblokApi();
  const host = headers().get('host');
  const isPreview = host === 'localhost:3000' || host?.includes('vercel.app');

  const sbParams = {
    version: isPreview ? 'draft' : 'published',
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
