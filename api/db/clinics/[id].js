import pool from '../../_db.js';
import { cors } from '../../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { id } = req.query;
    const [clinics] = await pool.query('SELECT * FROM clinics WHERE id = ?', [id]);
    if (clinics.length === 0) return res.status(404).json({ error: 'Clinic not found' });

    const clinic = clinics[0];
    const [directors] = await pool.query(
      'SELECT id, name, role, specialty, experience_years, photo_url FROM directors WHERE clinic_id = ?',
      [clinic.id]
    );
    clinic.directors = directors;
    return res.status(200).json(clinic);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
