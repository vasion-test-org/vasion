#!/usr/bin/env node

/**
 * ADA/WCAG 2.1 AA Compliance Check Script
 * Scans codebase for accessibility issues
 * Run with: npm run checks:ada
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
// WCAG 2.1 AA - Perceivable
// ============================================

/**
 * 1.1.1 Non-text Content - Check for images without alt attributes
 */
function checkImagesWithoutAlt(content, filePath) {
  const imgWithoutAlt = /<img(?![^>]*\balt\s*=)[^>]*>/gi;
  const matches = content.match(imgWithoutAlt);
  
  if (matches) {
    matches.forEach((match) => {
      issues.push({
        type: 'error',
        category: '1.1.1 Non-text Content',
        message: 'Image missing alt attribute',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
  }

  // Check for Next.js Image without alt
  const nextImageWithoutAlt = /<Image(?![^>]*\balt\s*=)[^>]*>/gi;
  const nextMatches = content.match(nextImageWithoutAlt);
  
  if (nextMatches) {
    nextMatches.forEach((match) => {
      issues.push({
        type: 'error',
        category: '1.1.1 Non-text Content',
        message: 'Next.js Image missing alt attribute',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
  }

  // Check for empty alt on potentially meaningful images
  const emptyAlt = /<(?:img|Image)[^>]*\balt\s*=\s*["']\s*["'][^>]*>/gi;
  const emptyMatches = content.match(emptyAlt);
  
  if (emptyMatches) {
    emptyMatches.forEach((match) => {
      if (!match.includes('aria-hidden') && !match.includes('decorative') && !match.includes('role="presentation"')) {
        issues.push({
          type: 'warning',
          category: '1.1.1 Non-text Content',
          message: 'Image has empty alt - ensure this is decorative only',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }
}

/**
 * 1.2.1-1.2.5 Time-based Media - Check for video/audio without captions
 */
function checkMediaAccessibility(content, filePath) {
  // Check for video elements without track
  const videoWithoutTrack = /<video[^>]*>(?:(?!<track).)*<\/video>/gis;
  const videoMatches = content.match(videoWithoutTrack);
  
  if (videoMatches) {
    videoMatches.forEach((match) => {
      if (!match.includes('<track')) {
        issues.push({
          type: 'warning',
          category: '1.2.2 Captions',
          message: 'Video may be missing captions track',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }

  // Check for ReactPlayer without captions config
  const reactPlayer = /<ReactPlayer[^>]*>/gi;
  const playerMatches = content.match(reactPlayer);
  
  if (playerMatches) {
    playerMatches.forEach((match) => {
      if (!match.includes('config') || !content.includes('tracks')) {
        issues.push({
          type: 'info',
          category: '1.2.2 Captions',
          message: 'ReactPlayer detected - ensure captions are configured if video has audio',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }
}

/**
 * 1.3.1 Info and Relationships - Check for proper semantic structure
 */
function checkSemanticStructure(content, filePath) {
  // Check for divs with click handlers that should be buttons
  const divWithClick = /<div[^>]*onClick[^>]*>/gi;
  const matches = content.match(divWithClick);
  
  if (matches) {
    matches.forEach((match) => {
      if (!match.includes('role="button"') && !match.includes('role="link"')) {
        issues.push({
          type: 'warning',
          category: '1.3.1 Info and Relationships',
          message: 'Div with onClick should use <button> or have role="button"',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }

  // Check for spans with click handlers
  const spanWithClick = /<span[^>]*onClick[^>]*>/gi;
  const spanMatches = content.match(spanWithClick);
  
  if (spanMatches) {
    spanMatches.forEach((match) => {
      if (!match.includes('role=')) {
        issues.push({
          type: 'warning',
          category: '1.3.1 Info and Relationships',
          message: 'Span with onClick should use appropriate interactive element or role',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }
}

/**
 * 1.4.3 Contrast (Minimum) - Check for potential contrast issues
 */
function checkColorContrast(content, filePath) {
  // Light text on light backgrounds
  const lightOnLight = /(?:text-(?:grey-(?:100|200|300|400)|white|yellow-(?:100|200|300)))[^"']*(?:bg-(?:white|grey-(?:25|50|75)|yellow-(?:100|200)))/gi;
  const lightMatches = content.match(lightOnLight);
  
  if (lightMatches) {
    lightMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: '1.4.3 Contrast',
        message: 'Potential low contrast: light text on light background',
        file: filePath,
        code: match,
      });
    });
  }

  // Dark text on dark backgrounds
  const darkOnDark = /(?:text-(?:grey-(?:700|800)|purple-(?:dark|navy|DEFAULT)))[^"']*(?:bg-(?:grey-(?:700|800)|purple-(?:dark|navy|DEFAULT)))/gi;
  const darkMatches = content.match(darkOnDark);
  
  if (darkMatches) {
    darkMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: '1.4.3 Contrast',
        message: 'Potential low contrast: dark text on dark background',
        file: filePath,
        code: match,
      });
    });
  }
}

/**
 * 1.4.4 Resize Text - Check for fixed font sizes
 */
function checkTextResize(content, filePath) {
  // Check for px-based font sizes in inline styles
  const pxFontSize = /font-size:\s*\d+px/gi;
  const matches = content.match(pxFontSize);
  
  if (matches) {
    matches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: '1.4.4 Resize Text',
        message: 'Fixed px font-size may prevent text resizing - use rem/em',
        file: filePath,
        code: match,
      });
    });
  }
}

// ============================================
// WCAG 2.1 AA - Operable
// ============================================

/**
 * 2.1.1 Keyboard - Check for keyboard accessibility
 */
function checkKeyboardAccessibility(content, filePath) {
  // onClick without onKeyDown/onKeyPress
  const clickWithoutKey = /<(?:div|span|li|tr|td)[^>]*onClick\s*=[^>]*>/gi;
  const matches = content.match(clickWithoutKey);
  
  if (matches) {
    matches.forEach((match) => {
      if (!match.includes('onKeyDown') && !match.includes('onKeyPress') && !match.includes('onKeyUp')) {
        if (!match.includes('role="button"') && !match.includes('role="link"')) {
          issues.push({
            type: 'warning',
            category: '2.1.1 Keyboard',
            message: 'Element has onClick but no keyboard handler',
            file: filePath,
            code: match.substring(0, 100),
          });
        }
      }
    });
  }

  // Check for tabIndex > 0 (disrupts natural tab order)
  const positiveTabindex = /tabIndex\s*=\s*["{]?\s*[1-9]/gi;
  const tabMatches = content.match(positiveTabindex);
  
  if (tabMatches) {
    tabMatches.forEach((match) => {
      issues.push({
        type: 'error',
        category: '2.4.3 Focus Order',
        message: 'Positive tabIndex disrupts natural focus order',
        file: filePath,
        code: match,
      });
    });
  }
}

/**
 * 2.4.1 Bypass Blocks - Check for skip navigation
 */
function checkSkipNavigation(content, filePath) {
  const isLayoutFile = filePath.includes('layout.') || filePath.includes('Layout.');
  
  if (isLayoutFile) {
    const hasSkipLink = content.includes('skip') && (content.includes('#main') || content.includes('#content'));
    const hasMainLandmark = content.includes('<main') || content.includes('role="main"');
    
    if (!hasSkipLink) {
      issues.push({
        type: 'info',
        category: '2.4.1 Bypass Blocks',
        message: 'Consider adding a skip navigation link to main content',
        file: filePath,
      });
    }
    
    if (!hasMainLandmark) {
      issues.push({
        type: 'warning',
        category: '2.4.1 Bypass Blocks',
        message: 'Layout may be missing <main> landmark',
        file: filePath,
      });
    }
  }
}

/**
 * 2.4.4 Link Purpose - Check for descriptive link text
 */
function checkLinkPurpose(content, filePath) {
  // Generic link text
  const genericLinkText = /<a[^>]*>(?:\s*(?:click\s+here|read\s+more|learn\s+more|here|more|link)\s*)<\/a>/gi;
  const matches = content.match(genericLinkText);
  
  if (matches) {
    matches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: '2.4.4 Link Purpose',
        message: 'Generic link text - use descriptive text or aria-label',
        file: filePath,
        code: match,
      });
    });
  }

  // Empty links
  const emptyLink = /<a[^>]*>[\s]*<\/a>/gi;
  const emptyMatches = content.match(emptyLink);
  
  if (emptyMatches) {
    emptyMatches.forEach((match) => {
      issues.push({
        type: 'error',
        category: '2.4.4 Link Purpose',
        message: 'Empty link without text content',
        file: filePath,
        code: match,
      });
    });
  }
}

/**
 * 2.4.7 Focus Visible - Check for focus styles
 */
function checkFocusVisible(content, filePath) {
  // Interactive elements with className but no focus styles
  const interactiveWithClass = /<(?:button|a|input|select|textarea)[^>]*className\s*=\s*["'][^"']+["'][^>]*>/gi;
  const matches = content.match(interactiveWithClass);
  
  if (matches) {
    matches.forEach((match) => {
      // Check for Tailwind focus utilities
      if (!match.includes('focus:') && !match.includes('focus-visible:') && !match.includes('focus-within:')) {
        // Skip if using a component that likely has built-in focus styles
        if (!match.includes('Button') && !match.includes('Link') && !match.includes('Input')) {
          issues.push({
            type: 'warning',
            category: '2.4.7 Focus Visible',
            message: 'Interactive element may be missing visible focus styles',
            file: filePath,
            code: match.substring(0, 150),
          });
        }
      }
    });
  }
}

// ============================================
// WCAG 2.1 AA - Understandable
// ============================================

/**
 * 3.1.1 Language of Page - Check for lang attribute
 */
function checkLanguage(content, filePath) {
  if (filePath.includes('layout.') && filePath.includes('app/')) {
    if (content.includes('<html') && !content.includes('lang=')) {
      issues.push({
        type: 'error',
        category: '3.1.1 Language of Page',
        message: '<html> element missing lang attribute',
        file: filePath,
      });
    }
  }
}

/**
 * 3.3.1 Error Identification - Check for form error handling
 */
function checkFormErrors(content, filePath) {
  // Forms with required fields but no error handling pattern
  const requiredInputs = /<input[^>]*required[^>]*>/gi;
  const matches = content.match(requiredInputs);
  
  if (matches && matches.length > 0) {
    // Check if file has error handling patterns
    const hasErrorHandling = content.includes('error') || content.includes('Error') || 
                            content.includes('invalid') || content.includes('aria-invalid');
    
    if (!hasErrorHandling) {
      issues.push({
        type: 'info',
        category: '3.3.1 Error Identification',
        message: 'Form has required fields - ensure errors are properly identified',
        file: filePath,
      });
    }
  }
}

/**
 * 3.3.2 Labels or Instructions - Check for form labels
 */
function checkFormLabels(content, filePath) {
  // Inputs without proper labeling
  const inputWithoutLabel = /<input(?![^>]*(?:aria-label|aria-labelledby|id\s*=))[^>]*>/gi;
  const matches = content.match(inputWithoutLabel);
  
  if (matches) {
    matches.forEach((match) => {
      // Skip hidden and submit inputs
      if (!match.includes('type="hidden"') && !match.includes('type="submit"') && !match.includes("type='hidden'")) {
        issues.push({
          type: 'warning',
          category: '3.3.2 Labels',
          message: 'Input may not be properly labeled',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }

  // Select without label
  const selectWithoutLabel = /<select(?![^>]*(?:aria-label|aria-labelledby|id\s*=))[^>]*>/gi;
  const selectMatches = content.match(selectWithoutLabel);
  
  if (selectMatches) {
    selectMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: '3.3.2 Labels',
        message: 'Select element may not be properly labeled',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
  }
}

// ============================================
// WCAG 2.1 AA - Robust
// ============================================

/**
 * 4.1.1 Parsing - Check for valid ARIA usage
 */
function checkAriaValidity(content, filePath) {
  // aria-hidden on focusable elements
  const ariaHiddenFocusable = /<(?:button|a|input)[^>]*aria-hidden\s*=\s*["']true["'][^>]*>/gi;
  const matches = content.match(ariaHiddenFocusable);
  
  if (matches) {
    matches.forEach((match) => {
      if (!match.includes('tabindex="-1"') && !match.includes('tabIndex={-1}')) {
        issues.push({
          type: 'error',
          category: '4.1.2 Name, Role, Value',
          message: 'Focusable element with aria-hidden="true" needs tabindex="-1"',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }

  // Check for invalid aria-* attributes (common mistakes)
  const invalidAria = /aria-(?:labelled|described|hidden)(?!by|=")/gi;
  const invalidMatches = content.match(invalidAria);
  
  if (invalidMatches) {
    invalidMatches.forEach((match) => {
      issues.push({
        type: 'error',
        category: '4.1.2 Name, Role, Value',
        message: `Potentially invalid ARIA attribute: ${match}`,
        file: filePath,
        code: match,
      });
    });
  }
}

/**
 * 4.1.2 Name, Role, Value - Check for button accessible names
 */
function checkButtonsAccessibleName(content, filePath) {
  // Buttons with only icons
  const iconOnlyButton = /<button[^>]*>[\s]*(?:<(?:svg|img|Icon|i)[^>]*\/?>[^<]*)+<\/button>/gi;
  const matches = content.match(iconOnlyButton);
  
  if (matches) {
    matches.forEach((match) => {
      if (!match.includes('aria-label') && !match.includes('aria-labelledby') && !match.includes('title=')) {
        issues.push({
          type: 'error',
          category: '4.1.2 Name, Role, Value',
          message: 'Icon-only button missing accessible name (aria-label)',
          file: filePath,
          code: match.substring(0, 150),
        });
      }
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

    // Perceivable
    checkImagesWithoutAlt(content, filePath);
    checkMediaAccessibility(content, filePath);
    checkSemanticStructure(content, filePath);
    checkColorContrast(content, filePath);
    checkTextResize(content, filePath);
    
    // Operable
    checkKeyboardAccessibility(content, filePath);
    checkSkipNavigation(content, filePath);
    checkLinkPurpose(content, filePath);
    checkFocusVisible(content, filePath);
    
    // Understandable
    checkLanguage(content, filePath);
    checkFormErrors(content, filePath);
    checkFormLabels(content, filePath);
    
    // Robust
    checkAriaValidity(content, filePath);
    checkButtonsAccessibleName(content, filePath);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

/**
 * Run the ADA checks
 */
function run() {
  console.log(`\n${COLORS.bold}${COLORS.blue}♿ Running WCAG 2.1 AA Compliance Checks...${COLORS.reset}\n`);

  const rootDir = process.cwd();
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
    console.log(`${COLORS.cyan}${COLORS.bold}ℹ️  Info (${infos.length}):${COLORS.reset}\n`);
    infos.forEach((issue) => {
      console.log(`  ${COLORS.cyan}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(`  ${COLORS.blue}File:${COLORS.reset} ${issue.file}`);
      console.log('');
    });
  }

  if (issues.length === 0) {
    console.log(`${COLORS.green}${COLORS.bold}✅ No WCAG 2.1 AA compliance issues found!${COLORS.reset}\n`);
  }

  // Summary by WCAG principle
  console.log(`${COLORS.bold}📊 Summary by WCAG Principle:${COLORS.reset}`);
  const categories = [...new Set(issues.map(i => i.category.split(' ')[0]))];
  const perceivable = issues.filter(i => i.category.startsWith('1.'));
  const operable = issues.filter(i => i.category.startsWith('2.'));
  const understandable = issues.filter(i => i.category.startsWith('3.'));
  const robust = issues.filter(i => i.category.startsWith('4.'));
  
  console.log(`   Perceivable (1.x): ${perceivable.length} issues`);
  console.log(`   Operable (2.x): ${operable.length} issues`);
  console.log(`   Understandable (3.x): ${understandable.length} issues`);
  console.log(`   Robust (4.x): ${robust.length} issues\n`);

  return errors.length > 0 ? 1 : 0;
}

const exitCode = run();
process.exit(exitCode);
