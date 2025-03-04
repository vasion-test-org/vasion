
import { getStoryblokApi, ISbStoriesParams, StoryblokClient } from '@storyblok/react';

export async function fetchData() {
  let sbParams: ISbStoriesParams = { version: 'draft' };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
