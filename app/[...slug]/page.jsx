import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export default async function DynamicPage({ params }) {
  const slugArray = params.slug;
  const language = slugArray[0] === "fr" || slugArray[0] === "de" ? slugArray[0] : "en";
  const slug = language === "en" ? slugArray.join("/") : slugArray.slice(1).join("/");

  const { data } = await fetchData(slug, language);

  return (
    <div>
      <h1>Language: {language}</h1>
      <StoryblokStory story={data.story} />
    </div>
  );
}

export async function fetchData(slug, language) {
  const storyblokApi = getStoryblokApi();
  const sbParams = { version: "draft" };
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  // Filter blocks for the requested language
  const filteredStory = {
    ...data.story,
    content: {
      ...data.story.content,
      personalized_section: data.story.content.personalized_section.map(section => ({
        ...section,
        blocks:
          language === "fr"
            ? section.french_blocks
            : language === "de"
            ? section.german_blocks
            : section.english_blocks,
      })),
    },
  };

  return { story: filteredStory };
}

// Step 1: Generate Static Params
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/");

  const params = [];

  // Iterate through all stories
  for (const story of data.stories) {
    // Check if the story has a `personalized_page` component
    if (story.content.component === "personalized_page") {
      const slug = story.slug;

      // Add English route
      params.push({ slug: slug.split("/") });

      // Add French route if french_blocks is not empty
      if (story.content.personalized_section.some(section => section.french_blocks.length > 0)) {
        params.push({ slug: ["fr", ...slug.split("/")] });
      }

      // Add German route if german_blocks is not empty
      if (story.content.personalized_section.some(section => section.german_blocks.length > 0)) {
        params.push({ slug: ["de", ...slug.split("/")] });
      }
    }
  }

  return params;
}
