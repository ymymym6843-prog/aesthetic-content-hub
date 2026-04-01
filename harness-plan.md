# Harness Plan — Skin MBTI Booklet (Baumann 16-Type Guide) Print-Ready HTML Redesign
Generated: 2026-04-01T10:00:00+09:00

## Config
- quality: balanced
- focusOverride: none
- maxLoops: 3

## Notes
- Source docx available: `C:/Users/dbals/OneDrive/문서/카카오톡 받은 파일/스킨_MBTI_책자_완성본 part 2.docx` (Part 2 only -- 16타입 상세 내용)
- Part 1 (표지, Ch.01~04) docx 파일이 없으므로 Ch.01~04 콘텐츠는 사용자 요구사항 설명 기반으로 구조/플레이스홀더만 잡고, Part 2 docx에서 추출한 실제 콘텐츠를 중심으로 작업
- 최종 산출물: standalone HTML (인쇄 최적화), 데이터 JS 파일, 추출 스크립트 총 3개 파일 + 허브 메뉴 수정
- IM GROUND 브랜딩 (IM AESTHETIC 브랜드 아님 -- 범용 에스테틱 교육용)

## Tasks

### Task 1: DOCX 콘텐츠 추출 -- Python으로 Part 2 docx에서 16타입 데이터를 JS 데이터 파일로 변환
- agent: python-expert
- files: C:/Users/dbals/VibeCoding/IM_AESTHETICS/scripts/extract_skin_mbti.py, C:/Users/dbals/VibeCoding/IM_AESTHETICS/skin_mbti_booklet/data/skin_types_data.js
- depends: none
- eval: code-review
- focus-dimensions: correctness, completeness
- rubrics: base
- context: |
    Source docx: C:/Users/dbals/OneDrive/문서/카카오톡 받은 파일/스킨_MBTI_책자_완성본 part 2.docx

    Task: Write a Python script that uses python-docx to extract the Part 2 content.
    The docx contains 16 Baumann skin types (e.g., OSPT, OSNW, DRPT, etc.) each with:
    - TYPE 특징 (type characteristics)
    - 3-Step 관리 (3-step care plan: Step 1 진정/회복, Step 2 개선, Step 3 유지/강화)
    - 홈케어 처방전 (homecare prescription)
    - 상담 후킹 멘트 (consultation hooking script)
    - 원장님 상담포인트 (director consultation points)
    - 정밀 진단지 체크리스트 (detailed diagnostic checklist)

    Baumann system uses 4 indicators with 2 poles each:
    - O (Oily) vs D (Dry)
    - S (Sensitive) vs R (Resistant)
    - P (Pigmented) vs N (Non-pigmented)
    - W (Wrinkled) vs T (Tight)
    This creates 2^4 = 16 types: OSPT, OSPW, OSNT, OSNW, ORPT, ORPW, ORNT, ORNW, DSPT, DSPW, DSNT, DSNW, DRPT, DRPW, DRNT, DRNW.

    Output format: A JavaScript data file that declares global variables, loadable via script tag.
    Structure:
    ```js
    // Auto-generated from docx extraction
    const SKIN_TYPES_DATA = [
      {
        code: "OSPT",
        name: "민감성 지성 색소침착 주름형",
        indicators: { moisture: "O", sensitivity: "S", pigment: "P", aging: "T" },
        characteristics: "extracted text...",
        threeStepCare: {
          step1: { title: "...", description: "...", equipment: ["..."] },
          step2: { title: "...", description: "...", equipment: ["..."] },
          step3: { title: "...", description: "...", equipment: ["..."] }
        },
        homecare: "extracted text...",
        hookingScript: "extracted text...",
        consultationPoints: "extracted text...",
        diagnosticChecklist: ["item1", "item2", ...]
      },
      // ... all 16 types
    ];
    ```

    Also create placeholder data for Ch.01~04 since Part 1 docx is unavailable:
    ```js
    const CHAPTERS_DATA = {
      ch01_indicators: [
        { pair: "O/D", title: "유수분 지표", left: { code: "O", name: "지성", desc: "placeholder" }, right: { code: "D", name: "건성", desc: "placeholder" } },
        // ... 4 pairs
      ],
      ch02_solutions: [ /* placeholder per indicator pair */ ],
      ch03_overview: "generated from SKIN_TYPES_DATA at runtime",
      ch04_roadmap: {
        step1: { title: "진정/회복", desc: "placeholder" },
        step2: { title: "개선", desc: "placeholder" },
        step3: { title: "유지/강화", desc: "placeholder" }
      }
    };
    ```

    Python script requirements:
    - Use python-docx library (install: pip install python-docx)
    - Read the docx, parse paragraphs and tables
    - Handle Korean text encoding properly (UTF-8)
    - Identify type boundaries by searching for 4-letter type codes (OSPT, etc.) in headings
    - Extract each section (특징, 3-Step, 홈케어, etc.) per type
    - Output as .js file (not .json -- for direct script tag loading)
    - Print extraction summary to console (how many types found, missing sections)
    - Create output directory if it doesn't exist

    Output paths:
    - Script: C:/Users/dbals/VibeCoding/IM_AESTHETICS/scripts/extract_skin_mbti.py
    - Data: C:/Users/dbals/VibeCoding/IM_AESTHETICS/skin_mbti_booklet/data/skin_types_data.js

### Task 2: 인쇄용 HTML 책자 디자인 -- 프리미엄 뷰티 매거진 스타일 standalone HTML
- agent: frontend-architect
- files: C:/Users/dbals/VibeCoding/IM_AESTHETICS/skin_mbti_booklet/index.html
- depends: task-1
- eval: code-review
- focus-dimensions: visual-design, accessibility, maintainability
- rubrics: base
- context: |
    Create a single standalone HTML file for a premium beauty magazine-style print booklet.
    Data source: ./data/skin_types_data.js (loaded via script tag, provides SKIN_TYPES_DATA and CHAPTERS_DATA globals)

    PAGE STRUCTURE (A4 portrait, @media print optimized):

    Cover Page (page 1):
    - "SKIN MBTI" large title (Playfair Display)
    - Subtitle: "Baumann Skin Type Indicator"
    - "16가지 피부 유형 가이드"
    - IM GROUND branding (NOT IM AESTHETIC -- this is a generic aesthetics education brand)
    - Image placeholder area for hero illustration
    - Copyright notice at bottom

    Ch.01: 4가지 피부 지표 해설 (pages 2-3):
    - 4 indicator pairs: O/D, S/R, P/N, W/T
    - Each pair: side-by-side comparison layout
    - Color coding per indicator (see palette below)
    - Image placeholders for infographic icons

    Ch.02: 대립 지표별 맞춤 솔루션 (pages 4-5):
    - Solutions and recommended equipment per indicator pair
    - Table or card layout
    - Image placeholders for equipment photos

    Ch.03: 16가지 유형 한눈에 보기 (pages 6-7):
    - 4x4 grid of summary cards
    - Each card: type code, Korean name, key traits (2-3 lines)
    - Color-coded borders based on dominant indicator
    - Image placeholders for type thumbnails

    Ch.04: 3단계 피부 변화 로드맵 (page 8):
    - Step 1 -> Step 2 -> Step 3 visual timeline/flow
    - Arrow/timeline design connecting the 3 steps

    Ch.05 (Part 2): 16타입 상세 (pages 9~40+, 2 pages per type):
    Each type gets a dedicated spread rendered via JavaScript from SKIN_TYPES_DATA:
    - Page A: TYPE code + name (large display), characteristics, indicator badges with color coding, representative illustration placeholder
    - Page B: 3-Step care plan (numbered cards), homecare prescription, consultation hooking script, director consultation points, diagnostic checklist
    Use a loop to render all 16 types from the data array.

    DESIGN SYSTEM:

    Color Palette (IM GROUND -- NOT IM AESTHETIC brand colors):
    ```css
    :root {
      --bg-cream: #FFFAF5;
      --bg-warm: #FDF6EE;
      --bg-section: #F8F0E8;
      --text-primary: #2C2320;
      --text-secondary: #7A6B60;
      --text-caption: #A89888;
      --rose-gold: #C4907A;
      --rose-gold-light: #E8C8B8;
      --mint: #8DB8A7;
      --mint-light: #C5DDD3;
      --blue-gray: #8A9BAA;
      --blue-gray-light: #C5CED6;
      --warm-gold: #C4A265;
      --warm-gold-light: #E0CCA5;
      --color-oily: #D4A04A;
      --color-dry: #8A9BAA;
      --color-sensitive: #C4907A;
      --color-resistant: #8DB8A7;
      --color-pigmented: #B8885A;
      --color-non-pigmented: #A898C0;
      --color-wrinkled: #8B7355;
      --color-tight: #7AAB7E;
    }
    ```

    Typography:
    - Playfair Display for "SKIN MBTI" title and major English headings
    - Cormorant Garamond 300/400/600 for chapter titles and elegant subheadings (NOTE: Cormorant Garamond is allowed for IM GROUND branding, it was only removed from IM AESTHETIC)
    - Pretendard for Korean body text, labels, and UI elements
    - Load via Google Fonts CDN + Pretendard CDN (same as existing standalone HTMLs)

    Print CSS (@media print):
    ```css
    @page { size: A4 portrait; margin: 15mm 20mm; }
    .page-break { page-break-after: always; }
    .no-break { page-break-inside: avoid; }
    .screen-only { display: none !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    ```
    - CSS counters for page numbers in footer
    - Ensure each type's 2-page spread doesn't split awkwardly

    Image Placeholders pattern:
    ```html
    <div class="image-placeholder" data-desc="description text">
      <div class="placeholder-inner">
        <svg class="placeholder-icon">...</svg>
        <span class="placeholder-text">description text</span>
        <span class="placeholder-note">Google Flow 생성 예정</span>
      </div>
    </div>
    ```
    Style: dashed border (#C5CED6), light background (#F8F0E8), centered content, appropriate aspect ratio.

    Screen-only UI elements (hidden when printing):
    - Fixed top bar with chapter navigation links (jump to sections via anchor)
    - "인쇄하기" button (calls window.print())
    - Optionally a floating table of contents

    Key design elements for luxury magazine feel:
    - Chapter divider pages with large elegant chapter numbers
    - Pull quotes / highlight boxes with rose-gold left border
    - Thin elegant horizontal rules (1px, faded gradient)
    - Generous whitespace -- luxury through breathing room
    - Color-coded indicator badges (small rounded pills with indicator color)
    - Subtle background patterns or textures via CSS gradients
    - Clean card layouts with soft shadows for 3-step care sections

    Reference existing standalone HTML pattern from the project:
    - event_card_maker.html uses: inline style block, Pretendard CDN, Playfair Display CDN, CSS variables in :root
    - This booklet follows same self-contained pattern but loads external data JS file
    - Use semantic HTML5 (section, article, header, nav, footer)

    File location: C:/Users/dbals/VibeCoding/IM_AESTHETICS/skin_mbti_booklet/index.html

### Task 3: 허브 메뉴(index.html)에 스킨 MBTI 책자 링크 추가
- agent: frontend-architect
- files: C:/Users/dbals/VibeCoding/IM_AESTHETICS/index.html
- depends: task-2
- eval: code-review
- focus-dimensions: consistency, correctness
- rubrics: base
- context: |
    Add a new menu item to the hub menu in index.html for the Skin MBTI booklet.

    The hub menu (index.html) is a PIN-locked vanilla JS page with a grid of menu items.
    Add a new entry pointing to skin_mbti_booklet/index.html with:
    - Title: "스킨 MBTI 책자"
    - Subtitle/description: "16가지 피부 유형 가이드 (인쇄용)"
    - Icon: Use a book/document style icon or emoji consistent with existing menu items
    - Place it after existing menu items, following the exact same HTML/CSS card pattern

    IMPORTANT: Read index.html first to understand the exact menu structure, card styling,
    and grid layout pattern. Then add the new item following the same pattern exactly.
    The hub uses IM AESTHETIC brand colors (orange #E8703A, cream #FFF8F0, etc.) --
    maintain full visual consistency with the existing hub design.
    Do NOT change any existing menu items or styles -- only add the new entry.
