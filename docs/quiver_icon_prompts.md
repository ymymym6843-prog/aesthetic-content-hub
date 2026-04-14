# Quiver.ai SVG 아이콘 생성 프롬프트

**용도**: Skin MBTI Canva Guide (`skin_mbti_canva_guide.html`) 프레임 템플릿 4종의 아이콘 후보 12개 생성
**Quiver URL**: https://app.quiver.ai/
**출력 목표**: SVG 또는 고해상도 PNG (48×48 또는 64×64)

---

## 공통 베이스 프롬프트

모든 프롬프트에 공통으로 붙일 스타일 지시문:

```
minimal line art icon, single color #D4A04A gold, 1px hairline stroke,
white/cream background (#FFF8F0), art deco elegant, editorial magazine style,
centered composition, negative space, no shading, no fill,
vector-ready, clean edges, 48x48 aspect ratio, symmetrical
```

**네거티브 프롬프트 (제외할 요소)**:
```
no color gradient, no multiple colors, no 3d shadow, no rasterized texture,
no text, no watermark, no clipart style, no cartoon, no realistic rendering
```

---

## Template A — Skin MBTI (피부 성격/진단)

**컨셉**: 16타입 다양성, 자기이해, 4축 분할

### A-1. 아르데코 컴퍼스
```
art deco compass rose with 4 cardinal points, elegant diamond shape,
geometric pattern inspired by 1920s design, center dot, thin outer ring,
symmetrical 4-direction divider, botanical accent on tips
```

### A-2. 별자리 미니
```
constellation of 4 stars connected by thin lines in diamond shape,
tiny 2px dots for stars, small circle in center, minimal celestial motif,
elegant stargazing aesthetic, thin connecting strokes
```

### A-3. 꽃봉오리
```
blooming flower bud half-open, vertical orientation,
twin leaves at base mirrored symmetrically, thin outline only,
graceful botanical illustration, delicate petal curves,
minimalist wedding flower aesthetic
```

---

## Template B — X-Body (몸 균형/밸런스)

**컨셉**: 척추·경혈·에너지 흐름, 신체 정렬

### B-1. 척추 + 잎
```
human spine silhouette (vertical wavy line) with small leaves
on each side mirrored at 3 levels, botanical anatomy illustration,
yoga and wellness aesthetic, thin elegant strokes, head dot at top
and tailbone dot at bottom
```

### B-2. 차크라 삼각
```
three stacked triangles forming chakra symbol,
upper triangle pointing up, middle triangle horizontal,
lower triangle pointing down, tiny dots at vertices,
center circle with dot, meditation and ayurveda aesthetic
```

### B-3. 경혈 바디
```
minimal standing body silhouette viewed from back,
3-4 acupuncture points marked as small filled dots along spine and shoulders,
thin outline body shape, arms slightly apart, meridian line aesthetic,
traditional Asian medicine illustration style
```

---

## Template C — Focuskin (피부 속 분석)

**컨셉**: 현미경, 돋보기, 피부 세포, 정밀 진단

### C-1. 세포 패턴
```
three interconnected hexagon cells (honeycomb pattern),
one large hexagon center with two smaller hexagons at bottom corners,
thin outline only, tiny dots inside each hexagon,
scientific beauty illustration, skin cell microscopy aesthetic
```

### C-2. 돋보기 + 물방울
```
vintage magnifier glass (circular lens with handle) positioned diagonally,
single water drop shape inside the lens instead of reflection,
thin elegant handle with small botanical curl at end,
golden magnifier outline, investigative aesthetic
```

### C-3. 레이더 차트
```
three concentric circles with thin strokes,
decreasing opacity from outer to inner, center filled dot,
4 crosshair lines passing through at 0-90-180-270 degrees with low opacity,
radar and skin analysis aesthetic, diagnostic chart feel
```

---

## Template D — Skin Story (상담/이야기)

**컨셉**: 만년필, 상담, 편지, 기록

### D-1. 만년필 촉
```
fountain pen nib close-up vertical orientation,
diamond-shaped nib tip with slit line down the center,
single ink drop below the nib tip as small filled circle,
elegant calligraphy pen style, premium stationery aesthetic
```

### D-2. 왁스 인장
```
circular wax seal with ribbon tails flowing down on both sides,
monogram letters "IM" in italic Playfair Display in center,
double outline rings, two ribbon ends trailing below at angles,
vintage letter seal aesthetic, formal invitation style
```

### D-3. 펜 + 잎사귀
```
calligraphy pen diagonal from bottom-left to top-right,
small botanical leaves growing from the pen tip curling upward,
ink droplet at bottom of pen, thin elegant lines,
nature-inspired writing tool, poetic aesthetic
```

---

## 생성 및 사용 워크플로우

### Step 1: Quiver에서 생성
1. https://app.quiver.ai/ 접속 → 로그인
2. 각 프롬프트를 **공통 베이스 + 개별 프롬프트** 결합하여 입력
3. 한 번에 3~4개 변형 생성 → 가장 좋은 결과 선택
4. **Style consistency 옵션** 있으면 활성화 (12개 모두 톤 통일)

### Step 2: 다운로드
- SVG 지원 시 → 즉시 다운로드
- PNG만 가능 시 → 최대 해상도 (1024px 이상) 다운로드

### Step 3: SVG 변환 (PNG인 경우)
- https://vectorizer.ai (무료, 고품질)
- 또는 Adobe Illustrator **Image Trace** 기능
- 변환 후 **stroke width 1px, fill none** 정리

### Step 4: 프로젝트 반영
저장 위치: `public/icons/`
```
public/icons/
├── template-a-1-compass.svg
├── template-a-2-constellation.svg
├── template-a-3-bud.svg
├── template-b-1-spine.svg
├── template-b-2-chakra.svg
├── template-b-3-meridian.svg
├── template-c-1-hexagon.svg
├── template-c-2-magnifier.svg
├── template-c-3-radar.svg
├── template-d-1-pen-nib.svg
├── template-d-2-wax-seal.svg
└── template-d-3-pen-leaves.svg
```

### Step 5: HTML 교체
`skin_mbti_canva_guide.html`의 `.recipe-icon-gallery` 내 인라인 SVG를:
```html
<img src="public/icons/template-a-1-compass.svg" alt="컴퍼스" class="icon-thumb-svg">
```
로 교체. CSS 클래스 `.icon-thumb svg` → `.icon-thumb img` 조정 필요.

### Step 6: Canva 업로드
동일 SVG 12개를 Canva **Uploads** 폴더에 업로드 →
실제 인스타 콘텐츠 제작 시 Elements 대신 자체 제작 아이콘 사용 (브랜드 고유성 확보)

---

## 품질 체크리스트

생성된 아이콘이 다음 조건 만족해야 함:
- [ ] 단색 골드 (#D4A04A) 1px 스트로크만
- [ ] 배경 투명 또는 크림
- [ ] 48×48 또는 64×64 정사각형
- [ ] 12개 모두 **스타일 일관성** (선 두께, 여백, 디테일 레벨)
- [ ] 대칭 또는 밸런스 있는 구성
- [ ] 축소해도 알아볼 수 있는 명료함
- [ ] 로열티 프리 / 상업적 사용 가능 확인
