import { chromium } from 'playwright';
import fs from 'node:fs';

const share = 'https://firestorage.ai/ja/f/MRJmwdhoVghm';
const expected = new Map([
  [550711, 'rezerva-assets/kvk-rychla-korveta.png'],
  [624904, 'rezerva-assets/kvk-titan.png'],
  [609798, 'rezerva-assets/kvk-juggernaut.png'],
  [550000, 'rezerva-assets/kvk-tezka-bitevni-lod.png'],
  [434846, 'rezerva-assets/mezirasova-stanice-bezpecnost.png'],
]);

fs.mkdirSync('rezerva-assets', { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();

function isPng(buf) {
  return buf && buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
}
function saveMatch(buf, source='unknown') {
  if (!isPng(buf)) return false;
  const out = expected.get(buf.length);
  if (!out) return false;
  if (!fs.existsSync(out)) {
    fs.writeFileSync(out, buf);
    console.log(`saved ${out}: ${buf.length} bytes from ${source}`);
  }
  return true;
}

page.on('response', async res => {
  try {
    const ct = (res.headers()['content-type'] || '').toLowerCase();
    if (!ct.includes('image/png') && !/download|file|attachment|storage/i.test(res.url())) return;
    const body = await res.body();
    saveMatch(body, res.url());
  } catch {}
});

console.log(`opening ${share}`);
await page.goto(share, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(5000);
for (const re of [/accept/i, /agree/i, /同意/, /許可/, /^OK$/i]) {
  try {
    const b = page.getByRole('button', { name: re }).first();
    if (await b.isVisible({ timeout: 600 })) await b.click({ timeout: 1500 });
  } catch {}
}
await page.waitForTimeout(1500);

const urls = await page.evaluate(() => {
  const out = new Set();
  for (const e of performance.getEntriesByType('resource')) if (e.name) out.add(e.name);
  for (const el of document.querySelectorAll('img[src],a[href],source[src],video[src]')) {
    const v = el.getAttribute('src') || el.getAttribute('href');
    if (!v) continue;
    try { out.add(new URL(v, location.href).href); } catch {}
  }
  return [...out];
});
for (const u of urls.sort((a,b)=>(/download|original|file|storage|attachment/i.test(b)?1:0)-(/download|original|file|storage|attachment/i.test(a)?1:0))) {
  try {
    const r = await context.request.get(u, { timeout: 20000, maxRedirects: 10 });
    if (!r.ok()) continue;
    const body = await r.body();
    saveMatch(body, u);
  } catch {}
}

const controls = page.locator('a,button').filter({ hasText: /download|ダウンロード|保存|取得/i });
const n = Math.min(await controls.count(), 40);
for (let i=0; i<n; i++) {
  try {
    const dlPromise = page.waitForEvent('download', { timeout: 7000 }).catch(() => null);
    await controls.nth(i).click({ timeout: 2500, force: true });
    const dl = await dlPromise;
    if (!dl) continue;
    const tmp = await dl.path();
    if (!tmp) continue;
    saveMatch(fs.readFileSync(tmp), `download:${dl.suggestedFilename()}`);
  } catch {}
}

await browser.close();
const missing=[];
for (const [size,out] of expected) {
  if (!fs.existsSync(out) || fs.statSync(out).size !== size) missing.push(`${out} expected ${size}`);
}
if (missing.length) throw new Error(`Missing original PNGs: ${missing.join(', ')}`);
console.log('all five new Rezerva PNG files recovered');
