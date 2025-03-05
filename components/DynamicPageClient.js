'use client';

import { useEffect, useState } from 'react';
import { StoryblokStory, useStoryblokState } from '@storyblok/react/rsc';

export default function DynamicPageClient({ initialStory }) {
  // Enable live updates in Storyblok Visual Editor
  const liveStory = useStoryblokState(initialStory);

  if (!liveStory) {
    return <h1>Page Not Found</h1>;
  }

  return (
    <div>
      <StoryblokStory story={liveStory} />
    </div>
  );
}
