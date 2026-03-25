# IM_AESTHETICS

## 프로젝트 개요
AI 기반 에스테틱 콘텐츠 허브. Google Generative AI와 Supabase를 활용해 에스테틱 관련 콘텐츠를 생성, 관리, 공유한다.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express.js (API 서버)
- **AI**: Google Generative AI (Gemini)
- **DB / Auth**: Supabase
- **기타**: Axios, Cheerio (웹 스크래핑), HTML2Canvas (캡처)

## Commands
```bash
npm run dev        # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm run preview    # 빌드 미리보기
```

## Directory Structure
```
IM_AESTHETICS/
└── src/
    ├── components/          # 재사용 UI 컴포넌트
    ├── data/                # 정적 데이터, 목업
    ├── lib/                 # 외부 서비스 클라이언트 (Supabase, Gemini)
    ├── dashboard.jsx        # 메인 대시보드 페이지
    └── instagram-preview.jsx # Instagram 스타일 미리보기 컴포넌트
```

## Core Rules
- `.jsx` 확장자 사용 (TypeScript 미적용 프로젝트).
- Supabase / Google AI API 키는 반드시 환경변수로 관리한다. 코드에 하드코딩 금지.
- Cheerio 스크래핑 로직은 Express 백엔드에서만 실행한다. 브라우저 직접 스크래핑 금지.
- HTML2Canvas 캡처는 클라이언트에서만 실행한다.
- 컴포넌트는 `components/`에, 페이지 단위 파일은 `src/` 루트에 위치한다.

## Key Modules
- `lib/`: Supabase 클라이언트, Google Generative AI 초기화
- `dashboard.jsx`: 콘텐츠 피드, AI 생성 인터페이스 메인 페이지
- `instagram-preview.jsx`: 콘텐츠 Instagram 포맷 미리보기 및 HTML2Canvas 캡처
- Express 서버: Cheerio 기반 외부 콘텐츠 스크래핑 API 엔드포인트

## Current Status
개발 중. AI 콘텐츠 생성 및 대시보드 UI 구현 단계.
