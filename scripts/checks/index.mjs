#!/usr/bin/env node

/**
 * Main Compliance Check Runner
 * Runs all compliance checks: ADA, SEO, and Performance
 *
 * Usage:
 *   npm run checks                          # Run all checks on entire codebase
 *   npm run checks -- path/to/file.js       # Run all checks on specific file
 *   npm run checks -- components/           # Run all checks on specific directory
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COLORS = {
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  yellow: '\x1b[33m',
};

const checks = [
  { emoji: '♿', name: 'ADA Compliance', script: 'ada.mjs' },
  { emoji: '🔍', name: 'SEO Compliance', script: 'seo.mjs' },
  { emoji: '⚡', name: 'Performance', script: 'performance.mjs' },
];

// Get CLI arguments to pass to individual scripts
const cliArgs = process.argv.slice(2);

/**
 * Run a single check script
 */
function runCheck(check) {
  return new Promise((resolve) => {
    const scriptPath = join(__dirname, check.script);
    // Pass CLI arguments to individual scripts
    const child = spawn('node', [scriptPath, ...cliArgs], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      resolve({ ...check, exitCode: code });
    });

    child.on('error', (error) => {
      console.error(`Error running ${check.name}:`, error.message);
      resolve({ ...check, exitCode: 1 });
    });
  });
}

/**
 * Main runner
 */
async function main() {
  console.log(
    `\n${COLORS.bold}${COLORS.cyan}╔════════════════════════════════════════════╗${COLORS.reset}`
  );
  console.log(
    `${COLORS.bold}${COLORS.cyan}║     🛠️  Codebase Compliance Checker 🛠️      ║${COLORS.reset}`
  );
  console.log(
    `${COLORS.bold}${COLORS.cyan}╚════════════════════════════════════════════╝${COLORS.reset}`
  );

  if (cliArgs.length > 0) {
    console.log(`\n${COLORS.cyan}📁 Target: ${cliArgs.join(', ')}${COLORS.reset}`);
  }
  console.log('');

  const results = [];

  for (const check of checks) {
    console.log(
      `${COLORS.bold}${COLORS.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`
    );
    console.log(`${COLORS.bold}${check.emoji} Running ${check.name} Check...${COLORS.reset}`);
    console.log(`${COLORS.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);

    const result = await runCheck(check);
    results.push(result);
  }

  // Summary
  console.log(
    `\n${COLORS.bold}${COLORS.cyan}╔════════════════════════════════════════════╗${COLORS.reset}`
  );
  console.log(
    `${COLORS.bold}${COLORS.cyan}║              📊 Summary 📊                 ║${COLORS.reset}`
  );
  console.log(
    `${COLORS.bold}${COLORS.cyan}╚════════════════════════════════════════════╝${COLORS.reset}\n`
  );

  let hasErrors = false;

  results.forEach((result) => {
    const status =
      result.exitCode === 0
        ? `${COLORS.green}✅ PASSED${COLORS.reset}`
        : `${COLORS.red}❌ ISSUES FOUND${COLORS.reset}`;

    console.log(`  ${result.emoji} ${result.name}: ${status}`);

    if (result.exitCode !== 0) {
      hasErrors = true;
    }
  });

  console.log('');

  if (hasErrors) {
    console.log(
      `${COLORS.yellow}${COLORS.bold}⚠️  Some checks found issues. Please review and fix before deploying.${COLORS.reset}\n`
    );
    process.exit(1);
  } else {
    console.log(`${COLORS.green}${COLORS.bold}✅ All compliance checks passed!${COLORS.reset}\n`);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Error running checks:', error);
  process.exit(1);
});
