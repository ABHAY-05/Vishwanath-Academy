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
  Trophy,
  Edit,
  Check,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  getSchoolAwards,
  addSchoolAward,
  deleteSchoolAward,
  updateSchoolAwardDescription,
} from "@/actions/school-awards";

interface SchoolAward {
  _id: string;
  image: { url: string; publicId: string };
  description: string;
}

export default function AdminSchoolAwardsPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [branch, setBranch] = useState<string>("");
  const [awards, setAwards] = useState<SchoolAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form State
  const [formDescription, setFormDescription] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit State
  const [editingAwardId, setEditingAwardId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setBranch(p.branch);
      fetchAwards();
    });
  }, [params]);

  const fetchAwards = async () => {
    setLoading(true);
    const res = await getSchoolAwards();
    if (res.success) {
      setAwards(res.data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFile) {
      toast.error("Please select an image");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("description", formDescription);
    formData.append("file", formFile);

    const res = await addSchoolAward(formData);
    if (res.success) {
      toast.success("Award added successfully");
      fetchAwards();
      setIsSidebarOpen(false);
      // Reset form
      setFormDescription("");
      setFormFile(null);
    } else {
      toast.error(res.message);
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    setIsDeleting(true);
    const res = await deleteSchoolAward(deleteConfirmation);
    if (res.success) {
      toast.success("Award deleted");
      fetchAwards();
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
    setDeleteConfirmation(null);
  };

  const handleStartEdit = (award: SchoolAward) => {
    setEditingAwardId(award._id);
    setEditDescription(award.description);
  };

  const handleCancelEdit = () => {
    setEditingAwardId(null);
    setEditDescription("");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editDescription.trim()) {
      toast.error("Description cannot be empty");
      return;
    }

    setIsEditing(true);
    const res = await updateSchoolAwardDescription(id, editDescription);

    if (res.success) {
      toast.success("Description updated successfully");
      setAwards((prev) =>
        prev.map((award) =>
          award._id === id ? { ...award, description: editDescription } : award,
        ),
      );
      handleCancelEdit();
    } else {
      toast.error(res.message || "Failed to update description");
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            School Awards
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage student and school awards displayed on the results page.
          </p>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:text-black transition-colors"
        >
          <Plus size={18} />
          Add Award
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : awards.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {awards.map((award) => (
              <li
                key={award._id}
                className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="relative w-full md:w-64 aspect-video rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={award.image.url}
                    alt="Award Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col pt-1">
                  <div className="flex justify-between items-start gap-4">
                    {editingAwardId === award._id ? (
                      <div className="w-full">
                        <textarea
                          rows={4}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-shadow mb-2 resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(award._id)}
                            disabled={isEditing}
                            className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-secondary hover:text-black transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            {isEditing ? (
                              <Loader2 className="animate-spin" size={14} />
                            ) : (
                              <Check size={14} />
                            )}
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            disabled={isEditing}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed flex-1">
                        {award.description}
                      </p>
                    )}

                    {!editingAwardId && (
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleStartEdit(award)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation(award._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16 text-center text-gray-500">
            <Trophy
              size={48}
              className="mx-auto text-gray-400 mb-4 opacity-50"
            />
            <p className="text-lg">No awards have been added yet.</p>
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
                Add New Award
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
                  Award Image <span className="text-red-500">*</span>
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
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Enter award details. You can use multiple lines..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow resize-none"
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
                  {saving ? "Saving..." : "Save Award"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}

      <ConfirmationModal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={confirmDelete}
        title="Delete Award"
        message="Are you sure you want to delete this award? The image will be permanently removed."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
