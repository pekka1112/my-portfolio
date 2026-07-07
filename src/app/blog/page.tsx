import BlurFade from "@/components/magicui/blur-fade";
import { BlogCard } from "@/components/blog-card";
import { getBlogPosts } from "@/data/blog";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const sortedPosts = posts.sort((a, b) => {
    if (
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
    ) {
      return -1;
    }
    return 1;
  });

  return (
    <section className="w-full">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl sm:text-4xl tracking-tighter">
              Blog
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-base">
              Thoughts on software development, DevOps, and more.
            </p>
          </div>
          <div className="hidden sm:block">
          </div>
        </div>
        <div className="sm:hidden">
        </div>
      </BlurFade>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {sortedPosts.map((post, index) => (
          <BlogCard
            key={post.slug}
            title={post.metadata.title}
            slug={post.slug}
            summary={post.metadata.summary}
            publishedAt={post.metadata.publishedAt}
            image={post.metadata.image as string}
            tags={post.metadata.tags}
            content={post.source}
            delay={BLUR_FADE_DELAY * 2 + index * 0.05}
          />
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
