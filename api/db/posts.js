// SYNC NOTE: This Vercel handler mirrors server/routes/db-routes.js (Express).
// Changes here MUST be applied to the corresponding Express route and vice versa.
import crypto from 'crypto';
import pool from '../_db.js';
import { cors } from '../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  // GET /api/db/posts?clinic_id=X
  if (req.method === 'GET') {
    try {
      const { clinic_id } = req.query;
      const [posts] = await pool.query(
        'SELECT * FROM posts WHERE clinic_id = ? ORDER BY week, sort_order',
        [clinic_id]
      );
      const postIds = posts.map(p => p.id);
      let imageMap = {};
      if (postIds.length > 0) {
        const [allImages] = await pool.query(
          'SELECT id, post_id, image_url, slide_index, alt_text FROM post_images WHERE post_id IN (?) ORDER BY post_id, slide_index',
          [postIds]
        );
        for (const img of allImages) {
          if (!imageMap[img.post_id]) imageMap[img.post_id] = [];
          imageMap[img.post_id].push(img);
        }
      }
      for (const post of posts) {
        post.post_images = imageMap[post.id] || [];
        if (typeof post.publish_checklist === 'string') {
          try { post.publish_checklist = JSON.parse(post.publish_checklist); } catch {}
        }
      }
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/db/posts
  if (req.method === 'POST') {
    try {
      const post = req.body;
      const id = post.id || crypto.randomUUID();
      const checklist = post.publish_checklist ? JSON.stringify(post.publish_checklist) : null;

      await pool.query(
        `INSERT INTO posts (id, clinic_id, week, day, type, title, description, caption, tags, asset, design, ai_guide, slide_count, template_type, status, sort_order, publish_checklist)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, post.clinic_id, post.week, post.day, post.type, post.title, post.description,
         post.caption, post.tags, post.asset, post.design, post.ai_guide,
         post.slide_count || 0, post.template_type || '', post.status || 'draft',
         post.sort_order || 0, checklist]
      );

      const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
      const result = rows[0];
      if (typeof result.publish_checklist === 'string') {
        try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch {}
      }
      result.post_images = [];
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
