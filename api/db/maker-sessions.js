// SYNC NOTE: This Vercel handler mirrors server/routes/db-routes.js (Express).
// Changes here MUST be applied to the corresponding Express route and vice versa.
import crypto from 'crypto';
import pool from '../_db.js';
import { cors } from '../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  // GET /api/db/maker-sessions?tool=X or /api/db/maker-sessions?id=X
  if (req.method === 'GET') {
    try {
      const { tool, id } = req.query;
      if (id) {
        const [rows] = await pool.query('SELECT * FROM maker_sessions WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Session not found' });
        const result = rows[0];
        if (typeof result.work_data === 'string') {
          try { result.work_data = JSON.parse(result.work_data); } catch {}
        }
        return res.status(200).json(result);
      }
      const [rows] = await pool.query(
        'SELECT id, tool, session_name, created_at, updated_at FROM maker_sessions WHERE tool = ? ORDER BY updated_at DESC',
        [tool]
      );
      return res.status(200).json(rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST
  if (req.method === 'POST') {
    try {
      const { tool, session_name, work_data } = req.body;
      const id = req.body.id || crypto.randomUUID();
      const data = typeof work_data === 'object' ? JSON.stringify(work_data) : work_data;
      await pool.query(
        'INSERT INTO maker_sessions (id, tool, session_name, work_data) VALUES (?, ?, ?, ?)',
        [id, tool, session_name || null, data]
      );
      const [rows] = await pool.query('SELECT * FROM maker_sessions WHERE id = ?', [id]);
      const result = rows[0];
      if (typeof result.work_data === 'string') {
        try { result.work_data = JSON.parse(result.work_data); } catch {}
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // PUT
  if (req.method === 'PUT') {
    try {
      const { id, session_name, work_data } = req.body;
      const updates = [];
      const values = [];
      if (session_name !== undefined) { updates.push('session_name = ?'); values.push(session_name); }
      if (work_data !== undefined) {
        updates.push('work_data = ?');
        values.push(typeof work_data === 'object' ? JSON.stringify(work_data) : work_data);
      }
      if (updates.length === 0) return res.status(400).json({ error: 'No fields' });
      values.push(id);
      await pool.query(`UPDATE maker_sessions SET ${updates.join(', ')} WHERE id = ?`, values);
      const [rows] = await pool.query('SELECT * FROM maker_sessions WHERE id = ?', [id]);
      const result = rows[0];
      if (typeof result.work_data === 'string') {
        try { result.work_data = JSON.parse(result.work_data); } catch {}
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      await pool.query('DELETE FROM maker_sessions WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
