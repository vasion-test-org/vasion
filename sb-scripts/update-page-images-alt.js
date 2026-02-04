const StoryblokClient = require('storyblok-js-client');
require('dotenv').config();

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
  endpoint: 'https://api-us.storyblok.com/v1',
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// Check if image has alt tag
const hasAltTag = (image) => {
  return image.alt && image.alt.trim() !== '';
};

// Recursively find all images in a story's content
const findImagesInContent = (content, images = []) => {
  if (!content) return images;

  // Handle different content types
  if (Array.isArray(content)) {
    content.forEach((item) => findImagesInContent(item, images));
  } else if (typeof content === 'object') {
    // Check if this is an image field
    if (content._uid && content.alt !== undefined) {
      // This looks like an image field
      images.push({
        _uid: content._uid,
        alt: content.alt,
        filename: content.filename,
        id: content.id,
        fieldName: 'image', // We'll need to determine the actual field name
      });
    } else if (content.component === 'image' || content.component === 'asset') {
      // This is an image component
      images.push({
        _uid: content._uid,
        alt: content.alt,
        filename: content.filename,
        id: content.id,
        fieldName: 'image',
      });
    } else {
      // Recursively check all properties
      Object.values(content).forEach((value) => {
        if (typeof value === 'object' && value !== null) {
          findImagesInContent(value, images);
        }
      });
    }
  }

  return images;
};

// Replace image with itself to update alt tag from asset library
const replaceImageWithItself = async (story, imageInfo) => {
  try {
    // Create a deep copy of the story content
    const updatedContent = JSON.parse(JSON.stringify(story.content));

    // Function to recursively replace the image in the content
    const replaceImageInContent = (content, imageUid, assetId) => {
      if (!content) return false;

      if (Array.isArray(content)) {
        return content.some((item) => replaceImageInContent(item, imageUid, assetId));
      } else if (typeof content === 'object') {
        // Check if this is the image we're looking for
        if (content._uid === imageUid) {
          // Replace the image with itself by updating the id reference
          // This will pull the updated alt tag from the asset library
          content.id = assetId;
          return true;
        }

        // Recursively check all properties
        return Object.values(content).some((value) => {
          if (typeof value === 'object' && value !== null) {
            return replaceImageInContent(value, imageUid, assetId);
          }
          return false;
        });
      }
      return false;
    };

    // Replace the image in the content
    const updated = replaceImageInContent(updatedContent, imageInfo._uid, imageInfo.id);

    if (!updated) {
      console.log(`⚠️  Could not find image with _uid ${imageInfo._uid} in story content`);
      return false;
    }

    // Update the story content (this will trigger Storyblok to refresh the image)
    await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
      story: {
        content: updatedContent,
        published_at: story.published_at, // Keep the same published status
      },
    });

    return true;
  } catch (error) {
    console.error(
      `❌ Failed to replace image in story ${story.id}:`,
      error.response?.statusText || error.message
    );
    return false;
  }
};

// Main function to process all pages
const updatePageImagesAlt = async () => {
  try {
    console.log('🚀 Starting page image replacement process...');
    console.log(`📋 Using Space ID: ${spaceId}`);

    let page = 1;
    const perPage = 25;
    let totalStories = 0;
    let totalImagesUpdated = 0;
    let totalImagesSkipped = 0;
    let totalErrors = 0;
    let draftStoriesSkipped = 0;

    console.log('📄 Processing stories page by page...');

    while (true) {
      try {
        console.log(`\n📄 Processing stories page ${page}...`);

        const url = `spaces/${spaceId}/stories/?page=${page}&per_page=${perPage}&version=published`;
        const response = await Storyblok.get(url);
        const stories = response.data.stories || [];

        if (stories.length === 0) {
          console.log(`📄 No more stories found on page ${page}`);
          break;
        }

        console.log(`📄 Page ${page}: Found ${stories.length} stories`);
        totalStories += stories.length;

        // Process each story
        for (const story of stories) {
          console.log(`\n📖 Processing story: ${story.name} (ID: ${story.id})`);

          // Check if story is published
          if (!story.published_at) {
            console.log(`⚠️  Skipping draft story: ${story.name} (not published)`);
            draftStoriesSkipped++;
            continue;
          }

          // Find all images in the story content
          const images = findImagesInContent(story.content);
          console.log(`🖼️  Found ${images.length} images in story`);

          let storyImagesUpdated = 0;
          let storyImagesSkipped = 0;

          // Process each image
          for (const image of images) {
            console.log(`  📸 Processing image: ${image.filename || image.id}`);

            // Check if image already has alt tag
            if (hasAltTag(image)) {
              console.log(`  ✅ Image already has alt tag: "${image.alt}"`);
              storyImagesSkipped++;
              continue;
            }

            console.log(`  🔄 Replacing image with itself to update alt tag`);

            // Replace the image with itself to pull updated alt tag from asset library
            const success = await replaceImageWithItself(story, image);

            if (success) {
              console.log(`  ✅ Successfully replaced image`);
              storyImagesUpdated++;
            } else {
              console.log(`  ❌ Failed to replace image`);
              totalErrors++;
            }

            // Add delay to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          totalImagesUpdated += storyImagesUpdated;
          totalImagesSkipped += storyImagesSkipped;

          console.log(
            `  📊 Story summary: ${storyImagesUpdated} updated, ${storyImagesSkipped} skipped`
          );
        }

        // If we got fewer stories than requested, we've reached the end
        if (stories.length < perPage) {
          console.log(`📄 Reached end of stories (${stories.length} < ${perPage})`);
          break;
        }

        page++;

        // Add small delay between pages to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(
          `❌ Error processing stories page ${page}:`,
          error.response?.statusText || error.message
        );
        break;
      }
    }

    console.log('\n📊 Final Summary:');
    console.log(`✅ Total Images Replaced: ${totalImagesUpdated}`);
    console.log(`⏭️  Total Images Skipped: ${totalImagesSkipped}`);
    console.log(`❌ Total Errors: ${totalErrors}`);
    console.log(`📖 Total Stories Processed: ${totalStories}`);
    console.log(`📄 Total Pages Processed: ${page - 1} pages`);
    console.log(`⚠️  Draft Stories Skipped: ${draftStoriesSkipped}`);
  } catch (err) {
    console.error('❌ Error replacing page images:', err.response?.statusText || err.message);
  }
};

updatePageImagesAlt();
