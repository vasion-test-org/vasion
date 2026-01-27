#!/usr/bin/env node

/**
 * SEO Compliance Check Script
 * Scans codebase for SEO issues and best practices
 * Run with: npm run checks:seo
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

const COLORS = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const issues = [];
let filesScanned = 0;

/**
 * Recursively get all files in directory
 */
function getFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  if (!existsSync(dir)) return files;
  
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    
    if (item === 'node_modules' || item === '.next' || item === 'out' || item === '.git') {
      continue;
    }

    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
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
    const hasStaticMetadata = content.includes('export const metadata') || content.includes('export const Metadata');
    const hasDynamicMetadata = content.includes('generateMetadata');
    const hasHead = content.includes('<Head>') || content.includes('next/head');
    
    if (!hasStaticMetadata && !hasDynamicMetadata && !hasHead) {
      issues.push({
        type: 'warning',
        category: 'Metadata',
        message: 'Page missing metadata export for title/description',
        file: filePath,
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
        type: 'info',
        category: 'Social Meta',
        message: 'Consider adding Open Graph metadata for better social sharing',
        file: filePath,
      });
    }
    
    if (!hasTwitter) {
      issues.push({
        type: 'info',
        category: 'Social Meta',
        message: 'Consider adding Twitter Card metadata for better Twitter sharing',
        file: filePath,
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
        type: 'info',
        category: 'Canonical URL',
        message: 'Page metadata missing canonical URL - important for duplicate content',
        file: filePath,
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
      type: 'error',
      category: 'Headings',
      message: `Multiple h1 tags found (${h1Count}). Pages should have exactly one h1.`,
      file: filePath,
    });
  }
  
  if (h1Count === 0 && (filePath.includes('/page.') || filePath.includes('pages/'))) {
    issues.push({
      type: 'warning',
      category: 'Headings',
      message: 'Page may be missing h1 tag',
      file: filePath,
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
        type: 'warning',
        category: 'Headings',
        message: `Heading level skipped from h${headings[i - 1]} to h${headings[i]}`,
        file: filePath,
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
      type: 'error',
      category: 'Headings',
      message: 'Empty heading tag found',
      file: filePath,
      code: matches[0],
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
        type: 'warning',
        category: 'Semantic HTML',
        message: 'Layout missing <main> landmark element',
        file: filePath,
      });
    }
  }

  // Check for excessive div nesting (div soup)
  const divSoup = /<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>/gi;
  
  if (divSoup.test(content)) {
    issues.push({
      type: 'info',
      category: 'Semantic HTML',
      message: 'Deep div nesting detected - consider using semantic elements (article, section, aside)',
      file: filePath,
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
        type: 'error',
        category: 'Images',
        message: 'Image missing alt text (critical for SEO)',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
  }

  // Next Image without alt
  const nextImgWithoutAlt = /<Image(?![^>]*\balt\s*=)[^>]*>/gi;
  const nextMatches = content.match(nextImgWithoutAlt);
  
  if (nextMatches) {
    nextMatches.forEach((match) => {
      issues.push({
        type: 'error',
        category: 'Images',
        message: 'Next.js Image missing alt text',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
  }

  // Check for generic alt text
  const genericAlt = /<(?:img|Image)[^>]*\balt\s*=\s*["'](?:image|photo|picture|img|untitled|banner|hero)["'][^>]*>/gi;
  const genericMatches = content.match(genericAlt);
  
  if (genericMatches) {
    genericMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: 'Images',
        message: 'Image has generic alt text - use descriptive text for better SEO',
        file: filePath,
        code: match.substring(0, 100),
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
  const genericLinkText = /<a[^>]*>(?:\s*(?:click\s+here|read\s+more|learn\s+more|here|more|link)\s*)<\/a>/gi;
  const genericMatches = content.match(genericLinkText);
  
  if (genericMatches) {
    genericMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: 'Links',
        message: 'Generic link text hurts SEO - use descriptive anchor text',
        file: filePath,
        code: match,
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
          type: 'warning',
          category: 'Links',
          message: 'External link missing rel="noopener noreferrer" (security)',
          file: filePath,
          code: match.substring(0, 100),
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
        type: 'error',
        category: 'Links',
        message: 'Link has empty href attribute',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
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
    const hasJsonLd = content.includes('application/ld+json') || 
                      content.includes('jsonLd') || 
                      content.includes('JSON-LD') ||
                      content.includes('structuredData');
    
    if (!hasJsonLd) {
      issues.push({
        type: 'info',
        category: 'Structured Data',
        message: 'Consider adding JSON-LD structured data for rich search results',
        file: filePath,
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
      type: 'warning',
      category: 'Performance',
      message: 'Using native <img> instead of Next.js Image (impacts Core Web Vitals/SEO)',
      file: filePath,
    });
  }

  // Next Image without sizes (when using fill)
  const fillWithoutSizes = /<Image[^>]*fill[^>]*(?!sizes)[^>]*>/gi;
  const fillMatches = content.match(fillWithoutSizes);
  
  if (fillMatches) {
    fillMatches.forEach((match) => {
      if (!match.includes('sizes')) {
        issues.push({
          type: 'warning',
          category: 'Performance',
          message: 'Next.js Image with fill prop missing sizes attribute',
          file: filePath,
          code: match.substring(0, 100),
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
    { file: 'robots.txt', path: 'public/robots.txt', critical: true },
    { file: 'sitemap.xml', path: 'public/sitemap.xml', critical: false },
    { file: 'favicon.ico', path: 'public/favicon.ico', critical: true },
    { file: 'favicon.ico (app)', path: 'app/favicon.ico', critical: false },
  ];

  requiredFiles.forEach(({ file, path, critical }) => {
    const fullPath = join(rootDir, path);
    if (!existsSync(fullPath)) {
      // Check alternative locations
      const altPath = path.replace('public/', 'app/');
      const altFullPath = join(rootDir, altPath);
      
      if (!existsSync(altFullPath)) {
        issues.push({
          type: critical ? 'warning' : 'info',
          category: 'SEO Files',
          message: `Missing ${file} - important for search engines`,
          file: path,
        });
      }
    }
  });

  // Check for sitemap generation config
  const nextSitemapConfig = join(rootDir, 'next-sitemap.config.js');
  if (!existsSync(nextSitemapConfig)) {
    issues.push({
      type: 'info',
      category: 'SEO Files',
      message: 'Consider adding next-sitemap for automatic sitemap generation',
      file: 'next-sitemap.config.js',
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
  console.log(`\n${COLORS.bold}${COLORS.blue}🔍 Running SEO Compliance Checks...${COLORS.reset}\n`);

  const rootDir = process.cwd();
  
  // Check SEO files first
  checkSEOFiles(rootDir);
  
  // Scan code files
  const dirsToScan = ['app', 'components', 'pages'].map((d) => join(rootDir, d));

  for (const dir of dirsToScan) {
    const files = getFiles(dir);
    files.forEach(scanFile);
  }

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
    console.log(`${COLORS.yellow}${COLORS.bold}⚠️  Warnings (${warnings.length}):${COLORS.reset}\n`);
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
  const categories = [...new Set(issues.map(i => i.category))];
  categories.forEach(cat => {
    const count = issues.filter(i => i.category === cat).length;
    console.log(`   ${cat}: ${count} issues`);
  });
  console.log('');

  return errors.length > 0 ? 1 : 0;
}

const exitCode = run();
process.exit(exitCode);
