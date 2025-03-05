// lib/fetchData.js
import { getStoryblokApi } from '@/lib/storyblok';

export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  const sbParams = { version: 'draft' };
  return storyblokApi.get('cdn/stories/home', sbParams);
}
