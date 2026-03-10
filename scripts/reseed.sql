-- ===== WEEK STRATEGIES UPDATE =====
UPDATE week_strategies SET phase = 'Phase 1: 브랜드 소개 (Hi, We are IM)', theme = '인스타그램 첫 인사', goal = '브랜드 정체성 확립 및 공간/시스템 각인' WHERE week = 1 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 1: 브랜드 소개 (Hi, We are IM)', theme = '세 전문가를 만나다', goal = '전문가별 경력과 철학 노출로 신뢰도 확보' WHERE week = 2 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 2: 신뢰 구축 & 본격 모객', theme = '첫 방문 안내 & 릴스 시작', goal = '방문 장벽 완화 및 첫 영상 콘텐츠 소통' WHERE week = 3 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 2: 신뢰 구축 & 본격 모객', theme = '리얼 후기 & 위생 철칙', goal = '사회적 증거 확보 및 철저한 청결 관리 강조' WHERE week = 4 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 2: 신뢰 구축 & 본격 모객', theme = 'B&A 데이터 & 자가진단', goal = '시각적 변화 증명과 잠재 고객 고민 터치' WHERE week = 5 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 3: 전문성 강화 & 확장', theme = '전문가의 디테일', goal = '진정성 있는 일상 노출과 깊이 있는 지식 전달' WHERE week = 6 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 3: 전문성 강화 & 확장', theme = '웨딩 케어 & 미신 타파', goal = '시즌 타겟 확장 및 잘못된 뷰티 상식 교정' WHERE week = 7 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 3: 전문성 강화 & 확장', theme = '소통 & 4월 예약', goal = '고객과의 유대감 강조 및 다음 달 예약 전환 유도' WHERE week = 8 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 5: 결라인 시리즈 — 피부 결의 힘', theme = '보습 결케어', goal = '결라인 프로그램 본격 소개, 블로그 연계' WHERE week = 9 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 5: 결라인 시리즈 — 피부 결의 힘', theme = '트러블 결케어', goal = '트러블 반복 원인과 결케어 솔루션 교육' WHERE week = 10 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 5: 결라인 시리즈 — 피부 결의 힘', theme = '진정 & 톤업 결케어', goal = '진정·톤업 결케어로 결라인 시리즈 완성' WHERE week = 11 AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE week_strategies SET phase = 'Phase 6: IM 윤곽라인 시리즈 — 흐름이 만드는 라인', theme = 'IM 윤곽라인 4대 프로그램', goal = '윤곽라인 프로그램 전체 소개, 두피~쇄골 연결 구조 교육' WHERE week = 12 AND clinic_id = '00000000-0000-0000-0000-000000000001';

-- ===== POSTS UPDATE =====
UPDATE posts SET type = '이미지', title = 'SNS 첫 인사', description = '세 명의 전문가 단체 사진과 브랜드 슬로건 ''세 명이 한 분만 봅니다'' 공유', caption = '안녕하세요, 드디어 인스타그램에서도 인사드려요! 🤍

지난 2월 대구 수성구 범어동에 문을 연 IM 에스테틱이에요. 피부, 체형, 웰니스 — 서로 다른 분야를 오래 파고든 세 명이 한자리에 모였습니다.

겉으로 보이는 변화만 쫓지 않고, ''왜 그런지''부터 같이 찾아가는 관리를 하고 싶었어요.

오픈 한 달, 찾아주신 분들 덕분에 매일 보람차게 보내고 있습니다. 앞으로 이곳에서 저희의 일상과 꿀팁도 나눌게요 💫

👉 궁금한 건 편하게 DM 주세요! 프로필 링크에서 위치랑 프로그램도 확인하실 수 있어요.', tags = '#IM에스테틱 #아이엠에스테틱 #3인케어시스템 #대구에스테틱 #수성구에스테틱 #범어동피부관리 #범어마크팰리스 #메디컬스킨케어 #바른체형근막 #7감테라피', asset = '실제사진: 단체사진.jpg', design = '리얼 스냅형 — 실제 사진 위 하단에 간결한 타이포 1줄', ai_guide = 'AI 생성 불필요 — 실제 단체 프로필 사진(단체사진.jpg) 사용', slide_count = 0, template_type = '' WHERE week = 1 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '공간 소개', description = '리셉션, 라운지, 케어룸, 파우더룸 등 실제 매장 공간 언박싱', caption = 'IM 에스테틱, 안으로 들어오세요. 🌿

문을 여는 순간부터 긴장이 풀리는 공간을 만들고 싶었어요. 햇살이 들어오는 대기 공간, 조용한 프라이빗 룸, 그리고 정성스럽게 우려낸 차 한 잔.

여기서만큼은 일상의 무게를 잠시 내려놓으셨으면 좋겠습니다. ☕

💾 마음에 드셨다면 저장! 위치는 프로필 링크에서 확인하세요.', tags = '#에스테틱인테리어 #수성구프라이빗샵 #범어마크팰리스 #힐링공간 #프라이빗에스테틱 #IM에스테틱공간 #수성구뷰티샵 #대구프리미엄관리 #대구에스테틱', asset = '실제사진: shop-2(로고), shop-6(라운지), shop-5(케어룸), shop-7(파우더룸)', design = '리얼 스냅형 — 1슬라이드: 로고 간판 + ''저희 공간, 한번 들어와 보실래요?'' 타이포', ai_guide = '불필요 — 실제 공간 사진 4장(shop-2, shop-6, shop-5, shop-7)으로 충분', slide_count = 5, template_type = '카드 인포그래픽형' WHERE week = 1 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '3인 케어 시스템', description = '피부·체형·웰니스 전문가가 협업하는 IM 시그니처 프로세스 설명', caption = '오직 한 사람을 위해, 세 명이 머리를 맞대는 시간. 📝

문의가 가장 많았던 IM의 시그니처 — 3인 케어 시스템이에요. 피부, 체형, 웰니스 세 분야 전문가가 한 분을 위해 모입니다.

1️⃣ 유수정 전문가의 정밀 스킨 판독
2️⃣ 우연우 전문가의 체형·밸런스 분석
3️⃣ 김은경 디렉터의 웰니스 솔루션 결합

각자 발견한 문제를 하나로 엮어, 딱 맞는 플랜을 같이 만들어 가요.

💾 궁금하셨다면 이 게시물 저장! 예약은 프로필 링크에서 하실 수 있어요.', tags = '#IM에스테틱 #3인케어시스템 #세명의전문가하나의솔루션 #프리미엄관리 #퍼스널케어 #수성구피부관리 #대구프리미엄관리 #대구에스테틱', asset = '실제사진: 단체사진.jpg (1슬라이드). 차트 리뷰 장면 촬영 권장', design = '리얼 스냅형 + 카드 인포그래픽형 결합', ai_guide = '2슬라이드 3단계 프로세스 인포그래픽 → AI/Canva 생성 적합.
프롬프트: "3-step process infographic with icons for skin, posture, wellness, warm beige background, minimal Korean aesthetic"', slide_count = 0, template_type = '' WHERE week = 1 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '유수정 전문가 소개', description = '20년 경력 메디컬 스킨케어 전문가의 철학과 앰플 제형 소개', caption = '"피부가 스스로 회복하는 힘, 그걸 길러드리는 거예요. 그게 제가 20년간 해온 일이에요."

요즘 ''스킨멀리즘''이라는 말 들어보셨나요? 과한 시술로 예민해진 피부에는 오히려 덜어내는 게 답이에요.

유수정 전문가가 직접 피부를 읽고, PDRN·엑소좀 같은 고기능성 성분을 깊은 곳까지 전달해 드려요. 무너진 장벽, 다시 세워드릴게요. 🛡️

📌 환절기 피부 고민 있으시면 저장해 두셨다가 상담 때 보여주세요!', tags = '#메디컬스킨케어 #유수정전문가 #환절기피부 #문제성피부 #대구여드름관리 #장벽강화 #스킨멀리즘 #IM결라인 #수성구에스테틱 #범어동피부관리', asset = '실제사진: 유수정.jpg', design = '리얼 스냅형 — 프로필 사진 위 인용문 타이포', ai_guide = '2슬라이드 앰플/제품 이미지 → AI 생성 가능 (앰플 제형 클로즈업, 웜톤 배경).
프롬프트: "close-up of premium ampoule serum with golden liquid, warm white background, soft natural light, minimal aesthetic"', slide_count = 0, template_type = '' WHERE week = 2 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '우연우 전문가 소개', description = '바른체형 근막 전문가의 이완 테라피 철학과 근막 원리 인포그래픽', caption = '"세게 눌러야 풀린다고 생각하시는 분들이 많은데, 사실 그 반대예요."

바른체형 근막을 전문으로 보는 우연우 전문가예요. 우리 몸의 근막은 거미줄처럼 전부 연결되어 있어서, 어깨가 굳으면 얼굴 비대칭이나 붓기까지 이어지기도 해요.

억지로 누르는 게 아니라, 근막이 스스로 제자리를 찾도록 도와주는 무통증 이완 테라피예요. 받을수록 움직임이 편안해지는 걸 느끼실 거예요. ✨

👉 체형 고민은 DM으로 편하게 보내주세요!', tags = '#바른체형근막 #우연우전문가 #근막이완 #안면비대칭 #IM체형라인 #라운드숄더 #대구체형관리 #수성구승모근관리 #무통증테라피', asset = '실제사진: 우연우.jpg', design = '리얼 스냅형 — 프로필 사진 위 인용문 타이포', ai_guide = '2슬라이드 근막 연결 인포그래픽 → AI 생성 적합.
프롬프트: "minimal medical illustration of fascia network connecting shoulder to jaw, warm beige background, simple line art style, Korean aesthetic clinic infographic"', slide_count = 0, template_type = '' WHERE week = 2 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '김은경 디렉터 소개', description = '39년 내공의 7감 테라피스트가 제안하는 아로마 리추얼 솔루션', caption = '오일 한 방울이 물에 퍼지면서 방 전체의 분위기가 바뀝니다. 💧

39년간 현장을 지켜온 김은경 디렉터의 ''7감 테라피''. 그날의 컨디션과 기분에 따라 아로마를 직접 블렌딩해 드려요.

코끝을 맴도는 향과 부드러운 손길이 만나면, 머릿속 복잡한 생각들이 조용히 내려앉아요.

💾 스트레스 받을 때 다시 보고 싶다면 저장해 두세요.', tags = '#7감테라피 #김은경디렉터 #아로마테라피 #블렌딩오일 #웰니스뷰티 #신경테라피 #뉴로글로우 #이너뷰티 #대구에스테틱추천', asset = '실제사진: 김은경.jpg', design = '리얼 스냅형 — 프로필 사진 위 인용문 타이포', ai_guide = '2슬라이드 아로마 오일/허브 이미지 → AI 생성 가능.
프롬프트: "elegant aromatherapy oil bottles with dried herbs and flowers, warm soft lighting, minimal premium aesthetic, cream background"', slide_count = 0, template_type = '' WHERE week = 2 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '이미지', title = '오픈 이벤트 혜택', description = '첫 방문 20% 할인, 컨설팅 무료, 웰컴 기프트 등 프로모션 공지', caption = '🤍 IM 에스테틱 첫 방문 혜택 안내

처음 오시는 분들께 감사한 마음을 담아 준비했어요.

✔️ 전 프로그램 첫 방문 20% 할인
✔️ 1:1 맞춤 피부/체형 컨설팅 무료
✔️ 홈케어 샘플 & 웰컴 기프트 증정 (한정 수량)

프로필 상단 예약 링크에서 확인해 보세요! 🏃‍♀️', tags = '#IM에스테틱 #대구에스테틱이벤트 #수성구에스테틱 #범어마크팰리스 #첫방문할인 #네이버예약 #대구프리미엄관리 #대구뷰티샵 #IM웰컴라인', asset = '실제 웰컴 기프트/상담 공간 사진', design = '리얼 스냅형 + 혜택 안내 텍스트 카드', ai_guide = '이벤트 배경 텍스처 AI 생성 가능.
프롬프트: "warm white to soft orange gradient background, premium aesthetic event card, minimal Korean beauty clinic style, subtle bokeh"', slide_count = 0, template_type = '' WHERE week = 3 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '첫 방문 가이드', description = '예약부터 홈케어 가이드까지 고객의 4단계 매장 경험 동선 안내', caption = '"처음이라 긴장되는데, 어떻게 진행되나요?" 🤍

많이 여쭤보시는 질문이에요! IM 에스테틱 첫 방문 과정을 알려드릴게요.

1️⃣ 예약 — 프로필 링크에서 원하시는 시간 선택
2️⃣ 1:1 상담 — 차 한 잔과 함께 피부·체형·컨디션 체크
3️⃣ 맞춤 케어 — 세 전문가가 설계한 나만의 플랜으로 관리
4️⃣ 홈케어 가이드 — 집에서도 효과가 이어지도록 맞춤 루틴 안내

처음이어도 편안하게 오실 수 있도록 준비하고 있을게요 ☺️

👉 예약은 프로필 링크에서!', tags = '#IM에스테틱 #첫방문안내 #에스테틱상담 #맞춤케어 #1대1상담 #대구에스테틱 #수성구피부관리 #범어동에스테틱 #대구프리미엄관리', asset = '실제사진: shop-2(리셉션), shop-1(상담 공간)', design = '카드 인포그래픽형', ai_guide = '프로세스 인포그래픽 → Canva/AI 생성 적합.
프롬프트: "4-step process infographic, reservation consultation care homecare, warm beige background, minimal icons, Korean aesthetic clinic"', slide_count = 6, template_type = '카드 인포그래픽형' WHERE week = 3 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '고객 맞이 준비 ASMR', description = '오직 한 분을 위한 린넨 정돈 및 공간 세팅 과정 (청각 자극)', caption = '[🎧 소리를 켜고 들어보세요]

고객님을 맞이하기 전, 조용히 방을 준비하는 시간이에요. ✨

린넨이 베드에 깔리는 소리, 스팀기가 따뜻하게 데워지는 소리. 이런 작은 것들이 모여서 편안한 공간이 되더라고요.

처음 오시는 분도 긴장 풀고 편하게 쉬실 수 있도록, 오직 한 분만을 위한 방을 준비합니다. 🤍

💾 이 소리가 좋았다면 저장해 두고 자기 전에 다시 들어보세요!', tags = '#ASMR #에스테틱ASMR #프라이빗케어룸 #수성구피부관리실 #테라피스트일상 #오감만족 #관리실세팅 #대구피부관리 #IM에스테틱', asset = '실제 영상 촬영 필수 (shop-5 배경 활용)', design = '릴스 전용 (9:16) — 소리 중심의 힐링 영상', ai_guide = '릴스는 실제 영상 필수 — 커버 이미지만 shop-5 크롭으로 대체 가능. 영상 촬영 불가 시 → shop-5 + 제품 AI 이미지 + ASMR 배경음원으로 사진 슬라이드쇼 릴스 제작.
커버 프롬프트: "pristine white linen being smoothed on a spa bed, soft warm lighting, minimal premium aesthetic, close-up hands"', slide_count = 0, template_type = '' WHERE week = 3 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '오픈 후 찐 후기 모음', description = '카톡/네이버 예약 리뷰 캡처를 활용한 실제 고객 만족도 증명', caption = '"세 분이 제 몸을 저보다 더 잘 아셔서 정말 놀랐어요!" 💌

2월 오픈 후 찾아주신 분들의 따뜻한 후기에 매일 힘을 얻고 있어요.

피부결이 달라진 것도 기쁜데, 무거웠던 어깨가 가벼워지고 꿀잠 잤다는 말씀을 들을 때 — 셋이 함께 고민한 방향이 맞구나 싶었어요.

처음 그 마음 그대로, 한 분 한 분 진심으로 모시겠습니다. 🙇‍♀️

✨ 주변에 피부/체형 고민 있는 분 계시면 태그해 주세요!', tags = '#IM에스테틱후기 #찐후기 #고객리뷰 #대구피부관리후기 #3인케어시스템 #수성구맘 #믿고받는관리 #수성구에스테틱추천', asset = '실제 카톡/네이버 후기 캡처', design = '후기/UGC형 — 실제 캡처 + 브랜드 프레임', ai_guide = '후기 텍스트를 브랜드 프레임(웜화이트 + 차콜 텍스트 + 오렌지 따옴표)에 타이포로 재구성. Canva 후기 카드 템플릿 활용.
프롬프트: "warm white background with large orange quotation marks, premium review card template, minimal Korean aesthetic, charcoal text"', slide_count = 0, template_type = '' WHERE week = 4 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '위생 철칙 체크리스트', description = '1회용 해면, 2중 소독, 1인 1실 베딩 교체 등 청결 프로세스', caption = '내 피부에 직접 닿는 곳이니까, 위생만큼은 절대 타협하지 않아요. 🧴

✔️ 해면·가운 100% 일회용
✔️ 기구 자외선+알코올 2중 소독
✔️ 1인 1룸, 관리 후 바로 베딩 교체 & 환기

언제 오셔도 첫날 그 깨끗함 그대로 유지할게요.', tags = '#안심에스테틱 #위생관리 #클린뷰티 #일회용해면사용 #프라이빗룸 #수성구프라이빗샵 #IM에스테틱 #대구에스테틱', asset = '실제사진: shop-5 (깨끗한 케어룸)', design = '카드 인포그래픽형 — 체크리스트 위주', ai_guide = '위생 체크리스트 인포그래픽 카드 → Canva/AI 생성 적합.
프롬프트: "clean minimal checklist card, warm white background, charcoal text, orange checkmarks, Korean aesthetic clinic hygiene"', slide_count = 5, template_type = '카드 인포그래픽형' WHERE week = 4 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '앰플 언박싱 & 제형', description = '프리미엄 앰플 개봉기와 피부 흡수력을 보여주는 쫀득한 제형 영상', caption = '가장 신선한 상태로 피부에 닿는 순간. ✨

새로 도입한 프리미엄 앰플을 처음 열어봐요. 쫀득하게 늘어나는 이 밀도, 보이시나요?

한 번 관리로도 차이가 느껴지는 고함량 성분을 아낌없이 써요.', tags = '#PDRN #엑소좀 #메디컬스킨케어 #에스테틱화장품 #IM결라인 #제품언박싱 #대구스킨케어 #광채피부', asset = '실제 제품 개봉 영상 촬영', design = '릴스 전용 — 시각적 질감(Texture) 강조', ai_guide = '영상 불가 시 → 제품 AI 이미지 + shop-5 조합으로 사진 슬라이드쇼 릴스.
프롬프트: "luxury skincare ampoule being dispensed, golden serum droplet, warm soft lighting, premium aesthetic"', slide_count = 0, template_type = '' WHERE week = 4 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '수치로 보는 B&A', description = '승모근 높이, 윤곽 변화 등 실제 관리 데이터와 원리 설명', caption = '눈대중이 아니라, 수치로 보여드립니다. 📏

오픈 두 달, 벌써 놀라운 변화들이 나오고 있어요. 솟아있던 승모근 라인이 부드럽게 내려가고, 비대칭이던 턱선이 제자리를 찾았어요.

근막 유착을 정확히 찾아내면, 아프지 않아도 이렇게 달라질 수 있어요.

촬영에 동의해 주신 고객님, 감사합니다! 🤍

📌 나도 이런 변화를 경험하고 싶다면? 프로필 링크에서 지금 바로 예약하세요!', tags = '#비포애프터 #승모근관리 #거북목관리 #안면비대칭교정 #IM윤곽라인 #IM체형라인 #대구윤곽관리 #수성구승모근 #근막테라피', asset = '실제 B&A 사진 또는 실루엣 사진', design = '카드 인포그래픽형 — 수치 강조', ai_guide = '실제 B&A가 없는 경우 → AI로 의료 다이어그램 생성. 실제 사진 없이는 인포그래픽 중심으로 전환.
프롬프트: "medical diagram comparing trapezius muscle height before and after treatment, minimal line illustration, warm beige background, professional aesthetic"', slide_count = 0, template_type = '' WHERE week = 5 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '피로도 자가 진단', description = '체형 불균형과 만성 피로 상태를 체크해보는 참여형 콘텐츠', caption = '자고 일어나도 목이 뻐근하고, 봄 춘곤증처럼 하루 종일 나른하지 않으세요? 🩺

옆으로 넘겨 ''내 몸의 피로도 자가 진단 테스트''를 한번 해보세요. 3개 이상 해당된다면, 이미 몸의 밸런스가 무너지고 있다는 신호일 수 있어요.

겉만 번지르르하게 만드는 관리 말고, 깊은 근막의 긴장부터 풀어주는 케어가 필요한 순간이에요.

💾 나중에 다시 해보려면 저장! 만성피로 친구에게도 공유해 주세요.', tags = '#자가진단 #봄피부관리 #미세먼지피부 #만성피로 #수면부족 #체형불균형 #춘곤증 #웰니스 #대구마사지 #수성구테라피 #나를위한선물', asset = '없음 (순수 인포그래픽)', design = '카드 인포그래픽형 — 참여 유도', ai_guide = '체크리스트 배경 이미지 → AI 생성 적합.
프롬프트: "soft warm gradient background with subtle body silhouette, wellness check concept, cream and peach tones, minimal"', slide_count = 6, template_type = '카드 인포그래픽형' WHERE week = 5 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '1분 괄사 마사지 팁', description = '림프 순환을 돕는 전문가의 괄사 사용법 (홈케어 꿀팁)', caption = '원장님들의 꿀팁 대방출! 집에서 하는 1분 붓기 쏙 괄사 테라피 💆‍♀️

귀 밑부터 쇄골 라인까지 부드럽게 쓸어내려 보세요. 괄사가 피부를 스치는 사각사각 소리와 함께 밀려있던 노폐물이 시원하게 빠져나가요.

중요한 약속 전날 꼭 따라 해 보시고, 더 깊은 관리는 IM 에스테틱에서!

💾 약속 전날 쓸 꿀팁! 저장 필수 🔖', tags = '#괄사마사지 #두피마사지 #림프순환 #붓기빼기 #홈케어꿀팁 #뷰티꿀팁 #수성구피부관리 #범어동에스테틱 #ASMR', asset = '전문가가 실제 괄사 시연하는 영상', design = '릴스 전용 — 튜토리얼 형태', ai_guide = '영상 불가 시 → 괄사 방향 일러스트 AI 생성 + 사진 슬라이드쇼.
프롬프트: "elegant illustration of gua sha massage direction on face and neck, warm minimal style, step-by-step arrows"', slide_count = 0, template_type = '' WHERE week = 5 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '차트 컨퍼런스 비하인드', description = '영업 종료 후 세 전문가가 모여 고객별 최적 솔루션을 회의하는 모습', caption = '"이 고객님은 목뼈의 틀어짐 때문에 우측 얼굴 부종이 심하시네요. 체형 관리 후 림프 순환 스킨케어로 들어가야겠습니다."

관리가 다 끝나고, 영업 종료 후의 IM 에스테틱. 셋이 모여서 내일 오실 고객님들의 차트를 하나하나 들여다봐요.

혼자였으면 놓쳤을 문제도, 세 명의 시선이 모이면 더 정확한 솔루션이 나오더라고요. 📑

💾 이런 관리 받고 싶다면 저장! 상담은 DM으로 편하게 보내주세요.', tags = '#3인케어시스템 #차트분석 #퍼스널스킨케어 #피부주치의 #대구뷰티컨설팅 #IM에스테틱 #피부전문가 #IM에스테틱일상', asset = '세 전문가가 실제로 차트 회의하는 사진', design = '후킹 텍스트 카드 + 리얼 스냅형', ai_guide = '1슬라이드 후킹 텍스트 카드(다크 배경 + 큰 타이포)는 Canva로 제작. 2슬라이드 통합 분석 인포그래픽 → AI 생성 적합.
프롬프트: "minimal infographic showing 3-expert collaborative analysis process, skin + posture + wellness icons, warm professional style"', slide_count = 0, template_type = '' WHERE week = 6 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '에스테틱 성분의 비밀', description = '일반 화장품과 전문가용 제품의 농도 및 흡수력 차이 교육', caption = '로드샵 화장품과 에스테틱 전용 화장품, 뭐가 다를까요? 🧪

가장 큰 차이는 ''유효 성분 농도''와 ''피부 깊숙이 전달되는 흡수력''이에요.

IM 에스테틱은 향만 좋은 화장품이 아니라, 임상으로 검증된 고농축 메디컬 코스메틱만 골라서 쓰고 있어요.

📌 어떤 성분 쓰는지 궁금하시면 DM 주세요!', tags = '#성분사전 #화장품성분 #에스테틱제품 #전문가용화장품 #피부장벽보호 #스킨멀리즘 #화장품추천 #대구메디컬스킨케어', asset = '실제 제품 사진 권장', design = '카드 인포그래픽형 — 교육형 정보', ai_guide = '비교 바 그래프 + 피부 단면도 → AI 생성 매우 적합.
프롬프트: "scientific cross-section illustration of skin layers showing serum penetration depth, minimal medical style, warm beige background, Korean aesthetic infographic"', slide_count = 6, template_type = '카드 인포그래픽형' WHERE week = 6 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '샵 마감 루틴 (Vlog)', description = '인센스 스틱과 함께 공간을 정화하며 하루를 마감하는 힐링 영상', caption = '오늘도 무사히, 그리고 감사하게 하루를 마감합니다. 🌙

하루 종일 쓰인 자리를 깨끗하게 정돈하고, 은은한 향으로 공간을 마무리하는 시간.

내일도 이곳이 누군가에게 편안한 쉼터가 되길. 모두 편안한 밤 되세요. ✨', tags = '#마감루틴 #퇴근브이로그 #인센스스틱 #공간정화 #테라피스트의하루 #수성구핫플 #에스테틱일상 #감성브이로그', asset = '마감 루틴 실제 브이로그 촬영', design = '릴스 전용 — 감성 브이로그', ai_guide = '영상 불가 시 → 공간 사진들(shop-1~7) + 은은한 BGM으로 ''마감 무드'' 슬라이드쇼 릴스 제작.
커버 프롬프트: "a single thin incense stick in ceramic holder, delicate smoke trail, dark warm background, soft amber backlighting, calming spa atmosphere"', slide_count = 0, template_type = '' WHERE week = 6 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = 'IM 웨딩 라인', description = '봄 신부를 위한 드레스 핏(어깨/쇄골) 관리와 D-day 플랜 안내', caption = '봄 웨딩 시즌, 5월의 신부를 완성하는 가장 중요한 디테일은 매끄러운 어깨와 쇄골 라인이에요. 👰‍♀️💍

단기간에 무리하게 압을 가해서 멍이 드는 관리, 절대 안 됩니다.

IM 에스테틱의 웨딩 케어는 긴장된 신경과 스트레스까지 함께 풀어드려요. 맑은 안색, 매끈한 드레스 핏까지 완성해 드릴게요.

👰 상담은 DM이나 프로필 링크에서! 주변 예비 신부님 태그해 주세요 💕', tags = '#대구신부관리 #대구웨딩케어 #IM웨딩라인 #수성구신부관리 #드레스핏 #예비신부 #결혼준비 #봄웨딩 #승모근관리', asset = '웨딩 관련 실제 사진 또는 웨딩 드레스 무드 사진', design = '후킹 텍스트 + 리얼 스냅형 + 타임라인 카드', ai_guide = '1슬라이드 드레스 뒷모습(쇄골/어깨 라인) → AI 생성 적합. 2슬라이드 D-day 타임라인 카드 → Canva 인포그래픽.
프롬프트: "elegant back view of bride showing beautiful collarbone and shoulder line, soft spring light, romantic minimal, warm tone"', slide_count = 0, template_type = '' WHERE week = 7 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '뷰티 Myth vs Fact', description = '"아파야 효과 있다?"는 오해를 해부학적으로 풀이하는 정보성 피드', caption = '❌ "원장님, 더 세게 멍들 때까지 눌러주세요. 그래야 뼈가 작아지죠!"

사실 우리 몸은 과한 통증을 느끼면 오히려 근육을 수축시키고 더 긴장해요. 멍이 들고 붓는 건 조직이 손상됐다는 신호예요.

IM 에스테틱은 정확한 해부학적 포인트를 잡아 통증 없이 부드럽게 풀어내요. 아프지 않아도 라인은 확실하게 달라져요.

💾 이 정보가 도움이 되셨다면 저장! "아직도 아파야 효과 있다"고 생각하는 친구에게 공유해 주세요 😉', tags = '#뷰티상식 #팩트체크 #무통증윤곽 #대구윤곽관리 #안아픈마사지 #체형교정의진실 #뷰티정보 #근막관리', asset = '없음 (순수 타이포)', design = '질문 -> 답변 플립형 (강력한 대비)', ai_guide = '배경 텍스처만 AI 생성.
Myth 카드 프롬프트: "dark charcoal textured background for text overlay, subtle grain, premium feel"
Fact 카드 프롬프트: "warm cream background with soft light, clean minimal"', slide_count = 6, template_type = '질문→답변 플립형' WHERE week = 7 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '족욕 스파 ASMR', description = '따뜻한 물에 아로마 오일과 꽃잎을 띄우는 시청각 힐링 콘텐츠', caption = '[이어폰 필수 🎧] 따뜻한 물소리가 주는 위로.

관리 전, 체온을 은은하게 높여주는 족욕 시간이에요. 물이 찰박거리는 소리, 아로마 오일의 묵직한 향이 섞이면서 복잡했던 머릿속이 조용히 비워져요.

💾 잠이 안 올 때 다시 틀어보세요. 주변 지친 분에게 공유도!', tags = '#스파ASMR #물소리 #아로마스파 #힐링타임 #스트레스해소 #주말휴식 #수성구피부관리실 #범어동힐링', asset = '족욕/오일 블렌딩 실제 영상 촬영', design = '릴스 전용 — 오감 자극', ai_guide = '영상 불가 시 → 물/오일 AI 이미지 + 무료 ASMR 음원으로 슬라이드쇼 릴스.
프롬프트: "warm water with aromatic oil drops creating ripples, spa atmosphere, soft warm lighting, close-up"', slide_count = 0, template_type = '' WHERE week = 7 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '피드', title = '고객과의 따뜻한 티타임', description = '상담 과정에서의 대화와 정성을 강조하는 브랜딩 스냅', caption = '"원장님들이랑 이야기하다 보면 관리받기도 전에 벌써 힐링되는 기분이에요." ☕🤍

오픈 후 정신없는 시간 속에서도 꼭 지킨 것 하나가 있어요. 바로 고객님들과의 깊은 대화입니다.

IM 에스테틱의 관리는 차 한 잔 나누면서 일상 습관들을 듣는 것부터 시작돼요. 언제든 편하게 기대어 쉬실 수 있는 곳이 되고 싶어요.

👉 관리 전 티타임이 궁금하시면, 프로필 링크에서 예약해 보세요!', tags = '#티타임 #고객소통 #이너뷰티차 #뷰티카운셀링 #대구에스테틱 #수성구피부관리 #뷰티멘토 #따뜻한일상', asset = '실제 고객과 차 마시는 상담 사진', design = '리얼 스냅형 — 따뜻한 무드 강조', ai_guide = 'shop-1 바 카운터 사진 단독 사용 + 타이포 오버레이 권장. 또는 AI로 차 세트 클로즈업 생성.
프롬프트: "warm herbal tea set on white counter, two cups, cozy minimal aesthetic, soft natural light"', slide_count = 0, template_type = '' WHERE week = 8 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '4월 예약 & 프로모션', description = '벚꽃 테마의 4월 예약 캘린더 오픈 및 봄철 수분 케어 이벤트 공지', caption = '📅 IM AESTHETIC [4월] 예약 캘린더 오픈!

두 달간 보내주신 사랑 감사해요. 4월 예약을 오픈합니다!

꽃가루랑 미세먼지로 예민해지는 봄 피부를 위한 [수분폭탄 장벽 케어 프로모션]을 한정으로 준비했어요.

원하시는 시간대 잡으시려면 프로필 링크 확인해 주세요! 🏃‍♀️', tags = '#이달의이벤트 #에스테틱이벤트 #봄철피부관리 #환절기피부 #미세먼지피부 #수분관리 #장벽케어 #대구피부이벤트 #수성구이벤트 #예약오픈', asset = '없음 (캘린더 인포그래픽)', design = '카드 인포그래픽형 — 희소성 강조', ai_guide = '벚꽃 배경 그래픽 → AI 생성 적합.
프롬프트: "soft cherry blossom petals on warm cream background, minimal spring aesthetic, Korean beauty promotion style"', slide_count = 6, template_type = '카드 인포그래픽형' WHERE week = 8 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '전문가 스터디 로그', description = '해부학 공부와 케이스 연구를 멈추지 않는 3인의 열정 타임랩스', caption = '"전문가란, 멈추지 않고 계속 배워나가는 사람이라고 생각합니다." 📚

셋이 오늘도 남아서 새로운 테크닉을 연구하고, 최신 논문을 읽으며 하루를 마무리해요.

믿고 누워주시는 그 시간이 헛되지 않도록, 앞으로도 더 깊어진 손길로 뵐게요. 🌿', tags = '#스터디로그 #테라피스트 #공부하는전문가 #피부연구 #하이엔드뷰티 #수성구피부관리 #에스테틱전문가 #IM에스테틱', asset = '세 전문가의 공부/연구 모습 타임랩스 영상', design = '릴스 전용 — 타임랩스 브이로그', ai_guide = '영상 불가 시 → 단체사진.jpg + shop-1 + 책/논문 AI 이미지 조합 슬라이드쇼.
프롬프트: "aesthetic desk with medical textbooks and skincare research papers, warm lighting, study atmosphere, minimal"', slide_count = 0, template_type = '' WHERE week = 8 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '이미지', title = '보습 결케어 감성 소개', description = '고객 실제 고민 인용으로 보습 결케어의 핵심 철학 전달', caption = '"바를 땐 촉촉한데, 금방 다시 건조해져요."

상담에서 가장 많이 듣는 말이에요. 그래서 저희는 이렇게 질문해요.

"지금 피부 결이 수분을 머금을 수 있는 상태인가요?"

보습의 핵심은 수분의 양이 아니라 ''붙잡는 힘''이에요. 결이 흐트러진 피부에는 아무리 좋은 보습제를 써도 수분이 잠깐 머물다 빠져나가요.

화장품을 바꾸기 전에, 피부 결부터 점검해보세요. 🤍

👉 보습 결케어가 궁금하시면 프로필 블로그에서 자세히 확인하세요!', tags = '#보습결케어 #IM결라인 #피부결관리 #속건조관리 #피부보습관리 #결라인케어 #피부장벽케어 #수성구피부관리 #범어동에스테틱 #아이엠에스테틱', asset = '제품 사용 장면, 시술 중 손 터치 장면', design = '리얼 스냅형 — 시술 손 클로즈업 + 타이포 1줄', ai_guide = '촉촉한 피부 결 클로즈업 이미지.
프롬프트: "extreme close-up of dewy hydrated skin texture, soft warm lighting, minimal beauty aesthetic"', slide_count = 0, template_type = '' WHERE week = 9 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '보습 결케어 3단계', description = '수분이 머무는 피부를 만드는 보습 결케어 프로그램 상세 소개', caption = '보습해도 건조한 이유, 알고 계셨나요? 💧

IM 에스테틱의 결라인 보습 결케어는 단순히 촉촉하게 만드는 관리가 아니에요.

1️⃣ 결 안정 — 각질을 벗겨내는 게 아니라, 피부 결의 방향과 흐름을 정돈해 수분이 고르게 머물 수 있도록
2️⃣ 손 감각 기반 저자극 케어 — 손의 압과 온도로 피부를 긴장시키지 않고 풀어주고, 저자극 장비로 깊숙이 수분 공급
3️⃣ 장벽 보호 보습 — 장벽을 무너뜨리지 않으며 촉촉함을 쌓아가는 관리

보습이 ''지속될 수 있는 피부 상태''를 만드는 것. 그게 결케어의 목표예요.

💾 건조한 피부 고민 있는 친구에게 공유해 주세요!', tags = '#보습결케어 #IM결라인 #피부결정돈 #저자극보습 #피부장벽보호 #촉촉한피부 #보습에스테틱 #프리미엄피부관리 #범어동피부관리 #수성구에스테틱', asset = '단계별 시술 장면 3컷', design = '프로그램 소개형 — 7장 캐러셀', ai_guide = '3단계 프로세스 인포그래픽.
프롬프트: "3-step skincare process infographic, skin texture repair hydration barrier protection, warm cream background, minimal Korean aesthetic"', slide_count = 7, template_type = '프로그램 소개형' WHERE week = 9 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '보습 결케어 시술 ASMR', description = '앰플 도포, 마스크팩, 수기 터치 ASMR로 보습 결케어 체험', caption = '[🎧 소리를 켜고 들어보세요]

피부 결을 정돈하고 수분을 채워가는 시간. 들떠 있던 결이 차분히 내려앉으면, 피부는 스스로 촉촉함을 유지하기 시작해요. 💧

이 소리가 좋았다면 저장해두고 잠들기 전에 다시 들어보세요 🌙', tags = '#보습ASMR #에스테틱ASMR #피부결케어 #보습관리 #수분관리 #스킨케어ASMR #힐링 #범어동에스테틱 #IM에스테틱', asset = '보습 결케어 시술 영상', design = '릴스 전용 — 시술 ASMR', ai_guide = '시술 사진 + ASMR 배경음원으로 슬라이드쇼 릴스', slide_count = 0, template_type = '' WHERE week = 9 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '이미지', title = '트러블 결케어 감성 소개', description = '반복되는 트러블의 진짜 원인이 피부 결에 있다는 인사이트 전달', caption = '화장으로 안 가려지는 좁쌀 여드름, 반복되는 트러블의 정체가 뭘까요?

겉으로 보이는 트러블만 잡으면 잠깐은 괜찮아져도 금방 다시 올라와요. 피부 결이 무너진 상태에서는 트러블이 반복될 수밖에 없거든요.

IM 에스테틱의 트러블 결케어는 트러블 ''자체''가 아니라, 트러블이 반복되는 피부 결의 흐름부터 바로잡아요. 🤍

👉 나도 해당된다 싶으면 프로필 링크에서 상담 예약!', tags = '#트러블결케어 #IM결라인 #좁쌀여드름 #반복트러블 #피부트러블관리 #여드름관리 #문제성피부 #대구여드름관리 #수성구피부관리 #범어동에스테틱', asset = '트러블 케어 전후 비교 또는 시술 장면', design = '리얼 스냅형 — 시술 장면 + 타이포 1줄', ai_guide = '깨끗한 피부 결 클로즈업.
프롬프트: "clear smooth skin texture close-up, warm natural light, Korean beauty minimal"', slide_count = 0, template_type = '' WHERE week = 10 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '트러블 반복 3가지 이유', description = '트러블이 반복되는 원인과 결케어 솔루션 상세 설명', caption = '좁쌀이 좀 나았다 싶으면 또 올라오고... 왜 반복될까요? 🔁

트러블이 반복되는 진짜 이유:
❌ 결이 흐트러져 모공이 막히기 쉬운 상태
❌ 각질이 들떠 있어 유분 밸런스가 무너진 상태
❌ 장벽이 약해져 외부 자극에 계속 반응하는 상태

IM 결라인 트러블 결케어는:
✅ 피부 결을 먼저 안정시키고
✅ 트러블의 순환 고리를 끊어내며
✅ 장벽을 보호하면서 회복을 도와요

💾 반복 트러블 고민 있다면 저장! 친구에게도 공유!', tags = '#트러블결케어 #여드름원인 #좁쌀여드름관리 #피부결정돈 #트러블순환 #피부장벽강화 #IM결라인 #범어동피부관리 #수성구에스테틱 #아이엠에스테틱', asset = '시술 과정 사진 3컷', design = '프로그램 소개형 — 7장 캐러셀', ai_guide = '원인-솔루션 비교 인포그래픽.
프롬프트: "cause and solution comparison infographic, skin trouble cycle diagram, warm beige background, minimal Korean aesthetic"', slide_count = 7, template_type = '프로그램 소개형' WHERE week = 10 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '트러블 결케어 B&A 타임랩스', description = '관리 전후 피부 변화를 타임랩스로 보여주는 결과 증명 릴스', caption = '말보다 결과로. 트러블 결케어 관리 과정을 보여드릴게요. ✨

트러블 자체를 짜내거나 벗겨내는 게 아니라, 피부 결의 흐름을 안정시키며 자연스럽게 회복되는 과정이에요.

촬영에 동의해 주신 고객님 감사합니다! 🤍

💾 이런 변화 경험하고 싶다면 저장 + 프로필 링크에서 예약!', tags = '#비포애프터 #트러블변화 #피부변화 #트러블결케어 #IM결라인 #피부관리결과 #수성구피부관리 #범어동에스테틱', asset = '관리 전후 피부 클로즈업 영상', design = '릴스 전용 — B&A 타임랩스', ai_guide = '관리 전후 사진 슬라이드쇼 + 차분한 BGM', slide_count = 0, template_type = '' WHERE week = 10 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '이미지', title = '진정 결케어 감성 소개', description = '붉은기의 진짜 원인이 열이 아니라 순환이라는 인사이트', caption = '자꾸 붉어지는 얼굴. 열을 식히면 괜찮아질까요?

사실 피부 홍조의 진짜 원인은 ''열''이 아니라 ''순환''에 있는 경우가 많아요. 순환이 정체되면 열이 한곳에 머물고, 그게 붉은기로 나타나는 거예요.

IM 에스테틱의 진정 결케어는 차가운 것으로 덮는 게 아니라, 순환의 흐름을 정돈해서 열이 자연스럽게 빠져나가도록 도와요. 🤍

👉 붉은기 고민, 프로필 링크에서 상담 예약하세요!', tags = '#진정결케어 #IM결라인 #피부진정 #붉은기관리 #피부홍조 #예민한피부 #순환케어 #수성구피부관리 #범어동에스테틱 #아이엠에스테틱', asset = '진정 케어 시술 장면 (쿨링 마스크, 수기 터치)', design = '리얼 스냅형 — 시술 장면 + 타이포 1줄', ai_guide = '차분한 피부 톤 이미지.
프롬프트: "calm soothed skin with cool tone, soft natural light, minimal beauty close-up"', slide_count = 0, template_type = '' WHERE week = 11 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = '톤업 결케어 — 맑은 광채로', description = '칙칙한 안색의 원인과 톤업 결케어 솔루션', caption = '칙칙한 안색, 화장으로 가리려 하지 마세요. ✨

피부가 칙칙해 보이는 건 멜라닌만의 문제가 아니에요. 결이 흐트러지면 빛이 고르게 반사되지 않아서 칙칙하게 보이는 거예요.

IM 결라인 톤업 결케어는:
1️⃣ 결을 고르게 정돈해 빛 반사율을 높이고
2️⃣ 순환을 활성화해 안색을 맑게 하며
3️⃣ 장벽을 안정시켜 광채가 유지되도록

인상이 달라지는 경험, 해보고 싶지 않으세요?

💾 중요한 날 전에 받고 싶다면 저장!', tags = '#톤업결케어 #IM결라인 #피부톤업 #맑은피부 #광채피부 #칙칙한안색 #인상변화 #수성구에스테틱 #범어동피부관리 #아이엠에스테틱', asset = '톤업 관리 전후 비교, 광채 피부 클로즈업', design = '프로그램 소개형 — 7장 캐러셀', ai_guide = '톤업 비교 다이어그램.
프롬프트: "before after skin tone comparison, dull to radiant, minimal infographic, warm cream background"', slide_count = 7, template_type = '프로그램 소개형' WHERE week = 11 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '톤업 B&A — 같은 사람 맞나요?', description = '동일 조명에서 관리 전후 피부 톤 비교', caption = '같은 조명, 같은 각도. 달라진 건 피부 결 하나예요. ✨

메이크업으로 덮는 톤업이 아니라, 결이 살아나면서 빛을 고르게 반사하는 진짜 광채.

촬영에 동의해 주신 고객님 감사합니다! 🤍

💾 중요한 날 전에 받고 싶다면 저장해 두세요!', tags = '#비포애프터 #톤업변화 #피부광채 #결케어결과 #IM결라인 #맑은피부 #범어동에스테틱 #수성구피부관리', asset = '톤업 관리 전후 영상 (동일 조명)', design = '릴스 전용 — B&A 반전 효과', ai_guide = '전후 사진 슬라이드쇼 + 감성 BGM', slide_count = 0, template_type = '' WHERE week = 11 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '이미지', title = '윤곽라인 감성 소개', description = '비대칭의 원인과 조화로운 흐름의 중요성', caption = '거울을 볼 때마다 왼쪽과 오른쪽이 다르게 느껴진다면, 얼굴은 이미 작은 신호를 보내고 있는 거예요.

얼굴의 좌우 차이는 근막의 방향성, 턱관절의 연결, 사용 습관이 서서히 쌓이며 만들어지는 흐름의 결과예요.

균형은 완벽한 대칭을 의미하지 않아요. 조화로운 흐름이 이어질 때 얼굴은 가장 자연스러운 아름다움을 드러내요. 🤍

👉 윤곽 고민, 프로필 링크에서 상담 예약!', tags = '#IM윤곽라인 #비대칭윤곽케어 #균형얼굴 #얼굴비대칭 #윤곽관리 #대구윤곽관리 #범어동윤곽관리 #수성구에스테틱 #아이엠에스테틱', asset = '윤곽 케어 시술 장면 (턱선, 광대 라인 수기 터치)', design = '리얼 스냅형 — 시술 손 클로즈업 + 타이포 1줄', ai_guide = '얼굴 실루엣 대칭 비교 이미지.
프롬프트: "elegant facial silhouette showing symmetry balance, soft warm lighting, minimal aesthetic"', slide_count = 0, template_type = '' WHERE week = 12 AND day = '화' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '캐러셀', title = 'IM 윤곽라인 4대 프로그램', description = '볼륨윤곽·볼륨동안·비대칭윤곽·작은얼굴윤곽 4대 프로그램 비교', caption = '얼굴 고민이 다 같지 않듯, 윤곽 관리도 다 같지 않아요. 🪞

IM 윤곽라인은 모든 프로그램에 결관리를 기본으로 합니다.

🔸 볼륨윤곽관리 — 팔자주름·볼패임, 입체적 윤곽
🔸 볼륨동안관리 — 꺼진 얼굴, 탄력과 생기 회복
🔸 비대칭윤곽케어 — 좌우 차이, 균형 완성
🔸 작은얼굴윤곽케어 — 붓기·이중턱, V라인

내 고민에 맞는 프로그램이 뭔지 궁금하시면 DM 주세요! 🤍

💾 나중에 참고하려면 저장!', tags = '#IM윤곽라인 #볼륨윤곽관리 #볼륨동안관리 #비대칭윤곽케어 #작은얼굴윤곽케어 #대구윤곽관리 #팔자주름관리 #볼패임개선 #범어동에스테틱 #수성구에스테틱 #아이엠에스테틱', asset = '프로그램별 시술 장면 4컷', design = '프로그램 소개형 — 7장 캐러셀', ai_guide = '4개 프로그램 비교 인포그래픽.
프롬프트: "4-program comparison card, facial contouring volume balance slimming, warm cream background, minimal icons, Korean aesthetic"', slide_count = 7, template_type = '프로그램 소개형' WHERE week = 12 AND day = '목' AND clinic_id = '00000000-0000-0000-0000-000000000001';
UPDATE posts SET type = '릴스', title = '윤곽 케어 풀 영상 — 두피에서 쇄골까지', description = '4단계 시술 과정 타임랩스 (근막분석→라인정리→균형조율→흉곽연결)', caption = 'IM 윤곽라인이 얼굴만 만지지 않는 이유. 🤍

두피 긴장을 완화하고, 목과 턱의 연결을 부드럽게 이어, 광대·턱선·귀밑 라인의 좌우 균형을 맞추고, 흉곽·쇄골까지 함께 다뤄요.

얼굴은 독립된 부위가 아니라 두피·목·턱·흉곽과 연결된 하나의 구조니까요.

💾 이런 관리 처음 보셨다면 저장!', tags = '#윤곽케어시술 #IM윤곽라인 #근막케어 #두피에서쇄골까지 #얼굴윤곽 #수기테크닉 #대구윤곽관리 #범어동에스테틱 #수성구피부관리 #아이엠에스테틱', asset = '윤곽 케어 전 과정 영상', design = '릴스 전용 — 4단계 타임랩스', ai_guide = '시술 사진 + 차분한 BGM 슬라이드쇼', slide_count = 0, template_type = '' WHERE week = 12 AND day = '토' AND clinic_id = '00000000-0000-0000-0000-000000000001';
