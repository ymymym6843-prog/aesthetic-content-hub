import crypto from 'crypto';
import pool from '../_db.js';
import { cors } from '../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  // POST /api/db/post-images
  if (req.method === 'POST') {
    try {
      const { post_id, image_url, slide_index, alt_text } = req.body;
      const id = crypto.randomUUID();
      await pool.query(
        'INSERT INTO post_images (id, post_id, image_url, slide_index, alt_text) VALUES (?, ?, ?, ?, ?)',
        [id, post_id, image_url, slide_index || 0, alt_text || null]
      );
      const [rows] = await pool.query('SELECT * FROM post_images WHERE id = ?', [id]);
      return res.status(200).json(rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
