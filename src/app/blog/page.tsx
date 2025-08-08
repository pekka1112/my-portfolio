import { getBlogPosts, getTags } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogFiltersClient from "@/components/blog-filters-client";
import BlogSearch from "@/components/blog-search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.",
  openGraph: {
    title: "Blog",
    description: "Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.",
    url: `${DATA.url}/blog`,
    siteName: DATA.name,
    images: [
      {
        url: `${DATA.url}/og?title=Blog`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.",
    images: [`${DATA.url}/og?title=Blog`],
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = 6;
  const offset = (page - 1) * limit;

  const [posts] = await Promise.all([
    getBlogPosts({
      limit,
      offset,
      tag: searchParams.tag,
    }),
  ]);

  const totalPosts = posts.length; 
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl">Blog</h1>
        <div>
          <BlogSearch />
        </div>
      </div>

      {/* Nội dung chiếm full width */}
      <div className="grid grid-cols-1 gap-8">
        {/* Danh sách bài viết */}
        <div>
          <div className="space-y-3 mb-8">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700"
              >
                <div className="p-2">
                  {post.metadata.featured && (
                    <Badge variant="default" className="text-xs mb-2">⭐ Featured</Badge>
                  )}
                  <h3 className="text-base font-semibold mb-1">
                    <a
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.metadata.title}
                    </a>
                  </h3>
                  <Suspense fallback={<p className="h-4" />}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.metadata.publishedAt)}
                    </p>
                  </Suspense>
                </div>
              </Card>
            ))}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {page > 1 && (
                <Button variant="outline" asChild>
                  <a href={`/blog?page=${page - 1}`}>Previous</a>
                </Button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  asChild
                >
                  <a href={`/blog?page=${pageNum}`}>{pageNum}</a>
                </Button>
              ))}
              {page < totalPages && (
                <Button variant="outline" asChild>
                  <a href={`/blog?page=${page + 1}`}>Next</a>
                </Button>
              )}
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or check back later for new content.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

