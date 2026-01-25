"use client";

import { ArrowUpRight, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

import { useParams } from "next/navigation";

const notices = [
  {
    date: "22 Dec, 2025",
    title: "Holiday Notice, Dhawapur Branch",
    href: "/notice-board/holiday-dhawapur",
    isExternal: false,
  },
  {
    date: "17 Dec, 2025",
    title: "Parent Teacher Meeting, Dhawapur Branch",
    href: "/notice-board/ptm-dhawapur",
    isExternal: false,
  },
  {
    date: "15 Dec, 2025",
    title: "Winter Uniform Guidelines",
    href: "https://example.com/winter-uniform-pdf", // Example external link
    isExternal: true,
  },
];

const quickLinks = [
  { title: "Apply for Scholarship", icon: "🎓", href: "/students/scholarship" },
  { title: "Curriculum", icon: "📘", href: "/academics/curriculum" },
  { title: "Blogs", icon: "📝", href: "/students/blog" },
  { title: "Syllabus", icon: "📂", href: "/academics/syllabus" },
];

export default function NoticeBoard() {
  const params = useParams();
  const branch = params?.branch as string | undefined;
  const prefix = branch ? `/${branch}` : "";

  // Helper to prefix links
  const getLink = (path: string) => {
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${prefix}${cleanPath}`;
  };

  // Filter notices based on branch
  const filteredNotices = notices.filter((notice) => {
    if (!branch) return true; // Show all on root/non-branch pages? But this component is usually on branch page.
    const lowerTitle = notice.title.toLowerCase();

    // If notice is for Dhawapur but we are on Asiana
    if (lowerTitle.includes("dhawapur") && branch !== "dhawapur") return false;

    // If notice is for Aashiana but we are on Dhawapur
    if (lowerTitle.includes("aashiana") && !branch.includes("aashiana"))
      return false;

    return true;
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: NOTICE BOARD */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                <span className="text-primary dark:text-secondary">
                  Announcements
                </span>
              </h2>
              <Link
                href={`${prefix}/announcements`}
                className="group flex items-center gap-1 text-sm font-semibold text-primary dark:text-secondary dark:hover:text-white hover:text-secondary transition"
              >
                View All
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40 scrollbar-track-transparent">
              <div className="space-y-4">
                {filteredNotices.map((notice, index) => (
                  <div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-secondary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary dark:text-secondary/80 mb-2">
                          <div className="p-1 rounded bg-secondary/10">
                            <Calendar size={12} />
                          </div>
                          {notice.date}
                        </div>
                        <h3 className="text-lg font-body font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-white transition-colors">
                          {notice.title}
                        </h3>
                      </div>
                      {notice.isExternal && (
                        <ExternalLink
                          size={18}
                          className="text-gray-400 group-hover:text-secondary transition-colors"
                        />
                      )}
                    </div>

                    <a
                      href={getLink(notice.href)}
                      target={notice.isExternal ? "_blank" : undefined}
                      rel={
                        notice.isExternal ? "noopener noreferrer" : undefined
                      }
                      className="absolute inset-0"
                      aria-label={`Read more about ${notice.title}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: QUICK LINKS */}
          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.title}
                  href={getLink(item.href)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-2xl group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="font-san font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto text-gray-300 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
