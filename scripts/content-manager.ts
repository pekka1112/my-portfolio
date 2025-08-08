#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execSync } from "child_process";

interface ContentStats {
  totalFiles: number;
  categories: Record<string, number>;
  tags: Record<string, number>;
  drafts: number;
  published: number;
  featured: number;
}

class ContentManager {
  private contentDir: string;

  constructor(contentDir: string = "content") {
    this.contentDir = contentDir;
  }

  // Get all MDX files recursively
  private getAllMDXFiles(dir: string): string[] {
    const files: string[] = [];
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllMDXFiles(fullPath));
      } else if (item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  // Get content statistics
  getStats(): ContentStats {
    const files = this.getAllMDXFiles(this.contentDir);
    const stats: ContentStats = {
      totalFiles: files.length,
      categories: {},
      tags: {},
      drafts: 0,
      published: 0,
      featured: 0,
    };

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const { data } = matter(content);
      
      // Count categories
      const category = data.category || 'uncategorized';
      stats.categories[category] = (stats.categories[category] || 0) + 1;
      
      // Count tags
      if (data.tags && Array.isArray(data.tags)) {
        for (const tag of data.tags) {
          stats.tags[tag] = (stats.tags[tag] || 0) + 1;
        }
      }
      
      // Count drafts vs published
      if (data.draft) {
        stats.drafts++;
      } else {
        stats.published++;
      }
      
      // Count featured
      if (data.featured) {
        stats.featured++;
      }
    }

    return stats;
  }

  // List all posts with metadata
  listPosts(options: {
    category?: string;
    tag?: string;
    draft?: boolean;
    featured?: boolean;
    limit?: number;
  } = {}) {
    const files = this.getAllMDXFiles(this.contentDir);
    const posts: any[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const { data } = matter(content);
      const relativePath = path.relative(this.contentDir, file);
      
      // Apply filters
      if (options.category && data.category !== options.category) continue;
      if (options.tag && (!data.tags || !data.tags.includes(options.tag))) continue;
      if (options.draft !== undefined && !!data.draft !== options.draft) continue;
      if (options.featured !== undefined && !!data.featured !== options.featured) continue;

      posts.push({
        file: relativePath,
        title: data.title,
        publishedAt: data.publishedAt,
        category: data.category,
        tags: data.tags || [],
        draft: !!data.draft,
        featured: !!data.featured,
      });
    }

    // Sort by publishedAt (newest first)
    posts.sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    // Apply limit
    if (options.limit) {
      return posts.slice(0, options.limit);
    }

    return posts;
  }

  // Create new post
  createPost(options: {
    title: string;
    slug: string;
    category: string;
    tags?: string[];
    draft?: boolean;
    featured?: boolean;
  }) {
    const { title, slug, category, tags = [], draft = true, featured = false } = options;
    
    // Create category directory if it doesn't exist
    const categoryDir = path.join(this.contentDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const fileName = `${slug}.mdx`;
    const filePath = path.join(categoryDir, fileName);
    
    if (fs.existsSync(filePath)) {
      throw new Error(`Post with slug "${slug}" already exists!`);
    }

    const content = `---
title: "${title}"
publishedAt: "${new Date().toISOString().split('T')[0]}"
summary: "Add your summary here"
image: "/placeholder.png"
category: "${category}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
featured: ${featured}
draft: ${draft}
author: "Your Name"
readingTime: "5 min read"
---

# ${title}

Start writing your content here...

## Introduction

Add your introduction here.

## Main Content

Add your main content here.

## Conclusion

Add your conclusion here.
`;

    fs.writeFileSync(filePath, content);
    console.log(`✅ Created new post: ${filePath}`);
    
    return filePath;
  }

  // Validate all posts
  validatePosts() {
    const files = this.getAllMDXFiles(this.contentDir);
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const { data } = matter(content);
        const relativePath = path.relative(this.contentDir, file);

        // Check required fields
        if (!data.title) {
          errors.push(`${relativePath}: Missing title`);
        }
        if (!data.publishedAt) {
          errors.push(`${relativePath}: Missing publishedAt`);
        }
        if (!data.summary) {
          warnings.push(`${relativePath}: Missing summary`);
        }
        if (!data.category) {
          warnings.push(`${relativePath}: Missing category`);
        }

        // Check date format
        if (data.publishedAt) {
          const date = new Date(data.publishedAt);
          if (isNaN(date.getTime())) {
            errors.push(`${relativePath}: Invalid publishedAt date format`);
          }
        }

        // Check tags format
        if (data.tags && !Array.isArray(data.tags)) {
          errors.push(`${relativePath}: Tags must be an array`);
        }

      } catch (error) {
        errors.push(`${file}: Failed to parse MDX file`);
      }
    }

    return { errors, warnings };
  }

  // Search posts
  searchPosts(query: string) {
    const files = this.getAllMDXFiles(this.contentDir);
    const results: any[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const { data, content: mdxContent } = matter(content);
      const relativePath = path.relative(this.contentDir, file);

      const searchText = `${data.title || ''} ${data.summary || ''} ${mdxContent}`.toLowerCase();
      
      if (searchText.includes(query.toLowerCase())) {
        results.push({
          file: relativePath,
          title: data.title,
          summary: data.summary,
          category: data.category,
          tags: data.tags || [],
        });
      }
    }

    return results;
  }

  // Generate sitemap
  generateSitemap() {
    const posts = this.listPosts({ draft: false });
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

    for (const post of posts) {
      const slug = path.basename(post.file, '.mdx');
      sitemap += `
  <url>
    <loc>https://yoursite.com/blog/${slug}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    sitemap += `
</urlset>`;

    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Generated sitemap.xml');
  }
}

// CLI interface
function main() {
  const manager = new ContentManager();
  const command = process.argv[2];

  switch (command) {
    case 'stats':
      const stats = manager.getStats();
      console.log('📊 Content Statistics:');
      console.log(`Total files: ${stats.totalFiles}`);
      console.log(`Published: ${stats.published}`);
      console.log(`Drafts: ${stats.drafts}`);
      console.log(`Featured: ${stats.featured}`);
      console.log('\nCategories:');
      Object.entries(stats.categories).forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count}`);
      });
      console.log('\nTags:');
      Object.entries(stats.tags).forEach(([tag, count]) => {
        console.log(`  ${tag}: ${count}`);
      });
      break;

    case 'list':
      const category = process.argv[3];
      const posts = manager.listPosts({ category });
      console.log('📝 Posts:');
      posts.forEach(post => {
        const status = post.draft ? '📝' : '✅';
        const featured = post.featured ? '⭐' : '';
        console.log(`${status} ${post.title} ${featured}`);
        console.log(`   ${post.file} (${post.category})`);
      });
      break;

    case 'create':
      const title = process.argv[3];
      const slug = process.argv[4];
      const cat = process.argv[5];
      
      if (!title || !slug || !cat) {
        console.log('Usage: npm run content:create "Title" "slug" "category"');
        process.exit(1);
      }
      
      manager.createPost({
        title,
        slug,
        category: cat,
        tags: [],
        draft: true,
      });
      break;

    case 'validate':
      const { errors, warnings } = manager.validatePosts();
      if (errors.length > 0) {
        console.log('❌ Errors:');
        errors.forEach(error => console.log(`  ${error}`));
      }
      if (warnings.length > 0) {
        console.log('⚠️  Warnings:');
        warnings.forEach(warning => console.log(`  ${warning}`));
      }
      if (errors.length === 0 && warnings.length === 0) {
        console.log('✅ All posts are valid!');
      }
      break;

    case 'search':
      const query = process.argv[3];
      if (!query) {
        console.log('Usage: npm run content:search "query"');
        process.exit(1);
      }
      
      const results = manager.searchPosts(query);
      console.log(`🔍 Search results for "${query}":`);
      results.forEach(result => {
        console.log(`  ${result.title}`);
        console.log(`    ${result.file}`);
      });
      break;

    case 'sitemap':
      manager.generateSitemap();
      break;

    default:
      console.log(`
📚 Content Manager

Usage:
  npm run content:stats                    - Show content statistics
  npm run content:list [category]          - List all posts
  npm run content:create "Title" "slug" "category" - Create new post
  npm run content:validate                 - Validate all posts
  npm run content:search "query"           - Search posts
  npm run content:sitemap                  - Generate sitemap
      `);
  }
}

if (require.main === module) {
  main();
} 