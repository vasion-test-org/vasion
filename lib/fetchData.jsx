import { getStoryblokApi } from '@/lib/storyblok';

export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get('cdn/stories/home', { version: 'draft' });
}
