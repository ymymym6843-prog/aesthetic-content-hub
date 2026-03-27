# IM AESTHETICS - Instagram Content Management System

IM에스테틱 (대구 수성구 범어동 마크팰리스) 의 Instagram 콘텐츠 전략을 관리하는 웹 애플리케이션입니다.

3명의 전문 디렉터가 1인 고객을 케어하는 **3인 케어 시스템**을 기반으로, 주차별 포스트(화/목/토 스케줄)의 기획·제작·발행을 관리합니다. 12주 기본 전략 이후에도 새 주차를 무제한 추가할 수 있으며, 캡션 템플릿 엔진과 발행 체크리스트로 콘텐츠 제작 워크플로우를 지원합니다.

---

## 클리닉 정보

| 항목 | 내용 |
|------|------|
| 상호 | IM에스테틱 (IM AESTHETICS) |
| 위치 | 대구 수성구 범어동 마크팰리스 |
| 핵심 개념 | 3인 케어 시스템 |
| 포지셔닝 | 웨딩케어 전문 |
| 디렉터 | 유수정 (메디컬 스킨케어), 우연우 (바디 얼라인먼트), 김은경 (7-Sense 테라피) |
| 콘텐츠 일정 | 12주 기본 + 무제한 확장 / 화·목·토 발행 |
| 인스타그램 | @im.aesthetic.official |

---

## Tech Stack

| 분류 | 기술 |
|------|------|
| Build | Vite 6 |
| UI | React 18 + Tailwind CSS 3 |
| Backend API | Express.js (port 3001) |
| AI | Google Generative AI (Gemini) |
| DB / Storage | Supabase (PostgreSQL + Storage) |
| Scraping | Cheerio (server-side only) |
| Image Export | HTML2Canvas (client-side) |
| Deploy | Vercel |
| Font | Pretendard, Playfair Display |

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 개발 서버 실행

```bash
npm run dev        # Vite 개발 서버 (port 5173)
node server.js     # API 서버 (port 3001) — 스크래핑/Gemini 생성 시 필요
```

브라우저에서 `http://localhost:5173` 을 열고 PIN을 입력하여 진입합니다.

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview   # 빌드 결과 로컬 확인
```

---

## 프로젝트 구조

```
IM_AESTHETICS/
├── index.html                        # PIN lock + 허브 메뉴 (vanilla JS)
│
│   ── 전략 & 분석 ──
├── instagram_profile_renewal_1.html  # 프로필 리뉴얼 가이드 (비포&애프터)
├── trend_analysis_2026.html          # 2026 트렌드 심층 분석 (경쟁 7개 계정)
│
│   ── 콘텐츠 도구 ──
├── dashboard.html                    # React: 12주 콘텐츠 대시보드
├── instagram_preview_react.html      # React: Instagram 피드 미리보기
├── card_news_maker.html              # Standalone: 카드뉴스 메이커 (8 프리셋)
├── highlight_cover_maker.html        # Standalone: 하이라이트 커버 생성기
├── event_card_maker.html             # Standalone: 이벤트/프로모션 카드 메이커
├── reels_cover_maker.html            # Standalone: 릴스 커버 메이커
├── review_overlay_maker.html         # Standalone: 리뷰 오버레이 메이커
├── canva_templates.html              # Standalone: Canva 템플릿 허브 (10종)
├── carousel_templates.html           # Standalone: 캐러셀 디자인 가이드
├── 현장촬영_체크리스트.html             # Standalone: 촬영 체크리스트
│
├── server.js                         # Express API (스크래핑 + Gemini 생성)
├── vite.config.js                    # Vite multi-entry 빌드 (13개 HTML)
├── tailwind.config.cjs
├── postcss.config.js
│
├── public/
│   ├── feed_images/                  # 피드 이미지 (정적 서빙)
│   ├── highlight_covers/             # 하이라이트 커버 JPEG 6종
│   ├── logo-*.svg                    # 로고 배리에이션
│   └── im-symbol.svg                 # IM 심볼 마크
│
├── scripts/
│   ├── reseed.sql                    # DB 시드 데이터
│   ├── reseed_db.mjs                 # DB 리시드 스크립트
│   ├── reseed_captions.mjs           # 캡션 동기화 스크립트
│   └── migrate_publish_checklist.sql # 발행 체크리스트 마이그레이션
│
├── docs/                             # 전략 문서 (Markdown)
│
└── src/
    ├── styles.css                    # Tailwind + 브랜드 CSS 변수
    ├── index-app.js                  # index.html 진입점
    ├── dashboard.jsx                 # 대시보드 App
    ├── instagram-preview.jsx         # 피드 미리보기 App
    ├── components/
    │   ├── Icons.jsx                 # 대시보드용 SVG 아이콘
    │   ├── InstagramIcons.jsx        # Instagram 미리보기용 SVG 아이콘
    │   ├── PostCard.jsx              # 포스트 카드 (상태 배지)
    │   ├── WeekNav.jsx               # 주차 네비게이션
    │   ├── WeekWizard.jsx            # 새 주차 생성 위저드
    │   ├── PostDetail.jsx            # 포스트 상세 모달
    │   ├── PostEditor.jsx            # 포스트 생성/수정 에디터
    │   ├── ProfileHeader.jsx         # Instagram 프로필 헤더
    │   ├── GridView.jsx              # Instagram 3열 그리드
    │   └── FeedDetailView.jsx        # Instagram 피드 상세
    ├── data/
    │   └── posts.js                  # strategyData + feedPosts (폴백 데이터)
    └── lib/
        ├── supabase.js               # Supabase 클라이언트 + DB 함수
        └── templates.js              # 캡션 템플릿 엔진
```

---

## 페이지 설명 (13개)

### 전략 & 분석

| 페이지 | 설명 |
|--------|------|
| `instagram_profile_renewal_1.html` | 프로필 비포&애프터 목업, 바이오 전략, 하이라이트 구성, 캡션 예시, 링크트리 전략 |
| `trend_analysis_2026.html` | 경쟁 7개 계정 심층 분석, 트렌드 키워드, 전략 비교표, IM 전략 제언, 캡션 갤러리 |

### 콘텐츠 도구

| 페이지 | 타입 | 설명 |
|--------|------|------|
| `index.html` | Vanilla JS | PIN 잠금 + 허브 메뉴 (전략 2 + 도구 10) |
| `dashboard.html` | React | 12주 콘텐츠 캘린더, 포스트 CRUD, 발행 체크리스트 |
| `instagram_preview_react.html` | React | Instagram 피드 그리드 미리보기, 상태별 필터 |
| `card_news_maker.html` | Standalone | 카드뉴스 제작 (8 프리셋, PNG 내보내기) |
| `highlight_cover_maker.html` | Standalone | 하이라이트 커버 생성기 (6종) |
| `event_card_maker.html` | Standalone | 이벤트/프로모션/가격표 카드 (4 프리셋) |
| `reels_cover_maker.html` | Standalone | 릴스 커버 이미지 (1080x1920) |
| `review_overlay_maker.html` | Standalone | 네이버/카톡 리뷰 피드 이미지 |
| `canva_templates.html` | Standalone | Canva 템플릿 허브 (10종, iframe 임베드) |
| `carousel_templates.html` | Standalone | 캐러셀 디자인 가이드 (5 템플릿) |
| `현장촬영_체크리스트.html` | Standalone | 현장 촬영 가이드 + 체크리스트 |

---

## API 서버 (server.js)

| 엔드포인트 | 설명 |
|-----------|------|
| `POST /api/generate` | URL 스크래핑 (Cheerio) + Gemini 콘텐츠 생성 |
| `POST /api/generate-image` | Gemini 이미지 생성 (gemini-2.0-flash-exp → imagen-3.0 폴백) |
| `POST /api/save-feed-images` | base64 이미지를 public/feed_images/에 저장 |

---

## DB 스키마 (Supabase)

### clinics
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | 클리닉 고유 ID |
| name | text | 클리닉명 |
| phone | text | 연락처 |
| address | text | 주소 |

### directors
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | 디렉터 ID |
| clinic_id | uuid (FK) | 소속 클리닉 |
| name | text | 이름 |
| role | text | 역할 |
| specialty | text | 전문 분야 |
| experience_years | int | 경력 연수 |
| photo_url | text | 프로필 사진 URL |

### week_strategies
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | 전략 ID |
| clinic_id | uuid (FK) | 소속 클리닉 |
| week | int | 주차 (1~N) |
| phase | text | 단계명 |
| theme | text | 주제 |
| goal | text | 목표 |

### posts
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | 포스트 ID |
| clinic_id | uuid (FK) | 소속 클리닉 |
| week | int | 주차 |
| day | text | 요일 (화/목/토) |
| type | text | 유형 (릴스/캐러셀/이미지) |
| title | text | 제목 |
| description | text | 기획 설명 |
| caption | text | Instagram 캡션 |
| tags | text | 해시태그 |
| asset | text | 촬영 자산 메모 |
| design | text | 디자인 가이드 |
| ai_guide | text | AI 프롬프트 가이드 |
| slide_count | int | 캐러셀 슬라이드 수 |
| template_type | text | 카드 템플릿 유형 |
| status | text | 상태 (draft/ready/published) |
| sort_order | int | 정렬 순서 |
| publish_checklist | jsonb | 발행 체크리스트 |

### post_images
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | 이미지 ID |
| post_id | uuid (FK) | 소속 포스트 |
| image_url | text | 이미지 URL (Supabase Storage) |
| slide_index | int | 슬라이드 순서 |
| alt_text | text | 대체 텍스트 |

---

## 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|-----------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | 권장 |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | 권장 |

---

## 브랜드 스타일

| 항목 | 값 |
|------|-----|
| 브랜드 컬러 | `#E8703A` (orange) — CSS var `--brand-orange` |
| 다크 | `#1A1410` |
| 배경색 | `#FFF8F0` (cream) |
| EN 폰트 | Playfair Display |
| KR 폰트 | Pretendard / Noto Sans KR |
| 피드 비율 | 1080x1350 (4:5) |
| 릴스 비율 | 1080x1920 (9:16) |

---

## Vercel 배포

1. Vercel 프로젝트 연결
2. Environment Variables에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가
3. Build Command: `npm run build`
4. Output Directory: `dist`

Vite 설정에서 13개 HTML을 multi-entry로 빌드하므로 각 페이지가 독립 URL로 서빙됩니다.

---

## 라이선스

Private - IM에스테틱 전용 내부 관리 도구입니다.
