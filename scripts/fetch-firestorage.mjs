import { chromium } from 'playwright';
import fs from 'node:fs';

const jobs = [
  { url: 'https://firestorage.ai/ja/f/IAKUyqLjmAOO', out: 'rezerva-assets/kvk-rychla-korveta.png', min: 500000 },
  { url: 'https://firestorage.ai/ja/f/B_0sEEjqe-s3', out: 'rezerva-assets/kvk-titan.png', min: 580000 },
  { url: 'https://firestorage.ai/ja/f/YwF8-0iV5NHv', out: 'rezerva-assets/kvk-juggernaut.png', min: 560000 },
  { url: 'https://firestorage.ai/ja/f/QKx2Ie813At2', out: 'rezerva-assets/kvk-tezka-bitevni-lod.png', min: 500000 },
  { url: 'https://firestorage.ai/ja/f/eJtK4Ff3KIzL', out: 'rezerva-assets/mezirasova-stanice-bezpecnost.png', min: 400000 },
];

fs.mkdirSync('rezerva-assets', { recursive: true });
const browser = await chromium.launch({ headless: true });

async function recover(job) {
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  let best = null;

  page.on('response', async (res) => {
    try {
      const ct = (res.headers()['content-type'] || '').toLowerCase();
      if (!ct.includes('image/png')) return;
      const body = await res.body();
      if (!best || body.length > best.length) best = body;
    } catch {}
  });

  console.log(`opening ${job.url}`);
  await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3500);

  for (const re of [/accept/i, /agree/i, /同意/, /許可/, /^OK$/i]) {
    try {
      const b = page.getByRole('button', { name: re }).first();
      if (await b.isVisible({ timeout: 500 })) await b.click({ timeout: 1500 });
    } catch {}
  }
  await page.waitForTimeout(1000);

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
      const ct = (r.headers()['content-type'] || '').toLowerCase();
      if (!ct.includes('image/png')) continue;
      const body = await r.body();
      if (!best || body.length > best.length) best = body;
      if (body.length >= job.min) {
        fs.writeFileSync(job.out, body);
        break;
      }
    } catch {}
  }

  if (!fs.existsSync(job.out)) {
    const controls = page.locator('a,button').filter({ hasText: /download|ダウンロード|保存|取得/i });
    const n = Math.min(await controls.count(), 15);
    for (let i=0; i<n && !fs.existsSync(job.out); i++) {
      try {
        const dlPromise = page.waitForEvent('download', { timeout: 7000 }).catch(() => null);
        await controls.nth(i).click({ timeout: 2500, force: true });
        const dl = await dlPromise;
        if (!dl) continue;
        const p = await dl.path();
        if (!p) continue;
        const buf = fs.readFileSync(p);
        if (buf.length >= job.min) fs.writeFileSync(job.out, buf);
      } catch {}
    }
  }

  if (!fs.existsSync(job.out) && best && best.length >= job.min) fs.writeFileSync(job.out, best);
  if (!fs.existsSync(job.out)) throw new Error(`Could not recover ${job.out}; best=${best?.length || 0}`);
  console.log(`saved ${job.out}: ${fs.statSync(job.out).size} bytes`);
  await context.close();
}

for (const job of jobs) await recover(job);
await browser.close();
console.log('all five new Rezerva PNG files recovered');
