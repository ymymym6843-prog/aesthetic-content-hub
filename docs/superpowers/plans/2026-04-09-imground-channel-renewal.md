# IMGROUND 채널 리뉴얼 — 템플릿 가이드 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** IMGROUND (에스테틱 원장 교육 브랜드) 유튜브/인스타 리뉴얼을 위한 Canva 썸네일 템플릿 가이드 HTML 페이지 + 인스타 리뉴얼 가이드 문서 생성

**Architecture:** 기존 `canva_templates.html` 패턴을 그대로 따름. 단일 HTML 파일(`imground_templates.html`)에 CSS 미니 프리뷰 + Canva iframe 임베드 + 카테고리별 그리드. 사이드바 네비게이션과 index.html 허브, Vite 빌드에 통합.

**Tech Stack:** Vanilla HTML/CSS/JS, Canva embed iframe, `nav-shared.js` 사이드바 통합

---

## 파일 구조

| Action | File | 역할 |
|--------|------|------|
| **Create** | `imground_templates.html` | IMGROUND 썸네일 템플릿 가이드 (메인 산출물) |
| **Modify** | `public/nav-shared.js` | 사이드바에 IMGROUND 섹션 추가 |
| **Modify** | `index.html` | 허브 메뉴에 IMGROUND 카드 추가 |
| **Modify** | `vite.config.js` | 빌드 input에 imground 추가 |

---

## 디자인 스펙

### 컬러 시스템 (IM에스테틱 6색 기반 + 카테고리 확장)

**기존 6색 팔레트 (공통):**
- Brand Orange: `#E8703A`
- Cream: `#FFF8F0`
- Warm Beige: `#F5EDE0`
- Gold: `#D4A04A`
- Body Text: `#3D2E24`
- Sub Text: `#9B8A7A`

**카테고리별 액센트 컬러:**
| 카테고리 | 컬러 | 코드 | 용도 |
|----------|------|------|------|
| 피부관리 (Skincare) | Soft Rose | `#D4837A` | 썸네일 카테고리 뱃지, 카드 좌측 바 |
| 마케팅 (Marketing) | Brand Orange | `#E8703A` | 기존 오렌지 활용 |
| 경영 (Management) | Deep Navy | `#3A5A7C` | 신뢰감, 전문성 |
| 제품 (Product) | Warm Gold | `#D4A04A` | 기존 골드 활용 |
| 트렌드 (Trend) | Sage Green | `#7A9E7E` | 에스테틱 자연 느낌 |

### 썸네일 규격
- YouTube 쇼츠: `1080×1920` (9:16)
- YouTube 롱폼: `1280×720` (16:9)
- Instagram 교육일정 카드: `1080×1350` (4:5)

### 톤앤매너
- 브랜드명: **IMGROUND** (Playfair Display 400)
- 서브텍스트: "에스테틱 전문 교육" 또는 "Education for Aesthetic Experts"
- 프리미엄 전문 교육 감성 — IM에스테틱보다 약간 더 전문적/교육적 톤
- 타이포: Pretendard 600 (제목), Pretendard 400 (본문), Playfair Display (브랜드)

---

## Task 1: `imground_templates.html` 생성

**Files:**
- Create: `imground_templates.html`

### 구조 (canva_templates.html 패턴 기반):

```
[Header] IMGROUND — Education for Aesthetic Experts
[카테고리 필터 탭] All | 쇼츠 | 롱폼 | 교육일정
[Category: YouTube 쇼츠 썸네일] — 1080×1920
  [카테고리별 템플릿 카드 그리드]
[Category: YouTube 롱폼 썸네일] — 1280×720
  [NotebookLM 교육영상 템플릿 카드 그리드]
[Category: Instagram 교육일정] — 1080×1350
  [교육일정/릴스 커버 템플릿 카드 그리드]
[톤앤매너 레퍼런스 섹션] — 컬러팔레트 + 폰트 + 브랜드 가이드
[Customizing Checklist]
```

- [ ] **Step 1:** HTML 파일 생성 — 헤더, CSS 변수(기존 6색 + 카테고리 확장색), 기본 레이아웃
- [ ] **Step 2:** 카테고리 필터 탭 UI 구현 (All / 쇼츠 / 롱폼 / 교육일정)
- [ ] **Step 3:** YouTube 쇼츠 썸네일 카테고리 섹션 — CSS 미니 프리뷰 5종 (피부관리, 마케팅, 경영, 제품, 트렌드)
  - 각 프리뷰는 카테고리 컬러 뱃지 + "IMGROUND" 브랜드 + 제목 레이아웃
  - 9:16 aspect-ratio
- [ ] **Step 4:** YouTube 롱폼 썸네일 카테고리 섹션 — CSS 미니 프리뷰 5종
  - NotebookLM 교육영상용
  - 16:9 aspect-ratio
  - 교육 전문가 느낌 (강의 제목 + 회차 + 카테고리 뱃지)
- [ ] **Step 5:** Instagram 교육일정 카드 섹션 — CSS 미니 프리뷰 3종
  - 4:5 aspect-ratio
  - 교육 일정표, 릴스 커버, 교육 안내 카드
- [ ] **Step 6:** 톤앤매너 레퍼런스 섹션 + Customizing Checklist 추가
- [ ] **Step 7:** 템플릿 데이터 JS — Canva URL은 placeholder(`#`)로 설정, 나중에 실제 Canva 링크로 교체
- [ ] **Step 8:** Lazy-load iframe + 필터 탭 동작 JS
- [ ] **Step 9:** 반응형 처리 (768px, 480px)
- [ ] **Step 10:** `<script src="/nav-shared.js"></script>` 추가

---

## Task 2: 네비게이션 통합

**Files:**
- Modify: `public/nav-shared.js` (line 3-19, PAGES 배열)
- Modify: `index.html` (hub menu 카드 영역)
- Modify: `vite.config.js` (line 15-31, input 객체)

- [ ] **Step 1:** `public/nav-shared.js` — PAGES 배열에 IMGROUND 섹션 + 링크 추가

```js
// PAGES 배열 끝에 추가:
{ section: 'IMGROUND' },
{ name: 'IMGROUND Templates', title: 'IMGROUND 템플릿', href: '/imground_templates.html', icon: '🎓' },
```

- [ ] **Step 2:** `index.html` — 허브 메뉴에 IMGROUND 카드 추가

기존 패턴을 따라 `.card` 요소 추가. 위치: 기존 메뉴 카드들 맨 아래 또는 별도 섹션.

- [ ] **Step 3:** `vite.config.js` — build input 추가

```js
imground: resolve(__dirname, 'imground_templates.html'),
```

- [ ] **Step 4:** 커밋

```bash
git add imground_templates.html public/nav-shared.js index.html vite.config.js
git commit -m "feat(imground): add IMGROUND template guide page with nav integration"
```

---

## Task 3: 빌드 검증

- [ ] **Step 1:** `npm run build` 실행하여 빌드 성공 확인
- [ ] **Step 2:** `npm run preview`로 페이지 렌더링 확인
- [ ] **Step 3:** 사이드바 네비게이션 동작 확인
- [ ] **Step 4:** 카테고리 필터 탭 동작 확인
- [ ] **Step 5:** 반응형 레이아웃 확인

---

## 향후 작업 (이번 플랜 범위 밖)

1. **Canva 템플릿 실제 제작** → URL을 placeholder에서 실제 링크로 교체
2. **Instagram 리뉴얼 가이드 문서** → `docs/imground_instagram_renewal_guide.md`
3. **영상 편집 워크플로우 가이드** → `docs/imground_video_workflow.md`
4. **index.html에 IMGROUND 전용 섹션 디자인** (현재는 기존 카드 스타일로 추가)
