// lib/fetchData.js
import { getStoryblokApi } from "@storyblok/react/rsc";

export async function fetchData(slug, isPreview) {
  const storyblokApi = getStoryblokApi();

  // Select the correct API token for Storyblok
  const apiToken = isPreview
  ? process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN // Use the secret token for drafts
  : process.env.NEXT_PUBLIC_STORYBLOK_API_KEY; // Use the public token for published content

  if (!apiToken) {
    console.error(`[❌ Error] Missing Storyblok API Token. Check environment variables.`);
    return null;
  }

  const version = isPreview ? "draft" : "published";

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      cache: isPreview ? "no-store" : "force-cache", // Prevent caching in draft mode
      token: apiToken, // Ensure correct token is used
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
