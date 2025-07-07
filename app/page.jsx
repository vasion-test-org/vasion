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

export async function generateMetadata() {
  // const locale = 'en';
  const story = await fetchStory('home');
  // console.log(story)
  // if (!story) {
  //   return {
  //     title: "Home - Page Not Found",
  //     description: "The homepage could not be found.",
  //   };
  // }

  const { content } = story;
  const title = content.metadata?.title || 'Default Homepage Title';
  const description =
    content.metadata?.description || 'Default homepage description.';

  const basePath = 'https://vasion.com';
  const locales = ['en', 'fr', 'de'];
  const alternateLinks = locales.reduce((acc, loc) => {
    const path = loc === 'en' ? `/` : `/${loc}/`;
    acc[loc] = `${basePath}${path}`;
    return acc;
  }, {});

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
