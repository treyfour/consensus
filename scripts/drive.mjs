#!/usr/bin/env node
/**
 * Interaction smoke tests for the thread-split prototypes.
 *
 * shot.mjs proves a page renders without throwing. This proves the things you
 * can click actually do what the prototype claims — which is the only way to
 * know a "working prototype" works.
 *
 *   node scripts/drive.mjs [25|26|27]
 *
 * Exits non-zero on the first failed assertion or console error.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const CACHE = join(homedir(), 'Library/Caches/ms-playwright');
const CORE = join(homedir(), '.claude/skills/gstack/node_modules/playwright-core/index.mjs');
const BASE = 'http://localhost:4603';

function findChromium() {
  if (!existsSync(CACHE)) return null;
  for (const d of readdirSync(CACHE)
    .filter((x) => x.startsWith('chromium_headless_shell-') || x.startsWith('chromium-'))
    .sort()
    .reverse()) {
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

const { chromium } = await import(CORE);
const browser = await chromium.launch({ executablePath: findChromium() });

let failures = 0;
const ok = (cond, label) => {
  console.log((cond ? '  ok   ' : '  FAIL ') + label);
  if (!cond) failures++;
};

async function newPage(file) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));
  page.on('console', (m) => m.type() === 'error' && errs.push('CONSOLE: ' + m.text()));
  await page.goto(`${BASE}/${file}`, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  return { page, errs };
}

const want = process.argv[2];
const run = (n) => !want || want === String(n);

/* ── 25 · branch from a turn ─────────────────────────────────────────────── */
if (run(25)) {
  console.log('\noption-25-branch.html');
  const { page, errs } = await newPage('option-25-branch.html');

  ok((await page.locator('.turn').count()) === 11, 'seeds 11 turns');
  ok(
    (await page.locator('.frombar.on').count()) === 0,
    'the root thread shows no from-bar (it is the root, not an orphan)'
  );

  // branch from turn 7 (0-indexed 6)
  const t7 = page.locator('.turn[data-turn="6"]');
  await t7.hover();
  await t7.locator('.brbtn').click();
  await page.waitForTimeout(150);
  ok((await page.locator('.brform').count()) === 1, 'branch form opens on the turn');
  const carries = await page.locator('.brform .carries').innerText();
  ok(/carries 5 sources/.test(carries), 'branch form names what it carries: ' + carries.split('·')[0].trim());

  await page.locator('#brQ').fill('How does lipid nanoparticle tropism limit what can be monitored?');
  await page.locator('#brGo').click();
  await page.waitForTimeout(1000);

  ok((await page.locator('.frombar.on:not(.orphan)').count()) === 1, 'the child opens with a from-bar');
  const fb = await page.locator('.frombar').innerText();
  ok(/branched from turn 7 of/.test(fb), 'from-bar names the parent turn');
  ok(/CRISPR Off Target Effects/.test(fb), 'from-bar names the parent thread');
  ok(/5 sources carried/.test(fb), 'from-bar names the carried scope');
  ok((await page.locator('.crumbs a').count()) === 1, 'breadcrumb carries the parent as a link');
  ok((await page.locator('.turn').count()) === 1, 'the child has its own first turn');

  // carried-in references keep the PARENT's rank, not an invented one
  await page.locator('.qb.carr').click();
  await page.waitForTimeout(150);
  const carr = await page.locator('#refsBody').innerText();
  ok(/in CRISPR Off Target Effects/.test(carr), 'carried sources are labelled with the thread they ranked in');
  ok((await page.locator('.src.carr').count()) === 5, 'all 5 carried sources shown');

  // back to the parent — the stub must be there
  await page.locator('.crumbs a').first().click();
  await page.waitForTimeout(300);
  const stubs = page.locator('.turn[data-turn="6"] .stub');
  ok((await stubs.count()) === 1, 'the parent turn keeps a stub pointing at the child');
  ok(/branched from this turn/.test(await stubs.innerText()), 'the stub says what it is');

  // the tree knows both
  await page.locator('#tTree').click();
  await page.waitForTimeout(150);
  ok((await page.locator('.tnode').count()) === 2, 'the thread tree lists both threads');
  ok((await page.locator('.kids .tnode').count()) === 1, 'the child is nested under its parent');
  ok((await page.locator('.tnode.orph').count()) === 0, 'no orphans yet');

  // build the orphan on purpose, then repair it
  await page.locator('#railNew').click();
  await page.waitForTimeout(150);
  await page.locator('#oOrphan').click();
  await page.waitForTimeout(1000);
  ok((await page.locator('.frombar.orphan').count()) === 1, 'the orphan shows the no-parent warning');
  ok((await page.locator('.tnode.orph').count()) === 1, 'the tree flags the orphan');
  await page.locator('#fixOrphan').click();
  await page.waitForTimeout(200);
  ok((await page.locator('#pickWrap .opt').count()) > 10, 're-parenting offers every turn as a parent');
  await page.locator('#pickWrap .opt').nth(10).click();
  await page.waitForTimeout(300);
  ok((await page.locator('.frombar.orphan').count()) === 0, 're-parenting clears the orphan state');
  ok((await page.locator('.frombar.on').count()) === 1, 'the repaired thread now names its parent');
  await page.locator('#tTree').click();
  await page.waitForTimeout(150);
  ok((await page.locator('.tnode.orph').count()) === 0, 'the tree no longer flags it');

  ok(errs.length === 0, 'no console errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await page.close();
}

/* ── 26 · the product notices ────────────────────────────────────────────── */
if (run(26)) {
  console.log('\noption-26-seams.html');
  const { page, errs } = await newPage('option-26-seams.html');

  ok((await page.locator('.turn').count()) === 11, 'seeds 11 turns');
  ok((await page.locator('#nudge.on').count()) === 1, 'the thread notices its own seam');
  const proposed = await page.locator('#nudge').innerText();
  ok(/turns 1–6/.test(proposed) && /7–11/.test(proposed), 'it proposes 6|7: ' + proposed.replace(/\n/g, ' '));

  await page.locator('#nudgeGo').click();
  await page.waitForTimeout(300);
  ok((await page.locator('#review.on').count()) === 1, 'the split review opens');
  ok(
    (await page.locator('.cand').count()) >= 5,
    'every candidate boundary is shown, not just the winner'
  );
  const shared = await page.locator('#sharedLine').innerText();
  ok(/Kalter 2025/.test(shared) && /Angelini Stewart 2025/.test(shared),
    'it names the sources that a split would duplicate: ' + shared.replace(/\n/g, ' '));

  // the note triage
  const amb = await page.locator('.ncard.amb').count();
  ok(amb === 3, 'three of seven note cards cannot be assigned to a side (got ' + amb + ')');

  // moving the seam re-derives everything downstream of it
  await page.locator('.cand[data-k="7"]').click();
  await page.waitForTimeout(200);
  const shared7 = await page.locator('#sharedLine').innerText();
  ok(shared7 !== shared, 'moving the seam re-derives which sources get duplicated');
  ok(/Cancellieri 2022/.test(shared7), 'at 7|8 a third paper straddles');
  ok((await page.locator('.ncard.amb').count()) === 4, 'and a fourth note card becomes unassignable');
  await page.locator('.cand[data-k="6"]').click();
  await page.waitForTimeout(200);
  ok((await page.locator('.ncard.amb').count()) === 3, 'moving the seam back restores the assignment');

  // the recommended treatment: promote the note to a collection
  await page.locator('#optColl').click();
  await page.locator('#doSplit').click();
  await page.waitForTimeout(700);
  ok((await page.locator('#after.on').count()) === 1, 'the split lands on a result view');
  const after = await page.locator('#after').innerText();
  ok(/split from/.test(after), 'both halves name where they came from');
  ok((await page.locator('.rthread').count()) === 2, 'two threads');
  ok((await page.locator('.rcoll').count()) === 1, 'one collection holding them');

  // move a turn across — the answer to "what if it guessed wrong"
  await page.locator('.rthread').first().locator('.mv').first().click();
  await page.waitForTimeout(300);
  const moved = await page.locator('#after').innerText();
  ok(/5 turns/.test(moved), 'a turn can be moved across after the fact: ' + (moved.match(/\d+ turns/g) || []).join(', '));

  // undo restores one thread
  await page.locator('#undo').click();
  await page.waitForTimeout(400);
  ok((await page.locator('.turn').count()) === 11, 'undo restores the single 11-turn thread');
  ok((await page.locator('#after.on').count()) === 0, 'and leaves the result view');

  ok(errs.length === 0, 'no console errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await page.close();
}

/* ── 27 · merge ──────────────────────────────────────────────────────────── */
if (run(27)) {
  console.log('\noption-27-merge.html');
  const { page, errs } = await newPage('option-27-merge.html');

  ok((await page.locator('.thcard').count()) === 2, 'two separate threads to start');
  ok((await page.locator('#relat').innerText()).includes('Kalter 2025'),
    'the relatedness hint names the shared source');

  await page.locator('.thcard').nth(0).click();
  await page.locator('.thcard').nth(1).click();
  await page.locator('#mergeBtn').click();
  await page.waitForTimeout(300);
  ok((await page.locator('#plan.on').count()) === 1, 'the merge plan opens');

  await page.locator('#tabWeave').click();
  await page.waitForTimeout(200);
  const weave = await page.locator('#planBody').innerText();
  ok(/rejected/i.test(weave), 'interleaving is shown and labelled as the reject');
  ok((await page.locator('.wturn').count()) === 11, 'the interleaved version is actually rendered, all 11 turns');
  ok((await page.locator('.wbreak').count()) > 0, 'and the places it stops making sense are marked');

  await page.locator('#tabColl').click();
  await page.waitForTimeout(200);
  ok((await page.locator('#srcRows .srow').count()) === 6, 'the union lists all six papers');
  const kalt = await page.locator('.srow[data-p="3"]').innerText();
  ok((kalt.match(/ranked #/g) || []).length === 2,
    'a paper in both threads carries two ranks, never one combined rank');

  await page.locator('#doMerge').click();
  await page.waitForTimeout(600);
  ok((await page.locator('#result.on').count()) === 1, 'the merge lands on a collection');
  const res = await page.locator('#result').innerText();
  ok(/2 threads/.test(res), 'the collection holds both threads, unaltered');
  ok((await page.locator('#result .ngroup').count()) === 2, 'the notes arrive grouped by originating thread');

  ok(errs.length === 0, 'no console errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} failed` : '\nall passed');
process.exit(failures ? 1 : 0);
