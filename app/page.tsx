// app/page.tsx
import { StoryblokStory } from '@storyblok/react/rsc';
import { fetchData } from '../lib/fetchData';

export default async function Home() {
  const { data } = await fetchData();

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}
