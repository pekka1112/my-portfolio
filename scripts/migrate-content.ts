import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { prisma } from "../src/lib/db";

async function migrateContent() {
  console.log("🚀 Starting content migration...");

  try {
    // Create default categories
    const categories = [
      { name: "Tutorials", slug: "tutorials", description: "Hướng dẫn và tutorials" },
      { name: "Thoughts", slug: "thoughts", description: "Suy nghĩ và chia sẻ" },
      { name: "Projects", slug: "projects", description: "Các dự án cá nhân" },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      });
    }

    // Create default tags
    const tags = [
      { name: "Docker", slug: "docker" },
      { name: "Next.js", slug: "nextjs" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Web Development", slug: "web-development" },
    ];

    for (const tag of tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      });
    }

    // Migrate existing MDX files
    const contentDir = path.join(process.cwd(), "content");
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(source);
      const slug = path.basename(file, ".mdx");

      // Check if post already exists
      const existingPost = await prisma.post.findUnique({
        where: { slug },
      });

      if (existingPost) {
        console.log(`⚠️  Post ${slug} already exists, skipping...`);
        continue;
      }

      // Determine category based on content or default to "Thoughts"
      let categoryId = null;
      if (content.toLowerCase().includes("docker")) {
        const dockerCategory = await prisma.category.findUnique({
          where: { slug: "tutorials" },
        });
        categoryId = dockerCategory?.id;
      } else {
        const thoughtsCategory = await prisma.category.findUnique({
          where: { slug: "thoughts" },
        });
        categoryId = thoughtsCategory?.id;
      }

      // Determine tags based on content
      const tagIds: string[] = [];
      if (content.toLowerCase().includes("docker")) {
        const dockerTag = await prisma.tag.findUnique({
          where: { slug: "docker" },
        });
        if (dockerTag) tagIds.push(dockerTag.id);
      }

      // Create the post
      await prisma.post.create({
        data: {
          title: data.title,
          slug,
          content,
          summary: data.summary,
          publishedAt: new Date(data.publishedAt),
          image: data.image,
          categoryId,
          tags: tagIds.length > 0 ? {
            create: tagIds.map(tagId => ({
              tagId,
            })),
          } : undefined,
        },
      });

      console.log(`✅ Migrated: ${slug}`);
    }

    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateContent(); 