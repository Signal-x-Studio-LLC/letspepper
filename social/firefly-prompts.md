# Firefly Prompts — Bell Pepper Open 2026

Campaign: Apr 21 – Jun 13, 2026. Event: Jun 6.
Firefly promo (unlimited generation) ends **May 20, 2026** — generate everything by then.

Source briefs: `BellPepperOpen_2026_AssetGenerationPlan.md`, `BellPepperOpen_2026_Campaign.html`.

---

## Setup (one-time)

**Models:**
- `FLUX.2 [pro]` — default for atmospheric/silhouette work
- `Firefly Image 5` — fallback when Flux hallucinates text
- `Ideogram 3` — bingo icons
- `Google Veo 3.1 Fast` — videos

**Avoid** `FLUX1.1 [pro] Ultra Raw` (strips atmosphere).

**Aspect ratio:** if 4:5 preset is missing, pick `Tall (2:3)` — I'll crop after download. For Stories/Reels (9:16), `Tall (2:3)` is closest.

**Reference images (revised after P01 v2 testing):**
- **Attach R1 (`public/images/mascots/bell-pepper-logo.png`)** for graphic/stencil/flat-illustration prompts — it pushes Flux toward outline-stencil aesthetic and away from photoreal default. Use for: **P01, P04e/f/g stat cards, P17 champion fallback**.
- **No reference** for photoreal/atmospheric prompts where you want cinematic depth. Use for: **P02/P02b/P02c Throwback, P03 end card, P04a–d quiz reveals, P05 fire texture, P14 dew frame, P15/P16 videos**.
- **No reference** for Ideogram 3 prompts (P06–P13 bingo icons) — Ideogram handles stencil natively.
- Earlier guidance said drop references universally. That was wrong for graphic work. Corrected.

**Credit counter:** should read "Uses 0 credits" during the promo window.

**Character budget:** every prompt below is **under 700 characters** to fit Firefly's input cap. If Firefly silently truncates on paste, drop trailing sentences until it fits. The `Uses 0 credits` bar showing doesn't guarantee the full prompt was accepted — watch the preview.

**Each prompt block is a single copy-paste.** No assembly.

---

## P01 — Season Announcement hero
`FLUX.2 [pro]` · Standard 4:5 · **attach R1** (`bell-pepper-logo.png`)
→ `social/exports/firefly/p01-season-hero.png`

```
Three pepper silhouettes, centered, left-to-right with spacing. Flat black cutouts with thin rim-light outlines only, vinyl-sticker style — not photography.
LEFT bell pepper: stout, four-lobed, rounded bottom, short and wide. Thin GREEN #4ade80 outline.
MIDDLE jalapeño: long, smooth, straight body with a gentle taper to a rounded tip — like a finger, not a bulb. Thin ORANGE #f97316 outline (orange, not red).
RIGHT poblano: long heart-shape tapering to a clear point at the bottom — like an arrowhead. Longer than the jalapeño. Thin YELLOW #facc15 outline.
Background: flat near-black #0a0a0a, subtle radial gradient of the three heat colors at 10%, film grain 3%. Upper third: empty for text overlay. Cinematic streetwear poster. No text, letters, numbers, or logos.
```

---

## P02 — Throwback Reel title card (Apr 24)
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p02-throwback-title.png`

Beat: *"Last summer we started something"*

```
Reel title card. Extreme close-up of a single bell pepper, low-key lighting, one GREEN #4ade80 rim-light on the left side. Pepper sits as a dark silhouette in the lower-right third with minimal visible texture. Rest of frame: deep near-black #0a0a0a negative space. Subtle green atmospheric haze near the pepper. Heavy film grain. Moody documentary style, anticipatory — the moment before the season starts. Dark streetwear athletic aesthetic. No text, letters, numbers, or logos.
```

---

## P02b — Throwback Reel midpoint *(optional)*
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p02b-throwback-mid.png`

Beat: *"This summer we're running it back"*

```
Medium shot of a bell pepper on dark weathered wood, slight low angle. Warm GREEN #4ade80 accent light raking from the left. Atmospheric haze building. Slight motion blur at the edges, camera starting to move. Deep near-black #0a0a0a background with a faint green vignette. Upper half: empty negative space for text overlay. Documentary sports-film grain, streetwear athletic, dark and moody — tempo picking up. No text, letters, numbers, or logos.
```

---

## P02c — Throwback Reel peak *(optional)*
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p02c-throwback-peak.png`

Beat: *"Bigger. Louder. Spicier."*

```
Reel peak-energy frame. Abstract heat and motion on a dark near-black #0a0a0a background. Aggressive ORANGE #f97316 and RED #ef4444 streaks radiating outward from the center like motion trails from a volleyball spike. Heavy grain, high contrast. A single pepper silhouette partially obscured by the energy, caught mid-impact. Intense heat-color rim-lighting. Center: negative space for bold text overlay. Adrenaline beat, streetwear athletic. No text, letters, numbers, or logos.
```

> Skip P02b/P02c if you're keeping the Reel pure real footage with plain text over Flickday clips.

---

## P03 — Throwback Reel end card (Apr 24)
`Firefly Image 5` · Tall 2:3 · no reference
→ `social/exports/firefly/p03-throwback-end.png`

```
Empty atmospheric frame. Dark near-black #0a0a0a background with a subtle GREEN #4ade80 radial gradient glow from the center. Faint chalk-like texture overlay. Completely empty composition — a backdrop for overlay text to be added later. Slight vignette around edges. Cinematic, anticipatory, streetwear athletic. No text, letters, numbers, or logos.
```

---

## P04a — Quiz reveal: Habanero (May 1)
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p04a-quiz-habanero.png`

```
Quiz reveal frame. Single stylized habanero pepper centered in the lower half, dramatic RED #ef4444 rim-light on one side. Pepper as sculpted silhouette — mostly black body with red rim-lighting defining its shape. Deep near-black #0a0a0a background. Subtle red smoke and heat haze radiating from the pepper. Upper half: empty negative space for overlay text. Cinematic, dramatic, lore-like reveal. Dark streetwear athletic. No text, letters, numbers, or logos.
```

---

## P04b — Quiz reveal: Ghost pepper
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p04b-quiz-ghost.png`

Paste P04a's prompt. Replace **habanero pepper** → **ghost pepper (bhut jolokia — wrinkled, narrow, twisted)**.

---

## P04c — Quiz reveal: Jalapeño
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p04c-quiz-jalapeno.png`

Paste P04a. Replace:
- **habanero pepper** → **jalapeño**
- **RED #ef4444** → **ORANGE #f97316 (orange, not red)**
- **red smoke and heat haze** → **orange heat haze**

---

## P04d — Quiz reveal: Bell pepper
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p04d-quiz-bell.png`

Paste P04a. Replace:
- **habanero pepper** → **bell pepper (stout, four-lobed, wide)**
- **RED #ef4444** → **GREEN #4ade80**
- **red smoke and heat haze** → **cool green atmospheric haze**

---

## P04e — Quiz stat card: "61% Habanero"
`Ideogram 3` · Standard 4:5 · no reference *(Ideogram handles stencil natively)*
→ `social/exports/firefly/p04e-stat-habanero.png`

```
Quiz stat card. Left third of frame: large stylized habanero silhouette, spray-paint stencil style, with a RED #ef4444 rim-light glow. Right two-thirds: empty dark negative space for text overlay to be added later. Background: deep near-black #0a0a0a with a subtle red radial haze emanating from the pepper. Bold graphic poster aesthetic, not photography. Streetwear stencil. No text, letters, numbers, or percentages in the image.
```

---

## P04f — Quiz stat card: "3% Reaper"
`Ideogram 3` · Tall 2:3 · no reference
→ `social/exports/firefly/p04f-stat-reaper.png`

Paste P04e. Replace **habanero silhouette** → **Carolina Reaper silhouette (wrinkled, scorpion-tail stinger)** and append **Add a few glowing ember particles drifting upward.** at the end.

---

## P04g — Quiz stat card: "1 found the secret"
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p04g-stat-secret.png`

```
Reveal frame for a rare secret result. Centered composition. Single dimly-lit unidentified pepper silhouette completely obscured by deep shadow, except for a thin purple-red rim-light tracing its outline. Faint smoke curling around the pepper. Deep near-black #0a0a0a background. Upper half: empty negative space for overlay text. Mysterious, lore-like — the "found, not earned" mood. Dark streetwear atmospheric. No text, letters, numbers, or logos.
```

---

## P05 — Hot Takes fire/smoke texture (May 5)
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p05-hot-takes-fire.png`

```
Abstract fire and smoke background for text overlay. Deep reds, oranges, and dark ember tones against a near-black #0a0a0a background. Subtle and atmospheric — NOT literal flames — heat haze, smoke drift, glowing embers rising slowly from the bottom. Heavy film grain. The texture occupies only the lower third; upper 70% of the frame stays dark and empty for text overlay. Moody, cinematic, streetwear-adjacent. No text, letters, numbers, or logos.
```

---

## P06–P13 — Bingo square icons (May 29)

**Eight icons, same prompt, one subject swap.**

`Ideogram 3` · Square 1:1 · no reference

Paste this and replace `[SUBJECT]` per icon:

```
Single minimalist illustration of [SUBJECT]. Bold graphic stencil style — spray-painted stencil or skate-sticker aesthetic, not photography. Flat colors only, no gradients. Heavy black outline. Centered subject with 20% padding on all sides. Deep near-black #0a0a0a background. Palette: green #4ade80, orange #f97316, yellow #facc15, or white. No text, letters, numbers, or logos in the image.
```

| # | Filename | `[SUBJECT]` |
|---|---|---|
| P06 | `p06-bingo-spike.png` | a volleyball spike silhouette mid-swing |
| P07 | `p07-bingo-pepper-shades.png` | a cartoon bell pepper wearing sunglasses |
| P08 | `p08-bingo-cooler.png` | a hard-sided cooler with a drink can on top |
| P09 | `p09-bingo-dive.png` | a silhouette of a player diving mid-air for a save |
| P10 | `p10-bingo-line-call.png` | a hand pointing at the ground, arguing a line call |
| P11 | `p11-bingo-speaker.png` | a Bluetooth speaker with bold sound waves |
| P12 | `p12-bingo-whistle.png` | a referee whistle on a lanyard with motion lines |
| P13 | `p13-bingo-bracket.png` | a hand-sketched single-elimination tournament bracket |

---

## P14 — Eve-of-Event dew frame (Jun 5)
`FLUX.2 [pro]` · Tall 2:3 · no reference
→ `social/exports/firefly/p14-eve-dew.png`

```
Extreme close-up of dew-covered grass at dawn, camera angle just above ground level. Volleyball court lines barely visible in background blur. A single deep-green bell pepper rests on the grass in the lower third of the frame, sharply lit by early golden sunlight breaking through from the side. Anticipatory, almost sacred — the moment before a big game. Cinematic documentary. Dark atmospheric mood despite the dawn light — not a cheerful sunrise. Upper two-thirds: empty negative space for overlay text. No text, letters, numbers, or logos.
```

---

## P15 — Bridge to Jalapeño video (Jun 13)
`Google Veo 3.1 Fast` · Tall 2:3 · 6 seconds · no reference
→ `social/exports/firefly/p15-bridge-jalapeno-6s.mp4`

```
6-second vertical video, 9:16. Opens on a close-up of a green bell pepper on a dark #0a0a0a background, soft GREEN #4ade80 rim-light. Slow push-in camera. At 2s, heat haze shimmers and rises from the pepper; the green glow intensifies. At 3.5s the pepper transforms — skin darkens, develops ridges, elongates into a jalapeño. Rim-light shifts green to deep ORANGE #f97316. Heat waves intensify. Final 1.5s: jalapeño fully revealed with orange pulsing glow, heat shimmer rising into empty black space above for text overlay. Moody cinematic slow-motion. Audio: low ambient hum, subtle heat crackle, no music. No text, letters, or logos.
```

> Budget 5+ attempts. Veo transformations are hit-or-miss.

---

## P16 — Heat-rising bumper *(reusable)*
`Google Veo 3.1 Fast` · Tall 2:3 · 3 seconds · no reference
→ `social/exports/firefly/p16-heat-bumper-3s.mp4`

```
3-second vertical clip, 9:16. Pure atmospheric — no subjects. Heat waves and smoke rising slowly from the bottom of the frame into black negative space above. Small embers drift upward. Red-orange glow at the base, fading to pure black at the top. Slow, cinematic, contemplative. Only motion is the rising heat. Audio: subtle wind and a low rumble, no music. No text or logos.
```

Reusable as a transition/interstitial across any Reel.

---

## P17 — Champion hero fallback
`FLUX.2 [pro]` · Standard 4:5 · **attach R1** (`bell-pepper-logo.png`) — graphic/stencil aesthetic
→ `social/exports/firefly/p17-champion-fallback.png`

```
Champion reveal hero frame. Dark near-black #0a0a0a stage. Centered: stylized laurel wreath made of bell pepper leaves wrapping around empty negative space for team name text overlay. Soft GREEN #4ade80 rim-light glows from behind the laurel. Subtle gold dust particles drift in the air. Below the laurel: a thin horizontal line of three small pepper silhouettes (bell, jalapeño, poblano) barely visible, representing the season arc. 60% of the frame is intentional negative space for text overlay. Cinematic, reverent, documentary-film-finale mood. No text, letters, numbers, or logos.
```

> Contingency only — use if Flickday doesn't deliver a usable champion photo on Jun 6.

---

# Front-loading schedule (generate before May 20)

**Week of Apr 24 (now):**
- [ ] P01 Season hero
- [ ] P02 Throwback title (today)
- [ ] P02b / P02c *(optional)*
- [ ] P03 Throwback end card

**Week of Apr 27:**
- [ ] P04a–d Quiz reveals (4)
- [ ] P04e–g Quiz stat cards (3)
- [ ] P05 Hot Takes fire

**Week of May 4:**
- [ ] P06–P13 Bingo icons (8)
- [ ] P16 Heat bumper

**Week of May 11 (last week of promo):**
- [ ] P14 Eve-of-Event dew
- [ ] P15 Bridge video — budget 5+ attempts
- [ ] P17 Champion fallback

**Totals:** 23 images + 2 videos. ~60–75 generations expected (selection + rejects). Inside unlimited.

---

# Playwright-only appendix

These visuals are explicitly in the campaign HTML but are **NOT** Firefly prompts — they render via `node social/export-cards.mjs`:

| # | Date | Asset | HTML § |
|---|---|---|---|
| PW-01 | Apr 21 | Season Announcement carousel slides 1–4 | §Post 1 |
| PW-02 | Apr 21 | Story series (3 slides) | §Post 1 Story |
| PW-03 | Apr 28 | Format & Rules carousel (5 slides) | §Post 3 |
| PW-04 | May 1 | Quiz stat text overlays | §Post 4 |
| PW-05 | May 5 | Hot Takes copy slides 2–4 | §Post 5 |
| PW-06 | May 8 | Registration Push post + story | §Post 6 |
| PW-07 | May 11–31 | Hot Take Monday / Bracket Count / Friday Spotlight | §Phase 2 |
| PW-08 | May 11–31 | Milestone card (8/12/16/20 teams, parameterized) | §Phase 2 |
| PW-09 | May 25 | "12 Days Out" variant | §Phase 3 |
| PW-10 | May 27 | Predictions Launch story | §Phase 3 |
| PW-11 | May 29 | Bingo 5×5 grid layout (uses P06–P13 as cells) | §Phase 3 |
| PW-12 | Jun 1 | Rankings Preview carousel | §Phase 3 |
| PW-13 | Jun 3 | Predictions Lock 24h story | §Phase 3 |
| PW-14 | Jun 4 | Logistics story (map + overlays) | §Phase 3 |
| PW-15 | Jun 6 | Game-day overlays (check-in, LIVE sticker, bingo PNG, champion template) | §Phase 4 |
| PW-16 | Jun 7 | Photo Vote Nominees frames | §Phase 5 |
| PW-17 | Jun 8 | MVP Results story | §Phase 5 |
| PW-18 | Jun 9 | Results & Standings post | §Phase 5 |
| PW-19 | Jun 12 | Predictions Results story | §Phase 5 |
| PW-20 | Jun 13 | Jalapeño bridge static backup (green→orange split card) | §Phase 5 |

Text accuracy matters on these. AI corrupts numbers/names/dates — code-rendered.

---

# After you download

Tell me the prompt ID ("got P01") and I'll:

1. Move + rename to `social/exports/firefly/{id}-{slug}.{ext}`
2. Generate IG variants via Sharp — feed 1080×1350, story 1080×1920, square 1080×1080
3. Optimize under 4 MB
4. Drop into the Playwright card template if it feeds one

Or batch-dump to `~/Downloads/firefly-batch-{date}/` and I'll sort the whole thing.
