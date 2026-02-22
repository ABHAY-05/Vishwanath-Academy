import { IBlog } from "@/lib/models/Blog";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";

export function BlogCardSmall({ blog, rank }: { blog: IBlog; rank?: number }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 dark:border-neutral-800 last:border-0 group">
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <Image
          src={blog.thumbnail.url}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {rank && (
          <div className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-tl-lg z-10">
            {rank}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <Link href={`/${blog.slug}`}>
          <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-3 leading-snug">
            {blog.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
          <Clock size={12} />
          <span>
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
