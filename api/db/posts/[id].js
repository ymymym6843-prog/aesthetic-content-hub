import pool from '../../_db.js';
import { cors } from '../../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  const { id } = req.query;

  // PUT /api/db/posts/:id
  if (req.method === 'PUT') {
    try {
      const updates = { ...req.body };
      if (updates.publish_checklist && typeof updates.publish_checklist === 'object') {
        updates.publish_checklist = JSON.stringify(updates.publish_checklist);
      }
      delete updates.id;
      delete updates.post_images;

      const ALLOWED_COLS = ['week','day','type','title','sub_title','caption','hashtags','image_prompt','status','publish_checklist','content_type','target_audience','key_message','cta'];
      const keys = Object.keys(updates).filter(k => ALLOWED_COLS.includes(k));
      if (keys.length === 0) return res.status(400).json({ error: 'No valid fields to update' });

      const setClause = keys.map(k => `\`${k}\` = ?`).join(', ');
      const values = keys.map(k => updates[k]);

      await pool.query(`UPDATE posts SET ${setClause} WHERE id = ?`, [...values, id]);

      const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
      const result = rows[0];
      if (result && typeof result.publish_checklist === 'string') {
        try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch {}
      }
      const [images] = await pool.query('SELECT * FROM post_images WHERE post_id = ?', [id]);
      result.post_images = images;
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE /api/db/posts/:id
  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM posts WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
