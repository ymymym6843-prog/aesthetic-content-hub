-- IM AESTHETIC MariaDB Schema
-- Migrated from Supabase PostgreSQL

CREATE TABLE IF NOT EXISTS clinics (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS directors (
  id CHAR(36) PRIMARY KEY,
  clinic_id CHAR(36) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(100),
  specialty VARCHAR(255),
  experience_years INT DEFAULT 0,
  photo_url TEXT,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS week_strategies (
  id CHAR(36) PRIMARY KEY,
  clinic_id CHAR(36) NOT NULL,
  week INT NOT NULL,
  phase VARCHAR(255),
  theme VARCHAR(255),
  goal TEXT,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS post_images (
  id CHAR(36) PRIMARY KEY,
  post_id CHAR(36) NOT NULL,
  image_url TEXT,
  slide_index INT DEFAULT 0,
  alt_text TEXT,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS maker_sessions (
  id CHAR(36) PRIMARY KEY,
  clinic_id CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  tool VARCHAR(50) NOT NULL,
  session_name VARCHAR(255),
  work_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
