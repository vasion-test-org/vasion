import { fetchData } from '@/lib/fetchData';
import { StoryblokStory } from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';

export default async function Home() {
  const { isEnabled } = await draftMode();
  const story = await fetchData("home", isEnabled); // 🔹 Now fetching only "home"

  // ✅ Prevents crash if no story is found
  if (!story) {
    return (
      <div>
        <h1>Homepage Not Found</h1>
        <p>The requested homepage content is missing in Storyblok.</p>
      </div>
    );
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

// ✅ Force Next.js to use Dynamic Rendering
export const dynamic = "force-dynamic";
