import fs from 'node:fs';

const path = 'rezerva-site/index.html';
let html = fs.readFileSync(path, 'utf8');

const marker = `<article class="card half">\n          <span class="label">Tiger II // současný stav po upgradu</span>`;
if (!html.includes(marker)) throw new Error('Warhead insertion marker not found');

const block = `
        <article class="card full">
          <span class="label red">VLS / SPECIÁLNÍ MUNICE // POTVRZENÉ HLAVICE NII</span>
          <h3>Jaderné, fúzní, neutronové, antihmotové a rojové hlavice</h3>
          <p>NII má k dispozici širší škálu speciální munice než samotnou Omega−. Níže jsou vedeny pouze typy, které byly v kánonu výslovně potvrzeny. Hodnocení /100 vyjadřuje relativní bojovou úroveň v rámci databáze, nikoli univerzální fyzikální jednotku.</p>
          <div class="table-wrap"><table><thead><tr><th>Hodnocení</th><th>Typ hlavice</th><th>Potvrzený popis / stav</th></tr></thead><tbody>
            <tr><td><strong>20/100</strong></td><td><strong>Proximity fragmentační hlavice</strong></td><td>Potvrzený typ munice NII. Přesný archivní popis účinku a konstrukce není v dostupném kánonovém záznamu rozepsán, proto zde není doplněn odhadem.</td></tr>
            <tr><td><strong>76/100</strong></td><td><strong>Průrazná fúzní hlavice</strong></td><td>Potvrzený typ munice NII. Přesné konstrukční parametry a účinek nejsou v dostupném archivním záznamu dále rozvedeny.</td></tr>
            <tr><td><strong>77/100</strong></td><td><strong>Tandemová fúzní hlavice</strong></td><td>Potvrzený typ munice NII. Podrobné parametry tandemového principu nejsou v aktuálním archivním záznamu číselně potvrzeny.</td></tr>
            <tr><td><strong>81/100</strong></td><td><strong>Supertěžká tvarovaná jaderná hlavice</strong></td><td>Potvrzený typ munice NII. Přesná konstrukce, výtěžnost a geometrie směrovaného účinku nejsou v dostupném záznamu určeny.</td></tr>
            <tr><td><strong>81/100</strong></td><td><strong>Kazetová jaderná hlavice „Atomový roj“ – A+</strong></td><td>Jedna velká nosná hlavice se před dosažením cíle otevře a vypustí <b>100 samostatně naváděných atomových raket</b>. Roj se rozptýlí, rozdělí si cíle a zaútočí z různých směrů, takže obrana musí během krátké chvíle zachytit desítky až stovku jaderných hrozeb. Jednotlivé rakety nemusí být extrémně silné; ničivost systému spočívá v množství, současném útoku a vysoké pravděpodobnosti, že část roje projde.</td></tr>
            <tr><td><strong>83/100</strong></td><td><strong>Inteligentní atomový roj</strong></td><td><b>100 jaderných raket spolupracuje jako jeden celek</b>, mění formaci, přerozděluje cíle a reaguje na ztráty.</td></tr>
            <tr><td><strong>85/100</strong></td><td><strong>Těžká neutronová hlavice</strong></td><td>Potvrzený typ munice NII. Přesný archivní popis účinku a výtěžnosti není v dostupném záznamu rozepsán.</td></tr>
            <tr><td><strong>85/100</strong></td><td><strong>Těžká kazetová jaderná hlavice</strong></td><td>Každá ze <b>100 submunicí</b> je už plnohodnotná těžká jaderná střela určená proti kapitálním lodím, stanicím a obranným formacím.</td></tr>
            <tr><td><strong>87/100</strong></td><td><strong>Kazetový termonukleární roj</strong></td><td>Místo atomových hlavic nese nosič <b>100 termonukleárních submunicí</b>. Tohle už je flotilový likvidační prostředek a svou úrovní se začíná přibližovat antihmotovým zbraním.</td></tr>
            <tr><td><strong>88/100</strong></td><td><strong>Antihmotová průrazná hlavice</strong></td><td>Potvrzený typ munice NII. Přesné množství antihmoty, průrazný mechanismus a výtěžnost nejsou v dostupném archivním záznamu potvrzeny.</td></tr>
            <tr><td><strong>96/100</strong></td><td><strong>Singularitní hlavice / Omega−</strong></td><td>Speciální singularitní zbraň NII, bojově nasazená u Helioru. V potvrzeném záznamu jeden útok zničil dvě sovětské lodě. Přesný počet kusů, dostřel a zásoba nejsou stanoveny.</td></tr>
          </tbody></table></div>
          <div class="warning"><b>Rozsah databáze:</b> u položek, kde máme potvrzený název a hodnocení, ale chybí původní detailní popis, web výslovně ponechává parametry neupřesněné místo jejich domýšlení. Jakmile se další hlavice objeví v příběhu s potvrzeným názvem nebo číslem, lze je přidat do stejného registru.</div>
        </article>

        <article class="card full">
          <span class="label red">rojové hlavice // srovnání</span>
          <h3>Vývojová řada „Atomový roj“</h3>
          <div class="specs"><div class="spec"><b>81/100</b><span>Atomový roj A+ // 100 atomových raket</span></div><div class="spec"><b>83/100</b><span>inteligentní atomový roj</span></div><div class="spec"><b>85/100</b><span>100 těžkých jaderných submunicí</span></div><div class="spec hot"><b>87/100</b><span>100 termonukleárních submunicí</span></div></div>
          <p>Řada postupně přechází od prostého zahlcení obrany stovkou samostatně naváděných jaderných hrozeb přes kooperující inteligentní roj až k těžkým jaderným a následně termonukleárním submunicím. Hlavní výhodou není pouze výtěžnost jednotlivé hlavice, ale schopnost donutit obranu současně řešit velmi vysoký počet samostatných cílů.</p>
        </article>

        `;

html = html.replace(marker, block + marker);

const required = [
  'Inteligentní atomový roj', '83/100', 'Těžká kazetová jaderná hlavice', '85/100',
  'Kazetový termonukleární roj', '87/100', 'Kazetová jaderná hlavice „Atomový roj“ – A+',
  '100 samostatně naváděných atomových raket', 'Těžká neutronová hlavice',
  'Antihmotová průrazná hlavice', 'Supertěžká tvarovaná jaderná hlavice',
  'Tandemová fúzní hlavice', 'Průrazná fúzní hlavice', 'Proximity fragmentační hlavice',
  'Singularitní hlavice / Omega−', 'NII-88 / Projekt 82-ES „Sojuz“',
  'Sovětská válka proti mezirasové obchodní frakci'
];
for (const r of required) if (!html.includes(r)) throw new Error(`Missing required item: ${r}`);

fs.writeFileSync(path, html);
console.log(`added NII warhead registry: ${Buffer.byteLength(html)} bytes`);
