// Test script to demonstrate sitemap URL generation logic

const locales = ["en", "de", "fr"];
const baseUrls = {
  en: "https://vasion.com",
  de: "https://vasion.com/de",
  fr: "https://vasion.com/fr",
};

function generateSitemapUrl(fullSlug, locale) {
  let slug = fullSlug.replace(/\/$/, "");
  
  // Remove locale prefix if present
  if (locale !== "en") {
    slug = slug.replace(new RegExp(`^${locale}/`), "");
  } else {
    slug = slug.replace(/^en\//, "");
  }
  
  // Always strip "home" from the slug when it's a complete segment
  // Match "home" only when it's standalone or delimited by slashes (not part of words)
  // This handles: "home", "home/", "/home", "/home/", "path/home", "home/path"
  slug = slug.replace(/^home$/, ""); // Standalone "home"
  slug = slug.replace(/^home\//, ""); // "home/" at start
  slug = slug.replace(/\/home$/, ""); // "/home" at end
  slug = slug.replace(/\/home\//, "/"); // "/home/" in middle, replace with "/"
  slug = slug.replace(/\/+$/, ""); // Remove trailing slashes
  
  // Build the URL (matching hreflang format - no trailing slashes)
  // If slug is empty after processing, it's the homepage (baseUrl only)
  const loc = slug
    ? `${baseUrls[locale]}/${slug}`.replace(/\/+$/, "")
    : baseUrls[locale];
  
  return loc;
}

// Test cases
const testCases = [
  // English test cases
  { fullSlug: "home", locale: "en", expected: "https://vasion.com" },
  { fullSlug: "home/", locale: "en", expected: "https://vasion.com" },
  { fullSlug: "en/home", locale: "en", expected: "https://vasion.com" },
  { fullSlug: "en/home/", locale: "en", expected: "https://vasion.com" },
  { fullSlug: "about", locale: "en", expected: "https://vasion.com/about" },
  { fullSlug: "en/about", locale: "en", expected: "https://vasion.com/about" },
  { fullSlug: "products/pricing", locale: "en", expected: "https://vasion.com/products/pricing" },
  { fullSlug: "home/about", locale: "en", expected: "https://vasion.com/about" },
  
  // German test cases
  { fullSlug: "home", locale: "de", expected: "https://vasion.com/de" },
  { fullSlug: "home/", locale: "de", expected: "https://vasion.com/de" },
  { fullSlug: "de/home", locale: "de", expected: "https://vasion.com/de" },
  { fullSlug: "de/home/", locale: "de", expected: "https://vasion.com/de" },
  { fullSlug: "about", locale: "de", expected: "https://vasion.com/de/about" },
  { fullSlug: "de/about", locale: "de", expected: "https://vasion.com/de/about" },
  { fullSlug: "products/pricing", locale: "de", expected: "https://vasion.com/de/products/pricing" },
  { fullSlug: "home/about", locale: "de", expected: "https://vasion.com/de/about" },
  
  // French test cases
  { fullSlug: "home", locale: "fr", expected: "https://vasion.com/fr" },
  { fullSlug: "home/", locale: "fr", expected: "https://vasion.com/fr" },
  { fullSlug: "fr/home", locale: "fr", expected: "https://vasion.com/fr" },
  { fullSlug: "fr/home/", locale: "fr", expected: "https://vasion.com/fr" },
  { fullSlug: "about", locale: "fr", expected: "https://vasion.com/fr/about" },
  { fullSlug: "fr/about", locale: "fr", expected: "https://vasion.com/fr/about" },
  { fullSlug: "products/pricing", locale: "fr", expected: "https://vasion.com/fr/products/pricing" },
  { fullSlug: "home/about", locale: "fr", expected: "https://vasion.com/fr/about" },
  
  // Edge cases with "home" in the middle of words
  { fullSlug: "vasion-homepage-2025", locale: "en", expected: "https://vasion.com/vasion-homepage-2025" },
  { fullSlug: "vasion-homepage-2025/", locale: "en", expected: "https://vasion.com/vasion-homepage-2025" },
  { fullSlug: "de/vasion-homepage-2025", locale: "de", expected: "https://vasion.com/de/vasion-homepage-2025" },
  { fullSlug: "fr/vasion-homepage-2025", locale: "fr", expected: "https://vasion.com/fr/vasion-homepage-2025" },
  { fullSlug: "work-from-home", locale: "en", expected: "https://vasion.com/work-from-home" },
  { fullSlug: "home-improvement", locale: "en", expected: "https://vasion.com/home-improvement" }, // Starts with "home-"
  { fullSlug: "improvement-home", locale: "en", expected: "https://vasion.com/improvement-home" }, // Ends with "-home"
];

console.log("Sitemap URL Generation Test Results:\n");
console.log("=".repeat(80));

testCases.forEach((test, index) => {
  const result = generateSitemapUrl(test.fullSlug, test.locale);
  const passed = result === test.expected;
  const status = passed ? "✅ PASS" : "❌ FAIL";
  
  console.log(`\nTest ${index + 1}: ${status}`);
  console.log(`  Input:    fullSlug="${test.fullSlug}", locale="${test.locale}"`);
  console.log(`  Expected: ${test.expected}`);
  console.log(`  Got:      ${result}`);
  
  if (!passed) {
    console.log(`  ⚠️  MISMATCH!`);
  }
});

console.log("\n" + "=".repeat(80));

// Show example XML output
console.log("\nExample XML Output for 'de/home' (locale: de):");
console.log("─".repeat(80));
const exampleUrl = generateSitemapUrl("de/home", "de");
console.log(`<url>
  <loc>${exampleUrl}</loc>
  <lastmod>2025-08-11T09:11:09.797Z</lastmod>
</url>`);

