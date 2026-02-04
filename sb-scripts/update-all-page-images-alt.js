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
const findImages = (content, images = [], path = '') => {
  if (!content) return images;

  if (Array.isArray(content)) {
    content.forEach((item, index) => findImages(item, images, `${path}[${index}]`));
  } else if (typeof content === 'object') {
    // Check if this is an image (has id, alt, filename)
    if (content.id && content.alt !== undefined && content.filename) {
      console.log(`📸 Found image at ${path}:`, {
        id: content.id,
        alt: content.alt,
        filename: content.filename,
        component: content.component || 'unknown',
        _uid: content._uid || 'no uid',
      });
      images.push({
        ...content,
        path: path,
      });
    } else {
      // Recursively check all properties
      Object.entries(content).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          findImages(value, images, `${path}.${key}`);
        }
      });
    }
  }

  return images;
};

// Function to replace images with themselves in content
const replaceImagesWithThemselves = async (content, path = '') => {
  if (!content) return content;

  if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      await replaceImagesWithThemselves(content[i], `${path}[${i}]`);
    }
  } else if (typeof content === 'object') {
    // Check if this is an image (has id, alt, filename)
    if (content.id && content.alt !== undefined && content.filename) {
      console.log(`🔄 Replacing image ${content.id} at ${path} with asset from library`);
      console.log(`🔍 Current image data:`, {
        id: content.id,
        alt: content.alt,
        filename: content.filename,
        component: content.component || 'unknown',
      });

      // Get the asset from the asset library to ensure we have the latest alt tag
      try {
        const assetUrl = `spaces/${spaceId}/assets/${content.id}`;
        console.log(`🔍 Fetching asset from: ${assetUrl}`);

        const assetResponse = await Storyblok.get(assetUrl);

        const asset = assetResponse.data;

        if (!asset) {
          console.error(`❌ No asset data found for ${content.id}`);
          return content;
        }

        console.log(`🔍 Asset data received:`, {
          id: asset.id,
          alt: asset.alt,
          filename: asset.filename,
          name: asset.name,
          title: asset.title,
          copyright: asset.copyright,
          focus: asset.focus,
        });

        // Update the image with the asset data from the library
        const oldAlt = content.alt;
        content.id = asset.id;
        content.alt = asset.alt;
        content.filename = asset.filename;
        content.name = asset.name;
        content.focus = asset.focus;
        content.title = asset.title;
        content.copyright = asset.copyright;

        console.log(`✅ Updated image ${content.id} at ${path}`);
        console.log(`   Old alt: "${oldAlt}"`);
        console.log(`   New alt: "${asset.alt}"`);
      } catch (assetError) {
        console.error(`❌ Failed to get asset ${content.id}:`, assetError.message);
        console.error(`❌ Error details:`, assetError.response?.data || assetError);
      }
    } else {
      // Recursively check all properties
      for (const [key, value] of Object.entries(content)) {
        if (typeof value === 'object' && value !== null) {
          await replaceImagesWithThemselves(value, `${path}.${key}`);
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
  console.log(`📋 Using Space ID: ${spaceId}`);
  console.log(`📋 API Endpoint: https://api-us.storyblok.com/v1`);

  while (true) {
    console.log(`📄 Fetching page ${page}...`);

    try {
      const url = `spaces/${spaceId}/stories/?version=published&per_page=${perPage}&page=${page}`;
      console.log(`🔍 DEBUG: API URL: ${url}`);

      const searchResponse = await Storyblok.get(url);

      // Log response structure for debugging
      if (page === 1) {
        console.log('🔍 DEBUG: Response structure:');
        console.log(
          JSON.stringify(
            {
              data: {
                stories: searchResponse.data.stories
                  ? `${searchResponse.data.stories.length} stories`
                  : 'no stories',
                total: searchResponse.data.total || 'no total',
                per_page: searchResponse.data.per_page || 'no per_page',
              },
            },
            null,
            2
          )
        );
      }

      const stories = searchResponse.data.stories || [];

      if (stories.length === 0) {
        console.log(`📄 No more stories found on page ${page}`);
        break;
      }

      // Log details about each story for debugging
      console.log(`📄 Found ${stories.length} stories on page ${page}:`);
      stories.forEach((story, index) => {
        console.log(
          `  ${index + 1}. ${story.name} (ID: ${story.id}, Slug: ${
            story.slug
          }, Published: ${story.published_at ? 'Yes' : 'No'})`
        );
      });

      allStories.push(...stories);

      // If we got fewer stories than requested, we've reached the end
      if (stories.length < perPage) {
        console.log(`📄 Reached end of stories (${stories.length} < ${perPage})`);
        break;
      }

      page++;
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      console.error(`❌ Error details:`, error.response?.data || error);
      break;
    }
  }

  console.log(`📊 Total stories found: ${allStories.length}`);
  console.log(`📊 Stories summary:`);
  allStories.forEach((story, index) => {
    console.log(`  ${index + 1}. ${story.name} (${story.slug})`);
  });

  return allStories;
};

// Main function to update all pages
const updateAllPageImages = async () => {
  try {
    console.log('🚀 Starting bulk image update for all published pages...\n');
    console.log(`📋 Environment variables:`);
    console.log(`   - STORYBLOK_SPACE_ID: ${spaceId}`);
    console.log(
      `   - STORYBLOK_PERSONAL_ACCESS_TOKEN: ${
        process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN ? 'Set' : 'Not set'
      }`
    );
    console.log(
      `   - STORYBLOK_PUBLIC_TOKEN: ${process.env.STORYBLOK_PUBLIC_TOKEN ? 'Set' : 'Not set'}`
    );

    // Get all published stories
    const stories = await getAllPublishedStories();

    if (stories.length === 0) {
      console.log('❌ No published stories found');
      return;
    }

    let totalImagesUpdated = 0;
    let pagesProcessed = 0;
    let pagesWithImages = 0;
    let pagesWithErrors = 0;

    console.log(`\n🔄 Starting to process ${stories.length} stories...\n`);

    // Process each story
    for (let i = 0; i < stories.length; i++) {
      const story = stories[i];
      try {
        console.log(`\n📄 [${i + 1}/${stories.length}] Processing: ${story.name} (${story.slug})`);
        console.log(`🔍 Story details:`, {
          id: story.id,
          slug: story.slug,
          name: story.name,
          published_at: story.published_at,
          created_at: story.created_at,
          updated_at: story.updated_at,
        });

        // Get the full content using CDN API
        console.log(`🔍 Fetching full story content via CDN API...`);
        const cdnUrl = `stories/${story.slug}`;
        console.log(`🔍 CDN API URL: ${cdnUrl}`);

        const fullStory = await StoryblokCDN.get(cdnUrl, {
          token: process.env.STORYBLOK_PUBLIC_TOKEN,
          version: 'published',
          resolve_relations: '*', // Resolve all relations
        });

        console.log(`🔍 CDN response received:`, {
          storyId: fullStory.data.story.id,
          storyName: fullStory.data.story.name,
          hasContent: !!fullStory.data.story.content,
          contentKeys: fullStory.data.story.content
            ? Object.keys(fullStory.data.story.content)
            : [],
        });

        // Find all images
        console.log(`🔍 Searching for images in story content...`);
        const images = findImages(fullStory.data.story.content);
        console.log(`📊 Found ${images.length} images in story`);

        if (images.length === 0) {
          console.log('ℹ️  No images found on this page');
          pagesProcessed++;
          continue;
        }

        pagesWithImages++;

        // Log details about each image found
        images.forEach((image, index) => {
          console.log(`  📸 Image ${index + 1}:`, {
            id: image.id,
            filename: image.filename,
            alt: image.alt,
            component: image.component,
            path: image.path,
          });
        });

        // Replace images with themselves
        console.log('🔄 Replacing images with themselves...');
        const updatedContent = await replaceImagesWithThemselves(fullStory.data.story.content);

        // Save the updated content using Management API
        console.log('💾 Saving updated content...');
        const updateUrl = `spaces/${spaceId}/stories/${story.id}`;
        console.log(`🔍 Management API URL: ${updateUrl}`);

        await Storyblok.put(updateUrl, {
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
        console.log(`⏳ Waiting 1 second before next page...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (storyError) {
        console.error(`❌ Error processing ${story.name}:`, storyError.message);
        console.error(`❌ Error details:`, storyError.response?.data || storyError);
        pagesWithErrors++;
        pagesProcessed++;
      }
    }

    // Summary
    console.log('\n🎉 Bulk update completed!');
    console.log(`📊 Final Summary:`);
    console.log(`   - Total stories found: ${stories.length}`);
    console.log(`   - Pages processed: ${pagesProcessed}`);
    console.log(`   - Pages with images: ${pagesWithImages}`);
    console.log(`   - Pages with errors: ${pagesWithErrors}`);
    console.log(`   - Total images updated: ${totalImagesUpdated}`);
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error('❌ Error details:', error.response?.data || error);
  }
};

updateAllPageImages();
