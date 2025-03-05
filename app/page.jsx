import { fetchData } from '@/lib/fetchData';
import { StoryblokStory } from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';

export default async function Home() {
  const { isEnabled } = await draftMode(); // Await draft mode
  const { data } = await fetchData(isEnabled);

  // ✅ Handle the case where Storyblok doesn't return a story
  if (!data?.story) {
    return <h1>Homepage Not Found</h1>; // Prevents build errors
  }

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}

// ✅ Force Next.js to use Dynamic Rendering (Fix for Static Prerendering)
export const dynamic = "force-dynamic";
