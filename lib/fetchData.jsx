import { getStoryblokApi } from '@/lib/storyblok';

export async function fetchData() {
  console.log("Fetching data with token:", process.env.NEXT_PUBLIC_STORYBLOK_TOKEN);
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get('cdn/stories/home', { version: 'draft' });
}
