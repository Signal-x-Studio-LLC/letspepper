#!/usr/bin/env python3
"""
Process Firefly downloads — move, rename, generate IG variants.

Usage:
    python3 social/process-firefly.py                 # process all Firefly_*.jpg in ~/Downloads
    python3 social/process-firefly.py p03 p04         # also generate variants for already-renamed assets

Workflow:
    1. Generate in firefly.adobe.com
    2. Click Download — file lands in ~/Downloads as "Firefly_..."
    3. Run this script — files move to social/exports/firefly/ with prompt-id slug
       and variants/ gets square/feed/story versions

The script matches Firefly filenames against known prompt fingerprints below.
Add new fingerprints as you create new prompts.
"""
import os
import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DL = Path.home() / "Downloads"
DEST = ROOT / "social" / "exports" / "firefly"
VARIANTS_DIR = DEST / "variants"

# Map: prompt-id -> regex fingerprint (case-insensitive substring of Firefly filename)
FINGERPRINTS = {
    "p01-season-hero":      r"three pepper silhouettes, centered",
    "p01-alt-still-life":   r"three pepper silhouettes, lower third",
    "p02-throwback-title":  r"reel title card.*close-up of a single bell pepper",
    "p02b-throwback-mid":   r"medium shot of a bell pepper on dark weathered wood",
    "p02c-throwback-peak":  r"reel peak-energy frame|aggressive orange and red streaks",
    "p03-throwback-end":    r"empty atmospheric frame.*green.*radial gradient",
    "p04a-quiz-habanero":   r"single stylized habanero pepper centered",
    "p04b-quiz-ghost":      r"ghost pepper.*bhut jolokia",
    "p04c-quiz-jalapeno":   r"single stylized jalape.o.*centered",
    "p04d-quiz-bell":       r"single stylized bell pepper.*centered.*green rim",
    "p04e-stat-habanero":   r"quiz stat card.*habanero silhouette",
    "p04f-stat-reaper":     r"carolina reaper silhouette",
    "p04g-stat-secret":     r"rare secret result|unidentified pepper silhouette",
    "p05-hot-takes-fire":   r"abstract fire and smoke background",
    "p14-eve-dew":          r"dew-covered grass at dawn",
    "p17-champion-fallback": r"champion reveal hero frame.*laurel wreath",
}

VARIANTS = [
    ("square", 1080, 1080),
    ("feed",   1080, 1350),
    ("story",  1080, 1920),
]
BG = (10, 10, 10)  # near-black #0a0a0a


def match_fingerprint(filename: str):
    name = filename.lower()
    for slug, pattern in FINGERPRINTS.items():
        if re.search(pattern.lower(), name):
            return slug
    return None


def move_and_rename():
    moved = []
    for f in sorted(DL.glob("Firefly_*.jpg")):
        slug = match_fingerprint(f.name)
        if not slug:
            print(f"SKIP (no fingerprint match): {f.name}")
            continue
        dest = DEST / f"{slug}.jpg"
        if dest.exists():
            print(f"REPLACE: {dest.name} (existing will be overwritten)")
            dest.unlink()
        f.rename(dest)
        print(f"MOVED:   {f.name[:60]}... -> {dest.name}")
        moved.append(slug)
    return moved


def generate_variants(slug: str):
    src_path = DEST / f"{slug}.jpg"
    if not src_path.exists():
        print(f"MISSING: {src_path.name}")
        return
    src = Image.open(src_path).convert("RGB")
    sw, sh = src.size
    print(f"\n{slug} ({sw}x{sh})")

    for variant, tw, th in VARIANTS:
        scale = tw / sw
        new_w = tw
        new_h = int(round(sh * scale))
        scaled = src.resize((new_w, new_h), Image.LANCZOS)

        canvas = Image.new("RGB", (tw, th), BG)
        if new_h <= th:
            canvas.paste(scaled, (0, (th - new_h) // 2))
        else:
            crop_y = (new_h - th) // 2
            canvas.paste(scaled.crop((0, crop_y, tw, crop_y + th)), (0, 0))

        out = VARIANTS_DIR / f"{slug}-{variant}.jpg"
        canvas.save(out, "JPEG", quality=92, optimize=True)
        kb = out.stat().st_size / 1024
        print(f"  -> {out.relative_to(ROOT)}  ({tw}x{th}, {kb:.0f} KB)")


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    VARIANTS_DIR.mkdir(parents=True, exist_ok=True)

    explicit = sys.argv[1:]
    moved = move_and_rename()

    targets = list(dict.fromkeys(moved + explicit))
    if not targets:
        print("\nNothing to process. Exiting.")
        return

    for slug in targets:
        generate_variants(slug)

    print(f"\nDone. {len(targets)} asset(s) processed.")


if __name__ == "__main__":
    main()
