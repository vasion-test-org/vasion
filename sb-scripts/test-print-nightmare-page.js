const StoryblokClient = require('storyblok-js-client');
require('dotenv').config();

// Use CDN API for getting full content
const StoryblokCDN = new StoryblokClient({
  endpoint: 'https://api-us.storyblok.com/v2/cdn',
});

// Use Management API for searching
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
      // Replace the image with itself by updating the id reference
      console.log(`🔄 Replacing image ${content.id} with asset from library`);

      // Get the asset from the asset library to ensure we have the latest alt tag
      try {
        const assetResponse = await Storyblok.get(`spaces/${spaceId}/assets/${content.id}`);

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

        console.log(`✅ Updated image ${content.id} with alt tag: "${asset.alt}"`);
      } catch (assetError) {
        console.error(`❌ Failed to get asset ${content.id}:`, assetError.message);
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

// Main function
const findAboutUsImages = async () => {
  try {
    console.log('🔍 Searching for About Us page...');

    let page = 1;
    const perPage = 100;
    let aboutUsStory = null;

    // Search through all pages
    while (true) {
      console.log(`📄 Searching page ${page}...`);

      const searchResponse = await Storyblok.get(
        `spaces/${spaceId}/stories/?version=published&per_page=${perPage}&page=${page}`
      );

      const stories = searchResponse.data.stories || [];

      if (stories.length === 0) {
        console.log(`📄 No more stories found on page ${page}`);
        break;
      }

      // Look for About Us page
      aboutUsStory = stories.find((story) => story.slug === 'about-us');

      if (aboutUsStory) {
        console.log(`✅ Found About Us page on page ${page}!`);
        break;
      }

      // If we got fewer stories than requested, we've reached the end
      if (stories.length < perPage) {
        console.log(`📄 Reached end of stories (${stories.length} < ${perPage})`);
        break;
      }

      page++;
    }

    if (!aboutUsStory) {
      console.log('❌ About Us page not found after searching all pages');
      return;
    }

    console.log(`✅ Found About Us page: ${aboutUsStory.name} (ID: ${aboutUsStory.id})`);

    // Get the full content using CDN API with token as query parameter
    console.log('\n🔍 Getting full content from CDN API...');

    try {
      const fullStory = await StoryblokCDN.get(`stories/about-us`, {
        token: process.env.STORYBLOK_PUBLIC_TOKEN,
        version: 'published',
        resolve_relations: '*', // Resolve all relations
      });

      console.log('\n📄 Full Story Content Retrieved');

      // Find all images
      console.log('\n🔍 Finding images...');
      const images = findImages(fullStory.data.story.content);
      console.log(`📊 Found ${images.length} images`);

      if (images.length === 0) {
        console.log('❌ No images found to update');
        return;
      }

      // Replace images with themselves
      console.log('\n🔄 Replacing images with themselves...');
      const updatedContent = await replaceImagesWithThemselves(fullStory.data.story.content);

      // Save the updated content using Management API
      console.log('\n💾 Saving updated content...');
      await Storyblok.put(`spaces/${spaceId}/stories/${aboutUsStory.id}`, {
        story: {
          content: updatedContent,
          published_at: aboutUsStory.published_at, // Keep published status
        },
      });

      console.log('✅ Successfully updated About Us page!');
      console.log(`📊 Updated ${images.length} images`);
    } catch (apiError) {
      console.error('❌ API Error:', apiError.message);
      console.error('🔍 API Error Details:', apiError.response?.data || 'No response data');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

findAboutUsImages();
