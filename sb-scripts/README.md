# Storyblok Scripts

This directory contains various scripts for managing Storyblok content.

## Scripts

### 1. Rich Text Classes Updater (`index.js`)

Updates rich text components with predefined style options.

**Usage:**

```bash
npm start
# or
node index.js
```

### 2. Asset Alt Text Updater (`update-image-alt.js`)

Updates alt text for all assets in the Storyblok asset library based on filename.

**Usage:**

```bash
node update-image-alt.js
```

### 3. Page Images Alt Text Updater (`update-page-images-alt.js`) ⭐ NEW

Goes through each published page in Storyblok, finds images without alt tags, and replaces them with themselves to pull the updated alt tags from the asset library. **Draft pages are automatically skipped to prevent unwanted publishing.**

**Usage:**

```bash
npm run update-page-images-alt
# or
node update-page-images-alt.js
```

### 4. Bulk All Pages Image Updater (`update-all-page-images-alt.js`) 🚀 NEW

**Processes every image on every published page** - replaces all images with their asset library versions to ensure alt tags are current. This is the comprehensive version that updates ALL images across ALL pages.

**Usage:**

```bash
npm run update-all-pages
# or
node update-all-page-images-alt.js
```

## Features of Page Images Alt Text Updater

- ✅ **Safe for Draft Pages**: Only processes published pages, never publishes draft content
- ✅ **Asset Library Integration**: Replaces images with themselves to pull updated alt tags
- ✅ **Simple & Reliable**: Uses Storyblok's built-in image replacement mechanism
- ✅ **Rate Limiting**: Includes delays to respect API rate limits
- ✅ **Comprehensive Logging**: Detailed progress and error reporting
- ✅ **Recursive Image Detection**: Finds images nested in any content structure
- ✅ **Error Handling**: Graceful error handling with detailed reporting

## Environment Variables

Create a `.env` file in the root directory with:

```env
STORYBLOK_PERSONAL_ACCESS_TOKEN=your_personal_access_token
STORYBLOK_SPACE_ID=your_space_id
```

## How the Page Images Alt Text Updater Works

1. **Fetches Published Stories**: Only retrieves published stories to avoid affecting drafts
2. **Scans Content**: Recursively searches through story content to find all images
3. **Checks Alt Tags**: Identifies images that don't have alt tags
4. **Replaces Images**: Replaces each image with itself to pull updated alt tags from asset library
5. **Updates Content**: Updates the story content with the replaced images
6. **Preserves Status**: Maintains the published status without forcing a republish
7. **Reports Progress**: Provides detailed logging of the process

## Safety Features

- **Draft Protection**: Never processes or publishes draft stories
- **Content Preservation**: Only replaces images with themselves, doesn't modify other content
- **Status Maintenance**: Preserves the original published status
- **Error Recovery**: Continues processing even if individual images fail
- **Rate Limiting**: Respects API limits to prevent service disruption

## Output Example

```
🚀 Starting page image alt tag update process...
📋 Using Space ID: 12345

📄 Processing stories page 1...
📄 Page 1: Found 25 stories

📖 Processing story: Homepage (ID: 123)
🖼️  Found 3 images in story
  📸 Processing image: hero-image.jpg
  ✅ Image already has alt tag: "Hero Image"
  📸 Processing image: product-shot.png
  🔄 Replacing image with itself to update alt tag
  ✅ Successfully replaced image
  📸 Processing image: logo.svg
  🔄 Replacing image with itself to update alt tag
  ✅ Successfully replaced image
  📊 Story summary: 2 updated, 1 skipped

📊 Final Summary:
✅ Total Images Replaced: 15
⏭️  Total Images Skipped: 45
❌ Total Errors: 2
📖 Total Stories Processed: 100
📄 Total Pages Processed: 4 pages
⚠️  Draft Stories Skipped: 5
```
