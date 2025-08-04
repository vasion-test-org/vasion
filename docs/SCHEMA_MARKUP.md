# Schema Markup Implementation

This document explains how to implement dynamic schema markup in your Vasion Next.js application.

## Overview

The schema markup system allows you to dynamically inject structured data into your pages based on content from Storyblok. This improves SEO and helps search engines better understand your content.

## How It Works

### 1. Data Flow

- Storyblok content includes a `code` field containing JSON schema markup
- The `PageDataUpdater` component updates the page data context
- The `ClientSchemaWrapper` component accesses page data and renders `ServerSchemaMarkup`
- The `ServerSchemaMarkup` component injects the schema into the page using Next.js Script

### 2. Components

#### Client Schema Wrapper (`components/ClientSchemaWrapper.js`)

- Client-side component that accesses page data from context
- Conditionally renders server schema markup only when schema data exists
- Provides a bridge between page data context and server-side schema rendering

#### Server-Side Schema Markup (`components/ServerSchemaMarkup.js`)

- Uses Next.js `Script` component for optimal SEO
- Validates schema before rendering
- Renders schema markup in the initial HTML for search engine crawlers
- Handles both string and object schema data

#### Validation Utility (`lib/schemaUtils.js`)

- Validates schema markup structure
- Cleans up invalid properties
- Provides fallback schema generation

## Usage

### In Storyblok

Add a `code` field to your content blocks with JSON schema markup:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Review Us - Vasion",
  "description": "Share your experience with Vasion Print and help other IT professionals make informed decisions.",
  "url": "https://vasion.com/review-us/",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://vasion.com/#organization",
    "name": "Vasion",
    "alternateName": "PrinterLogic",
    "description": "Provider of print management and automation technology solutions",
    "url": "https://vasion.com",
    "logo": "https://vasion.com/path-to-logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/vasion-software/",
      "https://www.facebook.com/VasionSoftware/",
      "https://x.com/vasionsoftware?lang=en"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "22",
      "description": "Customer reviews and ratings for Vasion Print and automation solutions"
    }
  }
}
```

### Schema Validation

The system automatically:

- Validates required fields (`@context`, `@type`)
- Removes invalid properties from offers
- Ensures reviews are in array format
- Adds missing required fields for AggregateRating

### Common Schema Types

#### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vasion",
  "alternateName": "PrinterLogic",
  "description": "Provider of print management and automation technology solutions",
  "url": "https://vasion.com",
  "logo": "https://vasion.com/path-to-logo.png",
  "sameAs": ["https://www.linkedin.com/company/vasion-software/"]
}
```

#### Product Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vasion Print",
  "alternateName": "PrinterLogic",
  "applicationCategory": "Print Management Software",
  "operatingSystem": "Cross-platform",
  "provider": {
    "@type": "Organization",
    "name": "Vasion"
  }
}
```

#### Review Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewBody": "The overall experience has been great! It's simplified printer management and deployment.",
  "author": {
    "@type": "Person",
    "name": "Vasion Customer"
  },
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "Vasion Print"
  }
}
```

## Implementation Details

### Automatic Integration

The schema markup is automatically integrated into:

1. **Dynamic Pages**: Server-side schema injection using Next.js Script for optimal SEO
2. **Conditional Rendering**: Only renders when schema data is available

### Error Handling

- Invalid JSON is caught and logged
- Missing required fields trigger warnings
- Invalid properties are automatically removed
- Fallback to default schema if needed

### Performance

- Server-side rendering using Next.js Script for immediate SEO benefits
- Conditional rendering to avoid unnecessary processing
- Validation to prevent invalid schema injection
- No client-side JavaScript execution for schema injection

## Testing

### Google Rich Results Test

Use Google's Rich Results Test to validate your schema:
https://search.google.com/test/rich-results

### Schema.org Validator

Use the Schema.org validator:
https://validator.schema.org/

### Browser Developer Tools

Check the rendered schema in browser dev tools:

1. Open Developer Tools
2. Go to Elements tab
3. Search for `application/ld+json`
4. Verify the schema is properly formatted

## Best Practices

1. **Always validate** your schema before deploying
2. **Use specific types** rather than generic ones
3. **Include required fields** for each schema type
4. **Keep schemas focused** on the main content of the page
5. **Test with Google's tools** to ensure rich results
6. **Update schemas** when content changes significantly

## Troubleshooting

### Schema Not Appearing

- Check that the `code` field exists in Storyblok
- Verify the JSON is valid
- Check browser console for errors
- Ensure the component is properly imported

### Invalid Schema Errors

- Use the validation utility to clean up common issues
- Remove invalid properties manually
- Test with schema validators before deployment

### Performance Issues

- Schema markup is lightweight and shouldn't impact performance
- If issues occur, check for circular references in JSON
- Ensure cleanup functions are working properly
