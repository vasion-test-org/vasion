import { draftMode } from 'next/headers';
import { getStoryblokApi } from "@/lib/storyblok";
import StoryRenderer from '@/components/renderers/StoryRenderer';

export default async function Home() {
  const { isEnabled } = draftMode();
  const story = await fetchStory("home", isEnabled);

  return (
    <div>
      <StoryRenderer story={story} />
    </div>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = 'en';
  const story = await fetchStory("home", locale);

  // if (!story) {
  //   return {
  //     title: "Home - Page Not Found",
  //     description: "The homepage could not be found.",
  //   };
  // }

  const { content } = story;
  const title = content.metadata?.title || "Default Homepage Title";
  const description = content.metadata?.description || "Default homepage description.";

  const basePath = 'https://vasion-ten.vercel.app';
  const locales = ['en', 'fr', 'de'];
  const alternateLinks = locales.reduce((acc, loc) => {
    const path = loc === 'en' ? `/` : `/${loc}/`;
    acc[loc] = `${basePath}${path}`;
    return acc;
  }, {});

  return {
    title,
    description,
    alternates: {
      canonical: alternateLinks["en"],
      languages: alternateLinks,
    },
  };
}

async function fetchStory(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const sbParams = {
    version: "draft",
    language: locale,
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return data.story;
  } catch (error) {
    console.error(`Error fetching home story: ${error.message}`);
    return null;
  }
}
