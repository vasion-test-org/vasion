import { getStoryblokApi } from '@/lib/storyblok';

export async function fetchData(isPreview = false) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get('cdn/stories/home', {
    version: isPreview ? 'draft' : 'published', // Fetch draft if preview mode is enabled
  });
}
