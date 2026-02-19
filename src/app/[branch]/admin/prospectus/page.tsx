"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import Link from "next/link";
import { getProspectus, deleteProspectus } from "@/actions/prospectus";
import { upload } from "@vercel/blob/client";

export default function AdminProspectusPage() {
  const [prospectusUrl, setProspectusUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formFile, setFormFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Delete State
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchProspectus();
  }, []);

  const fetchProspectus = async () => {
    setLoading(true);
    const res = await getProspectus();
    if (res.success && res.data) {
      setProspectusUrl(res.data.pdf.url);
    } else {
      setProspectusUrl(null);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a valid PDF file");
        setFormFile(null);
      } else {
        setFormFile(file);
      }
    } else {
      setFormFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFile) {
      toast.error("Please select a PDF file");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("file", formFile);

    try {
      setUploadProgress(0);

      // Direct client upload via Vercel Blob
      await upload(`prospectus-${Date.now()}.pdf`, formFile, {
        access: "public",
        handleUploadUrl: "/api/upload-prospectus",
        onUploadProgress: (progressEvent) => {
          if (progressEvent.percentage) {
            setUploadProgress(progressEvent.percentage);
          }
        },
      });

      // Database save is handled by Vercel Blob webhook (onUploadCompleted) automatically.
      toast.success("Prospectus uploaded and saved successfully");
      setFormFile(null);

      // Delay fetch slightly to allow webhook to complete updating MongoDB
      setTimeout(() => {
        fetchProspectus();
      }, 1000);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.message ||
          "An error occurred during upload. Do you have BLOB_READ_WRITE_TOKEN set?",
      );
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    const res = await deleteProspectus();
    if (res.success) {
      toast.success("Prospectus deleted successfully");
      fetchProspectus();
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          School Prospectus
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Upload and manage the common school prospectus PDF. This file is
          shared across all branches globally. Uploading a new PDF will
          automatically replace the old one.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Prospectus Display */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Current Prospectus
          </h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : prospectusUrl ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              <FileText size={64} className="text-red-500" />
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Global Prospectus Active
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Link
                    href={prospectusUrl}
                    target="_blank"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    View PDF
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500">
              <FileText size={48} className="mb-2 opacity-50" />
              <p>No prospectus uploaded yet.</p>
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {prospectusUrl ? "Replace Prospectus" : "Upload Prospectus"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  formFile
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 dark:border-gray-600 hover:border-primary"
                }`}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  {formFile ? (
                    <>
                      <FileText className="text-primary" size={32} />
                      <span className="text-sm text-primary font-medium truncate w-full px-4">
                        {formFile.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload size={32} />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Click to browse for a PDF
                        </p>
                        <p className="text-xs text-gray-500">PDF only.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

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
              {saving
                ? `Uploading (${uploadProgress}%)`
                : prospectusUrl
                  ? "Replace PDF"
                  : "Upload PDF"}
            </button>
          </form>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Prospectus"
        message="Are you sure you want to delete the school prospectus? The PDF link will no longer work until a new one is uploaded."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
