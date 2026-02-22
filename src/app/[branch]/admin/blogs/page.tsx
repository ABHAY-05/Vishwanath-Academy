import { getBlogs, deleteBlog } from "@/actions/blog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit, Eye, Tag } from "lucide-react";
import DeleteBlogButton from "./DeleteBlogButton";

export const revalidate = 0; // Always fetch fresh on admin load

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || "";

  // Fetch blogs (we don't strictly filter branch here since blogs are global as per user instruction "common for both branches")
  // So any admin with 'blogs' permission can edit the global pool.
  const res = await getBlogs({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    sort: "newest",
  });

  const blogs = res.success ? res.data : [];
  const totalPages = res.success ? res.totalPages || 1 : 1;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 transition-colors">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Blogs Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage all global blog posts across branches.
          </p>
        </div>
        <Link
          href="blogs/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-secondary transition-colors"
        >
          <Plus size={18} /> Add New Blog
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider bg-gray-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">
                  Thumbnail & Title
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Author & Date
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Details
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
              {blogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog: any) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800 shrink-0 border border-gray-200 dark:border-neutral-700">
                          <Image
                            src={blog.thumbnail.url}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col max-w-xs">
                          <span className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                            {blog.title}
                          </span>
                          <span className="text-xs text-gray-400 font-mono mt-1">
                            /{blog.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {blog.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(new Date(blog.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 w-fit px-2 py-0.5 rounded-sm">
                          <Eye size={12} /> {blog.views} views
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                          <Tag size={12} className="text-gray-400" />
                          {blog.tags.slice(0, 2).map((t: string) => (
                            <span
                              key={t}
                              className="text-[10px] uppercase font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800 px-1 rounded"
                            >
                              {t}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="text-[10px] text-gray-400">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`${process.env.NEXT_PUBLIC_BLOG_URL}/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Publicly"
                          className="p-2 text-gray-400 hover:text-primary dark:text-neutral-400 dark:hover:text-white bg-gray-50 dark:bg-neutral-800 hover:bg-primary/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </a>
                        <Link
                          href={`blogs/edit/${blog._id}`}
                          title="Edit Blog"
                          className="p-2 text-gray-400 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400 bg-gray-50 dark:bg-neutral-800 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteBlogButton
                          id={blog._id.toString()}
                          title={blog.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Prev
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
