"use client";

import { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import NoticeModal from "./NoticeModal";

interface Notice {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  pdfLink?: string;
  author?: string;
}

export default function NoticeBoardClient({ notices }: { notices: Notice[] }) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          {notices.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 dark:text-neutral-400">
              No notices found at the moment.
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  onClick={() => setSelectedNotice(notice)}
                  className="p-6 md:p-8 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
                        <Calendar size={14} />
                        {new Date(notice.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {notice.title}
                    </h2>
                  </div>
                  <ChevronRight className="text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <NoticeModal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        notice={selectedNotice}
      />
    </>
  );
}
