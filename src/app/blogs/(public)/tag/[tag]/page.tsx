import { getBlogs } from "@/actions/blog";
import { BlogCard } from "@/components/blogs/BlogCard";
import FollowUsBox from "@/components/blogs/FollowUsBox";
import { TagIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).replace(/-/g, " "); // Basic decoding from slug

  const searchParamsObj = await searchParams;
  const currentPage = Number(searchParamsObj.page) || 1;

  const tagRes = await getBlogs({
    limit: 12,
    page: currentPage,
    tag: decodedTag,
  });

  const blogs = tagRes.success ? tagRes.data : [];
  const totalPages = tagRes.success ? tagRes.totalPages || 1 : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-6 md:p-8 mb-8 flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/1 dark:bg-secondary0 dark:bg-primary/20 dark:bg-secondary text-primary dark:text-secondary flex items-center justify-center shrink-0">
              <TagIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                {decodedTag}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Browsing articles tagged with &quot;{decodedTag}&quot;.
              </p>
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No articles found
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                There are currently no articles in this category.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block px-6 py-2 bg-primary dark:bg-secondary text-white font-bold rounded-lg hover:bg-secondary transition-colors"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogs.map((blog: any) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/tag/${tag}?page=${currentPage - 1}`}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:text-secondary transition-colors text-sm font-medium"
                >
                  Previous
                </Link>
              )}

              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Link
                    key={i}
                    href={`/tag/${tag}?page=${i + 1}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                      currentPage === i + 1
                        ? "bg-primary dark:bg-secondary text-white"
                        : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:text-secondary text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/tag/${tag}?page=${currentPage + 1}`}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:text-secondary transition-colors text-sm font-medium"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <FollowUsBox />
        </aside>
      </div>
    </div>
  );
}
