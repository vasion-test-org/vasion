import { getStoryblokApi } from '@/lib/storyblok';

/**
 * Fetch Storyblok data dynamically based on slug and preview mode
 */
export async function fetchData(slug = "home", isPreview = false) {
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: isPreview ? "draft" : "published",
    });

    if (!data?.story) {
      console.error(`[❌ Error] Storyblok: Story not found for slug "${slug}"`);
      return null; // Prevents crashes
    }

    console.log(`[✅ Success] Story fetched: ${data.story.full_slug}`);
    return data.story;
  } catch (error) {
    console.error(`[❌ Error] Storyblok fetch failed: ${error.message}`);
    return null;
  }
}
