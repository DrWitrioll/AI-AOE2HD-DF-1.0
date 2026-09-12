import { chromium } from 'playwright';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const share = 'https://firestorage.ai/ja/f/W5SKris1n9dY';
const out = '/tmp/patch-catalog.mjs';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
await page.goto(share, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3500);

for (const re of [/accept/i, /agree/i, /同意/, /許可/, /^OK$/i]) {
  try {
    const b = page.getByRole('button', { name: re }).first();
    if (await b.isVisible({ timeout: 500 })) await b.click({ timeout: 1500 });
  } catch {}
}

let saved = false;
const controls = page.locator('a,button').filter({ hasText: /download|ダウンロード|保存|取得/i });
const count = Math.min(await controls.count(), 20);
for (let i = 0; i < count && !saved; i++) {
  try {
    const dlPromise = page.waitForEvent('download', { timeout: 8000 }).catch(() => null);
    await controls.nth(i).click({ timeout: 2500, force: true });
    const dl = await dlPromise;
    if (!dl) continue;
    const p = await dl.path();
    if (!p) continue;
    const buf = fs.readFileSync(p);
    const txt = buf.toString('utf8');
    if (buf.length < 20000 || !txt.includes('const catalog =') || !txt.includes('8 odpalovacích pozic')) continue;
    fs.writeFileSync(out, buf);
    saved = true;
  } catch {}
}

if (!saved) throw new Error('Could not download catalog patch from Firestorage');
await browser.close();
execFileSync('node', [out], { stdio: 'inherit', cwd: process.cwd() });
