import { getStoryblokApi } from '@/lib/storyblok';

export async function fetchData(isPreview = false) {
  const storyblokApi = getStoryblokApi();
  try {
    const response = await storyblokApi.get('cdn/stories/home', {
      version: isPreview ? 'draft' : 'published',
    });

    return response;
  } catch (error) {
    console.error(`[❌ Error] Storyblok fetch failed: ${error.message}`);
    return { data: null }; // Prevents crashes by returning a safe fallback
  }
}
