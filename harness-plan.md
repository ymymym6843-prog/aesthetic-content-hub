# Harness Plan — IM AESTHETICS UI/UX Comprehensive Review & Improvement
Generated: 2026-03-31T15:00:00+09:00

## Config
- quality: balanced
- focusOverride: UI/UX, frontend-design
- maxLoops: 3

## Tasks

### Task 1: Card News Maker — Visual Richness & Design Overhaul
- agent: general-purpose
- files: card_news_maker.html
- depends: none
- eval: browser-test
- focus-dimensions: visual-design, color-usage, typography, component-quality
- rubrics: base, frontend
- context: |
    The card_news_maker.html (1668 lines, standalone vanilla JS) is the primary content creation tool.
    User feedback: "too monotone and lacking color compared to canva_templates.html".
    
    Current state:
    - Header: dark bg (#1A1714) with small h1 (16px), very compact and utilitarian
    - Tab bar: white bg with pill-style tabs, functional but bland
    - Editor sidebar: 380px fixed width, white bg with cream panels
    - Preview grid: 400px minmax cards with scale(0.37) from 1080px originals
    - Color palette: mostly warm-white (#FAF8F5), orange (#E8703A), charcoal — very limited
    - Has 4 themes (warm/dark/clean/spring) but UI chrome itself stays monotone
    - 8 content presets with emoji icons, simple card layout
    
    Reference (canva_templates.html) has:
    - Rich dark header with Playfair Display 40px, letter-spacing: 10px, radial gradient overlays
    - Orange accent line (3px gradient)
    - Category sections with icon boxes (44x44, orange bg, box-shadow), category lines
    - Template cards with left accent bar animation on hover, status badges
    - Tag system with colored pills
    - "Open in Canva" buttons with icon
    - Customizing Checklist section
    - Overall much richer visual hierarchy and color diversity
    
    Improvements needed:
    1. Upgrade header to match canva_templates style — dark bg, Playfair Display title, subtitle, orange accent line
    2. Add visual richness to tab bar — subtle gradient or accent elements
    3. Enhance preset cards — add colored category tags, better icon treatment, visual hierarchy
    4. Add section dividers and visual breathing room in editor panels
    5. Improve the empty state illustration
    6. Add subtle background gradients (radial-gradient ambient effects like other pages)
    7. Enhance action bar with better button styling
    8. Consider adding a "tips" or "guide" section similar to canva_templates' Customizing Checklist
    
    Brand constants:
    - Orange: #E8703A, Dark: #1A1410, Cream: #FFF8F0
    - EN font: Playfair Display, KR font: Pretendard
    - Radius: 20px, shadow: 0 4px 24px rgba(26,20,16,0.06)
    
    CSS vars are in :root block (lines 13-67). Header is lines 82-99.
    Tab bar is lines 101-133. Preview grid is line 224.
    Preset cards are lines 417-428.
    The file uses abbreviated class names: .or=orange, .ch=charcoal, .gr=gray, .bd=border.
- test-scenarios: |
    1. Open card_news_maker.html in browser
    2. Verify header has dark background with Playfair Display title, subtitle text, and orange accent line
    3. Verify tab bar has improved visual styling (not plain white)
    4. Click "템플릿 프리셋" tab — verify preset cards have colored tags, improved visual hierarchy
    5. Click any preset — verify slides generate and preview area shows content
    6. Check that the theme selector (warm/dark/clean/spring) still works correctly
    7. Check that the size selector (4:5, 1:1, 9:16) still works
    8. Verify mobile responsive behavior (< 768px) — editor/preview toggle still works
    9. Compare visual richness against canva_templates.html — should feel like same design system
    10. Verify "전체 다운로드" and "Canva 가이드 복사" buttons are styled consistently

### Task 2: Cross-Page Header & Navigation Consistency
- agent: general-purpose
- files: event_card_maker.html, reels_cover_maker.html, review_overlay_maker.html, highlight_cover_maker.html
- depends: none
- eval: browser-test
- focus-dimensions: design-consistency, visual-design, navigation
- rubrics: base, frontend
- context: |
    These 4 maker tools have slightly inconsistent header and navigation patterns.
    
    Current header patterns:
    - event_card_maker.html: dark header, Playfair 36px, subtitle, accent-line div — GOOD baseline
    - reels_cover_maker.html: NO dedicated header, uses editor h1 (Playfair 24px) inside sidebar
    - review_overlay_maker.html: NO dedicated header, uses editor h1 (Playfair 24px) inside sidebar
    - highlight_cover_maker.html: NO dark header, uses light page-header with Playfair 42px title
    
    Target consistency (based on canva_templates.html and event_card_maker.html patterns):
    - All should have dark (#1A1410) page header with Playfair Display title
    - Subtitle in muted white (rgba(255,248,240,0.3))
    - 3px orange gradient accent line below header
    - Radial gradient overlays on header for depth
    
    None of these pages have a "back to hub" navigation link.
    The index.html hub is the main entry point — all pages should have a way to return.
    src/styles.css defines a .home-fab (fixed bottom-left circle, 44px) for navigation back.
    
    Layout patterns:
    - event_card_maker: 3-column grid (200px preset | 1fr preview | 320px editor)
    - reels_cover_maker: 2-panel flex (380px editor | 1fr preview)
    - review_overlay_maker: 2-panel flex (380px editor | 1fr preview)
    - highlight_cover_maker: centered grid layout, no sidebar
    
    Brand constants: Orange #E8703A, Dark #1A1410, Cream #FFF8F0
    Fonts: Playfair Display (EN titles), Pretendard (body)
    All pages already load these Google Fonts CDNs.
    
    Improvements:
    1. Add consistent dark header to reels_cover_maker and review_overlay_maker
    2. Normalize highlight_cover_maker header to dark style
    3. Add home navigation (fab button or header link) to all 4 pages
    4. Ensure body::before ambient gradient is present on all pages (already present on most)
- test-scenarios: |
    1. Open each of the 4 HTML files in browser
    2. Verify each has a dark header with Playfair Display title and orange accent line
    3. Verify each has a "back to hub" navigation element (fab button or link)
    4. Click the navigation element — should go to index.html
    5. Verify the header style is visually consistent across all 4 pages
    6. Verify no functionality is broken — form inputs, image upload, export still work
    7. Check that reels_cover_maker editor sidebar still works after header addition
    8. Check that review_overlay_maker type tabs still function correctly

### Task 3: Carousel Templates & Checklist Page Design Polish
- agent: general-purpose
- files: carousel_templates.html, 현장촬영_체크리스트.html
- depends: none
- eval: browser-test
- focus-dimensions: visual-design, typography, design-consistency
- rubrics: base, frontend
- context: |
    carousel_templates.html (89,295 bytes):
    - Uses different CSS var naming: --warm-white, --charcoal, --dark-warm, --orange-light, etc.
    - Header: orange bg (.page-header background: var(--dark-warm) = #E8703A) — different from others using dark bg
    - Uses Noto Serif KR and Cormorant Garamond fonts — different from brand standard Playfair Display
    - Body bg: #FAF8F5 with no ambient radial gradients
    - Has custom slide preview system with 5 template designs
    - No home navigation
    
    현장촬영_체크리스트.html:
    - Uses Montserrat font for brand name — non-standard (should be Playfair Display)
    - Header: dark bg (#3D3229) with orange border-bottom — close but not matching
    - Body: simple padding layout, max-width 880px
    - No ambient background gradients
    - No home navigation
    - Has checkbox functionality for photo shoot checklist
    
    Improvements needed:
    1. carousel_templates.html: Change header to dark bg style (matching canva_templates pattern)
    2. carousel_templates.html: Add ambient radial gradients to body::before
    3. carousel_templates.html: Add home navigation fab
    4. 현장촬영_체크리스트.html: Replace Montserrat with Playfair Display for brand name
    5. 현장촬영_체크리스트.html: Update header to match standard dark header pattern
    6. 현장촬영_체크리스트.html: Add ambient background gradients
    7. 현장촬영_체크리스트.html: Add home navigation
    
    Brand header pattern (from canva_templates.html):
    ```css
    .page-header { background: #1A1410; padding: 56px 32px 48px; text-align: center; position: relative; overflow: hidden; }
    .page-header::before { radial-gradient overlays for depth }
    .page-header::after { 3px orange gradient accent line }
    .page-header h1 { font-family: 'Playfair Display'; font-size: 40px; color: #FAF8F5; letter-spacing: 10px; }
    ```
- test-scenarios: |
    1. Open carousel_templates.html — verify dark header with Playfair Display title
    2. Verify orange accent line below header
    3. Verify ambient background gradients visible on page body
    4. Verify home navigation element present and functional
    5. Verify all 5 carousel template previews still render correctly
    6. Open 현장촬영_체크리스트.html — verify updated header with Playfair Display
    7. Verify checkboxes still function (click to toggle)
    8. Verify home navigation works
    9. Compare both pages against canva_templates.html — headers should look consistent

### Task 4: Index Hub Page — Stats Section & Visual Enhancement
- agent: general-purpose
- files: index.html
- depends: none
- eval: browser-test
- focus-dimensions: visual-design, information-architecture, interaction-design
- rubrics: base, frontend
- context: |
    index.html is the main hub (26,751 bytes) with PIN lock and menu grid.
    
    Current state (lines 150-350):
    - PIN screen: dark bg, Playfair Display brand, dot indicators — GOOD
    - Header: dark bg, Playfair 48px "IM AESTHETIC", subtitle, accent line — GOOD
    - Menu grid: 3-column grid, white cards with left accent bar animation — GOOD
    - Stats section: 4-column grid with Playfair numbers — decent
    - Footer: dark bg — basic
    
    CSS vars (lines 10-29): properly defined with --orange, --cream, --warm-bg, etc.
    Body::before has ambient radial gradients — GOOD.
    
    The hub page is already well-designed but could use:
    1. Stats section: numbers could use animated counting or better visual treatment
    2. Footer: could include quick links, brand info, version indicator
    3. Card descriptions could be more descriptive/useful
    4. Section labels between card groups could have better visual weight
    5. Consider adding a "recently used" or "quick access" section
    6. Add subtle micro-interactions (ripple effect on cards, smoother transitions)
    
    This is lower priority than the other tasks. Focus on:
    - Improving footer with brand info and useful links
    - Enhancing stats section visual treatment
    - Adding version/build indicator in footer
    - Ensuring all menu links point to correct pages
    
    Current menu items should link to all 11+ pages. Verify all links work.
- test-scenarios: |
    1. Open index.html — PIN screen appears
    2. Enter PIN (check JS for PIN value) — main content reveals with animation
    3. Verify header displays correctly with Playfair Display title
    4. Verify all menu cards are present and link to correct pages
    5. Click each card — verify it navigates to the correct page
    6. Verify stats section displays with proper styling
    7. Verify footer has brand information
    8. Check responsive behavior — cards should reflow on mobile
    9. Verify logout button works (returns to PIN screen)

### Task 5: React Pages — Dashboard & Instagram Preview Consistency
- agent: general-purpose
- files: src/dashboard.jsx, src/instagram-preview.jsx, src/styles.css, src/components/ProfileHeader.jsx, src/components/GridView.jsx
- depends: none
- eval: code-review
- focus-dimensions: design-consistency, component-quality, code-quality
- rubrics: base, frontend
- context: |
    The React pages (dashboard.html, instagram_preview_react.html) use Vite + React 18 + Tailwind.
    They share src/styles.css which defines brand CSS vars and a .home-fab navigation button.
    
    src/styles.css (72 lines):
    - CSS vars: --brand-orange: #E8703A, --brand-cream: #FAF4EA, etc.
    - .home-fab: fixed bottom-left 44px circle for hub navigation
    - No Tailwind brand-orange utility defined here (that's in tailwind.config.cjs)
    
    Review needed:
    1. Check if dashboard.jsx and instagram-preview.jsx use consistent brand colors
    2. Verify .home-fab is rendered in both React pages for hub navigation
    3. Check ProfileHeader.jsx and GridView.jsx for brand consistency
    4. Ensure Tailwind classes match brand design tokens
    5. Look for hardcoded colors that should use CSS vars or Tailwind config
    6. Check component structure follows project conventions (.jsx, no TS)
    
    The React pages are built separately from the standalone HTML pages.
    They use different styling approach (Tailwind vs inline CSS).
    Need to ensure visual consistency between React and standalone pages.
    
    Key files to review:
    - src/dashboard.jsx: 18,059 bytes — content calendar, AI generation interface
    - src/instagram-preview.jsx: 9,898 bytes — feed preview + HTML2Canvas capture
    - src/components/ProfileHeader.jsx: Instagram profile mockup header
    - src/components/GridView.jsx: Feed grid display
    - src/styles.css: shared styles
    
    Focus on:
    - Color consistency with brand palette
    - Typography matching (Playfair Display for EN, Pretendard for KR)
    - Navigation back to hub (home-fab presence)
    - Overall visual polish level compared to standalone pages

### Task 6: Trend Analysis & Profile Renewal — Design Alignment
- agent: general-purpose
- files: trend_analysis_2026.html, instagram_profile_renewal_1.html
- depends: none
- eval: browser-test
- focus-dimensions: visual-design, design-consistency, typography
- rubrics: base, frontend
- context: |
    These are reference/documentation pages that have different design patterns.
    
    trend_analysis_2026.html:
    - Uses Noto Sans KR (not Pretendard) as primary font
    - Body bg: #F4EEE6 with plain padding, no ambient gradients
    - No dark header — uses centered text header with eyebrow text
    - Has rich content: account cards, insight grid, comparison table, keyword cloud, strategy cards
    - Good internal design but doesn't match the app's header pattern
    - No home navigation
    
    instagram_profile_renewal_1.html:
    - Uses Noto Sans KR (not Pretendard) as primary font
    - Body bg: #F7F3EE with plain padding
    - No dark header — uses centered .page-title
    - Has comparison cards (before/after), profile mockups
    - No home navigation
    
    These pages use different font stacks and header patterns from the rest of the app.
    
    Improvements:
    1. Add dark header with Playfair Display title to both pages
    2. Add ambient background gradients
    3. Add home navigation (fab or header link)
    4. Consider adding Pretendard as body font (keep Noto Sans KR as fallback)
    5. These are read-only reference pages, so functionality changes are minimal
    
    Both pages are content-heavy documents. The main changes are chrome/shell consistency:
    - Header style
    - Background treatment
    - Navigation
    - Font consistency
- test-scenarios: |
    1. Open trend_analysis_2026.html — verify dark header present with brand title
    2. Verify content sections (account cards, insights, tables) still render correctly
    3. Verify ambient background gradients visible
    4. Verify home navigation element present and works
    5. Open instagram_profile_renewal_1.html — verify dark header present
    6. Verify comparison cards and profile mockups still display correctly
    7. Verify home navigation works
    8. Both pages should feel like part of the same application as canva_templates.html
