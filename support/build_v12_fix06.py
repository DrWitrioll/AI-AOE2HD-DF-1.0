from pathlib import Path
import re, hashlib

src=Path('Dr_Fortress_AI_V12_FIX05.per')
out=Path('Dr_Fortress_AI_V12_FIX06.per')
text=src.read_text(encoding='utf-8', errors='strict')

text=text.replace('DOKTOR FORTRESS AI - V12 FORTRESS COMMANDER FIX05','DOKTOR FORTRESS AI - V12 FORTRESS COMMANDER FIX06',1)
needle='; - V12 FIX05 AI-doplnky/Jester review: adopts state ownership, pressure latching, escrow failsafes, strategy reset concepts and pending-object discipline without DE-only DUC\n'
add=(needle+
'; - V12 FIX06 replay-forensic repair: quarantines the opening worker task loop, disables livestock-to-TC herding, restores HD-default idle retry during the opening, and removes competing Hardest Dark-Age economy owners\n'
'; - V12 FIX06 opening is benchmarked against ResonanceBot: immediate house crew, single 40/60 builder-gatherer ownership window, then Fortress economy takes over without repeated worker-role churn\n')
assert needle in text
text=text.replace(needle,add,1)

needle='(defconst g-v12f5-startup 120)\n'
insert=needle+'(defconst g-v12f6-init 121)\n(defconst g-v12f6-opening 122)\n(defconst g-v12f6-taskguard 123)\n'
assert needle in text
text=text.replace(needle,insert,1)

def rule_spans(s):
    spans=[]; n=len(s); i=0
    while True:
        start=s.find('(defrule',i)
        if start<0: break
        depth=0; j=start; in_str=False; in_comment=False
        while j<n:
            ch=s[j]
            if in_comment:
                if ch=='\n': in_comment=False
                j+=1; continue
            if ch=='"':
                in_str=not in_str; j+=1; continue
            if not in_str and ch==';':
                in_comment=True; j+=1; continue
            if not in_str:
                if ch=='(': depth+=1
                elif ch==')':
                    depth-=1
                    if depth==0:
                        spans.append((start,j+1)); i=j+1; break
            j+=1
        else: raise RuntimeError(f'unclosed rule at {start}')
    return spans

remove=[]
for a,b in rule_spans(text):
    r=text[a:b]
    hardest_exact = re.search(r'(?m)^\s*\(difficulty == hardest\)\s*$', r) is not None
    if (hardest_exact and '(current-age == dark-age)' in r and ('sn-food-gatherer-percentage' in r or 'sn-wood-gatherer-percentage' in r or 'sn-gold-gatherer-percentage' in r or 'sn-stone-gatherer-percentage' in r)):
        remove.append((a,b))
    elif (hardest_exact and '(current-age == dark-age)' in r and ('sn-percent-civilian-builders' in r or 'sn-percent-civilian-gatherers' in r)):
        remove.append((a,b))
    elif ('(set-goal g-v12f5-startup' in r and '(current-age == dark-age)' in r and ('sn-percent-civilian-builders' in r or 'sn-percent-civilian-gatherers' in r)):
        remove.append((a,b))
    elif ('(current-age == dark-age)' in r and '(up-retask-gatherers wood c: 1)' in r and '(building-type-count-total lumber-camp >= 1)' in r):
        remove.append((a,b))
for a,b in reversed(remove): text=text[:a]+'\n'+text[b:]

text=text.replace('(set-strategic-number sn-percent-civilian-builders 0)\n    (set-strategic-number sn-cap-civilian-builders 0)\n    (set-strategic-number sn-percent-civilian-gatherers 100)\n    (set-strategic-number sn-cap-civilian-gatherers 100)', '(set-strategic-number sn-percent-civilian-builders 40)\n    (set-strategic-number sn-cap-civilian-builders 25)\n    (set-strategic-number sn-percent-civilian-gatherers 60)\n    (set-strategic-number sn-cap-civilian-gatherers 15)',2)
count_livestock=text.count('(set-strategic-number sn-livestock-to-town-center 1)')
assert count_livestock==3, count_livestock
text=text.replace('(set-strategic-number sn-livestock-to-town-center 1)','(set-strategic-number sn-livestock-to-town-center 0)')
text=text.replace('(set-strategic-number sn-livestock-defend-priority 2)','(set-strategic-number sn-livestock-defend-priority 0)')
assert '(set-strategic-number sn-intelligent-gathering 1)\n    (set-strategic-number sn-retask-gather-amount 50)' in text
text=text.replace('(set-strategic-number sn-intelligent-gathering 1)\n    (set-strategic-number sn-retask-gather-amount 50)','(set-strategic-number sn-intelligent-gathering 0)\n    (set-strategic-number sn-retask-gather-amount 50)',1)
old='''(defrule
    (game-time > 2)
    (population <= 70)
    (housing-headroom < 5)'''
new='''(defrule
    (game-time >= 0)
    (population <= 70)
    (housing-headroom < 5)'''
assert old in text
text=text.replace(old,new,1)

repls=[]
for a,b in rule_spans(text):
    r=text[a:b]
    if '(build barracks)' in r and '(current-age' not in r:
        repls.append((a,b,r.replace('(defrule\n','(defrule\n    (current-age >= feudal-age)\n',1)))
for a,b,rr in reversed(repls): text=text[:a]+rr+text[b:]

marker='; END V12 FIX05 MAJOR STABILIZATION CORE\n'
assert marker in text
block=r'''

; ============================================================================
; V12 FIX06 - REPLAY-FORENSIC OPENING TASK QUARANTINE
; Two short SR replays proved that manual villager MOVE commands were accepted,
; then overwritten in the same AI tick by recurring native WORK orders. The same
; ownership loop transferred to the next villager after DELETE. This block uses
; a single benchmarked opening owner and deliberately avoids DE-only DUC.
; ============================================================================

(defrule
    (goal g-v12f6-init 0)
=>
    (set-goal g-v12f6-init 1)
    (set-goal g-v12f6-opening 0)
    (set-goal g-v12f6-taskguard 1)
    (set-strategic-number sn-livestock-to-town-center 0)
    (set-strategic-number sn-livestock-defend-priority 0)
    (set-strategic-number sn-intelligent-gathering 0)
    (set-strategic-number sn-percent-civilian-explorers 0)
    (set-strategic-number sn-minimum-civilian-explorers 0)
    (set-strategic-number sn-cap-civilian-explorers 0)
    (set-strategic-number sn-total-number-explorers 1)
    (set-strategic-number sn-number-explore-groups 1)
)

(defrule
    (goal g-v12f6-init 1)
    (game-time > 1)
=>
    (set-strategic-number sn-intelligent-gathering 1)
    (set-strategic-number sn-retask-gather-amount 50)
    (set-goal g-v12f6-init 2)
    (disable-self)
)

(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (game-time < 90)
=>
    (set-strategic-number sn-consecutive-idle-unit-limit 15)
    (set-goal g-v12f6-taskguard 1)
)
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (game-time >= 90)
=>
    (set-strategic-number sn-consecutive-idle-unit-limit 1)
    (set-goal g-v12f6-taskguard 2)
)

(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (game-time < 90)
=>
    (set-goal g-v12f6-opening 1)
    (set-strategic-number sn-percent-civilian-builders 40)
    (set-strategic-number sn-percent-civilian-gatherers 60)
    (set-strategic-number sn-cap-civilian-builders 25)
    (set-strategic-number sn-cap-civilian-gatherers 15)
)
(defrule
    (current-age == dark-age)
    (game-time < 30)
=>
    (up-assign-builders c: house c: 2)
)
(defrule
    (current-age == dark-age)
    (game-time >= 30)
=>
    (up-assign-builders c: house c: 1)
)
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (game-time >= 90)
=>
    (set-goal g-v12f6-opening 2)
    (set-strategic-number sn-percent-civilian-builders 18)
    (set-strategic-number sn-percent-civilian-gatherers 82)
    (set-strategic-number sn-cap-civilian-builders 6)
    (set-strategic-number sn-cap-civilian-gatherers 100)
)

(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population <= 6)
=>
    (set-strategic-number sn-food-gatherer-percentage 100)
    (set-strategic-number sn-wood-gatherer-percentage 0)
    (set-strategic-number sn-gold-gatherer-percentage 0)
    (set-strategic-number sn-stone-gatherer-percentage 0)
)
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population >= 7)
    (civilian-population <= 10)
=>
    (set-strategic-number sn-food-gatherer-percentage 70)
    (set-strategic-number sn-wood-gatherer-percentage 30)
    (set-strategic-number sn-gold-gatherer-percentage 0)
    (set-strategic-number sn-stone-gatherer-percentage 0)
)
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population >= 11)
    (civilian-population <= 15)
=>
    (set-strategic-number sn-food-gatherer-percentage 62)
    (set-strategic-number sn-wood-gatherer-percentage 38)
    (set-strategic-number sn-gold-gatherer-percentage 0)
    (set-strategic-number sn-stone-gatherer-percentage 0)
)
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population >= 16)
    (civilian-population <= 18)
=>
    (set-strategic-number sn-food-gatherer-percentage 58)
    (set-strategic-number sn-wood-gatherer-percentage 27)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 10)
)
(defrule
    (difficulty == hardest)
    (current-age == dark-age)
    (civilian-population >= 19)
=>
    (set-strategic-number sn-food-gatherer-percentage 52)
    (set-strategic-number sn-wood-gatherer-percentage 23)
    (set-strategic-number sn-gold-gatherer-percentage 5)
    (set-strategic-number sn-stone-gatherer-percentage 20)
)

(defrule
    (current-age == dark-age)
    (game-time < 90)
=>
    (set-strategic-number sn-enable-boar-hunting 0)
    (set-strategic-number sn-minimum-boar-hunt-group-size 0)
    (set-strategic-number sn-minimum-number-hunters 0)
)

(defrule
    (current-age == dark-age)
=>
    (set-strategic-number sn-livestock-to-town-center 0)
)
'''
text=text.replace(marker,block+'\n; END V12 FIX06 MAJOR STABILIZATION CORE\n',1)

out.write_text(text,encoding='utf-8')
Path('Dr_Fortress_AI_V12_FIX06.ai').write_text('',encoding='utf-8')
base_sha=hashlib.sha256(src.read_bytes()).hexdigest()
assert base_sha == '102148b13418b031a65e70ed402f17939b74658255d82d1dfb36d6bb0a1eafa5', base_sha
out_sha=hashlib.sha256(out.read_bytes()).hexdigest()
assert out_sha == 'd6f748d042406240c492807dece48d49e3c7f1af53195255910fd22985d7ef4c', out_sha
assert text.count('(defrule') == 2665
assert text.count('(set-strategic-number sn-livestock-to-town-center 1)') == 0
assert '(set-strategic-number sn-enable-new-building-system 1)' not in text
assert text.count('#end-if') == 100
assert sum(text.count(x) for x in ['#load-if-defined','#load-if-not-defined']) == 100
print('FIX06 built and SHA verified:', out_sha)
