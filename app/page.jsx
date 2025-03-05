import { fetchData } from '@/lib/fetchData';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {
  const { data } = await fetchData();

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}
