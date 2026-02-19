import NoticeCreateForm from "@/components/NoticeCreateForm";
import { getNotices } from "@/actions/notice";
import NoticeActions from "@/components/NoticeActions";

export default async function NoticeEditor({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;

  const notices = await getNotices(branch);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Notice Board Editor
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Create and manage notices for {branch} branch.
          </p>
        </div>
      </div>

      {/* Create Notice Form (Client Component) */}
      <NoticeCreateForm branch={branch} />

      {/* Existing Notices List */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            Published Notices
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {notices.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              No notices found.
            </div>
          ) : (
            notices.map((notice: any) => (
              <div
                key={notice._id}
                className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                    {notice.author && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded-full">
                        By {notice.author}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2">
                    {notice.description}
                  </p>
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
