import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL is required' });
        console.log(`[API] 크롤링 시작: ${url}`);

        // 웹페이지 스크래핑
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            responseType: 'arraybuffer' // 인코딩 문제를 피하기 위해 arraybuffer로 가져옴
        });

        // 간단히 UTF-8로 디코딩 (n2spa는 utf-8로 응답함)
        const html = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(html);

        // 불필요한 태그 제거 (스크립트, 스타일, 네비게이션 등)
        $('script, style, nav, footer, header').remove();

        const ogTitle = $('meta[property="og:title"]').attr('content');
        const titleText = ogTitle || $('title').text() || '제목 없음';
        const title = titleText.replace('N2Spa | ', '').trim();

        const mainImage = $('meta[property="og:image"]').attr('content') || null;

        // 주요 텍스트 추출
        let texts = [];
        $('p, div, span, h2, h3').each((i, el) => {
            const text = $(el).text().trim().replace(/\s+/g, ' ');
            if (text.length > 15 && !text.includes('장바구니') && !text.includes('이용약관') && !text.includes('로그인')) {
                texts.push(text);
            }
        });

        // 중복 제거 후 최대 20문장/단락으로 제한하여 토큰 절약
        const uniqueTexts = [...new Set(texts)].slice(0, 20).join(' ');

        console.log(`[API] 크롤링 성공 - 제목: ${title}`);
        console.log(`[API] Gemini 콘텐츠 생성 중...`);

        // Gemini 프롬프트 구성
        const systemInstruction = `
당신은 럭셔리 에스테틱 마케터 'IM AESTHETIC' 소속 AI입니다.
사용자가 제공하는 제품/서비스 정보를 바탕으로 3가지 마케팅 에셋을 JSON 포맷으로 생성해주세요.

[요구사항]
1. card_news: 인스타그램 캐러셀 5장 카드뉴스
    - slide_1_hook: 20자 이내의 강력한 후킹 제목 (초점: 고객의 피부고민)
    - slide_2_pain_point: 피부 고민 공감 문구 (2문장 이내)
    - slide_3_solution: 이제품/서비스가 문제를 해결하는 원리와 핵심 성분/효능 (2문장 이내)
    - slide_4_benefit: 사용 후 얻게 되는 가장 직관적인 효과 (2문장 이내)
    - slide_5_cta: 저장을 유도하거나 예약/구매를 유도하는 마무리 멘트

2. image_generation_prompts: 고퀄리티 제품 연출컷 생성용 영문 프롬프트 2개
    - prompt_1: 에스테틱 샵(스파) 분위기를 배경으로 한 럭셔리한 화장품 매크로 샷 (Midjourney/DALL-E용)
    - prompt_2: 제품의 성분 특징(수분, 진정, 탄력 등)이 강조된 텍스처나 물방울 감성 컷 (영문)

3. video_script: 릴스/쇼츠를 위한 기획안 (5~10초 길이)
    - hook_scene: 시선을 끄는 첫 장면 기획 (한글명세)
    - video_generation_prompt: 영상 생성 AI(Runway Gen-3 등)용 영문 프롬프트 (예: Slow motion macro shot of cream melting into skin)

주의: 응답은 반드시 마크다운(\`\`\`json)을 제외한 순수 JSON 문자열이거나, JSON 포맷만을 반환해야 합니다.
`;
        const userPrompt = `제품 / 서비스명: ${title} \n관련 상세 텍스트(요약본): ${uniqueTexts} `;

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { role: 'user', parts: [{ text: systemInstruction + '\n\n' + userPrompt }] }
            ]
        });

        let textResponse = result.text;

        // 마크다운 블록이나 혹시 묻은 불필요한 문자 제거
        let cleanJson = textResponse.replace(new RegExp('^```(?:json)?', 'im'), '').replace(new RegExp('```$', 'im'), '').trim();
        const startIdx = cleanJson.indexOf('{');
        const endIdx = cleanJson.lastIndexOf('}');
        cleanJson = cleanJson.substring(startIdx, endIdx + 1);

        const assetData = JSON.parse(cleanJson);
        assetData.original_image = mainImage;
        assetData.product_name = title;

        console.log(`[API] 생성 성공: ${title}`);
        res.json(assetData);

    } catch (error) {
        console.error('[API Error]', error);
        res.status(500).json({ error: error.message || 'Failed to process the URL' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`[Server] API Server is running on http://localhost:${PORT}`);
});
