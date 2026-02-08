import { currentUser } from "@clerk/nextjs/server";
import { getNotices } from "@/actions/notice";
import { Users, FileText, Bell, Newspaper } from "lucide-react";
import NoticeActions from "@/components/NoticeActions";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const user = await currentUser();

  // Fetch data
  const notices = await getNotices(branch);
  const totalBlogs = 0; // Placeholder

  const stats = [
    {
      label: "Total Notices",
      value: notices.length,
      icon: Bell,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Total Blogs",
      value: totalBlogs,
      icon: Newspaper,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      label: "Current Branch",
      value: branch.charAt(0).toUpperCase() + branch.slice(1),
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome back, {user?.firstName || "Admin"}!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's what's happening in {branch} branch.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Notices Preview */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            Recent Notices
          </h2>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {notices.length === 0 ? (
            <div className="p-6 text-center text-neutral-500">
              No recent notices.
            </div>
          ) : (
            notices.slice(0, 5).map((notice: any) => (
              <div
                key={notice._id}
                className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900 dark:text-white">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                    {notice.description}
                  </p>
                  <span className="text-xs text-neutral-400 mt-2 block">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <NoticeActions notice={notice} branch={branch} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
