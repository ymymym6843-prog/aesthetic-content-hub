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
- **DB / Auth**: Supabase
- **Other**: Axios, Cheerio (scraping), HTML2Canvas (capture)
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

## Brand Constants
- **Brand color**: `#E8703A` (orange) — CSS var `--brand-orange`
- **Dark**: `#1A1410`
- **Cream bg**: `#FFF8F0`
- **EN font**: Playfair Display
- **KR font**: Pretendard / Noto Sans KR
- **Account**: @im.aesthetic.official
- **Location**: Daegu Suseong-gu Beomeo-dong Mark Palace

## Core Rules
- `.jsx` extension (no TypeScript).
- Supabase / Google AI API keys via env vars only. No hardcoding.
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

## Supabase DB
- **Project ID**: tqbbkxadeqlnwnbqwikk
- **Tables**: clinics, directors, week_strategies, posts, post_images
- **clinic_id**: '00000000-0000-0000-0000-000000000001'
- **Env vars**: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

## Current Status
2026 wedding care renewal complete. Content pipeline + Canva template system operational.
