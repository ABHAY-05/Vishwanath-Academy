import { getBlogs } from "@/actions/blog";
import { BlogCard } from "@/components/blogs/BlogCard";
import FollowUsBox from "@/components/blogs/FollowUsBox";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const currentPage = Number(params.page) || 1;

  let searchRes = await getBlogs({
    limit: 12,
    page: currentPage,
    search: query,
  });

  if (query && (!searchRes.success || searchRes.data.length === 0)) {
    searchRes = await getBlogs({ limit: 12, page: currentPage, tag: query });
  }

  const blogs = searchRes.success ? searchRes.data : [];
  const totalPages = searchRes.success ? searchRes.totalPages || 1 : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-6 md:p-8 mb-8 flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/1 dark:bg-secondary0 dark:bg-primary/20 dark:bg-secondary text-primary dark:text-secondary flex items-center justify-center shrink-0">
              <SearchIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Search Results for &quot;{query}&quot;
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Found {searchRes.success ? searchRes.totalBlogs : 0} articles.
              </p>
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No results found
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                We couldn't find any blogs matching your search query.
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
                  href={`/search?q=${query}&page=${currentPage - 1}`}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:text-secondary transition-colors text-sm font-medium"
                >
                  Previous
                </Link>
              )}

              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Link
                    key={i}
                    href={`/search?q=${query}&page=${i + 1}`}
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
                  href={`/search?q=${query}&page=${currentPage + 1}`}
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
