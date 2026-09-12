import fs from 'node:fs';

const path = 'rezerva-site/index.html';
let html = fs.readFileSync(path, 'utf8');

const replacements = [
  [
    `<tr><td><strong>20/100</strong></td><td><strong>Proximity fragmentační hlavice</strong></td><td>Potvrzený typ munice NII. Přesný archivní popis účinku a konstrukce není v dostupném kánonovém záznamu rozepsán, proto zde není doplněn odhadem.</td></tr>`,
    `<tr><td><strong>20/100</strong></td><td><strong>Proximity fragmentační hlavice – D</strong></td><td>Vybuchne poblíž cíle a zasype jej střepinami. Ideální proti malým cílům.</td></tr>`
  ],
  [
    `<tr><td><strong>76/100</strong></td><td><strong>Průrazná fúzní hlavice</strong></td><td>Potvrzený typ munice NII. Přesné konstrukční parametry a účinek nejsou v dostupném archivním záznamu dále rozvedeny.</td></tr>`,
    `<tr><td><strong>76/100</strong></td><td><strong>Průrazná fúzní hlavice – A+</strong></td><td>Pronikne pod pancíř a detonuje uvnitř cíle.</td></tr>`
  ],
  [
    `<tr><td><strong>77/100</strong></td><td><strong>Tandemová fúzní hlavice</strong></td><td>Potvrzený typ munice NII. Podrobné parametry tandemového principu nejsou v aktuálním archivním záznamu číselně potvrzeny.</td></tr>`,
    `<tr><td><strong>77/100</strong></td><td><strong>Tandemová fúzní hlavice – A+</strong></td><td>První fáze naruší obranu, druhá zničí vnitřní strukturu.</td></tr>`
  ],
  [
    `<tr><td><strong>81/100</strong></td><td><strong>Supertěžká tvarovaná jaderná hlavice</strong></td><td>Potvrzený typ munice NII. Přesná konstrukce, výtěžnost a geometrie směrovaného účinku nejsou v dostupném záznamu určeny.</td></tr>`,
    `<tr><td><strong>81/100</strong></td><td><strong>Supertěžká tvarovaná jaderná hlavice – A+</strong></td><td>Podstatně vyšší výkon a přesnější usměrnění energie.</td></tr>`
  ],
  [
    `<tr><td><strong>85/100</strong></td><td><strong>Těžká neutronová hlavice</strong></td><td>Potvrzený typ munice NII. Přesný archivní popis účinku a výtěžnosti není v dostupném záznamu rozepsán.</td></tr>`,
    `<tr><td><strong>85/100</strong></td><td><strong>Těžká neutronová hlavice – S-</strong></td><td>Výrazně silnější radiační účinek proti chráněným lodím.</td></tr>`
  ],
  [
    `<tr><td><strong>88/100</strong></td><td><strong>Antihmotová průrazná hlavice</strong></td><td>Potvrzený typ munice NII. Přesné množství antihmoty, průrazný mechanismus a výtěžnost nejsou v dostupném archivním záznamu potvrzeny.</td></tr>`,
    `<tr><td><strong>88/100</strong></td><td><strong>Antihmotová průrazná hlavice – S</strong></td><td>Uvolní antihmotovou energii uvnitř cíle.</td></tr>`
  ]
];

for (const [oldText, newText] of replacements) {
  if (!html.includes(oldText)) throw new Error(`Expected warhead row not found: ${oldText.slice(0, 90)}`);
  html = html.replace(oldText, newText);
}

const required = [
  'Těžká neutronová hlavice – S-', 'Výrazně silnější radiační účinek proti chráněným lodím.',
  'Antihmotová průrazná hlavice – S', 'Uvolní antihmotovou energii uvnitř cíle.',
  'Supertěžká tvarovaná jaderná hlavice – A+', 'Podstatně vyšší výkon a přesnější usměrnění energie.',
  'Tandemová fúzní hlavice – A+', 'První fáze naruší obranu, druhá zničí vnitřní strukturu.',
  'Průrazná fúzní hlavice – A+', 'Pronikne pod pancíř a detonuje uvnitř cíle.',
  'Proximity fragmentační hlavice – D', 'Vybuchne poblíž cíle a zasype jej střepinami. Ideální proti malým cílům.',
  'Inteligentní atomový roj', 'Těžká kazetová jaderná hlavice', 'Kazetový termonukleární roj',
  'Kazetová jaderná hlavice „Atomový roj“ – A+', 'Sovětská válka proti mezirasové obchodní frakci'
];
for (const r of required) if (!html.includes(r)) throw new Error(`Missing required content after patch: ${r}`);

fs.writeFileSync(path, html);
console.log(`updated exact NII warhead descriptions: ${Buffer.byteLength(html)} bytes`);
