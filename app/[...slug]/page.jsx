import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { fetchData } from "@/lib/fetchData"; // ✅ Import only, do not redefine it
import { draftMode } from "next/headers";
import { getStoryblokApi } from "@/lib/storyblok"; // ✅ Import Storyblok API

export default async function DynamicPage({ params }) {
  const { isEnabled } = draftMode();
  const slug = params.slug ? params.slug.join('/') : 'home';
  const story = await fetchData(slug, isEnabled);

  if (!story) {
    notFound();
  }

  return <StoryblokStory story={story} />;
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
