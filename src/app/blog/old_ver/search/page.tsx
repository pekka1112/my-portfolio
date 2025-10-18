import { searchPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Results - Blog",
  description: "Search results for blog posts",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const posts = query ? await searchPosts(query) : [];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" asChild>
            <a href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại Blog</span>
            </a>
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          Kết quả tìm kiếm
          {query && (
            <span className="text-2xl font-normal text-gray-600 dark:text-gray-400">
              : "{query}"
            </span>
          )}
        </h1>
        
        {query && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tìm thấy {posts.length} bài viết
          </p>
        )}
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.slug} className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
            <div className="p-3">
              {/* Title */}
              <div className="flex items-center gap-2 mb-1">
                {post.metadata.featured && (
                  <Badge variant="default" className="text-xs">⭐ Featured</Badge>
                )}
              </div>
              <h3 className="text-base font-semibold mb-1">
                <a
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.metadata.title}
                </a>
              </h3>
              
              {/* Date and Tags on same row */}
              <div className="flex items-center justify-between">
                <Suspense fallback={<p className="h-4" />}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </Suspense>
                <div className="flex gap-1">
                  {post.metadata.tags?.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {post.metadata.tags && post.metadata.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{post.metadata.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No results */}
      {query && posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Không có bài viết nào phù hợp với từ khóa "{query}"
          </p>
          <Button asChild>
            <a href="/blog">Quay lại Blog</a>
          </Button>
        </div>
      )}

      {/* No query */}
      {!query && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Vui lòng nhập từ khóa tìm kiếm</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Sử dụng thanh tìm kiếm để tìm bài viết bạn quan tâm
          </p>
        </div>
      )}
    </section>
  );
} 