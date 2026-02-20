"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Plus,
  Loader2,
  X,
  Image as ImageIcon,
  Save,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  getPressReleases,
  uploadPressRelease,
  deletePressRelease,
} from "@/actions/pressRelease";
import AdminPageGuard from "@/components/AdminPageGuard";

interface PressRelease {
  _id: string;
  image: { url: string; publicId: string };
  title: string;
}

export default function AdminPressReleasePage() {
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteData, setDeleteData] = useState<{
    id: string;
    publicId: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    setLoading(true);
    const res = await getPressReleases();
    if (res.success) {
      setReleases(res.data);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFile) {
      toast.error("Please select an image");
      return;
    }
    if (!formTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("title", formTitle);
    formData.append("file", formFile);

    const res = await uploadPressRelease(formData);
    if (res.success) {
      toast.success("Press Release added successfully");
      fetchReleases();
      setIsSidebarOpen(false);
      // Reset form
      setFormTitle("");
      setFormFile(null);
    } else {
      toast.error(res.message);
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteData) return;
    setIsDeleting(true);
    const res = await deletePressRelease(deleteData.id, deleteData.publicId);
    if (res.success) {
      toast.success("Press Release deleted");
      fetchReleases();
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
    setDeleteData(null);
  };

  return (
    <AdminPageGuard requiredPermissionId="press">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Press Releases
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage newspaper clippings and press coverage shown in the
              Students Corner.
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:text-black transition-colors"
          >
            <Plus size={18} />
            Add Release
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : releases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {releases.map((item) => (
                <div
                  key={item._id}
                  className="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] w-full bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() =>
                          setDeleteData({
                            id: item._id,
                            publicId: item.image.publicId,
                          })
                        }
                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
                        title="Delete Press Release"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p
                      className="font-semibold text-gray-900 dark:text-gray-100 truncate"
                      title={item.title}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-500">
              <Newspaper
                size={48}
                className="mx-auto text-gray-400 mb-4 opacity-50"
              />
              <p className="text-lg">No press releases found.</p>
            </div>
          )}
        </div>

        {/* Sidebar Form */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Add Press Release
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Newspaper Clipping / Image{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors ${
                      formFile
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) =>
                        setFormFile(e.target.files ? e.target.files[0] : null)
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      {formFile ? (
                        <>
                          <ImageIcon className="text-primary" size={24} />
                          <span className="text-sm text-primary font-medium truncate w-48">
                            {formFile.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload size={24} />
                          <span className="text-sm">Click to upload image</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title / Headline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Times of India - Annual Function"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving || !formFile}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                    {saving ? "Uploading..." : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}

        <ConfirmationModal
          isOpen={!!deleteData}
          onClose={() => setDeleteData(null)}
          onConfirm={confirmDelete}
          title="Delete Press Release"
          message="Are you sure you want to delete this press release? The image will be permanently removed."
          confirmText="Delete"
          isLoading={isDeleting}
          variant="danger"
        />
      </div>
    </AdminPageGuard>
  );
}
