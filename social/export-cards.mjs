/**
 * Export social media cards to PNG using Playwright
 *
 * Usage: node social/export-cards.mjs
 *
 * Renders each card at exact Instagram dimensions and saves to social/exports/
 * Uses element-level screenshots for pixel-perfect output.
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXPORT_DIR = path.join(__dirname, 'exports');
const HTML_FILE = path.join(__dirname, 'summer-2026-cards.html');

// Subdirectories by campaign phase
const DIRS = {
  facebook: path.join(EXPORT_DIR, 'facebook'),
  teaser: path.join(EXPORT_DIR, 'teaser'),
  phase1: path.join(EXPORT_DIR, 'phase-1-launch'),
  phase2: path.join(EXPORT_DIR, 'phase-2-registration'),
};

fs.mkdirSync(EXPORT_DIR, { recursive: true });
for (const dir of Object.values(DIRS)) fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();

const page = await browser.newPage({
  deviceScaleFactor: 2,
  viewport: { width: 1700, height: 2000 },
});

await page.goto(`file://${HTML_FILE}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800); // fonts

// Remove gallery borders so element screenshots are exact card dimensions
await page.addStyleTag({ content: '.card { border: none !important; box-shadow: none !important; }' });

const cards = [
  // Facebook page assets
  { id: 'fb-cover',   dir: DIRS.facebook, name: 'cover-photo' },
  { id: 'fb-profile', dir: DIRS.facebook, name: 'profile-photo' },

  // Teaser (drop before campaign starts)
  { id: 'season-announcement', dir: DIRS.teaser, name: '1-series-announcement' },
  { id: 'teaser-format-cta',   dir: DIRS.teaser, name: '2-format-cta' },
  { id: 'teaser-story',        dir: DIRS.teaser, name: 'story-hype' },

  // Phase 1: Launch week (Apr 21+, one event card per day)
  { id: 'bell-pepper-open',       dir: DIRS.phase1, name: '1-bell-pepper-open' },
  { id: 'jalapeno-open',          dir: DIRS.phase1, name: '2-jalapeno-open' },
  { id: 'poblano-open',           dir: DIRS.phase1, name: '3-poblano-open' },
  { id: 'bell-pepper-open-story', dir: DIRS.phase1, name: 'story-bell-pepper-open' },
  { id: 'series-story',           dir: DIRS.phase1, name: 'story-full-series' },

  // Phase 2: Registration push
  { id: 'prize-pool', dir: DIRS.phase2, name: 'prize-pool-breakdown' },
];

for (const card of cards) {
  const el = page.locator(`#${card.id}`);
  const box = await el.boundingBox();
  if (!box) { console.error(`Card #${card.id} not found!`); continue; }

  const relPath = path.relative(EXPORT_DIR, path.join(card.dir, `${card.name}.png`));
  console.log(`Exporting ${relPath} (${box.width}x${box.height})...`);

  await el.screenshot({
    path: path.join(card.dir, `${card.name}.png`),
    type: 'png',
  });
}

await browser.close();
console.log(`\nDone! ${cards.length} cards exported to social/exports/`);
console.log('  facebook/         — page cover + profile photo');
console.log('  teaser/           — carousel + story (drop before campaign)');
console.log('  phase-1-launch/   — individual event cards (Apr 21+)');
console.log('  phase-2-registration/ — prize pool (May 11+)');
