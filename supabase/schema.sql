-- Chạy script này trong Supabase Dashboard → SQL Editor → New query → Run
--
-- Nếu đã tạo bảng cũ với id kiểu TEXT, xóa bảng cũ trước:
-- DROP TABLE IF EXISTS "Post";

-- Bảng lưu bài blog
CREATE TABLE IF NOT EXISTS "Post" (
  "id"          SERIAL PRIMARY KEY,
  "title"       TEXT NOT NULL,
  "slug"        TEXT NOT NULL,
  "summary"     TEXT NOT NULL,
  "content"     TEXT NOT NULL,
  "image"       TEXT,
  "tags"        TEXT[] NOT NULL DEFAULT '{}',
  "published"   BOOLEAN NOT NULL DEFAULT true,
  "publishedAt" TIMESTAMP(3) NOT NULL,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Post_slug_key" UNIQUE ("slug")
);

CREATE INDEX IF NOT EXISTS "Post_slug_idx" ON "Post" ("slug");
CREATE INDEX IF NOT EXISTS "Post_publishedAt_idx" ON "Post" ("publishedAt");

-- Tự động cập nhật updatedAt khi sửa bài
CREATE OR REPLACE FUNCTION update_post_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS post_updated_at ON "Post";
CREATE TRIGGER post_updated_at
  BEFORE UPDATE ON "Post"
  FOR EACH ROW
  EXECUTE FUNCTION update_post_updated_at();

-- (Tuỳ chọn) Thêm bài mẫu để test — id tự tăng, không cần nhập
INSERT INTO "Post" (
  "title",
  "slug",
  "summary",
  "content",
  "tags",
  "publishedAt"
) VALUES (
  'Bài viết mẫu',
  'bai-viet-mau',
  'Đây là bài viết mẫu để kiểm tra kết nối Supabase.',
  '<p>Nội dung HTML của bài viết. Bạn có thể thêm bài mới trực tiếp trên Supabase Table Editor.</p>',
  ARRAY['blog', 'supabase'],
  NOW()
) ON CONFLICT ("slug") DO NOTHING;
