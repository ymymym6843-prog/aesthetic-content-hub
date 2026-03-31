# IM_AESTHETICS

## Project Overview
IM AESTHETIC (아이엠에스테틱) - Daegu premium aesthetic clinic content management system.
Google Generative AI + Supabase for Instagram content creation, management, and preview.

**Positioning**: Wedding care specialist (웨딩케어 전문)
**3 Directors**: Yu Sujeong (skincare), Woo Yeonwoo (body alignment), Kim Eunkyung (7-sense therapy)
**Core concept**: 3-person care system (3인 케어 시스템)

## Tech Stack
- **Frontend**: React 18, Vite 6, Tailwind CSS 3
- **Backend**: Express.js (API server, port 3001)
- **AI**: Google Generative AI (Gemini)
- **DB**: MariaDB (118.45.181.229, mysql2/promise)
- **Other**: Axios, Cheerio (scraping), HTML2Canvas (capture)
- **Session**: localStorage auto-save (4 maker tools)
- **Deploy**: Vercel (from root directory)

## Commands
```bash
npm run dev        # Dev server (Vite)
npm run build      # Production build
npm run preview    # Preview build
node server.js     # API server (port 3001)
```

## Directory Structure
```
IM_AESTHETICS/
├── index.html                    # PIN lock + hub menu (vanilla JS)
├── dashboard.html                # React: 12-week content dashboard
├── instagram_preview_react.html  # React: feed grid preview
├── card_news_maker.html          # Standalone: card news maker (8 presets)
├── carousel_templates.html       # Standalone: 5 carousel design guides
├── canva_templates.html          # Canva template hub (10 templates, iframe embed)
├── event_card_maker.html         # Standalone: event/promo card maker (4 presets)
├── highlight_cover_maker.html    # Standalone: highlight cover generator
├── reels_cover_maker.html        # Standalone: reels cover maker
├── review_overlay_maker.html     # Standalone: review overlay maker
├── 현장촬영_체크리스트.html        # Standalone: photo checklist
├── server.js                     # Express API (scraping + Gemini + image save)
├── src/
│   ├── components/               # React UI components (ProfileHeader, etc.)
│   ├── data/                     # Static data (posts.js with 12-week strategy)
│   ├── lib/                      # Supabase, Gemini clients
│   ├── styles.css                # Tailwind + brand CSS vars
│   ├── dashboard.jsx             # Dashboard page
│   └── instagram-preview.jsx     # Feed preview page
├── public/
│   ├── feed_images/              # Feed grid images (grid_a_*, grid_c_*)
│   ├── highlight_covers/         # 6 highlight cover JPEGs
│   ├── logo-*.svg                # Logo variants (orange, white, dark)
│   └── im-symbol.svg             # IM symbol mark
└── docs/                         # Guides & references (10 markdown files)
```

## Brand 6-Color Palette
- **Brand Orange**: `#E8703A` — CTA, 포인트 (15~25%)
- **Cream**: `#FFF8F0` — 기본 배경
- **Warm Beige**: `#F5EDE0` — 구분 영역, 서브 배경
- **Gold Accent**: `#D4A04A` — 배지, 장식선 (오렌지 인접 금지)
- **Body Text**: `#3D2E24` — 제목, 본문
- **Sub Text**: `#9B8A7A` — 캡션, 보조 정보

## Typography (Elegant-Clear System)
- **훅 제목 (KR)**: Noto Serif KR 300 (감성 유입)
- **콘텐츠 제목 (KR)**: Pretendard 600 (정보 전달)
- **본문 (KR)**: Pretendard 400
- **EN 레이블**: Pretendard 700, 16px, letter-spacing 0.15em
- **브랜드마크**: Playfair Display 400 (IM AESTHETIC에만 한정)
- **페이지 헤더**: Playfair Display 400
- **Account**: @im.aesthetic.official
- **Location**: Daegu Suseong-gu Beomeo-dong Mark Palace

## Core Rules
- `.jsx` extension (no TypeScript).
- MariaDB / Google AI API keys via env vars only. No hardcoding.
- Cheerio scraping only on Express backend. No browser scraping.
- HTML2Canvas capture on client only.
- Components in `components/`, page files in `src/` root.
- No "since" expression (directors have different career lengths).
- Customer anonymity only (30대 예비신부님 style).
- Emoji whitelist: 🤍✨💫🌿💍 (no face emojis).

## Key Modules
- `lib/`: Supabase client, Google Generative AI init
- `dashboard.jsx`: Content feed, AI generation interface
- `instagram-preview.jsx`: Instagram format preview + HTML2Canvas capture
- `server.js`: Cheerio scraping + Gemini content/image generation APIs
- `src/data/posts.js`: 12-week strategy data + feed post captions/hashtags

## HTML Pages (11 total)
| Page | Type | Description |
|------|------|-------------|
| `index.html` | Vanilla JS | PIN lock + 10-menu hub |
| `dashboard.html` | React | 12-week content calendar |
| `instagram_preview_react.html` | React | Feed grid preview |
| `card_news_maker.html` | Standalone | Card news maker (8 presets, PNG export) |
| `carousel_templates.html` | Standalone | 5 carousel design guide templates |
| `canva_templates.html` | Standalone | Canva template hub (10 templates, iframe embed) |
| `event_card_maker.html` | Standalone | Event/promo card maker (4 presets) |
| `highlight_cover_maker.html` | Standalone | Highlight cover generator (6 covers) |
| `reels_cover_maker.html` | Standalone | Reels cover image maker |
| `review_overlay_maker.html` | Standalone | Review overlay image maker |
| `현장촬영_체크리스트.html` | Standalone | Photo shoot checklist |

## MariaDB (이관 완료 2026-03-31)
- **Host**: 118.45.181.229 / DB: im-insta-yumin
- **Tables**: clinics, directors, week_strategies, posts, post_images
- **clinic_id**: '00000000-0000-0000-0000-000000000001'
- **Env vars**: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- **API**: Express server/routes/db-routes.js + Vercel api/db/*.js (동기화 노트 포함)

## localStorage Auto-Save
- 4개 메이커 도구에 자동 저장/복구 기능
- Keys: `im_review_state`, `im_reels_state`, `im_event_state`, `im_cardnews_state`
- 새로고침/종료 후에도 작업 유지, "새로 시작" 버튼으로 초기화
- 이미지 용량 초과 시 텍스트만 저장 (graceful fallback)

## Current Status
2026 wedding care renewal complete. 밝은 톤 전환 + 6색 팔레트 + Elegant-Clear 타이포그래피 적용.
