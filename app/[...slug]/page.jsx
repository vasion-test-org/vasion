import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";

export default async function DynamicPage({ params }) {
  const { slug } = await params; 
  const slugArray = slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized ? slugArray.slice(1).join("/") : slugArray.join("/");

  // Fetch Storyblok content
  const story = await fetchData(storySlug, locale);

  if (!story) {
    notFound();
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

// Fetches Storyblok content based on slug and locale
async function fetchData(slug, locale) {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: "published", // Change to "draft" for preview
    language: locale, // Fetch the correct language version
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    if (!data.story) {
      console.error(`[❌ Server ] Story not found for slug: ${slug} and locale: ${locale}`);
      return null;
    }

    console.log(`[✅ Success] Story fetched: ${data.story.full_slug} (${locale})`);
    return data.story;
  } catch (error) {
    console.error(`[❌ Server ] Error fetching story: ${error.message}`);
    return null;
  }
}

// Generates static paths for localized routes
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/", { version: "published" });

  const params = [];

  for (const story of data.stories) {
    const slug = story.slug.split("/");

    // Generate paths for each available locale
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
