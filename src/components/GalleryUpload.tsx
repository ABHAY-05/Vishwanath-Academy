"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";
import { uploadGalleryImage } from "@/actions/gallery";
import { toast } from "sonner";

interface GalleryUploadProps {
  branch: string;
}

export default function GalleryUpload({ branch }: GalleryUploadProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "gallery",
  });

  const categories = [
    { value: "all", label: "All" },
    { value: "class_group", label: "Class Group Image" },
    { value: "school_memories", label: "School Memories" },
    { value: "gallery", label: "Gallery" },
    { value: "art_craft", label: "Art and Craft Room" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("branch", branch);

    try {
      const res = await uploadGalleryImage(data);
      if (res.success) {
        clearFile();
        setFormData({ title: "", category: "gallery" });
        toast.success("Image uploaded successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
        Upload New Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Drop Area */}
        <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-center">
          {previewUrl ? (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg"
              />
              <button
                type="button"
                onClick={clearFile}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Click or drag image to upload
                </p>
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Title (Optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="E.g., Sports Day 2024"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Category (Tag)
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories
                .filter((c) => c.value !== "all")
                .map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}
            Upload Image
          </button>
        </div>
      </form>
    </div>
  );
}
