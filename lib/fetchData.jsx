
import { getStoryblokApi } from '@storyblok/react/rsc';

export async function fetchData(slug, isPreview) {
  const storyblokApi = getStoryblokApi();
  const version = isPreview ? 'draft' : 'published';

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version });
    return data.story;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
