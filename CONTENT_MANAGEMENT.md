# Content Management Guide

## 🚀 **Giải pháp quản lý MDX files khi số lượng tăng**

### **1. Cấu trúc thư mục được đề xuất:**

```
content/
├── blog/
│   ├── tutorials/
│   │   ├── docker-commands.mdx
│   │   ├── nextjs-optimization.mdx
│   │   └── react-best-practices.mdx
│   ├── thoughts/
│   │   ├── career-reflections.mdx
│   │   ├── learning-journey.mdx
│   │   └── tech-trends.mdx
│   └── projects/
│       ├── portfolio-website.mdx
│       ├── ecommerce-app.mdx
│       └── ai-chatbot.mdx
├── pages/
│   ├── about.mdx
│   ├── contact.mdx
│   └── services.mdx
└── assets/
    ├── images/
    └── documents/
```

### **2. Metadata Structure cho MDX:**

```yaml
---
title: "Các lệnh Docker hữu ích mà ít người dùng tới"
publishedAt: "2025-07-21"
summary: "Khám phá các lệnh Docker ít được biết đến nhưng cực kỳ hữu ích"
image: "/modkey.png"
category: "tutorials"
tags: ["docker", "devops", "containers"]
featured: true
draft: false
author: "Your Name"
readingTime: "5 min read"
---
```

### **3. Content Management Scripts:**

#### **Xem thống kê content:**
```bash
npm run content:stats
```

#### **Liệt kê tất cả posts:**
```bash
npm run content:list
npm run content:list tutorials  # Lọc theo category
```

#### **Tạo post mới:**
```bash
npm run content:create "Title" "slug" "category"
```

#### **Validate tất cả posts:**
```bash
npm run content:validate
```

#### **Tìm kiếm posts:**
```bash
npm run content:search "docker"
```

#### **Generate sitemap:**
```bash
npm run content:sitemap
```

### **4. Performance Optimizations:**

#### **Caching System:**
- Cache posts trong memory (5 phút)
- Tự động clear cache khi content thay đổi
- Lazy loading cho content

#### **Pagination:**
- Load posts theo chunks (6 posts/page)
- URL parameters cho filtering
- SEO-friendly URLs

#### **Search & Filter:**
- Full-text search trong title, summary, content
- Filter theo category, tags, featured
- Real-time search results

### **5. Content Organization:**

#### **Categories:**
- `tutorials` - Hướng dẫn kỹ thuật
- `thoughts` - Suy nghĩ và chia sẻ
- `projects` - Dự án cá nhân

#### **Tags System:**
- Tự động extract tags từ content
- Tag suggestions dựa trên content
- Tag statistics và analytics

#### **Featured Posts:**
- Highlight important content
- Special styling và positioning
- Featured posts carousel

### **6. Admin Interface:**

#### **Dashboard Features:**
- Content statistics
- Post management (create, edit, delete)
- Category và tag management
- Bulk operations

#### **Content Editor:**
- Rich text editor
- Markdown preview
- Image upload và management
- Auto-save functionality

### **7. SEO & Analytics:**

#### **SEO Optimization:**
- Auto-generated meta tags
- Structured data (JSON-LD)
- Sitemap generation
- Open Graph tags

#### **Analytics:**
- Post views tracking
- Popular content analysis
- Search analytics
- Content performance metrics

### **8. Workflow & Automation:**

#### **Git-based Workflow:**
- Version control cho content
- Branch-based content development
- Pull request reviews
- Automated deployments

#### **Content Calendar:**
- Plan content trước
- Scheduled publishing
- Content themes và campaigns
- Editorial calendar

### **9. Scalability Solutions:**

#### **Khi số lượng files > 100:**
- Implement database-driven system
- Use CDN cho static assets
- Implement search indexing
- Add content archiving

#### **Khi số lượng files > 1000:**
- Migrate to headless CMS
- Implement content API
- Use cloud storage
- Add multi-language support

### **10. Monitoring & Maintenance:**

#### **Health Checks:**
- Validate all posts regularly
- Check broken links
- Monitor performance metrics
- Content quality analysis

#### **Backup Strategy:**
- Regular content backups
- Version history
- Disaster recovery plan
- Content migration tools

## 🎯 **Best Practices:**

1. **Consistent Naming**: Use kebab-case cho file names
2. **Metadata Standards**: Always include required fields
3. **Image Optimization**: Compress và optimize images
4. **Content Validation**: Regular validation checks
5. **Performance Monitoring**: Track load times và user engagement
6. **SEO Optimization**: Optimize cho search engines
7. **Accessibility**: Ensure content is accessible
8. **Mobile-first**: Optimize cho mobile devices

## 📈 **Growth Strategy:**

### **Phase 1 (0-50 posts):**
- File-based system với caching
- Manual content management
- Basic search và filtering

### **Phase 2 (50-200 posts):**
- Database-driven system
- Admin interface
- Advanced search và analytics

### **Phase 3 (200+ posts):**
- Headless CMS integration
- Content API
- Multi-language support
- Advanced analytics và automation 