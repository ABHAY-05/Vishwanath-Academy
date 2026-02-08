"use client";

import { createNotice } from "@/actions/notice";
import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NoticeCreateForm({ branch }: { branch: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await createNotice(formData);
      formRef.current?.reset();
      router.refresh();
    } catch (error) {
      console.error("Failed to create notice", error);
      alert("Failed to create notice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
        Create New Notice
      </h2>
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <input type="hidden" name="branch" value={branch} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. School Closed Tomorrow"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Pubish Date
            </label>
            <input
              type="date"
              name="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              PDF or Image Link (Optional)
            </label>
            <input
              type="url"
              name="pdfLink"
              placeholder="https://example.com/file.pdf"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Write the details of the notice here..."
            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-4 h-4" />
          {isLoading ? "Publishing..." : "Publish Notice"}
        </button>
      </form>
    </div>
  );
}
