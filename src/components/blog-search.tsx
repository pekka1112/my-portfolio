"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface BlogSearchProps {
  placeholder?: string;
}

export default function BlogSearch({ placeholder = "Find blog ..." }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    window.location.href = `/blog/search?q=${encodeURIComponent(query.trim())}`;
  };

  const handleClear = () => setQuery("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // Focus input khi mở
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative flex items-center">
      {!isOpen ? (
        // Nút tròn icon search
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="rounded-full hover:shadow-md transition-all duration-300"
        >
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        // Thanh tìm kiếm đẹp hơn
        <div className="flex items-center gap-2 transition-all duration-300">
          <div className="relative flex-1">
            <Search
              onClick={handleSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer hover:text-black transition-colors duration-200"
            />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-10 w-72 rounded-full border border-gray-300 shadow-sm focus:shadow-lg focus:border-gray-400 transition-all duration-300"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
            className="rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
