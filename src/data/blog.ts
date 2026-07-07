import { prisma } from "@/lib/prisma";

export async function getPost(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return null;
    }

    return {
      source: post.content,
      metadata: {
        title: post.title,
        publishedAt: post.publishedAt.toISOString(),
        summary: post.summary,
        image: post.image,
        tags: post.tags,
      },
      slug: post.slug,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function getBlogPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });

    return posts.map((post) => ({
      metadata: {
        title: post.title,
        publishedAt: post.publishedAt.toISOString(),
        summary: post.summary,
        image: post.image,
        tags: post.tags,
      },
      slug: post.slug,
      source: post.content,
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
