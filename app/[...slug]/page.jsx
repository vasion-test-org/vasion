import { StoryblokStory, useStoryblokState } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";

export default async function DynamicPage({ params, searchParams }) {
  const { slug } = params;
  const slugArray = slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized ? slugArray.slice(1).join("/") : slugArray.join("/");
  const preview = searchParams?.preview === "true";

  const story = await fetchData(storySlug, locale, preview);

  if (!story) {
    notFound();
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale, preview) {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: preview ? "draft" : "published",
    language: locale,
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
