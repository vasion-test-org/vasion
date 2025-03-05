import { fetchData } from '@/lib/fetchData';
import { StoryblokStory } from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';

export default async function Home() {
  const { isEnabled } = await draftMode(); // Await draftMode() properly
  const { data } = await fetchData(isEnabled);

  return (
    <div>
      <StoryblokStory story={data?.story} />
    </div>
  );
}
