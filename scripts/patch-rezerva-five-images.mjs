import fs from 'node:fs';

const path = 'rezerva-site/index.html';
let html = fs.readFileSync(path, 'utf8');

const stationMarker = '        <article class="card wide"><span class="label green">nová posádka // potvrzený počet</span><h3>60 pomocných členů z mezirasové stanice</h3>';
const stationBlock = `        <article class="card full hero-card">
          <div class="hero-copy">
            <span class="label green">mezirasová stanice // bezpečnost</span>
            <h3>Bezpečnostní služba stanice</h3>
            <p>Vizuální záznam zachycuje smíšený bezpečnostní tým velké mezirasové stanice: pso-člověka, kočko-člověka, trpaslíka a ještěřana. Je to důležitý doklad toho, že stanice není prostředím jediné dominantní rasy, ale funguje jako společný uzel více inteligentních druhů.</p>
            <p>Personál používá jednotné služební stejnokroje, balistickou ochranu, komunikační techniku a dlouhé ruční zbraně. Značení v prostoru odkazuje na doky, tržiště, celnici a obytné sekce; bezpečnostní služba tak zjevně zajišťuje provoz prostředí, kde se mísí obchod, doprava, pobyt návštěvníků a kontrola příchozích.</p>
            <p>Nápis <b>„Different people, same peace“</b> vystihuje praktický charakter stanice: biologicky velmi odlišné druhy zde fungují pod jedním bezpečnostním režimem. Databáze ale z obrázku neodvozuje neznámé politické uspořádání, početní stav služby ani přesnou strukturu velení.</p>
            <div class="badges"><span class="badge o">kočko-lidé</span><span class="badge">pso-lidé</span><span class="badge">trpaslíci</span><span class="badge">ještěřané</span><span class="badge">Station Security</span></div>
            <div class="warning"><b>Poznámka:</b> vyobrazení příslušníci bezpečnosti nejsou automaticky totožní s 60 bezejmennými pomocnými členy, kteří později vstoupili na NII.</div>
          </div>
          <div class="media lightbox"><img src="https://res.cloudinary.com/emmgrwto/image/upload/v1789192406/rezervni-posadka/mezirasova-stanice-bezpecnost.jpg" alt="Smíšený bezpečnostní tým mezirasové stanice – pso-člověk, kočko-člověk, trpaslík a ještěřan" loading="lazy"><span class="caption">MEZIRASOVÁ STANICE // STATION SECURITY</span></div>
        </article>
`;

if (!html.includes('mezirasova-stanice-bezpecnost.jpg')) {
  if (!html.includes(stationMarker)) throw new Error('Station insertion marker not found');
  html = html.replace(stationMarker, stationBlock + stationMarker);
}

const sovietMarker = '        <article class="card half"><span class="label green">současný stav</span><h3>Bez aktivního kontaktu</h3>';
const kvkBlock = `        <article class="card full hero-card">
          <div class="hero-copy">
            <span class="label red">KVK // rychlá vesmírná korveta</span>
            <h3>Jednomístná úderná a doprovodná korveta</h3>
            <p>Kompaktní rychlá korveta KVK je určena pro jednoho pilota a pro nasazení z větší mateřské lodi. Její hlavní předností není dlouhodobá autonomie, ale okamžitá reakce: doprovod, krátké samostatné bojové akce, zachycení cíle, úderná mise a rychlá podpora hlavních jednotek.</p>
            <p>Pilot sedí v předním pancéřovaném kokpitu s přímým přístupem k hlavním letovým i bojovým systémům. Pohon tvoří výkonné zadní motorové jednotky a síť pomocných manévrovacích trysek; dvojice svislých stabilizačních ploch a kompaktní trup jsou uzpůsobeny pro rychlé změny směru.</p>
            <p>Výzbroj tvoří dvojice těžkých předních hlavní doplněná integrovanými zbraňovými moduly na křídlech a bocích. Konstrukce má zesílený příďový klín, vnější pancéřové plátování a robustní trup. Po krátkém nasazení se počítá s návratem k mateřské lodi kvůli doplnění paliva, výzbroje a servisu.</p>
            <div class="specs"><div class="spec"><b>1</b><span>pilot</span></div><div class="spec hot"><b>2</b><span>těžké přední hlavně</span></div><div class="spec"><b>mateřská loď</b><span>základna / start</span></div></div>
          </div>
          <div class="media contain lightbox"><img src="https://res.cloudinary.com/emmgrwto/image/upload/v1789192362/rezervni-posadka/kvk-rychla-korveta.jpg" alt="Technický list KVK – rychlá vesmírná korveta" loading="lazy"><span class="caption">KVK // RYCHLÁ VESMÍRNÁ KORVETA</span></div>
        </article>

        <article class="card full hero-card">
          <div class="hero-copy">
            <span class="label red">KVK // TITÁN (STELLARIS)</span>
            <h3>Těžce ozbrojený Titán</h3>
            <p>Titán KVK je těžká kapitální loď určená k průlomu, ničení nejcennějších nepřátelských plavidel a k řízení velkých operací. Nejde jen o nosič výzbroje: víceúrovňová velitelská nástavba z něj dělá strategickou velitelskou platformu flotily.</p>
            <p>Hlavní dělová věž nese <b>pět 1200mm kanónů</b>. Sekundární věže pokrývají další směry a rozsáhlé pancéřování využívá vrstvenou konstrukci, zesílené nosné struktury a dodatečné pancéřové bloky. Zadní motorové sekce a integrovaný pohon obětují část obratnosti ve prospěch hmotnosti, ochrany a palebné síly.</p>
            <p>Technický list uvádí čtyři hlavní druhy 1200mm munice: HE pro plošnou destrukci, HEAT proti silně pancéřovaným cílům, APCR pro vysokou průbojnost a naváděný Bunker-Buster určený k průniku hluboko do chráněného cíle.</p>
            <div class="specs"><div class="spec hot"><b>10/10</b><span>palebná síla</span></div><div class="spec hot"><b>10/10</b><span>odolnost</span></div><div class="spec"><b>8/10</b><span>obrana</span></div><div class="spec"><b>9/10</b><span>dosah</span></div><div class="spec hot"><b>10/10</b><span>velení</span></div><div class="spec"><b>5/10</b><span>manévrovatelnost</span></div></div>
          </div>
          <div class="media contain lightbox"><img src="https://res.cloudinary.com/emmgrwto/image/upload/v1789192374/rezervni-posadka/kvk-titan.jpg" alt="Technický list KVK – těžce ozbrojený Titán" loading="lazy"><span class="caption">KVK // TĚŽCE OZBROJENÝ TITÁN</span></div>
        </article>

        <article class="card full hero-card">
          <div class="hero-copy">
            <span class="label red">KVK // JUGGERNAUT (STELLARIS)</span>
            <h3>Těžce ozbrojený Juggernaut</h3>
            <p>Juggernaut je masivní průlomová bitevní loď a současně velitelská platforma. Je koncipován jako ofenzivní páteř flotily: má se objevit tam, kde je potřeba rozbít obranu, udržet strategickou přítomnost a dodat operaci drtivou palebnou převahu.</p>
            <p>Hlavní dělostřeleckou sílu tvoří 1200mm kanóny doplněné množstvím těžkých baterií, sekundárních věží a bočních zbraňových komplexů. Rozměrný trup je kryt vnějším pancéřováním a nese víceúrovňovou velitelskou nástavbu; zadní část zabírá rozsáhlá motorová sekce.</p>
            <p>Munice zahrnuje HE, HEAT, APCR a naváděný Bunker-Buster. U posledního typu technický list počítá s vlastním naváděním a korekčními tryskami; po průniku do pancíře kapitálního cíle má nálož detonovat uvnitř jeho konstrukce.</p>
            <div class="specs"><div class="spec hot"><b>5/5</b><span>palebná síla</span></div><div class="spec hot"><b>5/5</b><span>odolnost</span></div><div class="spec"><b>4/5</b><span>obrana</span></div><div class="spec hot"><b>5/5</b><span>velitelská přítomnost</span></div><div class="spec"><b>4/5</b><span>dosah</span></div><div class="spec"><b>2/5</b><span>manévrovatelnost</span></div></div>
          </div>
          <div class="media contain lightbox"><img src="https://res.cloudinary.com/emmgrwto/image/upload/v1789192385/rezervni-posadka/kvk-juggernaut.jpg" alt="Technický list KVK – těžce ozbrojený Juggernaut" loading="lazy"><span class="caption">KVK // TĚŽCE OZBROJENÝ JUGGERNAUT</span></div>
        </article>

        <article class="card full hero-card">
          <div class="hero-copy">
            <span class="label red">KVK // TĚŽKÁ BITEVNÍ LOĎ</span>
            <h3>Hlavní úderná loď pro přímý střet</h3>
            <p>Těžká bitevní loď KVK je určena k přímému střetu s prioritními cíli nepřátelské flotily, k palebné podpoře svazů a k ničení strategických objektů. Konstrukce kombinuje robustní modulární pancíř, rozsáhlé servisní sekce, silný pohon a těžkou dělostřeleckou výzbroj.</p>
            <p>Dominantní hlavní věž nese <b>pět kanónů ráže 1200 mm</b>. Děla používají munici HE, HEAT a APCR; zvláštní Bunker-Buster využívá velmi husté těleso, vlastní navádění a korekční trysky. Podle technického listu jde o strategickou munici schopnou proniknout hluboko do pancíře a odpálit nálož až uvnitř cíle.</p>
            <p>Na trupu jsou patrné zesílené čelní partie, horní modulární plátování, boční pancéřové bloky, servisní panely a výrazná červená identifikační pole. Loď je optimalizována pro palebnou převahu a odolnost; rychlost a manévrovatelnost jsou proti tomu druhotné.</p>
            <div class="badges"><span class="badge o">5 × 1200 mm</span><span class="badge">modulární pancíř</span><span class="badge">HE / HEAT / APCR</span><span class="badge">Bunker-Buster</span><span class="badge">strategické cíle</span></div>
          </div>
          <div class="media contain lightbox"><img src="https://res.cloudinary.com/emmgrwto/image/upload/v1789192395/rezervni-posadka/kvk-tezka-bitevni-lod.jpg" alt="Technický list KVK – těžká bitevní loď" loading="lazy"><span class="caption">KVK // TĚŽKÁ BITEVNÍ LOĎ</span></div>
        </article>
`;

if (!html.includes('kvk-rychla-korveta.jpg')) {
  if (!html.includes(sovietMarker)) throw new Error('Soviet insertion marker not found');
  html = html.replace(sovietMarker, kvkBlock + sovietMarker);
}

for (const required of [
  'mezirasova-stanice-bezpecnost.jpg',
  'kvk-rychla-korveta.jpg',
  'kvk-titan.jpg',
  'kvk-juggernaut.jpg',
  'kvk-tezka-bitevni-lod.jpg',
  'id="history"',
  'id="soviets"',
  '60 pomocných členů z mezirasové stanice'
]) {
  if (!html.includes(required)) throw new Error(`Missing after patch: ${required}`);
}

fs.writeFileSync(path, html);
console.log(`patched ${path}: ${Buffer.byteLength(html)} bytes`);
