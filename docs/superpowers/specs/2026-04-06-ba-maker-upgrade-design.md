# B/A Photo Maker Upgrade Design

**Date**: 2026-04-06
**Target file**: `ba_photo_maker.html`
**Scope**: 7 improvements — 6 to B/A photo maker + 1 Canva template addition

## Context

The clinic currently uses Canva templates for B/A posts but finds them inconvenient. An existing `ba_photo_maker.html` already has core functionality (photo upload, layout options, labels, PNG export). This upgrade adds missing features to make it a full Canva replacement for B/A content.

Current Instagram B/A posts show: before/after labels with color distinction, treatment name overlay text, dotted circle markings on treatment areas, and the IM AESTHETIC watermark.

## 1. Bug Fix: Slider Overlay Blocking Photo Drag

**Problem**: In slider layout, the `.slider-handle-overlay` div sits on top of the canvas with its own mousedown handler, intercepting all mouse events. This prevents photo drag from working in slider mode. The underlying `getPhotoAtPoint()` function already correctly handles all three layouts — the issue is the overlay blocking events, not missing logic.

**Fix**: Merge the slider drag and photo drag handlers. When the user drags near the slider split line (within ~30px), adjust slider position. Otherwise, pass the event through to the photo drag system. Remove the separate overlay element or set `pointer-events: none` on it and handle slider detection in the main canvas drag handler.

## 2. Label Color Distinction

**Current**: Both "before" and "after" labels use the same orange style.

**Change**:
- **before**: `#9B8A7A` (brand sub-text gray) background, white text
- **after**: `#E8703A` (brand orange) background, white text

Applies to both "badge" and "minimal" label styles. The color contrast makes it immediately clear which side is which, matching industry standard (neutral = before, vibrant = after).

## 3. Header Font Change

**Current**: `<h1>` uses Playfair Display — the "&" character is nearly illegible.

**Change**: Switch page header h1 to `Pretendard 700`, letter-spacing 8px, uppercase. This matches the Elegant-Clear typography system (EN labels = Pretendard 700). Playfair Display remains only for "IM AESTHETIC" brand mark per brand rules.

## 4. Treatment Name Text Overlay

**Purpose**: Display treatment/procedure name on the photo (e.g., `'쫀쫀 수기 모공 lock 케어'`).

**UI**:
- New text input field in editor panel under "라벨 정보" section
- Label: "시술명 (선택)"
- Placeholder: "예: 쫀쫀 수기 모공 lock 케어"

**Rendering**:
- Position: center-bottom area of canvas (above watermark, below center)
- Style: semi-transparent dark background pill (`rgba(61,46,36,0.65)`), white text
- Font: Pretendard 600, ~28px on 1080w canvas
- Text wrapped in Korean single quotes: `'시술명'`
- Draggable on canvas (same system as existing label drag, key: `treatmentName` in `labelPositions`/`labelBounds`)

**Layout behavior**:
- Side-by-side: spans full width, centered
- Top-bottom: spans full width, between the two photos or overlaid on bottom photo
- Slider: spans full width, centered

## 5. Marking Tools

**Tools** (3 types):
1. **Dotted circle** — click-drag to draw. Start point = center, drag = radius (always circle, not ellipse)
2. **Straight arrow** — click-drag from start to end point. Arrowhead at end
3. **Guide line** — horizontal or vertical straight line spanning full width/height. Click position determines placement

**UI**:
- New section in editor panel: "마킹 도구"
- 3 icon buttons for tool selection + 1 "선택 해제" button
- Active tool highlighted with orange border
- "마킹 전체 삭제" button below

**Style** (fixed, no color picker):
- Color: `rgba(255, 255, 255, 0.8)` (white semi-transparent)
- Stroke: 2px, dashed (`[8, 6]` dash pattern) for circles and guide lines
- Arrow: 2px solid with filled arrowhead
- No fill on circles

**Interaction priority** (highest to lowest):
1. Label drag — if cursor hits a label bounding box, drag the label
2. Marking tool — if a tool is active and cursor doesn't hit a label, create marking
3. Photo drag — default fallback when no tool active and no label hit

**Drawing**:
- Click-drag on canvas creates the shape (start→end)
- Circle: center = start point, radius = distance to end point (always circle, not ellipse)
- Arrow: start point → end point with arrowhead
- Guide line: click position determines placement, line spans full width (horizontal) or full height (vertical). Determined by drag direction — more horizontal drag = horizontal line, more vertical = vertical line.

**Deleting markings**:
- Click on existing marking (hit zone: 15px from stroke) → HTML overlay "X" button appears near the marking
- Clicking elsewhere or starting a new drag dismisses the X button
- "마킹 전체 삭제" button clears all markings

**State**: `markings: [{ type, x1, y1, x2, y2 }]`
- Circle: x1,y1 = center, x2,y2 = edge point. Radius = `sqrt((x2-x1)^2 + (y2-y1)^2)`
- Arrow: x1,y1 = tail, x2,y2 = head
- Guide: x1,y1 = position, type distinguishes horizontal vs vertical

**Rendering order**: Photos → Markings → Labels → Treatment text → Watermark

**Export**: Markings included in PNG export.

## 6. Index.html Menu Link

Add "B/A 비교사진" menu item to the hub menu in `index.html`. Place it near the other maker tools (after card news maker or event card maker). Currently the B/A maker exists but isn't linked from the home screen.

## State & Storage

Existing localStorage auto-save system (`im_ba_state`) already works. Extended state fields:
- `treatmentName`: string
- `markings`: array of marking objects
- Server save follows same pattern (text/options only, no images).

## Files Changed

- `ba_photo_maker.html` — items 1-5 (bug fix, labels, header, treatment text, markings)
- `index.html` — item 6 (menu link addition)
- `canva_templates.html` — item 7 (blank template addition)

## 7. Canva Blank Template Addition

Add a new "빈 템플릿" category to `canva_templates.html` with the user-provided blank template (background + logo only, for free customization by staff).

**URL**: `https://canva.link/p5aw0fs8u1jlm4a`
**Category**: "빈 템플릿 (자유 편집)" — separate section below the existing 3 categories
**Purpose**: Staff uploads photos/text freely in Canva. No image frames, just brand background + IM AESTHETIC logo.

## Not In Scope

- Standalone blank canvas maker (Canva handles this better with photo upload)
- Free-hand drawing (hurts premium look)
- In-image caption area (Instagram caption suffices)
- Marking color customization (white semi-transparent is optimal for clinic aesthetic)
- Canva template page removal (separate decision)
