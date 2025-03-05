'use client';

import { useEffect, useState } from 'react';
import { StoryblokStory, useStoryblokState } from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';
import { fetchData } from '@/lib/fetchData';

export default function Home() {
  const { isEnabled } = draftMode(); // Check if draft mode is enabled
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function loadStory() {
      const fetchedStory = await fetchData("home", isEnabled);
      setStory(fetchedStory);
    }

    loadStory();
  }, [isEnabled]);

  // Enable real-time updates in Storyblok Visual Editor
  const liveStory = useStoryblokState(story);

  if (!liveStory) {
    return <h1>Homepage Not Found</h1>;
  }

  return (
    <div>
      <StoryblokStory story={liveStory} />
    </div>
  );
}
