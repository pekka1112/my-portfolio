"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    posts: number;
  };
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  _count: {
    posts: number;
  };
}

interface BlogFiltersProps {
  onCategoryChange: (categorySlug: string | null) => void;
  onTagChange: (tagSlug: string | null) => void;
}

export default function BlogFilters({ onCategoryChange, onTagChange }: BlogFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/tags"),
      ]);

      const categoriesData = await categoriesRes.json();
      const tagsData = await tagsRes.json();

      setCategories(categoriesData);
      setTags(tagsData);
    } catch (error) {
      console.error("Failed to fetch filters:", error);
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory(null);
      onCategoryChange(null);
    } else {
      setSelectedCategory(categorySlug);
      onCategoryChange(categorySlug);
    }
  };

  const handleTagClick = (tagSlug: string) => {
    if (selectedTag === tagSlug) {
      setSelectedTag(null);
      onTagChange(null);
    } else {
      setSelectedTag(tagSlug);
      onTagChange(tagSlug);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    onCategoryChange(null);
    onTagChange(null);
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.slug)}
            >
              {category.name} ({category._count.posts})
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTag === tag.slug ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => handleTagClick(tag.slug)}
            >
              {tag.name} ({tag._count.posts})
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedTag) && (
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
} 