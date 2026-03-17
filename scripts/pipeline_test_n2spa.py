import requests
from bs4 import BeautifulSoup
import json
import os
import re
from openai import OpenAI
from dotenv import load_dotenv

# 로컬 환경 변수 로드 (.env 파일)
load_dotenv()

# OpenAI 클라이언트 초기화
# 주의: 이 스크립트를 실행하려면 .env 파일에 OPENAI_API_KEY 가 설정되어 있어야 합니다.
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def scrape_product_info(url):
    """
    n2spa.co.kr 제품 상세 페이지에서 텍스트와 메인 이미지를 크롤링합니다.
    """
    print(f"[*] 크롤링 시작: {url}")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    response.encoding = 'utf-8'
    
    if response.status_code != 200:
        print(f"[!] 웹페이지를 불러오는 데 실패했습니다 (상태 코드: {response.status_code})")
        return None
        
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 1. 메인 이미지 (OG Image 활용)
    og_image = soup.find('meta', property='og:image')
    main_image_url = og_image['content'] if og_image else None
    
    # 2. 타이틀 (og:title 또는 기본 title 활용)
    og_title = soup.find('meta', property='og:title')
    title = og_title['content'] if og_title else (soup.title.string if soup.title else '제목 없음')
    
    # "N2Spa | 부분 제거"
    title = title.replace("N2Spa | ", "").strip()
    
    # 3. 본문 텍스트 추출 (쓸모없는 스크립트/스타일 태그 제거)
    for script in soup(["script", "style", "nav", "footer", "header"]):
        script.extract()
        
    # 주로 상세 내용은 본문 안의 div, p 태그 등에 있습니다
    # 간단히 하기 위해 body 전체 텍스트 중 의미있는 길이의 문장들만 수집
    text_parts = []
    for p in soup.find_all(['p', 'div', 'span', 'h2', 'h3']):
        text = p.get_text(strip=True)
        # 내용이 있고, 너무 짧거나 네비게이션용 단어가 아닌 경우 잡기 (임시 필터)
        if len(text) > 15 and "장바구니" not in text and "로그인" not in text and "이용약관" not in text:
            text_parts.append(text)
            
    # 중복 제거 후 하나의 문자열로 결합 (초반 20개 문장만 추출해 AI에게 전달)
    unique_texts = list(dict.fromkeys(text_parts))[:20]
    full_text = " ".join(unique_texts)
    
    return {
        "title": title,
        "main_image": main_image_url,
        "raw_text": full_text
    }

def generate_marketing_assets(product_data):
    """
    OpenAI API를 사용하여 크롤링된 정보로부터 카드뉴스 텍스트, 이미지 프롬프트, 영상 스크립트를 도출합니다.
    """
    print("[*] AI 기반 마케팅 에셋 생성 중...")
    
    system_prompt = """
    당신은 럭셔리 에스테틱 브랜드 'IM AESTHETIC'의 수석 마케터입니다.
    사용자가 제공하는 제품 관련 러프한 텍스트 정보를 바탕으로 3가지 마케팅 에셋을 JSON 포맷으로 생성해주세요.

    [요구사항]
    1. card_news: 인스타그램 캐러셀 카드뉴스 5장 분량의 텍스트
        - slide_1_hook: 20자 이내의 강력한 후킹 제목 (감성적/호기심 유발)
        - slide_2_pain_point: 고객이 겪고 있는 문제점 공감 (2문장 이내)
        - slide_3_solution: 이 제품이 그 문제를 어떻게 해결하는지 핵심 성분/효능 (2문장 이내)
        - slide_4_benefit: 이 제품을 쓰면 얻게 되는 최종 결과/베네핏 (2문장 이내)
        - slide_5_cta: 저장을 유도하거나 구매/상담을 유도하는 마무리 문구

    2. image_generation_prompts: Midjourney/DALL-E에서 고퀄리티 제품 연출컷을 생성하기 위한 영어 프롬프트 2개
        - prompt_1: 에스테틱 샵(스파) 분위기를 배경으로 한 럭셔리한 화장품 매크로 샷
        - prompt_2: 제품의 주 성분(수분, 진정 등)의 텍스처나 물방울이 강조된 감각적인 연출 컷

    3. video_script: 인스타그램 릴스/쇼츠를 위한 5~10초 길이의 영상 기획안 및 영상 생성 AI(예: Runway/Sora)용 영문 프롬프트
        - hook_scene: 시선을 끄는 첫 장면 기획 (한글)
        - video_generation_prompt: 영상 생성 AI에 넣을 구체적인 영어 프롬프트 (예: Slow motion macro shot of cream melting into skin...)

    [주의]
    응답은 반드시 파싱 가능한 JSON(마크다운 코드블록 포함 허용) 형태여야 합니다.
    """

    user_prompt = f"""
    제품명: {product_data['title']}
    관련 텍스트 내용: {product_data['raw_text']}
    
    위 제품 정보를 바탕으로 마케팅 에셋을 JSON 형태로 만들어주세요.
    """
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        result_json = completion.choices[0].message.content
        return json.loads(result_json)
        
    except Exception as e:
        print(f"[!] AI 생성 중 오류 발생: {e}")
        return None

if __name__ == "__main__":
    test_url = "https://www.n2spa.co.kr/products/%ED%95%98%EC%9D%B4%EB%93%9C%EB%A1%9C%ED%8F%AC%EB%B9%88-%EC%88%98%EB%B6%84%ED%81%AC%EB%A6%BC"
    
    print("=" * 50)
    print("STEP 1: 웹페이지 크롤링 (정보 수집)")
    print("=" * 50)
    
    scraped_data = scrape_product_info(test_url)
    
    if scraped_data:
        print(f"✅ 타이틀: {scraped_data['title']}")
        print(f"✅ 원본 이미지 URL: {scraped_data['main_image']}")
        print(f"✅ 추출된 텍스트 샘플: {scraped_data['raw_text'][:100]}...\n")
        
        print("=" * 50)
        print("STEP 2: AI 마케팅 에셋 자동 생성 (OpenAI 연동)")
        print("=" * 50)
        
        if not os.getenv('OPENAI_API_KEY'):
            print("⚠️ 경고: .env 파일에 OPENAI_API_KEY가 등록되어 있지 않아 AI 생성을 건너뜁니다.")
            print("발급받으신 OpenAI API 키를 .env 파일에 OPENAI_API_KEY=sk-... 형태로 넣어주세요.")
        else:
            assets = generate_marketing_assets(scraped_data)
            
            if assets:
                print("\n🎉 [생성 완료! 결과물 미리보기]")
                print("\n[📱 카드뉴스 기획안]")
                print(f"1. 훅: {assets.get('card_news', {}).get('slide_1_hook', '')}")
                print(f"2. 공감: {assets.get('card_news', {}).get('slide_2_pain_point', '')}")
                print(f"3. 솔루션: {assets.get('card_news', {}).get('slide_3_solution', '')}")
                
                print("\n[🎨 고퀄리티 이미지 생성 프롬프트 (Midjourney/DALL-E용)]")
                print(f"1: {assets.get('image_generation_prompts', {}).get('prompt_1', '')}")
                print(f"2: {assets.get('image_generation_prompts', {}).get('prompt_2', '')}")
                
                print("\n[🎬 릴스/쇼츠 기획 및 영상 생성 프롬프트]")
                print(f"첫 장면(기획): {assets.get('video_script', {}).get('hook_scene', '')}")
                print(f"비디오 AI 프롬프트: {assets.get('video_script', {}).get('video_generation_prompt', '')}")
                
                # 결과를 JSON 파일로 저장
                output_path = os.path.join(os.path.dirname(__file__), 'sample_marketing_asset.json')
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(assets, f, ensure_ascii=False, indent=2)
                print(f"\n📂 전체 결과물이 '{output_path}'에 저장되었습니다!")
                
    else:
        print("크롤링에 실패하여 프로세스를 종료합니다.")
