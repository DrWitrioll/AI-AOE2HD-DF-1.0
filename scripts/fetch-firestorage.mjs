import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const jobs = [
  { url: 'https://firestorage.ai/ja/f/mSC3e3vymBC3', out: 'rezerva-assets/nii-technicka-tabule.png', min: 1800000 },
  { url: 'https://firestorage.ai/ja/f/8RpWK0N7oyTI', out: 'rezerva-assets/posadka-nii.png', min: 2500000 },
  { url: 'https://firestorage.ai/ja/f/sYvGJ2l3CrZ6', out: 'rezerva-assets/prouzek.png', min: 1800000 },
];

fs.mkdirSync('rezerva-assets', { recursive: true });

const browser = await chromium.launch({ headless: true });

async function saveIfOriginal(buf, contentType, out, min) {
  if (!buf || buf.length < min) return false;
  if (!String(contentType || '').toLowerCase().includes('image/png')) return false;
  fs.writeFileSync(out, buf);
  console.log(`saved ${out}: ${buf.length} bytes`);
  return true;
}

for (const job of jobs) {
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  let best = null;

  page.on('response', async (res) => {
    try {
      const ct = res.headers()['content-type'] || '';
      if (!ct.toLowerCase().includes('image/png')) return;
      const body = await res.body();
      if (!best || body.length > best.body.length) best = { body, ct, url: res.url() };
    } catch {}
  });

  console.log(`opening ${job.url}`);
  await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);

  // Dismiss cookie/consent overlays when present.
  for (const re of [/accept/i, /agree/i, /同意/, /許可/, /^OK$/i]) {
    try {
      const b = page.getByRole('button', { name: re }).first();
      if (await b.isVisible({ timeout: 600 })) await b.click({ timeout: 1500 });
    } catch {}
  }
  await page.waitForTimeout(1500);

  // Probe every visible/hidden resource URL with the authenticated page request context.
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

  const ranked = urls.sort((a,b) => {
    const score = u => /download|original|file|storage|attachment/i.test(u) ? 1 : 0;
    return score(b) - score(a);
  });

  for (const u of ranked) {
    try {
      const r = await context.request.get(u, { timeout: 20000, maxRedirects: 10 });
      if (!r.ok()) continue;
      const ct = r.headers()['content-type'] || '';
      if (!ct.toLowerCase().includes('image/png')) continue;
      const body = await r.body();
      if (!best || body.length > best.body.length) best = { body, ct, url: u };
      if (await saveIfOriginal(body, ct, job.out, job.min)) break;
    } catch {}
  }

  if (!fs.existsSync(job.out)) {
    // Try download controls explicitly.
    const controls = page.locator('a,button').filter({ hasText: /download|ダウンロード|保存|取得/i });
    const n = Math.min(await controls.count(), 12);
    for (let i=0; i<n && !fs.existsSync(job.out); i++) {
      try {
        const dlPromise = page.waitForEvent('download', { timeout: 7000 }).catch(() => null);
        await controls.nth(i).click({ timeout: 2500, force: true });
        const dl = await dlPromise;
        if (!dl) continue;
        const tmp = await dl.path();
        if (!tmp) continue;
        const buf = fs.readFileSync(tmp);
        if (buf.length >= job.min) {
          fs.copyFileSync(tmp, job.out);
          console.log(`downloaded ${job.out}: ${buf.length} bytes`);
        }
      } catch {}
    }
  }

  if (!fs.existsSync(job.out) && best && best.body.length >= job.min) {
    fs.writeFileSync(job.out, best.body);
    console.log(`saved best response ${job.out}: ${best.body.length} bytes from ${best.url}`);
  }

  if (!fs.existsSync(job.out)) {
    throw new Error(`Could not recover full-size PNG from ${job.url}; best=${best?.body?.length || 0}`);
  }

  const size = fs.statSync(job.out).size;
  if (size < job.min) throw new Error(`Recovered file is too small: ${job.out} ${size}`);
  await context.close();
}

await browser.close();
console.log('all three original PNG files recovered');
