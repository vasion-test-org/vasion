import { fetchData } from '@/lib/fetchData';
import {useStoryblokState } from '@storyblok/react';  // Update import
import { draftMode } from 'next/headers';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {
  const { isEnabled } = draftMode(); // Check if draft mode is enabled

  // Fetch Storyblok content based on draft mode status
  const initialStory = await fetchData("home", isEnabled);

  if (!initialStory) {
    return <h1>Homepage Not Found</h1>;
  }

  // Enable real-time editing in Storyblok Visual Editor
  const story = useStoryblokState(initialStory);

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

// Ensure the page is dynamically rendered when draft mode is enabled
export const dynamic = "force-dynamic";
