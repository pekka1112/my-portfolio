# Kết nối Blog với Supabase

## Bước 1: Tạo project Supabase

1. Truy cập https://supabase.com và đăng nhập
2. Click **New Project**
3. Điền thông tin:
   - **Name**: portfolio-blog
   - **Password**: tạo password mạnh (lưu lại)
   - **Region**: Singapore (hoặc gần bạn nhất)
4. Chờ project khởi tạo (~2–3 phút)

## Bước 2: Tạo bảng database

Vào **SQL Editor** → **New query**, copy toàn bộ nội dung file `supabase/schema.sql` và chạy **Run**.

Hoặc dùng Prisma (sau khi cấu hình `.env`):

```bash
npm run db:push
```

## Bước 3: Lấy Database URL

1. Vào **Project Settings** → **Database**
2. Tab **Connection string** → chọn **URI**
3. Copy URL, thay `[YOUR-PASSWORD]` bằng password đã tạo

Ví dụ:

```
postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

## Bước 4: Cấu hình project

Tạo file `.env.local`:

```env
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

> Dùng **Transaction pooler** (port 6543) cho serverless/Netlify.  
> Dùng **Direct connection** (port 5432) khi chạy `npm run db:push` hoặc `db:migrate`.

Generate Prisma client:

```bash
npm run db:generate
```

## Bước 5: Thêm bài blog

Thêm bài trực tiếp trên Supabase **Table Editor** → bảng `Post`:

| Cột | Mô tả |
|-----|-------|
| `id` | Tự tăng (number), không cần nhập khi thêm bài |
| `title` | Tiêu đề bài viết |
| `slug` | URL slug, ví dụ `bai-viet-dau-tien` |
| `summary` | Mô tả ngắn |
| `content` | Nội dung HTML |
| `image` | Đường dẫn ảnh (tuỳ chọn) |
| `tags` | Mảng tag, ví dụ `{docker,devops}` |
| `published` | `true` để hiển thị |
| `publishedAt` | Ngày đăng |

## Bước 6: Chạy thử

```bash
npm run dev
```

Mở http://localhost:3000/blog

## Deploy (Netlify / Vercel)

Thêm biến môi trường:

```
DATABASE_URL=<connection string từ Supabase>
```

## Lệnh hữu ích

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Đồng bộ schema lên Supabase
npm run db:studio     # Xem/sửa dữ liệu qua Prisma Studio
```

## Troubleshooting

**Không kết nối được database**
- Kiểm tra `DATABASE_URL` đúng password
- Thử direct connection (port 5432) thay vì pooler

**Bảng không tồn tại**
- Chạy lại `supabase/schema.sql` trong SQL Editor
- Hoặc `npm run db:push`

**Blog trống**
- Kiểm tra bảng `Post` có dữ liệu và `published = true`
