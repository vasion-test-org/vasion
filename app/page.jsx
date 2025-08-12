import { draftMode } from 'next/headers';
import { getStoryblokApi } from '@/lib/storyblok';
import StoryRenderer from '@/components/renderers/StoryRenderer';
import PageDataUpdater from '@/components/PageDataUpdater';

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

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const story = await fetchStory('home');

  const { content } = story;
  const title = content.metadata?.title || 'Default Homepage Title';
  const description =
    content.metadata?.description || 'Default homepage description.';

  const basePath = 'https://vasion.com';
  const locales = ['en', 'fr', 'de'];

  // Build alternate links for all locales
  const alternateLinks = {};
  for (const loc of locales) {
    // For homepage, we don't want /home/ in the URL
    const path = loc === 'en' ? '' : `/${loc}`;
    alternateLinks[loc] = `${basePath}${path}`;
  }

  // Add x-default pointing to English version
  alternateLinks['x-default'] = alternateLinks['en'];

  // Check if page should be no-index, no-follow
  const shouldNoIndex = content.index === false;

  return {
    title,
    description,
    alternates: {
      canonical: alternateLinks['en'],
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
