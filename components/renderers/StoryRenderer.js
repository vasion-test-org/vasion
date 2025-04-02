'use client';

import { useStoryblokState } from '@storyblok/react';
import { StoryblokStory } from '@storyblok/react/rsc';

export default function StoryRenderer({ story }) {
  const liveStory = useStoryblokState(story);

  return <StoryblokStory story={liveStory} />;
}
