"use client";

import { useState } from "react";
import { deleteBlog } from "@/actions/blog";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function DeleteBlogButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        toast.success("Blog deleted successfully");
        setIsOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
        title="Delete Blog"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => !isDeleting && setIsOpen(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
