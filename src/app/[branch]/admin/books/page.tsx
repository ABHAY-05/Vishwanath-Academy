"use client";

import { useState, useEffect } from "react";
import { Loader2, Upload, Trash2, BookOpen, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  uploadBookList,
  getBookLists,
  deleteBookList,
} from "@/actions/bookList";
import { booksAndStationary } from "@/data/academics-data";
import ConfirmationModal from "@/components/ConfirmationModal";
import AdminPageGuard from "@/components/AdminPageGuard";

interface BookListData {
  _id: string;
  className: string;
  file: { url: string; publicId: string };
  createdAt: string;
  updatedAt: string;
}

export default function BooksAdminPage() {
  const [documents, setDocuments] = useState<BookListData[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<BookListData | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const predefinedClasses = booksAndStationary.classes;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    const res = await getBookLists();
    if (res.success && res.data) {
      setDocuments(res.data);
    } else {
      setDocuments([]);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) {
      toast.error("Please select a class");
      return;
    }
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("File must be a PDF document.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("PDF must be smaller than 10MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("className", selectedClass);
    formData.append("file", file);

    const res = await uploadBookList(formData);

    if (res.success) {
      toast.success(res.message);
      setFile(null);
      setSelectedClass("");
      fetchDocuments();
    } else {
      toast.error(res.message || "Failed to upload Planner");
    }
    setIsUploading(false);
  };

  const confirmDelete = (doc: BookListData) => {
    setDocumentToDelete(doc);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!documentToDelete) return;
    setIsDeleting(true);
    const res = await deleteBookList(
      documentToDelete._id,
      documentToDelete.file.publicId,
    );
    if (res.success) {
      toast.success(res.message);
      setDocuments((prev) =>
        prev.filter((d) => d._id !== documentToDelete._id),
      );
      setIsDeleteDialogOpen(false);
      setDocumentToDelete(null);
    } else {
      toast.error(res.message || "Failed to delete.");
    }
    setIsDeleting(false);
  };

  return (
    <AdminPageGuard requiredPermissionId="books">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8 border-b dark:border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary dark:text-secondary" />
            Books & Stationary Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-3xl">
            Upload PDF documents containing book lists for specific classes.
            This setting is global; the documents uploaded here will appear on
            the{" "}
            <span className="font-semibold text-primary dark:text-secondary">
              Academics &gt; Books & Stationary
            </span>{" "}
            page for both branches. Maximum file size is 10MB per PDF.
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* UPLOAD PANEL */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 relative overflow-hidden sticky top-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <h2 className="text-xl font-bold mb-4 font-display">
              Upload New List
            </h2>

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target Class *
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                >
                  <option value="" disabled>
                    Select a Class
                  </option>
                  {predefinedClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      Class {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors group cursor-pointer ${
                  file
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 dark:border-gray-700 hover:border-primary/50"
                }`}
                onClick={() =>
                  document.getElementById("booklist-upload")?.click()
                }
              >
                <input
                  id="booklist-upload"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center gap-3 text-primary dark:text-secondary">
                    <FileText className="w-16 h-16 text-red-500" />
                    <p className="font-bold truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-primary/70 font-medium">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to
                      Upload
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 dark:text-gray-300">
                        Browse Book List PDF
                      </p>
                      <p className="text-sm mt-1">PDF Only (Max 10MB)</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isUploading || !file || !selectedClass}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
              >
                {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isUploading ? "Uploading..." : "Publish Book List"}
              </button>
            </form>
          </div>

          {/* ACTIVE DOCUMENTS PANEL */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">
                Active Book Lists ({documents.length})
              </h2>
            </div>

            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-secondary" />
                </div>
              ) : documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="relative group rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg leading-tight">
                              Class {doc.className}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(doc.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-auto pt-2">
                        <a
                          href={doc.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-2 rounded-lg text-center transition-colors text-xs"
                        >
                          View PDF
                        </a>
                        <button
                          onClick={() => confirmDelete(doc)}
                          className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-semibold py-2 rounded-lg text-center transition-colors text-xs flex justify-center items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-600 py-16 flex flex-col items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <FileText className="w-16 h-16 opacity-30" />
                  <div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      No book lists have been uploaded yet.
                    </p>
                    <p className="text-sm mt-1 max-w-[300px] mx-auto">
                      Use the panel on the left to select a class and upload its
                      corresponding PDF.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Delete Book List"
          message={`Are you sure you want to delete the Book List for Class ${documentToDelete?.className}? This action cannot be undone.`}
          confirmText="Delete Book List"
          isLoading={isDeleting}
          variant="danger"
        />
      </div>
    </AdminPageGuard>
  );
}
