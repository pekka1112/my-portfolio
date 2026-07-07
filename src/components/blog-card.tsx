import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

interface BlogCardProps {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  image?: string;
  tags?: string[];
  content?: string;
  delay?: number;
}

export function BlogCard({
  title,
  slug,
  summary,
  publishedAt,
  image,
  tags = [],
  content = "",
  delay = 0,
}: BlogCardProps) {
  const readingTime = content ? calculateReadingTime(content) : 5;

  return (
    <BlurFade delay={delay}>
      <Link href={`/blog/${slug}`}>
        <article className="group rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 overflow-hidden hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-neutral-800 hover:scale-[1.02]">
          {/* Featured Image */}
          {image && (
            <div className="relative h-40 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Title */}
            <h3 className="font-semibold text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
              {summary}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
              <div className="flex items-center gap-2">
                <span>{formatDate(publishedAt)}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </BlurFade>
  );
}
