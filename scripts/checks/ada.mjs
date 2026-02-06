#!/usr/bin/env node

/**
 * ADA/WCAG 2.1 AA Compliance Check Script
 * Scans codebase for accessibility issues
 *
 * This script complements ESLint jsx-a11y by catching issues that:
 * 1. Static analysis (ESLint) cannot detect (e.g., color contrast patterns)
 * 2. Are spread across multiple lines (ESLint is better at AST-level)
 * 3. Are project-specific patterns
 *
 * IMPORTANT: Also run `npm run lint` for complete coverage!
 * ESLint jsx-a11y catches many issues at the AST level that regex cannot.
 *
 * Usage:
 *   npm run checks:ada                    # Scan entire codebase
 *   npm run checks:ada -- path/to/file.js # Scan specific file
 *   npm run checks:ada -- components/     # Scan specific directory
 */

import { execSync } from 'child_process';
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
const eslintIssues = [];
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
 * Run ESLint with jsx-a11y rules and capture results
 * This provides AST-level checking that regex cannot do
 */
function runESLintA11y(targetPaths) {
  // Build target list, only including directories that exist
  let target;
  if (targetPaths) {
    target = targetPaths.join(' ');
  } else {
    const rootDir = process.cwd();
    const potentialDirs = ['app', 'components', 'pages'];
    const existingDirs = potentialDirs.filter((dir) => existsSync(join(rootDir, dir)));
    target = existingDirs.join(' ');
  }

  try {
    // Run ESLint with JSON format, capture both stdout and stderr
    // ESLint exits with 1 if there are errors, so we need to handle that
    let result;
    try {
      result = execSync(`npx eslint ${target} --format json`, {
        encoding: 'utf-8',
        maxBuffer: 50 * 1024 * 1024,
        stdio: ['pipe', 'pipe', 'pipe'],
      });
    } catch (execError) {
      // ESLint returns exit code 1 when there are errors, but still outputs JSON
      if (execError.stdout) {
        result = execError.stdout;
      } else {
        throw execError;
      }
    }

    if (result && result.trim()) {
      try {
        const eslintResults = JSON.parse(result);
        for (const file of eslintResults) {
          if (file.messages && file.messages.length > 0) {
            for (const msg of file.messages) {
              // Only capture jsx-a11y rules
              if (msg.ruleId && msg.ruleId.startsWith('jsx-a11y/')) {
                eslintIssues.push({
                  category: mapEslintRuleToWCAG(msg.ruleId),
                  code: msg.source ? msg.source.substring(0, 100) : '',
                  file: file.filePath,
                  line: msg.line,
                  message: `[ESLint] ${msg.message}`,
                  ruleId: msg.ruleId,
                  type: msg.severity === 2 ? 'error' : 'warning',
                });
              }
            }
          }
        }
      } catch (parseError) {
        console.log(`${COLORS.yellow}Note: Could not parse ESLint output${COLORS.reset}`);
      }
    }
  } catch (error) {
    // ESLint execution error - continue with regex checks
    console.log(
      `${COLORS.yellow}Note: ESLint jsx-a11y check failed (${error.message}). Run 'npm run lint' for full ESLint checks.${COLORS.reset}\n`
    );
  }
}

/**
 * Map ESLint jsx-a11y rules to WCAG criteria
 */
function mapEslintRuleToWCAG(ruleId) {
  const mapping = {
    'jsx-a11y/alt-text': '1.1.1 Non-text Content',
    'jsx-a11y/anchor-has-content': '2.4.4 Link Purpose',
    'jsx-a11y/anchor-is-valid': '2.4.4 Link Purpose',
    'jsx-a11y/aria-activedescendant-has-tabindex': '4.1.2 Name, Role, Value',
    'jsx-a11y/aria-props': '4.1.1 Parsing',
    'jsx-a11y/aria-proptypes': '4.1.1 Parsing',
    'jsx-a11y/aria-role': '4.1.2 Name, Role, Value',
    'jsx-a11y/aria-unsupported-elements': '4.1.1 Parsing',
    'jsx-a11y/autocomplete-valid': '3.3.2 Labels',
    'jsx-a11y/click-events-have-key-events': '2.1.1 Keyboard',
    'jsx-a11y/heading-has-content': '1.3.1 Info and Relationships',
    'jsx-a11y/img-redundant-alt': '1.1.1 Non-text Content',
    'jsx-a11y/interactive-supports-focus': '2.1.1 Keyboard',
    'jsx-a11y/label-has-associated-control': '3.3.2 Labels',
    'jsx-a11y/media-has-caption': '1.2.2 Captions',
    'jsx-a11y/no-access-key': '2.1.4 Character Key Shortcuts',
    'jsx-a11y/no-autofocus': '3.2.1 On Focus',
    'jsx-a11y/no-noninteractive-element-interactions': '2.1.1 Keyboard',
    'jsx-a11y/no-noninteractive-tabindex': '2.4.3 Focus Order',
    'jsx-a11y/no-redundant-roles': '4.1.2 Name, Role, Value',
    'jsx-a11y/no-static-element-interactions': '2.1.1 Keyboard',
    'jsx-a11y/role-has-required-aria-props': '4.1.2 Name, Role, Value',
    'jsx-a11y/role-supports-aria-props': '4.1.2 Name, Role, Value',
    'jsx-a11y/scope': '1.3.1 Info and Relationships',
    'jsx-a11y/tabindex-no-positive': '2.4.3 Focus Order',
  };

  return mapping[ruleId] || '4.1.2 Name, Role, Value';
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
        category: '1.1.1 Non-text Content',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Image missing alt attribute',
        type: 'error',
      });
    });
  }

  // Check for Next.js Image without alt
  const nextImageWithoutAlt = /<Image(?![^>]*\balt\s*=)[^>]*>/gi;
  const nextMatches = content.match(nextImageWithoutAlt);

  if (nextMatches) {
    nextMatches.forEach((match) => {
      issues.push({
        category: '1.1.1 Non-text Content',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Next.js Image missing alt attribute',
        type: 'error',
      });
    });
  }

  // Check for empty alt on potentially meaningful images
  const emptyAlt = /<(?:img|Image)[^>]*\balt\s*=\s*["']\s*["'][^>]*>/gi;
  const emptyMatches = content.match(emptyAlt);

  if (emptyMatches) {
    emptyMatches.forEach((match) => {
      if (
        !match.includes('aria-hidden') &&
        !match.includes('decorative') &&
        !match.includes('role="presentation"')
      ) {
        issues.push({
          category: '1.1.1 Non-text Content',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Image has empty alt - ensure this is decorative only',
          type: 'warning',
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
          category: '1.2.2 Captions',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Video may be missing captions track',
          type: 'warning',
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
          category: '1.2.2 Captions',
          code: match.substring(0, 100),
          file: filePath,
          message: 'ReactPlayer detected - ensure captions are configured if video has audio',
          type: 'info',
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
          category: '1.3.1 Info and Relationships',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Div with onClick should use <button> or have role="button"',
          type: 'warning',
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
          category: '1.3.1 Info and Relationships',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Span with onClick should use appropriate interactive element or role',
          type: 'warning',
        });
      }
    });
  }
}

/**
 * 1.4.3 Contrast (Minimum) - Check for potential contrast issues
 * Uses project-specific Tailwind class patterns
 */
function checkColorContrast(content, filePath) {
  // Light text on light backgrounds (project colors)
  const lightTextClasses = [
    'text-grey-100',
    'text-grey-200',
    'text-grey-300',
    'text-grey-400',
    'text-white',
    'text-yellow-100',
    'text-yellow-200',
    'text-yellow-300',
    'text-purple-100',
    'text-purple-200',
    'text-orange-100',
    'text-orange-200',
    'text-teal-100',
    'text-teal-200',
  ];
  const lightBgClasses = [
    'bg-white',
    'bg-grey-25',
    'bg-grey-50',
    'bg-grey-75',
    'bg-grey-100',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-purple-100',
    'bg-purple-lightGrey',
    'bg-purple-gray50',
    'bg-orange-100',
    'bg-teal-100',
    'bg-teal-200',
  ];

  // Check for problematic combinations
  for (const textClass of lightTextClasses) {
    for (const bgClass of lightBgClasses) {
      const pattern = new RegExp(`${textClass}[^"']*${bgClass}|${bgClass}[^"']*${textClass}`, 'gi');
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          issues.push({
            category: '1.4.3 Contrast',
            code: match.substring(0, 80),
            file: filePath,
            message: `Low contrast risk: ${textClass} on ${bgClass}`,
            type: 'warning',
          });
        });
      }
    }
  }

  // Dark text on dark backgrounds
  const darkTextClasses = [
    'text-grey-700',
    'text-grey-800',
    'text-purple-dark',
    'text-purple-navy',
    'text-purple',
    'text-txt-primary',
  ];
  const darkBgClasses = [
    'bg-grey-700',
    'bg-grey-800',
    'bg-purple-dark',
    'bg-purple-navy',
    'bg-purple',
    'bg-purple-DEFAULT',
  ];

  for (const textClass of darkTextClasses) {
    for (const bgClass of darkBgClasses) {
      const pattern = new RegExp(`${textClass}[^"']*${bgClass}|${bgClass}[^"']*${textClass}`, 'gi');
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          issues.push({
            category: '1.4.3 Contrast',
            code: match.substring(0, 80),
            file: filePath,
            message: `Low contrast risk: ${textClass} on ${bgClass}`,
            type: 'warning',
          });
        });
      }
    }
  }
}

/**
 * 1.4.11 Non-text Contrast - Check for focus ring visibility
 */
function checkNonTextContrast(content, filePath) {
  // Check for focus rings that might have low contrast
  const lowContrastFocusRing = /focus:ring-(?:grey-(?:100|200|300)|white|yellow-100)/gi;
  const matches = content.match(lowContrastFocusRing);

  if (matches) {
    matches.forEach((match) => {
      issues.push({
        category: '1.4.11 Non-text Contrast',
        code: match,
        file: filePath,
        message: 'Focus ring may have insufficient contrast - use darker ring color',
        type: 'warning',
      });
    });
  }

  // Check for border-only focus states without ring
  const borderOnlyFocus = /focus:border-[^"'\s]+(?![^"']*focus:ring)/gi;
  const borderMatches = content.match(borderOnlyFocus);

  if (borderMatches && !content.includes('focus:ring')) {
    issues.push({
      category: '1.4.11 Non-text Contrast',
      file: filePath,
      message: 'Consider adding focus:ring-* for more visible focus indicator',
      type: 'info',
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
        category: '1.4.4 Resize Text',
        code: match,
        file: filePath,
        message: 'Fixed px font-size may prevent text resizing - use rem/em',
        type: 'warning',
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
      if (
        !match.includes('onKeyDown') &&
        !match.includes('onKeyPress') &&
        !match.includes('onKeyUp')
      ) {
        if (!match.includes('role="button"') && !match.includes('role="link"')) {
          issues.push({
            category: '2.1.1 Keyboard',
            code: match.substring(0, 100),
            file: filePath,
            message: 'Element has onClick but no keyboard handler',
            type: 'warning',
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
        category: '2.4.3 Focus Order',
        code: match,
        file: filePath,
        message: 'Positive tabIndex disrupts natural focus order',
        type: 'error',
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
    const hasSkipLink =
      content.includes('skip') && (content.includes('#main') || content.includes('#content'));
    const hasMainLandmark = content.includes('<main') || content.includes('role="main"');

    if (!hasSkipLink) {
      issues.push({
        category: '2.4.1 Bypass Blocks',
        file: filePath,
        message: 'Consider adding a skip navigation link to main content',
        type: 'info',
      });
    }

    if (!hasMainLandmark) {
      issues.push({
        category: '2.4.1 Bypass Blocks',
        file: filePath,
        message: 'Layout may be missing <main> landmark',
        type: 'warning',
      });
    }
  }
}

/**
 * 2.4.4 Link Purpose - Check for descriptive link text
 */
function checkLinkPurpose(content, filePath) {
  // Generic link text
  const genericLinkText =
    /<a[^>]*>(?:\s*(?:click\s+here|read\s+more|learn\s+more|here|more|link)\s*)<\/a>/gi;
  const matches = content.match(genericLinkText);

  if (matches) {
    matches.forEach((match) => {
      issues.push({
        category: '2.4.4 Link Purpose',
        code: match,
        file: filePath,
        message: 'Generic link text - use descriptive text or aria-label',
        type: 'warning',
      });
    });
  }

  // Empty links
  const emptyLink = /<a[^>]*>[\s]*<\/a>/gi;
  const emptyMatches = content.match(emptyLink);

  if (emptyMatches) {
    emptyMatches.forEach((match) => {
      issues.push({
        category: '2.4.4 Link Purpose',
        code: match,
        file: filePath,
        message: 'Empty link without text content',
        type: 'error',
      });
    });
  }
}

/**
 * 2.4.7 Focus Visible - Check for focus styles
 */
function checkFocusVisible(content, filePath) {
  // Interactive elements with className but no focus styles
  const interactiveWithClass =
    /<(?:button|a|input|select|textarea)[^>]*className\s*=\s*["'][^"']+["'][^>]*>/gi;
  const matches = content.match(interactiveWithClass);

  if (matches) {
    matches.forEach((match) => {
      // Check for Tailwind focus utilities
      if (
        !match.includes('focus:') &&
        !match.includes('focus-visible:') &&
        !match.includes('focus-within:')
      ) {
        // Skip if using a component that likely has built-in focus styles
        if (!match.includes('Button') && !match.includes('Link') && !match.includes('Input')) {
          issues.push({
            category: '2.4.7 Focus Visible',
            code: match.substring(0, 150),
            file: filePath,
            message: 'Interactive element may be missing visible focus styles',
            type: 'warning',
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
        category: '3.1.1 Language of Page',
        file: filePath,
        message: '<html> element missing lang attribute',
        type: 'error',
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
    const hasErrorHandling =
      content.includes('error') ||
      content.includes('Error') ||
      content.includes('invalid') ||
      content.includes('aria-invalid');

    if (!hasErrorHandling) {
      issues.push({
        category: '3.3.1 Error Identification',
        file: filePath,
        message: 'Form has required fields - ensure errors are properly identified',
        type: 'info',
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
      if (
        !match.includes('type="hidden"') &&
        !match.includes('type="submit"') &&
        !match.includes("type='hidden'")
      ) {
        issues.push({
          category: '3.3.2 Labels',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Input may not be properly labeled',
          type: 'warning',
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
        category: '3.3.2 Labels',
        code: match.substring(0, 100),
        file: filePath,
        message: 'Select element may not be properly labeled',
        type: 'warning',
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
          category: '4.1.2 Name, Role, Value',
          code: match.substring(0, 100),
          file: filePath,
          message: 'Focusable element with aria-hidden="true" needs tabindex="-1"',
          type: 'error',
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
        category: '4.1.2 Name, Role, Value',
        code: match,
        file: filePath,
        message: `Potentially invalid ARIA attribute: ${match}`,
        type: 'error',
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
      if (
        !match.includes('aria-label') &&
        !match.includes('aria-labelledby') &&
        !match.includes('title=')
      ) {
        issues.push({
          category: '4.1.2 Name, Role, Value',
          code: match.substring(0, 150),
          file: filePath,
          message: 'Icon-only button missing accessible name (aria-label)',
          type: 'error',
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
    checkNonTextContrast(content, filePath);
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
  const targetPaths = getTargetPaths();
  const isSingleFile =
    targetPaths &&
    targetPaths.length === 1 &&
    existsSync(targetPaths[0]) &&
    statSync(targetPaths[0]).isFile();

  console.log(
    `\n${COLORS.bold}${COLORS.blue}♿ Running WCAG 2.1 AA Compliance Checks...${COLORS.reset}`
  );
  console.log(`${COLORS.cyan}Checks: ESLint jsx-a11y + Custom Pattern Analysis${COLORS.reset}`);

  if (targetPaths) {
    console.log(`${COLORS.cyan}Target: ${targetPaths.join(', ')}${COLORS.reset}\n`);
  } else {
    console.log(`${COLORS.cyan}Target: Entire codebase${COLORS.reset}\n`);
  }

  const rootDir = process.cwd();

  // Run ESLint jsx-a11y checks first (AST-level analysis)
  console.log(`${COLORS.blue}Running ESLint jsx-a11y checks...${COLORS.reset}`);
  runESLintA11y(targetPaths);
  console.log(
    `${COLORS.green}ESLint found ${eslintIssues.length} accessibility issues${COLORS.reset}\n`
  );

  // Run custom pattern checks (regex-based for things ESLint can't catch)
  console.log(`${COLORS.blue}Running custom pattern checks...${COLORS.reset}`);

  if (targetPaths) {
    // Scan specific files/directories
    for (const target of targetPaths) {
      const files = getFiles(target);
      files.forEach(scanFile);
    }
  } else {
    // Scan entire codebase
    const dirsToScan = ['app', 'components', 'pages'].map((d) => join(rootDir, d));
    for (const dir of dirsToScan) {
      const files = getFiles(dir);
      files.forEach(scanFile);
    }
  }

  // Combine all issues
  const allIssues = [...eslintIssues, ...issues];

  // Report results
  console.log(`${COLORS.bold}Files scanned: ${filesScanned}${COLORS.reset}`);
  console.log(
    `${COLORS.bold}Total issues: ${allIssues.length} (${eslintIssues.length} ESLint + ${issues.length} pattern checks)${COLORS.reset}\n`
  );

  const errors = allIssues.filter((i) => i.type === 'error');
  const warnings = allIssues.filter((i) => i.type === 'warning');
  const infos = allIssues.filter((i) => i.type === 'info');

  if (errors.length > 0) {
    console.log(`${COLORS.red}${COLORS.bold}❌ Errors (${errors.length}):${COLORS.reset}\n`);
    errors.forEach((issue) => {
      console.log(`  ${COLORS.red}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(
        `  ${COLORS.blue}File:${COLORS.reset} ${issue.file}${issue.line ? `:${issue.line}` : ''}`
      );
      if (issue.code) console.log(`  ${COLORS.yellow}Code:${COLORS.reset} ${issue.code}`);
      if (issue.ruleId) console.log(`  ${COLORS.cyan}Rule:${COLORS.reset} ${issue.ruleId}`);
      console.log('');
    });
  }

  if (warnings.length > 0) {
    console.log(
      `${COLORS.yellow}${COLORS.bold}⚠️  Warnings (${warnings.length}):${COLORS.reset}\n`
    );
    warnings.forEach((issue) => {
      console.log(`  ${COLORS.yellow}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(
        `  ${COLORS.blue}File:${COLORS.reset} ${issue.file}${issue.line ? `:${issue.line}` : ''}`
      );
      if (issue.code) console.log(`  ${COLORS.yellow}Code:${COLORS.reset} ${issue.code}`);
      if (issue.ruleId) console.log(`  ${COLORS.cyan}Rule:${COLORS.reset} ${issue.ruleId}`);
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

  if (allIssues.length === 0) {
    console.log(
      `${COLORS.green}${COLORS.bold}✅ No WCAG 2.1 AA compliance issues found!${COLORS.reset}\n`
    );
  }

  // Summary by WCAG principle (only for full codebase scans)
  if (!isSingleFile) {
    console.log(`${COLORS.bold}📊 Summary by WCAG Principle:${COLORS.reset}`);
    const perceivable = allIssues.filter((i) => i.category.startsWith('1.'));
    const operable = allIssues.filter((i) => i.category.startsWith('2.'));
    const understandable = allIssues.filter((i) => i.category.startsWith('3.'));
    const robust = allIssues.filter((i) => i.category.startsWith('4.'));

    console.log(`   Perceivable (1.x): ${perceivable.length} issues`);
    console.log(`   Operable (2.x): ${operable.length} issues`);
    console.log(`   Understandable (3.x): ${understandable.length} issues`);
    console.log(`   Robust (4.x): ${robust.length} issues\n`);

    // Show breakdown of ESLint rules triggered
    if (eslintIssues.length > 0) {
      console.log(`${COLORS.bold}📋 ESLint jsx-a11y Rules Triggered:${COLORS.reset}`);
      const ruleCount = {};
      eslintIssues.forEach((issue) => {
        if (issue.ruleId) {
          ruleCount[issue.ruleId] = (ruleCount[issue.ruleId] || 0) + 1;
        }
      });
      Object.entries(ruleCount)
        .sort((a, b) => b[1] - a[1])
        .forEach(([rule, count]) => {
          console.log(`   ${rule}: ${count}`);
        });
      console.log('');
    }
  }

  return errors.length > 0 ? 1 : 0;
}

const exitCode = run();
process.exit(exitCode);
