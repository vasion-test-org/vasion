"use client";

import { StoryblokStory, useStoryblokState } from "@storyblok/react";

export default function ClientStory({ initialStory }) {
  const story = useStoryblokState(initialStory);

  if (!story) {
    return <div>404 – Story not found</div>;
  }

  return <StoryblokStory story={story} />;
}
