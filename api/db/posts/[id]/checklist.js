import pool from '../../../_db.js';
import { cors } from '../../../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { id } = req.query;
    const checklist = JSON.stringify(req.body.checklist);
    await pool.query('UPDATE posts SET publish_checklist = ? WHERE id = ?', [checklist, id]);

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    const result = rows[0];
    if (typeof result.publish_checklist === 'string') {
      try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch {}
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
