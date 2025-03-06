import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";

export const revalidate = 60; // Revalidate published pages every 60s

export default async function DynamicPage({ params }) {
  const { slug } = params;
  const slugArray = slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized ? slugArray.slice(1).join("/") : slugArray.join("/");

  // First, check if the story exists in published mode
  let story = await fetchData(storySlug, locale, "published");

  // If not found, check the draft version
  if (!story) {
    story = await fetchData(storySlug, locale, "draft");
  }

  // If still not found, return a 404 page
  if (!story) {
    return notFound();
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale, version) {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: version,
    language: locale,
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    if (!data.story) {
      console.error(`[❌ Server] Story not found for slug: ${slug} and locale: ${locale}`);
      return null;
    }

    console.log(`[✅ Success] Story fetched: ${data.story.full_slug} (${locale}) [${version}]`);
    return data.story;
  } catch (error) {
    console.error(`[❌ Server] Error fetching story: ${error.message}`);
    return null;
  }
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/", { version: "published" });

  const params = [];

  for (const story of data.stories) {
    const slug = story.slug.split("/");

    params.push({ slug, locale: "en" });

    if (story.translated_slugs) {
      for (const translation of story.translated_slugs) {
        params.push({ slug: translation.path.split("/"), locale: translation.lang });
      }
    }
  }

  return params;
}
