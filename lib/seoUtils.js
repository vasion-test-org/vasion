/**
 * Utility functions for SEO metadata generation
 */

/**
 * Checks if URL contains UTM parameters
 * @param {Object} searchParams - The search parameters from the request (Next.js format)
 * @returns {boolean} - True if UTM parameters are present
 */
export function hasUtmParameters(searchParams) {
  if (!searchParams) return false;

  const utmParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'utm_source_platform',
    'utm_creative_format',
    'utm_marketing_tactic',
  ];

  return utmParams.some((param) => param in searchParams);
}

/**
 * Checks if URL contains any tracking/marketing parameters
 * @param {Object} searchParams - The search parameters from the request (Next.js format)
 * @returns {boolean} - True if tracking parameters are present
 */
export function hasTrackingParameters(searchParams) {
  if (!searchParams) return false;

  const trackingParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'utm_source_platform',
    'utm_creative_format',
    'utm_marketing_tactic',
    'gclid', // Google Ads click ID
    'fbclid', // Facebook click ID
    'msclkid', // Microsoft Ads click ID
    'ref', // Generic referrer parameter
    'source', // Generic source parameter
    'campaign', // Generic campaign parameter
  ];

  return trackingParams.some((param) => param in searchParams);
}

/**
 * Determines if self-referencing hreflang should be included
 * @param {Object} searchParams - The search parameters from the request (Next.js format)
 * @returns {boolean} - True if self-referencing hreflang should be included
 */
export function shouldIncludeSelfReferencingHreflang(searchParams) {
  // Don't include self-referencing hreflang if there are UTM or tracking parameters
  return !hasTrackingParameters(searchParams);
}

/**
 * Builds clean canonical URL without tracking parameters
 * @param {string} baseUrl - The base URL
 * @param {string} path - The path to append
 * @returns {string} - Clean canonical URL
 */
export function buildCanonicalUrl(baseUrl, path = '') {
  const cleanPath = path.replace(/\/+$/, ''); // Remove trailing slashes
  const url = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  return url.replace(/\/+$/, ''); // Ensure no trailing slash on final URL
}

/**
 * Builds alternate language URLs for hreflang
 * @param {string} baseUrl - The base URL
 * @param {string} currentLocale - Current page locale
 * @param {string} storySlug - The story slug
 * @param {Array} slugArray - The slug array from params
 * @param {Object} translatedSlugs - Translated slugs from story
 * @returns {Object} - Object with language codes as keys and URLs as values
 */
export function buildAlternateLanguageUrls(
  baseUrl,
  currentLocale,
  storySlug,
  slugArray,
  translatedSlugs
) {
  const alternateLinks = {};

  // Add current locale URL
  if (currentLocale === 'en') {
    const path = storySlug === 'home' ? '' : storySlug;
    alternateLinks['en'] = buildCanonicalUrl(baseUrl, path);
  } else {
    // For localized homepages, don't include /home/ in the URL
    const path =
      slugArray.length === 1 ? currentLocale : `${currentLocale}/${storySlug}`;
    alternateLinks[currentLocale] = buildCanonicalUrl(baseUrl, path);
  }

  // Add other language versions if they exist
  if (translatedSlugs) {
    for (const translation of translatedSlugs) {
      let translatedUrl;
      if (translation.lang === 'en') {
        // For English translations, remove /home/ if it's a homepage
        const path = translation.path === 'home' ? '' : translation.path;
        translatedUrl = buildCanonicalUrl(baseUrl, path);
      } else {
        // For other languages, handle homepages correctly
        const path =
          translation.path === 'home'
            ? translation.lang
            : `${translation.lang}/${translation.path}`;
        translatedUrl = buildCanonicalUrl(baseUrl, path);
      }

      alternateLinks[translation.lang] = translatedUrl;
    }
  }

  // Always ensure English version is included for non-English pages
  if (currentLocale !== 'en') {
    // Try to get the English version from translated_slugs first
    let englishUrl = null;
    if (translatedSlugs) {
      const englishTranslation = translatedSlugs.find((t) => t.lang === 'en');
      if (englishTranslation) {
        const path =
          englishTranslation.path === 'home' ? '' : englishTranslation.path;
        englishUrl = buildCanonicalUrl(baseUrl, path);
      }
    }

    // If no English translation found, construct the English URL
    if (!englishUrl) {
      if (slugArray.length === 1) {
        englishUrl = baseUrl; // For localized homepages, English version is root
      } else {
        englishUrl = buildCanonicalUrl(baseUrl, storySlug);
      }
    }

    alternateLinks['en'] = englishUrl;
  }

  // Always set x-default to point to the English version
  const englishVersion = alternateLinks['en'];
  if (englishVersion) {
    alternateLinks['x-default'] = englishVersion;
  }

  return alternateLinks;
}
