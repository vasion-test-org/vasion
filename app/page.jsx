import { fetchData } from '@/lib/fetchData';
import { StoryblokStory } from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';

export default async function Home() {
  const { isEnabled } = await draftMode();
  const story = await fetchData("home", isEnabled);

  if (!story) {
    return <h1>Homepage Not Found</h1>;
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

// ✅ Force Dynamic Rendering to prevent Vercel caching issues
export const dynamic = "force-dynamic";
