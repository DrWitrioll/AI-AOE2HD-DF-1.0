import fs from 'node:fs';

const path = 'rezerva-site/index.html';
let html = fs.readFileSync(path, 'utf8');
const start = html.indexOf('<section class="page" id="history">');
const end = html.indexOf('<section class="page" id="soviets">');
if (start < 0 || end < 0 || end <= start) throw new Error('History/Soviets section markers not found');

const history = `<section class="page" id="history">
      <div class="section-head"><div><span class="code">HIS-06 // CHRONOLOGICKÝ ARCHIV</span><h2>Historie</h2><p>Rozšířený chronologický záznam sleduje cestu od prvních lidských mezihvězdných výprav přes KRV-114 Argus až k současné NII v neznámém prostoru. Přesná data a časy jsou uváděny jen tam, kde byly v kánonu potvrzeny; nejasné nebo rozporné okolnosti nejsou doplňovány odhadem.</p></div><div class="stamp">stav archivu: průběžně doplňovaný kánon</div></div>
      <div class="grid">

        <article class="card full">
          <span class="label">časová osa // hlavní milníky</span>
          <h3>Od Sluneční soustavy k neznámému prostoru</h3>
          <div class="timeline">
            <div class="event"><b>2126 — první lidská mezihvězdná výprava</b><small>První loď s lidskou posádkou opouští Sluneční soustavu směrem k Alpha Centauri. Cesta trvá 49 let; lidstvo stále neovládá FTL a mezihvězdné lety jsou generační logistický podnik.</small></div>
            <div class="event"><b>2141 — vznik Meziplanetárního společenství</b><small>Vzniká společný rámec pro navigaci, dopravu, záchranu, jadernou bezpečnost a ochranu tras. Ozbrojenou a bezpečnostní složkou se stávají Společné kosmické síly.</small></div>
            <div class="event"><b>2149 — dokončení KRV-114 Argus</b><small>Do služby vstupuje přibližně devadesátimetrová eskortní korveta, později uložená na jedenáct let do rezervního doku K-17 u Marsu.</small></div>
            <div class="event"><b>23. 10. 2187 — Jovianská krize</b><small>MTS Cormac narazí do palivového komplexu Helix-3 u Callista. Zahyne 286 lidí, stovky jsou zraněny a tisíce trosek ochromí provoz. Nedostatek volných lodí vede k reaktivaci Argusu.</small></div>
            <div class="event"><b>16. 11. 2187 — odlet Argusu</b><small>Argus odlétá z K-17 s pouhými 11 členy místo tabulkových 23. Úkolem je JRS-27 Harbor a zmizelý servisní tahač CT-88 Raven.</small></div>
            <div class="event"><b>24.–25. 11. 2187 — kontakt a převzetí NII</b><small>Posádka Argusu v hlavním pásu asteroidů narazí na obrovský těžký křižník NII. Následuje kontakt s Krytonem, převzetí lodi Danielem Havelem a odhalení dalších obyvatel NII.</small></div>
            <div class="event"><b>26. 11. 2187 — pokračování mise</b><small>Po změně hlavního plavidla pokračuje posádka v původní misi směrem k Harboru; Argus zůstává zachován jako provozuschopná součást nového uspořádání.</small></div>
            <div class="event"><b>6.–10. 12. 2187 — přiblížení k Harboru</b><small>Čtyři dny před plánovaným příletem se objevují poškozené menší lodě související s oblastí Harboru. Senzory evidují desítky neidentifikovaných osob a větší pravděpodobnou mateřskou loď dále za cílem.</small></div>
            <div class="event"><b>11. 12. 2187, 19:46 — zničení Panteru E50 B</b><small>Panter E50 B je zničen. Z potvrzeného záznamu vyplývá přežití Veroniky Rieger a její pilotní sestry Viktorie; Julia Rieger je později identifikována na Helioru.</small></div>
            <div class="event"><b>27. 12. 2187, 16:51–17:28 — první kontakt s Heliorem</b><small>NII vystupuje z FTL v systému Helior. Následuje identifikace, navázání komunikace a oficiální přivítání NII planetou Helior.</small></div>
            <div class="event"><b>27. 12. 2187, 19:04 — výsadek na Helioru</b><small>Osmičlenná skupina dorazí na planetu, projde zdravotním prověřením a setká se s Kaelith Reinhard a zástupci Helioru. Julia Rieger je potvrzena jako živá.</small></div>
            <div class="event"><b>27. 12. 2187, 20:21 — sovětský útok</b><small>Do systému přilétá pět lodí sovětských speciálních sil. NII zasahuje do boje; zbraň Omega− zničí dvě útočící lodě. Následuje další sovětský tlak a evakuace.</small></div>
            <div class="event"><b>konec prosince 2187 — zničení Helioru</b><small>Po více než osmdesáti letech války je poslední obydlený svět Helioranů definitivně zničen. Na NII zůstává šest přeživších z Helioru: Veronika, Viktoria a Julia Rieger, Kaelith Reinhard, Guntar Ritter a Volden Ritter.</small></div>
            <div class="event"><b>29. 12. 2187 — po pěti FTL skocích</b><small>NII se po pěti po sobě jdoucích skocích ukrývá v hlubokém vesmíru mimo bezprostřední dosah nepřítele.</small></div>
            <div class="event"><b>5. 1. 2188 — opravy a stabilizace</b><small>Po přibližně týdnu oprav a odpočinku se posádka konsoliduje. Jmenné jádro NII má 22 evidovaných členů/entit včetně Holly a Rimmera.</small></div>
            <div class="event"><b>později — mezirasová obchodní stanice</b><small>NII při hledání inteligentního života přilétá k velké obchodní/pirátské stanici obývané více druhy. Loď získává nové kontakty, technické úpravy a 60 bezejmenných pomocných členů.</small></div>
          </div>
        </article>

        <article class="card half">
          <span class="label gray">předhistorie // lidstvo</span>
          <h3>Sluneční soustava před Argusem</h3>
          <p>Roku 2187 je lidstvo stále především civilizací Sluneční soustavy. Trvalé osídlení mimo ni existuje v Alpha Centauri, ale cesta mezi hvězdami trvá desítky let. Neexistují skokové brány, červí díry ani okamžitá mezihvězdná komunikace.</p>
          <p>Do roku 2187 bylo postaveno devět velkých mezisystémových lodí, šest z nich zůstává aktivních. Automatické sondy prozkoumaly dvanáct blízkých hvězdných systémů včetně Alpha Centauri, Tau Ceti, Sirius, Ross 128 a dalších.</p>
          <div class="warning"><b>Zásadní hranice éry:</b> původní lidská civilizace Argusu FTL neovládala. Pozdější schopnosti NII proto nelze vydávat za běžnou technologii Meziplanetárního společenství.</div>
        </article>

        <article class="card half">
          <span class="label gray">2141 // Meziplanetární společenství</span>
          <h3>Společné kosmické síly</h3>
          <p>Meziplanetární společenství není jednotnou světovou vládou. Státy Země a hlavní kolonie si zachovávají suverenitu; společná organizace řeší především problémy, které překračují národní hranice.</p>
          <p>Společné kosmické síly kombinují úkoly námořnictva, pobřežní stráže, záchranné služby a vojenské policie. Právě pod SKS slouží podplukovník Daniel Havel i KRV-114 Argus.</p>
          <div class="badges"><span class="badge">navigace</span><span class="badge">záchrana</span><span class="badge">eskorta</span><span class="badge">bezpečnost tras</span><span class="badge">vojenské operace</span></div>
        </article>

        <article class="card half">
          <span class="label">2149–2187 // KRV-114</span>
          <h3>Argus: služba, rezerva a návrat</h3>
          <p>KRV-114 Argus byl vyroben roku 2149 jako odolná a relativně levná eskortní korveta. Jeho konstrukce odpovídá praktické vojenské filozofii: úzké chodby, malé kajuty, rozsáhlá strojovna, mechanické zálohy, analogové prvky a opakované modernizace.</p>
          <p>Před událostmi příběhu strávil jedenáct let zakonzervovaný v doku K-17 u Marsu. Při návratu do služby nebyl vrakem, ale nesl desítky závad: nefunkční radarový monitor, omezený sektor hlavní komunikační antény, nepřesné snímače a množství repasovaných komponent.</p>
        </article>

        <article class="card half">
          <span class="label red">23. 10. 2187 // Callisto</span>
          <h3>Katastrofa Cormac / Helix-3</h3>
          <p>Nákladní tahač MTS Cormac při závěrečném brzdění utrpěl současnou závadu navigačních senzorů a automatického řízení. Ruční zásah přišel pozdě a loď narazila do palivového komplexu Helix-3.</p>
          <p>Srážka roztrhala části obou konstrukcí a rozesela trosky po okolních drahách. Některé úlomky zasáhly další obytné a servisní moduly. Zahynulo 286 lidí, stovky dalších byly zraněny a provoz kolem Callista byl zásadně omezen.</p>
          <p>SKS přesunuly do oblasti velkou část dostupných lodí na evakuaci, zásobování, mapování trosek a uzavírání nebezpečných koridorů. Právě tento nedostatek volných plavidel otevřel dveře návratu Argusu.</p>
        </article>

        <article class="card full">
          <span class="label">16. 11. 2187 // K-17 → Jupiter</span>
          <h3>Rezervní posádka vyráží</h3>
          <p>Argus má tabulkově 23člennou posádku, ale kvůli personální nouzi odlétá pouze s jedenácti členy: sedmi lidmi a čtyřmi androidy lidského vzhledu. Posádka byla sestavena z různých pracovišť, aktivní služby, rezerv a odborných pozic; většina spolu předtím nesloužila.</p>
          <p>Cílem je vojenská reléová stanice <b>JRS-27 Harbor</b>, která přestala komunikovat. Na stanici bylo 12 lidí — devět vojenských členů a tři civilní technici. Situaci zhoršilo zmizení servisního tahače <b>CT-88 Raven</b> se čtyřčlennou posádkou, vyslaného k Harboru.</p>
          <div class="metric-row"><div class="metric"><strong>23</strong><span>tabulková posádka</span></div><div class="metric"><strong>11</strong><span>skutečný odlet</span></div><div class="metric"><strong>12</strong><span>Harbor personál</span></div><div class="metric"><strong>4</strong><span>Raven posádka</span></div></div>
        </article>

        <article class="card half">
          <span class="label red">přiblížení k Harboru</span>
          <h3>Varovné kontakty před cílem</h3>
          <p>Čtyři dny před plánovaným dosažením Harboru se situace komplikuje. Šest neidentifikovaných menších lodí nese zřetelné bojové poškození související s oblastí stanice.</p>
          <p>Senzory zároveň u Harboru registrují přibližně 48 neznámých osob. Další větší objekt, pravděpodobná mateřská loď, se nachází zhruba sedm dní cesty za Harborem. Původně technická záchranná mise tak přestává vypadat jako běžná porucha.</p>
        </article>

        <article class="card half">
          <span class="label red">24. 11. 2187 // pás asteroidů</span>
          <h3>Objevení NII</h3>
          <p>Argus zachytí plavidlo nesrovnatelné s běžnými loděmi Meziplanetárního společenství: přibližně 420 metrů dlouhý těžký křižník NII o provozní hmotnosti kolem 220 000 tun. NII zůstává zpočátku tiché, ale aktivně koriguje kurz.</p>
          <p>Na přídi je viditelná těžká věž Tiger II 12,8 cm, sekundární věže a systémy bodové obrany. Pro malý Argus by přímá konfrontace představovala zásadní riziko.</p>
          <div class="specs"><div class="spec hot"><b>≈420 m</b><span>délka NII</span></div><div class="spec"><b>≈220 000 t</b><span>provozní hmotnost</span></div><div class="spec"><b>420</b><span>max. posádka</span></div></div>
        </article>

        <article class="card full">
          <span class="label green">25. 11. 2187 // změna hlavního plavidla</span>
          <h3>Kryton, prázdná NII a nové velení</h3>
          <p>Na NII je nalezen android <b>Kryton, Divadroid 2X4B-523P</b>. Vysvětluje, že předchozí lidská posádka lodi zahynula na planetě po vypuknutí choroby označované jako černý mor; nikdo nakažený se na NII nevrátil. Kryton měl po 72 hodinách bez kontaktu loď zabezpečit a vrátit se.</p>
          <p>Kryton nabídne Danielu Havelovi velení plavidla. Havel 25. listopadu formálně přijímá velení NII. Původní Argus není odhozen ani zničen — zůstává zachován a napojen jako provozuschopná součást nového uspořádání.</p>
          <p>Na hlavním můstku se posádka seznamuje s <b>Holly</b>, centrálním počítačem NII, a s hologramem <b>Arnolda Rimmera</b>. Holly dokáže řídit téměř veškerý běžný provoz a minimální obsluha NII může být extrémně malá, ale plná tabulková kapacita lodi je 420 osob.</p>
        </article>

        <article class="card half">
          <span class="label green">25. 11. 2187 // stáze</span>
          <h3>Lister a Proužek</h3>
          <p>Kryton následně přizná, že na lodi zůstávají dva další obyvatelé ve stázi. Po přibližně devadesáti letech jsou probuzeni <b>Dave Lister</b> a <b>Proužek</b>.</p>
          <p>Lister je člověk a nízko postavený technik; Proužek je kočičí člověk neznámého původu. Proužkův druh není totožný s kočko-lidmi, které NII potká mnohem později na mezirasové stanici.</p>
        </article>

        <article class="card half">
          <span class="label green">NII // provozní kapacita</span>
          <h3>Autonomie těžkého křižníku</h3>
          <p>NII byla navržena pro plnou posádku až <b>420 osob</b>. Její deklarovaná autonomie čtyř let znamená schopnost fungovat čtyři roky bez zastavení v přístavu a bez přístavního zásobování právě při tomto plném personálním stavu.</p>
          <p>Nižší počet lidí snižuje část spotřeby, ale čtyřletá autonomie se v databázi nepřepočítává lineárně. Limity vytváří také opotřebení zařízení, náhradní díly, provozní materiál, údržba energetiky a dalších systémů.</p>
          <div class="metric-row"><div class="metric"><strong>420</strong><span>plný stav</span></div><div class="metric"><strong>4 roky</strong><span>autonomie při 420</span></div><div class="metric"><strong>1+</strong><span>minimální obsluha díky Holly</span></div><div class="metric"><strong>NII</strong><span>nová hlavní loď</span></div></div>
        </article>

        <article class="card full">
          <span class="label red">11. 12. 2187 // 19:46</span>
          <h3>Panter E50 B</h3>
          <p>V potvrzeném chronologickém záznamu je Panter E50 B zničen 11. prosince 2187 v 19:46. Veronika Rieger a její pilotní sestra Viktoria přežijí; Julia Rieger je později znovu nalezena a potvrzena jako živá na Helioru.</p>
          <div class="warning"><b>Archivní omezení:</b> okolnosti Panteru se ve starších verzích vyprávění rozcházejí. Databáze proto v této části uvádí pouze potvrzené datum, zničení plavidla a potvrzené přeživší, nikoli sporné detaily.</div>
        </article>

        <article class="card half">
          <span class="label green">27. 12. 2187 // 16:51–19:04</span>
          <h3>První kontakt s Heliorem</h3>
          <p>V 16:51 NII vystupuje z FTL v systému Helior. V 17:28 je navázán potvrzený kontakt, planeta je identifikována jako Helior a NII dostává pozvání k návštěvě.</p>
          <p>V 19:04 dorazí osmičlenná skupina na planetu, projde zdravotním screeningem a setkává se s Kaelith Reinhard a zástupci Helioru. Julia Rieger je potvrzena jako živá.</p>
        </article>

        <article class="card half">
          <span class="label red">Helior // více než 80 let války</span>
          <h3>Poslední svět pod tlakem</h3>
          <p>Heliorané vedli se Sověty válku přes osmdesát let. V posledních přibližně deseti letech konfliktu byly jejich zbývající síly systematicky ničeny a Helior se stal posledním obydleným světem jejich civilizace.</p>
          <p>Funkce na Helioru byly výrazně rozlišovány barvou uniforem: bílá zdravotnictví, zelená komunikace, oranžová piloti, modrá velení lodí, černá zbraňoví operátoři a červená technické profese.</p>
        </article>

        <article class="card full">
          <span class="label red">27. 12. 2187 // 20:21</span>
          <h3>Pět sovětských lodí a bitva o Helior</h3>
          <p>V 20:21 přilétá do systému pět lodí sovětských speciálních sil. Útok přichází ve chvíli, kdy je Helior vojensky vyčerpaný po desetiletích konfliktu. Jedna z posledních heliorských lodí je v průběhu útoku zničena.</p>
          <p>NII se zapojuje do boje. Při protiútoku použije střelu <b>Omega−</b>, singularitní zbraň hodnocenou v databázi silou 96/100, a zničí dvě sovětská plavidla. Tím ale útok nekončí — do oblasti následně přicházejí další sovětské síly.</p>
          <div class="metric-row"><div class="metric"><strong>5</strong><span>první útočná skupina</span></div><div class="metric"><strong>2</strong><span>zničeno Omega−</span></div><div class="metric"><strong>96/100</strong><span>Omega−</span></div><div class="metric"><strong>&gt;80 let</strong><span>válka</span></div></div>
        </article>

        <article class="card half">
          <span class="label red">konec Helioru</span>
          <h3>Evakuace šesti přeživších</h3>
          <p>Další sovětský tlak vede k definitivnímu zničení Helioru. NII odváží šest lidí, kteří se následně stávají součástí posádky: <b>Veroniku, Viktoriu a Julii Rieger, Kaelith Reinhard, Guntara Rittera a Volden Ritter</b>.</p>
          <p>Kaelith po pádu své civilizace na NII nepoužívá panovnický titul. Guntar a Volden pocházejí z císařské letecké gardy; Volden je starší sestra Guntara.</p>
        </article>

        <article class="card half">
          <span class="label green">29. 12. 2187 → 5. 1. 2188</span>
          <h3>Pět skoků a týden oprav</h3>
          <p>NII uniká ze zničeného systému nouzovým FTL. Po pěti po sobě jdoucích skocích se 29. prosince nachází v hlubokém prostoru, kde je bezprostřední pronásledování přerušeno.</p>
          <p>Následuje přibližně týden oprav, odpočinku a stabilizace. K 5. lednu tvoří jmenné jádro NII 22 členů/entit: 20 fyzických osob či androidů, hologram Arnold Rimmer a centrální AI Holly.</p>
        </article>

        <article class="card full">
          <span class="label green">po Helioru // neznámý prostor</span>
          <h3>Hledání inteligentního života a mezirasová stanice</h3>
          <p>Po opravách se Daniel Havel a Kaelith Reinhard zabývají volbou dalšího FTL cíle. NII se nachází mimo známé oblasti a hledá soustavu s inteligentním životem. Volba nakonec přivádí loď k rozsáhlé obchodní/pirátské stanici, na níž se setkává s kočko-lidmi, pso-lidmi, trpaslíky a ještěřany.</p>
          <p>Stanice se stává prvním velkým multirasovým uzlem, se kterým NII naváže praktický kontakt. Dochází zde k obchodu, opravám a modernizaci části výzbroje. Akumulátor příďové věže Tiger II je rozšířen na 20 nábojů; současně se ukazuje, že Proužkův druh není totožný s místními kočko-lidmi.</p>
          <p>K NII se připojuje <b>60 bezejmenných pomocných členů</b>: 20 kočko-lidí, 10 pso-lidí, 10 trpaslíků a 20 ještěřanů. Databáze jim nevymýšlí individuální jména ani osobnosti, dokud je příběh neurčí.</p>
          <div class="metric-row"><div class="metric"><strong>20</strong><span>kočko-lidé</span></div><div class="metric"><strong>10</strong><span>pso-lidé</span></div><div class="metric"><strong>10</strong><span>trpaslíci</span></div><div class="metric"><strong>20</strong><span>ještěřané</span></div></div>
        </article>

        <article class="card full">
          <span class="label green">současný archivní stav</span>
          <h3>Z rezervní posádky se stala mnohodruhová posádka NII</h3>
          <p>Příběh začal jedenáctičlennou nouzově sestavenou posádkou staré korvety Argus. Převzetím NII, probuzením jejích obyvatel, přijetím přeživších z Helioru a pozdějším náborem na mezirasové stanici se z ní stala skupina, která už není svázána jedinou lodí, civilizací ani biologickým druhem.</p>
          <p>Aktuální databáze eviduje <b>82 členů/entit</b>: původní jmenné jádro 22 záznamů a 60 nových bezejmenných pomocných členů. NII má přitom konstrukční kapacitu až 420 členů a čtyřletou autonomii při tomto plném stavu.</p>
          <div class="warning"><b>Kánonové pravidlo:</b> přesná jména, data, počty a technické hodnoty se v tomto archivu doplňují pouze tehdy, když byly potvrzeny příběhem. Nejasná místa zůstávají označena jako neúplná místo doplnění odhadem.</div>
        </article>

      </div>
    </section>

    `;

html = html.slice(0, start) + history + html.slice(end);

const required = [
  '2126', '2141', '2149', '23. 10. 2187', '16. 11. 2187', '24. 11. 2187', '25. 11. 2187',
  'JRS-27 Harbor', 'CT-88 Raven', 'Kryton', 'Holly', 'Arnolda Rimmera', 'Dave Lister', 'Proužek',
  '11. 12. 2187', '27. 12. 2187', '20:21', 'Omega−', '29. 12. 2187', '5. 1. 2188',
  '60 bezejmenných pomocných členů', '82 členů/entit', '420 osob', '4 roky',
  'kvk-rychla-korveta.jpg', 'kvk-titan.jpg', 'kvk-juggernaut.jpg', 'kvk-tezka-bitevni-lod.jpg',
  'mezirasova-stanice-bezpecnost.jpg', 'id="soviets"', 'id="crew"', 'id="ships"', 'id="factions"'
];
for (const r of required) if (!html.includes(r)) throw new Error(`Missing required content after history patch: ${r}`);

fs.writeFileSync(path, html);
console.log(`expanded history in ${path}: ${Buffer.byteLength(html)} bytes`);
