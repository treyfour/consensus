#!/usr/bin/env node
/**
 * Headless screenshot + console-error check for the prototypes.
 *
 * The Playwright MCP browser holds a single shared profile, so the second
 * parallel session to reach for it gets "Browser is already in use". This
 * drives its own headless Chromium instead, so any number of sessions can
 * screenshot at once.
 *
 *   node scripts/shot.mjs <url> <out.png> [--width 1440] [--height 900] [--full]
 *
 * Exits non-zero if the page logged a console error or threw, and prints
 * whatever it caught — so it doubles as a smoke test.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const CACHE = join(homedir(), 'Library/Caches/ms-playwright');
const CORE = join(homedir(), '.claude/skills/gstack/node_modules/playwright-core/index.mjs');

function findChromium() {
  if (!existsSync(CACHE)) return null;
  const dirs = readdirSync(CACHE)
    .filter((d) => d.startsWith('chromium_headless_shell-') || d.startsWith('chromium-'))
    .sort()
    .reverse();
  for (const d of dirs) {
    for (const rel of [
      'chrome-headless-shell-mac-arm64/chrome-headless-shell',
      'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    ]) {
      const p = join(CACHE, d, rel);
      if (existsSync(p)) return p;
    }
  }
  return null;
}

const [url, out, ...rest] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node scripts/shot.mjs <url> <out.png> [--width N] [--height N] [--full]');
  process.exit(2);
}
const arg = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(rest[i + 1]);
};
const full = rest.includes('--full');

const exe = findChromium();
if (!exe) {
  console.error('No Playwright Chromium found under ' + CACHE);
  process.exit(2);
}
if (!existsSync(CORE)) {
  console.error('playwright-core not found at ' + CORE);
  process.exit(2);
}

const { chromium } = await import(CORE);
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({
  viewport: { width: arg('width', 1440), height: arg('height', 900) },
  deviceScaleFactor: 2,
});

const problems = [];
page.on('pageerror', (e) => problems.push('PAGEERROR: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') problems.push('CONSOLE: ' + m.text());
});

const res = await page.goto(url, { waitUntil: 'load' });
if (!res || !res.ok()) problems.push('HTTP ' + (res ? res.status() : 'no response'));
await page.waitForTimeout(600);
await page.screenshot({ path: out, fullPage: full });
await browser.close();

console.log(problems.length ? problems.join('\n') : 'clean · ' + out);
process.exit(problems.length ? 1 : 0);
