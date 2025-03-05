import { StoryblokStory, useStoryblokState } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";
import { useStoryblokState } from "@storyblok/react";

export default async function DynamicPage({ params, searchParams }) {
  const { slug } = params; 
  const slugArray = slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized ? slugArray.slice(1).join("/") : slugArray.join("/");
  const preview = searchParams?.preview === "true";

  // Check if Storyblok Preview Mode is enabled
  const isPreview = searchParams?._storyblok_preview === "true";

  // Fetch Storyblok content
  let story = await fetchData(storySlug, locale, isPreview);

  if (!story) {
    notFound();
  }

  // Enable real-time updates in Storyblok's Visual Editor
  story = useStoryblokState(story);

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

// Fetches Storyblok content based on slug, locale, and preview mode
async function fetchData(slug, locale, isPreview) {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: isPreview ? "draft" : "published", // Switches between draft and published versions
    language: locale, // Fetches the correct language version
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    if (!data.story) {
      console.error(`[❌ Server] Story not found for slug: ${slug} and locale: ${locale}`);
      return null;
    }

    console.log(`[✅ Success] Story fetched: ${data.story.full_slug} (${locale}) [${preview ? "Draft" : "Published"}]`);
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

  console.log("Generated Static Params:", params);
  return params;
}
