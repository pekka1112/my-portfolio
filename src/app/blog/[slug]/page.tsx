import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

/**
 * Tạo static params cho từng bài blog (Next.js SSG)
 */
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Sinh metadata cho từng trang blog
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);

  // ✅ Kiểm tra nếu post không tồn tại
  if (!post) {
    return undefined;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Component chính của trang blog
 */
export default async function Blog({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  // ✅ Nếu không có bài viết -> 404
  if (!post) {
    notFound();
  }

  const { title, publishedAt, summary, image, tags = [] } = post.metadata;
  const readingTime = calculateReadingTime(post.source);
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${encodeURIComponent(title)}`;

  return (
    <section id="blog" className="w-full">
      {/* ✅ Cấu trúc dữ liệu SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            datePublished: publishedAt,
            dateModified: publishedAt,
            description: summary,
            image: ogImage,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to blog
        </Link>
      </div>

      {/* ✅ Featured Image */}
      {image && (
        <div className="relative h-56 sm:h-80 w-full rounded-lg overflow-hidden mb-8 bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </div>
      )}

      {/* ✅ Header */}
      <div className="max-w-2xl">
        {/* Title */}
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 leading-tight">
          {title}
        </h1>

        {/* Summary */}
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          {summary}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <Suspense fallback={<p className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(publishedAt)}
            </p>
          </Suspense>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {readingTime} min read
          </p>
          {tags.length > 0 && (
            <>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ✅ Content */}
      <article
        className="prose dark:prose-invert max-w-2xl prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline hover:prose-a:no-underline"
        dangerouslySetInnerHTML={{ __html: post.source }}
      />

      {/* ✅ Footer */}
      <div className="max-w-2xl mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>
    </section>
  );
}
