# Maker Tools Enhancement Plan (3-Feature Bundle)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix image gradient distortion, add font customization to 4 makers, and build a standalone B&A photo maker to replace Canva dependency.

**Architecture:** Three independent features targeting existing standalone HTML pages. Each feature is self-contained — no shared dependencies beyond brand CSS variables. Font customization uses a shared utility pattern injected into each maker. B&A maker is a new standalone page following existing maker conventions.

**Tech Stack:** Vanilla JS, HTML5 Canvas (for B&A cropping), CSS custom properties, Google Fonts API, localStorage auto-save (existing pattern)

---

## Expert Decisions

### Feature 1: Image Gradient Fix
- **Decision**: Add gradient intensity slider (0~100%) with **default 0% when image is present**
- **Rationale**: Complete removal is too rigid. Slider gives control. Default 0% prevents the distortion issue by default, but allows intentional darkening when needed (e.g., text over bright photos).
- **Text readability**: Enhance text-shadow as fallback. Add optional semi-transparent text backdrop toggle.

### Feature 2: Font Customization
- **Decision**: 3-tier per-element system (Title / Body / Caption) across 4 active makers
- **Scope**: card_news, event_card, reels_cover, review_overlay (highlight_cover excluded — static gallery)
- **Font library** (8 fonts total, curated for aesthetic clinic content):

| Category | Font | Weight Range | Use Case |
|----------|------|-------------|----------|
| **Sans (기본)** | Pretendard | 300-800 | Default body, UI, modern feel |
| **Sans (대체)** | Noto Sans KR | 300-700 | Neutral, clean |
| **Serif (감성)** | Noto Serif KR | 200-900 | Hook titles, emotional appeal |
| **Serif (EN)** | Playfair Display | 400-700 | Brand mark, EN headings |
| **Display (한글)** | Gowun Batang (고운바탕) | 400-700 | Elegant Korean, premium feel |
| **Display (한글)** | Gowun Dodum (고운돋움) | 400 | Soft, friendly, approachable |
| **Display (한글)** | MaruBuri (마루부리) | 300-700 | Traditional elegance, literary |
| **Rounded (한글)** | Nanum Myeongjo (나눔명조) | 400-700 | Classic Korean serif, warm readability |

- **UI**: Collapsible "Typography" panel in editor sidebar, below theme/size selectors
- **Defaults**: Match current hardcoded values per maker. User changes saved to localStorage.

### Feature 3: B&A Photo Maker (Canva Replacement)
- **Decision**: Build standalone `ba_photo_maker.html` with built-in crop/resize
- **Rationale**: Canva iframe embeds can't be customized. A native tool eliminates the photo-ratio friction entirely. Canva page stays for other template uses.
- **Features**: Photo upload with drag-crop, aspect ratio presets, before/after split layouts, brand overlay, PNG export

---

## File Structure

### New Files
- `ba_photo_maker.html` — Standalone B&A photo comparison maker (new page)

### Modified Files
- `card_news_maker.html` — Gradient slider + font customization
- `event_card_maker.html` — Font customization
- `reels_cover_maker.html` — Font customization
- `review_overlay_maker.html` — Font customization
- `index.html` — Add B&A Photo Maker to hub menu

---

## Task 1: Card News Maker — Image Gradient Intensity Slider

**Files:**
- Modify: `card_news_maker.html:1307-1310` (image upload area), `:1367-1389` (slideHTML), `:770-795` (top controls area)

- [ ] **Step 1.1: Add gradient intensity state variable**

Near line 1097 (after `let currentTheme='warm';`), add:
```javascript
let imgGradient = 0;  // 0-100, default OFF when image present
let txtBackdrop = false; // optional text backdrop
```

- [ ] **Step 1.2: Add gradient slider UI**

In the top controls area (around line 781-793), after the size selector, add a gradient intensity control:
```html
<label style="...">이미지 효과</label>
<input type="range" id="grad-slider" min="0" max="100" value="0"
       oninput="setGradient(this.value)" style="width:80px;accent-color:var(--color-accent)">
<span id="grad-val" style="font-size:10px;min-width:30px">0%</span>
<button id="backdrop-toggle" onclick="toggleBackdrop()" style="..." title="텍스트 배경">Aa</button>
```

- [ ] **Step 1.3: Implement gradient control functions**

```javascript
function setGradient(val) {
  imgGradient = parseInt(val, 10);
  document.getElementById('grad-val').textContent = val + '%';
  if (SLIDES.length) SLIDES.forEach((_, i) => refreshPrev(i));
  autoSave();
}

function toggleBackdrop() {
  txtBackdrop = !txtBackdrop;
  document.getElementById('backdrop-toggle').classList.toggle('active', txtBackdrop);
  if (SLIDES.length) SLIDES.forEach((_, i) => refreshPrev(i));
  autoSave();
}
```

- [ ] **Step 1.4: Modify slideHTML to use dynamic gradient**

Replace the hardcoded gradient at line 1378:
```javascript
// OLD:
${hasImg?`<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.05) 40%,transparent 60%);z-index:1"></div>`:''}

// NEW:
${hasImg && imgGradient > 0 ? `<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,${imgGradient*0.0045}) 0%,rgba(0,0,0,${imgGradient*0.0005}) 40%,transparent 60%);z-index:1"></div>` : ''}
```

Also update text shadow (line 1375) to be stronger when no gradient:
```javascript
const txtShadow = hasImg
  ? (imgGradient > 20
    ? 'text-shadow:0 1px 8px rgba(0,0,0,0.3),0 0 20px rgba(0,0,0,0.15);'
    : 'text-shadow:0 2px 12px rgba(0,0,0,0.5),0 0 30px rgba(0,0,0,0.3);')
  : '';
```

- [ ] **Step 1.5: Add text backdrop support to inner content**

In the `.sp` container (line 1385), add optional backdrop:
```javascript
const backdropStyle = hasImg && txtBackdrop
  ? 'background:rgba(255,248,240,0.85);border-radius:16px;padding:32px;'
  : '';
```

- [ ] **Step 1.6: Update autoSave/autoLoad to include gradient state**

Add `imgGradient` and `txtBackdrop` to the save/load object alongside existing state.

- [ ] **Step 1.7: Test in browser**

Open card_news_maker.html, upload an image to a slide:
- Verify: gradient is OFF by default (image shows clearly)
- Drag slider to 50% → gradient appears moderately
- Drag to 100% → full original gradient strength
- Toggle "Aa" backdrop → semi-transparent background behind text
- Refresh page → settings restored from localStorage

- [ ] **Step 1.8: Commit**
```bash
git add card_news_maker.html
git commit -m "feat(card-news): add gradient intensity slider for background images"
```

---

## Task 2: Font Customization System — Card News Maker (Primary)

**Files:**
- Modify: `card_news_maker.html`

### Font Selection Design

3-tier typography control:
- **Title Font** (제목): Controls hook title, step title, content title, CTA title
- **Body Font** (본문): Controls body text, descriptions, tips
- **Caption Font** (캡션): Controls eyebrow labels, footer, small text

Each tier: Font Family (dropdown) + Size adjustment (slider ±30%) + Weight (dropdown) + Color (picker)

- [ ] **Step 2.1: Add Google Fonts imports for new fonts**

At the top of the file (after existing font links around line 7-9):
```html
<link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/fonts-archive/MaruBuri/MaruBuri.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap" rel="stylesheet">
```

Note: MaruBuri is not on Google Fonts — use fonts-archive CDN. All others are on Google Fonts.

- [ ] **Step 2.2: Add font state object**

After the theme/size state variables:
```javascript
const FONT_OPTIONS = [
  { name: 'Pretendard', family: "'Pretendard',system-ui,sans-serif", type: 'sans' },
  { name: 'Noto Sans KR', family: "'Noto Sans KR',sans-serif", type: 'sans' },
  { name: 'Noto Serif KR', family: "'Noto Serif KR',serif", type: 'serif' },
  { name: 'Playfair Display', family: "'Playfair Display',serif", type: 'serif' },
  { name: 'Gowun Batang', family: "'Gowun Batang',serif", type: 'display' },
  { name: 'Gowun Dodum', family: "'Gowun Dodum',sans-serif", type: 'display' },
  { name: 'MaruBuri', family: "'MaruBuri',serif", type: 'display' },
  { name: 'Nanum Myeongjo', family: "'Nanum Myeongjo',serif", type: 'serif' }
];

const FONT_DEFAULTS = {
  title:   { family: 2, size: 100, weight: 300, color: '' },  // Noto Serif KR
  body:    { family: 0, size: 100, weight: 400, color: '' },  // Pretendard
  caption: { family: 0, size: 100, weight: 700, color: '' }   // Pretendard
};

let fontSettings = JSON.parse(JSON.stringify(FONT_DEFAULTS));
```

- [ ] **Step 2.3: Build font customization UI panel**

Add a collapsible "Typography" section in the top controls area or as a new panel:
```javascript
function buildFontPanel() {
  const tiers = [
    { key: 'title', label: '제목 폰트', desc: '훅, 스텝, 콘텐츠 제목' },
    { key: 'body', label: '본문 폰트', desc: '내용, 설명, 팁' },
    { key: 'caption', label: '캡션 폰트', desc: '라벨, 배지, 작은 텍스트' }
  ];

  return `<div class="font-panel" id="fontPanel">
    <div class="font-panel-toggle" onclick="toggleFontPanel()">
      <span>Typography 설정</span>
      <span class="font-panel-arrow">▸</span>
    </div>
    <div class="font-panel-body" style="display:none">
      ${tiers.map(t => `
        <div class="font-tier">
          <div class="font-tier-label">${t.label} <span class="font-tier-desc">${t.desc}</span></div>
          <div class="font-tier-controls">
            <select onchange="setFont('${t.key}','family',this.selectedIndex)"
                    style="font-size:11px;flex:1">
              ${FONT_OPTIONS.map((f, i) =>
                `<option value="${i}" ${fontSettings[t.key].family === i ? 'selected' : ''}
                  style="font-family:${f.family}">${f.name}</option>`
              ).join('')}
            </select>
            <div class="font-size-ctrl">
              <input type="range" min="60" max="140" value="${fontSettings[t.key].size}"
                     oninput="setFont('${t.key}','size',this.value)"
                     style="width:60px">
              <span style="font-size:10px;min-width:28px">${fontSettings[t.key].size}%</span>
            </div>
            <select onchange="setFont('${t.key}','weight',this.value)" style="font-size:11px;width:60px">
              ${[300,400,500,600,700,800].map(w =>
                `<option value="${w}" ${fontSettings[t.key].weight == w ? 'selected' : ''}>${w}</option>`
              ).join('')}
            </select>
            <input type="color" value="${fontSettings[t.key].color || '#3D2E24'}"
                   oninput="setFont('${t.key}','color',this.value)"
                   style="width:28px;height:28px;border:none;cursor:pointer"
                   title="폰트 색상">
          </div>
        </div>
      `).join('')}
      <button onclick="resetFonts()" style="...">기본값으로 초기화</button>
    </div>
  </div>`;
}
```

- [ ] **Step 2.4: Implement font setting functions**

```javascript
function setFont(tier, prop, val) {
  if (prop === 'family') val = parseInt(val, 10);
  if (prop === 'size') val = parseInt(val, 10);
  if (prop === 'weight') val = parseInt(val, 10);
  fontSettings[tier][prop] = val;
  if (SLIDES.length) SLIDES.forEach((_, i) => refreshPrev(i));
  autoSave();
}

function resetFonts() {
  fontSettings = JSON.parse(JSON.stringify(FONT_DEFAULTS));
  // Re-render the font panel by rebuilding its inner HTML
  const panelBody = document.querySelector('.font-panel-body');
  if (panelBody) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = buildFontPanel();
    const newBody = tempDiv.querySelector('.font-panel-body');
    if (newBody) panelBody.innerHTML = newBody.innerHTML;
  }
  if (SLIDES.length) SLIDES.forEach((_, i) => refreshPrev(i));
  autoSave();
}

function toggleFontPanel() {
  const body = document.querySelector('.font-panel-body');
  const arrow = document.querySelector('.font-panel-arrow');
  if (body) {
    const show = body.style.display === 'none';
    body.style.display = show ? 'block' : 'none';
    if (arrow) arrow.textContent = show ? '▾' : '▸';
  }
}

function getFontCSS(tier) {
  const s = fontSettings[tier];
  const f = FONT_OPTIONS[s.family];
  return {
    family: f.family,
    weight: s.weight,
    sizeMul: s.size / 100,
    color: s.color || null
  };
}
```

- [ ] **Step 2.5: Apply font settings to slide rendering**

Modify the `inner()` function to use dynamic fonts. For each hardcoded font-family/size/weight in the template literals, replace with computed values:

Example for hook slide (line 1402-1404):
```javascript
// Eyebrow → caption tier
const cap = getFontCSS('caption');
`font-family:${cap.family};font-size:${Math.round(16*cap.sizeMul)}px;font-weight:${cap.weight};${cap.color?'color:'+cap.color+';':''}`

// Main title → title tier
const ttl = getFontCSS('title');
`font-family:${ttl.family};font-size:${Math.round(68*ttl.sizeMul)}px;font-weight:${ttl.weight};${ttl.color?'color:'+ttl.color+';':''}`

// Body → body tier
const bod = getFontCSS('body');
`font-family:${bod.family};font-size:${Math.round(40*bod.sizeMul)}px;font-weight:${bod.weight};${bod.color?'color:'+bod.color+';':''}`
```

Apply this pattern to ALL slide types in `inner()`: hook, step, content, myth, fact, cause, program, checklist, recommend, ugc, highlight, cta, ba.

- [ ] **Step 2.6: Add CSS styles for font panel**

```css
.font-panel { margin-top:8px; border-top:1px solid var(--color-border); padding-top:8px; }
.font-panel-toggle { display:flex; justify-content:space-between; cursor:pointer; padding:6px 0; font-size:12px; font-weight:600; }
.font-panel-body { padding:8px 0; }
.font-tier { margin-bottom:10px; }
.font-tier-label { font-size:11px; font-weight:700; margin-bottom:4px; }
.font-tier-desc { font-weight:400; color:var(--color-text-light); }
.font-tier-controls { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
```

- [ ] **Step 2.7: Update autoSave/autoLoad for font settings**

Include `fontSettings` in the localStorage save/load cycle.

- [ ] **Step 2.8: Test font customization**

- Change title font to Gowun Batang → hook slide title changes
- Adjust body size to 120% → body text scales up
- Change caption weight to 400 → labels become lighter
- Reset → returns to defaults
- Refresh → settings persist

- [ ] **Step 2.9: Commit**
```bash
git add card_news_maker.html
git commit -m "feat(card-news): add 3-tier font customization with 8 font choices"
```

---

## Task 3: Font Customization — Event Card Maker

**Files:**
- Modify: `event_card_maker.html`

**Rendering architecture**: `renderCard()` at line 1115-1145 calls preset-specific render functions. Font styles are in CSS classes, not inline JS templates. This maker uses **CSS class-based** styling unlike card_news_maker's inline template literals.

**Key font locations in CSS:**
- Line 263: Card base `font-family: 'Pretendard', system-ui, sans-serif`
- Line 295-297: Card logo `font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 400`
- Line 315-317: Main title `font-family: 'Pretendard', sans-serif; font-size: 52px; font-weight: 800`
- Line 323-324: Subtitle `font-size: 24px; font-weight: 400`
- Line 375-376: Program name `font-size: 26px; font-weight: 700`
- Line 385-387: Program price `font-family: 'Pretendard'; font-size: 28px; font-weight: 600`
- Line 347: Footer IG `font-size: 20px`
- Line 352: Footer address `font-size: 18px`

**Export**: `exportPNG()` at line 1291-1337 uses `html2canvas()` → 1080x1350 PNG.

- [ ] **Step 3.1: Add Google Fonts imports (same set as Task 2)**

Same 5 additional `<link>` tags for new fonts.

- [ ] **Step 3.2: Add font state, FONT_OPTIONS, helper functions (same as Task 2)**

Copy `FONT_OPTIONS`, `FONT_DEFAULTS`, `fontSettings`, `setFont()`, `resetFonts()`, `toggleFontPanel()`, `getFontCSS()`, `buildFontPanel()` into the `<script>` section.

Note on code duplication: Each HTML page is self-contained per project convention. A shared JS file would break this pattern. Duplication is the deliberate choice here.

- [ ] **Step 3.3: Add font panel UI in `buildEditPanel()`**

Insert the font panel after the image upload section (after line 985):
```javascript
html += buildFontPanel();
```

- [ ] **Step 3.4: Apply font settings via CSS custom properties**

Since event_card uses CSS classes (not inline JS templates), use CSS custom properties approach:
```javascript
function applyFontSettings() {
  const ttl = getFontCSS('title');
  const bod = getFontCSS('body');
  const cap = getFontCSS('caption');
  const root = document.documentElement;
  root.style.setProperty('--font-title', ttl.family);
  root.style.setProperty('--font-title-weight', ttl.weight);
  root.style.setProperty('--font-title-scale', ttl.sizeMul);
  root.style.setProperty('--font-body', bod.family);
  root.style.setProperty('--font-body-weight', bod.weight);
  root.style.setProperty('--font-body-scale', bod.sizeMul);
  root.style.setProperty('--font-caption', cap.family);
  root.style.setProperty('--font-caption-weight', cap.weight);
  root.style.setProperty('--font-caption-scale', cap.sizeMul);
}
```

Update CSS classes to use these variables:
- `.event-card .card-title` → `font-family: var(--font-title); font-weight: var(--font-title-weight);`
- `.event-card .card-subtitle` → `font-family: var(--font-body);`
- `.event-card .badge, .event-card .footer` → `font-family: var(--font-caption);`

For font-size scaling, use `calc()`: `font-size: calc(52px * var(--font-title-scale));`

- [ ] **Step 3.5: Add `document.fonts.ready` check before export**

```javascript
async function exportPNG() {
  await document.fonts.ready;  // ensure custom fonts are loaded
  // ... existing html2canvas export code
}
```

- [ ] **Step 3.6: Update autoSave/autoLoad**

- [ ] **Step 3.7: Test and verify all 4 presets render correctly with custom fonts**

- [ ] **Step 3.8: Commit**
```bash
git add event_card_maker.html
git commit -m "feat(event-card): add font customization panel"
```

---

## Task 4: Font Customization — Reels Cover Maker

**Files:**
- Modify: `reels_cover_maker.html`

**Rendering architecture**: `updatePreview()` at line 385-388 updates DOM text content. Uses CSS class-based styling. Export via `exportPNG()` at line 390-403 using `html2canvas()` with scale 1080/360 (3x) → 1080x1920 PNG.

**Key font locations in CSS:**
- Line 187-188: Top logo `font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700`
- Line 196: Category badge `font-size: 8px; font-weight: 800`
- Line 207-208: Bottom title `font-family: 'Pretendard', sans-serif; font-size: 24px; font-weight: 800`
- Line 213: Sub-info `font-size: 11px; font-weight: 500`
- Line 219-220: Brand mark `font-family: 'Playfair Display', serif; font-size: 12px; font-weight: 600`

**Font tier mapping:**
- Title: Bottom title (line 207-208) → title tier
- Body: Sub-info (line 213) → body tier
- Caption: Logo (187), badge (196), brand mark (219) → caption tier

- [ ] **Step 4.1: Add Google Fonts imports (same set)**

- [ ] **Step 4.2: Add font state, constants, helpers, and UI panel**

Insert font panel in the editor sidebar. The editor section starts around line 260.

- [ ] **Step 4.3: Apply font settings via CSS custom properties**

Same CSS variable approach as event_card_maker (Task 3). Update the CSS classes at lines 187, 196, 207, 213, 219 to use `var(--font-title)` etc.

- [ ] **Step 4.4: Add `document.fonts.ready` check before export**

- [ ] **Step 4.5: Update autoSave/autoLoad**

- [ ] **Step 4.6: Test and commit**
```bash
git add reels_cover_maker.html
git commit -m "feat(reels-cover): add font customization panel"
```

---

## Task 5: Font Customization — Review Overlay Maker

**Files:**
- Modify: `review_overlay_maker.html`

**Rendering architecture**: `updatePreview()` at line 575-581 updates DOM text content (client label, review text, reviewer name). CSS class-based styling. Export via `exportPNG()` at line 583-606 using `html2canvas()` with scale 2 → 1080x1350 PNG.

**Key font locations in CSS:**
- Line 276: Source badge `font-size: 9px; font-weight: 800`
- Line 290-291: Review title `font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700`
- Line 322-323: Quote mark `font-family: 'Pretendard'; font-size: 60px; font-weight: 700`
- Line 327: Review text `font-size: 16px; font-weight: 500`
- Line 332: Reviewer name `font-size: 11px; font-weight: 600`
- Line 342: Client label `font-size: 11px; font-weight: 500`
- Line 346-347: Brand mark `font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 600`

**Font tier mapping:**
- Title: Review title (290), quote mark (322) → title tier
- Body: Review text (327), client label (342) → body tier
- Caption: Source badge (276), reviewer name (332), brand mark (346) → caption tier

- [ ] **Step 5.1: Add Google Fonts imports (same set)**

- [ ] **Step 5.2: Add font state, constants, helpers, and UI panel**

Insert font panel in the editor sidebar. Editor section starts around line 370.

- [ ] **Step 5.3: Apply font settings via CSS custom properties**

Same CSS variable approach. Update CSS classes at lines 276, 290, 322, 327, 332, 342, 346.

- [ ] **Step 5.4: Add `document.fonts.ready` check before export**

- [ ] **Step 5.5: Update autoSave/autoLoad**

- [ ] **Step 5.6: Test and commit**
```bash
git add review_overlay_maker.html
git commit -m "feat(review-overlay): add font customization panel"
```

---

## Task 6: B&A Photo Comparison Maker (New Page)

**Files:**
- Create: `ba_photo_maker.html`
- Modify: `index.html` (add menu entry)

This is the largest task. The B&A maker replaces Canva dependency for comparison photos.

### Core Features:
1. **Photo Upload**: Drag & drop or click for Before/After photos
2. **Smart Crop**: Canvas-based crop with aspect ratio presets (1:1, 4:5, 3:4)
3. **Layout Options**: Side-by-side, Top-bottom, Slider overlay
4. **Brand Overlay**: IM AESTHETIC watermark, labels, session tags
5. **Font Customization**: Same 3-tier system as other makers
6. **Export**: PNG download at 1080px width (Instagram-ready)

- [ ] **Step 6.1: Create ba_photo_maker.html base structure**

Follow existing maker conventions (same header style, brand colors, Playfair Display header). Include:
- Header with "B&A Photo Maker" title
- Editor sidebar (left): upload zones, crop controls, layout options, font panel
- Preview area (right): live canvas preview
- Export button

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>B&A Photo Maker · IM AESTHETIC</title>
  <!-- Font imports (all 8 fonts) -->
  <!-- CSS: match existing maker style -->
</head>
<body>
  <header>...</header>
  <div class="main">
    <div class="editor">
      <!-- Before photo upload zone -->
      <!-- After photo upload zone -->
      <!-- Crop controls: aspect ratio buttons, drag-to-crop canvas -->
      <!-- Layout selector: side-by-side, top-bottom, slider -->
      <!-- Label options: session number, director name, date -->
      <!-- Brand overlay toggle -->
      <!-- Font panel (same 3-tier) -->
    </div>
    <div class="preview">
      <!-- Live canvas rendering -->
      <canvas id="baCanvas" width="1080" height="1350"></canvas>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 6.2: Implement photo upload with preview**

Two upload zones (Before / After) with drag-and-drop:
```javascript
function uploadPhoto(slot, file) {  // slot: 'before' | 'after'
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      photos[slot] = { img, naturalW: img.width, naturalH: img.height };
      initCrop(slot);
      renderPreview();
      autoSave();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
```

- [ ] **Step 6.3: Implement canvas-based crop tool**

**Architecture**: Two separate `<canvas>` elements per photo slot (before/after), used as crop UI overlays. These are distinct from the main preview canvas (`baCanvas`).

```html
<!-- Crop canvases in the editor sidebar -->
<div class="crop-container" id="crop-before">
  <canvas id="cropCanvas-before" width="300" height="375"></canvas>
</div>
<div class="crop-container" id="crop-after">
  <canvas id="cropCanvas-after" width="300" height="375"></canvas>
</div>
```

**Crop state per slot:**
```javascript
const cropState = {
  before: { x: 0, y: 0, w: 0, h: 0, ratio: '4:5', dragging: false, handle: null },
  after:  { x: 0, y: 0, w: 0, h: 0, ratio: '4:5', dragging: false, handle: null }
};

const CROP_RATIOS = { 'free': null, '1:1': 1, '4:5': 4/5, '3:4': 3/4 };
```

**Crop canvas rendering flow:**
1. `initCrop(slot)`: When photo is loaded, draw scaled photo on crop canvas, set default crop rect to max area fitting the selected ratio
2. `drawCropOverlay(slot)`: Draw photo + semi-transparent dark mask outside crop rect + 8 drag handles (4 corners + 4 edges) + crop rect border
3. Mouse/touch events on crop canvas:
   - `mousedown/touchstart`: Hit-test handles → set `dragging=true` + `handle` type
   - `mousemove/touchmove`: Update crop rect based on handle type (corner resize maintains ratio, edge resize if free ratio, body drag moves rect)
   - `mouseup/touchend`: Finalize, call `renderPreview()`

**Ratio enforcement:**
```javascript
function applyCropRatio(slot, ratioKey) {
  cropState[slot].ratio = ratioKey;
  const ratio = CROP_RATIOS[ratioKey];
  if (!ratio) return;  // free mode
  const cs = cropState[slot];
  // Adjust width/height to maintain ratio, centered on current crop center
  const centerX = cs.x + cs.w / 2;
  const centerY = cs.y + cs.h / 2;
  if (cs.w / cs.h > ratio) {
    cs.w = cs.h * ratio;
  } else {
    cs.h = cs.w / ratio;
  }
  cs.x = centerX - cs.w / 2;
  cs.y = centerY - cs.h / 2;
  // Clamp to canvas bounds
  clampCrop(slot);
  drawCropOverlay(slot);
  renderPreview();
}
```

**Extracting cropped image for main preview:**
```javascript
function getCroppedImage(slot) {
  const photo = photos[slot];
  if (!photo) return null;
  const cs = cropState[slot];
  const canvas = document.createElement('canvas');
  // Scale crop coords from preview-canvas space back to original image space
  const scaleX = photo.naturalW / cropCanvasDisplayW;
  const scaleY = photo.naturalH / cropCanvasDisplayH;
  canvas.width = cs.w * scaleX;
  canvas.height = cs.h * scaleY;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(photo.img, cs.x * scaleX, cs.y * scaleY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  return canvas;
}
```

**Touch support**: All mouse events have parallel touch handlers. Use `e.touches[0].clientX/Y` for position, `e.preventDefault()` to block scroll during crop drag.

- [ ] **Step 6.4: Implement layout rendering on canvas**

Three layout modes rendered on the main 1080-wide canvas:

**Side-by-side (좌우 비교)**:
- Canvas: 1080x1350
- Left half: Before (cropped), Right half: After (cropped)
- Center divider line with arrow icon

**Top-bottom (상하 비교)**:
- Canvas: 1080x1350
- Top half: Before, Bottom half: After
- Horizontal divider

**Slider (슬라이더)**:
- Canvas: 1080x1350  
- Full before underneath, after overlaid with adjustable split position

- [ ] **Step 6.5: Add brand overlay elements**

On the canvas, draw:
- "IM AESTHETIC" brand mark (Playfair Display, top or bottom)
- BEFORE / AFTER labels on each photo (Pretendard bold badge)
- Optional: session number ("3회차"), director name, date
- Color: brand orange `#E8703A` for labels

- [ ] **Step 6.6: Add label/tag customization panel**

```javascript
const labelDefaults = {
  sessionNum: '',       // e.g., '3회차'
  directorName: '',     // e.g., '유수정 원장'
  date: '',             // e.g., '2026.03'
  showBrand: true,
  labelStyle: 'badge'   // 'badge' | 'minimal' | 'none'
};
```

- [ ] **Step 6.7: Implement PNG export**

```javascript
function exportBA() {
  const canvas = document.getElementById('baCanvas');
  const link = document.createElement('a');
  link.download = `IM_BA_${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
```

- [ ] **Step 6.8: Add font customization panel (same pattern as other makers)**

- [ ] **Step 6.9: Add localStorage auto-save**

Key: `im_ba_state` — save text fields, layout choice, crop positions, font settings.
Exclude image data (too large). Show "이전 작업이 있습니다" notice on load.

- [ ] **Step 6.10: Add to index.html hub menu**

Find the menu section in `index.html` (around line 659, after the canva_templates card) and add using the existing `<a class="card">` pattern:
```html
<a class="card" href="ba_photo_maker.html">
  <span class="badge">New</span>
  <svg class="card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="8" width="18" height="32" rx="2"/>
    <rect x="26" y="8" width="18" height="32" rx="2"/>
    <path d="M22 24l4 0" stroke-width="2.5"/>
    <polyline points="24 20 28 24 24 28" stroke-width="2"/>
  </svg>
  <div class="card-title">B&A 비교사진 메이커</div>
  <div class="card-desc">시술 전후 비교사진 제작 · 크롭 · PNG 내보내기</div>
</a>
```

- [ ] **Step 6.11: Test complete workflow**

1. Upload before/after photos of different sizes
2. Crop both to 4:5 ratio
3. Select side-by-side layout
4. Add "3회차" session tag and director name
5. Change title font to Gowun Batang
6. Export PNG → verify 1080px width, clean output
7. Refresh → verify settings restored (except images)

- [ ] **Step 6.12: Commit**
```bash
git add ba_photo_maker.html index.html
git commit -m "feat: add B&A photo comparison maker with crop and brand overlay"
```

---

## Task 7: Final Integration & Polish

- [ ] **Step 7.1: Cross-browser test all modified makers**

Open each maker in Chrome, verify:
- Font customization works
- Gradient slider works (card_news only)
- localStorage save/restore works
- Export produces correct output

- [ ] **Step 7.2: Verify existing functionality not broken**

- Theme switching still works
- Size switching still works
- Server save/load still works
- All 8 card news presets render correctly
- All 4 event card presets render correctly

- [ ] **Step 7.3: Final commit**
```bash
git add -A
git commit -m "chore: final polish and cross-browser fixes for maker enhancements"
```

---

## Dependency Graph

```
Task 1 (Gradient) ──────────────────────────┐
Task 2 (Font: Card News) ──┐                │
Task 3 (Font: Event Card) ─┤── parallel ────┼── Task 7 (Integration)
Task 4 (Font: Reels Cover) ┤                │
Task 5 (Font: Review) ─────┘                │
Task 6 (B&A Maker) ─────────────────────────┘
```

Tasks 1-6 are independent and can be executed in parallel (separate files).
Task 7 depends on all others completing.

**Soft dependency**: Tasks 3-5 follow the font panel pattern established in Task 2. If Task 2's design changes during implementation, Tasks 3-5 should be adjusted accordingly. Recommended: complete Task 2 first, then parallelize Tasks 3-5.

---

## Font Comparison Reference

For the implementing engineer, here's what each font looks like for aesthetic clinic content:

| Font | Korean Sample | EN Sample | Best For |
|------|--------------|-----------|----------|
| Pretendard | 피부 결이 달라집니다 | SKIN CARE | Clean, modern UI text |
| Noto Sans KR | 피부 결이 달라집니다 | SKIN CARE | Neutral, professional |
| Noto Serif KR | 피부 결이 달라집니다 | SKIN CARE | Emotional hooks, premium |
| Playfair Display | — | IM AESTHETIC | Brand mark only |
| Gowun Batang | 피부 결이 달라집니다 | — | Elegant Korean, literary |
| Gowun Dodum | 피부 결이 달라집니다 | — | Soft, friendly, approachable |
| MaruBuri | 피부 결이 달라집니다 | — | Traditional elegance |
| Nanum Myeongjo | 피부 결이 달라집니다 | — | Classic Korean serif, warm |

## Important: html2canvas + Custom Fonts

All 4 makers use `html2canvas` for PNG export. Custom Google Fonts may not render in captures if not fully loaded. **Every maker's export function must include:**
```javascript
await document.fonts.ready;  // wait for all fonts to load before capture
```
This is already noted in Tasks 3-5 but applies to Task 2 (card_news) as well.
