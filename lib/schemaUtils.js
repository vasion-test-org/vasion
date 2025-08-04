/**
 * Validates and cleans schema markup
 * @param {Object|string} schemaData - The schema data to validate
 * @returns {Object|null} - Cleaned schema data or null if invalid
 */
export const validateSchemaMarkup = (schemaData) => {
  if (!schemaData) {
    return null;
  }

  try {
    // Parse if it's a string
    const parsed =
      typeof schemaData === 'string' ? JSON.parse(schemaData) : schemaData;

    // Basic validation - ensure it has @context and @type
    if (!parsed['@context'] || !parsed['@type']) {
      console.warn('Schema markup missing required @context or @type');
      return null;
    }

    // Clean up common issues
    const cleaned = { ...parsed };

    // Remove invalid properties from offers
    if (cleaned.offers) {
      delete cleaned.offers.eligibleCustomerType;
      delete cleaned.offers.category;
    }

    // Ensure reviews is an array if present
    if (
      cleaned.mainEntity?.review &&
      !Array.isArray(cleaned.mainEntity.review)
    ) {
      cleaned.mainEntity.review = [cleaned.mainEntity.review];
    }

    // Add missing required fields for AggregateRating
    if (cleaned.mainEntity?.aggregateRating) {
      const rating = cleaned.mainEntity.aggregateRating;
      if (!rating.ratingValue) {
        rating.ratingValue = '0';
      }
      if (!rating.reviewCount) {
        rating.reviewCount = '0';
      }
    }

    return cleaned;
  } catch (error) {
    console.error('Error validating schema markup:', error);
    return null;
  }
};

/**
 * Generates a default schema for a page if none is provided
 * @param {Object} pageData - The page data
 * @returns {Object} - Default schema markup
 */
export const generateDefaultSchema = (pageData) => {
  const baseUrl = 'https://vasion.com';
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData?.content?.metadata?.title || 'Vasion',
    description:
      pageData?.content?.metadata?.description ||
      'Vasion Print Management Solutions',
    url: `${baseUrl}${currentPath}`,
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://vasion.com/#organization',
      name: 'Vasion',
      alternateName: 'PrinterLogic',
      description:
        'Provider of print management and automation technology solutions',
      url: 'https://vasion.com',
      logo: 'https://vasion.com/path-to-logo.png',
      sameAs: [
        'https://www.linkedin.com/company/vasion-software/',
        'https://www.facebook.com/VasionSoftware/',
        'https://x.com/vasionsoftware?lang=en',
        'https://www.youtube.com/@VasionSoftware',
        'https://www.crunchbase.com/organization/maxxvault',
        'https://www.g2.com/products/vasion/reviews',
        'https://www.glassdoor.com/Overview/Working-at-Vasion-EI_IE4614888.11,17.htm',
      ],
    },
  };
};
