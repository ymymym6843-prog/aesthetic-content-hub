// One-time migration: Supabase → MariaDB
import { createClient } from '@supabase/supabase-js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function migrate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
  });

  console.log('Connected to MariaDB');

  // 1. Clinics
  const { data: clinics } = await supabase.from('clinics').select('*');
  console.log(`Clinics: ${clinics?.length || 0} rows`);
  for (const c of (clinics || [])) {
    await conn.query(
      'INSERT IGNORE INTO clinics (id, name, phone, address) VALUES (?, ?, ?, ?)',
      [c.id, c.name, c.phone, c.address]
    );
  }

  // 2. Directors
  const { data: directors } = await supabase.from('directors').select('*');
  console.log(`Directors: ${directors?.length || 0} rows`);
  for (const d of (directors || [])) {
    await conn.query(
      'INSERT IGNORE INTO directors (id, clinic_id, name, role, specialty, experience_years, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [d.id, d.clinic_id, d.name, d.role, d.specialty, d.experience_years, d.photo_url]
    );
  }

  // 3. Week Strategies
  const { data: strategies } = await supabase.from('week_strategies').select('*');
  console.log(`Week Strategies: ${strategies?.length || 0} rows`);
  for (const s of (strategies || [])) {
    await conn.query(
      'INSERT IGNORE INTO week_strategies (id, clinic_id, week, phase, theme, goal) VALUES (?, ?, ?, ?, ?, ?)',
      [s.id, s.clinic_id, s.week, s.phase, s.theme, s.goal]
    );
  }

  // 4. Posts
  const { data: posts } = await supabase.from('posts').select('*');
  console.log(`Posts: ${posts?.length || 0} rows`);
  for (const p of (posts || [])) {
    const checklist = p.publish_checklist ? JSON.stringify(p.publish_checklist) : null;
    await conn.query(
      `INSERT IGNORE INTO posts (id, clinic_id, week, day, type, title, description, caption, tags, asset, design, ai_guide, slide_count, template_type, status, sort_order, publish_checklist)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.clinic_id, p.week, p.day, p.type, p.title, p.description,
       p.caption, p.tags, p.asset, p.design, p.ai_guide,
       p.slide_count || 0, p.template_type || '', p.status || 'draft',
       p.sort_order || 0, checklist]
    );
  }

  // 5. Post Images
  const { data: images } = await supabase.from('post_images').select('*');
  console.log(`Post Images: ${images?.length || 0} rows`);
  for (const img of (images || [])) {
    await conn.query(
      'INSERT IGNORE INTO post_images (id, post_id, image_url, slide_index, alt_text) VALUES (?, ?, ?, ?, ?)',
      [img.id, img.post_id, img.image_url, img.slide_index || 0, img.alt_text]
    );
  }

  // Verify counts
  for (const table of ['clinics', 'directors', 'week_strategies', 'posts', 'post_images']) {
    const [rows] = await conn.query(`SELECT COUNT(*) as cnt FROM ${table}`);
    console.log(`  MariaDB ${table}: ${rows[0].cnt} rows`);
  }

  await conn.end();
  console.log('Migration complete!');
}

migrate().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
