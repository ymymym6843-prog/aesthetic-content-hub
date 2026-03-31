# Harness Plan — IM AESTHETICS Auto-Diagnose (Post UI/UX Round)
Generated: 2026-03-31T18:00:00+09:00

## Config
- quality: balanced
- focusOverride: none
- maxLoops: 3

## Tasks

### Task 1: [CRITICAL] Hardcoded Supabase anon key in migration script
- agent: general-purpose
- files: scripts/migrate-data.js
- depends: none
- eval: code-review
- focus-dimensions: security
- rubrics: base
- context: |
    scripts/migrate-data.js line 9 contains a hardcoded Supabase anon key (JWT).
    Even though this is a one-time migration script, it is committed to git and
    exposes credentials. The key should be moved to .env vars or the file should
    be added to .gitignore. At minimum, replace the hardcoded value with
    process.env.VITE_SUPABASE_URL and process.env.VITE_SUPABASE_ANON_KEY.

### Task 2: [CRITICAL] SQL injection via dynamic column names in PUT /api/db/posts/:id
- agent: general-purpose
- files: server/routes/db-routes.js, api/db/posts/[id].js
- depends: none
- eval: code-review
- focus-dimensions: security
- rubrics: base
- context: |
    The PUT handler for posts dynamically builds SET clause from request body keys:
      const setClause = keys.map(k => `\`${k}\` = ?`).join(', ');
    While values are parameterized, the column NAMES come directly from user input.
    An attacker can inject arbitrary column names (e.g., keys containing backtick
    escapes). Add a whitelist of allowed column names and reject any key not in it.
    Both server/routes/db-routes.js (line 176) and api/db/posts/[id].js (line 21)
    have this same vulnerability.

### Task 3: [MAJOR] Duplicate express.json() middleware — second call overrides body size limit
- agent: general-purpose
- files: server.js
- depends: none
- eval: code-review
- focus-dimensions: correctness
- rubrics: base
- context: |
    server.js registers express.json() twice:
      Line 20: app.use(express.json());          // default ~100KB limit
      Line 126: app.use(express.json({ limit: '50mb' }));
    The second registration does NOT replace the first — Express runs middleware in
    order, so the first parser consumes the body. The 50mb limit for image generation
    routes is effectively dead. Fix: remove the first call and use the 50mb-limited
    version globally, or apply the large-limit parser only to the specific route.

### Task 4: [MAJOR] N+1 query problem in GET /api/db/posts
- agent: general-purpose
- files: server/routes/db-routes.js, api/db/posts.js
- depends: none
- eval: code-review
- focus-dimensions: performance
- rubrics: base
- context: |
    Both the Express route and the Vercel serverless handler fetch all posts, then
    loop through each post issuing a separate query for post_images:
      for (const post of posts) {
        const [images] = await pool.query('SELECT ... WHERE post_id = ?', [post.id]);
      }
    For N posts this issues N+1 queries. Replace with a single batch query:
      SELECT * FROM post_images WHERE post_id IN (?) ORDER BY post_id, slide_index
    Then group images by post_id in JS. Both files need the same fix.

### Task 5: [MAJOR] Duplicate DB connection pools (server/db.js vs api/_db.js)
- agent: general-purpose
- files: server/db.js, api/_db.js
- depends: none
- eval: code-review
- focus-dimensions: architecture, correctness
- rubrics: base
- context: |
    Two separate MySQL connection pools exist:
    - server/db.js (connectionLimit: 10, used by Express server routes)
    - api/_db.js (connectionLimit: 5, used by Vercel serverless functions)
    In local dev, both are loaded by server.js (via db-routes.js import). This means
    the app opens two pools to the same database with 15 total connections. The
    server/db.js pool also misses the DB_PORT config. Consider unifying into a single
    pool module, or at minimum ensure they are not both active in the same process.

### Task 6: [MAJOR] Hardcoded localhost:3001 URL in instagram-preview.jsx
- agent: general-purpose
- files: src/instagram-preview.jsx
- depends: none
- eval: code-review
- focus-dimensions: correctness, deployment
- rubrics: base, frontend
- context: |
    Line 22 in instagram-preview.jsx uses a hardcoded URL:
      fetch('http://localhost:3001/api/generate', ...)
    This breaks in production (Vercel). It should use a relative URL '/api/generate'
    which Vite dev proxy will handle locally and Vercel will route to serverless
    functions in production.

### Task 7: [MAJOR] Instagram handle inconsistency — underscore vs dot
- agent: general-purpose
- files: src/components/FeedDetailView.jsx
- depends: none
- eval: code-review
- focus-dimensions: consistency, brand
- rubrics: base, frontend
- context: |
    FeedDetailView.jsx uses "im_aesthetic_official" (underscores) in two places
    (lines 27, 75), while the canonical handle defined in CLAUDE.md and used
    everywhere else is "im.aesthetic.official" (dots). Instagram handles use dots,
    not underscores. Fix both occurrences to use the correct dotted format.

### Task 8: [MAJOR] Emoji whitelist violation in MockGeneratorView
- agent: general-purpose
- files: src/components/MockGeneratorView.jsx
- depends: none
- eval: code-review
- focus-dimensions: brand, consistency
- rubrics: base, frontend
- context: |
    MockGeneratorView.jsx line 43 uses the emoji "🤔" which is a face emoji.
    The brand rules explicitly state: "Emoji whitelist: 🤍✨💫🌿💍 (no face emojis)."
    Replace 🤔 with a brand-compliant emoji like 💫 or remove it.

### Task 9: [MAJOR] Duplicate API route definitions (Express + Vercel serverless)
- agent: general-purpose
- files: server/routes/db-routes.js, api/db/posts.js, api/db/strategies.js, api/db/posts/[id].js, api/db/posts/[id]/checklist.js, api/db/posts/[id]/status.js, api/db/post-images.js, api/db/post-images/[id].js, api/db/clinics/[id].js
- depends: none
- eval: code-review
- focus-dimensions: architecture, maintainability
- rubrics: base
- context: |
    Every DB API route is implemented twice:
    1. server/routes/db-routes.js (Express router, used by local dev server)
    2. api/db/*.js (Vercel serverless functions, used in production)
    These are maintained independently and can easily drift out of sync. Any bug
    fix or feature change must be applied to both files. Consider either:
    (a) Extracting shared handler logic into a common module imported by both, or
    (b) Having the Express server import and wrap the Vercel handlers.

### Task 10: [MINOR] src/index-app.js contains broken CSS import
- agent: general-purpose
- files: src/index-app.js
- depends: none
- eval: code-review
- focus-dimensions: correctness
- rubrics: base
- context: |
    src/index-app.js has a single line:
      import 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css';
    JavaScript ES module imports cannot load external CSS URLs. This will fail
    silently or throw an error depending on the bundler. Since Pretendard is loaded
    via <link> tags in all HTML files, this file serves no purpose and should be
    removed, or the import should be converted to a proper CSS import in styles.css.

### Task 11: [MINOR] Inconsistent placeholder image paths
- agent: general-purpose
- files: src/dashboard.jsx, src/instagram-preview.jsx, src/data/posts.js
- depends: none
- eval: code-review
- focus-dimensions: consistency
- rubrics: base, frontend
- context: |
    Placeholder image paths use two different formats:
    - dashboard.jsx line 30: '/feed_images/placeholder.svg' (absolute)
    - instagram-preview.jsx line 88: './feed_images/placeholder.svg' (relative)
    - posts.js: mixed '/feed_images/' and './feed_images/' prefixes
    Using relative paths with React SPA routing can break. Standardize all to
    absolute paths ('/feed_images/...').

### Task 12: [MINOR] ProfileHeader has hardcoded stats (posts: 6, followers: 8)
- agent: general-purpose
- files: src/components/ProfileHeader.jsx
- depends: none
- eval: code-review
- focus-dimensions: correctness
- rubrics: base, frontend
- context: |
    ProfileHeader.jsx line 73 shows hardcoded stats:
      <strong>6</strong> 게시물 / <strong>8</strong> 팔로워
    These never update as content grows. Either accept these as mock/preview values
    (add a comment noting they are intentional mock data) or make them dynamic
    based on the actual post count passed as props.

### Task 13: [MINOR] GridView shows fake engagement numbers
- agent: general-purpose
- files: src/components/GridView.jsx
- depends: none
- eval: code-review
- focus-dimensions: correctness
- rubrics: base, frontend
- context: |
    GridView.jsx lines 80-81 hardcode fake engagement numbers on hover:
      <Heart .../> 124 / <MessageCircle .../> 18
    These are the same for every post, which looks unrealistic. Either randomize
    them per-post for more realistic preview, or remove the numbers and just show
    the icons, or add a comment that these are intentional placeholder values.

### Task 14: [MINOR] nav-shared.js not included in index.html
- agent: general-purpose
- files: index.html, public/nav-shared.js
- depends: none
- eval: code-review
- focus-dimensions: consistency
- rubrics: base, frontend
- context: |
    All 13 sub-pages include nav-shared.js for sidebar navigation, but index.html
    (the hub/home page) does not include it. This means if a user navigates to
    index.html, they lose the sidebar navigation. Since index.html is the hub menu,
    this may be intentional (it has its own nav), but it breaks consistency. Consider
    whether index.html should also have the sidebar for parity, or document why
    it is excluded.
