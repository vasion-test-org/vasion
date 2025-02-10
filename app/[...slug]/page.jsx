import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export default async function DynamicPage({ params, locale }) {
  const slugArray = params.slug || [];
  const slug = slugArray.join("/");

  // Fetch the correct language version
  const { story } = await fetchData(slug, locale);

  if (!story) {
    return <h1>404 - Page Not Found</h1>; // Prevents breaking if the story is missing
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale) {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: "published",
    language: locale, // Fetch correct language version
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    let story = data.story;

    if (!story) {
      console.error(`[ Server ] Story not found for slug: ${slug} and locale: ${locale}`);
      return null;
    }

    if (story.content.personalized_section) {
      let selectedBlocks = [];

      if (locale === "fr") {
        selectedBlocks = story.content.personalized_section.map(section => ({
          ...section,
          blocks: section.french_blocks.length > 0 ? section.french_blocks : section.english_blocks,
        }));
      } else if (locale === "de") {
        selectedBlocks = story.content.personalized_section.map(section => ({
          ...section,
          blocks: section.german_blocks.length > 0 ? section.german_blocks : section.english_blocks,
        }));
      } else {
        selectedBlocks = story.content.personalized_section.map(section => ({
          ...section,
          blocks: section.english_blocks,
        }));
      }

      story = {
        ...story,
        content: {
          ...story.content,
          personalized_section: selectedBlocks,
        },
      };
    }

    return { story };
  } catch (error) {
    console.error(`[ Server ] Error fetching story: ${error.message}`);
    return { story: null };
  }
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/", { version: "published" });

  const params = [];

  for (const story of data.stories) {
    const slug = story.slug.split("/");

    const hasEnglishBlocks = story.content.personalized_section?.some(section => section.english_blocks.length > 0);
    const hasFrenchBlocks = story.content.personalized_section?.some(section => section.french_blocks.length > 0);
    const hasGermanBlocks = story.content.personalized_section?.some(section => section.german_blocks.length > 0);

    // **Generate a separate route for each available language**
    if (hasEnglishBlocks) {
      params.push({ slug, locale: "en" });
    }
    if (hasFrenchBlocks) {
      params.push({ slug: ["fr", ...slug], locale: "fr" });
    }
    if (hasGermanBlocks) {
      params.push({ slug: ["de", ...slug], locale: "de" });
    }

    // **If no personalized blocks exist, use Storyblok's translated slugs**
    if (!hasEnglishBlocks && !hasFrenchBlocks && !hasGermanBlocks && story.translated_slugs) {
      for (const translation of story.translated_slugs) {
        params.push({ slug: translation.path.split("/"), locale: translation.lang });
      }
    }
  }

  console.log("Generated Static Params:", params); // ✅ Debugging output to check slug paths

  return params;
}
