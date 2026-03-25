import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const keyMatch = envContent.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/);
const apiKey = keyMatch[1];
const ai = new GoogleGenAI({ apiKey });
const FEED_DIR = path.join(__dirname, '..', 'public', 'feed_images');
const W = 1080, H = 1350;

async function svgToPng(svg) { return sharp(Buffer.from(svg)).png().toBuffer(); }

async function geminiImage(prompt) {
  const r = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseModalities: ['IMAGE', 'TEXT'] },
  });
  const parts = r.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  if (!img) throw new Error('No image generated');
  return Buffer.from(img.inlineData.data, 'base64');
}

// Text overlay SVG for brand cards
function brandOverlay(type) {
  const overlays = {
    // Card 1: IM AESTHETIC logo on orange tinted image
    logo: `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E8703A" stop-opacity="0.75"/>
          <stop offset="50%" stop-color="#E8703A" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#D4622E" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#ov)"/>
      <text x="540" y="600" text-anchor="middle" font-family="Georgia,serif" font-size="340" font-weight="300" fill="#FFFFFF" letter-spacing="25">IM</text>
      <line x1="310" y1="670" x2="770" y2="670" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
      <text x="540" y="730" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="400" fill="rgba(255,255,255,0.9)" letter-spacing="22">AESTHETIC</text>
      <text x="540" y="1080" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.4)" letter-spacing="3">대구 수성구 범어동 마크팰리스</text>
    </svg>`,

    // Card 2: Slogan on beige tinted image
    slogan: `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFF8F0" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#FAF0E4" stop-opacity="0.82"/>
          <stop offset="100%" stop-color="#F5E8D8" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#ov)"/>
      <text x="540" y="340" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="400" fill="#E8703A" letter-spacing="10" opacity="0.5">IM AESTHETIC</text>
      <line x1="460" y1="362" x2="620" y2="362" stroke="#E8703A" stroke-width="0.8" opacity="0.25"/>
      <text x="540" y="540" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">당신의</text>
      <text x="540" y="640" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">가장 빛나는</text>
      <text x="540" y="740" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">날을</text>
      <text x="540" y="840" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">준비합니다</text>
      <line x1="480" y1="900" x2="600" y2="900" stroke="#E8703A" stroke-width="1" opacity="0.3"/>
      <text x="540" y="960" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="400" fill="#E8703A" letter-spacing="3" opacity="0.5">WEDDING CARE SPECIALIST</text>
    </svg>`,

    // Card 3: WEDDING CARE on orange tinted image
    wedding: `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E8703A" stop-opacity="0.75"/>
          <stop offset="50%" stop-color="#E8703A" stop-opacity="0.78"/>
          <stop offset="100%" stop-color="#D4622E" stop-opacity="0.82"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#ov)"/>
      <text x="540" y="370" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="400" fill="rgba(255,255,255,0.55)" letter-spacing="5">SKIN FOR YOUR PRECIOUS MOMENT</text>
      <text x="540" y="398" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="400" fill="rgba(255,255,255,0.55)" letter-spacing="5">YOU DESERVE TO SHINE</text>
      <line x1="430" y1="435" x2="650" y2="435" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
      <text x="540" y="600" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="300" fill="#FFFFFF" letter-spacing="6">WEDDING</text>
      <text x="540" y="730" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="300" fill="#FFFFFF" letter-spacing="6">CARE</text>
      <line x1="430" y1="775" x2="650" y2="775" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="540" y="835" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.6)" letter-spacing="3">웨딩케어 | 피부관리 | 바디케어</text>
      <text x="540" y="1060" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="400" fill="rgba(255,255,255,0.35)" letter-spacing="2">세 명의 전문가, 하나의 솔루션</text>
      <text x="540" y="1090" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="400" fill="rgba(255,255,255,0.3)" letter-spacing="4">@im.aesthetic.official</text>
    </svg>`,
  };
  return overlays[type];
}

// Bottom row overlay
function imageOverlay() {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bf" x1="0" y1="0.72" x2="0" y2="1">
        <stop offset="0%" stop-color="#E8703A" stop-opacity="0"/>
        <stop offset="100%" stop-color="#E8703A" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="tf" x1="0" y1="0.15" x2="0" y2="0">
        <stop offset="0%" stop-color="#E8703A" stop-opacity="0"/>
        <stop offset="100%" stop-color="#E8703A" stop-opacity="0.1"/>
      </linearGradient>
      <radialGradient id="vi" cx="50%" cy="50%" r="70%">
        <stop offset="55%" stop-color="transparent"/>
        <stop offset="100%" stop-color="#2C1810" stop-opacity="0.12"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#E8703A" opacity="0.04"/>
    <rect width="${W}" height="${H}" fill="url(#vi)"/>
    <rect width="${W}" height="${H}" fill="url(#bf)"/>
    <rect width="${W}" height="${H}" fill="url(#tf)"/>
    <text x="540" y="1305" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="400" letter-spacing="6" fill="rgba(255,255,255,0.5)">IM AESTHETIC</text>
  </svg>`;
}

async function main() {
  console.log('=== IM AESTHETIC 그리드 (Gemini 일러스트 배경 + 텍스트 오버레이) ===\n');
  if (!fs.existsSync(FEED_DIR)) fs.mkdirSync(FEED_DIR, { recursive: true });

  // ===== TOP ROW: Gemini 배경 이미지 + 브랜드 텍스트 오버레이 =====
  console.log('상단 3칸 (Gemini 배경 + 텍스트 오버레이):\n');

  const topPrompts = [
    // Card 1 background: tiara, wedding dress details, fine line art feel
    `A beautiful artistic flat lay of wedding accessories on cream silk fabric. A delicate crystal tiara, white lace gloves, pearl earrings, and scattered white rose petals. Soft overhead golden warm lighting. Cream ivory and white color palette. Elegant, luxurious, minimal Korean bridal aesthetic. 4:5 portrait orientation. No text. Ultra high quality photorealistic.`,

    // Card 2 background: bouquet, rings, soft romantic
    `A romantic flat lay of bridal items on warm beige linen. White roses bouquet tied with satin ribbon, two gold wedding rings, a pearl necklace, and a small perfume bottle. Soft golden natural light from side. Warm cream beige palette. Elegant minimal Korean wedding aesthetic. 4:5 portrait. No text. Ultra high quality photorealistic.`,

    // Card 3 background: spa treatment elements, wedding prep
    `An elegant arrangement of premium skincare products and bridal accessories. Gold-capped serum ampoules, white jade roller, dried flowers, white candles, on warm wood tray. Soft golden ambient bokeh. Warm orange-cream tones. Luxury Korean aesthetic spa bridal preparation. 4:5 portrait. No text. Ultra high quality photorealistic.`,
  ];

  const overlayTypes = ['logo', 'slogan', 'wedding'];

  for (let i = 0; i < 3; i++) {
    console.log(`  [${i+1}] Gemini 배경 생성 중...`);
    try {
      const bgBuffer = await geminiImage(topPrompts[i]);
      const bgResized = await sharp(bgBuffer).resize(W, H, { fit: 'cover', position: 'centre' }).png().toBuffer();

      // Apply brand text overlay
      const overlaySvg = brandOverlay(overlayTypes[i]);
      const overlayBuf = await svgToPng(overlaySvg);

      const final = await sharp(bgResized)
        .composite([{ input: overlayBuf, blend: 'over' }])
        .png().toBuffer();

      const fn = `grid_c_0${i+1}.png`;
      fs.writeFileSync(path.join(FEED_DIR, fn), final);
      console.log(`  [${i+1}] ${fn} (${(final.length/1024).toFixed(0)}KB)`);

      if (i < 2) await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.error(`  [${i+1}] 에러:`, e.message);
    }
  }

  // ===== BOTTOM ROW: Gemini 감성 이미지 =====
  console.log('\n하단 3칸:\n');
  const bottomPrompts = [
    `Photorealistic close-up of aesthetic therapist's hands gently applying golden serum on Korean woman's glowing shoulder. Warm golden lighting. Cream tones. Premium Korean spa. No face visible. 4:5 portrait. Ultra high quality.`,
    `Photorealistic luxury still life: white roses baby's breath bridal bouquet with gold-capped skincare ampoules on cream marble. Pearl necklace. Warm golden candlelight bokeh. Korean bridal beauty. 4:5 portrait. No text. Ultra high quality.`,
    `Photorealistic back view of Korean woman with luminous dewy skin, bare shoulders, elegant updo with flower, white satin off-shoulder. Warm golden rim light. Cream background. Bridal beauty. No face. 4:5 portrait. Ultra high quality.`,
  ];

  const imgOverlayBuf = await svgToPng(imageOverlay());

  for (let i = 0; i < 3; i++) {
    console.log(`  [${i+4}] Gemini 생성 중...`);
    try {
      const raw = await geminiImage(bottomPrompts[i]);
      const final = await sharp(raw)
        .resize(W, H, { fit: 'cover', position: 'centre' })
        .composite([{ input: imgOverlayBuf, blend: 'over' }])
        .png().toBuffer();

      fs.writeFileSync(path.join(FEED_DIR, `grid_c_0${i+4}.png`), final);
      console.log(`  [${i+4}] grid_c_0${i+4}.png (${(final.length/1024).toFixed(0)}KB)`);
      if (i < 2) await new Promise(r => setTimeout(r, 3000));
    } catch (e) { console.error(`  에러:`, e.message); }
  }

  // Compose
  console.log('\n합성...');
  const comp = [];
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++) {
      const p = path.join(FEED_DIR, `grid_c_0${r*3+c+1}.png`);
      if (fs.existsSync(p)) comp.push({ input: fs.readFileSync(p), left: c*W, top: r*H });
    }

  const full = await sharp({ create: { width: W*3, height: H*2, channels: 4, background: { r:0, g:0, b:0, alpha:0 } } })
    .composite(comp).png().toBuffer();
  fs.writeFileSync(path.join(FEED_DIR, 'grid_c_full.png'), full);

  for (let i = 1; i <= 6; i++) {
    const s = path.join(FEED_DIR, `grid_c_0${i}.png`);
    const d = path.join(FEED_DIR, `grid_0${i}.png`);
    if (fs.existsSync(s)) fs.copyFileSync(s, d);
  }
  console.log('grid_01~06.png 적용!\n=== 완료 ===');
}

main().catch(console.error);
