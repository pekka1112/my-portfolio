"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Tag {
  name: string;
  slug: string;
  count: number;
}

export default function BlogFiltersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      // Fetch real data from the blog data functions
      const response = await fetch('/api/blog/filters');
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags);
      } else {
        // Fallback to mock data if API is not available
        const mockTags = [
          { name: "introduction", slug: "introduction", count: 1 },
          { name: "first-post", slug: "first-post", count: 1 },
          { name: "docker", slug: "docker", count: 1 },
          { name: "devops", slug: "devops", count: 1 },
          { name: "container", slug: "container", count: 1 },
          { name: "commands", slug: "commands", count: 1 },
        ];

        setTags(mockTags);
      }
    } catch (error) {
      console.error("Failed to fetch filters:", error);
      // Fallback to mock data
      const mockTags = [
        { name: "introduction", slug: "introduction", count: 1 },
        { name: "first-post", slug: "first-post", count: 1 },
        { name: "docker", slug: "docker", count: 1 },
        { name: "devops", slug: "devops", count: 1 },
        { name: "container", slug: "container", count: 1 },
        { name: "commands", slug: "commands", count: 1 },
      ];

      setTags(mockTags);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tagSlug: string) => {
    const currentTag = searchParams.get('tag');
    
    let newUrl = '/blog?';
    const params = new URLSearchParams();
    
    if (currentTag === tagSlug) {
      // Remove tag filter
      newUrl = '/blog';
    } else {
      // Add tag filter
      params.set('tag', tagSlug);
      newUrl += params.toString();
    }
    
    router.push(newUrl);
  };

  const clearFilters = () => {
    router.push('/blog');
  };

  const currentTag = searchParams.get('tag');

  if (loading) {
    return <div className="space-y-4">Loading filters...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.slug}
              variant={currentTag === tag.slug ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => handleTagClick(tag.slug)}
            >
              {tag.name} ({tag.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {currentTag && (
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
} 