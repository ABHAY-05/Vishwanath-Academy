"use client";

import { useState } from "react";
import { IBlog } from "@/lib/models/Blog";
import { BlogCardSmall } from "./BlogCardSmall";
import { Clock, Zap, RefreshCw } from "lucide-react";

export function PopularLatestTabs({
  latest,
  popular,
}: {
  latest: IBlog[];
  popular: IBlog[];
}) {
  const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 overflow-hidden transition-colors h-full flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-100 dark:border-neutral-700 w-full relative shrink-0">
        <button
          onClick={() => setActiveTab("latest")}
          className={`flex-1 py-3 px-4 text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 border-b-2 ${
            activeTab === "latest"
              ? "text-primary dark:text-secondary border-primary dark:border-secondary bg-white dark:bg-neutral-800"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
          }`}
        >
          <Clock size={16} /> LATEST
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`flex-1 py-3 px-4 text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 border-b-2 ${
            activeTab === "popular"
              ? "text-primary dark:text-secondary border-primary dark:border-secondary bg-white dark:bg-neutral-800"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
          }`}
        >
          <Zap size={16} /> POPULAR
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
        {activeTab === "latest" &&
          latest.map((blog) => (
            <BlogCardSmall key={String(blog._id)} blog={blog} />
          ))}
        {activeTab === "popular" &&
          popular.map((blog) => (
            <BlogCardSmall key={String(blog._id)} blog={blog} />
          ))}

        {((activeTab === "latest" && latest.length === 0) ||
          (activeTab === "popular" && popular.length === 0)) && (
          <div className="py-8 text-center text-gray-400 dark:text-neutral-500 flex flex-col items-center">
            <RefreshCw size={24} className="mb-2 opacity-50" />
            <p className="text-sm">No blogs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
