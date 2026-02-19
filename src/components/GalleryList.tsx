"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { deleteGalleryImage } from "@/actions/gallery";
import Image from "next/image";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";

interface GalleryListProps {
  images: any[];
  branch: string;
}

export default function GalleryList({ images, branch }: GalleryListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null,
  );

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    setDeletingId(deleteConfirmation);
    try {
      const res = await deleteGalleryImage(deleteConfirmation, branch);
      if (!res.success) {
        toast.error(res.error || "Failed to delete image");
      } else {
        toast.success("Image deleted");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
      setDeleteConfirmation(null);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="p-8 text-center text-neutral-500 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
        No images found. Upload your first image above!
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800"
          >
            <div className="relative aspect-square">
              <Image
                src={img.url}
                alt={img.title || "Gallery Image"}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleDeleteClick(img._id)}
                  disabled={!!deletingId}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  {deletingId === img._id ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white font-medium capitalize">
                {img.category.replace("_", " ")}
              </div>
            </div>

            {img.title && (
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                  {img.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={confirmDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        isLoading={!!deletingId}
      />
    </>
  );
}
