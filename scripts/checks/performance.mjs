#!/usr/bin/env node

/**
 * Performance Compliance Check Script
 * Scans codebase for performance issues and Tailwind best practices
 * 
 * Usage:
 *   npm run checks:perf                    # Scan entire codebase
 *   npm run checks:perf -- path/to/file.js # Scan specific file
 *   npm run checks:perf -- components/     # Scan specific directory
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, resolve } from 'path';

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
 * Get target paths from command line arguments
 */
function getTargetPaths() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return null; // Scan entire codebase
  }
  return args.map(arg => resolve(process.cwd(), arg));
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

/**
 * Check for arbitrary Tailwind values (performance/maintainability)
 */
function checkArbitraryValues(content, filePath) {
  // Match arbitrary values like w-[450px], h-[200px], text-[14px], etc.
  const arbitraryPattern = /(?:w|h|p|m|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr|gap|space-x|space-y|text|leading|tracking)-\[\d+(?:px|rem|em|vh|vw|%)\]/g;
  const matches = content.match(arbitraryPattern);
  
  if (matches) {
    const uniqueMatches = [...new Set(matches)];
    uniqueMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: 'Tailwind',
        message: `Arbitrary value "${match}" found. Use Tailwind design tokens instead.`,
        file: filePath,
      });
    });
  }

  // Check for arbitrary color values
  const arbitraryColors = /(?:bg|text|border|ring|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/g;
  const colorMatches = content.match(arbitraryColors);
  
  if (colorMatches) {
    const uniqueColors = [...new Set(colorMatches)];
    uniqueColors.forEach((match) => {
      issues.push({
        type: 'warning',
        category: 'Tailwind',
        message: `Arbitrary color "${match}" found. Add to tailwind.config.js or use existing tokens.`,
        file: filePath,
      });
    });
  }
}

/**
 * Check for inline styles (should use Tailwind classes)
 */
function checkInlineStyles(content, filePath) {
  // Match style={{ ... }} patterns
  const inlineStylePattern = /style\s*=\s*\{\s*\{[^}]+\}\s*\}/g;
  const matches = content.match(inlineStylePattern);
  
  if (matches) {
    matches.forEach((match) => {
      // Allow some inline styles for dynamic values
      if (!match.includes('var(') && !match.includes('props.') && !match.includes('${')) {
        issues.push({
          type: 'warning',
          category: 'Styling',
          message: 'Inline style found. Consider using Tailwind classes instead.',
          file: filePath,
          code: match.substring(0, 100),
        });
      }
    });
  }
}

/**
 * Check for styled-components usage (migration target)
 */
function checkStyledComponents(content, filePath) {
  // Check for styled-components imports
  const styledImport = /from\s+['"]styled-components['"]/;
  
  if (styledImport.test(content)) {
    issues.push({
      type: 'info',
      category: 'Migration',
      message: 'File uses styled-components (migration candidate)',
      file: filePath,
    });
  }

  // Check for styled.* usage
  const styledUsage = /styled\.\w+`/g;
  const matches = content.match(styledUsage);
  
  if (matches) {
    issues.push({
      type: 'info',
      category: 'Migration',
      message: `File has ${matches.length} styled component(s) to migrate`,
      file: filePath,
    });
  }
}

/**
 * Check for 'use client' directive usage
 */
function checkClientDirective(content, filePath) {
  const hasUseClient = content.includes("'use client'") || content.includes('"use client"');
  
  // Check if client directive might be unnecessary
  if (hasUseClient) {
    const hasHooks = /use(?:State|Effect|Ref|Callback|Memo|Context|Reducer)\s*\(/g.test(content);
    const hasEventHandlers = /on(?:Click|Change|Submit|Focus|Blur|Mouse|Key|Touch)\s*=/g.test(content);
    const hasBrowserAPIs = /(?:window|document|navigator|localStorage|sessionStorage)\./g.test(content);
    
    if (!hasHooks && !hasEventHandlers && !hasBrowserAPIs) {
      issues.push({
        type: 'warning',
        category: 'Performance',
        message: "'use client' directive may be unnecessary. Consider Server Component.",
        file: filePath,
      });
    }
  }
}

/**
 * Check for large component files
 */
function checkFileSize(content, filePath) {
  const lineCount = content.split('\n').length;
  
  if (lineCount > 500) {
    issues.push({
      type: 'warning',
      category: 'Code Quality',
      message: `Large file (${lineCount} lines). Consider splitting into smaller components.`,
      file: filePath,
    });
  }
}

/**
 * Check for image optimization
 */
function checkImageOptimization(content, filePath) {
  // Check for loading="lazy" on below-fold images
  const imgWithPriority = /<(?:Image|img)[^>]*priority[^>]*>/gi;
  const priorityMatches = content.match(imgWithPriority) || [];
  
  if (priorityMatches.length > 3) {
    issues.push({
      type: 'warning',
      category: 'Images',
      message: `${priorityMatches.length} priority images found. Only above-fold images should have priority.`,
      file: filePath,
    });
  }

  // Check for images without width/height or sizes
  const imgWithoutDimensions = /<Image(?![^>]*(?:width|fill))[^>]*>/gi;
  const dimensionMatches = content.match(imgWithoutDimensions);
  
  if (dimensionMatches) {
    dimensionMatches.forEach((match) => {
      issues.push({
        type: 'warning',
        category: 'Images',
        message: 'Next Image missing width/height or fill property',
        file: filePath,
        code: match.substring(0, 100),
      });
    });
  }
}

/**
 * Check for dynamic imports
 */
function checkDynamicImports(content, filePath) {
  // Check for heavy components that should be dynamically imported
  const heavyImports = [
    'gsap',
    'three',
    'd3',
    'chart.js',
    'framer-motion',
    'react-player',
    'lottie',
  ];

  heavyImports.forEach((lib) => {
    const importPattern = new RegExp(`from\\s+['"]${lib}(?:/[^'"]*)?['"]`);
    
    if (importPattern.test(content)) {
      const hasDynamicImport = content.includes(`dynamic(() => import`);
      
      if (!hasDynamicImport && !filePath.includes('page.')) {
        issues.push({
          type: 'info',
          category: 'Bundle Size',
          message: `Heavy library "${lib}" imported. Consider dynamic import for non-critical components.`,
          file: filePath,
        });
      }
    }
  });
}

/**
 * Check for console statements
 */
function checkConsoleLogs(content, filePath) {
  const consolePattern = /console\.(log|debug|info)\s*\(/g;
  const matches = content.match(consolePattern);
  
  if (matches && matches.length > 0) {
    issues.push({
      type: 'warning',
      category: 'Code Quality',
      message: `${matches.length} console statement(s) found. Remove before production.`,
      file: filePath,
    });
  }
}

/**
 * Check for unused CSS imports
 */
function checkCSSImports(content, filePath) {
  // Check for CSS module imports that might be unused
  const cssImport = /import\s+\w+\s+from\s+['"][^'"]+\.(?:css|scss|module\.css)['"];?/g;
  const matches = content.match(cssImport);
  
  if (matches) {
    matches.forEach((match) => {
      const varName = match.match(/import\s+(\w+)/)?.[1];
      if (varName && !content.includes(varName + '.') && !content.includes(varName + '[')) {
        issues.push({
          type: 'warning',
          category: 'Bundle Size',
          message: `CSS import "${varName}" may be unused`,
          file: filePath,
          code: match,
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

    checkArbitraryValues(content, filePath);
    checkInlineStyles(content, filePath);
    checkStyledComponents(content, filePath);
    checkClientDirective(content, filePath);
    checkFileSize(content, filePath);
    checkImageOptimization(content, filePath);
    checkDynamicImports(content, filePath);
    checkConsoleLogs(content, filePath);
    checkCSSImports(content, filePath);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

/**
 * Run the performance checks
 */
function run() {
  const targetPaths = getTargetPaths();
  const isSingleTarget = targetPaths !== null;
  
  console.log(`\n${COLORS.bold}${COLORS.blue}🔍 Running Performance Compliance Checks...${COLORS.reset}`);
  if (isSingleTarget) {
    console.log(`${COLORS.cyan}Target: ${targetPaths.join(', ')}${COLORS.reset}`);
  }
  console.log('');

  const rootDir = process.cwd();
  let filesToScan = [];
  
  if (isSingleTarget) {
    // Scan specific files/directories
    for (const targetPath of targetPaths) {
      filesToScan.push(...getFiles(targetPath));
    }
  } else {
    // Scan entire codebase
    const dirsToScan = ['app', 'components', 'pages', 'lib'].map((d) => join(rootDir, d));
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
    console.log(`${COLORS.yellow}${COLORS.bold}⚠️  Warnings (${warnings.length}):${COLORS.reset}\n`);
    warnings.forEach((issue) => {
      console.log(`  ${COLORS.yellow}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(`  ${COLORS.blue}File:${COLORS.reset} ${issue.file}`);
      if (issue.code) console.log(`  ${COLORS.yellow}Code:${COLORS.reset} ${issue.code}`);
      console.log('');
    });
  }

  if (infos.length > 0) {
    console.log(`${COLORS.blue}${COLORS.bold}ℹ️  Info (${infos.length}):${COLORS.reset}\n`);
    infos.forEach((issue) => {
      console.log(`  ${COLORS.blue}[${issue.category}]${COLORS.reset} ${issue.message}`);
      console.log(`  ${COLORS.blue}File:${COLORS.reset} ${issue.file}`);
      console.log('');
    });
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`${COLORS.green}${COLORS.bold}✅ No performance compliance issues found!${COLORS.reset}\n`);
  }

  // Summary of styled-components to migrate
  const migrationCandidates = infos.filter((i) => i.category === 'Migration');
  if (migrationCandidates.length > 0) {
    console.log(`${COLORS.bold}📋 Migration Summary:${COLORS.reset}`);
    console.log(`   ${migrationCandidates.length} file(s) with styled-components to migrate\n`);
  }

  return errors.length > 0 ? 1 : 0;
}

const exitCode = run();
process.exit(exitCode);
