import fs from 'node:fs';

const path = 'rezerva-site/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1) Rozšíření technického spisu NII – vložit před historickou kartu Argusu.
const shipsMarker = `<article class="card half"><span class="label gray">historická loď</span><h3>KRV-114 Argus</h3>`;
if (!html.includes(shipsMarker)) throw new Error('Ships insertion marker not found');

const niiDetails = `
        <article class="card full">
          <span class="label green">projektový spis // NII-88 / Projekt 82-ES „Sojuz“</span>
          <h3>NII — konstrukce, energetika a pohon</h3>
          <p>NII je těžký vesmírný křižník původně koncipovaný pro dlouhodobou kolonizační misi. V projektovém archivu je veden jako <b>NII-88 / Projekt 82-ES „Sojuz“</b>. Loď je přibližně 420 metrů dlouhá, 155 metrů široká, přes 80 metrů vysoká a v operačním stavu má hmotnost kolem 220 000 tun.</p>
          <p>Plná tabulková posádka činí <b>420 osob</b>. Čtyřletá autonomie znamená čtyři roky provozu bez zastavení v přístavu a bez přístavního zásobování právě při plném stavu 420 osob; nižší počet lidí se nepřepočítává lineárně, protože část limitů tvoří údržba, opotřebení, provozní materiál a náhradní díly.</p>
          <div class="specs"><div class="spec hot"><b>RF-9 Prometej</b><span>hlavní energetický systém</span></div><div class="spec"><b>3×</b><span>fúzní reaktor</span></div><div class="spec"><b>9,8 TW</b><span>celkový výkon</span></div><div class="spec hot"><b>GIA-42</b><span>FTL systém</span></div><div class="spec"><b>2×</b><span>gravitační interferometrický agregát</span></div><div class="spec"><b>21 ly / den</b><span>potvrzený FTL výkon</span></div></div>
          <div class="metric-row"><div class="metric"><strong>6</strong><span>hlavních fúzních motorů</span></div><div class="metric"><strong>4</strong><span>plazmové vztlakové motory</span></div><div class="metric"><strong>8</strong><span>manévrovacích motorů</span></div><div class="metric"><strong>0,4–0,7 g</strong><span>cestovní zrychlení</span></div></div>
        </article>

        <article class="card full">
          <span class="label red">bojový spis // potvrzená výzbroj</span>
          <h3>Výzbroj NII</h3>
          <div class="table-wrap"><table><thead><tr><th>Systém</th><th>Potvrzený stav</th><th>Úloha / poznámka</th></tr></thead><tbody>
            <tr><td><strong>12,8 cm Kw.K. 44 L/55 Ausf. B</strong></td><td>1× plně otočná věž Tiger II</td><td>hlavní příďová kinetická výzbroj; po modernizaci používá 20ranný akumulační zásobník</td></tr>
            <tr><td><strong>CIWS</strong></td><td>5 obranných věží, každá 2× 40 mm rotační kanón</td><td>bodová obrana proti střelám, lehkým cílům a objektům v bezprostředním okolí lodi</td></tr>
            <tr><td><strong>VLS</strong></td><td>6 vertikálních odpalovacích šachet</td><td>vedené střely, protiraketová munice, torpéda a munice proti povrchovým cílům; přesný současný mix není potvrzen</td></tr>
            <tr><td><strong>Torpédomety</strong></td><td>4 torpédové trubice</td><td>samostatné vypouštění těžké naváděné munice</td></tr>
            <tr><td><strong>Obranné lasery</strong></td><td>2 laserové věže</td><td>obranná energetická výzbroj; přesný výkon a účinný dosah nejsou v kánonu číselně stanoveny</td></tr>
            <tr><td><strong>Omega−</strong></td><td>speciální singularitní zbraň // hodnocení 96/100</td><td>bojově nasazena u Helioru; zaznamenaný zásah zničil dvě sovětské lodě. Počet kusů, dostřel a zásoba nejsou potvrzeny.</td></tr>
          </tbody></table></div>
          <div class="warning"><b>Databázové pravidlo:</b> u VLS, torpéd, laserů a Omega− nejsou doplňovány ráže, počty střel ani dostřely, pokud je příběh dosud neurčil.</div>
        </article>

        <article class="card half">
          <span class="label">Tiger II // současný stav po upgradu</span>
          <h3>20ranný akumulační zásobník</h3>
          <p>Původní desetiranný systém byl na mezirasové stanici rozšířen na <b>20 nábojů</b>. Úplné nabití z 0/20 na 20/20 trvá 240 sekund, tedy přesně 12 sekund na jeden nový náboj.</p>
          <p>Rychlá zásobníková střelba je dostupná až od stavu <b>10/20</b>. Náboje 11–20 tvoří rychlou rezervu; při jejím čerpání může věž střílet přibližně po dvou sekundách. Po vyčerpání rezervy na 10/20 se dlouhodobá kadence ustálí zhruba na jedné ráně za 12 sekund.</p>
          <div class="metric-row"><div class="metric"><strong>20</strong><span>kapacita</span></div><div class="metric"><strong>240 s</strong><span>0 → 20</span></div><div class="metric"><strong>≈2 s</strong><span>rychlá palba</span></div><div class="metric"><strong>≈12 s</strong><span>udržitelná palba</span></div></div>
        </article>

        <article class="card half">
          <span class="label green">obranné vrstvy</span>
          <h3>Pancéřování, štíty a klamné cíle</h3>
          <p>NII kombinuje fyzické pancéřování s energetickou ochranou. Potvrzen je <b>fázově posunutý energetický štít</b>, částicové stínění a radiační ochrana odolná vůči provozu silných fúzních systémů. Aktivní obranu doplňují klamné cíle a rušičky.</p>
          <div class="specs"><div class="spec hot"><b>73/100</b><span>pancéřování</span></div><div class="spec"><b>75/100</b><span>radiační ochrana</span></div><div class="spec"><b>67/100</b><span>částicový štít</span></div></div>
          <div class="badges"><span class="badge o">phase-shift shield</span><span class="badge">decoys</span><span class="badge">jammers</span><span class="badge">CIWS</span></div>
        </article>

        `;
html = html.replace(shipsMarker, niiDetails + shipsMarker);

// 2) Doplnění současné války do hlavní historické časové osy.
const timelineMarker = `<div class="event"><b>později — mezirasová obchodní stanice</b><small>NII při hledání inteligentního života přilétá k velké obchodní/pirátské stanici obývané více druhy. Loď získává nové kontakty, technické úpravy a 60 bezejmenných pomocných členů.</small></div>`;
if (!html.includes(timelineMarker)) throw new Error('History timeline marker not found');
const warTimeline = timelineMarker + `\n            <div class="event"><b>10. 1. 2188 — válka zasahuje mezirasovou obchodní frakci</b><small>Po registraci NII přichází nouzové hlášení o neznámých lodích ničících planety a stanice obchodní frakce. Daniel Havel rozpozná rudou hvězdu a sovětské konstrukční znaky. Místní frakce už utrpěla těžké ztráty; přesné součty nejsou potvrzeny.</small></div>`;
html = html.replace(timelineMarker, warTimeline);

// 3) Podrobná současná válečná karta před závěrečným stavem historie.
const currentStateMarker = `<article class="card full">\n          <span class="label green">současný archivní stav</span>`;
if (!html.includes(currentStateMarker)) throw new Error('Current history state marker not found');
const warHistory = `
        <article class="card full">
          <span class="label red">10. 1. 2188 // současný konflikt</span>
          <h3>Sovětská válka proti mezirasové obchodní frakci</h3>
          <p>Po příletu k mezirasové obchodní stanici nebyla NII ani její posádka místním známá. Dne <b>10. ledna 2188</b> byla NII na stanici zaregistrována a získala povolení k pobytu a obchodu. Krátce nato však stanice přijala nouzové hlášení o <b>neznámých válečných lodích ničících planety a stanice obchodní frakce</b>.</p>
          <p>Daniel Havel podle emblému rudé hvězdy a konstrukčních znaků rozpoznal Sověty. Pro posádku NII tím skončilo přesvědčení, že po pěti FTL skocích unikla konfliktu u Helioru: stejný protivník operuje i v prostoru této dosud neznámé mezirasové civilizace.</p>
          <p>Havel předal velení stanice informace o <b>Sovětském svazu, známých typech lodí KVK, jejich výzbroji a bojové taktice a také o zničení Helioru</b>. Současně zadržel část citlivých informací o skutečném původu NII a o tom, kdo přesně sovětská plavidla obsluhuje. Mezirasová frakce tak získala první konkrétní zpravodajský obraz protivníka.</p>
          <div class="warning"><b>Stav války:</b> konflikt probíhá. Mezirasová obchodní frakce již utrpěla těžké ztráty na planetách, stanicích a ve vlastních silách, ale přesná čísla dosud nebyla v příběhu stanovena. Databáze proto nevymýšlí počty zničených světů, stanic ani lodí.</div>
          <div class="metric-row"><div class="metric"><strong>10. 1. 2188</strong><span>potvrzený zlom</span></div><div class="metric"><strong>KVK</strong><span>známá sovětská konstrukční řada</span></div><div class="metric"><strong>rudá hvězda</strong><span>rozpoznaný znak</span></div><div class="metric"><strong>probíhá</strong><span>aktuální stav války</span></div></div>
        </article>

        <article class="card half">
          <span class="label red">strana konfliktu // Sověti</span>
          <h3>Známý protivník, nové bojiště</h3>
          <p>Pro NII nejsou Sověti neznámým nepřítelem. Posádka už zažila jejich útok na Helior, přílet pěti lodí speciálních sil, následné posily a úplné zničení posledního heliorského světa. Nová hlášení proto Havel nevyhodnocuje jako izolované pirátství, ale jako pokračování širší sovětské vojenské expanze.</p>
          <p>Na stanici byly místním předány technické a taktické poznatky včetně informací o třídách KVK. Přesná velikost sovětských sil nasazených proti celé obchodní frakci zatím potvrzena není.</p>
        </article>

        <article class="card half">
          <span class="label green">strana konfliktu // obchodní frakce</span>
          <h3>Vícedruhová síť planet a stanic</h3>
          <p>Obchodní frakce sdružuje více druhů, se kterými se NII setkala na stanici: kočko-lidi, pso-lidi, trpaslíky a ještěřany. Její infrastruktura není tvořena jedinou stanicí; nouzová hlášení potvrzují útoky na další <b>planety a stanice</b> této sítě.</p>
          <p>NII vstoupila do této situace nejprve jako nově registrovaný návštěvník s povoleným pobytem a obchodem. Její nejdůležitější potvrzenou rolí v první fázi nové války je poskytnutí zpravodajských informací o protivníkovi; rozsah dalšího přímého vojenského zapojení se bude doplňovat podle pokračování příběhu.</p>
        </article>

        `;
html = html.replace(currentStateMarker, warHistory + currentStateMarker);

const required = [
  'NII-88 / Projekt 82-ES „Sojuz“', 'RF-9 Prometej', '9,8 TW', 'GIA-42', '21 ly / den',
  '5 obranných věží', '2× 40 mm rotační kanón', '6 vertikálních odpalovacích šachet',
  '4 torpédové trubice', '2 laserové věže', 'Omega−', '96/100', 'phase-shift shield',
  '73/100', '75/100', '67/100', '10. 1. 2188', 'Sovětská válka proti mezirasové obchodní frakci',
  'rudé hvězdy', 'povolení k pobytu a obchodu', 'těžké ztráty',
  'kvk-rychla-korveta.jpg', 'mezirasova-stanice-bezpecnost.jpg', '82 evidovaných'
];
for (const r of required) if (!html.includes(r)) throw new Error(`Missing required content: ${r}`);

fs.writeFileSync(path, html);
console.log(`patched NII dossier and current war: ${Buffer.byteLength(html)} bytes`);
