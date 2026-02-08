"use client";

import { useState } from "react";
import { Edit, Trash2, X, AlertTriangle } from "lucide-react";
import { updateNotice, deleteNotice } from "@/actions/notice";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Notice {
  _id: string;
  title: string;
  description: string;
  pdfLink?: string;
  createdAt: string;
}

export default function NoticeActions({
  notice,
  branch,
}: {
  notice: Notice;
  branch: string;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    setIsLoading(true);
    try {
      await updateNotice(notice._id, branch, formData);
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update notice", error);
      alert("Failed to update notice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    setIsLoading(true);
    try {
      await deleteNotice(notice._id, branch);
      setIsDeleteOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete notice", error);
      alert("Failed to delete notice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 self-start sm:self-center">
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-1"
        >
          <Edit size={14} />
          Edit
        </button>
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Delete Notice"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Edit Notice
                </h3>
                <button
                  onClick={() => setIsEditOpen(false)}
                  disabled={isLoading}
                  className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>
              <form action={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={notice.title}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={
                      new Date(notice.createdAt).toISOString().split("T")[0]
                    }
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={notice.description}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    PDF or Image Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="pdfLink"
                    defaultValue={notice.pdfLink}
                    placeholder="https://example.com/file.pdf"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-neutral-200 dark:border-neutral-800 p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-500">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Delete Notice?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">"{notice.title}"</span>? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
