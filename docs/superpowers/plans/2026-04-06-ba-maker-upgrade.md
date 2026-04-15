# B/A Photo Maker Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing B/A photo maker with marking tools, treatment text overlay, label color distinction, and bug fixes — plus add a blank Canva template.

**Architecture:** All changes are in standalone HTML files (vanilla JS + Canvas API). No framework dependencies. The B/A maker uses a single-file architecture with state management, Canvas 2D rendering, and localStorage auto-save.

**Tech Stack:** Vanilla JS, Canvas 2D API, HTML/CSS, existing brand design system (Pretendard, 6-color palette)

**Spec:** `docs/superpowers/specs/2026-04-06-ba-maker-upgrade-design.md`

---

### Task 1: Header Font Fix

**Files:**
- Modify: `ba_photo_maker.html:62-70` (page header h1 CSS)

- [ ] **Step 1: Change header h1 font from Playfair Display to Pretendard**

In the `.page-header h1` CSS rule (~line 62), change:
```css
.page-header h1 {
  font-family: 'Pretendard', system-ui, sans-serif;
  font-size: 32px; font-weight: 700;
  color: #3D2E24;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-bottom: 8px;
  position: relative; z-index: 1;
}
```

- [ ] **Step 2: Verify in browser**

Open `ba_photo_maker.html` in browser. Confirm "B&A PHOTO MAKER" header uses Pretendard and the "&" is clearly readable.

- [ ] **Step 3: Commit**

```bash
git add ba_photo_maker.html
git commit -m "fix(ba-maker): change header font to Pretendard for better & readability"
```

---

### Task 2: Label Color Distinction (before=gray, after=orange)

**Files:**
- Modify: `ba_photo_maker.html:703-737` (drawBadge function)
- Modify: `ba_photo_maker.html:658-700` (drawBALabels function, minimal style)

- [ ] **Step 1: Update drawBadge to accept a color parameter**

Change the `drawBadge` function signature and pill background color:

```javascript
function drawBadge(ctx, text, x, y, boundsKey, bgColor) {
  // ... existing code ...
  // Change the pill background line from:
  //   ctx.fillStyle = '#E8703A';
  // to:
  ctx.fillStyle = bgColor || '#E8703A';
  // ... rest unchanged ...
}
```

- [ ] **Step 2: Pass distinct colors from drawBALabels (badge style)**

In `drawBALabels`, update the badge-style calls (~line 668-669):

```javascript
drawBadge(ctx, 'BEFORE', bPos.x, bPos.y, 'beforeBadge', '#9B8A7A');
drawBadge(ctx, 'AFTER', aPos.x, aPos.y, 'afterBadge', '#E8703A');
```

- [ ] **Step 3: Update minimal style label colors**

In the minimal style branch of `drawBALabels` (~line 682-696), change the before label text color to use a gray shadow tone and the after label to use orange:

```javascript
// Before label — gray tone
ctx.fillStyle = 'rgba(0,0,0,0.3)';
ctx.fillText('BEFORE', bPos.x + 1, bPos.y + 1);
ctx.fillStyle = 'rgba(155,138,122,0.9)';  // gray-ish
ctx.fillText('BEFORE', bPos.x, bPos.y);
// ... measureText ...

// After label — white (stands out on photo)
ctx.fillStyle = 'rgba(0,0,0,0.4)';
ctx.fillText('AFTER', aPos.x + 1, aPos.y + 1);
ctx.fillStyle = '#FFFFFF';
ctx.fillText('AFTER', aPos.x, aPos.y);
```

- [ ] **Step 4: Verify in browser**

Open the maker, check both badge and minimal label styles. Before should be gray pill/text, After should be orange pill/white text.

- [ ] **Step 5: Commit**

```bash
git add ba_photo_maker.html
git commit -m "feat(ba-maker): distinguish before(gray) and after(orange) label colors"
```

---

### Task 3: Fix Slider Overlay Blocking Photo Drag

**Files:**
- Modify: `ba_photo_maker.html:191-195` (slider-handle-overlay CSS)
- Modify: `ba_photo_maker.html:893-921` (initSliderDrag function)
- Modify: `ba_photo_maker.html:827-870` (initCanvasDrag function)

- [ ] **Step 1: Set slider overlay to pointer-events none**

In the CSS (~line 192):
```css
.slider-handle-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  cursor: ew-resize; display: none;
  pointer-events: none;  /* Let canvas handle all events */
}
```

- [ ] **Step 2: Merge slider drag into the main canvas drag handler**

Replace the `initCanvasDrag` IIFE with a unified handler that detects whether the user is near the slider split line (within 30px) or dragging a photo:

```javascript
(function initCanvasDrag() {
  let dragging = false, dragWhich = null, dragSlider = false;
  let startX, startY, origX, origY;

  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    // Check if near slider split line (within 30px)
    if (state.layout === 'slider') {
      const splitX = Math.round(SIZES[state.size].w * state.sliderPos / 100);
      if (Math.abs(mx - splitX) < 30) {
        dragSlider = true;
        e.preventDefault();
        updateSliderFromEvent(e);
        return;
      }
    }

    // Otherwise, photo drag
    dragWhich = getPhotoAtPoint(mx, my);
    if (!dragWhich) return;
    if ((dragWhich === 'before' && !beforeImg) || (dragWhich === 'after' && !afterImg)) return;

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = state[dragWhich].offX;
    origY = state[dragWhich].offY;
    canvas.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (dragSlider) {
      updateSliderFromEvent(e);
      return;
    }
    if (!dragging || !dragWhich) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const scale = state[dragWhich].zoom / 100;
    state[dragWhich].offX = origX + (e.clientX - startX) * scaleX / scale;
    state[dragWhich].offY = origY + (e.clientY - startY) * scaleY / scale;
    renderPreview();
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      dragWhich = null;
      canvas.style.cursor = '';
      autoSave();
    }
    if (dragSlider) {
      dragSlider = false;
      autoSave();
    }
  });

  function updateSliderFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const pct = Math.max(10, Math.min(90, Math.round(mx / rect.width * 100)));
    state.sliderPos = pct;
    document.getElementById('sliderPosRange').value = pct;
    renderPreview();
  }
})();
```

- [ ] **Step 3: Remove the old initSliderDrag IIFE**

Delete the entire `(function initSliderDrag() { ... })();` block (~lines 893-921) since slider logic is now merged into initCanvasDrag.

- [ ] **Step 4: Verify in browser**

Test all 3 layouts:
- Side-by-side: photo drag works on both sides
- Top-bottom: photo drag works on both halves
- Slider: dragging near the split line moves the slider, dragging away from it moves the photo

- [ ] **Step 5: Commit**

```bash
git add ba_photo_maker.html
git commit -m "fix(ba-maker): merge slider drag into canvas handler, fix photo drag in all layouts"
```

---

### Task 4: Treatment Name Text Overlay

**Files:**
- Modify: `ba_photo_maker.html` — editor panel HTML (add input field)
- Modify: `ba_photo_maker.html` — renderPreview function (draw treatment text)
- Modify: `ba_photo_maker.html` — labelPositions/labelBounds objects (add treatmentName key)
- Modify: `ba_photo_maker.html` — hitTestLabels function (include treatmentName)
- Modify: `ba_photo_maker.html` — resetLabelPositions function

- [ ] **Step 1: Add treatment name input field in editor panel**

After the date input field and before the `showBrand` checkbox (~line 348), add:

```html
<div class="field">
  <label>시술명 (선택)</label>
  <input type="text" id="inputTreatment" placeholder="예: 쫀쫀 수기 모공 lock 케어" oninput="renderPreview();autoSave()">
</div>
```

- [ ] **Step 2: Add treatmentName to labelPositions**

In the `labelPositions` object (~line 403):
```javascript
const labelPositions = {
  beforeBadge: { x: null, y: null },
  afterBadge:  { x: null, y: null },
  info:        { x: null, y: null },
  brand:       { x: null, y: null },
  treatmentName: { x: null, y: null }
};
```

- [ ] **Step 3: Add treatmentName to hitTestLabels**

In `hitTestLabels` function (~line 968), add `'treatmentName'` to the keys array:
```javascript
const keys = ['beforeBadge', 'afterBadge', 'info', 'brand', 'treatmentName'];
```

- [ ] **Step 4: Create drawTreatmentName function**

Add this function after `drawBrand`:

```javascript
function drawTreatmentName(ctx, sz) {
  const text = document.getElementById('inputTreatment').value.trim();
  if (!text) return;

  const fontSize = 28;
  ctx.font = `600 ${fontSize}px 'Pretendard', sans-serif`;
  const displayText = '\u2018' + text + '\u2019';  // Korean single quotes
  const metrics = ctx.measureText(displayText);
  const pw = 24, ph = 14;
  const boxW = metrics.width + pw * 2;
  const boxH = fontSize + ph * 2;

  const defX = sz.w / 2;
  const defY = sz.h * 0.55;
  const pos = getLabelPos('treatmentName', defX, defY);

  // Semi-transparent dark background pill
  const rx = pos.x - boxW / 2;
  const ry = pos.y - boxH / 2;
  const radius = boxH / 2;

  ctx.fillStyle = 'rgba(61,46,36,0.65)';
  ctx.beginPath();
  ctx.moveTo(rx + radius, ry);
  ctx.lineTo(rx + boxW - radius, ry);
  ctx.arc(rx + boxW - radius, ry + boxH / 2, radius, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(rx + radius, ry + boxH);
  ctx.arc(rx + radius, ry + boxH / 2, radius, Math.PI / 2, -Math.PI / 2);
  ctx.closePath();
  ctx.fill();

  // White text centered
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayText, pos.x, pos.y);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // Record bounds for drag
  labelBounds.treatmentName = { x: rx, y: ry, w: boxW, h: boxH };
}
```

- [ ] **Step 5: Call drawTreatmentName in renderPreview**

In the `renderPreview` function, add the call after `drawInfoBar` and before `drawBrand` (~line 608):

```javascript
// Treatment name overlay
drawTreatmentName(ctx, sz);

// Brand watermark
if (document.getElementById('showBrand').checked) {
  drawBrand(ctx, sz);
}
```

- [ ] **Step 6: Update auto-save to include treatment name**

Find the auto-save state serialization and add `inputTreatment` to the saved fields. Also update the restore function to restore it.

- [ ] **Step 7: Verify in browser**

Type a treatment name, verify:
- Semi-transparent pill appears centered on the image
- Text is in Korean single quotes
- Pill is draggable
- Position resets with "라벨 위치 초기화"
- Persists after page reload (localStorage)

- [ ] **Step 8: Commit**

```bash
git add ba_photo_maker.html
git commit -m "feat(ba-maker): add treatment name text overlay with drag support"
```

---

### Task 5: Marking Tools (Circle, Arrow, Guide Line)

**Files:**
- Modify: `ba_photo_maker.html` — editor panel HTML (add marking tool section)
- Modify: `ba_photo_maker.html` — state object (add markings array)
- Modify: `ba_photo_maker.html` — renderPreview (draw markings)
- Modify: `ba_photo_maker.html` — canvas event handlers (marking creation)

- [ ] **Step 1: Add marking tools UI in editor panel**

After the label style toggle row and before the font panel section (~line 362), add:

```html
<div class="section-label">마킹 도구</div>
<div class="toggle-row">
  <button class="toggle-btn" data-tool="circle" onclick="setMarkingTool('circle')" title="점선 원">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2"><circle cx="12" cy="12" r="9"/></svg>
  </button>
  <button class="toggle-btn" data-tool="arrow" onclick="setMarkingTool('arrow')" title="화살표">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="19" x2="19" y2="5"/><polyline points="12,5 19,5 19,12"/></svg>
  </button>
  <button class="toggle-btn" data-tool="guide" onclick="setMarkingTool('guide')" title="가이드 라인">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"><line x1="2" y1="12" x2="22" y2="12"/></svg>
  </button>
  <button class="toggle-btn" data-tool="none" onclick="setMarkingTool('none')" title="선택 해제" style="flex:0.6">✕</button>
</div>
<button onclick="clearAllMarkings()" style="width:100%;padding:8px;border-radius:8px;border:1px solid rgba(232,112,58,0.2);background:transparent;color:#9B8A7A;font-size:11px;font-weight:600;font-family:inherit;cursor:pointer;margin-bottom:12px">마킹 전체 삭제</button>
```

- [ ] **Step 2: Add marking state and tool management**

Add to the state and globals section:

```javascript
let markings = [];  // [{ type: 'circle'|'arrow'|'guide', x1, y1, x2, y2 }]
let currentMarkingTool = 'none';

function setMarkingTool(tool) {
  currentMarkingTool = tool;
  document.querySelectorAll('[data-tool]').forEach(b =>
    b.classList.toggle('active', b.dataset.tool === tool));
  // Change cursor
  canvas.style.cursor = tool !== 'none' ? 'crosshair' : '';
}

function clearAllMarkings() {
  markings = [];
  renderPreview();
  autoSave();
  showToast('마킹이 전체 삭제되었습니다');
}
```

- [ ] **Step 3: Add drawMarkings function**

```javascript
function drawMarkings(ctx) {
  markings.forEach(m => {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2.5;

    if (m.type === 'circle') {
      const radius = Math.sqrt((m.x2 - m.x1) ** 2 + (m.y2 - m.y1) ** 2);
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(m.x1, m.y1, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (m.type === 'arrow') {
      ctx.setLineDash([]);
      // Line
      ctx.beginPath();
      ctx.moveTo(m.x1, m.y1);
      ctx.lineTo(m.x2, m.y2);
      ctx.stroke();
      // Arrowhead
      const angle = Math.atan2(m.y2 - m.y1, m.x2 - m.x1);
      const headLen = 16;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(m.x2, m.y2);
      ctx.lineTo(m.x2 - headLen * Math.cos(angle - 0.4), m.y2 - headLen * Math.sin(angle - 0.4));
      ctx.lineTo(m.x2 - headLen * Math.cos(angle + 0.4), m.y2 - headLen * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fill();
    } else if (m.type === 'guide') {
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      if (m.direction === 'h') {
        ctx.moveTo(0, m.y1);
        ctx.lineTo(SIZES[state.size].w, m.y1);
      } else {
        ctx.moveTo(m.x1, 0);
        ctx.lineTo(m.x1, SIZES[state.size].h);
      }
      ctx.stroke();
    }
    ctx.restore();
  });
}
```

- [ ] **Step 4: Call drawMarkings in renderPreview**

In `renderPreview`, add after the photo drawing and before labels:

For `side` layout (~line 553), after `drawPhoto` calls:
```javascript
// Draw markings on top of photos
drawMarkings(ctx);
```

Similarly for `topbottom` and `slider` layouts. Place ONE call right before `drawBALabels` at the end of the layout blocks, or better — add a single call after all layout-specific code but before `drawInfoBar`:

```javascript
  // Markings (on top of photos, below labels)
  drawMarkings(ctx);

  // Bottom info area
  drawInfoBar(ctx, sz);
```

- [ ] **Step 5: Add marking creation to canvas interaction**

Modify the unified canvas mousedown handler (from Task 3) to check for marking tool AFTER label drag but BEFORE photo drag. Add marking creation logic:

```javascript
// In the canvas mousedown handler, after label check (capture phase handles labels):
// Add marking tool check before photo drag
if (currentMarkingTool !== 'none') {
  markingStartX = mx;
  markingStartY = my;
  drawingMarking = true;
  e.preventDefault();
  return;
}
```

Add mousemove and mouseup for marking preview and completion:

```javascript
let drawingMarking = false, markingStartX, markingStartY;
let tempMarking = null;

// In mousemove:
if (drawingMarking) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const mx = (e.clientX - rect.left) * scaleX;
  const my = (e.clientY - rect.top) * scaleY;
  
  if (currentMarkingTool === 'guide') {
    const dx = Math.abs(mx - markingStartX);
    const dy = Math.abs(my - markingStartY);
    tempMarking = {
      type: 'guide',
      x1: markingStartX, y1: markingStartY,
      direction: dx > dy ? 'h' : 'v'
    };
  } else {
    tempMarking = {
      type: currentMarkingTool,
      x1: markingStartX, y1: markingStartY,
      x2: mx, y2: my
    };
  }
  renderPreview();
  if (tempMarking) {
    // Draw temp marking
    drawMarkings_single(ctx, tempMarking);
  }
  return;
}

// In mouseup:
if (drawingMarking && tempMarking) {
  markings.push(tempMarking);
  tempMarking = null;
  drawingMarking = false;
  renderPreview();
  autoSave();
  return;
}
```

Create a helper to draw a single marking (reuse logic from drawMarkings):

```javascript
function drawMarkings_single(ctx, m) {
  // Same drawing logic as in drawMarkings forEach body
  // Extract into shared helper
}
```

Refactor: extract the per-marking draw logic into `drawSingleMarking(ctx, m)` and call it from both `drawMarkings` and the temp preview.

- [ ] **Step 6: Add marking deletion (click to show X)**

Add an HTML overlay button for deletion:

```html
<button id="markingDeleteBtn" style="display:none;position:absolute;z-index:100;width:24px;height:24px;border-radius:50%;border:1px solid rgba(255,255,255,0.6);background:rgba(61,46,36,0.7);color:#fff;font-size:12px;cursor:pointer;line-height:1" onclick="deleteSelectedMarking()">✕</button>
```

Add hit-test for markings on canvas click (when no marking tool is active):

```javascript
function hitTestMarkings(mx, my) {
  const threshold = 15;
  for (let i = markings.length - 1; i >= 0; i--) {
    const m = markings[i];
    if (m.type === 'circle') {
      const r = Math.sqrt((m.x2 - m.x1) ** 2 + (m.y2 - m.y1) ** 2);
      const dist = Math.sqrt((mx - m.x1) ** 2 + (my - m.y1) ** 2);
      if (Math.abs(dist - r) < threshold) return i;
    } else if (m.type === 'arrow') {
      const dist = pointToLineDistance(mx, my, m.x1, m.y1, m.x2, m.y2);
      if (dist < threshold) return i;
    } else if (m.type === 'guide') {
      if (m.direction === 'h' && Math.abs(my - m.y1) < threshold) return i;
      if (m.direction === 'v' && Math.abs(mx - m.x1) < threshold) return i;
    }
  }
  return -1;
}

function pointToLineDistance(px, py, x1, y1, x2, y2) {
  const A = px - x1, B = py - y1, C = x2 - x1, D = y2 - y1;
  const dot = A * C + B * D;
  const len2 = C * C + D * D;
  let t = len2 !== 0 ? dot / len2 : -1;
  t = Math.max(0, Math.min(1, t));
  const nearX = x1 + t * C, nearY = y1 + t * D;
  return Math.sqrt((px - nearX) ** 2 + (py - nearY) ** 2);
}

let selectedMarkingIdx = -1;

function deleteSelectedMarking() {
  if (selectedMarkingIdx >= 0 && selectedMarkingIdx < markings.length) {
    markings.splice(selectedMarkingIdx, 1);
    selectedMarkingIdx = -1;
    document.getElementById('markingDeleteBtn').style.display = 'none';
    renderPreview();
    autoSave();
  }
}
```

Wire into canvas click (when tool is 'none' and no label hit): show/hide delete button at marking position.

- [ ] **Step 7: Add markings to auto-save/restore**

In the save state serialization, add `markings` array. In restore, reload it.

- [ ] **Step 8: Verify in browser**

Test:
- Select circle tool → draw on canvas → dotted white circle appears
- Select arrow tool → draw → solid arrow with head appears
- Select guide tool → drag horizontal → horizontal dashed line spans full width
- Click existing marking → X button appears → click X → marking deleted
- "마킹 전체 삭제" clears all
- PNG export includes markings
- Markings persist after reload

- [ ] **Step 9: Commit**

```bash
git add ba_photo_maker.html
git commit -m "feat(ba-maker): add marking tools (circle, arrow, guide line)"
```

---

### Task 6: Index.html Menu Link for B/A Maker

**Files:**
- Modify: `index.html:657-668` (after review_overlay_maker card, before canva_templates card)

- [ ] **Step 1: Add B/A maker card to hub menu**

Insert a new card after the review overlay maker card (~line 657) and before the canva templates card (~line 660):

```html
      <a class="card" href="ba_photo_maker.html">
        <span class="badge">New</span>
        <svg class="card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="6" width="18" height="36" rx="2"/>
          <rect x="26" y="6" width="18" height="36" rx="2"/>
          <line x1="4" y1="38" x2="22" y2="38" stroke-width="3" opacity=".4"/>
          <line x1="26" y1="38" x2="44" y2="38" stroke-width="3" stroke="#E8703A"/>
        </svg>
        <div class="card-title">B/A 비교사진</div>
        <div class="card-desc">시술 전후 비교사진 제작 · 마킹 도구 · PNG 내보내기</div>
      </a>
```

- [ ] **Step 2: Verify in browser**

Open `index.html`, confirm B/A card appears in the Tools & Pages grid with the New badge.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(index): add B/A photo maker to hub menu"
```

---

### Task 7: Add Blank Canva Template to canva_templates.html

**Files:**
- Modify: `canva_templates.html:541-576` (template data)
- Modify: `canva_templates.html:498-528` (HTML for new category section)
- Modify: `canva_templates.html:608-609` (render call)

- [ ] **Step 1: Add blank template URL array**

After `RV_URLS` array (~line 556), add:

```javascript
const BLANK_URLS = [
  'https://canva.link/p5aw0fs8u1jlm4a'
];
```

- [ ] **Step 2: Add blank template data to TEMPLATES object**

After the `rv` array in TEMPLATES (~line 575), add:

```javascript
blank: [
  { name: '빈 템플릿 (자유 편집)', desc: '브랜드 배경 + IM AESTHETIC 로고만 · 사진/텍스트 자유 배치', url: BLANK_URLS[0], tags: ['1080x1350', '자유 편집', '배경+로고'] }
]
```

- [ ] **Step 3: Add HTML category section**

After the review category section closing `</div>` (~line 528), add:

```html
<div class="category">
  <div class="category-header">
    <div class="category-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
    </div>
    <div class="category-title">빈 템플릿</div>
    <span class="category-count">1 template</span>
    <div class="category-line"></div>
  </div>
  <div class="template-grid" id="blank-grid"></div>
</div>
```

- [ ] **Step 4: Add render call**

After the existing render calls (~line 609), add:

```javascript
document.getElementById('blank-grid').innerHTML = TEMPLATES.blank.map(renderCard).join('');
```

- [ ] **Step 5: Update template count in header**

Change the template count badge from "10 TEMPLATES" to "11 TEMPLATES" (~line 455).

- [ ] **Step 6: Verify in browser**

Open `canva_templates.html`, confirm new "빈 템플릿" section appears with the template card. Click it to verify the Canva link opens correctly.

- [ ] **Step 7: Commit**

```bash
git add canva_templates.html
git commit -m "feat(canva): add blank template for free photo/text editing"
```
