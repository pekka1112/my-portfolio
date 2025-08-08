# Database Setup Guide

## 1. Cài đặt PostgreSQL

### Windows
1. Tải PostgreSQL từ: https://www.postgresql.org/download/windows/
2. Cài đặt với default settings
3. Ghi nhớ password cho user `postgres`

### macOS
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 2. Tạo Database

```bash
# Kết nối vào PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE portfolio_db;

# Thoát
\q
```

## 3. Cấu hình Environment Variables

Tạo file `.env` trong root directory:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/portfolio_db?schema=public"
```

Thay `your_password` bằng password PostgreSQL của bạn.

## 4. Setup Database Schema

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Hoặc tạo migration (recommended cho production)
npm run db:migrate
```

## 5. Migrate Content từ MDX files

```bash
# Chạy script migrate
npm run migrate:content
```

Script này sẽ:
- Tạo các categories mặc định (Tutorials, Thoughts, Projects)
- Tạo các tags mặc định (Docker, Next.js, React, etc.)
- Import tất cả MDX files từ thư mục `content/` vào database

## 6. Verify Setup

1. Chạy development server:
```bash
npm run dev
```

2. Truy cập admin dashboard:
```
http://localhost:3000/admin
```

3. Kiểm tra blog posts:
```
http://localhost:3000/blog
```

## 7. Database Management

### Xem database với Prisma Studio
```bash
npm run db:studio
```

### Tạo migration mới
```bash
npm run db:migrate
```

### Reset database (cẩn thận!)
```bash
npx prisma migrate reset
```

## 8. API Endpoints

### Posts
- `GET /api/posts` - Lấy tất cả posts
- `POST /api/posts` - Tạo post mới
- `GET /api/posts/[slug]` - Lấy post theo slug
- `PUT /api/posts/[slug]` - Cập nhật post
- `DELETE /api/posts/[slug]` - Xóa post

### Categories
- `GET /api/categories` - Lấy tất cả categories
- `POST /api/categories` - Tạo category mới

### Tags
- `GET /api/tags` - Lấy tất cả tags
- `POST /api/tags` - Tạo tag mới

## 9. Troubleshooting

### Lỗi kết nối database
- Kiểm tra PostgreSQL service đang chạy
- Kiểm tra DATABASE_URL trong file .env
- Kiểm tra password và username

### Lỗi Prisma
```bash
# Reset Prisma cache
npx prisma generate --force
```

### Lỗi migration
```bash
# Reset database và migrate lại
npx prisma migrate reset
npm run migrate:content
``` 