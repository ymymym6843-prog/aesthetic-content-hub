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
const FEED = path.join(__dirname, '..', 'public', 'feed_images');
const W = 1080, H = 1350;

async function gen(prompt) {
  const r = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseModalities: ['IMAGE', 'TEXT'] },
  });
  const parts = r.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  if (!img) throw new Error('No image');
  return Buffer.from(img.inlineData.data, 'base64');
}

async function svgToPng(svg) { return sharp(Buffer.from(svg)).png().toBuffer(); }

// Gemini backgrounds: real wedding accessories flat lay photos
const bgPrompts = [
  `Photorealistic overhead flat lay of luxury bridal accessories on cream silk fabric. A sparkling crystal tiara crown, delicate white lace veil corner, pearl drop earrings, scattered white and blush rose petals, thin gold chain bracelet. Everything arranged artfully with space in center. Warm golden soft overhead lighting. Cream ivory white palette. Luxury Korean bridal preparation aesthetic. 4:5 portrait. No text. Ultra high quality.`,

  `Photorealistic romantic flat lay on warm beige linen. Lush white roses tied with ivory satin ribbon, two interlinked gold wedding bands, a strand of pearls, a small vintage perfume bottle, handwritten love letter corner visible, dried baby breath sprigs. Warm golden natural side light. Soft romantic Korean wedding mood. 4:5 portrait. No text. Ultra high quality.`,

  `Photorealistic luxury spa vanity arrangement for bridal care. Premium gold-capped glass serum ampoules, white jade gua sha stone, lit ivory pillar candles, fresh white orchid stem, small crystal bowl with rose water, eucalyptus sprigs, on warm teak wood tray. Warm golden ambient light with soft bokeh. Orange cream warm tones. Korean luxury aesthetic. 4:5 portrait. No text. Ultra high quality.`,
];

// Text overlays
const overlaysSvg = [
  // Card 1: IM AESTHETIC large logo (orange tint overlay)
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E8703A" stop-opacity="0.78"/>
        <stop offset="100%" stop-color="#D4622E" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#ov)"/>
    <text x="540" y="700" text-anchor="middle" font-family="Georgia,serif" font-size="340" font-weight="300" fill="#FFFFFF" letter-spacing="25">IM</text>
    <line x1="310" y1="770" x2="770" y2="770" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
    <text x="540" y="830" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="400" fill="rgba(255,255,255,0.9)" letter-spacing="22">AESTHETIC</text>
    <text x="540" y="1120" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.4)" letter-spacing="3">\uB300\uAD6C \uC218\uC131\uAD6C \uBC94\uC5B4\uB3D9 \uB9C8\uD06C\uD384\uB9AC\uC2A4</text>
  </svg>`,

  // Card 2: Slogan (beige tint overlay)
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFF8F0" stop-opacity="0.82"/>
        <stop offset="100%" stop-color="#FAF0E4" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#ov)"/>
    <text x="540" y="340" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="400" fill="#E8703A" letter-spacing="10" opacity="0.5">IM AESTHETIC</text>
    <line x1="460" y1="362" x2="620" y2="362" stroke="#E8703A" stroke-width="0.8" opacity="0.25"/>
    <text x="540" y="540" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">\uB2F9\uC2E0\uC758</text>
    <text x="540" y="640" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">\uAC00\uC7A5 \uBE5B\uB098\uB294</text>
    <text x="540" y="740" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">\uB0A0\uC744</text>
    <text x="540" y="840" text-anchor="middle" font-family="sans-serif" font-size="76" font-weight="700" fill="#E8703A">\uC900\uBE44\uD569\uB2C8\uB2E4</text>
    <line x1="480" y1="900" x2="600" y2="900" stroke="#E8703A" stroke-width="1" opacity="0.3"/>
    <text x="540" y="960" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="400" fill="#E8703A" letter-spacing="3" opacity="0.5">WEDDING CARE SPECIALIST</text>
  </svg>`,

  // Card 3: WEDDING CARE (orange tint overlay)
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E8703A" stop-opacity="0.76"/>
        <stop offset="100%" stop-color="#D4622E" stop-opacity="0.83"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#ov)"/>
    <text x="540" y="370" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="400" fill="rgba(255,255,255,0.55)" letter-spacing="5">SKIN FOR YOUR PRECIOUS MOMENT</text>
    <text x="540" y="398" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="400" fill="rgba(255,255,255,0.55)" letter-spacing="5">YOU DESERVE TO SHINE</text>
    <line x1="430" y1="435" x2="650" y2="435" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <text x="540" y="600" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="300" fill="#FFFFFF" letter-spacing="6">WEDDING</text>
    <text x="540" y="730" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="300" fill="#FFFFFF" letter-spacing="6">CARE</text>
    <line x1="430" y1="775" x2="650" y2="775" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="540" y="835" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.6)" letter-spacing="3">\uC6E8\uB529\uCF00\uC5B4 | \uD53C\uBD80\uAD00\uB9AC | \uBC14\uB514\uCF00\uC5B4</text>
    <text x="540" y="1060" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="400" fill="rgba(255,255,255,0.35)" letter-spacing="2">\uC138 \uBA85\uC758 \uC804\uBB38\uAC00, \uD558\uB098\uC758 \uC194\uB8E8\uC158</text>
    <text x="540" y="1090" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="400" fill="rgba(255,255,255,0.3)" letter-spacing="4">@im.aesthetic.official</text>
  </svg>`,
];

async function main() {
  console.log('=== 상단 3칸: Gemini 배경 + 텍스트 오버레이 ===\n');

  for (let i = 0; i < 3; i++) {
    console.log(`[${i+1}/3] Gemini 배경 생성 중...`);
    try {
      const bgRaw = await gen(bgPrompts[i]);
      const bgResized = await sharp(bgRaw).resize(W, H, { fit: 'cover', position: 'centre' }).png().toBuffer();
      const overlayBuf = await svgToPng(overlaysSvg[i]);

      const final = await sharp(bgResized)
        .composite([{ input: overlayBuf, blend: 'over' }])
        .png().toBuffer();

      const fn = `grid_c_0${i+1}.png`;
      fs.writeFileSync(path.join(FEED, fn), final);
      fs.copyFileSync(path.join(FEED, fn), path.join(FEED, `grid_0${i+1}.png`));
      console.log(`[${i+1}/3] ${fn} (${(final.length/1024).toFixed(0)}KB)`);
      if (i < 2) await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.error(`[${i+1}] 에러:`, e.message);
    }
  }

  // Recompose full
  console.log('\n전체 합성...');
  const comp = [];
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++) {
      const p = path.join(FEED, `grid_c_0${r*3+c+1}.png`);
      if (fs.existsSync(p)) comp.push({ input: fs.readFileSync(p), left: c*W, top: r*H });
    }
  const full = await sharp({ create: { width: W*3, height: H*2, channels: 4, background: {r:0,g:0,b:0,alpha:0} } })
    .composite(comp).png().toBuffer();
  fs.writeFileSync(path.join(FEED, 'grid_c_full.png'), full);
  console.log('완료!');
}

main().catch(console.error);
