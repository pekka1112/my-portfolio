import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
};

type Post = {
  metadata: Metadata;
  slug: string;
  source: string;
};

// Cache for better performance
let postsCache: Post[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join("content", `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  
  return {
    source: content,
    metadata: {
      title: metadata.title,
      publishedAt: metadata.publishedAt,
      summary: metadata.summary,
      image: metadata.image,
      tags: metadata.tags || [],
      featured: metadata.featured || false,
    },
    slug,
  };
}

async function getAllPosts(dir: string, options?: {
  limit?: number;
  offset?: number;
  tag?: string;
  featured?: boolean;
}): Promise<Post[]> {
  let mdxFiles = getMDXFiles(dir);
  
  // Get all posts with metadata first
  let posts: (Post | null)[] = await Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let post = await getPost(slug);
      if (!post) return null;
      return {
        metadata: post.metadata,
        slug,
        source: post.source,
      };
    })
  );

  // Filter out null posts
  posts = posts.filter((post): post is Post => post !== null) as Post[];

  // Filter by tag
  if (options?.tag) {
    posts = posts.filter(post => 
      post.metadata.tags?.includes(options.tag!)
    );
  }

  // Filter by featured
  if (options?.featured !== undefined) {
    posts = posts.filter(post => post.metadata.featured === options.featured);
  }

  // Sort by publishedAt (newest first)
  posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Apply pagination
  if (options?.offset) {
    posts = posts.slice(options.offset);
  }
  
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

export async function getBlogPosts(options?: {
  limit?: number;
  offset?: number;
  tag?: string;
  featured?: boolean;
}): Promise<Post[]> {
  // Check cache first
  const now = Date.now();
  if (postsCache && (now - lastCacheTime) < CACHE_DURATION) {
    return postsCache;
  }

  const posts = await getAllPosts(path.join(process.cwd(), "content"), options);
  
  // Update cache
  postsCache = posts;
  lastCacheTime = now;
  
  return posts;
}

// New functions for better content management
export async function getTags() {
  const posts = await getAllPosts(path.join(process.cwd(), "content"));
  const tags = new Map<string, number>();
  
  posts.forEach(post => {
    post.metadata.tags?.forEach((tag: string) => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tags.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }));
}

// Add search logging function
export async function logSearch(query: string, results: number) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    query,
    results,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server-side',
  };
  
  console.log('Search Log:', logEntry);
  
  // In a real application, you might want to save this to a database
  // For now, we'll just log it to console
  return logEntry;
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts(path.join(process.cwd(), "content"));
  
  const results = posts.filter(post => 
    post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
    post.metadata.summary.toLowerCase().includes(query.toLowerCase()) ||
    post.metadata.tags?.some((tag: string) => 
      tag.toLowerCase().includes(query.toLowerCase())
    )
  );
  
  // Log the search
  await logSearch(query, results.length);
  
  return results;
}

// Clear cache when content changes
export function clearCache() {
  postsCache = null;
  lastCacheTime = 0;
}