import fs from 'node:fs';

const path = 'rezerva-site/index.html';
let html = fs.readFileSync(path, 'utf8');

const sovietOld = `<article class="card half"><span class="label green">současný stav</span><h3>Bez aktivního kontaktu</h3><p>Po zničení Helioru NII provedlo pět nouzových FTL skoků do hlubokého vesmíru. Sovětská flotila je dál a po záměrně rozdílných směrech skoku není známý aktivní kontakt mezi ní a NII.</p><div class="warning"><b>Neznámé:</b> aktuální poloha sovětské flotily, její přesný početní stav a další operační záměr nejsou potvrzeny.</div></article>`;
const sovietNew = `<article class="card half"><span class="label green">současný stav</span><h3>Bez aktivního kontaktu</h3><p>Po zničení Helioru NII provedla pět nouzových FTL skoků do hlubokého vesmíru a tím přerušila bezprostřední kontakt se sovětskými silami. <b>Sovětská plavidla FTL pohon nemají.</b> Jejich další pohyb a způsob, jakým vedou operace na vzdálených bojištích, databáze nepřepisuje na FTL ani jej jinak nedomýšlí.</p><div class="warning"><b>Neznámé:</b> aktuální poloha sovětské flotily, její přesný početní stav a další operační záměr nejsou potvrzeny.</div></article>`;
if (!html.includes(sovietOld)) throw new Error('Old Soviet contact paragraph not found');
html = html.replace(sovietOld, sovietNew);

const warningOld = `<div class="warning"><b>Rozsah databáze:</b> u položek, kde máme potvrzený název a hodnocení, ale chybí původní detailní popis, web výslovně ponechává parametry neupřesněné místo jejich domýšlení. Jakmile se další hlavice objeví v příběhu s potvrzeným názvem nebo číslem, lze je přidat do stejného registru.</div>`;
const warningNew = `<div class="warning"><b>Rozsah databáze:</b> tento registr uvádí pouze typy hlavic, které má NII podle příběhu potvrzeně k dispozici. <b>Globální Katalog výzbroje je širší a neznamená inventář NII.</b> NII má <b>8 odpalovacích pozic pro raketové hlavice</b>; počet odpalovacích pozic není totéž jako počet kusů munice. U parametrů, které příběh neurčil, web nic nedoplňuje odhadem.</div>`;
if (!html.includes(warningOld)) throw new Error('Old NII warhead scope warning not found');
html = html.replace(warningOld, warningNew);

const required = [
  'Sovětská plavidla FTL pohon nemají.',
  'Globální Katalog výzbroje je širší a neznamená inventář NII.',
  '8 odpalovacích pozic pro raketové hlavice',
  'data-tab="arsenal"', 'ÚTOK // 1–140', 'OBRANA // 1–100',
  'NII-88 / Projekt 82-ES „Sojuz“ je jediná loď',
  'Inteligentní atomový roj', 'Těžká neutronová hlavice – S-',
  'Sovětská válka proti mezirasové obchodní frakci'
];
for (const r of required) if (!html.includes(r)) throw new Error(`Missing required canon item: ${r}`);

fs.writeFileSync(path, html);
console.log(`canon audit complete: ${Buffer.byteLength(html)} bytes`);
