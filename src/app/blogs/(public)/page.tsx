import { getBlogs } from "@/actions/blog";
import { MainNewsCarousel } from "@/components/blogs/MainNewsCarousel";
import { TrendingWidget } from "@/components/blogs/TrendingWidget";
import { PopularLatestTabs } from "@/components/blogs/PopularLatestTabs";
import { BlogCard } from "@/components/blogs/BlogCard";
import FollowUsBox from "@/components/blogs/FollowUsBox";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const revalidate = 60;

export default async function BlogsHomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const [
    newsRes,
    trendingRes,
    latestRes,
    popularRes,
    parentsRes,
    studentsRes,
    allRes,
  ] = await Promise.all([
    getBlogs({ limit: 5, tag: "news", sort: "newest" }),
    getBlogs({ limit: 10, sort: "popular" }),
    getBlogs({ limit: 4, sort: "newest" }),
    getBlogs({ limit: 4, sort: "popular" }),
    getBlogs({ limit: 6, tag: "parents corner", sort: "newest" }),
    getBlogs({ limit: 6, tag: "students corner", sort: "newest" }),
    getBlogs({ limit: 9, page: currentPage, sort: "newest" }),
  ]);

  const newsBlogs = newsRes.success ? newsRes.data : [];
  const trendingBlogs = trendingRes.success ? trendingRes.data : [];
  const latestBlogs = latestRes.success ? latestRes.data : [];
  const popularBlogs = popularRes.success ? popularRes.data : [];
  const parentsBlogs = parentsRes.success ? parentsRes.data : [];
  const studentsBlogs = studentsRes.success ? studentsRes.data : [];
  const allBlogs = allRes.success ? allRes.data : [];
  const totalPages = allRes.success ? allRes.totalPages || 1 : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Top Section: Sidebar Left + Center News + Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-stretch">
        {/* Left Sidebar: Trending */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <TrendingWidget blogs={trendingBlogs} />
        </aside>

        {/* Center: Main News Carousel */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
          <MainNewsCarousel blogs={newsBlogs} />
          <FollowUsBox />
        </div>

        {/* Right Sidebar: Tabs */}
        <aside className="lg:col-span-3 order-3">
          <PopularLatestTabs latest={latestBlogs} popular={popularBlogs} />
        </aside>
      </div>

      {/* Parent's Corner Section */}
      {parentsBlogs.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-l-4 border-primary dark:border-secondary pl-4">
              Parent&apos;s Corner
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-secondary/20"></div>
            <Link
              href="/tag/parents-corner"
              className="text-sm font-bold text-primary dark:text-secondary hover:text-secondary flex items-center gap-1 transition-colors"
            >
              VIEW ALL <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentsBlogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {/* Students Corner Section */}
      {studentsBlogs.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-l-4 border-primary dark:border-secondary pl-4">
              Students Corner
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-secondary/20"></div>
            <Link
              href="/tag/students-corner"
              className="text-sm font-bold text-primary dark:text-secondary hover:text-secondary flex items-center gap-1 transition-colors"
            >
              VIEW ALL <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentsBlogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {/* All Blogs Paginated */}
      <section id="all-posts" className="scroll-mt-24">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-l-4 border-primary dark:border-secondary pl-4">
            All Posts
          </h2>
          <div className="h-px flex-1 bg-gray-200 dark:bg-secondary/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.map((blog: any) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`?page=${currentPage - 1}#all-posts`}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-white dark:text-gray-300 transition-colors text-sm font-medium"
              >
                Previous
              </Link>
            )}

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link
                  key={i}
                  href={`?page=${i + 1}#all-posts`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary dark:bg-secondary text-white"
                      : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-white text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`?page=${currentPage + 1}#all-posts`}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-white dark:text-gray-300 transition-colors text-sm font-medium"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </section>

      {/* You May Have Missed (Random/Recommended bottom section) */}
      {popularBlogs.length > 0 && (
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 before:content-[''] before:w-1 before:h-5 before:bg-primary dark:before:bg-secondary before:rounded-full">
            You may have missed
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularBlogs.slice(0, 4).map((blog: any) => (
              <Link
                key={blog._id}
                href={`/${blog.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800">
                  <Image
                    src={blog.thumbnail.url}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                  {blog.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
