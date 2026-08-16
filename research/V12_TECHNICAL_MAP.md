# Doktor Fortress AI V12 — technická mapa

## Rozsah analýzy

Automatický scan porovnal čtyři skripty v repozitáři: V11 FIX09, Official HD AI, ResonanceBot 5-1c a Rehoboam 1.80i. Celkem jde o přibližně 196 509 řádků a 15 992 pravidel. Rehoboam byl kvůli velikosti analyzován lokálně v GitHub Actions, nikoli jen přes webový náhled.

| Zdroj | Řádků | defrule |
|---|---:|---:|
| FIX09 | 29 553 | 2 508 |
| Official HD | 28 508 | 1 874 |
| ResonanceBot 5-1c | 27 974 | 2 010 |
| Rehoboam 1.80i | 110 474 | 9 600 |

## 1. Opening

**FIX09:** dobrý fortress opening, ale vznikal postupným vrstvením FIX7–FIX9. Několik ekonomických pravidel může v jednom průchodu přepisovat stejná SN.

**Official HD:** silný stavový opening, bezpečné house/villager zacházení, oddělené hunting/scouting stavy.

**Resonance:** dobré tempo Dark→Feudal→Castle a praktická kontrola house/builders.

**Rehoboam:** velmi detailní vlastní build-order systém, explicitní první house buildery a stav postupu věky.

**V12:** ponechat Fortress cíle, ale zavést jeden poslední autoritativní ekonomický arbitrážní blok. Na Hardest 0–7 civilů food-heavy, 8–15 stabilizace, od 16 civilů skutečný stone commitment.

## 2. Sheep / livestock

**FIX09:** používá `sn-livestock-to-town-center 1`, ale livestock logika není vlastní samostatný stav.

**Official HD:** livestock směruje k TC a v opening fázi kombinuje domácí průzkum s hledáním potravy.

**Resonance:** méně explicitní sheep logiky.

**Rehoboam:** má samostatný sheep-control subsystém a vlastní souřadnice/stavy pro sheep scouting.

**V12:** livestock je první fáze food-state. Scout nejprve prohledá domácí prstenec a nalezená zvířata posílá k TC. Civilní průzkumníci zůstávají vypnutí.

## 3. Boar

**FIX09:** již používá zjednodušený Official-HD staged hunt.

**Official HD:** nejspolehlivější vzor. Nejprve 1 lure hunter, při přiblížení 2, u TC plná skupina 7, poté minima znovu klesnou.

**Resonance:** potvrzuje nutnost opatrnosti s `sn-minimum-number-hunters`, protože HD může stahovat pracovníky i z jiných zdrojů.

**Rehoboam:** velmi rozsáhlý hunting/boar subsystém potvrzuje, že lov má být samostatný stav, ne trvale vysoké minimum lovců.

**V12:** explicitní food phase 0 sheep, 1 lure, 2 support, 3 kill, 4 general hunt. Tím se zabrání permanentnímu přetahování dřevorubců a horníků na lov.

## 4. Scouting

**FIX09:** dedicated scout, livestock routing, pozdější military recon.

**Official HD:** home exploration, tc-dodging a vlastní scouting timer/stavy.

**Resonance:** potvrzuje malé průzkumné skupiny a důležitost group-leader distances.

**Rehoboam:** velmi hluboký spiral/coordinate scouting.

**V12:** tři role: home/livestock → local ring → enemy recon. Scout není obranná jednotka. Při útoku na město se průzkum omezí.

## 5. Defense

**FIX09:** threat memory, emergency state a counter balíčky už existují.

**Official HD:** silný `under-attack`, threat-time/source/target a delayed release.

**Resonance:** reset retreat/attack a rychlé counter přepnutí.

**Rehoboam:** rozsáhlé skupinové a DUC systémy.

**V12:** defense latch je autoritativní nad průzkumem a běžným útokem. Counter jednotky se mají shromažďovat, ne přitékat jednotlivě.

## 6. Walling

**FIX09:** nejsilnější část Fortress identity, ale walling se postupně opravoval mnoha overlayi.

**Official HD:** konzervativnější, technicky ověřené placement mechanismy.

**Resonance:** explicitní `pallisadewallstart`, `stonewallstart`, `buildwalls`.

**Rehoboam:** vlastní wall/build systém.

**V12:** Feudal palisade shell → Castle stone conversion → gates/chokes → depth 2/3. Emergency repair nesmí být zablokován first-castle rezervou.

## 7. Economy

**FIX09:** velmi rozsáhlá, ale stejné gatherer percentages jsou nastavovány více vrstvami.

**Official HD:** robustní resource-control a dropsite logika.

**Resonance:** silný fast-castle escrow a ekonomické tempo.

**Rehoboam:** samostatné savings stavy pro věky a technologie.

**V12:** jeden final arbiter stanoví ekonomiku podle věku, difficulty, protected age bank a emergency stavu. Starší overlaye mohou radit, ale V12 má poslední slovo.

## 8. Drop-sites

**FIX09:** FIX9 zlepšil lumber camps a krátké vzdálenosti.

**Official HD:** velmi vysoká hustota dropsite logiky a ověřené distance facts.

**Resonance:** aktivně reaguje na špatné wood/gold mapy.

**Rehoboam:** nejrozsáhlejší vlastní building/dropsite systém ze všech čtyř zdrojů.

**V12:** dropsites jsou obnovitelná infrastruktura. Hardest: minimálně 2 lumber camps ve Feudalu, 4 v Castle, 5 v Imperialu pokud ekonomika roste. Mining camps obdobně podle potřeby.

## 9. Age-up

**FIX09:** chráněný Castle bank funguje, ale několik pozdějších obranných pravidel může zdroje opět spotřebovat.

**Official HD:** explicitní transit states mezi věky.

**Resonance:** velmi silný fastcastle/escrow model.

**Rehoboam:** vlastní `advancing-to-*` a `saving-for-*` stavy.

**V12:** `g-v12-age-bank` je jediný nadřazený příznak. V chráněném banku se ekonomické priority přepnou na food/gold a běžné luxusní výdaje se nesmí stát prioritou. Emergency defense zůstává výjimka.

## 10. Grouping

**FIX09:** grouped responses už existují, ale některé produkční overlaye stále mohou vyrábět jednotlivé countery bez dostatečné rally masy.

**Official HD:** attack/defend groups a rally/retreat stav.

**Resonance:** výrazně používá skupinové útoky a retreat distance.

**Rehoboam:** zdaleka největší množství group logiky v porovnání.

**V12:** běžná obrana i útok jsou skupinové. Produkce pouze doplňuje požadovanou masu, útok se nespouští po jedné nové jednotce.

## 11. Retreat

**FIX09:** attrition abort a recovery existují.

**Official HD:** explicitní retreat goal + timer proti loopingu.

**Resonance:** `resetretreat` a `resetattack` přímo kvůli opakovaným příkazům.

**Rehoboam:** vlastní micro/retreat vrstva.

**V12:** retreat je stav, ne jednorázový příkaz. Po abortu následuje reform/recovery okno před dalším assaultem.

## 12. Production

**FIX09:** velmi hluboké doctrine a civ-specific vrstvy, optimalizace 125/150/200 už existuje.

**Official HD:** konzervativnější produkční baseline.

**Resonance:** dobré tempo a counter produkce.

**Rehoboam:** méně relevantní jako přímý vzor pro Fortress composition, ale silný jako nezávislá kontrola queue/group logiky.

**V12:** zachovat doctrine systém, ale výrobní infrastrukturu odvozovat od skutečného max-pop profilu, stability ekonomiky a sustained queue demand. Primární profily zůstávají 125/150/200.

## FIX01 implementační priorita

1. V12 core goals a jednotný food/age/defense arbiter.
2. Staged boar state jako explicitní V12 food phase.
3. Hardest Dark Age stone commitment bez rozbití prvních minut.
4. Observation network: alespoň 4 outposty ve Feudalu, 8 v Castle, až 15 v Imperialu na Hardest.
5. Renewable lumber/mining dropsites.
6. Defense latch a skupinová reakce.
7. Zachovat existující Fortress doctrine, walls, civ matrices a 125/150/200 produkci, dokud replaye nepotvrdí bezpečné odstranění starých overlayů.

FIX01 je tedy první generační krok V12, ne kosmetické přejmenování FIX09. Staré chování se odstraňuje postupně až po nahrazení a replay regresi.
