import { chromium } from 'playwright';
import fs from 'node:fs';

const jobs = [
  { url: 'https://firestorage.ai/ja/f/HJhIZ-Btoatv', out: 'rezerva-assets/kvk-rychla-korveta.png', size: 550711 },
  { url: 'https://firestorage.ai/ja/f/f-I8VrD4JPUv', out: 'rezerva-assets/kvk-titan.png', size: 624904 },
  { url: 'https://firestorage.ai/ja/f/Uc5ubgZy15em', out: 'rezerva-assets/kvk-juggernaut.png', size: 609798 },
  { url: 'https://firestorage.ai/ja/f/prJHbqA1oXO9', out: 'rezerva-assets/kvk-tezka-bitevni-lod.png', size: 550000 },
  { url: 'https://firestorage.ai/ja/f/8ebYAyUAZKO1', out: 'rezerva-assets/mezirasova-stanice-bezpecnost.png', size: 434846 },
];

fs.mkdirSync('rezerva-assets', { recursive: true });
const browser = await chromium.launch({ headless: true });

function isPng(buf) {
  return buf && buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
}

for (const job of jobs) {
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  let best = null;

  const consider = (buf, source) => {
    if (!isPng(buf)) return false;
    if (!best || buf.length > best.buf.length) best = { buf, source };
    if (buf.length === job.size) {
      fs.writeFileSync(job.out, buf);
      console.log(`saved exact ${job.out}: ${buf.length} bytes from ${source}`);
      return true;
    }
    return false;
  };

  page.on('response', async res => {
    try {
      const ct = (res.headers()['content-type'] || '').toLowerCase();
      if (!ct.includes('image/png') && !/download|file|attachment|storage/i.test(res.url())) return;
      consider(await res.body(), res.url());
    } catch {}
  });

  console.log(`opening ${job.url}`);
  await page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4500);

  for (const re of [/accept/i, /agree/i, /同意/, /許可/, /^OK$/i]) {
    try {
      const b = page.getByRole('button', { name: re }).first();
      if (await b.isVisible({ timeout: 600 })) await b.click({ timeout: 1500 });
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
      const body = await r.body();
      if (consider(body, u)) break;
    } catch {}
  }

  if (!fs.existsSync(job.out)) {
    const controls = page.locator('a,button').filter({ hasText: /download|ダウンロード|保存|取得/i });
    const n = Math.min(await controls.count(), 20);
    for (let i=0; i<n && !fs.existsSync(job.out); i++) {
      try {
        const dlPromise = page.waitForEvent('download', { timeout: 7000 }).catch(() => null);
        await controls.nth(i).click({ timeout: 2500, force: true });
        const dl = await dlPromise;
        if (!dl) continue;
        const tmp = await dl.path();
        if (!tmp) continue;
        consider(fs.readFileSync(tmp), `download:${dl.suggestedFilename()}`);
      } catch {}
    }
  }

  if (!fs.existsSync(job.out) && best && best.buf.length >= Math.floor(job.size * 0.95)) {
    fs.writeFileSync(job.out, best.buf);
    console.log(`saved best ${job.out}: ${best.buf.length} bytes from ${best.source}`);
  }

  if (!fs.existsSync(job.out)) throw new Error(`Could not recover ${job.out}; best=${best?.buf?.length || 0}`);
  console.log(`verified ${job.out}: ${fs.statSync(job.out).size} bytes`);
  await context.close();
}

await browser.close();
console.log('all five new Rezerva PNG files recovered');
