import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const slugArray = params.slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized
    ? slugArray.length === 1
      ? "home"
      : slugArray.slice(1).join("/")
    : slugArray.join("/");

  const story = await fetchStory(storySlug, locale);

  if (!story) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const { content } = story;
  const title = content.metadata?.title || "Default Title";
  const description = content.metadata?.description || "Default Description";

  const basePath = "https://vasion.com";
  const locales = ["en", "fr", "de"];
  const alternateLinks = locales.reduce((acc, loc) => {
    const path =
      loc === "en" ? `/${story.full_slug}` : `/${loc}/${story.full_slug}`;
    acc[loc] = `${basePath}${path}`;
    return acc;
  }, {});

  return {
    title,
    description,
    alternates: {
      canonical: alternateLinks[locale],
      languages: alternateLinks,
    },
  };
}

async function fetchStory(slug, locale) {
  const storyblokApi = getStoryblokApi();
  const sbParams = {
    version: "published",
    language: locale,
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return data.story;
  } catch (error) {
    console.error(`Error fetching story: ${error.message}`);
    return null;
  }
}

export default async function DynamicPage({ params }) {
  const slugArray = params.slug || [];
  const isLocalized = ["fr", "de"].includes(slugArray[0]);
  const locale = isLocalized ? slugArray[0] : "en";
  const storySlug = isLocalized
    ? slugArray.length === 1
      ? "home"
      : slugArray.slice(1).join("/")
    : slugArray.join("/");

  let story = await fetchData(storySlug, locale, "published");

  if (!story) {
    story = await fetchData(storySlug, locale, "draft");
  }

  if (!story) {
    return notFound();
  }

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData(slug, locale, version) {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: version,
    language: locale,
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    if (!data.story) {
      console.error(
        `[❌ Server] Story not found for slug: ${slug} and locale: ${locale}`,
      );
      return null;
    }

    console.log(
      `[✅ Success] Story fetched: ${data.story.full_slug} (${locale}) [${version}]`,
    );
    return data.story;
  } catch (error) {
    console.error(`[❌ Server] Error fetching story: ${error.message}`);
    return null;
  }
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/", {
    version: "published",
  });

  const params = [];

  for (const story of data.stories) {
    const slug = story.slug;
    const splitSlug = slug === "home" ? [] : slug.split("/");
    params.push({ slug: splitSlug, locale: "en" });

    if (story.translated_slugs) {
      for (const translation of story.translated_slugs) {
        const translatedSlug =
          translation.path === "" ? [] : translation.path.split("/");
        params.push({
          slug: [translation.lang, ...translatedSlug],
          locale: translation.lang,
        });
      }
    }
  }

  return params;
}
