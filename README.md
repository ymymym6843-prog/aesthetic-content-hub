# IM AESTHETICS - Instagram Content Management System

아임에스테틱 (대구 수성구 범어동 마크팰리스) 의 Instagram 콘텐츠 12주 전략을 관리하는 웹 애플리케이션입니다.

3명의 전문 디렉터가 1인 고객을 케어하는 **3IN Care System**을 기반으로, 12주 36개 포스트(화/목/토 스케줄)의 기획·제작·발행을 관리합니다.

---

## 클리닉 정보

| 항목 | 내용 |
|------|------|
| 상호 | 아임에스테틱 (IM AESTHETICS) |
| 위치 | 대구 수성구 범어동 마크팰리스 |
| 핵심 개념 | 3IN Care System |
| 디렉터 | 유수정 (메디컬 스킨케어, 20년), 우연우 (바디 얼라인먼트), 김은경 (7-Sense 테라피, 39년) |
| 콘텐츠 일정 | 12주 / 36포스트 / 화·목·토 발행 |

---

## Tech Stack

| 분류 | 기술 |
|------|------|
| Build | Vite 6 |
| UI | React 18 + Tailwind CSS 3 |
| Backend | Supabase (PostgreSQL + Storage) |
| Deploy | Vercel |
| Font | Pretendard |

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

환경 변수가 없으면 `src/lib/supabase.js`에 하드코딩된 기본값으로 동작합니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 을 열고 `index.html` (PIN: 클리닉 측 전달)로 진입합니다.

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview   # 빌드 결과 로컬 확인
```

---

## 프로젝트 구조

```
IM_AESTHETICS/
├── index.html                    # PIN lock + 5-menu 허브 (vanilla JS)
├── dashboard.html                # React: 12주 콘텐츠 대시보드
├── instagram_preview_react.html  # React: Instagram 피드 미리보기
├── card_news_maker.html          # Standalone: 카드뉴스 에디터
├── carousel_templates.html       # Standalone: 디자인 가이드
├── 현장촬영_체크리스트.html         # Standalone: 촬영 체크리스트
│
├── vite.config.js                # Vite multi-entry 빌드 설정
├── tailwind.config.js
├── postcss.config.js
│
├── public/
│   └── feed_images/              # 피드 이미지 34장 (정적 서빙)
│
├── docs/                         # 전략 문서 (Markdown 7개)
│
└── src/
    ├── styles.css                # Tailwind directives + Pretendard
    ├── index-app.js              # index.html 진입점 (스타일 전용)
    ├── dashboard.jsx             # 대시보드 App + ReactDOM.render
    ├── instagram-preview.jsx     # 피드 미리보기 App + ReactDOM.render
    ├── components/
    │   ├── Icons.jsx             # 대시보드용 SVG 아이콘 18개
    │   ├── InstagramIcons.jsx    # Instagram 미리보기용 SVG 아이콘 19개
    │   ├── PostCard.jsx          # 대시보드 포스트 카드
    │   ├── WeekNav.jsx           # 주차 네비게이션
    │   ├── PostDetail.jsx        # 포스트 상세 모달
    │   ├── PostEditor.jsx        # 포스트 생성/수정 에디터
    │   ├── ProfileHeader.jsx     # Instagram 프로필 헤더
    │   ├── GridView.jsx          # Instagram 3열 그리드
    │   └── FeedDetailView.jsx    # Instagram 피드 상세
    ├── data/
    │   └── posts.js              # strategyData + feedPosts (fallback 하드코딩)
    └── lib/
        └── supabase.js           # Supabase 클라이언트 + DB 함수 모음
```

---

## 페이지 설명

### index.html
PIN 잠금 화면과 5개 메뉴 허브. React 없이 vanilla JS로 구현. 올바른 PIN 입력 시 나머지 페이지로 이동 가능.

### dashboard.html
12주 콘텐츠 전략 대시보드 (React).
- Supabase 연결 상태를 녹색 점(green dot)으로 표시
- 주차별 필터링, 포스트 카드 목록, 상세 모달
- 포스트 CRUD (생성, 수정, 삭제), 이미지 업로드 (Supabase Storage)
- DB 연결 실패 시 `src/data/posts.js` 하드코딩 데이터로 폴백

### instagram_preview_react.html
실제 Instagram UI를 모방한 피드 미리보기 (React).
- 3열 그리드 뷰와 피드 상세 뷰 전환
- DB 데이터 우선, 실패 시 하드코딩 feedPosts 폴백

### card_news_maker.html
카드뉴스 슬라이드 제작 도구 (Standalone, html2canvas 포함).
템플릿 선택 후 텍스트 입력, 이미지 다운로드 가능.

### carousel_templates.html
카드뉴스 디자인 가이드 및 템플릿 시각화 (Standalone).

### 현장촬영_체크리스트.html
촬영 현장에서 사용하는 체크리스트 (Standalone, 인쇄 가능).

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
| week | int | 주차 (1~12) |
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
| type | text | 포스트 유형 (릴스/캐러셀/이미지) |
| title | text | 제목 |
| description | text | 기획 설명 |
| caption | text | Instagram 캡션 |
| tags | text | 해시태그 |
| asset | text | 촬영 자산 메모 |
| design | text | 디자인 가이드 |
| ai_guide | text | AI 프롬프트 가이드 |
| slide_count | int | 캐러셀 슬라이드 수 |
| template_type | text | 카드 템플릿 유형 |
| status | text | 상태 (draft/scheduled/published) |
| sort_order | int | 정렬 순서 |

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
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | 권장 (없으면 기본값 사용) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | 권장 (없으면 기본값 사용) |

> 주의: 환경 변수를 설정하지 않으면 `src/lib/supabase.js`에 하드코딩된 기본값으로 연결됩니다. 프로덕션 배포 시에는 반드시 Vercel 환경 변수로 설정하십시오.

---

## Vercel 배포

1. Vercel 프로젝트 생성 및 이 저장소 연결
2. Vercel 대시보드 > Settings > Environment Variables에서 환경 변수 추가
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Root Directory: 저장소 루트 (또는 `IM_AESTHETICS/`가 루트인 경우 그대로)
4. Build Command: `npm run build`
5. Output Directory: `dist`

Vite 설정(`vite.config.js`)에서 6개 HTML을 multi-entry로 빌드하므로 별도 설정 없이 각 페이지가 독립적인 URL로 서빙됩니다.

---

## 브랜드 스타일

| 항목 | 값 |
|------|-----|
| 배경색 | `#FFF8F0` (warm white) |
| 포인트 컬러 | `#FF8C42` (orange) |
| 텍스트 | `#333333` (charcoal) |
| 폰트 | Pretendard |
| 피드 비율 | 1080x1350 (4:5) |
| 릴스 비율 | 1080x1920 (9:16) |

---

## 향후 확장 계획

이 시스템은 현재 **아임에스테틱 전용**이지만, 처음부터 **멀티테넌트 구조**로 설계되어 다른 클리닉으로의 확장이 용이합니다.

### 멀티테넌트 아키텍처

모든 DB 테이블(`clinics`, `directors`, `week_strategies`, `posts`, `post_images`)에 `clinic_id` 외래키가 존재합니다. 새 클리닉을 추가하는 절차는 다음과 같습니다:

1. `clinics` 테이블에 새 클리닉 INSERT
2. `directors` 테이블에 해당 클리닉의 전문가 추가
3. `week_strategies`에 주차별 전략 데이터 추가
4. `posts`에 포스트 데이터 추가 (또는 대시보드 CRUD로 직접 생성)
5. 프론트엔드에서 `DEFAULT_CLINIC_ID` (`src/lib/supabase.js`) 변경, 또는 로그인 시스템 도입

현재 코드에서 모든 DB 쿼리는 `clinic_id`로 필터링되므로, 데이터 격리가 기본 적용됩니다.

### 확장 로드맵

| 단계 | 내용 | 난이도 |
|------|------|--------|
| 1단계 | 클리닉 선택/로그인 화면 추가 | 낮음 |
| 2단계 | Supabase RLS(Row Level Security) 적용으로 클리닉별 데이터 완전 격리 | 중간 |
| 3단계 | 포스트 예약 발행 자동화 (Supabase Edge Functions + Instagram Graph API) | 중간 |
| 4단계 | 성과 지표 대시보드 (좋아요, 저장, 도달 수 연동) | 높음 |
| 5단계 | AI 캡션/이미지 자동 생성 통합 | 높음 |

---

## 라이선스

Private - 아임에스테틱 전용 내부 관리 도구입니다.
