#!/usr/bin/env node

/**
 * SEO Compliance Check Script
 * Scans codebase for SEO issues and best practices
 *
 * This script checks for:
 * - Metadata: titles, descriptions, Open Graph, Twitter cards, canonical URLs
 * - Indexing: robots directives, noindex/nofollow detection
 * - Headings: hierarchy (h1-h6), single h1 per page, no skipped levels
 * - Semantic HTML: landmarks (main, nav, header, footer), div soup detection
 * - Images: alt text, Next.js Image optimization, generic alt text
 * - Links: anchor text quality, external link security (noopener/noreferrer)
 * - Structured Data: JSON-LD presence
 * - Performance: Core Web Vitals impact (image optimization)
 * - URL Structure: dynamic routes, internal linking
 * - Content Quality: thin content detection
 *
 * Note: For comprehensive SEO, also consider:
 * - Google Search Console monitoring
 * - Core Web Vitals testing (Lighthouse)
 * - Mobile-friendliness testing
 * - Schema markup validation (schema.org)
 *
 * Usage:
 *   npm run checks:seo                    # Scan entire codebase
 *   npm run checks:seo -- path/to/file.js # Scan specific file
 *   npm run checks:seo -- components/     # Scan specific directory
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, resolve } from 'path';

const COLORS = {
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  yellow: '\x1b[33m',
};

const issues = [];
let filesScanned = 0;

/**
 * Get target paths from command line arguments
 */
function getTargetPaths() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return null; // Scan entire codebase
  }
  return args.map((arg) => resolve(process.cwd(), arg));
}

/**
 * Recursively get all files in directory
 */
function getFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  if (!existsSync(dir)) return files;

  const stat = statSync(dir);

  // If it's a file, return it directly
  if (stat.isFile()) {
    if (extensions.includes(extname(dir))) {
      return [dir];
    }
    return [];
  }

  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);

    if (item === 'node_modules' || item === '.next' || item === 'out' || item === '.git') {
      continue;
    }

    const itemStat = statSync(fullPath);

    if (itemStat.isDirectory()) {
      files.push(...getFiles(fullPath, extensions));
    } else if (extensions.includes(extname(item))) {
      files.push(fullPath);
    }
  }

  return files;
}

// ============================================
// Metadata Checks
// ============================================

/**
 * Check for metadata exports in page files
 */
function checkMetadataExport(content, filePath) {
  const isPageFile = filePath.includes('/page.') || filePath.match(/pages\/.*\.(js|jsx|ts|tsx)$/);

  if (isPageFile && !filePath.includes('_app') && !filePath.includes('_document')) {
    const hasStaticMetadata =
      content.includes('export const metadata') || content.includes('export const Metadata');
    const hasDynamicMetadata = content.includes('generateMetadata');
    const hasHead = content.includes('<Head>') || content.includes('next/head');

    if (!hasStaticMetadata && !hasDynamicMetadata && !hasHead) {
      issues.push({
        category: 'Metadata',
        file: filePath,
        message: 'Page missing metadata export for title/description',
        type: 'warning',
      });
    }
  }
}

/**
 * Check for Open Graph and Twitter card meta tags
 */
function checkSocialMeta(content, filePath) {
  const isLayoutOrPage = filePath.includes('/layout.') || filePath.includes('/page.');

  if (isLayoutOrPage && content.includes('metadata')) {
    const hasOpenGraph = content.includes('openGraph') || content.includes('og:');
    const hasTwitter = content.includes('twitter') || content.includes('twitter:');

    if (!hasOpenGraph) {
      issues.push({
        category: 'Social Meta',
        file: filePath,
        message: 'Consider adding Open Graph metadata for better social sharing',
        type: 'info',
      });
    }

    if (!hasTwitter) {
      issues.push({
        category: 'Social Meta',
        file: filePath,
        message: 'Consider adding Twitter Card metadata for better Twitter sharing',
        type: 'info',
      });
    }
  }
}

/**
 * Check for canonical URL configuration
 */
function checkCanonicalUrl(content, filePath) {
  const isPageFile = filePath.includes('/page.');

  if (isPageFile && content.includes('metadata')) {
    const hasCanonical = content.includes('canonical') || content.includes('alternates');

    if (!hasCanonical) {
      issues.push({
        category: 'Canonical URL',
        file: filePath,
        message: 'Page metadata missing canonical URL - important for duplicate content',
        type: 'info',
      });
    }
  }
}

// ============================================
// Heading Structure
// ============================================

/**
 * Check heading hierarchy
 */
function checkHeadingHierarchy(content, filePath) {
  // Check for multiple h1 tags
  const h1Matches = content.match(/<h1[^>]*>/gi) || [];
  const h1Count = h1Matches.length;

  if (h1Count > 1) {
    issues.push({
      category: 'Headings',
      file: filePath,
      message: `Multiple h1 tags found (${h1Count}). Pages should have exactly one h1.`,
      type: 'error',
    });
  }

  if (h1Count === 0 && (filePath.includes('/page.') || filePath.includes('pages/'))) {
    issues.push({
      category: 'Headings',
      file: filePath,
      message: 'Page may be missing h1 tag',
      type: 'warning',
    });
  }

  // Check for skipped heading levels
  const headingPattern = /<h([1-6])[^>]*>/gi;
  const headings = [];
  let match;

  while ((match = headingPattern.exec(content)) !== null) {
    headings.push(parseInt(match[1]));
  }

  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      issues.push({
        category: 'Headings',
        file: filePath,
        message: `Heading level skipped from h${headings[i - 1]} to h${headings[i]}`,
        type: 'warning',
      });
      break; // Only report first skip per file
    }
  }
}

/**
 * Check for empty headings
 */
function checkEmptyHeadings(content, filePath) {
  const emptyHeadings = /<h[1-6][^>]*>[\s]*<\/h[1-6]>/gi;
  const matches = content.match(emptyHeadings);

  if (matches) {
    issues.push({
      category: 'Headings',
      code: matches[0],
      file: filePath,
      message: 'Empty heading tag found',
      type: 'error',
    });
  }
}

// ============================================
// Semantic HTML
// ============================================

/**
 * Check for semantic HTML usage
 */
function checkSemanticHTML(content, filePath) {
  const isPageOrLayout = filePath.includes('/page.') || filePath.includes('/layout.');

  if (isPageOrLayout) {
    const hasMain = content.includes('<main') || content.includes('<Main');
    const hasNav = content.includes('<nav') || content.includes('<Nav');
    const hasHeader = content.includes('<header') || content.includes('<Header');
    const hasFooter = content.includes('<footer') || content.includes('<Footer');

    if (!hasMain && filePath.includes('/layout.')) {
      issues.push({
        category: 'Semantic HTML',
        file: filePath,
        message: 'Layout missing <main> landmark element',
        type: 'warning',
      });
    }
  }

  // Check for excessive div nesting (div soup)
  const divSoup = /<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>/gi;

  if (divSoup.test(content)) {
    issues.push({
      category: 'Semantic HTML',
      file: filePath,
      message:
        'Deep div nesting detected - consider using semantic elements (article, section, aside)',
      type: 'info',
    });
  }
}

// ============================================
// Images
// ============================================

/**
 * Check for images without alt text
 */
function checkImageAltText(content, filePath) {
  // Native img without alt
  const imgWithoutAlt = /<img(?![^>]*\balt\s*=)[^>]*>/gi;
  const matches = content.match(imgWithoutAlt);

  if (matches) {
    matches.forEach((match) => {
      issues.push({
        category: 'Images',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Image missing alt text (critical for SEO)',
        type: 'error',
      });
    });
  }

  // Next Image without alt
  const nextImgWithoutAlt = /<Image(?![^>]*\balt\s*=)[^>]*>/gi;
  const nextMatches = content.match(nextImgWithoutAlt);

  if (nextMatches) {
    nextMatches.forEach((match) => {
      issues.push({
        category: 'Images',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Next.js Image missing alt text',
        type: 'error',
      });
    });
  }

  // Check for generic alt text
  const genericAlt =
    /<(?:img|Image)[^>]*\balt\s*=\s*["'](?:image|photo|picture|img|untitled|banner|hero)["'][^>]*>/gi;
  const genericMatches = content.match(genericAlt);

  if (genericMatches) {
    genericMatches.forEach((match) => {
      issues.push({
        category: 'Images',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Image has generic alt text - use descriptive text for better SEO',
        type: 'warning',
      });
    });
  }
}

// ============================================
// Links
// ============================================

/**
 * Check link SEO best practices
 */
function checkLinks(content, filePath) {
  // Generic link text
  const genericLinkText =
    /<a[^>]*>(?:\s*(?:click\s+here|read\s+more|learn\s+more|here|more|link)\s*)<\/a>/gi;
  const genericMatches = content.match(genericLinkText);

  if (genericMatches) {
    genericMatches.forEach((match) => {
      issues.push({
        category: 'Links',
        code: match,
        file: filePath,
        message: 'Generic link text hurts SEO - use descriptive anchor text',
        type: 'warning',
      });
    });
  }

  // External links without rel attributes
  const externalLinks = /<a[^>]*target\s*=\s*["']_blank["'][^>]*>/gi;
  const externalMatches = content.match(externalLinks);

  if (externalMatches) {
    externalMatches.forEach((match) => {
      if (!match.includes('noopener') && !match.includes('noreferrer')) {
        issues.push({
          category: 'Links',
          code: match.substring(0, 100),
          file: filePath,
          message: 'External link missing rel="noopener noreferrer" (security)',
          type: 'warning',
        });
      }
    });
  }

  // Empty links
  const emptyLinks = /<a[^>]*href\s*=\s*["']\s*["'][^>]*>/gi;
  const emptyMatches = content.match(emptyLinks);

  if (emptyMatches) {
    emptyMatches.forEach((match) => {
      issues.push({
        category: 'Links',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Link has empty href attribute',
        type: 'error',
      });
    });
  }
}

// ============================================
// Robots & Indexing
// ============================================

/**
 * Check for robots directives that block indexing
 */
function checkRobotsDirectives(content, filePath) {
  // Check for noindex directives
  const noindexPatterns = [
    /robots:\s*['"]noindex/gi,
    /robots:\s*\{\s*index:\s*false/gi,
    /'noindex'/gi,
  ];

  for (const pattern of noindexPatterns) {
    if (pattern.test(content)) {
      issues.push({
        category: 'Indexing',
        file: filePath,
        message: 'Page has noindex directive - will not appear in search results',
        type: 'warning',
      });
      break;
    }
  }

  // Check for nofollow
  if (
    /robots:\s*['"]nofollow/gi.test(content) ||
    /robots:\s*\{\s*follow:\s*false/gi.test(content)
  ) {
    issues.push({
      category: 'Indexing',
      file: filePath,
      message: 'Page has nofollow directive - links will not pass PageRank',
      type: 'info',
    });
  }
}

// ============================================
// Mobile & Viewport
// ============================================

/**
 * Check for viewport configuration
 */
function checkViewportMeta(content, filePath) {
  const isRootLayout = filePath.includes('app/layout.') || filePath.includes('pages/_app.');

  if (isRootLayout) {
    const hasViewport = content.includes('viewport') || content.includes('Viewport');

    // Next.js 13+ handles viewport automatically, but check for custom configs
    if (content.includes('viewport') && !content.includes('width=device-width')) {
      issues.push({
        category: 'Mobile',
        file: filePath,
        message: 'Viewport meta should include width=device-width for mobile responsiveness',
        type: 'warning',
      });
    }
  }
}

// ============================================
// URL Structure
// ============================================

/**
 * Check for URL best practices
 */
function checkUrlStructure(content, filePath) {
  // Check for dynamic routes with poor SEO patterns
  if (filePath.includes('[') && !filePath.includes('generateStaticParams')) {
    // Check if it's a dynamic route without static generation
    if (!content.includes('generateStaticParams') && !content.includes('getStaticPaths')) {
      issues.push({
        category: 'URL Structure',
        file: filePath,
        message: 'Dynamic route without generateStaticParams - consider static generation for SEO',
        type: 'info',
      });
    }
  }

  // Check for hardcoded internal links
  const hardcodedLinks = /href\s*=\s*["']https?:\/\/(?:www\.)?vasion\.com/gi;
  if (hardcodedLinks.test(content)) {
    issues.push({
      category: 'URL Structure',
      file: filePath,
      message: 'Hardcoded domain in internal links - use relative URLs for portability',
      type: 'info',
    });
  }
}

/**
 * Check for breadcrumb implementation
 */
function checkBreadcrumbs(content, filePath) {
  const isPageFile = filePath.includes('/page.');

  if (isPageFile) {
    // Check for breadcrumb structured data or components
    const hasBreadcrumbs =
      content.includes('BreadcrumbList') ||
      content.includes('breadcrumb') ||
      content.includes('Breadcrumb');

    // Only suggest for non-root pages
    if (!hasBreadcrumbs && filePath.split('/').length > 3) {
      issues.push({
        category: 'Navigation',
        file: filePath,
        message: 'Consider adding breadcrumbs for better navigation and SEO',
        type: 'info',
      });
    }
  }
}

// ============================================
// Content Quality
// ============================================

/**
 * Check for thin content indicators
 */
function checkContentQuality(content, filePath) {
  const isPageFile = filePath.includes('/page.');

  if (isPageFile) {
    // Count text content (rough estimate)
    const textContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Very short pages might indicate thin content
    if (textContent.length < 100) {
      issues.push({
        category: 'Content',
        file: filePath,
        message: 'Page may have thin content - search engines prefer substantial content',
        type: 'info',
      });
    }
  }

  // Check for duplicate title/description patterns
  const titlePattern = /title:\s*["']([^"']+)["']/g;
  const titles = [];
  let match;
  while ((match = titlePattern.exec(content)) !== null) {
    if (titles.includes(match[1])) {
      issues.push({
        category: 'Content',
        file: filePath,
        message: 'Duplicate title found in metadata - ensure unique titles per page',
        type: 'warning',
      });
      break;
    }
    titles.push(match[1]);
  }
}

// ============================================
// Structured Data
// ============================================

/**
 * Check for structured data (JSON-LD)
 */
function checkStructuredData(content, filePath) {
  const isPageFile = filePath.includes('/page.');

  if (isPageFile) {
    const hasJsonLd =
      content.includes('application/ld+json') ||
      content.includes('jsonLd') ||
      content.includes('JSON-LD') ||
      content.includes('structuredData');

    if (!hasJsonLd) {
      issues.push({
        category: 'Structured Data',
        file: filePath,
        message: 'Consider adding JSON-LD structured data for rich search results',
        type: 'info',
      });
    }
  }
}

// ============================================
// Performance (SEO Impact)
// ============================================

/**
 * Check for Next.js Image optimization
 */
function checkImageOptimization(content, filePath) {
  // Native img instead of Next Image
  const hasNativeImg = /<img\s/gi.test(content);
  const hasNextImageImport = /from\s+['"]next\/image['"]/.test(content);

  if (hasNativeImg && !hasNextImageImport) {
    issues.push({
      category: 'Performance',
      file: filePath,
      message: 'Using native <img> instead of Next.js Image (impacts Core Web Vitals/SEO)',
      type: 'warning',
    });
  }

  // Next Image without sizes (when using fill)
  const fillWithoutSizes = /<Image[^>]*fill[^>]*(?!sizes)[^>]*>/gi;
  const fillMatches = content.match(fillWithoutSizes);

  if (fillMatches) {
    fillMatches.forEach((match) => {
      if (!match.includes('sizes')) {
        issues.push({
          category: 'Performance',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Next.js Image with fill prop missing sizes attribute',
          type: 'warning',
        });
      }
    });
  }
}

// ============================================
// File-based SEO Assets
// ============================================

/**
 * Check for required SEO files
 */
function checkSEOFiles(rootDir) {
  const requiredFiles = [
    { critical: true, file: 'robots.txt', path: 'public/robots.txt' },
    { critical: false, file: 'sitemap.xml', path: 'public/sitemap.xml' },
    { critical: true, file: 'favicon.ico', path: 'public/favicon.ico' },
    { critical: false, file: 'favicon.ico (app)', path: 'app/favicon.ico' },
  ];

  requiredFiles.forEach(({ critical, file, path }) => {
    const fullPath = join(rootDir, path);
    if (!existsSync(fullPath)) {
      // Check alternative locations
      const altPath = path.replace('public/', 'app/');
      const altFullPath = join(rootDir, altPath);

      if (!existsSync(altFullPath)) {
        issues.push({
          category: 'SEO Files',
          file: path,
          message: `Missing ${file} - important for search engines`,
          type: critical ? 'warning' : 'info',
        });
      }
    }
  });

  // Check for sitemap generation config
  const nextSitemapConfig = join(rootDir, 'next-sitemap.config.js');
  if (!existsSync(nextSitemapConfig)) {
    issues.push({
      category: 'SEO Files',
      file: 'next-sitemap.config.js',
      message: 'Consider adding next-sitemap for automatic sitemap generation',
      type: 'info',
    });
  }
}

/**
 * Main scanning function
 */
function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    filesScanned++;

    // Metadata
    checkMetadataExport(content, filePath);
    checkSocialMeta(content, filePath);
    checkCanonicalUrl(content, filePath);

    // Indexing & Robots
    checkRobotsDirectives(content, filePath);
    checkViewportMeta(content, filePath);

    // URL Structure
    checkUrlStructure(content, filePath);
    checkBreadcrumbs(content, filePath);

    // Content Quality
    checkContentQuality(content, filePath);

    // Headings
    checkHeadingHierarchy(content, filePath);
    checkEmptyHeadings(content, filePath);

    // Semantic HTML
    checkSemanticHTML(content, filePath);

    // Images
    checkImageAltText(content, filePath);

    // Links
    checkLinks(content, filePath);

    // Structured Data
    checkStructuredData(content, filePath);

    // Performance
    checkImageOptimization(content, filePath);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

/**
 * Run the SEO checks
 */
function run() {
  const targetPaths = getTargetPaths();
  const isSingleTarget = targetPaths !== null;

  console.log(`\n${COLORS.bold}${COLORS.blue}🔍 Running SEO Compliance Checks...${COLORS.reset}`);
  if (isSingleTarget) {
    console.log(`${COLORS.cyan}Target: ${targetPaths.join(', ')}${COLORS.reset}`);
  }
  console.log('');

  const rootDir = process.cwd();

  // Only check SEO files when scanning entire codebase
  if (!isSingleTarget) {
    checkSEOFiles(rootDir);
  }

  // Scan code files
  const filesToScan = [];

  if (isSingleTarget) {
    // Scan specific files/directories
    for (const targetPath of targetPaths) {
      filesToScan.push(...getFiles(targetPath));
    }
  } else {
    // Scan entire codebase
    const dirsToScan = ['app', 'components', 'pages'].map((d) => join(rootDir, d));
    for (const dir of dirsToScan) {
      filesToScan.push(...getFiles(dir));
    }
  }

  filesToScan.forEach(scanFile);

  // Report results
  console.log(`${COLORS.bold}Files scanned: ${filesScanned}${COLORS.reset}\n`);

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');
  const infos = issues.filter((i) => i.type === 'info');

  if (errors.length > 0) {
    console.log(`${COLORS.red}${COLORS.bold}❌ Errors (${errors.length}):${COLORS.reset}\n`);
    errors.forEach((issue) => {
      console.log(`  ${COLORS.red}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(`  ${COLORS.blue}File:${COLORS.reset} ${issue.file}`);
      if (issue.code) console.log(`  ${COLORS.yellow}Code:${COLORS.reset} ${issue.code}`);
      console.log('');
    });
  }

  if (warnings.length > 0) {
    console.log(
      `${COLORS.yellow}${COLORS.bold}⚠️  Warnings (${warnings.length}):${COLORS.reset}\n`
    );
    warnings.forEach((issue) => {
      console.log(`  ${COLORS.yellow}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(`  ${COLORS.blue}File:${COLORS.reset} ${issue.file}`);
      if (issue.code) console.log(`  ${COLORS.yellow}Code:${COLORS.reset} ${issue.code}`);
      console.log('');
    });
  }

  if (infos.length > 0) {
    console.log(`${COLORS.cyan}${COLORS.bold}ℹ️  Suggestions (${infos.length}):${COLORS.reset}\n`);
    infos.forEach((issue) => {
      console.log(`  ${COLORS.cyan}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(`  ${COLORS.blue}File:${COLORS.reset} ${issue.file}`);
      console.log('');
    });
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`${COLORS.green}${COLORS.bold}✅ No critical SEO issues found!${COLORS.reset}\n`);
  }

  // Summary by category
  console.log(`${COLORS.bold}📊 Summary by Category:${COLORS.reset}`);
  const categories = [...new Set(issues.map((i) => i.category))];
  categories.forEach((cat) => {
    const count = issues.filter((i) => i.category === cat).length;
    console.log(`   ${cat}: ${count} issues`);
  });
  console.log('');

  return errors.length > 0 ? 1 : 0;
}

const exitCode = run();
process.exit(exitCode);
