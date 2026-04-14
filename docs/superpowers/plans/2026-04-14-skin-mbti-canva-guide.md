# Skin MBTI Canva Template Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `skin_mbti_canva_guide.html` — a comprehensive visual reference guide for creating 6 types of Canva templates for IM AESTHETIC's Skin MBTI Instagram content.

**Architecture:** Single standalone HTML page following the existing `imground_templates.html` pattern. Contains CSS mockup previews of each template layout, 16-type data tables (characters, Do's/Don'ts, fragrances), and brand guidelines. All data embedded inline from `skin_types_data.js` and the docx extract.

**Tech Stack:** Vanilla HTML/CSS/JS, Pretendard + Playfair Display fonts, IM AESTHETIC 6-color brand palette, no build step.

---

## Confirmed Requirements

### 6 Template Types

| # | Template | Canva Format | Slides | Content |
|---|----------|-------------|--------|---------|
| 1 | 스킨 MBTI 앱 진단 화면 | 1080×1350 (4:5) | 1장 | 앱 진단 화면 캡처 사진 + IM 브랜딩 프레임 |
| 2 | 스킨 MBTI 캐릭터 카드뉴스 | 1080×1350 (4:5) | 3장 캐러셀 | 커버(MP4 영상 크롭) → O/X 키워드 → 아유르베다 차트 캡처 + 향기 |
| 3 | 엑스바디 결과지 | 1080×1350 (4:5) | 1장 | 엑스바디 측정 결과 사진 + IM 브랜딩 프레임 |
| 4 | 포커스킨 결과지 | 1080×1350 (4:5) | 1장 | 포커스킨 측정 결과 사진 + IM 브랜딩 프레임 |
| 5 | 질문지 작성 모습 | 1080×1350 (4:5) | 1장 | 고객 작성 장면 사진 + IM 브랜딩 프레임 |
| 6 | (공통) 브랜드 가이드 | — | — | 6색 팔레트, 폰트, 로고 사용법 |

### Character MP4 Videos
- 16종 캐릭터 애니메이션 영상 (9:16 비율, 중앙집중형)
- Canva에서 크롭(4:5)하여 커버 슬라이드에 사용
- 예시: `tofu.mp4` (DSNT 두부 캐릭터, ~1.6MB)

### 16 Type Data (docx 기준)

| Code | 캐릭터 | 향기 | Do's (4개) | Don'ts (4개) |
|------|--------|------|-----------|-------------|
| OSNT | 알로에 (Aloe) | 티트리 (Tea Tree) | ✓ | ✓ |
| OSNW | 흰 복숭아 (White Peach) | 네롤리 (Neroli) | ✓ | ✓ |
| OSPT | 토마토 (Tomato) | 유칼립투스 (Eucalyptus) | ✓ | ✓ |
| OSPW | 딸기 (Strawberry) | 페퍼민트 (Peppermint) | ✓ | ✓ |
| ORNT | 청포도 (Green Grape) | 자몽 (Grapefruit) | ✓ | ✓ |
| ORNW | 배 (Pear) | 레몬그라스 (Lemongrass) | ✓ | ✓ |
| ORPT | 메추리알 (Quail Egg) | 베르가못 (Bergamot) | ✓ | ✓ |
| ORPW | 아보카도 (Avocado) | 로즈마리 (Rosemary) | ✓ | ✓ |
| DSNT | 두부 (Tofu) | 카모마일 (Chamomile) | ✓ | ✓ |
| DSNW | 코코넛 (Coconut) | 라벤더 (Lavender) | ✓ | ✓ |
| DSPT | 석류알 (Pomegranate Seed) | 로즈 (Rose) | ✓ | ✓ |
| DSPW | 라즈베리 (Raspberry) | 샌달우드 (Sandalwood) | ✓ | ✓ |
| DRNT | 선인장 (Cactus) | 일랑일랑 (Ylang Ylang) | ✓ | ✓ |
| DRNW | 감자 (Potato) | 시나몬 (Cinnamon) | ✓ | ✓ |
| DRPT | 올리브 (Olive) | 패츌리 (Patchouli) | ✓ | ✓ |
| DRPW | 무화과 (Fig) | 진저 (Ginger) | ✓ | ✓ |

---

## File Structure

Single file creation:
- **Create:** `skin_mbti_canva_guide.html` (root directory, standalone page)
- **Modify:** `index.html` (add menu link — optional, per user preference)

---

## Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────┐
│  HEADER: "SKIN MBTI CANVA GUIDE"        │
│  Playfair Display + subtitle + count    │
├─────────────────────────────────────────┤
│  SECTION 1: 브랜드 가이드 (Brand Guide)  │
│  ├── 6색 팔레트 (color swatches)         │
│  ├── 폰트 시스템 (font samples)          │
│  └── 로고 사용법 (logo guidelines)       │
├─────────────────────────────────────────┤
│  SECTION 2: 카드뉴스 3장 레이아웃 시안   │
│  ├── 슬라이드 1: 커버 (영상 크롭 영역)   │
│  ├── 슬라이드 2: Do's & Don'ts (O/X)    │
│  └── 슬라이드 3: 아유르베다 + 향기       │
│  (CSS 미니 프리뷰 3개 나란히)            │
├─────────────────────────────────────────┤
│  SECTION 3: 프레임 템플릿 4종 시안       │
│  ├── 앱 진단 화면                        │
│  ├── 엑스바디 결과지                     │
│  ├── 포커스킨 결과지                     │
│  └── 질문지 작성 모습                    │
│  (CSS 미니 프리뷰 4개 그리드)            │
├─────────────────────────────────────────┤
│  SECTION 4: 16타입 데이터 테이블         │
│  ├── 타입별 카드 (code, 캐릭터, 향기)    │
│  ├── Do's 4개 / Don'ts 4개              │
│  ├── 마스터의 한마디                     │
│  └── 향기 상세 설명                      │
│  (접이식 아코디언 or 탭 UI)              │
├─────────────────────────────────────────┤
│  SECTION 5: Canva 제작 가이드            │
│  ├── Step-by-step 제작 순서              │
│  ├── 영상 크롭 가이드 (9:16 → 4:5)      │
│  └── 앱 URL + QR                        │
└─────────────────────────────────────────┘
```

---

## Tasks

### Task 1: Page Skeleton + Header + Brand Guide Section

**Files:**
- Create: `skin_mbti_canva_guide.html`

- [ ] **Step 1: Create HTML boilerplate with brand CSS variables**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skin MBTI - Canva Template Guide</title>
  <!-- Fonts: Pretendard, Playfair Display, Noto Serif KR -->
  <!-- CSS variables: 6-color palette, shadows, radius -->
</head>
```

Follow `imground_templates.html` CSS variable pattern exactly:
- `--orange: #E8703A`, `--cream: #FFF8F0`, `--warm-beige: #F5EDE0`
- `--dark: #3D2E24`, `--text-muted: #9B8A7A`, `--gold: #D4A04A`

- [ ] **Step 2: Add page header**

Playfair Display "SKIN MBTI" title, subtitle "CANVA TEMPLATE GUIDE", badge "6 TEMPLATES · 16 TYPES"

- [ ] **Step 3: Add Brand Guide section**

3-column grid:
1. Color Palette — 6 color swatches with hex codes and usage labels
2. Typography — Font samples (Noto Serif KR 300, Pretendard 600/400, Playfair Display)
3. Logo — IM AESTHETIC logo placement rules, @im.aesthetic.official account

- [ ] **Step 4: Verify in browser**

Open `skin_mbti_canva_guide.html` in browser. Check header renders, brand section displays correctly.

---

### Task 2: Card News 3-Slide Layout Mockups (Section 2)

**Files:**
- Modify: `skin_mbti_canva_guide.html`

This is the core section — CSS mockups showing exactly how each of the 3 carousel slides should look in Canva.

- [ ] **Step 1: Create slide mockup container**

3 side-by-side mockups at 4:5 aspect ratio, each labeled "Slide 1", "Slide 2", "Slide 3".

- [ ] **Step 2: Slide 1 — Cover (캐릭터 영상)**

CSS mockup showing:
- Full-bleed video area (center-cropped from 9:16)
- IM AESTHETIC logo top-left
- Type code badge (e.g., "DSNT") top-right
- Character name overlay bottom (e.g., "두부 Tofu")
- Nickname hashtag (e.g., "#유리피부")
- Note: "MP4 영상을 Canva에 업로드 → 9:16에서 4:5로 크롭"

- [ ] **Step 3: Slide 2 — Do's & Don'ts (O/X)**

CSS mockup showing:
- Header: type code + character name
- Left column: "Do's ✓" — 4 green-tinted items
- Right column: "Don'ts ✗" — 4 red-tinted items  
- Footer: IM AESTHETIC branding

- [ ] **Step 4: Slide 3 — 아유르베다 차트 + 향기**

CSS mockup showing:
- Top: "나의 에너지 체질" title
- Center: Photo placeholder for 아유르베다 삼각형 차트 캡처 (앱 스크린샷)
- Bottom: Fragrance section — "당신의 에너지에 행운을 더하는 향기"
  - Fragrance icon + name (e.g., "🌿 카모마일 Chamomile")
  - Fragrance description (1-line poetic text)
- Footer: IM AESTHETIC branding

- [ ] **Step 5: Add annotation callouts**

Each mockup should have numbered callouts explaining:
- What to replace in Canva (text, image, video)
- Exact dimensions and crop instructions
- Color codes to use

- [ ] **Step 6: Verify in browser**

Check 3 slides render side-by-side, responsive on smaller screens (stack vertically).

---

### Task 3: Frame Templates 4-Type Grid (Section 3)

**Files:**
- Modify: `skin_mbti_canva_guide.html`

4 simpler templates — each is a branded photo frame.

- [ ] **Step 1: Create 4-card grid layout**

2×2 grid, each card with 4:5 aspect ratio mockup.

- [ ] **Step 2: Template A — 스킨 MBTI 앱 진단 화면**

- Header: "SKIN MBTI DIAGNOSIS" + IM logo
- Large photo placeholder (70% of area): "앱 진단 화면 캡처를 여기에"
- Bottom strip: @im.aesthetic.official + location text
- Note: "고객의 스킨 MBTI 앱 진단 결과 화면을 캡처하여 삽입"

- [ ] **Step 3: Template B — 엑스바디 결과지**

- Header: "XBODY ANALYSIS" + IM logo
- Large photo placeholder: "엑스바디 결과지 사진을 여기에"
- Bottom strip: branding
- Note: "엑스바디 체형 측정 결과지를 촬영하여 삽입"

- [ ] **Step 4: Template C — 포커스킨 결과지**

- Header: "FOCUSKIN ANALYSIS" + IM logo  
- Large photo placeholder: "포커스킨 결과지 사진을 여기에"
- Bottom strip: branding
- Note: "포커스킨 피부 측정 결과지를 촬영하여 삽입"

- [ ] **Step 5: Template D — 질문지 작성 모습**

- Header: "YOUR SKIN STORY" + IM logo
- Large photo placeholder: "질문지 작성 모습 사진을 여기에"
- Bottom strip: branding
- Mood: warm, candid shot feeling
- Note: "샵에서 고객이 종이에 질문지를 작성하는 모습을 촬영하여 삽입"

- [ ] **Step 6: Verify in browser**

Check 4 frame templates render in grid, placeholders clearly marked.

---

### Task 4: 16-Type Data Reference Section (Section 4)

**Files:**
- Modify: `skin_mbti_canva_guide.html`

Complete data table for all 16 types — the copywriter's reference when filling Canva templates.

- [ ] **Step 1: Create type card component with accordion**

Each type = expandable card showing:
- Header (always visible): Code badge + 캐릭터명 + 분류 + 향기
- Body (expandable): Do's, Don'ts, 마스터의 한마디, 향기 상세

- [ ] **Step 2: Embed all 16 types data as JS object**

```javascript
const CANVA_TYPES = [
  {
    code: "OSNT",
    character: "알로에 (Aloe)",
    category: "지성·민감성·비색소·탄력형",
    fragrance: "티트리 (Tea Tree)",
    keywords: "빠른 회복, 맑은 피부, 진정 케어, 예민+강함",
    masterComment: "열과 노폐물이 만나 트러블로 드러나는 타입이에요...",
    dos: ["진정 토너", "가벼운 수분 젤 크림", "순한 클렌저 세안", "자외선 차단제"],
    donts: ["자극적인 제품", "과도한 스킨케어 루틴", "유분기 많은 크림", "피부를 자주 만지기"],
    fragranceDetail: "티트리 향은 독소가 만든 염증을 정화하고..."
  },
  // ... 15 more types
];
```

- [ ] **Step 3: Create filter tabs**

Filter by group: 전체 / 지성+민감 (OS) / 지성+저항 (OR) / 건성+민감 (DS) / 건성+저항 (DR)

- [ ] **Step 4: Render type cards with accordion toggle**

Click card header → expand/collapse body. Smooth animation.

- [ ] **Step 5: Add copy buttons for text fields**

Each Do/Don't item and fragrance text gets a small "copy" button for easy Canva paste.

- [ ] **Step 6: Verify in browser**

Test all 16 types render, filter works, accordion opens/closes, copy buttons work.

---

### Task 5: Canva Production Guide Section (Section 5)

**Files:**
- Modify: `skin_mbti_canva_guide.html`

Step-by-step instructions for actually making the templates in Canva.

- [ ] **Step 1: Add "제작 순서" section**

Numbered steps:
1. Canva에서 1080×1350 커스텀 사이즈 생성
2. 배경색 #FFF8F0 (크림) 설정
3. 브랜드 폰트 설정 (Pretendard → Canva의 Noto Sans KR 대체)
4. 로고 SVG 업로드
5. 각 템플릿별 레이아웃 배치

- [ ] **Step 2: Add video crop guide**

Visual diagram showing:
- 9:16 original → 4:5 crop (center focus)
- "캐릭터가 중앙집중형이므로 센터 크롭"

- [ ] **Step 3: Add app URL + QR section**

- 스킨 MBTI 앱: https://im-aesthetic.vercel.app/
- QR code (CSS-generated or placeholder image)

- [ ] **Step 4: Add Canva font mapping table**

| 용도 | 원본 폰트 | Canva 대체 폰트 |
|------|-----------|-----------------|
| 훅 제목 | Noto Serif KR 300 | Noto Serif KR Light |
| 본문 | Pretendard 400 | Noto Sans KR Regular |
| 강조 | Pretendard 600 | Noto Sans KR Bold |
| 브랜드 | Playfair Display | Playfair Display |

- [ ] **Step 5: Verify in browser**

Full page review — all 5 sections render correctly, responsive, print-friendly.

---

### Task 6: Final Polish + index.html Link

**Files:**
- Modify: `skin_mbti_canva_guide.html`
- Modify: `index.html` (optional)

- [ ] **Step 1: Add scroll-to-top button**

Fixed button at bottom-right, appears after scrolling.

- [ ] **Step 2: Add print styles**

`@media print` — hide interactive elements, ensure clean A4 printing for offline reference.

- [ ] **Step 3: Test responsive layout**

Check mobile (375px), tablet (768px), desktop (1200px+).

- [ ] **Step 4: Add link in index.html hub menu** (confirm with user first)

Add "스킨 MBTI Canva 가이드" menu item.

- [ ] **Step 5: Final browser verification**

Complete walkthrough of all sections, interactions, and responsive breakpoints.

---

## Data Sources

| Data | Source | Location |
|------|--------|----------|
| 16 type care data | skin_types_data.js | `skin_mbti_booklet/data/skin_types_data.js` |
| Character/Fragrance/Do's/Don'ts | docx extract | `스킨 mbti 진단결과 정리본.docx` |
| Brand palette & fonts | CLAUDE.md | Project root |
| CSS patterns | imground_templates.html | Project root |
| Logo SVGs | public/ | `public/logo-*.svg` |
