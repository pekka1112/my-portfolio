import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogSearch from "@/components/blog-search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = 6;
  const offset = (page - 1) * limit;

  const posts = await getBlogPosts({
    limit,
    offset,
    tag: searchParams.tag,
  });

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-3xl">Blog</h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <BlogSearch />
        </BlurFade>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <div className="space-y-3 mb-8">
            {posts.map((post, id) => (
              <BlurFade
                key={post.slug}
                delay={BLUR_FADE_DELAY * 3 + id * 0.05}
              >
                <Card className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                  <div className="p-2">
                    {post.metadata.featured && (
                      <Badge
                        variant="default"
                        className="text-xs mb-2"
                      >
                        ⭐ Featured
                      </Badge>
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
              </BlurFade>
            ))}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * (posts.length + 3)}>
              <div className="flex justify-center gap-2">
                {page > 1 &&   (
                  <Button variant="outline" asChild>
                    <a href={`/blog?page=${page - 1}`}>Previous</a>
                  </Button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      asChild
                    >
                      <a href={`/blog?page=${pageNum}`}>{pageNum}</a>
                    </Button>
                  )
                )}
                {page < totalPages && (
                  <Button variant="outline" asChild>
                    <a href={`/blog?page=${page + 1}`}>Next</a>
                  </Button>
                )}
              </div>
            </BlurFade>
          )}
        </div>
      </div>
    </section>
  );
}
