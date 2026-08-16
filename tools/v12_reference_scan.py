from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
FILES = {
    "FIX09": ROOT / "Doktor_Fortress_AI_V11_FIX09.per",
    "Official HD": ROOT / "Age of empires II AI Scripting",
    "ResonanceBot 5-1c": ROOT / "ResonanceBot 5-1c.per",
    "Rehoboam 1.80i": ROOT / "Rehoboam_1.80i.per",
}
CATEGORIES = {
    "opening": ["dark age", "opening", "train villager", "train villager-line", "villager <", "villager <=", "housing-headroom", "house"],
    "sheep": ["sheep", "shepherd", "livestock", "domestic"],
    "boar": ["boar", "hunt", "hunter", "minimum-number-hunters", "enable-boar-hunting"],
    "scouting": ["scout", "explor", "recon", "outpost", "tc-dodging", "wild-animal-exploration"],
    "defense": ["under-attack", "defend", "threat", "emergency", "garrison", "civilian-militia"],
    "walling": ["wall", "palisade", "gate", "tower", "castle", "fortif"],
    "economy": ["food", "wood", "gold", "stone", "farm", "escrow", "resource"],
    "drop-sites": ["lumber-camp", "mining-camp", "mill", "dropsite", "drop-distance"],
    "age-up": ["feudal", "castle age", "imperial", "can-research castle-age", "can-research imperial-age", "advance", "fastcastle"],
    "grouping": ["group", "attack-soldier", "defend-soldier", "patrol", "rally"],
    "retreat": ["retreat", "fallback", "regroup", "attack-status"],
    "production": ["barracks", "archery-range", "stable", "siege-workshop", "train ", "production"],
}


def read_text(path: Path) -> str:
    raw = path.read_bytes()
    # Rehoboam is large and may contain a BOM or non-UTF8 bytes in some releases.
    return raw.decode("utf-8", errors="replace")


def rule_count(text: str) -> int:
    return len(re.findall(r"\(defrule\b", text, flags=re.I))


def snippets(text: str, terms, limit=10):
    lines = text.splitlines()
    hits = []
    seen = set()
    for i, line in enumerate(lines):
        low = line.lower()
        if any(term.lower() in low for term in terms):
            key = re.sub(r"\s+", " ", line.strip().lower())
            if not key or key in seen:
                continue
            seen.add(key)
            start = max(0, i - 2)
            end = min(len(lines), i + 3)
            block = "\n".join(lines[start:end]).strip()
            if block:
                hits.append((i + 1, block))
            if len(hits) >= limit:
                break
    return hits


def metric(text: str, terms):
    lower = text.lower()
    return sum(lower.count(t.lower()) for t in terms)


texts = {name: read_text(path) for name, path in FILES.items()}

out = []
out.append("# Doktor Fortress AI V12 - reference scan")
out.append("")
out.append("Generated automatically from the four source scripts in this repository. The report is evidence collection, not a blind copy plan. V12 keeps Fortress doctrine and uses the other AIs to identify HD-proven implementation patterns.")
out.append("")
out.append("## Source inventory")
out.append("")
out.append("| Source | Bytes | Lines | defrule count |")
out.append("|---|---:|---:|---:|")
for name, path in FILES.items():
    text = texts[name]
    out.append(f"| {name} | {path.stat().st_size:,} | {len(text.splitlines()):,} | {rule_count(text):,} |")

out.append("")
out.append("## Keyword density by subsystem")
out.append("")
out.append("Counts are only a navigation aid. They show where a source has substantial code touching a subsystem.")
out.append("")
out.append("| Subsystem | FIX09 | Official HD | Resonance | Rehoboam |")
out.append("|---|---:|---:|---:|---:|")
for cat, terms in CATEGORIES.items():
    vals = [metric(texts[n], terms) for n in FILES]
    out.append(f"| {cat} | {vals[0]} | {vals[1]} | {vals[2]} | {vals[3]} |")

for cat, terms in CATEGORIES.items():
    out.append("")
    out.append(f"## {cat}")
    out.append("")
    for name in FILES:
        out.append(f"### {name}")
        hits = snippets(texts[name], terms)
        if not hits:
            out.append("No direct keyword hit captured in the first-pass sample.")
            out.append("")
            continue
        for line_no, block in hits:
            out.append(f"Line ~{line_no}")
            out.append("```lisp")
            out.append(block)
            out.append("```")
        out.append("")

out.append("## V12 architectural decisions from the comparison")
out.append("")
out.append("1. Keep one authoritative age/economy state machine. Old FIX overlays may advise it but must not independently spend protected age-up banks.")
out.append("2. Split Dark Age food into explicit livestock, boar-lure, boar-kill and farm-release phases. Farms remain blocked until natural food logic deliberately releases them.")
out.append("3. Use staged boar hunting with a small lure request followed by a larger kill group near the TC, following HD-proven hunting controls rather than permanently high hunter minima.")
out.append("4. Exploration is persistent and role-based: home/livestock recovery first, then local ring, then enemy reconnaissance. Scout preservation overrides suicidal contact with TC fire.")
out.append("5. Defense uses threat memory plus a safety-release delay. Villagers only leave shelter after the threat has actually decayed, not merely after a single quiet AI cycle.")
out.append("6. Walling is a construction program: Feudal palisade shell, Castle stone conversion, gates/chokes, then depth-2/3 lines. Castle reservation cannot silently starve emergency wall repair.")
out.append("7. Drop-sites are renewable infrastructure. Lumber and mining camps must be added when walking distance degrades, with tighter thresholds on Hardest.")
out.append("8. Grouping becomes mandatory for normal military responses. Newly trained counters feed defend or rally groups instead of trickling individually into contact.")
out.append("9. Retreat is an explicit state transition with cooldown/hysteresis. A failed assault reforms before another attack order can fire.")
out.append("10. Production scales from true configured max population (125/150/200 primary profiles), economic stability and sustained queue demand, not just current housed population.")
out.append("11. Rehoboam is treated as a broad independent implementation reference. Any imported idea must also pass HD command compatibility and Fortress gameplay intent checks.")
out.append("12. V12 removes obsolete FIX-specific rules only after their behavior is covered by the new subsystem. Regression safety beats aggressive deletion.")

out_path = ROOT / "research" / "V12_REFERENCE_SCAN.md"
out_path.parent.mkdir(exist_ok=True)
out_path.write_text("\n".join(out) + "\n", encoding="utf-8")
print(out_path)
