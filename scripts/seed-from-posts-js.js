// Seed MariaDB from src/data/posts.js (the authoritative data source)
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { strategyData, feedPosts } from '../src/data/posts.js';

dotenv.config();

const CID = '00000000-0000-0000-0000-000000000001';

async function seed() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
  });

  console.log('Connected to MariaDB. Clearing existing data...');

  // Clear in reverse FK order
  await conn.query('DELETE FROM post_images');
  await conn.query('DELETE FROM posts');
  await conn.query('DELETE FROM week_strategies');
  await conn.query('DELETE FROM directors');
  await conn.query('DELETE FROM clinics');

  // 1. Clinic
  await conn.query(
    'INSERT INTO clinics (id, name, phone, address) VALUES (?, ?, ?, ?)',
    [CID, 'IM에스테틱', '053-241-3855', '대구 수성구 범어동 마크팰리스 2층']
  );
  console.log('✓ Clinic inserted');

  // 2. Directors
  const directors = [
    { name: '유수정', role: '메디컬 스킨케어 전문가', specialty: '피부 장벽 강화, PDRN/엑소좀', experience_years: 20 },
    { name: '우연우', role: '바른체형 근막 전문가', specialty: '체형 교정, 근막 이완, 윤곽 밸런스', experience_years: 15 },
    { name: '김은경', role: '7감 테라피 디렉터', specialty: '아로마테라피, 웰니스, 감각 힐링', experience_years: 39 },
  ];
  for (const d of directors) {
    await conn.query(
      'INSERT INTO directors (id, clinic_id, name, role, specialty, experience_years, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [crypto.randomUUID(), CID, d.name, d.role, d.specialty, d.experience_years, null]
    );
  }
  console.log('✓ Directors inserted: 3');

  // 3. Week Strategies from strategyData
  const sortOrderMap = { '화': 1, '목': 2, '토': 3 };
  let strategyCount = 0;

  for (const week of strategyData) {
    const wsId = crypto.randomUUID();
    await conn.query(
      'INSERT INTO week_strategies (id, clinic_id, week, phase, theme, goal) VALUES (?, ?, ?, ?, ?, ?)',
      [wsId, CID, week.week, week.phase, week.theme, week.goal]
    );
    strategyCount++;

    // 4. Posts from strategyData (each week has posts array)
    if (week.posts) {
      for (const post of week.posts) {
        const postId = crypto.randomUUID();
        const day = post.day || '';
        const sortOrder = sortOrderMap[day] || 0;
        const checklist = JSON.stringify({
          caption_copied: false,
          image_downloaded: false,
          uploaded_to_instagram: false,
          hashtags_added: false,
          published_at: null,
        });

        await conn.query(
          `INSERT INTO posts (id, clinic_id, week, day, type, title, description, caption, tags, asset, design, ai_guide, slide_count, template_type, status, sort_order, publish_checklist)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            postId, CID, week.week, day,
            post.type || '이미지',
            post.title || '',
            post.desc || post.description || '',
            post.caption || '',
            post.tags || post.hashtags || '',
            post.asset || '',
            post.design || '',
            post.ai_guide || post.aiGuide || '',
            post.slideCount || post.slide_count || 0,
            post.templateType || post.template_type || '',
            post.status || 'draft',
            sortOrder,
            checklist,
          ]
        );

        // Add post image if exists
        if (post.image) {
          await conn.query(
            'INSERT INTO post_images (id, post_id, image_url, slide_index, alt_text) VALUES (?, ?, ?, ?, ?)',
            [crypto.randomUUID(), postId, post.image, 0, post.title || '']
          );
        }
      }
    }
  }
  console.log('✓ Week strategies inserted:', strategyCount);

  // 5. Also insert feedPosts (may overlap or be additional)
  let feedCount = 0;
  for (const post of feedPosts) {
    // Check if a post for this week+day already exists
    const [existing] = await conn.query(
      'SELECT id FROM posts WHERE clinic_id = ? AND week = ? AND day = ?',
      [CID, post.week, post.day]
    );

    if (existing.length > 0) {
      // Update existing post with feedPosts data (richer content)
      const postId = existing[0].id;
      await conn.query(
        `UPDATE posts SET
          type = COALESCE(NULLIF(?, ''), type),
          title = COALESCE(NULLIF(?, ''), title),
          caption = COALESCE(NULLIF(?, ''), caption),
          tags = COALESCE(NULLIF(?, ''), tags),
          slide_count = CASE WHEN ? > 0 THEN ? ELSE slide_count END,
          template_type = COALESCE(NULLIF(?, ''), template_type)
        WHERE id = ?`,
        [
          post.type || '', post.title || '',
          post.caption || '', post.hashtags || post.tags || '',
          post.slideCount || 0, post.slideCount || 0,
          post.templateType || '',
          postId,
        ]
      );

      // Update image if feedPost has one
      if (post.image) {
        const [existingImg] = await conn.query(
          'SELECT id FROM post_images WHERE post_id = ? AND slide_index = 0',
          [postId]
        );
        if (existingImg.length > 0) {
          await conn.query(
            'UPDATE post_images SET image_url = ? WHERE id = ?',
            [post.image, existingImg[0].id]
          );
        } else {
          await conn.query(
            'INSERT INTO post_images (id, post_id, image_url, slide_index, alt_text) VALUES (?, ?, ?, ?, ?)',
            [crypto.randomUUID(), postId, post.image, 0, post.title || '']
          );
        }
      }
      feedCount++;
    } else {
      // Insert new post from feedPosts
      const postId = crypto.randomUUID();
      const sortOrder = sortOrderMap[post.day] || 0;
      const checklist = JSON.stringify({
        caption_copied: false, image_downloaded: false,
        uploaded_to_instagram: false, hashtags_added: false, published_at: null,
      });

      await conn.query(
        `INSERT INTO posts (id, clinic_id, week, day, type, title, description, caption, tags, asset, design, ai_guide, slide_count, template_type, status, sort_order, publish_checklist)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          postId, CID, post.week, post.day,
          post.type || '이미지', post.title || '', '',
          post.caption || '', post.hashtags || post.tags || '',
          '', '', '',
          post.slideCount || 0, post.templateType || '',
          'draft', sortOrder, checklist,
        ]
      );

      if (post.image) {
        await conn.query(
          'INSERT INTO post_images (id, post_id, image_url, slide_index, alt_text) VALUES (?, ?, ?, ?, ?)',
          [crypto.randomUUID(), postId, post.image, 0, post.title || '']
        );
      }
      feedCount++;
    }
  }
  console.log('✓ FeedPosts merged:', feedCount);

  // Verify
  for (const table of ['clinics', 'directors', 'week_strategies', 'posts', 'post_images']) {
    const [rows] = await conn.query(`SELECT COUNT(*) as cnt FROM ${table}`);
    console.log(`  ${table}: ${rows[0].cnt} rows`);
  }

  await conn.end();
  console.log('\n✅ Seeding complete!');
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});
