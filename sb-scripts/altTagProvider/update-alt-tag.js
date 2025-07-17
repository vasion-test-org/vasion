const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configuration
const STORYBLOK_SPACE_ID = "1022857";
const STORYBLOK_MANAGEMENT_TOKEN = "hzccS4TJDMJkL4cRBDKSoAtt";
const BATCH_SIZE = 50; // Process images in batches
const DELAY_BETWEEN_BATCHES = 2000; // 2 seconds delay between batches
const LOG_FILE = "alt_tag_update_log.txt";

// Storyblok API endpoints
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${STORYBLOK_SPACE_ID}`;

// Setup axios with default headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${STORYBLOK_MANAGEMENT_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Logging function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage);
}

// Generate alt text from filename
function generateAltFromFilename(filename) {
  // Remove file extension
  const nameWithoutExt = path.parse(filename).name;

  // Replace hyphens, underscores, and dots with spaces
  let altText = nameWithoutExt
    .replace(/[-_\.]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Handle camelCase
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

  // Add descriptive prefix if it doesn't already exist
  if (
    !altText.toLowerCase().includes("image") &&
    !altText.toLowerCase().includes("photo")
  ) {
    altText = `Image of ${altText}`;
  }

  return altText;
}

// Advanced alt text generation (you can enhance this)
function generateAdvancedAlt(asset) {
  const filename = asset.filename;
  const folder = asset.asset_folder_id;

  // Basic alt from filename
  let altText = generateAltFromFilename(filename);

  // You can add more logic here based on:
  // - Folder structure
  // - File metadata
  // - Naming conventions

  return altText;
}

// Fetch all assets from Storyblok
async function fetchAllAssets() {
  log("Starting to fetch all assets...");
  let allAssets = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await api.get(`/assets`, {
        params: {
          page: page,
          per_page: 100,
          search_term: "", // Empty to get all assets
          filter_query: {
            content_type: {
              in: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
            },
          },
        },
      });

      const assets = response.data.assets;
      allAssets = allAssets.concat(assets);

      log(`Fetched page ${page}, got ${assets.length} assets`);

      // Check if there are more pages
      hasMore = assets.length === 100;
      page++;

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      log(`Error fetching assets page ${page}: ${error.message}`);
      throw error;
    }
  }

  log(`Total assets fetched: ${allAssets.length}`);
  return allAssets;
}

// Update a single asset with alt text
async function updateAssetAlt(asset, altText) {
  try {
    const response = await api.put(`/assets/${asset.id}`, {
      asset: {
        alt: altText,
      },
    });

    return { success: true, asset: response.data.asset };
  } catch (error) {
    log(
      `Error updating asset ${asset.id} (${asset.filename}): ${error.message}`,
    );
    return { success: false, error: error.message };
  }
}

// Process assets in batches
async function processAssetsInBatches(assets) {
  const totalBatches = Math.ceil(assets.length / BATCH_SIZE);
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, assets.length);
    const batch = assets.slice(start, end);

    log(
      `Processing batch ${i + 1}/${totalBatches} (assets ${start + 1}-${end})`,
    );

    // Process batch
    const promises = batch.map(async (asset) => {
      // Skip if alt text already exists
      if (asset.alt && asset.alt.trim() !== "") {
        log(
          `Skipping ${asset.filename} - alt text already exists: "${asset.alt}"`,
        );
        return { success: true, skipped: true };
      }

      // Generate alt text
      const altText = generateAdvancedAlt(asset);

      // Update asset
      const result = await updateAssetAlt(asset, altText);

      if (result.success) {
        log(`Updated ${asset.filename} with alt: "${altText}"`);
        return { success: true, asset: asset };
      } else {
        return { success: false, asset: asset, error: result.error };
      }
    });

    const results = await Promise.all(promises);

    // Count results
    results.forEach((result) => {
      if (result.success) {
        if (!result.skipped) successCount++;
      } else {
        errorCount++;
      }
    });

    log(
      `Batch ${i + 1} completed. Success: ${successCount}, Errors: ${errorCount}`,
    );

    // Delay between batches to respect rate limits
    if (i < totalBatches - 1) {
      log(`Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...`);
      await new Promise((resolve) =>
        setTimeout(resolve, DELAY_BETWEEN_BATCHES),
      );
    }
  }

  return { successCount, errorCount };
}

// Main function
async function main() {
  try {
    // Validate configuration
    if (!STORYBLOK_SPACE_ID || !STORYBLOK_MANAGEMENT_TOKEN) {
      throw new Error(
        "Please set STORYBLOK_SPACE_ID and STORYBLOK_MANAGEMENT_TOKEN",
      );
    }

    log("Starting Storyblok alt tag bulk update...");

    // Fetch all assets
    const assets = await fetchAllAssets();

    // Filter only image assets without alt text
    const imageAssets = assets.filter((asset) => {
      const isImage =
        asset.content_type && asset.content_type.startsWith("image/");
      const hasNoAlt = !asset.alt || asset.alt.trim() === "";
      return isImage && hasNoAlt;
    });

    // LIMIT TO FIRST 50 IMAGES FOR TESTING
    const limitedAssets = imageAssets.slice(0, 50);

    log(`Found ${imageAssets.length} image assets without alt text`);
    log(`Limited to first ${limitedAssets.length} images for testing`);

    if (limitedAssets.length === 0) {
      log("No images need alt text updates. Exiting.");
      return;
    }

    // Confirm before proceeding
    console.log(
      `\nAbout to update ${limitedAssets.length} images with alt text.`,
    );
    console.log("Press Ctrl+C to cancel, or press Enter to continue...");

    // Wait for user input (you can comment this out for automated runs)
    await new Promise((resolve) => {
      process.stdin.once("data", () => resolve());
    });

    // Process limited assets
    const results = await processAssetsInBatches(limitedAssets);

    log(`\n=== FINAL RESULTS ===`);
    log(`Successfully updated: ${results.successCount} images`);
    log(`Errors: ${results.errorCount} images`);
    log(`Total processed: ${limitedAssets.length} images`);
    log(`Total images available: ${imageAssets.length} images`);
    log("Alt tag update completed!");
  } catch (error) {
    log(`Fatal error: ${error.message}`);
    console.error("Script failed:", error);
  }
}

// Run the script
if (require.main === module) {
  main();
}
