import { chromium } from 'playwright';
import fs from 'node:fs';

const share = 'https://firestorage.ai/ja/f/lhFuc1ztqzwz';
const out = 'rezerva-site/index.html';
fs.mkdirSync('rezerva-site', { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
await page.goto(share, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(4000);

for (const re of [/accept/i, /agree/i, /同意/, /許可/, /^OK$/i]) {
  try {
    const b = page.getByRole('button', { name: re }).first();
    if (await b.isVisible({ timeout: 500 })) await b.click({ timeout: 1500 });
  } catch {}
}

let saved = false;
const controls = page.locator('a,button').filter({ hasText: /download|ダウンロード|保存|取得/i });
const count = Math.min(await controls.count(), 15);
for (let i = 0; i < count && !saved; i++) {
  try {
    const dlPromise = page.waitForEvent('download', { timeout: 7000 }).catch(() => null);
    await controls.nth(i).click({ timeout: 2500, force: true });
    const dl = await dlPromise;
    if (!dl) continue;
    const p = await dl.path();
    if (!p) continue;
    const buf = fs.readFileSync(p);
    if (buf.length < 20000) continue;
    const txt = buf.toString('utf8');
    if (!txt.includes('<!doctype html>') || !txt.includes('DATABÁZE REZERVA')) continue;
    fs.writeFileSync(out, buf);
    saved = true;
  } catch {}
}

if (!saved) {
  const urls = await page.evaluate(() => {
    const out = new Set();
    for (const e of performance.getEntriesByType('resource')) if (e.name) out.add(e.name);
    for (const el of document.querySelectorAll('a[href]')) {
      const v = el.getAttribute('href');
      if (!v) continue;
      try { out.add(new URL(v, location.href).href); } catch {}
    }
    return [...out];
  });
  for (const u of urls.sort((a,b)=>(/download|file|attachment/i.test(b)?1:0)-(/download|file|attachment/i.test(a)?1:0))) {
    try {
      const r = await context.request.get(u, { timeout: 20000, maxRedirects: 10 });
      if (!r.ok()) continue;
      const body = await r.body();
      if (body.length < 20000) continue;
      const txt = body.toString('utf8');
      if (!txt.includes('<!doctype html>') || !txt.includes('DATABÁZE REZERVA')) continue;
      fs.writeFileSync(out, body);
      saved = true;
      break;
    } catch {}
  }
}

await browser.close();
if (!saved) throw new Error('Could not recover final HTML from firestorage');
const html = fs.readFileSync(out, 'utf8');
const lower = html.toLowerCase();
for (const required of ['navigace a mapy','frakce a rasy','obchod a měny','lodě a technika','posádka a postavy','historie','sověti','60 pomocných členů','82 evidováno','res.cloudinary.com/emmgrwto']) {
  if (!lower.includes(required.toLowerCase())) throw new Error(`Missing expected content: ${required}`);
}
console.log(`saved ${out}: ${Buffer.byteLength(html)} bytes`);
