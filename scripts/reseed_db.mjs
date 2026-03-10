// 원본 posts.js에서 데이터를 읽어서 DB UPDATE SQL을 생성하는 스크립트
import { strategyData } from '../src/data/posts.js';

const CLINIC_ID = '00000000-0000-0000-0000-000000000001';

function esc(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

// 1. week_strategies UPDATE
console.log('-- ===== WEEK STRATEGIES UPDATE =====');
for (const s of strategyData) {
  console.log(`UPDATE week_strategies SET phase = '${esc(s.phase)}', theme = '${esc(s.theme)}', goal = '${esc(s.goal)}' WHERE week = ${s.week} AND clinic_id = '${CLINIC_ID}';`);
}

// 2. posts UPDATE
console.log('\n-- ===== POSTS UPDATE =====');
for (const s of strategyData) {
  for (const p of s.posts) {
    const caption = esc(p.caption || '');
    const desc = esc(p.desc || '');
    const tags = esc(p.tags || '');
    const asset = esc(p.asset || '');
    const design = esc(p.design || '');
    const aiGuide = esc(p.aiGuide || '');
    const type = esc(p.type || '');
    const title = esc(p.title || '');
    const slideCount = p.slideCount || 0;
    const templateType = esc(p.templateType || '');

    console.log(`UPDATE posts SET type = '${type}', title = '${title}', description = '${desc}', caption = '${caption}', tags = '${tags}', asset = '${asset}', design = '${design}', ai_guide = '${aiGuide}', slide_count = ${slideCount}, template_type = '${templateType}' WHERE week = ${s.week} AND day = '${p.day}' AND clinic_id = '${CLINIC_ID}';`);
  }
}
