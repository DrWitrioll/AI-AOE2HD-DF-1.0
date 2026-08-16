# Doktor Fortress AI V12 - reference scan

Generated automatically from the four source scripts in this repository. The report is evidence collection, not a blind copy plan. V12 keeps Fortress doctrine and uses the other AIs to identify HD-proven implementation patterns.

## Source inventory

| Source | Bytes | Lines | defrule count |
|---|---:|---:|---:|
| FIX09 | 767,708 | 29,553 | 2,508 |
| Official HD | 789,956 | 28,508 | 1,874 |
| ResonanceBot 5-1c | 688,184 | 27,974 | 2,010 |
| Rehoboam 1.80i | 5,347,451 | 110,474 | 9,600 |

## Keyword density by subsystem

Counts are only a navigation aid. They show where a source has substantial code touching a subsystem.

| Subsystem | FIX09 | Official HD | Resonance | Rehoboam |
|---|---:|---:|---:|---:|
| opening | 89 | 147 | 320 | 580 |
| sheep | 5 | 12 | 1 | 622 |
| boar | 112 | 174 | 84 | 1346 |
| scouting | 324 | 293 | 184 | 999 |
| defense | 531 | 412 | 219 | 268 |
| walling | 2347 | 774 | 1057 | 1292 |
| economy | 3962 | 4604 | 3729 | 8498 |
| drop-sites | 154 | 608 | 363 | 2933 |
| age-up | 578 | 432 | 1009 | 678 |
| grouping | 254 | 179 | 419 | 4878 |
| retreat | 43 | 67 | 53 | 257 |
| production | 3634 | 1063 | 1040 | 1009 |

## opening

### FIX09
Line ~175
```lisp
; scenario maximum. The official HD AI exposes the real scenario maximum through
; POPULATION-CAP-* preprocessor symbols. These threshold goals prevent the AI
; from changing its 125/150/200 strategy merely because another house completed.
(defconst g-maxpop-le50 92)
(defconst g-maxpop-le75 93)
```
Line ~1378
```lisp
; FIXED7 difficulty-specific Dark Age economy. Fortress Age wants a real early stone
; commitment, but Hardest also needs enough food/wood to reach Feudal on time.
(defrule
```
Line ~1443
```lisp
; FIXED7 Hardest land fast-Castle resource posture. Early stone has already been
; banked in Dark Age; Feudal now prioritizes the food/gold needed to reach Castle on time.
(defrule
    (difficulty == hardest)
```
Line ~1856
```lisp
; -----------------------------
; Housing
; IMPORTANT: housing-headroom = free slots in currently built housing.
; population-headroom = remaining room before the game's population limit.
; -----------------------------
```
Line ~1861
```lisp
(defrule
    (population <= 70)
    (housing-headroom < 5)
    (population-headroom > 0)
    (up-pending-objects c: house < 1)
```
Line ~1863
```lisp
(housing-headroom < 5)
    (population-headroom > 0)
    (up-pending-objects c: house < 1)
    (can-build house)
=>
```
Line ~1864
```lisp
(population-headroom > 0)
    (up-pending-objects c: house < 1)
    (can-build house)
=>
    (build house)
```
Line ~1866
```lisp
(can-build house)
=>
    (build house)
)
```
Line ~1869
```lisp
)

; At higher population, start houses earlier so military production does not stall.
(defrule
    (population > 70)
```
Line ~1872
```lisp
(defrule
    (population > 70)
    (housing-headroom < 10)
    (population-headroom > 0)
    (up-pending-objects c: house < 2)
```

### Official HD
Line ~32
```lisp
(defconst strategy-goal 3)
(defconst unit-goal 4)
(defconst train-civ-goal 5);1=train villagers, !=1 no villagers
(defconst control-goal 6); 6 = allow to be shot, 7 = shot, also controls if stone for a castle is needed.
(defconst anti-cavalry-threat-goal 7)
```
Line ~48
```lisp
(defconst ranged-unit-type-goal 19);shows the ranged unit we use
(defconst retreat-now-goal 20); use to retreat with UP, condition: 1=always, 2=when attacking, 3=attack conditions false
(defconst housing-goal 21); used to build multiple houses with UP
(defconst anti-monk-threat-goal 22)
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
```
Line ~141
```lisp
(defconst navy-attack-timer 12); don't spam attack or we can't retreat boats from fortifications
(defconst help-ally-timer 13); indicated when we sent help to ally
(defconst FDrop 14); timer for forcedrop to continuously train villager
(defconst retreat-timer 15); timer to avoid looping retreat unit commands
(defconst hunting-timer 16)
```
Line ~211
```lisp
(defconst population-cap 1)
(defconst population-headroom 2)
(defconst housing-headroom 3)
(defconst idle-farm-count 4)
(defconst food-amount 5)
```
Line ~1825
```lisp
#end-if
#load-if-defined POST-IMPERIAL-AGE-START
(defconst pop-house 20)
#else
(defconst pop-house 50)
```
Line ~1827
```lisp
(defconst pop-house 20)
#else
(defconst pop-house 50)
#end-if
#load-if-defined DEATH-MATCH
```
Line ~1830
```lisp
#end-if
#load-if-defined DEATH-MATCH
(defconst housing-headroom1 40)
(defconst housing-headroom2 40)
(defconst camp-distance 45)
```
Line ~1831
```lisp
#load-if-defined DEATH-MATCH
(defconst housing-headroom1 40)
(defconst housing-headroom2 40)
(defconst camp-distance 45)
(defconst food-distance 0)
```
Line ~1848
```lisp
(defconst special-attack-type2 town-center)
#else
(defconst housing-headroom1 3)
(defconst housing-headroom2 25)
(defconst camp-distance 15)
```
Line ~1849
```lisp
#else
(defconst housing-headroom1 3)
(defconst housing-headroom2 25)
(defconst camp-distance 15)
(defconst food-distance 25)
```

### ResonanceBot 5-1c
Line ~4
```lisp
;-------------------http://www.youtube.com/Resonance22Channel---------------------------
;-------------------This AI plays only Random Map and requires 150 or more Pop---------
;-------------------Also requires Dark Age start and Standard/Low Resources!------------
;-------------------It is also capable of playing Regicide well-------------------------
```
Line ~224
```lisp
(defconst toggleoptions3 103) ;for options menu that is toggled with 42
(defconst toggleoptions4 104) ;for options menu that is toggled with 42
(defconst begintoggleoptions 105) ;for not opening the options twice
(defconst begintogglestrategies 106) ;for not opening the strategies menu twice
(defconst togglefastcastle 107) ;for toggling strategies with options menu
```
Line ~225
```lisp
(defconst toggleoptions4 104) ;for options menu that is toggled with 42
(defconst begintoggleoptions 105) ;for not opening the options twice
(defconst begintogglestrategies 106) ;for not opening the strategies menu twice
(defconst togglefastcastle 107) ;for toggling strategies with options menu
(defconst toggleboom 108) ;for toggling strategies with options menu
```
Line ~488
```lisp
(game-time < 30) ;new v2.2b v2.2c
=>
	(up-assign-builders c: house c: 2)
	(disable-self)
)
```
Line ~495
```lisp
(game-time > 30) ;new v2.2b v2.2c
=>
	(up-assign-builders c: house c: 1)
	(disable-self)
)
```
Line ~676
```lisp
(defrule
 	(housing-headroom <= 5)
	(or(building-type-count-total town-center >= 1)
	(game-time > 30))
```
Line ~680
```lisp
(game-time > 30))
	(population-headroom > 0)
 	(can-build house)
 =>
	(set-goal pausetsa 1)
```
Line ~683
```lisp
=>
	(set-goal pausetsa 1)
	(build house)
)
```
Line ~691
```lisp
(game-time > 30))
	(population-headroom > 0)
 	(can-build-with-escrow house)
 =>
	(set-goal pausetsa 1)
```
Line ~702
```lisp
(game-time > 900)
	(population-headroom > 0)
	(building-type-count house <= 15)
	(can-build house)
=>
```

### Rehoboam 1.80i
Line ~10
```lisp
;
; Game versions: DE (For UP use 1.80c which only plays on 70-90% of the DE strength on UP)
; Settings: 200 pop, ressources low, dark age start, prefers 2,0 speed or lower (speedhack will severly weaken micro)
; Map: Arabia (should do fine on similar land maps with normal ressource spawns)
; Civilisations: 1v1/2v2/pocket in 3v3/4v4 - Franks/Persians
```
Line ~26
```lisp
(defconst population-cap 1)
        (defconst population-headroom 2)
        (defconst housing-headroom 3)
        (defconst idle-farm-count 4)
        (defconst food-amount 5)
```
Line ~367
```lisp
; Unused ResourceAmount Constants
        ;--------------------------------------
        ;(defconst amount-houses 51)
        ;(defconst amount-hit-points-killed 68)
        ;(defconst amount-hit-points-razings 135)
```
Line ~875
```lisp
; 3 Advancing
        ; 4 Villager ID's
        ; 5 Houses
        ; 6 Villager creation
        ; 7 Sheep control
```
Line ~1484
```lisp
(defconst gl-build-blacksmith 410)
            (defconst gl-wood-saved 411)
            (defconst gl-build-house 412)
            (defconst gl-cross-testing-counter 413)
            (defconst gl-build-market 414)
```
Line ~1492
```lisp
(defconst gl-need-mill 418) ; new building system
            (defconst gl-need-mining-camp 419)
            (defconst gl-need-house 420)
            (defconst gl-need-stable 421)
            (defconst gl-need-blacksmith 422)
```
Line ~1519
```lisp
(defconst gl-first-sheep-y 451)
            (defconst gl-first-scouting-spiral-radius 452)
            (defconst gl-first-house-builder 453) ;first 2 houses
            (defconst gl-second-house-builder 454)
            (defconst gl-third-house-builder 455)
```
Line ~1520
```lisp
(defconst gl-first-scouting-spiral-radius 452)
            (defconst gl-first-house-builder 453) ;first 2 houses
            (defconst gl-second-house-builder 454)
            (defconst gl-third-house-builder 455)
            (defconst gl-first-house-x 456)
```
Line ~1521
```lisp
(defconst gl-first-house-builder 453) ;first 2 houses
            (defconst gl-second-house-builder 454)
            (defconst gl-third-house-builder 455)
            (defconst gl-first-house-x 456)
            (defconst gl-first-house-y 457)
```
Line ~1522
```lisp
(defconst gl-second-house-builder 454)
            (defconst gl-third-house-builder 455)
            (defconst gl-first-house-x 456)
            (defconst gl-first-house-y 457)
            (defconst gl-second-house-x 458)
```


## sheep

### FIX09
Line ~489
```lisp
(set-strategic-number sn-initial-attack-delay-type 0)
    (set-strategic-number sn-number-civilian-militia 0)
    (set-strategic-number sn-livestock-to-town-center 1)
    (disable-self)
)
```
Line ~563
```lisp
=>
    (set-strategic-number sn-relic-defend-priority 1)
    (set-strategic-number sn-livestock-defend-priority 2)
    (set-strategic-number sn-attack-winning-player 0)
    (set-strategic-number sn-attack-winning-player-factor 30)
```
Line ~3707
```lisp
; Inner palisade ring first. FIXED7 deliberately leaves a Dark-Age access gap:
; gates do not exist yet, so sealing the ring before Feudal traps workers/livestock.
; Requiring the three basic dropsites makes the wider wall planner enclose berries,
; wood and the early stone economy instead of drawing a tiny ring around the TC.
```
Line ~29136
```lisp
; The dedicated scout owns early exploration.  Home exploration time remains 360s,
; so it searches the base ring first and only then pushes farther out.  Livestock
; found by the explorer is routed toward the Town Center by the native HD SN.
(defrule
```

### Official HD
Line ~166
```lisp
(defconst male-forager 120)
(defconst female-forager 354)
(defconst male-shepherd 592)
(defconst female-shepherd 590)
(defconst female-gold-miner 579)
```
Line ~167
```lisp
(defconst female-forager 354)
(defconst male-shepherd 592)
(defconst female-shepherd 590)
(defconst female-gold-miner 579)
(defconst male-gold-miner 581)
```
Line ~198
```lisp
(defconst shore-fish 933)
(defconst sea-fish 905)
(defconst sheep 958)
(defconst relic 285)
(defconst revealer 112)
```
Line ~321
```lisp
(defconst forage-food 16)
(defconst sheep-food 958)
(defconst boar-food 910)
```
Line ~2564
```lisp
=>
	(set-strategic-number sn-maximum-town-size 8)
	(set-strategic-number sn-total-number-explorers 13);start with all civilians as explorer and turn them off when sheep or berries are found
	(set-strategic-number sn-percent-civilian-explorers 100)
	(set-strategic-number sn-minimum-civilian-explorers 12)
```
Line ~2661
```lisp
(set-strategic-number sn-gold-defend-priority 1)
	(set-strategic-number sn-stone-defend-priority 1)
	(set-strategic-number sn-livestock-defend-priority 1)
	(set-goal reset 0)
	(set-goal control-goal 0); secondary unit
```
Line ~2705
```lisp
(set-goal nomad no)
	(set-goal landnomad no)
	(set-strategic-number sn-livestock-to-town-center 1)
	(disable-self)
)
```
Line ~4671
```lisp
(building-type-count-total mill == 0)
	(unit-type-count villager < 11)
	(sheep-and-forage-too-far)
	(strategic-number sn-current-age == dark)
	(building-type-count town-center > 0)
```
Line ~9551
```lisp
;(or
; j	(unit-type-count villager >= 9)
;	(unit-type-count 958 <= 0)); living domestic animals ; not working?
;(or	(unit-type-count villager >= 14)
;(or	(food-amount >= 50)
```
Line ~14210
```lisp
(unit-type-count male-forager > 0))
	(building-type-count mill == 1)
	(sheep-and-forage-too-far); save for 2nd mill on maps with more berries, eg. yucatan
	(wood-amount < 100)
=>
```

### ResonanceBot 5-1c
Line ~8853
```lisp
(current-age == feudal-age)
	(resource-found food)
	(sheep-and-forage-too-far)
	(building-type-count-total mill < 2)
	(building-type-count-total market >= 1)
```

### Rehoboam 1.80i
Line ~91
```lisp
(defconst gate-class 939)
        (defconst king-class 959)
        (defconst livestock-class 958)
        (defconst infantry-class 906)
        (defconst archery-class 900)
```
Line ~258
```lisp
(defconst amount-raider-ability 95)
        (defconst amount-berserker-heal-timer 96)
        (defconst amount-dominant-sheep-control 97)
        (defconst amount-object-cost-summation 98)
        (defconst amount-research-cost-summation 99)
```
Line ~512
```lisp
;--------------------------------------
        (defconst cmdid-flag 0)
        (defconst cmdid-livestock-gaia 1)
        (defconst cmdid-civilian-building 2)
        (defconst cmdid-villager 3)
```
Line ~675
```lisp
;--------------------------------------
        (defconst lid-villager-idle 5121)
        (defconst lid-villager-shepherd 5496)
        (defconst lid-villager-farmer 5123)
        (defconst lid-villager-forager 5402)
```
Line ~793
```lisp
;(defconst trebuchet-set 971)
        ;(defconst huskarl-set 972)
        ;(defconst villager-shepherd 973)
        ;(defconst villager-forager 974)
        ;(defconst villager-farmer 975)
```
Line ~830
```lisp
;(defconst sn-mining-camp-max-distance 261)
        ;(defconst sn-wall-targeting-mode 262)
        ;(defconst sn-livestock-to-town-center 263)
        ;(defconst sn-enable-training-queue 264)
        ;(defconst sn-ignore-tower-elevation 265)
```
Line ~854
```lisp
;(defconst sn-disable-builder-assistance 285)
        ;(defconst sn-local-targeting-mode 286)
        ;(defconst sn-livestock-defend-priority 287)
        ;(defconst sn-number-tasked-units 288)
        ;(defconst sn-minimum-tasked-units 289)
```
Line ~877
```lisp
; 5 Houses
        ; 6 Villager creation
        ; 7 Sheep control
        ; 8 Woodcutters and Lumber-camps
        ; 9 Berry gatherers and first mill
```
Line ~1342
```lisp
(defconst gl-forbidden-point-x 497)
            (defconst gl-forbidden-point-y 498)
            (defconst gl-next-sheep1-point-x 499)
            (defconst gl-next-sheep1-point-y 500)
            (defconst gl-forbidden-sheep1-point-x 501)
```
Line ~1343
```lisp
(defconst gl-forbidden-point-y 498)
            (defconst gl-next-sheep1-point-x 499)
            (defconst gl-next-sheep1-point-y 500)
            (defconst gl-forbidden-sheep1-point-x 501)
            (defconst gl-forbidden-sheep1-point-y 502)
```


## boar

### FIX09
Line ~51
```lisp
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
```
Line ~55
```lisp
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
```
Line ~68
```lisp
(defconst sn-special-attack-influence2 110)
(defconst fortress-outpost 598) ; HD Outpost, used as a long-range vision post in Fortress Age.
(defconst male-hunter 122)        ; HD hunter task-class id used by the official AI.
(defconst female-hunter 216)      ; HD hunter task-class id used by the official AI.
```
Line ~69
```lisp
(defconst fortress-outpost 598) ; HD Outpost, used as a long-range vision post in Fortress Age.
(defconst male-hunter 122)        ; HD hunter task-class id used by the official AI.
(defconst female-hunter 216)      ; HD hunter task-class id used by the official AI.

; -----------------------------
```
Line ~495
```lisp
(true)
=>
    (set-strategic-number sn-enable-boar-hunting 0)
    (set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
```
Line ~496
```lisp
=>
    (set-strategic-number sn-enable-boar-hunting 0)
    (set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
    (set-strategic-number sn-maximum-hunt-drop-distance 32)
```
Line ~497
```lisp
(set-strategic-number sn-enable-boar-hunting 0)
    (set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
    (set-strategic-number sn-maximum-hunt-drop-distance 32)
    (enable-wall-placement 1)
```
Line ~498
```lisp
(set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
    (set-strategic-number sn-maximum-hunt-drop-distance 32)
    (enable-wall-placement 1)
    (enable-wall-placement 2)
```
Line ~753
```lisp
(goal g-transport-map 1)
=>
    ; Native legacy SN: allows a small number of forward builders to board
    ; transports when construction across water is required.
    (set-strategic-number sn-number-forward-builders 2)
```
Line ~1265
```lisp
; ============================================================================
; FIXED7 STAGED DARK-AGE HUNTING (official HD AI pattern, simplified)
; One lure hunter starts the boar, support arrives as it nears the TC, and only
; then does the full processing group join. After nearby boar are gone, ordinary
```

### Official HD
Line ~65
```lisp
(defconst forward-goal 36); -1 no fwd, 1 fwd, ID of building = building requested
(defconst gather-inside-goal 37)
(defconst hunting-goal 38); controls hunting
(defconst micro-goal 41)
(defconst math-goal 42); temporary stored values
```
Line ~143
```lisp
(defconst FDrop 14); timer for forcedrop to continuously train villager
(defconst retreat-timer 15); timer to avoid looping retreat unit commands
(defconst hunting-timer 16)
(defconst garrison-timer 17)
(defconst disable-defend-groups-timer 18); always enable defending again
```
Line ~162
```lisp
;Unit IDs
(defconst male-hunter 122)
(defconst female-hunter 216)
(defconst male-forager 120)
```
Line ~163
```lisp
;Unit IDs
(defconst male-hunter 122)
(defconst female-hunter 216)
(defconst male-forager 120)
(defconst female-forager 354)
```
Line ~170
```lisp
(defconst female-gold-miner 579)
(defconst male-gold-miner 581)
(defconst hunter 976)
(defconst food-gatherer 978)
(defconst ri-herbal-medicine 441)
```
Line ~322
```lisp
(defconst forage-food 16)
(defconst sheep-food 958)
(defconst boar-food 910)
```
Line ~388
```lisp
(defconst ri-eagle-warrior 384)
(defconst ri-gillnets 65)
(defconst ri-hunting-dogs 526)
(defconst ri-obsidian-arrows 485)
(defconst siege-tower 885)
```
Line ~1843
```lisp
(defconst number-blacksmiths 2)
(defconst mill-distance 15)
(defconst hunt-distance 0)
(defconst spread-interval 40)
(defconst home-exploration-time 30); deathmatch
```
Line ~1861
```lisp
#else
(defconst mill-distance 29)
(defconst hunt-distance 32)
#end-if
(defconst spread-interval 180)
```
Line ~2588
```lisp
(set-strategic-number sn-cap-civilian-builders 100); maximum villagers that can be tasked as builder
	(set-strategic-number sn-cap-civilian-explorers 100); maximum villagers that can be tasked as explorer
	(set-strategic-number sn-maximum-hunt-drop-distance hunt-distance);Dont walk all over the map for resources 
	(set-strategic-number sn-maximum-food-drop-distance food-distance)
	(set-strategic-number sn-maximum-wood-drop-distance wood-distance)
```

### ResonanceBot 5-1c
Line ~26
```lisp
;sn-group-leader-defense-distance recently changed this from 3 to 2 to retreat in small groups
;sn-placement-zone-size can perhaps prevent bad nomad starts
;apparently sn-minimum-number-hunters uses all villager classes in HD
;it will pull villagers from all resources, not just food
;also new lumberjacks, etc won't be assigned until huntable object is dead
```
Line ~28
```lisp
;apparently sn-minimum-number-hunters uses all villager classes in HD
;it will pull villagers from all resources, not just food
;also new lumberjacks, etc won't be assigned until huntable object is dead

(defconst military-superiority 190)
```
Line ~38
```lisp
(defconst gold-mine 66) ;new Patch 5.8
(defconst stone-mine 102) ;new Patch 5.8
(defconst male-hunter 122)
(defconst dead-m-lumberjack 228)
(defconst dead-f-lumberjack 219)
```
Line ~44
```lisp
(defconst dead-m-miner 229) ;new v2.2c 
(defconst relic 285) ;new Patch 5.8
(defconst female-hunter 216) 
;#load-if-not-defined UP-GAME-AGE2-X2
(defconst barracks-huskarl 759)
```
Line ~533
```lisp
(set-strategic-number sn-maximum-gold-drop-distance 10)
	(set-strategic-number sn-maximum-stone-drop-distance 10)
	(set-strategic-number sn-maximum-hunt-drop-distance 35)
	(set-strategic-number sn-food-dropsite-distance 6)
	(set-strategic-number sn-wood-dropsite-distance 6)
```
Line ~642
```lisp
(set-strategic-number sn-intelligent-gathering 1)
	(set-strategic-number sn-minimum-civilian-explorers 0)
	(set-strategic-number sn-minimum-boar-hunt-group-size 6)
	(set-strategic-number sn-number-build-attempts-before-skip 2)
	(set-goal nomadstart 0)
```
Line ~5419
```lisp
(set-strategic-number sn-percent-building-cancellation 50)
	(set-strategic-number sn-enable-patrol-attack 1)
	(set-strategic-number sn-enable-boar-hunting 2)
	(set-strategic-number sn-minimum-boar-hunt-group-size 2)
	(set-strategic-number sn-minimum-number-hunters 2)
```
Line ~5420
```lisp
(set-strategic-number sn-enable-patrol-attack 1)
	(set-strategic-number sn-enable-boar-hunting 2)
	(set-strategic-number sn-minimum-boar-hunt-group-size 2)
	(set-strategic-number sn-minimum-number-hunters 2)
	(set-goal resetretreat 1)
```
Line ~5421
```lisp
(set-strategic-number sn-enable-boar-hunting 2)
	(set-strategic-number sn-minimum-boar-hunt-group-size 2)
	(set-strategic-number sn-minimum-number-hunters 2)
	(set-goal resetretreat 1)
	(set-goal resetattack 1)
```
Line ~5427
```lisp
)

;Credit to Promiskuitiv and Archon for most of the following boar hunting section. 

(defrule
```

### Rehoboam 1.80i
Line ~244
```lisp
(defconst amount-training-count 81)
        (defconst amount-raider 82)
        (defconst amount-boarding-recharge-rate 83)
        (defconst amount-starting-villagers 84)
        (defconst amount-research-cost-mod 85)
```
Line ~539
```lisp
(defconst actionid-patrol 611)
        (defconst actionid-follow 612)
        (defconst actionid-hunt 613)
        (defconst actionid-transport 614)
        (defconst actionid-trade 615)
```
Line ~566
```lisp
(defconst orderid-patrol 711)
        (defconst orderid-follow 712)
        (defconst orderid-hunt 713)
        (defconst orderid-transport 714)
        (defconst orderid-trade 715)
```
Line ~620
```lisp
(defconst object-data-train-count 31)
        (defconst object-data-tasks-count 32)		;increased for internal tasks performed on the object (may be more than 1 per event)
        (defconst object-data-attacker-count 33)	;not increased for certain situations like hunting
        (defconst object-data-attacker-id 34)		;not set for certain situations like hunting
        (defconst object-data-under-attack 35)		;not set for certain situations like hunting
```
Line ~621
```lisp
(defconst object-data-tasks-count 32)		;increased for internal tasks performed on the object (may be more than 1 per event)
        (defconst object-data-attacker-count 33)	;not increased for certain situations like hunting
        (defconst object-data-attacker-id 34)		;not set for certain situations like hunting
        (defconst object-data-under-attack 35)		;not set for certain situations like hunting
        (defconst object-data-attack-timer 36)		;resets to 60s for each attack (buildings only)
```
Line ~622
```lisp
(defconst object-data-attacker-count 33)	;not increased for certain situations like hunting
        (defconst object-data-attacker-id 34)		;not set for certain situations like hunting
        (defconst object-data-under-attack 35)		;not set for certain situations like hunting
        (defconst object-data-attack-timer 36)		;resets to 60s for each attack (buildings only)
        (defconst object-data-point-z 37)
```
Line ~678
```lisp
(defconst lid-villager-farmer 5123)
        (defconst lid-villager-forager 5402)
        (defconst lid-villager-hunter 5124)
        (defconst lid-villager-fisherman 5499)
        (defconst lid-villager-lumberjack 5125)
```
Line ~782
```lisp
; Define DropsiteMinDistance Constants
        ;--------------------------------------
        ;(defconst hunting 4)
        ;(defconst boar-hunting 5)
        ;(defconst deer-hunting 6)
```
Line ~783
```lisp
;--------------------------------------
        ;(defconst hunting 4)
        ;(defconst boar-hunting 5)
        ;(defconst deer-hunting 6)
        ;(defconst live-boar 7)
```
Line ~784
```lisp
;(defconst hunting 4)
        ;(defconst boar-hunting 5)
        ;(defconst deer-hunting 6)
        ;(defconst live-boar 7)
```


## scouting

### FIX09
Line ~19
```lisp
; - recurring timer-driven assaults, recovery states, fortress-threat adaptation and low-pop scaling
; - population-safe age/assault thresholds, renewable dropsites and reachability-checked upgrade paths
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
; - official-HD-AI-derived group control, exploration management and deterministic difficulty scaling
; - concentrated fortress assaults, explicit defend groups and structured naval groups
```
Line ~20
```lisp
; - population-safe age/assault thresholds, renewable dropsites and reachability-checked upgrade paths
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
; - official-HD-AI-derived group control, exploration management and deterministic difficulty scaling
; - concentrated fortress assaults, explicit defend groups and structured naval groups
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
```
Line ~37
```lisp
; - multi-level military balance and reserve posture instead of binary outnumbered logic
; - doctrine-scaled production infrastructure for 125 / 150 / 200 population
; - fortress reconstruction memory: destroyed strategic castles are deliberately rebuilt
; - forward siege logistics for deep fortresses using official-HD build-forward behavior
; - assault attrition aborts prevent expensive armies from feeding into fortress fire
```
Line ~50
```lisp
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
```
Line ~55
```lisp
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
```
Line ~56
```lisp
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
;
```
Line ~67
```lisp
; SN 110 controls the influence/priority of sn-special-attack-type2.
(defconst sn-special-attack-influence2 110)
(defconst fortress-outpost 598) ; HD Outpost, used as a long-range vision post in Fortress Age.
(defconst male-hunter 122)        ; HD hunter task-class id used by the official AI.
(defconst female-hunter 216)      ; HD hunter task-class id used by the official AI.
```
Line ~76
```lisp
(defconst g-init 1)
(defconst g-water 2)
(defconst g-scout-phase 3)
(defconst g-fortress-phase 4)
(defconst g-late-phase 5)
```
Line ~104
```lisp
(defconst g-navy-fire-threat 27)
(defconst g-navy-demo-threat 28)
(defconst g-late-scouting 29)

(defconst g-doctrine-primary 30)
```
Line ~320
```lisp
(set-goal g-init 1)
    (set-goal g-water 0)
    (set-goal g-scout-phase 1)
    (set-goal g-fortress-phase 0)
    (set-goal g-late-phase 0)
```

### Official HD
Line ~61
```lisp
(defconst patrol-goal 32); resets patrol attacks sent by the direct unit feature
(defconst split-rule-goal 33); split rule if we need more than 16 elements
(defconst tc-dodging-goal 34); move scout out of TC fire
(defconst kill-scouts-goal 35); kill enemy scouts
(defconst forward-goal 36); -1 no fwd, 1 fwd, ID of building = building requested
```
Line ~62
```lisp
(defconst split-rule-goal 33); split rule if we need more than 16 elements
(defconst tc-dodging-goal 34); move scout out of TC fire
(defconst kill-scouts-goal 35); kill enemy scouts
(defconst forward-goal 36); -1 no fwd, 1 fwd, ID of building = building requested
(defconst gather-inside-goal 37)
```
Line ~130
```lisp
(defconst increase-town-size-timer 1)
(defconst reset-town-size-timer 2)
(defconst scouting-timer 3)
(defconst attack-timer 4)
(defconst spread-military-timer 5)
```
Line ~134
```lisp
(defconst spread-military-timer 5)
(defconst under-attack-timer 7)
(defconst civ-explore-timer 8)
(defconst lumber-timer 8)
(defconst one-minute-timer 9)
```
Line ~282
```lisp
(defconst timer-running 2)
(defconst group-type-land-attack 100);Define GroupType Constants
(defconst group-type-land-explore 101)
(defconst group-type-land-trade 109)
(defconst group-type-water-attack 102)
```
Line ~285
```lisp
(defconst group-type-land-trade 109)
(defconst group-type-water-attack 102)
(defconst group-type-water-explore 103)
(defconst group-type-water-trade 106)
(defconst group-type-transport-ship 104)
```
Line ~415
```lisp
(defconst pocket-unit eagle-warrior)
(defconst get-lightcav 0)
(defconst scout-unit eagle-warrior-line)
(defconst military-level-flush 1)
(defconst military-level-flush-aggressive 0)
```
Line ~475
```lisp
(defconst pocket-unit my-unique-unit-line)
(defconst get-lightcav 0)
(defconst scout-unit scout-cavalry-line)
(defconst military-level-flush 2)
(defconst military-level-flush-aggressive 1)
```
Line ~650
```lisp
(defconst default-unit knight)
(defconst unique-unit-food 0)
(defconst default-flush-unit scout-cavalry)
(defconst no-gold-flush-unit scout-cavalry)
(defconst default-ranged archer)
```
Line ~651
```lisp
(defconst unique-unit-food 0)
(defconst default-flush-unit scout-cavalry)
(defconst no-gold-flush-unit scout-cavalry)
(defconst default-ranged archer)
(defconst pocket-unit my-unique-unit-line)
```

### ResonanceBot 5-1c
Line ~64
```lisp
(defconst ri-gillnets 32767) 
(defconst heavy-eagle-warrior 32767)
(defconst eagle-scout 32767)
(defconst ri-chieftains 463)
(defconst ri-obsidian-arrows 485)
```
Line ~202
```lisp
(defconst createarmy 78) 
(defconst feudalarmy 82)
(defconst scoutrush 83)
(defconst knightrush 84) 
(defconst towerrush 85)
```
Line ~337
```lisp
(defconst ri-marauders 483)

(defconst sn-wild-animal-exploration 300)

(defconst ri-elite-konnik 678)
```
Line ~456
```lisp
(game-time > 40)
=>
	(set-strategic-number sn-percent-civilian-explorers  0)
	(set-strategic-number sn-percent-civilian-builders 100)
	(set-strategic-number sn-percent-civilian-gatherers 0)
```
Line ~460
```lisp
(set-strategic-number sn-percent-civilian-gatherers 0)
	(set-strategic-number sn-cap-civilian-gatherers 0)
	(set-strategic-number sn-cap-civilian-explorers 0)
	(set-strategic-number sn-cap-civilian-builders 100)
	(build town-center)
```
Line ~471
```lisp
(set-strategic-number sn-coop-share-information 1) 
	(set-strategic-number sn-hits-before-alliance-change 10)
	(set-strategic-number sn-initial-exploration-required 0)
	(set-strategic-number sn-home-exploration-time 360) ;how long do we scout our home base before looking for other players
	(set-strategic-number sn-easiest-reaction-percentage 100)
```
Line ~472
```lisp
(set-strategic-number sn-hits-before-alliance-change 10)
	(set-strategic-number sn-initial-exploration-required 0)
	(set-strategic-number sn-home-exploration-time 360) ;how long do we scout our home base before looking for other players
	(set-strategic-number sn-easiest-reaction-percentage 100)
	(set-strategic-number sn-easier-reaction-percentage 100)
```
Line ~545
```lisp
(true)
=>
	(set-strategic-number sn-number-explore-groups 1)
	(set-strategic-number sn-blot-exploration-map 0)
	(set-difficulty-parameter ability-to-maintain-distance 0)
```
Line ~546
```lisp
=>
	(set-strategic-number sn-number-explore-groups 1)
	(set-strategic-number sn-blot-exploration-map 0)
	(set-difficulty-parameter ability-to-maintain-distance 0) 
	(set-difficulty-parameter ability-to-dodge-missiles 0)
```
Line ~568
```lisp
(building-type-count town-center < 1)
	(unit-type-count-total eagle-warrior-line < 1)
	(unit-type-count-total scout-cavalry-line < 1)
   	(game-time < 50) ;new v2.2c previously 40
	(game-time > 5) ;new v2.2c previously 6
```

### Rehoboam 1.80i
Line ~143
```lisp
;--------------------------------------
        (defconst group-type-land-attack 100)
        (defconst group-type-land-explore 101)
        (defconst group-type-land-trade 109)
        (defconst group-type-water-attack 102)
```
Line ~146
```lisp
(defconst group-type-land-trade 109)
        (defconst group-type-water-attack 102)
        (defconst group-type-water-explore 103)
        (defconst group-type-water-trade 106)
        (defconst group-type-transport-ship 104)
```
Line ~192
```lisp
(defconst amount-kills 20)
        (defconst amount-research-count 21)
        (defconst amount-exploration 22)
        (defconst amount-convert-priest 27)
        (defconst amount-convert-building 28)
```
Line ~390
```lisp
;--------------------------------------
        ; Define ExploredState Constants
        ;--------------------------------------
        (defconst explored-no 0)
```
Line ~392
```lisp
; Define ExploredState Constants
        ;--------------------------------------
        (defconst explored-no 0)
        (defconst explored-yes 128)					;point has been seen in the past
        (defconst explored-active 15)				;point is currently visible by an object
```
Line ~393
```lisp
;--------------------------------------
        (defconst explored-no 0)
        (defconst explored-yes 128)					;point has been seen in the past
        (defconst explored-active 15)				;point is currently visible by an object
```
Line ~394
```lisp
(defconst explored-no 0)
        (defconst explored-yes 128)					;point has been seen in the past
        (defconst explored-active 15)				;point is currently visible by an object

        ;--------------------------------------
```
Line ~531
```lisp
(defconst actionid-heal 603)
        (defconst actionid-convert 604)
        (defconst actionid-explore 605)
        (defconst actionid-stop 606)
        (defconst actionid-runaway 607)
```
Line ~558
```lisp
(defconst orderid-heal 703)
        (defconst orderid-convert 704)
        (defconst orderid-explore 705)
        (defconst orderid-stop 706)
        (defconst orderid-runaway 707)
```
Line ~750
```lisp
;--------------------------------------
        ; Define ScoutMethod Constants
        ;--------------------------------------
        (defconst scout-center 0)
```


## defense

### FIX09
Line ~16
```lisp
; - safer attack pacing, preventive siege, team trade and island transport support
; - adaptive recovery economy, population-scaled army rebuilding and siege-gated assaults
; - emergency rebuilding of critical infrastructure and difficulty-aware offensive pacing
; - recurring timer-driven assaults, recovery states, fortress-threat adaptation and low-pop scaling
; - population-safe age/assault thresholds, renewable dropsites and reachability-checked upgrade paths
```
Line ~17
```lisp
; - adaptive recovery economy, population-scaled army rebuilding and siege-gated assaults
; - emergency rebuilding of critical infrastructure and difficulty-aware offensive pacing
; - recurring timer-driven assaults, recovery states, fortress-threat adaptation and low-pop scaling
; - population-safe age/assault thresholds, renewable dropsites and reachability-checked upgrade paths
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
```
Line ~21
```lisp
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
; - official-HD-AI-derived group control, exploration management and deterministic difficulty scaling
; - concentrated fortress assaults, explicit defend groups and structured naval groups
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
```
Line ~23
```lisp
; - concentrated fortress assaults, explicit defend groups and structured naval groups
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
; - hysteresis-based enemy threat memory and population-scaled counter packages
; - first-castle escrow reserve so walls cannot consume the 1250-stone strategic commitment
```
Line ~24
```lisp
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
; - hysteresis-based enemy threat memory and population-scaled counter packages
; - first-castle escrow reserve so walls cannot consume the 1250-stone strategic commitment
; - parser-safe rule architecture: every rule stays at or below the official 16-element limit
```
Line ~40
```lisp
; - forward siege logistics for deep fortresses using official-HD build-forward behavior
; - assault attrition aborts prevent expensive armies from feeding into fortress fire
; - emergency civilian-defense toggle is used only as a last-resort base survival measure
; - first-Castle reserve also blocks optional stone technologies from delaying the 1250-stone Castle
; - concise English team-status reporting to human allies only; no chat in solo/enemy-only games
```
Line ~46
```lisp
; - V11 full 125/150/200 economy repair, including Castle/Imperial villager targets
; - V11 civilization-specific operational matrices layered over the generic doctrine system
; - V11 resource-exhaustion, trade-emergency, map doctrine and fortress-defense overlays
; - V11 uses only HD-proven commands/facts already present in official HD AI or V10
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
```
Line ~53
```lisp
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
```
Line ~80
```lisp
(defconst g-late-phase 5)
(defconst g-transport-map 6)
(defconst g-emergency-defense 7)
(defconst g-recovery 8)
(defconst g-assault-window 9)
```
Line ~84
```lisp
(defconst g-assault-window 9)
(defconst g-naval-assault-window 10)
(defconst g-fortress-threat 11)
(defconst g-army-established 12)
(defconst g-water-tuned 13)
```

### Official HD
Line ~23
```lisp
(defconst sn-military-level 190); compares our military with enemy
(defconst sn-resource-control 191); 0=spend res free, 1=navy, 2=research only; > 2 specific items
(defconst sn-infantry-threat 53)
(defconst sn-archer-threat 64)
(defconst sn-cavalry-threat 65)
```
Line ~24
```lisp
(defconst sn-resource-control 191); 0=spend res free, 1=navy, 2=research only; > 2 specific items
(defconst sn-infantry-threat 53)
(defconst sn-archer-threat 64)
(defconst sn-cavalry-threat 65)
```
Line ~25
```lisp
(defconst sn-infantry-threat 53)
(defconst sn-archer-threat 64)
(defconst sn-cavalry-threat 65)

;Goals
```
Line ~34
```lisp
(defconst train-civ-goal 5);1=train villagers, !=1 no villagers
(defconst control-goal 6); 6 = allow to be shot, 7 = shot, also controls if stone for a castle is needed.
(defconst anti-cavalry-threat-goal 7)
(defconst monk-threat-goal 8)
(defconst enemy-goal 9); keep track of what our foe is doing
```
Line ~35
```lisp
(defconst control-goal 6); 6 = allow to be shot, 7 = shot, also controls if stone for a castle is needed.
(defconst anti-cavalry-threat-goal 7)
(defconst monk-threat-goal 8)
(defconst enemy-goal 9); keep track of what our foe is doing
(defconst farm-goal 10);enable/disable farming
```
Line ~38
```lisp
(defconst enemy-goal 9); keep track of what our foe is doing
(defconst farm-goal 10);enable/disable farming
(defconst under-attack-goal 11); town  under attack or just a little harass?
(defconst enemy-boats-goal 12)
(defconst ffa-game-goal 13)
```
Line ~49
```lisp
(defconst retreat-now-goal 20); use to retreat with UP, condition: 1=always, 2=when attacking, 3=attack conditions false
(defconst housing-goal 21); used to build multiple houses with UP
(defconst anti-monk-threat-goal 22)
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
```
Line ~52
```lisp
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
(defconst forward-threat-goal 25); enemy tower rush threat
(defconst enemy-fortifications-goal 26); delay attacks if enemy has many castles and walled with castle
(defconst restart-attack-goal 27); restarts attack in team games if TSA was reduced to place a building
```
Line ~74
```lisp
(defconst raid-goal 47); raiding weak player's eco.
(defconst closest-enemy-goal 48); stores player number of nearest enemy
(defconst threat-time-goal 49); stores time in miliseconds we were last attacked
(defconst threat-player-goal 50); stores player number of the attacker
(defconst threat-source-goal 51); unit class of the last enemy attacker
```
Line ~75
```lisp
(defconst closest-enemy-goal 48); stores player number of nearest enemy
(defconst threat-time-goal 49); stores time in miliseconds we were last attacked
(defconst threat-player-goal 50); stores player number of the attacker
(defconst threat-source-goal 51); unit class of the last enemy attacker
(defconst threat-target-goal 52); unit class of the our last attacked unit
```

### ResonanceBot 5-1c
Line ~181
```lisp
(defconst escrowtoadvance 57) ;we need to advance! escrow everything!
(defconst buildwonder 58) ;escrow everything for wonder
(defconst archerthreat 59)
(defconst infantrythreat 60)
(defconst cavalrythreat 61)
```
Line ~182
```lisp
(defconst buildwonder 58) ;escrow everything for wonder
(defconst archerthreat 59)
(defconst infantrythreat 60)
(defconst cavalrythreat 61)
(defconst militaryadvantage 62) ;do we have a larger military than the enemy?
```
Line ~183
```lisp
(defconst archerthreat 59)
(defconst infantrythreat 60)
(defconst cavalrythreat 61)
(defconst militaryadvantage 62) ;do we have a larger military than the enemy?
(defconst navyadvantage 63) ;do we have a larger navy than the enemy?
```
Line ~434
```lisp
;Standard: 133% unit creation time. 50-70ish villagers max. 3 Castles max.
;-Also: Cannot attack before 30 minutes. Only attacks every few minutes. Broader strategy selection. Technologies delayed
;-First attack is weak but potentially threatening. Does not delay attacks after controlling an objective.  
;-Attacks in slower waves. Low military unit control. Delays or does not get all military upgrades. 
;Moderate: 100% unit creation time (normal). 100+ villagers max. 5 Castles max.
```
Line ~443
```lisp
;Hardest: Same as Moderate. Periodically receives small amounts of free resources until 50 mins. 
;-Full variety of strategies available. Will always open up differently but will adapt to opponents as-needed.
;-Will make smarter decisions when to attack and defend, factoring in strength of opponent's defenses and economy. 

(defrule
```
Line ~476
```lisp
(set-strategic-number sn-easier-reaction-percentage 100)
	(set-strategic-number sn-do-not-scale-for-difficulty-level 1)
	(set-strategic-number sn-number-civilian-militia 3) ;may be able to adjust in DE
	(set-strategic-number sn-wall-targeting-mode 1) ;allow targetting of walls and gates more reliably
	(up-assign-builders c: 621 c: 4) ;town-center-foundation
```
Line ~1079
```lisp
=>
(set-strategic-number sn-allow-civilian-defense 0)
(set-strategic-number sn-number-civilian-militia 0)
(disable-self)
)
```
Line ~1104
```lisp
(unit-type-count transport-ship < 1) ;added
(building-type-count dock < 1)
(not(town-under-attack)) 
(military-population >= 30)
(or(unit-type-count battering-ram-line >= 3) ;new v2.2b v2.2c
```
Line ~1134
```lisp
(or(military-population <= 24)
(or(military-population >= 65)
(or(town-under-attack)
(or(unit-type-count transport-ship >= 1)
(game-time > 3030)))))
```
Line ~1482
```lisp
(game-time < 15)
=>
(set-goal archerthreat 0) 
(set-goal infantrythreat 0) 
(set-goal cavalrythreat 0)
```

### Rehoboam 1.80i
Line ~38
```lisp
(defconst soldier-count 13)
        (defconst attack-soldier-count 14)
        (defconst defend-soldier-count 15)
        (defconst warboat-count 16)
        (defconst attack-warboat-count 17)
```
Line ~41
```lisp
(defconst warboat-count 16)
        (defconst attack-warboat-count 17)
        (defconst defend-warboat-count 18)
        (defconst current-age 19)					;any
        (defconst current-score 20)					;any
```
Line ~66
```lisp
(defconst enemy-villagers-in-town 41)
        (defconst players-in-game 42)
        (defconst defender-count 43)
        (defconst building-type-in-town 44)
        (defconst unit-type-in-town 45)
```
Line ~479
```lisp
(defconst action-stop 5)	;target-point + target-objects
        (defconst action-ground 6)	;target-point + target-objects
        (defconst action-garrison 7)	;target-point -> action-move
        (defconst action-delete 8)	;target-point + target-objects
        (defconst action-unload 9)	;target-objects -> action-none
```
Line ~486
```lisp
(defconst action-lock 12)	;target-objects -> action-none
        (defconst action-work 13)	;target-objects -> action-none
        (defconst action-ungarrison 14)	;target-objects -> action-none
        (defconst action-drop-relic 15)	;target-objects -> action-none
        (defconst action-pack 16)	;target-objects -> action-none
```
Line ~492
```lisp
(defconst action-none 18)	;target-point + target-objects

        ; action-unload: buildings ungarrison to gather point, siege (913) eject in-place, transports to target-point
        ; action-ungarrison: selected units from inside an object are ungarrisoned
        ; action-gather: set gather point (for buildings only)
```
Line ~493
```lisp
; action-unload: buildings ungarrison to gather point, siege (913) eject in-place, transports to target-point
        ; action-ungarrison: selected units from inside an object are ungarrisoned
        ; action-gather: set gather point (for buildings only)
        ; action-work: send villagers back to work
```
Line ~527
```lisp
;--------------------------------------
        (defconst actionid-attack 600)
        (defconst actionid-defend 601)
        (defconst actionid-build 602)
        (defconst actionid-heal 603)
```
Line ~554
```lisp
;--------------------------------------
        (defconst orderid-attack 700)
        (defconst orderid-defend 701)
        (defconst orderid-build 702)
        (defconst orderid-heal 703)
```
Line ~604
```lisp
(defconst object-data-resource 15)
        (defconst object-data-carry 16)
        (defconst object-data-garrisoned 17)
        (defconst object-data-garrison-count 18)
        (defconst object-data-status 19)			;0:incomplete, 2:active, 3:resource, >=4:inactive
```


## walling

### FIX09
Line ~9
```lisp
; - no resource cheating
; - strong economy before expensive commitments
; - walls, towers and castles are real strategic priorities
; - slower and larger attacks, meaningful reserve army
; - selective research of upgrades that can have trade-offs
```
Line ~15
```lisp
; - generic civilization support through unit-line wildcards
; - safer attack pacing, preventive siege, team trade and island transport support
; - adaptive recovery economy, population-scaled army rebuilding and siege-gated assaults
; - emergency rebuilding of critical infrastructure and difficulty-aware offensive pacing
; - recurring timer-driven assaults, recovery states, fortress-threat adaptation and low-pop scaling
```
Line ~23
```lisp
; - concentrated fortress assaults, explicit defend groups and structured naval groups
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
; - hysteresis-based enemy threat memory and population-scaled counter packages
; - first-castle escrow reserve so walls cannot consume the 1250-stone strategic commitment
```
Line ~25
```lisp
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
; - hysteresis-based enemy threat memory and population-scaled counter packages
; - first-castle escrow reserve so walls cannot consume the 1250-stone strategic commitment
; - parser-safe rule architecture: every rule stays at or below the official 16-element limit
; - primary optimization for 125 / 150 / 200 population with safe low-pop fallback
```
Line ~30
```lisp
; - civilization doctrine layer for all HD-era civilizations (AoC + Forgotten + AK + Rajas)
; - doctrine-aware research and army composition instead of generic upgrade spending
; - persistent fortress depth 1/2/3 with siege packages scaled to actual fortification severity
; - protected Imperial and siege resource reserves using HD-supported escrow patterns
; - compact fortress geometry, state-aware builder caps and closed-map specialization
```
Line ~37
```lisp
; - multi-level military balance and reserve posture instead of binary outnumbered logic
; - doctrine-scaled production infrastructure for 125 / 150 / 200 population
; - fortress reconstruction memory: destroyed strategic castles are deliberately rebuilt
; - forward siege logistics for deep fortresses using official-HD build-forward behavior
; - assault attrition aborts prevent expensive armies from feeding into fortress fire
```
Line ~41
```lisp
; - assault attrition aborts prevent expensive armies from feeding into fortress fire
; - emergency civilian-defense toggle is used only as a last-resort base survival measure
; - first-Castle reserve also blocks optional stone technologies from delaying the 1250-stone Castle
; - concise English team-status reporting to human allies only; no chat in solo/enemy-only games
; - V11 command interface, ally support, target locking and resource tributes
```
Line ~44
```lisp
; - concise English team-status reporting to human allies only; no chat in solo/enemy-only games
; - V11 command interface, ally support, target locking and resource tributes
; - V11 full 125/150/200 economy repair, including Castle/Imperial villager targets
; - V11 civilization-specific operational matrices layered over the generic doctrine system
; - V11 resource-exhaustion, trade-emergency, map doctrine and fortress-defense overlays
```
Line ~49
```lisp
; - V11 uses only HD-proven commands/facts already present in official HD AI or V10
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
```
Line ~50
```lisp
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
```

### Official HD
Line ~33
```lisp
(defconst unit-goal 4)
(defconst train-civ-goal 5);1=train villagers, !=1 no villagers
(defconst control-goal 6); 6 = allow to be shot, 7 = shot, also controls if stone for a castle is needed.
(defconst anti-cavalry-threat-goal 7)
(defconst monk-threat-goal 8)
```
Line ~52
```lisp
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
(defconst forward-threat-goal 25); enemy tower rush threat
(defconst enemy-fortifications-goal 26); delay attacks if enemy has many castles and walled with castle
(defconst restart-attack-goal 27); restarts attack in team games if TSA was reduced to place a building
```
Line ~53
```lisp
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
(defconst forward-threat-goal 25); enemy tower rush threat
(defconst enemy-fortifications-goal 26); delay attacks if enemy has many castles and walled with castle
(defconst restart-attack-goal 27); restarts attack in team games if TSA was reduced to place a building
(defconst save-wood-goal 28); controls spending wood
```
Line ~57
```lisp
(defconst save-wood-goal 28); controls spending wood
(defconst meso-enemy-goal 29); enemy has a meso civ; saves elements in a rule
(defconst nr-map-goal 30); focus on eco in easily wall-able maps vs humans
(defconst tribute-goal 31); ask for resources
(defconst patrol-goal 32); resets patrol attacks sent by the direct unit feature
```
Line ~105
```lisp
(defconst feudal 80)
(defconst fc-transit 81)
(defconst castle 82)
(defconst ci-transit 83)
(defconst imperial 84)
```
Line ~139
```lisp
(defconst tribute-timer 10)
(defconst micro-timer 11)
(defconst navy-attack-timer 12); don't spam attack or we can't retreat boats from fortifications
(defconst help-ally-timer 13); indicated when we sent help to ally
(defconst FDrop 14); timer for forcedrop to continuously train villager
```
Line ~190
```lisp
(defconst gunpowder-class 944)
(defconst scorpion-class 955)
(defconst tower-class 952)
(defconst warship-class 922)
(defconst tree-class 915)
```
Line ~203
```lisp
(defconst flare 274)
(defconst tc-arrow 54)
(defconst watch-tower-arrow 786)
(defconst castle-arrow 746)
(defconst castle-arrow-chemistry 747)
```
Line ~204
```lisp
(defconst tc-arrow 54)
(defconst watch-tower-arrow 786)
(defconst castle-arrow 746)
(defconst castle-arrow-chemistry 747)
```
Line ~205
```lisp
(defconst watch-tower-arrow 786)
(defconst castle-arrow 746)
(defconst castle-arrow-chemistry 747)

;User Patch
```

### ResonanceBot 5-1c
Line ~81
```lisp
(defconst ri-greek-fire 32767) 
;(defconst ri-chieftains 32767) 
(defconst ri-great-wall 32767) 
(defconst ri-stronghold 32767) 
(defconst ri-orthodoxy 32767)
```
Line ~163
```lisp
(defconst teamplay 38) ;check for human ally
(defconst fastcastle 39) ;will we fast castle age?
(defconst aibattle 40) ;check for human enemy
(defconst minestone 41) ;stone heavy economy
```
Line ~166
```lisp
(defconst aibattle 40) ;check for human enemy
(defconst minestone 41) ;stone heavy economy
(defconst buildcastle 42) ;save stone for a castle
(defconst makeinfantry 43) ;focus on infantry
(defconst makearchers 44) ;focus on archers
```
Line ~204
```lisp
(defconst scoutrush 83)
(defconst knightrush 84) 
(defconst towerrush 85) 
(defconst wonderrush 86)
(defconst UCQw1tmt0jiuluT-Jv3VyLyQ 87)
```
Line ~226
```lisp
(defconst begintoggleoptions 105) ;for not opening the options twice
(defconst begintogglestrategies 106) ;for not opening the strategies menu twice
(defconst togglefastcastle 107) ;for toggling strategies with options menu
(defconst toggleboom 108) ;for toggling strategies with options menu
(defconst specialcommands 109) ;for toggling strategies with the options menu
```
Line ~233
```lisp
(defconst feudalgalleys 112)
(defconst focustargetplayer 113)
(defconst stonewallstart 114)
(defconst pallisadewallstart 115)
(defconst disablecommands 116)
```
Line ~234
```lisp
(defconst focustargetplayer 113)
(defconst stonewallstart 114)
(defconst pallisadewallstart 115)
(defconst disablecommands 116)
(defconst buildwalls 117)
```
Line ~236
```lisp
(defconst pallisadewallstart 115)
(defconst disablecommands 116)
(defconst buildwalls 117)
(defconst deletewalls 118)
(defconst disabletsarams 119)
```
Line ~237
```lisp
(defconst disablecommands 116)
(defconst buildwalls 117)
(defconst deletewalls 118)
(defconst disabletsarams 119)
(defconst badwoodmap 120) ;for maps with far away wood or no straggler trees
```
Line ~252
```lisp
(defconst fastimperial 132)
(defconst createnavy 133)
(defconst uniquecastle 134)
(defconst uniqueimperial 135)
;skip 136 since it is used above
```

### Rehoboam 1.80i
Line ~87
```lisp
(defconst shore-fish-class 933)
        (defconst farm-class 949)
        (defconst tower-class 952)
        (defconst wall-class 927)
        (defconst gate-class 939)
```
Line ~88
```lisp
(defconst farm-class 949)
        (defconst tower-class 952)
        (defconst wall-class 927)
        (defconst gate-class 939)
        (defconst king-class 959)
```
Line ~89
```lisp
(defconst tower-class 952)
        (defconst wall-class 927)
        (defconst gate-class 939)
        (defconst king-class 959)
        (defconst livestock-class 958)
```
Line ~111
```lisp
;--------------------------------------
        (defconst town-center-foundation 621)
        (defconst gate-ascending 487)
        (defconst gate-ascending-closed 64)
        (defconst gate-ascending-open 78)
```
Line ~112
```lisp
(defconst town-center-foundation 621)
        (defconst gate-ascending 487)
        (defconst gate-ascending-closed 64)
        (defconst gate-ascending-open 78)
        (defconst gate-descending 490)
```
Line ~113
```lisp
(defconst gate-ascending 487)
        (defconst gate-ascending-closed 64)
        (defconst gate-ascending-open 78)
        (defconst gate-descending 490)
        (defconst gate-descending-closed 88)
```
Line ~114
```lisp
(defconst gate-ascending-closed 64)
        (defconst gate-ascending-open 78)
        (defconst gate-descending 490)
        (defconst gate-descending-closed 88)
        (defconst gate-descending-open 99)
```
Line ~115
```lisp
(defconst gate-ascending-open 78)
        (defconst gate-descending 490)
        (defconst gate-descending-closed 88)
        (defconst gate-descending-open 99)
        (defconst gate-horizontal 665)
```
Line ~116
```lisp
(defconst gate-descending 490)
        (defconst gate-descending-closed 88)
        (defconst gate-descending-open 99)
        (defconst gate-horizontal 665)
        (defconst gate-horizontal-closed 659)
```
Line ~117
```lisp
(defconst gate-descending-closed 88)
        (defconst gate-descending-open 99)
        (defconst gate-horizontal 665)
        (defconst gate-horizontal-closed 659)
        (defconst gate-horizontal-open 661)
```


## economy

### FIX09
Line ~7
```lisp
;
; Design goals:
; - no resource cheating
; - strong economy before expensive commitments
; - walls, towers and castles are real strategic priorities
```
Line ~25
```lisp
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
; - hysteresis-based enemy threat memory and population-scaled counter packages
; - first-castle escrow reserve so walls cannot consume the 1250-stone strategic commitment
; - parser-safe rule architecture: every rule stays at or below the official 16-element limit
; - primary optimization for 125 / 150 / 200 population with safe low-pop fallback
```
Line ~31
```lisp
; - doctrine-aware research and army composition instead of generic upgrade spending
; - persistent fortress depth 1/2/3 with siege packages scaled to actual fortification severity
; - protected Imperial and siege resource reserves using HD-supported escrow patterns
; - compact fortress geometry, state-aware builder caps and closed-map specialization
; - market crisis arbitration, anti-forward response and prolonged breach exploitation
```
Line ~41
```lisp
; - assault attrition aborts prevent expensive armies from feeding into fortress fire
; - emergency civilian-defense toggle is used only as a last-resort base survival measure
; - first-Castle reserve also blocks optional stone technologies from delaying the 1250-stone Castle
; - concise English team-status reporting to human allies only; no chat in solo/enemy-only games
; - V11 command interface, ally support, target locking and resource tributes
```
Line ~43
```lisp
; - first-Castle reserve also blocks optional stone technologies from delaying the 1250-stone Castle
; - concise English team-status reporting to human allies only; no chat in solo/enemy-only games
; - V11 command interface, ally support, target locking and resource tributes
; - V11 full 125/150/200 economy repair, including Castle/Imperial villager targets
; - V11 civilization-specific operational matrices layered over the generic doctrine system
```
Line ~46
```lisp
; - V11 full 125/150/200 economy repair, including Castle/Imperial villager targets
; - V11 civilization-specific operational matrices layered over the generic doctrine system
; - V11 resource-exhaustion, trade-emergency, map doctrine and fortress-defense overlays
; - V11 uses only HD-proven commands/facts already present in official HD AI or V10
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
```
Line ~51
```lisp
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
```
Line ~52
```lisp
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
```
Line ~55
```lisp
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
```
Line ~57
```lisp
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
;
; IMPORTANT:
```

### Official HD
Line ~9
```lisp
; Standard taunts.
; 33 - Stop slinging resources. If slinging is requested early and is immediately canceled it may mess up the strategy.
; 38 - Sling Resources. Human player only, stops any unit production except for civilian units.
; 100 - Forbids the AI to resign.
```
Line ~10
```lisp
; Standard taunts.
; 33 - Stop slinging resources. If slinging is requested early and is immediately canceled it may mess up the strategy.
; 38 - Sling Resources. Human player only, stops any unit production except for civilian units.
; 100 - Forbids the AI to resign.
; 101 - Cancels the 100 taunt.
```
Line ~13
```lisp
; 100 - Forbids the AI to resign.
; 101 - Cancels the 100 taunt.
; 200 - Enables resource cheats - only works on 'hardest' difficulty.
; 222 - Same as 31, but more likely to help (only taunt this if you really need it).
; 230 - Tells the AI to go for a monk rush (taunt only works on civs who have good monks).
```
Line ~22
```lisp
(defconst sn-current-age 193);tracks our current age
(defconst sn-military-level 190); compares our military with enemy
(defconst sn-resource-control 191); 0=spend res free, 1=navy, 2=research only; > 2 specific items
(defconst sn-infantry-threat 53)
(defconst sn-archer-threat 64)
```
Line ~33
```lisp
(defconst unit-goal 4)
(defconst train-civ-goal 5);1=train villagers, !=1 no villagers
(defconst control-goal 6); 6 = allow to be shot, 7 = shot, also controls if stone for a castle is needed.
(defconst anti-cavalry-threat-goal 7)
(defconst monk-threat-goal 8)
```
Line ~37
```lisp
(defconst monk-threat-goal 8)
(defconst enemy-goal 9); keep track of what our foe is doing
(defconst farm-goal 10);enable/disable farming
(defconst under-attack-goal 11); town  under attack or just a little harass?
(defconst enemy-boats-goal 12)
```
Line ~42
```lisp
(defconst ffa-game-goal 13)
(defconst need-loom-goal 14)
(defconst escrow-purpose-goal 15); keeps track on what we use our escrow
(defconst spread-military-goal 16); spread military every couple of minutes to prevent villagers stuck
(defconst uu-up-goal 17); use escrow to upgrade uu
```
Line ~44
```lisp
(defconst escrow-purpose-goal 15); keeps track on what we use our escrow
(defconst spread-military-goal 16); spread military every couple of minutes to prevent villagers stuck
(defconst uu-up-goal 17); use escrow to upgrade uu
(defconst hostilities-goal 18); set this flag when we're attacked or attacking - avoid rule too long error
(defconst ranged-unit-type-goal 19);shows the ranged unit we use
```
Line ~55
```lisp
(defconst enemy-fortifications-goal 26); delay attacks if enemy has many castles and walled with castle
(defconst restart-attack-goal 27); restarts attack in team games if TSA was reduced to place a building
(defconst save-wood-goal 28); controls spending wood
(defconst meso-enemy-goal 29); enemy has a meso civ; saves elements in a rule
(defconst nr-map-goal 30); focus on eco in easily wall-able maps vs humans
```
Line ~58
```lisp
(defconst meso-enemy-goal 29); enemy has a meso civ; saves elements in a rule
(defconst nr-map-goal 30); focus on eco in easily wall-able maps vs humans
(defconst tribute-goal 31); ask for resources
(defconst patrol-goal 32); resets patrol attacks sent by the direct unit feature
(defconst split-rule-goal 33); split rule if we need more than 16 elements
```

### ResonanceBot 5-1c
Line ~4
```lisp
;-------------------http://www.youtube.com/Resonance22Channel---------------------------
;-------------------This AI plays only Random Map and requires 150 or more Pop---------
;-------------------Also requires Dark Age start and Standard/Low Resources!------------
;-------------------It is also capable of playing Regicide well-------------------------
```
Line ~21
```lisp
;Note, can make AI focus some buildings:
; sn-special-attack-type2 farm
; sn-special-attack-type2-influence 99999
```
Line ~27
```lisp
;sn-placement-zone-size can perhaps prevent bad nomad starts
;apparently sn-minimum-number-hunters uses all villager classes in HD
;it will pull villagers from all resources, not just food
;also new lumberjacks, etc won't be assigned until huntable object is dead
```
Line ~36
```lisp
(defconst treaty-time 33) ;new Patch 5.8
(defconst water-map 34)
(defconst gold-mine 66) ;new Patch 5.8
(defconst stone-mine 102) ;new Patch 5.8
(defconst male-hunter 122)
```
Line ~37
```lisp
(defconst water-map 34)
(defconst gold-mine 66) ;new Patch 5.8
(defconst stone-mine 102) ;new Patch 5.8
(defconst male-hunter 122)
(defconst dead-m-lumberjack 228)
```
Line ~165
```lisp
(defconst fastcastle 39) ;will we fast castle age?
(defconst aibattle 40) ;check for human enemy
(defconst minestone 41) ;stone heavy economy
(defconst buildcastle 42) ;save stone for a castle
(defconst makeinfantry 43) ;focus on infantry
```
Line ~166
```lisp
(defconst aibattle 40) ;check for human enemy
(defconst minestone 41) ;stone heavy economy
(defconst buildcastle 42) ;save stone for a castle
(defconst makeinfantry 43) ;focus on infantry
(defconst makearchers 44) ;focus on archers
```
Line ~172
```lisp
(defconst balancedarmy 46) ;make all types of units
(defconst aiteammate 47) ;do we have an ai teammate?
(defconst researchtechs 48) ;escrow for expensive upgrades
(defconst boom 49) ;faster imp, more town centers
(defconst makesiege 50) ;if enemy has defences, we make extra siege
```
Line ~179
```lisp
(defconst chattaunts 53) ;whether or not we are allowed to chat taunts
(defconst dynamicdifficulty 54) ;will we scale to the level of our enemies?
(defconst escrowtoadvance 57) ;we need to advance! escrow everything!
(defconst buildwonder 58) ;escrow everything for wonder
(defconst archerthreat 59)
```
Line ~180
```lisp
(defconst dynamicdifficulty 54) ;will we scale to the level of our enemies?
(defconst escrowtoadvance 57) ;we need to advance! escrow everything!
(defconst buildwonder 58) ;escrow everything for wonder
(defconst archerthreat 59)
(defconst infantrythreat 60)
```

### Rehoboam 1.80i
Line ~27
```lisp
(defconst population-headroom 2)
        (defconst housing-headroom 3)
        (defconst idle-farm-count 4)
        (defconst food-amount 5)
        (defconst wood-amount 6)
```
Line ~28
```lisp
(defconst housing-headroom 3)
        (defconst idle-farm-count 4)
        (defconst food-amount 5)
        (defconst wood-amount 6)
        (defconst stone-amount 7)
```
Line ~29
```lisp
(defconst idle-farm-count 4)
        (defconst food-amount 5)
        (defconst wood-amount 6)
        (defconst stone-amount 7)
        (defconst gold-amount 8)
```
Line ~30
```lisp
(defconst food-amount 5)
        (defconst wood-amount 6)
        (defconst stone-amount 7)
        (defconst gold-amount 8)
        (defconst escrow-amount 9)
```
Line ~31
```lisp
(defconst wood-amount 6)
        (defconst stone-amount 7)
        (defconst gold-amount 8)
        (defconst escrow-amount 9)
        (defconst commodity-buying-price 10)
```
Line ~32
```lisp
(defconst stone-amount 7)
        (defconst gold-amount 8)
        (defconst escrow-amount 9)
        (defconst commodity-buying-price 10)
        (defconst commodity-selling-price 11)
```
Line ~57
```lisp
(defconst civilian-population 32)			;any
        (defconst random-number 33)
        (defconst resource-amount 34)				;any
        (defconst player-distance 35)				;any
        (defconst allied-goal 36)					;any
```
Line ~61
```lisp
(defconst allied-goal 36)					;any
        (defconst allied-sn 37)						;any
        (defconst resource-percent 38)				;any
        (defconst enemy-buildings-in-town 39)
        (defconst enemy-units-in-town 40)
```
Line ~86
```lisp
(defconst ocean-fish-class 905)
        (defconst shore-fish-class 933)
        (defconst farm-class 949)
        (defconst tower-class 952)
        (defconst wall-class 927)
```
Line ~170
```lisp
;--------------------------------------
        ; Define ResourceAmount Constants
        ;--------------------------------------
        (defconst amount-food 0)
```


## drop-sites

### FIX09
Line ~18
```lisp
; - emergency rebuilding of critical infrastructure and difficulty-aware offensive pacing
; - recurring timer-driven assaults, recovery states, fortress-threat adaptation and low-pop scaling
; - population-safe age/assault thresholds, renewable dropsites and reachability-checked upgrade paths
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
; - official-HD-AI-derived group control, exploration management and deterministic difficulty scaling
```
Line ~49
```lisp
; - V11 uses only HD-proven commands/facts already present in official HD AI or V10
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
```
Line ~423
```lisp
(set-strategic-number sn-enable-new-building-system 1)
    (set-strategic-number sn-build-frequency 1)
    (set-strategic-number sn-allow-adjacent-dropsites 1)
    (set-strategic-number sn-dropsite-separation-distance 3)
    (set-strategic-number sn-number-build-attempts-before-skip 5)
```
Line ~424
```lisp
(set-strategic-number sn-build-frequency 1)
    (set-strategic-number sn-allow-adjacent-dropsites 1)
    (set-strategic-number sn-dropsite-separation-distance 3)
    (set-strategic-number sn-number-build-attempts-before-skip 5)
    (set-strategic-number sn-max-skips-per-attempt 5)
```
Line ~498
```lisp
(set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
    (set-strategic-number sn-maximum-hunt-drop-distance 32)
    (enable-wall-placement 1)
    (enable-wall-placement 2)
```
Line ~566
```lisp
(set-strategic-number sn-attack-winning-player 0)
    (set-strategic-number sn-attack-winning-player-factor 30)
    (set-strategic-number sn-maximum-food-drop-distance 12)
    (set-strategic-number sn-maximum-wood-drop-distance 10)
    (set-strategic-number sn-maximum-gold-drop-distance 10)
```
Line ~567
```lisp
(set-strategic-number sn-attack-winning-player-factor 30)
    (set-strategic-number sn-maximum-food-drop-distance 12)
    (set-strategic-number sn-maximum-wood-drop-distance 10)
    (set-strategic-number sn-maximum-gold-drop-distance 10)
    (set-strategic-number sn-maximum-stone-drop-distance 10)
```
Line ~568
```lisp
(set-strategic-number sn-maximum-food-drop-distance 12)
    (set-strategic-number sn-maximum-wood-drop-distance 10)
    (set-strategic-number sn-maximum-gold-drop-distance 10)
    (set-strategic-number sn-maximum-stone-drop-distance 10)
    (set-strategic-number sn-mill-max-distance 10)
```
Line ~569
```lisp
(set-strategic-number sn-maximum-wood-drop-distance 10)
    (set-strategic-number sn-maximum-gold-drop-distance 10)
    (set-strategic-number sn-maximum-stone-drop-distance 10)
    (set-strategic-number sn-mill-max-distance 10)
    (disable-self)
```
Line ~570
```lisp
(set-strategic-number sn-maximum-gold-drop-distance 10)
    (set-strategic-number sn-maximum-stone-drop-distance 10)
    (set-strategic-number sn-mill-max-distance 10)
    (disable-self)
)
```

### Official HD
Line ~176
```lisp
(defconst ri-anarchy 16)
(defconst ri-spies 408); useless for AIs
(defconst ri-treadmill-crane 54)
(defconst unpacked-trebuchet 42)
(defconst rax-husky-line 759)
```
Line ~220
```lisp
(defconst commodity-buying-price 10)
(defconst commodity-selling-price 11)
(defconst dropsite-min-distance 12)
(defconst soldier-count 13)
(defconst attack-soldier-count 14)
```
Line ~429
```lisp
(defconst villager-town-center 15)
(defconst villager-castle 12)
(defconst villager-mining-camp 14)
(defconst villager-siege-workshop 16)
(defconst villager-market 17)
```
Line ~852
```lisp
(defconst villager-archery-range 8)
(defconst villager-monastery 6)
(defconst villager-mining-camp 16)
(defconst villager-town-center 15)
(defconst villager-siege-workshop 5)
```
Line ~1842
```lisp
(defconst number-markets 4)
(defconst number-blacksmiths 2)
(defconst mill-distance 15)
(defconst hunt-distance 0)
(defconst spread-interval 40)
```
Line ~1860
```lisp
(defconst hunt-distance 0)
#else
(defconst mill-distance 29)
(defconst hunt-distance 32)
#end-if
```
Line ~1869
```lisp
(defconst home-exploration-time 32768)
#end-if
(defconst special-attack-type2 lumber-camp)
#end-if
#load-if-defined NOMAD-MAP
```
Line ~2585
```lisp
(set-strategic-number sn-retask-gather-amount 0);minimum amount to collect before allowed to switch	
	(set-strategic-number sn-camp-max-distance camp-distance);small distances at the start
	(set-strategic-number sn-mill-max-distance mill-distance)
	(set-strategic-number sn-cap-civilian-builders 100); maximum villagers that can be tasked as builder
	(set-strategic-number sn-cap-civilian-explorers 100); maximum villagers that can be tasked as explorer
```
Line ~2588
```lisp
(set-strategic-number sn-cap-civilian-builders 100); maximum villagers that can be tasked as builder
	(set-strategic-number sn-cap-civilian-explorers 100); maximum villagers that can be tasked as explorer
	(set-strategic-number sn-maximum-hunt-drop-distance hunt-distance);Dont walk all over the map for resources 
	(set-strategic-number sn-maximum-food-drop-distance food-distance)
	(set-strategic-number sn-maximum-wood-drop-distance wood-distance)
```
Line ~2589
```lisp
(set-strategic-number sn-cap-civilian-explorers 100); maximum villagers that can be tasked as explorer
	(set-strategic-number sn-maximum-hunt-drop-distance hunt-distance);Dont walk all over the map for resources 
	(set-strategic-number sn-maximum-food-drop-distance food-distance)
	(set-strategic-number sn-maximum-wood-drop-distance wood-distance)
	(set-strategic-number sn-maximum-stone-drop-distance 0)
```

### ResonanceBot 5-1c
Line ~274
```lisp
(defconst skynetmicro 157)
(defconst disabletsaimp 158) ;new v2.2b v2.2c disabled for now, for first imp attack
(defconst ri-treadmill-crane 159)
(defconst resonancebot 160) ;new v2.2c
(defconst enemyfeudalage 161) ;new v2.2c
```
Line ~527
```lisp
(set-strategic-number sn-maximum-town-size 15)
	(set-strategic-number sn-camp-max-distance 15)
	(set-strategic-number sn-mill-max-distance 20)
	(set-strategic-number sn-minimum-dropsite-buffer 35) ;previously 30
	(set-strategic-number sn-maximum-food-drop-distance 10)
```
Line ~528
```lisp
(set-strategic-number sn-camp-max-distance 15)
	(set-strategic-number sn-mill-max-distance 20)
	(set-strategic-number sn-minimum-dropsite-buffer 35) ;previously 30
	(set-strategic-number sn-maximum-food-drop-distance 10)
	(set-strategic-number sn-maximum-wood-drop-distance 10)
```
Line ~529
```lisp
(set-strategic-number sn-mill-max-distance 20)
	(set-strategic-number sn-minimum-dropsite-buffer 35) ;previously 30
	(set-strategic-number sn-maximum-food-drop-distance 10)
	(set-strategic-number sn-maximum-wood-drop-distance 10)
	(set-strategic-number sn-maximum-gold-drop-distance 10)
```
Line ~530
```lisp
(set-strategic-number sn-minimum-dropsite-buffer 35) ;previously 30
	(set-strategic-number sn-maximum-food-drop-distance 10)
	(set-strategic-number sn-maximum-wood-drop-distance 10)
	(set-strategic-number sn-maximum-gold-drop-distance 10)
	(set-strategic-number sn-maximum-stone-drop-distance 10)
```
Line ~531
```lisp
(set-strategic-number sn-maximum-food-drop-distance 10)
	(set-strategic-number sn-maximum-wood-drop-distance 10)
	(set-strategic-number sn-maximum-gold-drop-distance 10)
	(set-strategic-number sn-maximum-stone-drop-distance 10)
	(set-strategic-number sn-maximum-hunt-drop-distance 35)
```
Line ~532
```lisp
(set-strategic-number sn-maximum-wood-drop-distance 10)
	(set-strategic-number sn-maximum-gold-drop-distance 10)
	(set-strategic-number sn-maximum-stone-drop-distance 10)
	(set-strategic-number sn-maximum-hunt-drop-distance 35)
	(set-strategic-number sn-food-dropsite-distance 6)
```
Line ~533
```lisp
(set-strategic-number sn-maximum-gold-drop-distance 10)
	(set-strategic-number sn-maximum-stone-drop-distance 10)
	(set-strategic-number sn-maximum-hunt-drop-distance 35)
	(set-strategic-number sn-food-dropsite-distance 6)
	(set-strategic-number sn-wood-dropsite-distance 6)
```
Line ~534
```lisp
(set-strategic-number sn-maximum-stone-drop-distance 10)
	(set-strategic-number sn-maximum-hunt-drop-distance 35)
	(set-strategic-number sn-food-dropsite-distance 6)
	(set-strategic-number sn-wood-dropsite-distance 6)
	(set-strategic-number sn-gold-dropsite-distance 6)
```
Line ~535
```lisp
(set-strategic-number sn-maximum-hunt-drop-distance 35)
	(set-strategic-number sn-food-dropsite-distance 6)
	(set-strategic-number sn-wood-dropsite-distance 6)
	(set-strategic-number sn-gold-dropsite-distance 6)
	(set-strategic-number sn-stone-dropsite-distance 6)
```

### Rehoboam 1.80i
Line ~35
```lisp
(defconst commodity-buying-price 10)
        (defconst commodity-selling-price 11)
        (defconst dropsite-min-distance 12)
        (defconst soldier-count 13)
        (defconst attack-soldier-count 14)
```
Line ~601
```lisp
(defconst object-data-range 12)
        (defconst object-data-speed 13)
        (defconst object-data-dropsite 14)
        (defconst object-data-resource 15)
        (defconst object-data-carry 16)
```
Line ~641
```lisp
(defconst object-data-precise-move-x 52)
        (defconst object-data-precise-move-y 53)
        (defconst object-data-reload-time 54)		;in milliseconds
        (defconst object-data-next-attack 55)		;in milliseconds
        (defconst object-data-train-site 56)
```
Line ~642
```lisp
(defconst object-data-precise-move-y 53)
        (defconst object-data-reload-time 54)		;in milliseconds
        (defconst object-data-next-attack 55)		;in milliseconds
        (defconst object-data-train-site 56)
        (defconst object-data-train-time 57)		;in seconds
```
Line ~650
```lisp
(defconst object-data-progress-value 61)
        (defconst object-data-min-range 62)
        (defconst object-data-target-time 63)		;in milliseconds (not for villagers)
        (defconst object-data-heresy 64)		;checks amount-heresy
        (defconst object-data-faith 65)			;checks amount-convert-resistance
```
Line ~780
```lisp
;--------------------------------------
        ; Define DropsiteMinDistance Constants
        ;--------------------------------------
        ;(defconst hunting 4)
```
Line ~815
```lisp
;(defconst sn-object-repair-level 246)
        ;(defconst sn-enable-patrol-attack 247)
        ;(defconst sn-dropsite-separation-distance 248)
        ;(defconst sn-target-player-number 249)
        ;(defconst sn-safe-town-size 250)
```
Line ~820
```lisp
;(defconst sn-focus-player-number 251)
        ;(defconst sn-minimum-boar-lure-group-size 252)
        ;(defconst sn-preferred-mill-placement 253)
        ;(defconst sn-enable-offensive-priority 254)
        ;(defconst sn-building-targeting-mode 255)
```
Line ~827
```lisp
;(defconst sn-allow-civilian-offense 258)
        ;(defconst sn-preferred-trade-distance 259)
        ;(defconst sn-lumber-camp-max-distance 260)
        ;(defconst sn-mining-camp-max-distance 261)
        ;(defconst sn-wall-targeting-mode 262)
```
Line ~828
```lisp
;(defconst sn-preferred-trade-distance 259)
        ;(defconst sn-lumber-camp-max-distance 260)
        ;(defconst sn-mining-camp-max-distance 261)
        ;(defconst sn-wall-targeting-mode 262)
        ;(defconst sn-livestock-to-town-center 263)
```


## age-up

### FIX09
Line ~31
```lisp
; - doctrine-aware research and army composition instead of generic upgrade spending
; - persistent fortress depth 1/2/3 with siege packages scaled to actual fortification severity
; - protected Imperial and siege resource reserves using HD-supported escrow patterns
; - compact fortress geometry, state-aware builder caps and closed-map specialization
; - market crisis arbitration, anti-forward response and prolonged breach exploitation
```
Line ~44
```lisp
; - concise English team-status reporting to human allies only; no chat in solo/enemy-only games
; - V11 command interface, ally support, target locking and resource tributes
; - V11 full 125/150/200 economy repair, including Castle/Imperial villager targets
; - V11 civilization-specific operational matrices layered over the generic doctrine system
; - V11 resource-exhaustion, trade-emergency, map doctrine and fortress-defense overlays
```
Line ~52
```lisp
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
```
Line ~53
```lisp
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
```
Line ~54
```lisp
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
```
Line ~56
```lisp
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
;
```
Line ~57
```lisp
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
;
; IMPORTANT:
```
Line ~113
```lisp
(defconst g-fortress-depth 35)
(defconst g-siege-escrow 36)
(defconst g-imperial-reserve 37)
(defconst g-food-crisis 38)
(defconst g-wood-crisis 39)
```
Line ~188
```lisp
; FIXED8 fast-Castle state: 0=normal, 1=Castle bank, 2=age-up in progress, 3=second-TC wood bank.
(defconst g-fastcastle-reserve 102)

; V11 profile values.
```
Line ~345
```lisp
(set-goal g-gold-crisis 0)
    (set-goal g-castle-reserve 0)
    (set-goal g-fastcastle-reserve 0)
    (set-goal g-enemy-known 0)
    (set-goal g-reassess 0)
```

### Official HD
Line ~103
```lisp
(defconst dark 78)
(defconst df-transit 79)
(defconst feudal 80)
(defconst fc-transit 81)
(defconst castle 82)
```
Line ~107
```lisp
(defconst castle 82)
(defconst ci-transit 83)
(defconst imperial 84)
(defconst flush 200)
(defconst rush 201)
```
Line ~350
```lisp
(defconst elephant-archer 873)
(defconst elite-elephant-archer 875)
(defconst imperial-camel 897)
(defconst ri-elite-genoese-crossbow 468)
(defconst genoese-crossbowman 866)
```
Line ~380
```lisp
(defconst ri-sultans 506)
(defconst ri-shatagni 507)
(defconst ri-imperial-camel 521)
(defconst ri-mercenaries 514)
(defconst ri-recurve-bow 515)
```
Line ~405
```lisp
(defconst dark-age-villager 28)
(defconst villager-wonder-dark 32)
(defconst villager-wonder-feudal 34)
(defconst default-strategy 201)
(defconst pocket-strategy 202)
```
Line ~645
```lisp
(defconst dark-age-villager 29)
(defconst villager-wonder-dark 33)
(defconst villager-wonder-feudal 35)
(defconst default-strategy 201)
(defconst pocket-strategy 202)
```
Line ~772
```lisp
(defconst default-flush-unit militiaman-line)
(defconst no-gold-flush-unit skirmisher)
#load-if-not-defined POST-IMPERIAL-AGE-START
(defconst default-ranged archer)
#else
```
Line ~1824
```lisp
#end-if
#end-if
#load-if-defined POST-IMPERIAL-AGE-START
(defconst pop-house 20)
#else
```
Line ~2029
```lisp
(defconst number-garrison-units 4)
#load-if-defined DIFFICULTY-EASIEST
(defconst villager-feudal 10)
(defconst villager-flush 10)
#end-if
```
Line ~2033
```lisp
#end-if
#load-if-defined DIFFICULTY-EASY
(defconst villager-feudal 12)
(defconst villager-flush 11)
#end-if
```

### ResonanceBot 5-1c
Line ~91
```lisp
(defconst ri-sultans 32767) 
(defconst ri-shatagni 32767) 
(defconst ri-imperial-camel 32767) 
(defconst ri-elite-elephant-archer 32767) 
(defconst ri-mercenaries 32767)
```
Line ~100
```lisp
(defconst ri-elite-genoese-crossbow 32767) 
(defconst ri-revetments 32767) 
(defconst imperial-camel 32767) 
(defconst slinger 32767) 
(defconst condottiero 184)
```
Line ~163
```lisp
(defconst teamplay 38) ;check for human ally
(defconst fastcastle 39) ;will we fast castle age?
(defconst aibattle 40) ;check for human enemy
(defconst minestone 41) ;stone heavy economy
```
Line ~179
```lisp
(defconst chattaunts 53) ;whether or not we are allowed to chat taunts
(defconst dynamicdifficulty 54) ;will we scale to the level of our enemies?
(defconst escrowtoadvance 57) ;we need to advance! escrow everything!
(defconst buildwonder 58) ;escrow everything for wonder
(defconst archerthreat 59)
```
Line ~201
```lisp
(defconst nomadstart 77)
(defconst createarmy 78) 
(defconst feudalarmy 82)
(defconst scoutrush 83)
(defconst knightrush 84)
```
Line ~226
```lisp
(defconst begintoggleoptions 105) ;for not opening the options twice
(defconst begintogglestrategies 106) ;for not opening the strategies menu twice
(defconst togglefastcastle 107) ;for toggling strategies with options menu
(defconst toggleboom 108) ;for toggling strategies with options menu
(defconst specialcommands 109) ;for toggling strategies with the options menu
```
Line ~231
```lisp
(defconst createdbyres 110) ;for escrowing resources
(defconst builddock 111)
(defconst feudalgalleys 112)
(defconst focustargetplayer 113)
(defconst stonewallstart 114)
```
Line ~242
```lisp
(defconst strongeconomy 121) ;currently for training unit counters 
(defconst crossbowrush 123) 
(defconst masspaladin 124) ;imperial age paladin flood
(defconst monkrush 125) 
(defconst uniqueflood 126)
```
Line ~248
```lisp
(defconst uniquearcher 128)
(defconst uniquecavalry 129)
(defconst imperialarmy 130)
(defconst boomarmy 131)
(defconst fastimperial 132)
```
Line ~250
```lisp
(defconst imperialarmy 130)
(defconst boomarmy 131)
(defconst fastimperial 132)
(defconst createnavy 133)
(defconst uniquecastle 134)
```

### Rehoboam 1.80i
Line ~985
```lisp
; extra goals 1000+
            (defconst gl-enemy-early-feudal 1001)

        ; *New - Main full game goals 41-68
```
Line ~1356
```lisp
;1.80
            (defconst gl-closest-enemy-castle-x 499) ;begge disse genbruges fra minut 10 eller fra man selv er castle age.
            (defconst gl-closest-enemy-castle-y 500)
```
Line ~1555
```lisp
(defconst gl-closest-unscouted-area-new-x 485)
            (defconst gl-closest-unscouted-area-new-y 486)
            (defconst gl-feudal-stone-vill 487)

            (defconst gl-enemy-x 488)
```
Line ~1726
```lisp
(defconst DUC-timer 14)

            ;1.61 timers (>= castle age)
            (defconst tech-checking-timer 1)
            (defconst dropsite-timer 2)
```
Line ~1837
```lisp
(defconst balanced-archer-skirm-rush 3)
            (defconst dark 1)
            (defconst advancing-to-feudal 2)
            (defconst feudal 3)
            (defconst advancing-to-castle 4)
```
Line ~1838
```lisp
(defconst dark 1)
            (defconst advancing-to-feudal 2)
            (defconst feudal 3)
            (defconst advancing-to-castle 4)
            (defconst Castle 5) ; stort c for at undgå interaktion med bygningen
```
Line ~1841
```lisp
(defconst advancing-to-castle 4)
            (defconst Castle 5) ; stort c for at undgå interaktion med bygningen
            (defconst advancing-to-imperial 6) 
            (defconst imperial 7) 
            (defconst build-line-system 1)
```
Line ~1842
```lisp
(defconst Castle 5) ; stort c for at undgå interaktion med bygningen
            (defconst advancing-to-imperial 6) 
            (defconst imperial 7) 
            (defconst build-line-system 1)
            (defconst standard-system 2)
```
Line ~1877
```lisp
(defconst saving-for-hand-cart 6)
            (defconst saving-for-husbandry 7)
            (defconst saving-for-imperial-age 8)
            (defconst saving-for-plate-barding 9)
            (defconst saving-for-cavalier 10)
```
Line ~2361
```lisp
(defrule
            (current-age >= feudal-age)
            =>
            (cc-add-resource food -500)
```


## grouping

### FIX09
Line ~20
```lisp
; - population-safe age/assault thresholds, renewable dropsites and reachability-checked upgrade paths
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
; - official-HD-AI-derived group control, exploration management and deterministic difficulty scaling
; - concentrated fortress assaults, explicit defend groups and structured naval groups
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
```
Line ~21
```lisp
; - army-established recovery logic, persistent reconnaissance and fortress-focused siege targeting
; - official-HD-AI-derived group control, exploration management and deterministic difficulty scaling
; - concentrated fortress assaults, explicit defend groups and structured naval groups
; - official-HD-AI + ResonanceBot cross-checked tactical engine settings
; - explicit DEVELOP / FORTIFY / MOBILIZE / SIEGE / ASSAULT / RECOVERY / EMERGENCY states
```
Line ~49
```lisp
; - V11 uses only HD-proven commands/facts already present in official HD AI or V10
; - FIXED5 replaces runtime housing-cap strategy checks with official POPULATION-CAP-* max-pop profiles
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
```
Line ~51
```lisp
; - FIXED5 replay tuning: tighter dropsites, safer villagers, coherent defense groups, gates and age-up failsafes
; - FIXED6 replay tuning: faster Hardest ages, active Castle attacks, siege discipline, early docks/outposts, stronger wall logistics
; - FIXED7 Yucatan replay tuning: true Hardest fast-castle economy, staged hunting, wider resource-safe walls, stronger grouped defense and observation network
; - FIXED8 ResonanceBot replay tuning: protected Feudal-to-Castle bank, post-click wall timing, TC-first Castle boom, first-Castle stone lock and tower burst prevention
; - FIXED8 replay repair: Hardest land AI suppresses non-emergency Feudal army spending and optional upgrades until Castle Age is committed
```
Line ~56
```lisp
; - FIXED8 replay repair: earlier resilient Imperial transition and throttled Loom retry logic
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
;
```
Line ~363
```lisp
(enable-timer t-naval-assault 900)
    (enable-timer t-loom 120)
    (set-strategic-number sn-percent-attack-soldiers 65)
    (set-strategic-number sn-percent-attack-boats 70)
    (set-strategic-number sn-minimum-attack-group-size 12)
```
Line ~365
```lisp
(set-strategic-number sn-percent-attack-soldiers 65)
    (set-strategic-number sn-percent-attack-boats 70)
    (set-strategic-number sn-minimum-attack-group-size 12)
    (set-strategic-number sn-maximum-attack-group-size 36)
    (set-strategic-number sn-group-form-distance 24)
```
Line ~366
```lisp
(set-strategic-number sn-percent-attack-boats 70)
    (set-strategic-number sn-minimum-attack-group-size 12)
    (set-strategic-number sn-maximum-attack-group-size 36)
    (set-strategic-number sn-group-form-distance 24)
    (set-strategic-number sn-attack-group-gather-spacing 3)
```
Line ~367
```lisp
(set-strategic-number sn-minimum-attack-group-size 12)
    (set-strategic-number sn-maximum-attack-group-size 36)
    (set-strategic-number sn-group-form-distance 24)
    (set-strategic-number sn-attack-group-gather-spacing 3)
    (disable-self)
```
Line ~368
```lisp
(set-strategic-number sn-maximum-attack-group-size 36)
    (set-strategic-number sn-group-form-distance 24)
    (set-strategic-number sn-attack-group-gather-spacing 3)
    (disable-self)
)
```

### Official HD
Line ~50
```lisp
(defconst housing-goal 21); used to build multiple houses with UP
(defconst anti-monk-threat-goal 22)
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
(defconst forward-threat-goal 25); enemy tower rush threat
```
Line ~51
```lisp
(defconst anti-monk-threat-goal 22)
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
(defconst forward-threat-goal 25); enemy tower rush threat
(defconst enemy-fortifications-goal 26); delay attacks if enemy has many castles and walled with castle
```
Line ~59
```lisp
(defconst nr-map-goal 30); focus on eco in easily wall-able maps vs humans
(defconst tribute-goal 31); ask for resources
(defconst patrol-goal 32); resets patrol attacks sent by the direct unit feature
(defconst split-rule-goal 33); split rule if we need more than 16 elements
(defconst tc-dodging-goal 34); move scout out of TC fire
```
Line ~123
```lisp
(defconst pocket 2)
(defconst retreat 1)
(defconst groups 2)
(defconst tsa 3)
```
Line ~145
```lisp
(defconst hunting-timer 16)
(defconst garrison-timer 17)
(defconst disable-defend-groups-timer 18); always enable defending again
(defconst monk-micro-timer 19)
(defconst misc-micro-timer 20)
```
Line ~149
```lisp
(defconst misc-micro-timer 20)
(defconst train-forward-timer 21)
(defconst rally-units-timer 22)
(defconst reset-units-timer 23)
(defconst attack-chat 24)
```
Line ~222
```lisp
(defconst dropsite-min-distance 12)
(defconst soldier-count 13)
(defconst attack-soldier-count 14)
(defconst defend-soldier-count 15)
(defconst warboat-count 16)
```
Line ~223
```lisp
(defconst soldier-count 13)
(defconst attack-soldier-count 14)
(defconst defend-soldier-count 15)
(defconst warboat-count 16)
(defconst attack-warboat-count 17)
```
Line ~281
```lisp
(defconst timer-triggered 1)
(defconst timer-running 2)
(defconst group-type-land-attack 100);Define GroupType Constants
(defconst group-type-land-explore 101)
(defconst group-type-land-trade 109)
```
Line ~282
```lisp
(defconst timer-running 2)
(defconst group-type-land-attack 100);Define GroupType Constants
(defconst group-type-land-explore 101)
(defconst group-type-land-trade 109)
(defconst group-type-water-attack 102)
```

### ResonanceBot 5-1c
Line ~24
```lisp
; sn-special-attack-type2-influence 99999

;sn-group-leader-defense-distance recently changed this from 3 to 2 to retreat in small groups
;sn-placement-zone-size can perhaps prevent bad nomad starts
;apparently sn-minimum-number-hunters uses all villager classes in HD
```
Line ~393
```lisp
;Timer 2 is for late game global timed free tributes for Hard and Hardest when AI has teammates.
;Timer 3 is for building lumber camps.
;Timer 4 is for Attack logic, sets attack groups to 0.
;Timer 5 is for Attack logic on Standard and Easiest difficulties and Timed Attacks.
;Timer 6 is for Retreat logic (Userpatch only)
```
Line ~400
```lisp
;Timer 9 is for Retreat logic. (Userpatch only) 
;Timer 10 is for Escrowing resources to advance. 
;Timer 11 is for Patrolling to spread out troops. 
;Timer 12 is for Retreat logic. (Userpatch only). 
;Timer 13 is for late game global timed free tributes for Hard and Hardest when AI has teammates.
```
Line ~545
```lisp
(true)
=>
	(set-strategic-number sn-number-explore-groups 1)
	(set-strategic-number sn-blot-exploration-map 0)
	(set-difficulty-parameter ability-to-maintain-distance 0)
```
Line ~642
```lisp
(set-strategic-number sn-intelligent-gathering 1)
	(set-strategic-number sn-minimum-civilian-explorers 0)
	(set-strategic-number sn-minimum-boar-hunt-group-size 6)
	(set-strategic-number sn-number-build-attempts-before-skip 2)
	(set-goal nomadstart 0)
```
Line ~986
```lisp
(set-strategic-number sn-minimum-dropsite-buffer 40)
(set-strategic-number sn-maximum-wood-drop-distance 120)
(up-send-scout group-type-land-explore scout-center) ;remove for UserPatch
;(chat-to-all "DEBUG: Searching for Wood resources.")
(set-goal badwoodmap 1)
```
Line ~1041
```lisp
;TSA only enabled on land maps. 
;TSA seems to only work when attack groups is set to 0. 

(defrule
```
Line ~1095
```lisp
;new v2.2b v2.2c imp ram attack test
;Mixed Attack Group Method v2.2c

(defrule
```
Line ~1101
```lisp
(game-time < 2860)
(current-age == imperial-age)
(current-age-time >= 60) ;first attack in imp may use attack groups
(unit-type-count transport-ship < 1) ;added
(building-type-count dock < 1)
```
Line ~1113
```lisp
(set-goal enableattacknow 1)
(set-goal enabletsa 0)
(set-strategic-number sn-minimum-attack-group-size 6) 
(set-strategic-number sn-maximum-attack-group-size 26) 
(set-strategic-number sn-number-attack-groups 25)
```

### Rehoboam 1.80i
Line ~37
```lisp
(defconst dropsite-min-distance 12)
        (defconst soldier-count 13)
        (defconst attack-soldier-count 14)
        (defconst defend-soldier-count 15)
        (defconst warboat-count 16)
```
Line ~38
```lisp
(defconst soldier-count 13)
        (defconst attack-soldier-count 14)
        (defconst defend-soldier-count 15)
        (defconst warboat-count 16)
        (defconst attack-warboat-count 17)
```
Line ~140
```lisp
;--------------------------------------
        ; Define GroupType Constants
        ;--------------------------------------
        (defconst group-type-land-attack 100)
```
Line ~142
```lisp
; Define GroupType Constants
        ;--------------------------------------
        (defconst group-type-land-attack 100)
        (defconst group-type-land-explore 101)
        (defconst group-type-land-trade 109)
```
Line ~143
```lisp
;--------------------------------------
        (defconst group-type-land-attack 100)
        (defconst group-type-land-explore 101)
        (defconst group-type-land-trade 109)
        (defconst group-type-water-attack 102)
```
Line ~144
```lisp
(defconst group-type-land-attack 100)
        (defconst group-type-land-explore 101)
        (defconst group-type-land-trade 109)
        (defconst group-type-water-attack 102)
        (defconst group-type-water-explore 103)
```
Line ~145
```lisp
(defconst group-type-land-explore 101)
        (defconst group-type-land-trade 109)
        (defconst group-type-water-attack 102)
        (defconst group-type-water-explore 103)
        (defconst group-type-water-trade 106)
```
Line ~146
```lisp
(defconst group-type-land-trade 109)
        (defconst group-type-water-attack 102)
        (defconst group-type-water-explore 103)
        (defconst group-type-water-trade 106)
        (defconst group-type-transport-ship 104)
```
Line ~147
```lisp
(defconst group-type-water-attack 102)
        (defconst group-type-water-explore 103)
        (defconst group-type-water-trade 106)
        (defconst group-type-transport-ship 104)
        (defconst group-type-fishing-ship 105)
```
Line ~148
```lisp
(defconst group-type-water-explore 103)
        (defconst group-type-water-trade 106)
        (defconst group-type-transport-ship 104)
        (defconst group-type-fishing-ship 105)
        (defconst group-type-forward-builder 107)
```


## retreat

### FIX09
Line ~27
```lisp
; - first-castle escrow reserve so walls cannot consume the 1250-stone strategic commitment
; - parser-safe rule architecture: every rule stays at or below the official 16-element limit
; - primary optimization for 125 / 150 / 200 population with safe low-pop fallback
; - civilization doctrine layer for all HD-era civilizations (AoC + Forgotten + AK + Rajas)
; - doctrine-aware research and army composition instead of generic upgrade spending
```
Line ~151
```lisp
(defconst g-command-force 71)
(defconst g-command-siege 72)
(defconst g-command-retreat 73)
(defconst g-team-support 74)
(defconst g-forced-target 75)
```
Line ~1251
```lisp
#end-if

; Safe fallback for any custom / unsupported civilization.
(defrule
    (game-time > 30)
```
Line ~2247
```lisp
)

; Casualty/timing fallback preserves FIXED7's 15-minute floor without bypassing
; resources or prerequisites.
(defrule
```
Line ~2363
```lisp
; Use can-research as the engine-side affordability/prerequisite guard.
; Primary thresholds preserve the slower Fortress Age pacing.
; Time-based fallbacks prevent permanent age-lock after casualties or odd starts.
; -----------------------------
```
Line ~2667
```lisp
)

; Time/resource-independent population fallback: after 45 minutes, a legal
; Imperial upgrade is more valuable than waiting for the ideal civilian target.
(defrule
```
Line ~4211
```lisp
(set-goal g-war-state state-fortify)
    (set-goal g-assault-window 0)
    (up-retreat-now)
)
(defrule
```
Line ~4851
```lisp
)

; Visibility-independent fallback upgrades. These prevent poor scouting from
; leaving the prepared siege core permanently at the lowest ram tier.
(defrule
```
Line ~8961
```lisp
; Army-established thresholds. Primary tuning is 125/150/200; lower profiles
; remain safe fallbacks rather than the design center.
(defrule
    (goal g-army-established 0)
```
Line ~9001
```lisp
)

; Major losses enter real RECOVERY and immediately call the HD retreat action.
(defrule
    (goal g-army-established 1)
```

### Official HD
Line ~47
```lisp
(defconst hostilities-goal 18); set this flag when we're attacked or attacking - avoid rule too long error
(defconst ranged-unit-type-goal 19);shows the ranged unit we use
(defconst retreat-now-goal 20); use to retreat with UP, condition: 1=always, 2=when attacking, 3=attack conditions false
(defconst housing-goal 21); used to build multiple houses with UP
(defconst anti-monk-threat-goal 22)
```
Line ~51
```lisp
(defconst anti-monk-threat-goal 22)
(defconst enemy-sighted-goal 23); when enemy activities detected, split the attack groups
(defconst attack-status-goal 24); indicates if we stop or regroup the attack
(defconst forward-threat-goal 25); enemy tower rush threat
(defconst enemy-fortifications-goal 26); delay attacks if enemy has many castles and walled with castle
```
Line ~122
```lisp
(defconst flank 1)
(defconst pocket 2)
(defconst retreat 1)
(defconst groups 2)
(defconst tsa 3)
```
Line ~139
```lisp
(defconst tribute-timer 10)
(defconst micro-timer 11)
(defconst navy-attack-timer 12); don't spam attack or we can't retreat boats from fortifications
(defconst help-ally-timer 13); indicated when we sent help to ally
(defconst FDrop 14); timer for forcedrop to continuously train villager
```
Line ~142
```lisp
(defconst help-ally-timer 13); indicated when we sent help to ally
(defconst FDrop 14); timer for forcedrop to continuously train villager
(defconst retreat-timer 15); timer to avoid looping retreat unit commands
(defconst hunting-timer 16)
(defconst garrison-timer 17)
```
Line ~2712
```lisp
=>
	(enable-timer navy-attack-timer 1)
	(enable-timer retreat-timer 1)
	(enable-timer micro-timer 1)
	(enable-timer garrison-timer 1)
```
Line ~25484
```lisp
)

; Retreat Rules

(defrule
```
Line ~25524
```lisp
(cc-players-unit-type-count target-player castle-arrow > 0)
=>
	(set-goal retreat-now-goal 1)
	(set-goal attack-status-goal retreat)
	(set-goal attack-goal 0)
```
Line ~25525
```lisp
=>
	(set-goal retreat-now-goal 1)
	(set-goal attack-status-goal retreat)
	(set-goal attack-goal 0)
	(enable-timer attack-timer 60)
```
Line ~25529
```lisp
(enable-timer attack-timer 60)
	(set-goal reset 1); to avoid reset-spamming
	(chat-to-player my-player-number "retreat out of castle fire")
)
(defrule
```

### ResonanceBot 5-1c
Line ~24
```lisp
; sn-special-attack-type2-influence 99999

;sn-group-leader-defense-distance recently changed this from 3 to 2 to retreat in small groups
;sn-placement-zone-size can perhaps prevent bad nomad starts
;apparently sn-minimum-number-hunters uses all villager classes in HD
```
Line ~217
```lisp
(defconst infantrycounter 81)

(defconst resetretreat 55) ;to avoid looping commands
(defconst resetattack 56) ;to avoid looping commands
```
Line ~395
```lisp
;Timer 4 is for Attack logic, sets attack groups to 0.
;Timer 5 is for Attack logic on Standard and Easiest difficulties and Timed Attacks.
;Timer 6 is for Retreat logic (Userpatch only)
;Timer 7 is for the super late game free tributes on Hard and Hardest when AI has teammates.
;Timer 8 is for Retreat logic. (Userpatch only)
```
Line ~397
```lisp
;Timer 6 is for Retreat logic (Userpatch only)
;Timer 7 is for the super late game free tributes on Hard and Hardest when AI has teammates.
;Timer 8 is for Retreat logic. (Userpatch only) 
;Timer 9 is for Retreat logic. (Userpatch only) 
;Timer 10 is for Escrowing resources to advance.
```
Line ~398
```lisp
;Timer 7 is for the super late game free tributes on Hard and Hardest when AI has teammates.
;Timer 8 is for Retreat logic. (Userpatch only) 
;Timer 9 is for Retreat logic. (Userpatch only) 
;Timer 10 is for Escrowing resources to advance. 
;Timer 11 is for Patrolling to spread out troops.
```
Line ~401
```lisp
;Timer 10 is for Escrowing resources to advance. 
;Timer 11 is for Patrolling to spread out troops. 
;Timer 12 is for Retreat logic. (Userpatch only). 
;Timer 13 is for late game global timed free tributes for Hard and Hardest when AI has teammates.
;Timer 14 is for thanking teammates for tributes.
```
Line ~998
```lisp
(goal badwoodmap 1)
=>
(up-retreat-now)
(disable-self) 
)
```
Line ~5395
```lisp
;========User Patch/HD Edition Additions=========
;Retreat out of Town Center and Castle Fire. 
;Timer 9 is to reset attack.
;Timer 8 is to make sure we retreat.
```
Line ~5397
```lisp
;Retreat out of Town Center and Castle Fire. 
;Timer 9 is to reset attack.
;Timer 8 is to make sure we retreat. 

(defconst retreat 1)
```
Line ~5399
```lisp
;Timer 8 is to make sure we retreat. 

(defconst retreat 1)
(defconst action-patrol 2)
(defconst reset 83)
```

### Rehoboam 1.80i
Line ~534
```lisp
(defconst actionid-stop 606)
        (defconst actionid-runaway 607)
        (defconst actionid-retreat 608)
        (defconst actionid-gather 609)
        (defconst actionid-move 610)
```
Line ~561
```lisp
(defconst orderid-stop 706)
        (defconst orderid-runaway 707)
        (defconst orderid-retreat 708)
        (defconst orderid-gather 709)
        (defconst orderid-move 710)
```
Line ~925
```lisp
(defconst gl-post-old-mili-rules-id     10030)
            (defconst gl-skip-old-mili-counter     10031)
            (defconst gl-post-retreat-rules-id      10032)

            (defconst gl-shooting-loop-start-time__#000 10033)
```
Line ~1262
```lisp
(defconst gl-object-y 230)
            (defconst gl-agression-mode 231)
            (defconst gl-retreat-waiting-points 232)
            (defconst gl-time-to-upgrades 233)
            (defconst gl-time-to-imp-upgrades 234)
```
Line ~1734
```lisp
;1.70 timers 
            (defconst group-retreat-timer 44)
            (defconst building-placed-timer 45)
            (defconst town-is-safe-timer 46)
```
Line ~1745
```lisp
(defconst scouting-enemy-base-timer 43)
            (defconst changing-direction-timer 50)
            (defconst knight-retreat-timer 17)
            (defconst semitrush-timer 18)
            ;(defconst semitrush-timer2 21)
```
Line ~1771
```lisp
(defconst fight-back-timer 25)
            (defconst t-lure 26)
            (defconst retreat-timer 27)
            (defconst counter-push-timer 28)
            (defconst boar-killing-timer 29)
```
Line ~1788
```lisp
(defconst attack-with-flank-timer 42)
            (defconst no-fighting-timer 43)
            (defconst full-retreat-timer 44)
            (defconst army-together-timer 45) ;test
            (defconst reset-military-timer 46)
```
Line ~1979
```lisp
(defconst Defensiveness 14) ; The minimum militarry superiority before attacking
            (defconst Agressiveness -3) ; The military superiority thresshold before retreating
            ;(defconst Target-player 5)
```
Line ~1982
```lisp
;(defconst Target-player 5)

            (defconst retreating 1)
            (defconst defensive 2)
            (defconst attacking 3)
```


## production

### FIX09
Line ~36
```lisp
; - V9 is optimized first for 125 / 150 / 200 population, especially 150 and 200
; - multi-level military balance and reserve posture instead of binary outnumbered logic
; - doctrine-scaled production infrastructure for 125 / 150 / 200 population
; - fortress reconstruction memory: destroyed strategic castles are deliberately rebuilt
; - forward siege logistics for deep fortresses using official-HD build-forward behavior
```
Line ~57
```lisp
; - FIXED9 Arabia replay tuning: no normal Dark-Age farms, Horse Collar before farming, delayed boar lure, compact housing and forward Dark-Age outposts
; - FIXED9 Arabia replay tuning: persistent pressure-safe Castle bank, mixed Feudal defense, grouped responses and scout-preservation logic
; - FIXED9 Arabia replay tuning: Feudal palisades return, stone walls precede the first Castle, denser lumber camps and stronger 150-pop production depth
;
; IMPORTANT:
```
Line ~117
```lisp
(defconst g-wood-crisis 39)
(defconst g-stone-crisis 40)
(defconst g-production-tier 41)
(defconst g-closed-map 42)
(defconst g-assault-cycle 43)
```
Line ~522
```lisp
(set-goal g-wood-crisis 0)
    (set-goal g-stone-crisis 0)
    (set-goal g-production-tier 1)
    (disable-self)
)
```
Line ~1624
```lisp
; ==========================================================================
; V9 PRODUCTION TIER / BUILDER CONTROL
; ==========================================================================
(defrule
```
Line ~1629
```lisp
(goal g-maxpop-le125 1)
=>
    (set-goal g-production-tier 2)
)
(defrule
```
Line ~1635
```lisp
(goal g-maxpop-le150 1)
=>
    (set-goal g-production-tier 3)
)
(defrule
```
Line ~1640
```lisp
(goal g-maxpop-ge151 1)
=>
    (set-goal g-production-tier 4)
)
```
Line ~1869
```lisp
)

; At higher population, start houses earlier so military production does not stall.
(defrule
    (population > 70)
```
Line ~1880
```lisp
)

; V9 high-pop queue buffer. Large 150/200-pop economies can train from many
; buildings simultaneously, so begin extra houses before the 10-slot reserve is gone.
(defrule
```

### Official HD
Line ~10
```lisp
; Standard taunts.
; 33 - Stop slinging resources. If slinging is requested early and is immediately canceled it may mess up the strategy.
; 38 - Sling Resources. Human player only, stops any unit production except for civilian units.
; 100 - Forbids the AI to resign.
; 101 - Cancels the 100 taunt.
```
Line ~32
```lisp
(defconst strategy-goal 3)
(defconst unit-goal 4)
(defconst train-civ-goal 5);1=train villagers, !=1 no villagers
(defconst control-goal 6); 6 = allow to be shot, 7 = shot, also controls if stone for a castle is needed.
(defconst anti-cavalry-threat-goal 7)
```
Line ~141
```lisp
(defconst navy-attack-timer 12); don't spam attack or we can't retreat boats from fortifications
(defconst help-ally-timer 13); indicated when we sent help to ally
(defconst FDrop 14); timer for forcedrop to continuously train villager
(defconst retreat-timer 15); timer to avoid looping retreat unit commands
(defconst hunting-timer 16)
```
Line ~337
```lisp
(defconst magyar 22)
(defconst slavic 23)
(defconst stable-tarkan 886)
(defconst stable-elite-tarkan 887)
(defconst boyar 876)
```
Line ~338
```lisp
(defconst slavic 23)
(defconst stable-tarkan 886)
(defconst stable-elite-tarkan 887)
(defconst boyar 876)
(defconst elite-boyar 878)
```
Line ~423
```lisp
(defconst sling-two 0)
(defconst blot-size 0)
(defconst villager-barracks 3)
(defconst villager-stable 3)
(defconst villager-archery-range 9)
```
Line ~424
```lisp
(defconst blot-size 0)
(defconst villager-barracks 3)
(defconst villager-stable 3)
(defconst villager-archery-range 9)
(defconst villager-monastery 7)
```
Line ~425
```lisp
(defconst villager-barracks 3)
(defconst villager-stable 3)
(defconst villager-archery-range 9)
(defconst villager-monastery 7)
(defconst villager-town-center 15)
```
Line ~430
```lisp
(defconst villager-castle 12)
(defconst villager-mining-camp 14)
(defconst villager-siege-workshop 16)
(defconst villager-market 17)
(defconst number-barracks 10)
```
Line ~432
```lisp
(defconst villager-siege-workshop 16)
(defconst villager-market 17)
(defconst number-barracks 10)
(defconst number-stables 5)
(defconst number-archery-ranges 7)
```

### ResonanceBot 5-1c
Line ~46
```lisp
(defconst female-hunter 216) 
;#load-if-not-defined UP-GAME-AGE2-X2
(defconst barracks-huskarl 759)
(defconst elite-barracks-huskarl 761)
;(defconst huskari 759)
```
Line ~47
```lisp
;#load-if-not-defined UP-GAME-AGE2-X2
(defconst barracks-huskarl 759)
(defconst elite-barracks-huskarl 761)
;(defconst huskari 759)
(defconst stable-tarkan 886)
```
Line ~49
```lisp
(defconst elite-barracks-huskarl 761)
;(defconst huskari 759)
(defconst stable-tarkan 886)
(defconst stable-elite-tarkan 887)
(defconst kamayuk-line 879)
```
Line ~50
```lisp
;(defconst huskari 759)
(defconst stable-tarkan 886)
(defconst stable-elite-tarkan 887)
(defconst kamayuk-line 879)
(defconst elephant-archer-line 873)
```
Line ~404
```lisp
;Timer 13 is for late game global timed free tributes for Hard and Hardest when AI has teammates.
;Timer 14 is for thanking teammates for tributes.
;Timer 15 is for Feudal Age Galley Production.
;Timer 16 is for focusing on a target player. This prevents swapping targets prematurely. 
;Timer 17 is for Attack Now, similar to 5.
```
Line ~553
```lisp
(set-strategic-number sn-gather-defense-units 0)
	(set-strategic-number sn-build-frequency 1)
	(set-strategic-number sn-dock-training-filter 0) ;new, if 1 then only train boats in lakes with enemy ships
	(disable-self)
)
```
Line ~724
```lisp
(game-time < 5) ;new v2.2c
	(cc-players-building-type-count every-enemy town-center >= 1) ;new Patch 5.8 v2.1g
 	(can-train villager)
=>
 	(train villager)
```
Line ~726
```lisp
(can-train villager)
=>
 	(train villager)
	(disable-self) ;only occurs once
)
```
Line ~1156
```lisp
(or(unit-type-count battering-ram-line >= 1)
(unit-type-count mangonel-line >= 2))
(building-type-count-total siege-workshop >= 1)
=>
;(chat-to-all "DEBUG: Disabling TSA temporarily because Siege.")
```
Line ~1738
```lisp
(or(players-unit-type-count any-enemy longboat-line >= 3)
(players-unit-type-count any-enemy cannon-galleon-line >= 2))))))
(can-train fire-ship-line)
(unit-type-count fire-ship-line < 15)
=>
```

### Rehoboam 1.80i
Line ~182
```lisp
(defconst amount-trade-bonus 8)
        (defconst amount-trade-goods 9)
        (defconst amount-trade-production 10)
        (defconst amount-population 11)
        (defconst amount-decay 12)
```
Line ~466
```lisp
; Define ProgressType Constants
        ;--------------------------------------
        (defconst progress-type-train 102)
        (defconst progress-type-research 103)
```
Line ~482
```lisp
(defconst action-delete 8)	;target-point + target-objects
        (defconst action-unload 9)	;target-objects -> action-none
        (defconst action-train 10)	;target-objects -> action-none
        (defconst action-gather 11)	;target-point + target-objects
        (defconst action-lock 12)	;target-objects -> action-none
```
Line ~497
```lisp
; action-work: send villagers back to work

        ; action-train: (up-target-point inGoalEscrowState action-train typeOp inOpTypeId)
        ; inGoalEscrowState must be either 0 for without-escrow or an extended goal from 41-510
```
Line ~545
```lisp
(defconst actionid-enter 617)
        (defconst actionid-repair 618)
        (defconst actionid-train 619)
        (defconst actionid-research 620)
        (defconst actionid-unload 621)
```
Line ~572
```lisp
(defconst orderid-enter 717)
        (defconst orderid-repair 718)
        (defconst orderid-train 719)
        (defconst orderid-research 720)
        (defconst orderid-unload 721)
```
Line ~1471
```lisp
(defconst gl-flank-x 397)
            (defconst gl-flank-y 398)
            (defconst gl-need-barracks 399)
            (defconst gl-sheppard-priority 400)
            (defconst gl-build-first-mill 401)
```
Line ~1480
```lisp
(defconst gl-true-position-self-x 406)
            (defconst gl-true-position-self-y 407)
            (defconst gl-build-barracks 408)
            (defconst gl-build-archery-range 409)
            (defconst gl-build-blacksmith 410)
```
Line ~1481
```lisp
(defconst gl-true-position-self-y 407)
            (defconst gl-build-barracks 408)
            (defconst gl-build-archery-range 409)
            (defconst gl-build-blacksmith 410)
            (defconst gl-wood-saved 411)
```
Line ~1487
```lisp
(defconst gl-cross-testing-counter 413)
            (defconst gl-build-market 414)
            (defconst gl-build-stable 415)
            (defconst gl-new-building-spot-x 416)
            (defconst gl-new-building-spot-y 417)
```

## V12 architectural decisions from the comparison

1. Keep one authoritative age/economy state machine. Old FIX overlays may advise it but must not independently spend protected age-up banks.
2. Split Dark Age food into explicit livestock, boar-lure, boar-kill and farm-release phases. Farms remain blocked until natural food logic deliberately releases them.
3. Use staged boar hunting with a small lure request followed by a larger kill group near the TC, following HD-proven hunting controls rather than permanently high hunter minima.
4. Exploration is persistent and role-based: home/livestock recovery first, then local ring, then enemy reconnaissance. Scout preservation overrides suicidal contact with TC fire.
5. Defense uses threat memory plus a safety-release delay. Villagers only leave shelter after the threat has actually decayed, not merely after a single quiet AI cycle.
6. Walling is a construction program: Feudal palisade shell, Castle stone conversion, gates/chokes, then depth-2/3 lines. Castle reservation cannot silently starve emergency wall repair.
7. Drop-sites are renewable infrastructure. Lumber and mining camps must be added when walking distance degrades, with tighter thresholds on Hardest.
8. Grouping becomes mandatory for normal military responses. Newly trained counters feed defend or rally groups instead of trickling individually into contact.
9. Retreat is an explicit state transition with cooldown/hysteresis. A failed assault reforms before another attack order can fire.
10. Production scales from true configured max population (125/150/200 primary profiles), economic stability and sustained queue demand, not just current housed population.
11. Rehoboam is treated as a broad independent implementation reference. Any imported idea must also pass HD command compatibility and Fortress gameplay intent checks.
12. V12 removes obsolete FIX-specific rules only after their behavior is covered by the new subsystem. Regression safety beats aggressive deletion.
