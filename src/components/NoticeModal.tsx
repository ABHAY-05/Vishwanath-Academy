"use client";

import { Calendar, FileText, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShareButtons from "./ShareButtons";

interface Notice {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  pdfLink?: string; // Standardize this field name
  file?: string; // Handle legacy field name if necessary, or better, normalise passed props
  author?: string;
}

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Notice | null;
}

export default function NoticeModal({
  isOpen,
  onClose,
  notice,
}: NoticeModalProps) {
  if (!isOpen || !notice) return null;

  // Handle both potentially used field names for the attachment
  const attachmentLink = notice.pdfLink || notice.file;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
      >
        <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl pointer-events-auto border border-neutral-200 dark:border-neutral-800 flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50 rounded-t-2xl">
            <div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
                Notice Details
              </p>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight">
                {notice.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X size={20} className="text-neutral-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto">
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar size={14} />
                Published on{" "}
                {new Date(notice.createdAt).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300">
              <p className="whitespace-pre-wrap leading-relaxed">
                {notice.description}
              </p>
            </div>

            {/* Footer / Actions */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
              {attachmentLink && (
                <a
                  href={attachmentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                >
                  <FileText size={18} />
                  View Attachment
                  <ExternalLink size={16} />
                </a>
              )}

              <ShareButtons
                title={notice.title}
                description={notice.description}
                url={typeof window !== "undefined" ? window.location.href : ""}
              />

              {notice.author && (
                <div className="text-sm text-neutral-500 font-medium pt-2">
                  Posted by:{" "}
                  <span className="text-neutral-900 dark:text-white font-semibold">
                    {notice.author}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
