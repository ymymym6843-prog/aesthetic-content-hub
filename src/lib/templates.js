// IM에스테틱 캡션 템플릿 엔진
// AI API 호출 없이 순수 템플릿 기반으로 동작합니다.
// 3 전문가 × 3 포스팅 요일 (화/목/토) 조합을 지원합니다.

// ──────────────────────────────────────────────
// 1. 프로그램 정의
// ──────────────────────────────────────────────

export const PROGRAMS = [
  {
    id: 'im_gyeol',
    name: 'IM결 라인',
    fullName: 'IM결 메디컬 스킨케어 라인',
    expert: '유수정',
    expertTitle: '유수정 전문가 (메디컬 스킨케어 20년)',
    emoji: '✨',
    keywords: ['피부결', '광채', '탄력', '재생', '메디컬 케어', '피부 장벽'],
    problems: [
      '피부결이 울퉁불퉁하고 칙칙해 보이는 느낌',
      '화장이 잘 받지 않는 거친 피부 표면',
      '탄력이 줄어 피부가 처지는 느낌',
      '반복되는 트러블로 지친 피부 장벽',
      '20년을 써도 개선되지 않는 모공 고민',
    ],
    solutions: [
      '20년 임상 데이터 기반 피부 분석으로 개인 맞춤 프로토콜 설계',
      '메디컬 등급 유효성분을 피부 깊숙이 전달하는 침투 케어',
      '시술 후 피부 장벽 회복을 돕는 재생 프로그램 병행',
    ],
  },
  {
    id: 'barium',
    name: '바른체형 근막 라인',
    fullName: '바른체형 근막 교정 라인',
    expert: '우연우',
    expertTitle: '우연우 전문가 (체형 교정 · 근막 이완)',
    emoji: '🌿',
    keywords: ['체형 교정', '근막 이완', '자세 개선', '바디 밸런스', '승모근', '골반 정렬'],
    problems: [
      '오래 앉아 있으면 어깨와 목이 굳어오는 불편함',
      '한쪽으로 쏠린 자세 탓에 몸의 균형이 무너진 느낌',
      '승모근이 뭉쳐 얼굴까지 커 보이는 고민',
      '반복 스트레칭에도 풀리지 않는 만성 근막 긴장',
      '골반 비대칭으로 바지 핏이 항상 어긋나는 문제',
    ],
    solutions: [
      '체형 3D 분석으로 불균형 패턴을 정확히 파악',
      '근막 심부 이완으로 긴장의 근본 원인을 해소',
      '교정 후 일상 자세 유지를 위한 맞춤 홈케어 가이드 제공',
    ],
  },
  {
    id: 'sense7',
    name: '7감 테라피 라인',
    fullName: '7감(感) 테라피 라인',
    expert: '김은경',
    expertTitle: '김은경 디렉터 (7감 테라피 39년)',
    emoji: '🌸',
    keywords: ['7감 테라피', '감각 회복', '내면 힐링', '에너지 밸런스', '심신 이완', '총체적 웰니스'],
    problems: [
      '몸은 쉬어도 마음이 늘 피곤한 번아웃 상태',
      '스트레스로 예민해진 피부와 마음',
      '현대인의 감각 과부하로 무뎌진 몸의 신호',
      '일반 마사지로는 채워지지 않는 깊은 회복감의 갈증',
      '내 몸과 다시 연결되고 싶은 바람',
    ],
    solutions: [
      '시각·청각·후각·촉각·미각·내수용·고유감각 7가지 감각 통합 접근',
      '39년 임상 노하우로 설계된 맞춤 감각 회복 프로토콜',
      '시술 후 일상에서도 이어지는 셀프 감각 케어 가이드 제공',
    ],
  },
  {
    id: '3in',
    name: '3IN 케어 시스템',
    fullName: '3IN 케어 시스템 (통합 패키지)',
    expert: '3IN 팀',
    expertTitle: '유수정 · 우연우 · 김은경 세 전문가',
    emoji: '💎',
    keywords: ['3IN', '세 명이 한 분만', '통합 케어', '맞춤 설계', '프리미엄', '퍼스널 케어'],
    problems: [
      '피부·체형·마음 중 어느 것부터 손대야 할지 모르는 막막함',
      '여러 곳을 전전해도 근본적 변화가 없었던 경험',
      '각각 따로 관리해도 연결이 안 되는 아쉬움',
      '진짜 나에게 맞는 케어를 받고 싶다는 오랜 바람',
    ],
    solutions: [
      '세 전문가가 동일한 1인 고객을 함께 분석하는 통합 상담',
      '피부·체형·감각 세 축을 연결한 일관된 케어 프로토콜 설계',
      '매 회기 세 전문가가 진행 상황을 공유하며 프로그램을 조정',
    ],
  },
];

// ──────────────────────────────────────────────
// 2. 시그니처 오프닝 문구
// ──────────────────────────────────────────────

export const OPENINGS = [
  '오늘 하루도 수고 많으셨나요?',
  '잠깐, 지금 이 순간 내 몸에 집중해 볼게요.',
  '당신의 몸이 보내는 신호, 듣고 계신가요?',
  '변화는 언제나 작은 발걸음에서 시작됩니다.',
  '내 몸을 가장 잘 아는 사람이 되는 것,',
  '스스로를 위한 시간을 허락해 주세요.',
  '진짜 회복은 쉬는 것 이상이어야 합니다.',
  '거울 앞에 서는 순간이 설레길 바랍니다.',
  '피부가 아니라, 당신 전체를 봅니다.',
  '한 분 한 분의 이야기가 다르듯, 케어도 달라야 합니다.',
  '세 명이 한 분만 봅니다.',
  '대구 수성구에서 가장 조용하고 깊은 변화를 만들어 가고 있습니다.',
];

// ──────────────────────────────────────────────
// 3. CTA 문구
// ──────────────────────────────────────────────

export const CTAS = [
  '프로필 링크의 상담 예약 폼으로 편하게 문의 주세요 🙏',
  'DM으로 먼저 편하게 이야기 나눠요.',
  '첫 상담은 부담 없이 무료로 진행됩니다.',
  '지금 하이라이트의 예약 안내를 확인해 보세요.',
  '아래 프로필 링크에서 원하시는 날짜를 선택하실 수 있어요.',
  '저장해 두셨다가 필요한 순간 꺼내 보세요 💾',
  '궁금한 점은 댓글이나 DM으로 언제든 물어봐 주세요.',
  '공감이 되셨다면 주변 분들께도 나눠 주세요 ❤️',
];

// ──────────────────────────────────────────────
// 4. 해시태그
// ──────────────────────────────────────────────

export const BRAND_HASHTAGS = [
  '#아이엠에스테틱',
  '#IM에스테틱',
  '#3인케어',
  '#세명이한분만',
  '#아이엠에스테틱대구',
];

export const REGION_HASHTAGS = [
  '#대구에스테틱',
  '#수성구에스테틱',
  '#범어동에스테틱',
  '#대구피부관리',
  '#대구체형관리',
  '#대구힐링',
  '#대구뷰티',
  '#수성구뷰티',
];

export const PROGRAM_HASHTAGS = {
  im_gyeol: [
    '#IM결라인',
    '#메디컬스킨케어',
    '#피부결개선',
    '#피부탄력',
    '#피부장벽회복',
    '#광채피부',
    '#대구메디컬케어',
    '#피부재생',
  ],
  barium: [
    '#바른체형근막라인',
    '#체형교정',
    '#근막이완',
    '#자세교정',
    '#승모근케어',
    '#골반교정',
    '#바디밸런스',
    '#대구체형교정',
  ],
  sense7: [
    '#7감테라피',
    '#감각회복',
    '#심신이완',
    '#에너지밸런스',
    '#번아웃회복',
    '#총체적힐링',
    '#내면힐링',
    '#대구힐링테라피',
  ],
  '3in': [
    '#3인케어시스템',
    '#통합케어',
    '#퍼스널케어',
    '#맞춤케어',
    '#프리미엄에스테틱',
    '#세전문가',
  ],
};

export const CATEGORY_HASHTAGS = {
  // 화요일 감성 이미지
  emotional: [
    '#일상스타그램',
    '#힐링스타그램',
    '#뷰티스타그램',
    '#오늘의감성',
    '#자기관리',
    '#나를위한시간',
  ],
  // 목요일 교육 캐러셀
  educational: [
    '#뷰티정보',
    '#피부정보',
    '#스킨케어팁',
    '#건강정보',
    '#알아두면좋은',
    '#뷰티팁',
  ],
  // 토요일 릴스
  reels: [
    '#릴스',
    '#reels',
    '#ASMR',
    '#비포애프터',
    '#beforeandafter',
    '#시술후기',
    '#변화기록',
  ],
};

// ──────────────────────────────────────────────
// 5. 요일별 콘텐츠 가이드
// ──────────────────────────────────────────────

export const DAY_GUIDES = {
  화: {
    label: '화요일 - 감성 이미지',
    type: '이미지',
    description: '감성 이미지 + 문제 인사이트 1문장, 250-300자',
    tone: '따뜻하고 공감적인 어조, 과도한 세일즈 지양',
    imageRatio: '4:5 (1080×1350)',
    captionLength: '250-300자',
    goal: '브랜드 감성 구축, 팔로워 공감 유도',
    tips: [
      '첫 문장에서 공감 질문이나 감성 오프닝으로 시작',
      '전문가 이름과 전문 분야를 자연스럽게 언급',
      '구체적 고민을 1가지만 짚어 깊게 공감',
      'CTA는 부드럽게 1줄로 마무리',
    ],
  },
  목: {
    label: '목요일 - 교육 캐러셀',
    type: '캐러셀',
    description: '7장 캐러셀 구성: 후킹→문제→솔루션3단계→CTA',
    tone: '전문적이지만 이해하기 쉬운 어조, 실용 정보 중심',
    imageRatio: '4:5 (1080×1350) × 7장',
    captionLength: '150-200자 (카드 내용이 메인)',
    goal: '저장·공유 유도, 전문성 신뢰 구축',
    tips: [
      '제목 카드는 굵은 후킹 카피 1줄로 승부',
      '문제는 독자가 직접 경험한 듯 구체적으로 묘사',
      '솔루션은 3단계로 나눠 명확하게 제시',
      '마지막 CTA 카드에 예약 유도 문구 삽입',
    ],
  },
  토: {
    label: '토요일 - ASMR/B&A 릴스',
    type: '릴스',
    description: 'ASMR or B&A 릴스, 15-60초',
    tone: '시각·청각적 자극, 비포애프터 또는 시술 과정 중심',
    imageRatio: '9:16 (1080×1920)',
    captionLength: '100-150자 (영상이 메인)',
    goal: '도달률 극대화, 신규 팔로워 유입',
    tips: [
      '첫 3초가 핵심 - 강렬한 비포 또는 ASMR 사운드로 시작',
      '텍스트 오버레이로 핵심 메시지를 영상 안에 삽입',
      '캡션은 간결하게, 해시태그는 릴스 전용으로',
      '음악은 트렌딩 또는 ASMR 사운드 선택',
    ],
  },
};

// ──────────────────────────────────────────────
// 6. 캐러셀 슬라이드 가이드 (7장)
// ──────────────────────────────────────────────

export const CAROUSEL_SLIDE_GUIDES = [
  {
    slideNum: 1,
    role: '후킹 타이틀',
    guide: '독자의 고민을 직접 겨냥하는 굵은 제목 1줄 + 부제목 1줄',
    example: '"왜 피부 관리를 해도 그대로일까요?" / 당신의 케어에 빠진 한 가지',
  },
  {
    slideNum: 2,
    role: '문제 공감',
    guide: '독자가 겪는 구체적 증상이나 상황을 2-3줄로 서술, 공감 극대화',
    example: '열심히 관리하는데도 피부가 답답하게 느껴진다면 / 원인이 다를 수 있어요',
  },
  {
    slideNum: 3,
    role: '문제 원인 분석',
    guide: '왜 그런 문제가 생기는지 전문가 시각에서 1가지 핵심 원인 설명',
    example: '피부 장벽이 손상되면 유효성분이 흡수되지 않습니다',
  },
  {
    slideNum: 4,
    role: '솔루션 1단계',
    guide: '해결의 첫 번째 단계, 구체적 행동이나 원리 설명',
    example: '1단계: 정확한 피부 분석부터 / 20년 데이터로 당신의 피부 패턴을 파악합니다',
  },
  {
    slideNum: 5,
    role: '솔루션 2단계',
    guide: '두 번째 단계, 시술 또는 케어 방법 설명',
    example: '2단계: 맞춤 유효성분 딥 딜리버리 / 피부 깊은 곳에 필요한 성분을 직접 전달합니다',
  },
  {
    slideNum: 6,
    role: '솔루션 3단계 + 결과',
    guide: '세 번째 단계 + 기대 결과 언급, 구체적 변화 묘사',
    example: '3단계: 장벽 회복 마무리 케어 / 시술 후 피부가 스스로 회복하는 힘을 키웁니다',
  },
  {
    slideNum: 7,
    role: 'CTA + 브랜드',
    guide: '예약 또는 문의 유도 CTA + 브랜드명 + 로고 삽입',
    example: '아이엠에스테틱에서 직접 경험해 보세요 / 프로필 링크에서 상담 예약',
  },
];

// ──────────────────────────────────────────────
// 7. 캡션 생성 함수
// ──────────────────────────────────────────────

/**
 * 요일과 프로그램 ID로 캡션 템플릿을 생성합니다.
 * [대괄호 안 텍스트]는 실제 작성 시 교체해야 할 플레이스홀더입니다.
 *
 * @param {'화'|'목'|'토'} day
 * @param {string} programId
 * @returns {string}
 */
export function generateCaption(day, programId) {
  const program = PROGRAMS.find((p) => p.id === programId) ?? PROGRAMS[0];
  const opening = OPENINGS[Math.floor(Math.random() * OPENINGS.length)];
  const cta = CTAS[Math.floor(Math.random() * CTAS.length)];
  const problem = program.problems[Math.floor(Math.random() * program.problems.length)];
  const [sol1, sol2, sol3] = program.solutions;

  if (day === '화') {
    return `${program.emoji} ${opening}

[공감 질문 또는 감성 문장 - 예: "${problem}"]

[이 고민에 대한 전문가 인사이트 2-3문장을 여기에 작성하세요.
${program.expertTitle}의 시각에서 따뜻하게 설명해 주세요.
브랜드 키워드: ${program.keywords.slice(0, 3).join(', ')}]

${cta}

${program.emoji} ${program.expertTitle}
📍 대구 수성구 범어동 · 아이엠에스테틱`;
  }

  if (day === '목') {
    return `${program.emoji} [이번 캐러셀의 핵심 주제를 한 문장으로 - 예: "${problem}에 대한 해결책"]

[문제 상황을 구체적으로 1-2문장 서술하세요.
독자가 "맞아, 나 얘기다"라고 느끼도록 작성합니다.]

1️⃣ ${sol1}
2️⃣ ${sol2}
3️⃣ ${sol3}

[추가 전문가 코멘트 또는 마무리 인사이트를 1문장 작성하세요.]

${cta}

${program.emoji} ${program.expertTitle}
📍 대구 수성구 범어동 · 아이엠에스테틱`;
  }

  if (day === '토') {
    return `${program.emoji} [릴스 인트로 문장 - 시선을 끄는 1줄, 예: "3년간의 ${program.keywords[0]} 고민이 이렇게 달라졌어요"]

[시술 또는 케어 과정을 2-3문장으로 설명하세요.
영상에서 보이는 내용을 텍스트로 보완해 줍니다.
예: 촉각, 소리, 느낌 등 감각적 묘사 활용]

[결과 강조 문장 - 비포애프터 또는 변화를 구체적으로 서술]

${cta}

${program.emoji} ${program.expertTitle}
📍 대구 수성구 범어동 · 아이엠에스테틱`;
  }

  // 기본 fallback
  return `${program.emoji} [캡션을 작성해 주세요]\n\n${cta}`;
}

// ──────────────────────────────────────────────
// 8. 해시태그 생성 함수
// ──────────────────────────────────────────────

/**
 * 프로그램과 카테고리에 맞는 해시태그 세트를 반환합니다.
 *
 * @param {string} programId
 * @param {'emotional'|'educational'|'reels'} category
 * @returns {string}
 */
export function generateHashtags(programId, category) {
  const programTags = PROGRAM_HASHTAGS[programId] ?? [];
  const categoryTags = CATEGORY_HASHTAGS[category] ?? [];

  const allTags = [
    ...BRAND_HASHTAGS,
    ...REGION_HASHTAGS,
    ...programTags,
    ...categoryTags,
  ];

  // 중복 제거 후 반환
  const unique = [...new Set(allTags)];
  return unique.join(' ');
}

// ──────────────────────────────────────────────
// 9. 포스트 스켈레톤 생성 함수
// ──────────────────────────────────────────────

/**
 * 요일, 프로그램, 주차를 받아 완전한 포스트 객체 스켈레톤을 반환합니다.
 * Supabase posts 테이블 스키마와 호환됩니다.
 *
 * @param {'화'|'목'|'토'} day
 * @param {string} programId
 * @param {number} weekNum - 1~12
 * @returns {object}
 */
export function generatePostSkeleton(day, programId, weekNum) {
  const program = PROGRAMS.find((p) => p.id === programId) ?? PROGRAMS[0];
  const guide = DAY_GUIDES[day];

  // 요일별 타입 매핑
  const typeMap = { 화: '이미지', 목: '캐러셀', 토: '릴스' };
  const categoryMap = { 화: 'emotional', 목: 'educational', 토: 'reels' };
  const postType = typeMap[day] ?? '이미지';
  const category = categoryMap[day] ?? 'emotional';

  // 요일별 sort_order (화=1, 목=2, 토=3)
  const sortOrderMap = { 화: 1, 목: 2, 토: 3 };

  const captionTemplate = generateCaption(day, programId);
  const hashtags = generateHashtags(programId, category);

  return {
    // Supabase 필드
    clinic_id: '00000000-0000-0000-0000-000000000001',
    week: weekNum,
    sort_order: sortOrderMap[day] ?? 1,
    type: postType,

    // 제목 및 설명
    title: `[${weekNum}주차 ${day}] ${program.name} - [제목을 입력하세요]`,
    desc: `${program.emoji} ${program.expertTitle} | ${guide.description}`,

    // 캡션 및 해시태그
    caption: captionTemplate,
    hashtags: hashtags,

    // 제작 가이드
    asset: `[촬영/편집 가이드: ${guide.imageRatio} | ${guide.tone}]`,
    design: `[디자인 가이드: 브랜드 컬러 #FFF8F0, #E8703A | 폰트: Pretendard]`,
    ai_guide: `[AI 활용 가이드: ${guide.tips[0]}]`,

    // 캐러셀 전용
    slideCount: postType === '캐러셀' ? 7 : null,
    slideGuides: postType === '캐러셀' ? CAROUSEL_SLIDE_GUIDES : null,

    // 릴스 전용
    videoLength: postType === '릴스' ? '15-60초' : null,
    videoFormat: postType === '릴스' ? '9:16 (1080×1920)' : null,

    // 메타
    programId: program.id,
    programName: program.name,
    expert: program.expert,
    day: day,
    dayGuide: guide,
    status: 'draft',
  };
}
