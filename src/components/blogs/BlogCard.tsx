import { IBlog } from "@/lib/models/Blog";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Clock, User } from "lucide-react";

export function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <div className="group flex flex-col bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <Image
          src={blog.thumbnail.url}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {blog.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-900/80 dark:bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs font-bold uppercase rounded-sm shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
            <User size={14} />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <Link href={`/${blog.slug}`} className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
            {blog.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
          {blog.content
            .replace(/<\/(p|div|h[1-6]|li)>/g, " ")
            .replace(/<br\s*\/?>/g, " ")
            .replace(/<[^>]*>?/gm, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\s+/g, " ")
            .trim()
            .substring(0, 150) + "..."}
        </p>

        <Link
          href={`/${blog.slug}`}
          className="inline-flex items-center text-sm font-bold text-primary dark:text-secondary hover:text-secondary self-start transition-colors mt-auto"
        >
          READ MORE →
        </Link>
      </div>
    </div>
  );
}
