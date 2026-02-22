"use client";

import { useState } from "react";
import { IBlog } from "@/lib/models/Blog";
import { BlogCardSmall } from "./BlogCardSmall";
import { ChevronRight } from "lucide-react";

export function TrendingWidget({ blogs }: { blogs: IBlog[] }) {
  const [startIndex, setStartIndex] = useState(0);

  if (!blogs || blogs.length === 0) return null;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 4 >= blogs.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(0, blogs.length - 4) : prev - 1,
    );
  };

  const visibleBlogs = [];
  for (let i = 0; i < 4; i++) {
    if (blogs.length > 0) {
      visibleBlogs.push(blogs[(startIndex + i) % blogs.length]);
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-neutral-800 shrink-0">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b-2 border-primary dark:border-secondary pb-1 inline-block">
          TRENDING NOW
        </h2>
        <div className="flex gap-1">
          <button
            onClick={handlePrev}
            className="w-5 h-5 flex items-center justify-center rounded bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-white transition-colors"
          >
            <ChevronRight size={12} className="-rotate-90" />
          </button>
          <button
            onClick={handleNext}
            className="w-5 h-5 flex items-center justify-center rounded bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-white transition-colors"
          >
            <ChevronRight size={12} className="rotate-90" />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
        {visibleBlogs.map((blog, idx) => (
          <BlogCardSmall
            key={String(blog._id)}
            blog={blog}
            rank={startIndex + idx + 1}
          />
        ))}
      </div>
    </div>
  );
}
