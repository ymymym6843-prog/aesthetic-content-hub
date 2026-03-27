import crypto from 'crypto';
import pool from '../_db.js';
import { cors } from '../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  // GET /api/db/strategies?clinic_id=X
  if (req.method === 'GET') {
    try {
      const { clinic_id } = req.query;
      const [rows] = await pool.query(
        'SELECT * FROM week_strategies WHERE clinic_id = ? ORDER BY week',
        [clinic_id]
      );
      return res.status(200).json(rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/db/strategies
  if (req.method === 'POST') {
    try {
      const s = req.body;
      const id = s.id || crypto.randomUUID();
      await pool.query(
        'INSERT INTO week_strategies (id, clinic_id, week, phase, theme, goal) VALUES (?, ?, ?, ?, ?, ?)',
        [id, s.clinic_id, s.week, s.phase, s.theme, s.goal]
      );
      const [rows] = await pool.query('SELECT * FROM week_strategies WHERE id = ?', [id]);
      return res.status(200).json(rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
