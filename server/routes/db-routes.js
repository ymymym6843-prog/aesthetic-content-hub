import { Router } from 'express';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

const router = Router();

// ── Multer config for image uploads ──
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = path.join(projectRoot, 'public/uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── Helper: generate UUID ──
const uuid = () => crypto.randomUUID();

// ═══════════════════════════════════════
// READ
// ═══════════════════════════════════════

// GET /api/db/posts?clinic_id=X
router.get('/api/db/posts', async (req, res) => {
  try {
    const { clinic_id } = req.query;
    const [posts] = await pool.query(
      'SELECT * FROM posts WHERE clinic_id = ? ORDER BY week, sort_order',
      [clinic_id]
    );
    // Attach post_images to each post
    for (const post of posts) {
      const [images] = await pool.query(
        'SELECT id, image_url, slide_index, alt_text FROM post_images WHERE post_id = ? ORDER BY slide_index',
        [post.id]
      );
      post.post_images = images;
      // Parse JSON field
      if (typeof post.publish_checklist === 'string') {
        try { post.publish_checklist = JSON.parse(post.publish_checklist); } catch { /* keep as-is */ }
      }
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/db/strategies?clinic_id=X
router.get('/api/db/strategies', async (req, res) => {
  try {
    const { clinic_id } = req.query;
    const [rows] = await pool.query(
      'SELECT * FROM week_strategies WHERE clinic_id = ? ORDER BY week',
      [clinic_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/db/clinics/:id
router.get('/api/db/clinics/:id', async (req, res) => {
  try {
    const [clinics] = await pool.query('SELECT * FROM clinics WHERE id = ?', [req.params.id]);
    if (clinics.length === 0) return res.status(404).json({ error: 'Clinic not found' });

    const clinic = clinics[0];
    const [directors] = await pool.query(
      'SELECT id, name, role, specialty, experience_years, photo_url FROM directors WHERE clinic_id = ?',
      [clinic.id]
    );
    clinic.directors = directors;
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════
// CREATE
// ═══════════════════════════════════════

// POST /api/db/posts
router.post('/api/db/posts', async (req, res) => {
  try {
    const post = req.body;
    const id = post.id || uuid();
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
      try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch { /* */ }
    }
    result.post_images = [];
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/db/post-images
router.post('/api/db/post-images', async (req, res) => {
  try {
    const { post_id, image_url, slide_index, alt_text } = req.body;
    const id = uuid();
    await pool.query(
      'INSERT INTO post_images (id, post_id, image_url, slide_index, alt_text) VALUES (?, ?, ?, ?, ?)',
      [id, post_id, image_url, slide_index || 0, alt_text || null]
    );
    const [rows] = await pool.query('SELECT * FROM post_images WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/db/strategies
router.post('/api/db/strategies', async (req, res) => {
  try {
    const s = req.body;
    const id = s.id || uuid();
    await pool.query(
      'INSERT INTO week_strategies (id, clinic_id, week, phase, theme, goal) VALUES (?, ?, ?, ?, ?, ?)',
      [id, s.clinic_id, s.week, s.phase, s.theme, s.goal]
    );
    const [rows] = await pool.query('SELECT * FROM week_strategies WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════
// UPDATE
// ═══════════════════════════════════════

// PUT /api/db/posts/:id
router.put('/api/db/posts/:id', async (req, res) => {
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

    await pool.query(`UPDATE posts SET ${setClause} WHERE id = ?`, [...values, req.params.id]);

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    const result = rows[0];
    if (result && typeof result.publish_checklist === 'string') {
      try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch { /* */ }
    }
    // Attach images
    const [images] = await pool.query('SELECT * FROM post_images WHERE post_id = ?', [req.params.id]);
    result.post_images = images;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/db/posts/:id/checklist
router.put('/api/db/posts/:id/checklist', async (req, res) => {
  try {
    const checklist = JSON.stringify(req.body.checklist);
    await pool.query('UPDATE posts SET publish_checklist = ? WHERE id = ?', [checklist, req.params.id]);

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    const result = rows[0];
    if (typeof result.publish_checklist === 'string') {
      try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch { /* */ }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/db/posts/:id/status
router.put('/api/db/posts/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE posts SET status = ? WHERE id = ?', [status, req.params.id]);

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    const result = rows[0];
    if (typeof result.publish_checklist === 'string') {
      try { result.publish_checklist = JSON.parse(result.publish_checklist); } catch { /* */ }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════
// DELETE
// ═══════════════════════════════════════

// DELETE /api/db/posts/:id
router.delete('/api/db/posts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/db/post-images/:id
router.delete('/api/db/post-images/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM post_images WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════
// FILE UPLOAD
// ═══════════════════════════════════════

// POST /api/db/upload
router.post('/api/db/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const publicUrl = `/uploads/${req.file.filename}`;
    res.json({ publicUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
