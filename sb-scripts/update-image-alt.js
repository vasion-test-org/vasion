const StoryblokClient = require('storyblok-js-client');
const config = require('./config');

const Storyblok = new StoryblokClient({
  oauthToken: config.token, // Fixed: using token instead of oauthToken
  endpoint: 'https://api-us.storyblok.com/v1',
});

const parseFilenameToAlt = (filename) => {
  // Extract just the filename from the full path/URL
  // Handle both full URLs and just filenames
  let cleanFilename = filename;

  // If it's a full URL, extract just the filename part
  if (filename.includes('/')) {
    cleanFilename = filename.split('/').pop();
  }

  // Remove file extension
  const nameWithoutExtension = cleanFilename.replace(/\.[^/.]+$/, '');

  // Replace dashes and underscores with spaces and capitalize first letter of each word
  const altText = nameWithoutExtension
    .replace(/[-_]/g, ' ') // Replace both dashes and underscores with spaces
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();

  return altText;
};

const updateImageAltText = async () => {
  try {
    console.log('🚀 Starting asset alt text update process...');
    console.log(`📋 Using Space ID: ${config.spaceId}`);

    let page = 1;
    const perPage = 25; // Use Storyblok's default page size
    let totalUpdated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let totalAssets = 0;

    console.log('📄 Processing assets page by page...');

    while (true) {
      try {
        console.log(`\n📄 Processing page ${page}...`);

        // Use raw URL with query parameters to ensure proper pagination
        const url = `spaces/${config.spaceId}/assets/?page=${page}&per_page=${perPage}`;

        // Debug: Log the exact URL being called
        if (page === 1) {
          console.log(`🔍 DEBUG: API URL: ${url}`);
        }

        const response = await Storyblok.get(url);

        // Debug: Log response headers on first page
        if (page === 1) {
          console.log('🔍 DEBUG: Response Headers:');
          console.log(JSON.stringify(response.headers, null, 2));
        }

        const assets = response.data.assets || [];

        if (assets.length === 0) {
          console.log(`📄 No more assets found on page ${page}`);
          break;
        }

        console.log(`📄 Page ${page}: Found ${assets.length} assets`);
        totalAssets += assets.length;

        let pageUpdated = 0;
        let pageSkipped = 0;
        let pageErrors = 0;

        // Process each asset on this page
        for (const asset of assets) {
          // Generate alt text from filename
          const altText = parseFilenameToAlt(asset.filename);

          if (!altText) {
            console.log(
              `⚠️  Skipping - could not generate alt text for: ${asset.filename}`
            );
            pageSkipped++;
            continue;
          }

          console.log(`✨ Generated alt text: "${altText}"`);

          try {
            // Following Storyblok API documentation for updating assets
            // Only send the fields that can be updated
            const updatePayload = {
              alt: altText,
              title: asset.title || '',
              copyright: asset.copyright || '',
              focus: asset.focus || '',
            };

            await Storyblok.put(`spaces/${config.spaceId}/assets/${asset.id}`, {
              asset: updatePayload,
            });

            console.log(`✅ Successfully updated`);
            pageUpdated++;

            // Add delay to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 200));
          } catch (updateError) {
            console.error(
              `❌ Failed to update:`,
              updateError.response?.statusText || updateError.message
            );
            pageErrors++;
          }
        }

        // Update totals
        totalUpdated += pageUpdated;
        totalSkipped += pageSkipped;
        totalErrors += pageErrors;

        console.log(
          `📄 Page ${page} summary: ${pageUpdated} updated, ${pageSkipped} skipped, ${pageErrors} errors`
        );

        // If we got fewer assets than requested, we've reached the end
        if (assets.length < perPage) {
          console.log(
            `📄 Reached end of assets (${assets.length} < ${perPage})`
          );
          break;
        }

        page++;

        // Add small delay between pages to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(
          `❌ Error processing page ${page}:`,
          error.response?.statusText || error.message
        );
        break;
      }
    }

    console.log('\n📊 Final Summary:');
    console.log(`✅ Total Updated: ${totalUpdated} assets`);
    console.log(`⏭️  Total Skipped: ${totalSkipped} assets`);
    console.log(`❌ Total Errors: ${totalErrors} assets`);
    console.log(`📁 Total Assets Processed: ${totalAssets} assets`);
    console.log(`📄 Total Pages Processed: ${page - 1} pages`);
  } catch (err) {
    console.error(
      '❌ Error updating image alt text:',
      err.response?.statusText || err.message
    );
  }
};

updateImageAltText();
