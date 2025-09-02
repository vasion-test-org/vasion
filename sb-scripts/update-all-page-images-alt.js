const StoryblokClient = require('storyblok-js-client');
require('dotenv').config();

// Use CDN API for getting full content
const StoryblokCDN = new StoryblokClient({
  endpoint: 'https://api-us.storyblok.com/v2/cdn',
});

// Use Management API for searching and updating
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
  endpoint: 'https://api-us.storyblok.com/v1',
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// Function to find all images in content
const findImages = (content, images = []) => {
  if (!content) return images;

  if (Array.isArray(content)) {
    content.forEach((item) => findImages(item, images));
  } else if (typeof content === 'object') {
    // Check if this is an image (has id, alt, filename)
    if (content.id && content.alt !== undefined && content.filename) {
      console.log('📸 Found image:', {
        id: content.id,
        alt: content.alt,
        filename: content.filename,
      });
      images.push(content);
    } else {
      // Recursively check all properties
      Object.values(content).forEach((value) => {
        if (typeof value === 'object' && value !== null) {
          findImages(value, images);
        }
      });
    }
  }

  return images;
};

// Function to replace images with themselves in content
const replaceImagesWithThemselves = async (content) => {
  if (!content) return content;

  if (Array.isArray(content)) {
    for (const item of content) {
      await replaceImagesWithThemselves(item);
    }
  } else if (typeof content === 'object') {
    // Check if this is an image (has id, alt, filename)
    if (content.id && content.alt !== undefined && content.filename) {
      console.log(`🔄 Replacing image ${content.id} with asset from library`);

      // Get the asset from the asset library to ensure we have the latest alt tag
      try {
        const assetResponse = await Storyblok.get(
          `spaces/${spaceId}/assets/${content.id}`
        );

        const asset = assetResponse.data;

        if (!asset) {
          console.error(`❌ No asset data found for ${content.id}`);
          return;
        }

        // Update the image with the asset data from the library
        content.id = asset.id;
        content.alt = asset.alt;
        content.filename = asset.filename;
        content.name = asset.name;
        content.focus = asset.focus;
        content.title = asset.title;
        content.copyright = asset.copyright;

        console.log(
          `✅ Updated image ${content.id} with alt tag: "${asset.alt}"`
        );
      } catch (assetError) {
        console.error(
          `❌ Failed to get asset ${content.id}:`,
          assetError.message
        );
      }
    } else {
      // Recursively check all properties
      for (const value of Object.values(content)) {
        if (typeof value === 'object' && value !== null) {
          await replaceImagesWithThemselves(value);
        }
      }
    }
  }

  return content;
};

// Function to get all published stories
const getAllPublishedStories = async () => {
  const allStories = [];
  let page = 1;
  const perPage = 100;

  console.log('🔍 Fetching all published stories...');

  while (true) {
    console.log(`📄 Fetching page ${page}...`);

    try {
      const searchResponse = await Storyblok.get(
        `spaces/${spaceId}/stories/?version=published&per_page=${perPage}&page=${page}`
      );

      const stories = searchResponse.data.stories || [];

      if (stories.length === 0) {
        console.log(`📄 No more stories found on page ${page}`);
        break;
      }

      allStories.push(...stories);
      console.log(`📄 Found ${stories.length} stories on page ${page}`);

      // If we got fewer stories than requested, we've reached the end
      if (stories.length < perPage) {
        console.log(`📄 Reached end of stories (${stories.length} < ${perPage})`);
        break;
      }

      page++;
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      break;
    }
  }

  console.log(`📊 Total stories found: ${allStories.length}`);
  return allStories;
};

// Main function to update all pages
const updateAllPageImages = async () => {
  try {
    console.log('🚀 Starting bulk image update for all published pages...\n');

    // Get all published stories
    const stories = await getAllPublishedStories();

    if (stories.length === 0) {
      console.log('❌ No published stories found');
      return;
    }

    let totalImagesUpdated = 0;
    let pagesProcessed = 0;
    let pagesWithImages = 0;

    // Process each story
    for (const story of stories) {
      try {
        console.log(`\n📄 Processing: ${story.name} (${story.slug})`);

        // Get the full content using CDN API
        const fullStory = await StoryblokCDN.get(`stories/${story.slug}`, {
          token: process.env.STORYBLOK_PUBLIC_TOKEN,
          version: 'published',
          resolve_relations: '*', // Resolve all relations
        });

        // Find all images
        const images = findImages(fullStory.data.story.content);
        console.log(`📊 Found ${images.length} images`);

        if (images.length === 0) {
          console.log('ℹ️  No images found on this page');
          pagesProcessed++;
          continue;
        }

        pagesWithImages++;

        // Replace images with themselves
        console.log('🔄 Replacing images with themselves...');
        const updatedContent = await replaceImagesWithThemselves(
          fullStory.data.story.content
        );

        // Save the updated content using Management API
        console.log('💾 Saving updated content...');
        await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
          story: {
            content: updatedContent,
            published_at: story.published_at, // Keep published status
          },
        });

        console.log(`✅ Successfully updated ${story.name}!`);
        console.log(`📊 Updated ${images.length} images on this page`);

        totalImagesUpdated += images.length;
        pagesProcessed++;

        // Add a small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (storyError) {
        console.error(`❌ Error processing ${story.name}:`, storyError.message);
        pagesProcessed++;
      }
    }

    // Summary
    console.log('\n🎉 Bulk update completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Pages processed: ${pagesProcessed}`);
    console.log(`   - Pages with images: ${pagesWithImages}`);
    console.log(`   - Total images updated: ${totalImagesUpdated}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

updateAllPageImages();
