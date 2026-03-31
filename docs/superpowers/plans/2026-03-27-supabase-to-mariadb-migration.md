# Supabase → MariaDB Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all database operations from Supabase (PostgreSQL + Supabase JS SDK) to MariaDB with Express REST API.

**Architecture:** Replace direct browser→Supabase SDK calls with browser→Express API→MariaDB. The existing `server.js` (port 3001) gets new `/api/db/*` routes. Frontend `src/lib/supabase.js` is replaced with `src/lib/db.js` that calls Express API via fetch. Image uploads switch from Supabase Storage to local filesystem (`public/uploads/`).

**Tech Stack:** MariaDB, mysql2, Express.js, Vite (proxy), React 18

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/lib/db.js` | Frontend API client (replaces supabase.js) |
| Create | `server/db.js` | MariaDB connection pool |
| Create | `server/routes/db-routes.js` | REST API routes for all CRUD |
| Create | `scripts/mariadb-schema.sql` | MariaDB schema creation DDL |
| Create | `scripts/migrate-data.js` | One-time data migration script |
| Modify | `server.js` | Import and mount db-routes |
| Modify | `src/lib/supabase.js` | Replace with re-export from db.js |
| Modify | `vite.config.js` | Add proxy for /api to port 3001 |
| Modify | `.env` | Add MariaDB credentials |
| Modify | `package.json` | mysql2 already added |

---

## Task 1: MariaDB Schema Creation

**Files:**
- Create: `scripts/mariadb-schema.sql`

- [ ] **Step 1: Write MariaDB DDL**

```sql
-- UUID, JSON, CASCADE equivalent for Supabase schema
CREATE TABLE IF NOT EXISTS clinics (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT
);

CREATE TABLE IF NOT EXISTS directors (
  id CHAR(36) PRIMARY KEY,
  clinic_id CHAR(36) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(100),
  specialty VARCHAR(255),
  experience_years INT DEFAULT 0,
  photo_url TEXT,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS week_strategies (
  id CHAR(36) PRIMARY KEY,
  clinic_id CHAR(36) NOT NULL,
  week INT NOT NULL,
  phase VARCHAR(255),
  theme VARCHAR(255),
  goal TEXT,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
  id CHAR(36) PRIMARY KEY,
  clinic_id CHAR(36) NOT NULL,
  week INT,
  day VARCHAR(10),
  type VARCHAR(50),
  title VARCHAR(255),
  description TEXT,
  caption TEXT,
  tags TEXT,
  asset TEXT,
  design TEXT,
  ai_guide TEXT,
  slide_count INT DEFAULT 0,
  template_type VARCHAR(100) DEFAULT '',
  status VARCHAR(20) DEFAULT 'draft',
  sort_order INT DEFAULT 0,
  publish_checklist JSON DEFAULT NULL,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_images (
  id CHAR(36) PRIMARY KEY,
  post_id CHAR(36) NOT NULL,
  image_url TEXT,
  slide_index INT DEFAULT 0,
  alt_text TEXT,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
```

- [ ] **Step 2: Execute schema on MariaDB**

Run: `node -e "require('mysql2/promise').createConnection({...}).then(c => c.query(fs.readFileSync('scripts/mariadb-schema.sql','utf8')))"`

- [ ] **Step 3: Verify tables created**

Run: `SHOW TABLES` → expect 5 tables

---

## Task 2: MariaDB Connection Pool

**Files:**
- Create: `server/db.js`
- Modify: `.env`

- [ ] **Step 1: Add credentials to .env**

Append to `.env`:
```
DB_HOST=118.45.181.229
DB_USER=root
DB_PASSWORD=Qusrud8545!!@@
DB_NAME=im-insta-yumin
```

- [ ] **Step 2: Create connection pool module**

`server/db.js`:
```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

export default pool;
```

- [ ] **Step 3: Test pool connection**

Run: `node -e "import('./server/db.js').then(m => m.default.query('SELECT 1')).then(r => console.log('OK'))"`

---

## Task 3: REST API Routes

**Files:**
- Create: `server/routes/db-routes.js`

- [ ] **Step 1: Implement all CRUD routes**

Map supabase.js functions → Express routes:
| Function | Method | Route |
|----------|--------|-------|
| fetchPosts | GET | /api/db/posts?clinic_id=X |
| fetchWeekStrategies | GET | /api/db/strategies?clinic_id=X |
| fetchClinic | GET | /api/db/clinics/:id |
| createPost | POST | /api/db/posts |
| updatePost | PUT | /api/db/posts/:id |
| deletePost | DELETE | /api/db/posts/:id |
| addPostImage | POST | /api/db/post-images |
| deletePostImage | DELETE | /api/db/post-images/:id |
| createWeekStrategy | POST | /api/db/strategies |
| updatePublishChecklist | PUT | /api/db/posts/:id/checklist |
| updatePostStatus | PUT | /api/db/posts/:id/status |
| uploadImage | POST | /api/db/upload |

- [ ] **Step 2: UUID generation**

Use `crypto.randomUUID()` for new record IDs (Node 19+).

- [ ] **Step 3: Image upload handling**

Use multer for file upload → save to `public/uploads/{clinic_id}/` → return URL path.

---

## Task 4: Mount Routes in server.js

**Files:**
- Modify: `server.js`

- [ ] **Step 1: Import and use db-routes**

Add after existing routes:
```javascript
import dbRoutes from './server/routes/db-routes.js';
app.use(dbRoutes);
```

- [ ] **Step 2: Add static file serving for uploads**

```javascript
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
```

---

## Task 5: Frontend API Client

**Files:**
- Create: `src/lib/db.js`
- Modify: `src/lib/supabase.js`

- [ ] **Step 1: Create db.js with all API functions**

Mirror exact same function signatures as supabase.js, but using fetch() to call Express API.

- [ ] **Step 2: Replace supabase.js exports**

Change supabase.js to re-export from db.js:
```javascript
export { fetchPosts, fetchWeekStrategies, fetchClinic, ... } from './db.js';
export { DEFAULT_CLINIC_ID } from './db.js';
```

This avoids changing any import statements in dashboard.jsx or instagram-preview.jsx.

---

## Task 6: Vite Proxy Configuration

**Files:**
- Modify: `vite.config.js`

- [ ] **Step 1: Add API proxy**

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:3001'
  }
}
```

This lets the frontend call `/api/db/...` without CORS issues during dev.

---

## Task 7: Data Migration

**Files:**
- Create: `scripts/migrate-data.js`

- [ ] **Step 1: Write migration script**

Connect to Supabase via SDK → fetch all data → insert into MariaDB.
Tables in order: clinics → directors → week_strategies → posts → post_images.

- [ ] **Step 2: Run migration**

Run: `node scripts/migrate-data.js`

- [ ] **Step 3: Verify data counts match**

Compare row counts between Supabase and MariaDB for all 5 tables.

---

## Task 8: Integration Test & Cleanup

- [ ] **Step 1: Start server.js and dev server**
- [ ] **Step 2: Test dashboard loads data from MariaDB**
- [ ] **Step 3: Test create/update/delete post**
- [ ] **Step 4: Test image upload**
- [ ] **Step 5: Test instagram preview loads**
- [ ] **Step 6: Build verification** (`npm run build`)
- [ ] **Step 7: Commit all changes**
