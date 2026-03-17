// DB 캡션 업데이트 스크립트 - posts.js의 최신 캡션을 Supabase DB에 반영
import { createClient } from '@supabase/supabase-js';
import { strategyData } from '../src/data/posts.js';

const supabaseUrl = 'https://tqbbkxadeqlnwnbqwikk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYmJreGFkZXFsbnduYnF3aWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzY0NDUsImV4cCI6MjA4ODcxMjQ0NX0.3bYLNflnB1kL6IoMPGd-mlYx11SOSX0AJtEMTMEHIpQ';
const CLINIC_ID = '00000000-0000-0000-0000-000000000001';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let updated = 0;
let errors = 0;

for (const s of strategyData) {
  for (const p of s.posts) {
    const { error } = await supabase
      .from('posts')
      .update({
        caption: p.caption || '',
        tags: p.tags || '',
      })
      .eq('week', s.week)
      .eq('day', p.day)
      .eq('clinic_id', CLINIC_ID);

    if (error) {
      console.error(`❌ W${s.week} ${p.day} (${p.title}): ${error.message}`);
      errors++;
    } else {
      console.log(`✅ W${s.week} ${p.day} - ${p.title}`);
      updated++;
    }
  }
}

console.log(`\n완료: ${updated}개 업데이트, ${errors}개 에러`);
