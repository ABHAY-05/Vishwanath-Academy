import { getBlogBySlug } from "@/actions/blog";
import Image from "next/image";
import Link from "next/link";
import { ShareButtons } from "./ShareButtons";

export async function EmbeddedBlogCard({ url }: { url: string }) {
  const slug = url.split("/").filter(Boolean).pop();

  if (!slug) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary dark:text-secondary hover:underline"
      >
        {url}
      </a>
    );
  }

  const res = await getBlogBySlug(slug);

  if (!res.success || !res.data) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary dark:text-secondary hover:underline"
      >
        {url}
      </a>
    );
  }

  const blog = res.data;

  const cleanDescription =
    blog.content
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
      .substring(0, 120) + "...";

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm flex flex-col w-full max-w-lg mx-auto not-prose hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-neutral-800 shrink-0">
        <Image
          src={blog.thumbnail.url}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 leading-snug">
            {blog.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {cleanDescription}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link
            href={`/${blog.slug}`}
            className="inline-flex items-center px-4 py-2 bg-primary dark:bg-secondary text-white text-sm font-bold rounded-lg hover:bg-primary/90 dark:bg-secondary transition-colors"
          >
            Continue Reading
          </Link>

          {/* Share Button (Client Component overlay wrapper) */}
          <div className="scale-75 origin-right -mt-8 -mb-6">
            <ShareButtons url={url} title={blog.title} hideLabel />
          </div>
        </div>
      </div>
    </div>
  );
}
