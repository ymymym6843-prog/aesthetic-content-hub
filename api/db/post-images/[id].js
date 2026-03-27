import pool from '../../_db.js';
import { cors } from '../../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  // DELETE /api/db/post-images/:id
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await pool.query('DELETE FROM post_images WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
