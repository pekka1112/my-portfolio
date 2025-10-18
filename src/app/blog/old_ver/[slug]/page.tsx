import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,           
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found.",
    };
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata as any;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog" className="max-w-[650px] mx-auto">
      {/* Back to Blog Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <a href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại Blog</span>
          </a>
        </Button>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: (post.metadata as any).title,
            datePublished: (post.metadata as any).publishedAt,
            dateModified: (post.metadata as any).publishedAt,
            description: (post.metadata as any).summary,
            image: (post.metadata as any).image
              ? `${DATA.url}${(post.metadata as any).image}`
              : `${DATA.url}/og?title=${(post.metadata as any).title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      
      <h1 className="title font-medium text-2xl tracking-tighter">
        {(post.metadata as any).title}
      </h1>
      
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate((post.metadata as any).publishedAt)}
          </p>
        </Suspense>
      </div>
      
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
      
      {/* Bottom Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-center items-center">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <a href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Quay lại Blog</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
