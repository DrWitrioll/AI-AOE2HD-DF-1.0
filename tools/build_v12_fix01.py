from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "Doktor_Fortress_AI_V11_FIX09.per"
OUT = ROOT / "Doktor_Fortress_AI_V12_FIX01.per"
AI = ROOT / "Doktor_Fortress_AI_V12_FIX01.ai"

text = SRC.read_text(encoding="utf-8")
text = text.replace(
    "; DOKTOR FORTRESS AI - V11 FORTRESS COMMANDER FIXED9",
    "; DOKTOR FORTRESS AI - V12 FORTRESS COMMANDER FIX01",
    1,
)
text = text.replace(
    "; Tuned for a slower, fortress-heavy, decision-oriented ruleset.",
    "; V12 generation: unified food/age/defense arbitration over the proven V11 Fortress core.\n"
    "; Tuned for a slower, fortress-heavy, decision-oriented ruleset.",
    1,
)
needle = "(defconst g-fastcastle-reserve 102)"
insert = """(defconst g-fastcastle-reserve 102)

; V12 FIX01 core arbitration goals.
; 103+ are deliberately new goal IDs so V11 state remains readable during regression.
(defconst g-v12-core 103)
(defconst g-v12-food-phase 104)      ; 0 livestock, 1 lure, 2 support, 3 kill, 4 general hunt
(defconst g-v12-age-bank 105)        ; 0 free, 1 protected Castle bank, 2 Imperial bank
(defconst g-v12-defense-latch 106)   ; town threat currently owns priorities
(defconst g-v12-reform 107)          ; assault aborted / army reforming
(defconst g-v12-observation-tier 108)
(defconst g-v12-drop-tier 109)
(defconst g-v12-production-tier 110)
"""
if needle not in text:
    raise SystemExit("Could not locate V11 fast-castle goal marker")
text = text.replace(needle, insert, 1)

v12 = r'''

; ============================================================================
; V12 FIX01 CORE ARBITRATION LAYER
; ============================================================================
; This block is intentionally last in the rule file. V11/FIX09 remains the
; regression-safe strategic body, while V12 owns the final values for opening,
; food/hunting, protected age banking, observation depth and renewable dropsites.
; After replay validation, superseded V11 overlays can be physically removed.

; -----------------------------
; V12 one-time state initialization
; -----------------------------
(defrule
    (goal g-v12-core 0)
=>
    (set-goal g-v12-food-phase 0)
    (set-goal g-v12-age-bank 0)
    (set-goal g-v12-defense-latch 0)
    (set-goal g-v12-reform 0)
    (set-goal g-v12-observation-tier 0)
    (set-goal g-v12-drop-tier 0)
    (set-goal g-v12-production-tier 1)
    (set-strategic-number sn-livestock-to-town-center 1)
    (set-strategic-number sn-percent-civilian-explorers 0)
    (set-strategic-number sn-minimum-civilian-explorers 0)
    (set-goal g-v12-core 1)
)

; -----------------------------
; V12 livestock / boar state machine
; Official-HD pattern: one lure hunter, small support, full group only near TC.
; This prevents HD's hunter request from permanently draining other resources.
; -----------------------------
(defrule
    (current-age == dark-age)
    (goal g-v12-food-phase 0)
    (game-time < 420)
=>
    (set-strategic-number sn-livestock-to-town-center 1)
    (set-strategic-number sn-enable-boar-hunting 0)
    (set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
)

(defrule
    (current-age == dark-age)
    (goal g-v12-food-phase 0)
    (game-time >= 420)
    (civilian-population >= 12)
    (dropsite-min-distance live-boar >= 0)
    (dropsite-min-distance live-boar <= 32)
=>
    (set-goal g-v12-food-phase 1)
    (set-strategic-number sn-enable-boar-hunting 2)
    (set-strategic-number sn-minimum-boar-hunt-group-size 1)
    (set-strategic-number sn-minimum-number-hunters 1)
    (up-request-hunters c: 1)
)

(defrule
    (current-age == dark-age)
    (goal g-v12-food-phase 1)
    (dropsite-min-distance live-boar >= 0)
    (dropsite-min-distance live-boar <= 16)
=>
    (set-goal g-v12-food-phase 2)
    (set-strategic-number sn-minimum-boar-hunt-group-size 1)
    (set-strategic-number sn-minimum-number-hunters 2)
    (up-request-hunters c: 1)
)

(defrule
    (current-age == dark-age)
    (goal g-v12-food-phase 2)
    (dropsite-min-distance live-boar >= 0)
    (dropsite-min-distance live-boar <= 10)
=>
    (set-goal g-v12-food-phase 3)
    (set-strategic-number sn-minimum-boar-hunt-group-size 7)
    (set-strategic-number sn-minimum-number-hunters 7)
    (up-retask-gatherers food c: 1)
    (up-request-hunters c: 6)
)

(defrule
    (current-age == dark-age)
    (goal g-v12-food-phase 3)
    (or (dropsite-min-distance live-boar > 32)
        (dropsite-min-distance live-boar <= -1))
=>
    (set-goal g-v12-food-phase 4)
    (set-strategic-number sn-enable-boar-hunting 1)
    (set-strategic-number sn-minimum-boar-hunt-group-size 2)
    (set-strategic-number sn-minimum-number-hunters 2)
)

(defrule
    (current-age >= feudal-age)
    (goal g-v12-food-phase < 4)
=>
    (set-goal g-v12-food-phase 4)
    (set-strategic-number sn-enable-boar-hunting 1)
    (set-strategic-number sn-minimum-boar-hunt-group-size 2)
    (set-strategic-number sn-minimum-number-hunters 2)
)

; -----------------------------
; V12 authoritative Dark-Age economy
; Hardest reaches the requested real stone commitment only after the opening is stable.
; Approx. 20% stone from 16+ civilians yields 3-4 miners and scales upward naturally.
; -----------------------------
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population < 8)
=>
    (set-strategic-number sn-food-gatherer-percentage 70)
    (set-strategic-number sn-wood-gatherer-percentage 25)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 0)
)

(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population >= 8)
    (civilian-population < 16)
=>
    (set-strategic-number sn-food-gatherer-percentage 62)
    (set-strategic-number sn-wood-gatherer-percentage 28)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 5)
)

(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population >= 16)
=>
    (set-strategic-number sn-food-gatherer-percentage 50)
    (set-strategic-number sn-wood-gatherer-percentage 25)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 20)
)

(defrule
    (difficulty == hard)
    (current-age == dark-age)
    (civilian-population >= 16)
=>
    (set-strategic-number sn-food-gatherer-percentage 52)
    (set-strategic-number sn-wood-gatherer-percentage 28)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 15)
)

(defrule
    (difficulty == moderate)
    (current-age == dark-age)
    (civilian-population >= 16)
=>
    (set-strategic-number sn-food-gatherer-percentage 55)
    (set-strategic-number sn-wood-gatherer-percentage 30)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 10)
)

; -----------------------------
; V12 protected age bank arbitration
; One state represents the strategic commitment. Emergency defense may still spend.
; -----------------------------
(defrule
    (current-age == feudal-age)
    (goal g-fastcastle-reserve >= 1)
    (goal g-fastcastle-reserve <= 2)
=>
    (set-goal g-v12-age-bank 1)
)

(defrule
    (current-age == castle-age)
    (goal g-v12-age-bank 1)
=>
    (set-goal g-v12-age-bank 0)
)

(defrule
    (current-age == castle-age)
    (goal g-imperial-reserve 1)
=>
    (set-goal g-v12-age-bank 2)
)

(defrule
    (current-age == imperial-age)
    (goal g-v12-age-bank 2)
=>
    (set-goal g-v12-age-bank 0)
)

(defrule
    (difficulty == hardest)
    (current-age == feudal-age)
    (goal g-water 0)
    (goal g-v12-age-bank 1)
    (goal g-v12-defense-latch 0)
=>
    (set-strategic-number sn-food-gatherer-percentage 52)
    (set-strategic-number sn-wood-gatherer-percentage 28)
    (set-strategic-number sn-gold-gatherer-percentage 18)
    (set-strategic-number sn-stone-gatherer-percentage 2)
)

; -----------------------------
; V12 defense latch
; Town danger owns local priorities and suppresses scouting until the existing
; FIX09 safety/recovery mechanisms have released the emergency state.
; -----------------------------
(defrule
    (town-under-attack)
=>
    (set-goal g-v12-defense-latch 1)
    (set-strategic-number sn-number-explore-groups 0)
    (set-strategic-number sn-percent-enemy-sighted-response 100)
    (set-strategic-number sn-enemy-sighted-response-distance 45)
)

(defrule
    (goal g-v12-defense-latch 1)
    (not (town-under-attack))
    (goal g-emergency-defense 0)
    (goal g-recovery 0)
=>
    (set-goal g-v12-defense-latch 0)
)

(defrule
    (goal g-v12-defense-latch 0)
    (goal g-scout-phase 1)
    (or (unit-type-count scout-cavalry-line >= 1)
        (unit-type-count eagle-warrior-line >= 1))
=>
    (set-strategic-number sn-total-number-explorers 1)
    (set-strategic-number sn-number-explore-groups 1)
    (set-strategic-number sn-minimum-explore-group-size 1)
    (set-strategic-number sn-maximum-explore-group-size 1)
    (set-strategic-number sn-livestock-to-town-center 1)
)

; -----------------------------
; V12 observation network
; Hardest target: >=4 Feudal, >=8 Castle, <=15 Imperial.
; Only one pending post at a time prevents the old tower-burst pathology.
; -----------------------------
(defrule
    (difficulty == hardest)
    (current-age == feudal-age)
    (building-type-count-total fortress-outpost < 4)
    (wood-amount > 125)
    (up-pending-objects c: fortress-outpost < 1)
    (can-build fortress-outpost)
=>
    (set-goal g-v12-observation-tier 1)
    (build-forward fortress-outpost)
)

(defrule
    (difficulty == hardest)
    (current-age == castle-age)
    (building-type-count-total fortress-outpost < 8)
    (wood-amount > 180)
    (up-pending-objects c: fortress-outpost < 1)
    (can-build fortress-outpost)
=>
    (set-goal g-v12-observation-tier 2)
    (build-forward fortress-outpost)
)

(defrule
    (difficulty == hardest)
    (current-age == imperial-age)
    (building-type-count-total fortress-outpost < 15)
    (wood-amount > 250)
    (up-pending-objects c: fortress-outpost < 1)
    (can-build fortress-outpost)
=>
    (set-goal g-v12-observation-tier 3)
    (build-forward fortress-outpost)
)

; Moderate keeps a smaller reconnaissance network.
(defrule
    (difficulty == moderate)
    (current-age >= feudal-age)
    (building-type-count-total fortress-outpost < 2)
    (wood-amount > 160)
    (up-pending-objects c: fortress-outpost < 1)
    (can-build fortress-outpost)
=>
    (build fortress-outpost)
)

; -----------------------------
; V12 renewable dropsites
; Counts are minimum infrastructure targets, distance SNs remain the primary
; walking-efficiency mechanism inherited from Official-HD/FIX09.
; -----------------------------
(defrule
    (difficulty == hardest)
    (current-age == feudal-age)
    (civilian-population >= 16)
    (building-type-count-total lumber-camp < 2)
    (wood-amount > 120)
    (up-pending-objects c: lumber-camp < 1)
    (can-build lumber-camp)
=>
    (set-goal g-v12-drop-tier 1)
    (build lumber-camp)
)

(defrule
    (difficulty == hardest)
    (current-age == castle-age)
    (civilian-population >= 36)
    (building-type-count-total lumber-camp < 4)
    (wood-amount > 180)
    (up-pending-objects c: lumber-camp < 1)
    (can-build lumber-camp)
=>
    (set-goal g-v12-drop-tier 2)
    (build lumber-camp)
)

(defrule
    (difficulty == hardest)
    (current-age == imperial-age)
    (civilian-population >= 55)
    (building-type-count-total lumber-camp < 5)
    (wood-amount > 250)
    (up-pending-objects c: lumber-camp < 1)
    (can-build lumber-camp)
=>
    (set-goal g-v12-drop-tier 3)
    (build lumber-camp)
)

(defrule
    (difficulty == hardest)
    (current-age >= castle-age)
    (civilian-population >= 34)
    (building-type-count-total mining-camp < 3)
    (wood-amount > 170)
    (up-pending-objects c: mining-camp < 1)
    (can-build mining-camp)
=>
    (build mining-camp)
)

(defrule
    (difficulty == hardest)
    (current-age == feudal-age)
=>
    (set-strategic-number sn-maximum-wood-drop-distance 7)
    (set-strategic-number sn-wood-dropsite-distance 5)
    (set-strategic-number sn-maximum-gold-drop-distance 8)
    (set-strategic-number sn-maximum-stone-drop-distance 8)
)

(defrule
    (difficulty == hardest)
    (current-age >= castle-age)
=>
    (set-strategic-number sn-maximum-wood-drop-distance 8)
    (set-strategic-number sn-wood-dropsite-distance 5)
    (set-strategic-number sn-maximum-gold-drop-distance 9)
    (set-strategic-number sn-maximum-stone-drop-distance 9)
)

; -----------------------------
; V12 reform / retreat hysteresis bridge
; Existing V11 attrition and recovery detection remains authoritative for the
; tactical command itself. V12 prevents immediate return to assault posture.
; -----------------------------
(defrule
    (or (goal g-assault-attrition 1)
        (goal g-recovery 1))
=>
    (set-goal g-v12-reform 1)
    (set-goal g-assault-window 0)
)

(defrule
    (goal g-v12-reform 1)
    (goal g-assault-attrition 0)
    (goal g-recovery 0)
    (goal g-army-established 1)
=>
    (set-goal g-v12-reform 0)
)

(defrule
    (goal g-v12-reform 1)
    (goal g-war-state state-assault)
=>
    (set-goal g-war-state state-mobilize)
    (set-goal g-assault-window 0)
)

; -----------------------------
; V12 max-pop production depth guardrails
; This layer adjusts infrastructure pressure, not civilization composition.
; Doctrine/civ matrices still choose the units.
; -----------------------------
(defrule
    (goal g-maxpop-ge101 1)
    (goal g-maxpop-le125 1)
    (current-age >= castle-age)
=>
    (set-goal g-v12-production-tier 2)
)

(defrule
    (goal g-maxpop-ge126 1)
    (goal g-maxpop-le150 1)
    (current-age >= castle-age)
=>
    (set-goal g-v12-production-tier 3)
)

(defrule
    (goal g-maxpop-ge151 1)
    (current-age >= castle-age)
=>
    (set-goal g-v12-production-tier 4)
)

; End V12 FIX01 core arbitration layer.
'''

text = text.rstrip() + v12 + "\n"
OUT.write_text(text, encoding="utf-8")
AI.write_text("", encoding="utf-8")

# Cheap but useful CI guards. They catch most accidental build-script damage.
raw = OUT.read_text(encoding="utf-8")
if raw.count("(") != raw.count(")"):
    raise SystemExit(f"Parenthesis imbalance: {raw.count('(')} open / {raw.count(')')} close")
if "DOKTOR FORTRESS AI - V12 FORTRESS COMMANDER FIX01" not in raw:
    raise SystemExit("V12 header missing")
if raw.count("(defconst g-v12-core 103)") != 1:
    raise SystemExit("V12 constants duplicated or missing")
if len(raw) <= len(SRC.read_text(encoding="utf-8")):
    raise SystemExit("V12 output unexpectedly did not grow")

# Detect obviously oversized V12 rules by counting non-comment forms. This is
# intentionally conservative; legacy V11 rules are left untouched.
section = raw.split("; V12 FIX01 CORE ARBITRATION LAYER", 1)[1]
for idx, block in enumerate(re.findall(r"\(defrule\b.*?\n\)", section, re.S), 1):
    forms = [ln.strip() for ln in block.splitlines() if ln.strip().startswith("(") and not ln.strip().startswith("(defrule")]
    if len(forms) > 16:
        raise SystemExit(f"V12 rule {idx} exceeds conservative 16-form guard: {len(forms)}")

print(f"Built {OUT.name}: {len(raw):,} chars")
print(f"V12 rules appended: {section.count('(defrule')}")
