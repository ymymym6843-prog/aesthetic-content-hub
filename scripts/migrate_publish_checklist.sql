-- Phase 3: 발행 체크리스트 컬럼 추가
-- Supabase SQL Editor에서 실행하세요

ALTER TABLE posts ADD COLUMN IF NOT EXISTS publish_checklist JSONB DEFAULT '{
  "caption_copied": false,
  "image_downloaded": false,
  "uploaded_to_instagram": false,
  "hashtags_added": false,
  "published_at": null
}'::jsonb;

-- 기존 포스트에 기본값 적용
UPDATE posts SET publish_checklist = '{
  "caption_copied": false,
  "image_downloaded": false,
  "uploaded_to_instagram": false,
  "hashtags_added": false,
  "published_at": null
}'::jsonb WHERE publish_checklist IS NULL;
