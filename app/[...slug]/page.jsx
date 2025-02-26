import { StoryblokStory } from "@storyblok/react/rsc";

import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";
export default async function DynamicPage(props) {
  const { params } = props;
  const slugArray = (await params).slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized ? slugArray.slice(1).join("/") : slugArray.join("/");

  // console.log(`[Request] Slug: ${storySlug}, Locale: ${locale}`);

  // Fetch Storyblok content
  const { story } = await fetchData(storySlug, locale);

  if (!story) {
    notFound();
  }

  // console.log(story)
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

    // Ensure personalized sections render correct language
    if (story.content.personalized_section) {
      let selectedBlocks = [];

      // French and German take priority over English
      story.content.personalized_section.forEach((section) => {
        if (locale === "fr" && section.french_blocks.length > 0) {
          selectedBlocks.push({
            ...section,
            blocks: section.french_blocks,
          });
        } else if (locale === "de" && section.german_blocks.length > 0) {
          selectedBlocks.push({
            ...section,
            blocks: section.german_blocks,
          });
        } else {
          selectedBlocks.push({
            ...section,
            blocks: section.english_blocks, // Default to English
          });
        }
      });

      story = {
        ...story,
        content: {
          ...story.content,
          personalized_section: selectedBlocks,
        },
      };
    }

    console.log(`[✅ Success] Story fetched: ${story.full_slug} (${locale})`);
    return { story };
  } catch (error) {
    console.error(`[❌ Server ] Error fetching story: ${error.message}`);
    return { story: null };
  }
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/", { version: "published" });

  const params = [];

  for (const story of data.stories) {
    const slug = story.slug.split("/");

    const hasEnglishBlocks = story.content.personalized_section?.some(
      (section) => section.english_blocks.length > 0
    );
    const hasFrenchBlocks = story.content.personalized_section?.some(
      (section) => section.french_blocks.length > 0
    );
    const hasGermanBlocks = story.content.personalized_section?.some(
      (section) => section.german_blocks.length > 0
    );

    // Generate a separate route for each available language
    if (hasEnglishBlocks) {
      params.push({ slug, locale: "en" });
    }
    if (hasFrenchBlocks) {
      params.push({ slug: ["fr", ...slug], locale: "fr" });
    }
    if (hasGermanBlocks) {
      params.push({ slug: ["de", ...slug], locale: "de" });
    }

    // If no personalized blocks exist, use Storyblok's translated slugs
    if (!hasEnglishBlocks && !hasFrenchBlocks && !hasGermanBlocks && story.translated_slugs) {
      for (const translation of story.translated_slugs) {
        params.push({ slug: translation.path.split("/"), locale: translation.lang });
      }
    }
  }

  console.log("Generated Static Params:", params); // Debugging output to check slug paths

  return params;
}