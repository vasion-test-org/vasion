import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';
import { headers } from 'next/headers';
import PageNotFoundModal from '../components/PageNotFoundModal';

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
  const locales = ['en', 'fr', 'de'];
  const alternateLinks = locales.reduce((acc, loc) => {
    const path =
      loc === 'en' ? `/${story.full_slug}` : `/${loc}/${story.full_slug}`;
    acc[loc] = `${basePath}${path}`;
    return acc;
  }, {});

  return {
    title,
    description,
    alternates: {
      canonical: alternateLinks[locale],
      languages: alternateLinks,
    },
  };
}

async function fetchStory(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const sbParams = {
    version: 'draft',
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
    return <PageNotFoundModal locale={locale} />;
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const host = headers().get('host');
  const isPreview = host === 'localhost:3010' || host === 'vasion-ten.vercel.app' || host === 'vasion.vercel.app';

  const sbParams = {
    version: isPreview ? 'draft' : 'published',
    language: locale,
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
    version: 'draft',
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
