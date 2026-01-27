#!/usr/bin/env node

/**
 * Main Compliance Check Runner
 * Runs all compliance checks: ADA, SEO, and Performance
 * Run with: npm run checks
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COLORS = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const checks = [
  { name: 'ADA Compliance', script: 'ada.mjs', emoji: '♿' },
  { name: 'SEO Compliance', script: 'seo.mjs', emoji: '🔍' },
  { name: 'Performance', script: 'performance.mjs', emoji: '⚡' },
];

/**
 * Run a single check script
 */
function runCheck(check) {
  return new Promise((resolve) => {
    const scriptPath = join(__dirname, check.script);
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: process.cwd(),
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
  console.log(`\n${COLORS.bold}${COLORS.cyan}╔════════════════════════════════════════════╗${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}║     🛠️  Codebase Compliance Checker 🛠️      ║${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}╚════════════════════════════════════════════╝${COLORS.reset}\n`);

  const results = [];

  for (const check of checks) {
    console.log(`${COLORS.bold}${COLORS.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
    console.log(`${COLORS.bold}${check.emoji} Running ${check.name} Check...${COLORS.reset}`);
    console.log(`${COLORS.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLORS.reset}`);
    
    const result = await runCheck(check);
    results.push(result);
  }

  // Summary
  console.log(`\n${COLORS.bold}${COLORS.cyan}╔════════════════════════════════════════════╗${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}║              📊 Summary 📊                 ║${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}╚════════════════════════════════════════════╝${COLORS.reset}\n`);

  let hasErrors = false;

  results.forEach((result) => {
    const status = result.exitCode === 0 
      ? `${COLORS.green}✅ PASSED${COLORS.reset}` 
      : `${COLORS.red}❌ ISSUES FOUND${COLORS.reset}`;
    
    console.log(`  ${result.emoji} ${result.name}: ${status}`);
    
    if (result.exitCode !== 0) {
      hasErrors = true;
    }
  });

  console.log('');

  if (hasErrors) {
    console.log(`${COLORS.yellow}${COLORS.bold}⚠️  Some checks found issues. Please review and fix before deploying.${COLORS.reset}\n`);
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
