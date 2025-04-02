// lib/fetchData.js
import { getStoryblokApi } from "@/lib/storyblok";

export async function fetchData(slug, isPreview) {
  const storyblokApi = getStoryblokApi();

  const version = isPreview ? "draft" : "published";

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      cache: isPreview ? "no-store" : "force-cache", // Prevent caching in draft mode
    });

    if (!data.story) {
      console.error(`[❌ Error] Story not found: ${slug} [${version}]`);
      return null;
    }

    console.log(`[✅ Success] FetchData Story fetched: ${data.story.full_slug} [${version}]`);
    return data.story;
  } catch (error) {
    console.error(`[❌ Error] FetchData Failed to fetch Storyblok data:`, error);
    return null;
  }
}
