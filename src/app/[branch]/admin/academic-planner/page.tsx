"use client";

import { useState, useEffect, use } from "react";
import { Loader2, Upload, Trash2, CalendarDays, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  uploadAcademicPlanner,
  getAcademicPlanner,
  deleteAcademicPlanner,
} from "@/actions/academicPlanner";
import ConfirmationModal from "@/components/ConfirmationModal";
import AdminPageGuard from "@/components/AdminPageGuard";

interface AcademicPlannerData {
  _id: string;
  branch: string;
  file: { url: string; publicId: string };
  createdAt: string;
  updatedAt: string;
}

export default function AcademicPlannerAdminPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = use(params);
  const [currentDocument, setCurrentDocument] =
    useState<AcademicPlannerData | null>(null);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, [branch]);

  const fetchDocument = async () => {
    setLoading(true);
    const res = await getAcademicPlanner(branch);
    if (res.success && res.data) {
      setCurrentDocument(res.data);
    } else {
      setCurrentDocument(null);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
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
    formData.append("branch", branch);
    formData.append("file", file);

    const res = await uploadAcademicPlanner(formData);

    if (res.success) {
      toast.success("Academic Planner uploaded successfully!");
      setFile(null);
      fetchDocument();
    } else {
      toast.error(res.message || "Failed to upload Planner");
    }
    setIsUploading(false);
  };

  const handleDelete = async () => {
    if (!currentDocument) return;
    setIsDeleting(true);
    const res = await deleteAcademicPlanner(
      currentDocument._id,
      currentDocument.file.publicId,
      branch,
    );
    if (res.success) {
      toast.success("Academic Planner deleted.");
      setCurrentDocument(null);
      setIsDeleteDialogOpen(false);
    } else {
      toast.error(res.message || "Failed to delete.");
    }
    setIsDeleting(false);
  };

  const formattedDate = currentDocument
    ? new Date(currentDocument.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <AdminPageGuard requiredPermissionId="academic-planner">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8 border-b dark:border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-primary" />
            Yearly Academic Planner
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-3xl">
            Upload the Yearly Academic Planner PDF for the{" "}
            <span className="font-semibold text-primary capitalize">
              {branch}
            </span>{" "}
            branch. This PDF will be directly accessible from the "Students
            Corner" dropdown in the main navigation menu.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* UPLOAD PANEL */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <h2 className="text-xl font-bold mb-4 font-display">
                Upload New Planner
              </h2>

              <form onSubmit={handleUpload} className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors group cursor-pointer ${
                    file
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 dark:border-gray-700 hover:border-primary/50"
                  }`}
                  onClick={() =>
                    document.getElementById("planner-upload")?.click()
                  }
                >
                  <input
                    id="planner-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  {file ? (
                    <div className="flex flex-col items-center gap-3 text-primary">
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
                          Click to browse or drag and drop
                        </p>
                        <p className="text-sm mt-1">PDF File (Max. 10MB)</p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !file}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                >
                  {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isUploading
                    ? "Uploading & Processing..."
                    : currentDocument
                      ? "Replace Existing Planner"
                      : "Upload Planner PDF"}
                </button>
              </form>
            </div>

            {/* ACTIVE DOCUMENT PANEL */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-display">
                  Live Document
                </h2>
                {currentDocument && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    Active Links
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center items-center">
                {currentDocument ? (
                  <div className="w-full relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-red-600 dark:text-red-400" />
                    </div>

                    <div className="text-center w-full">
                      <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                        Academic_Planner_{branch.toUpperCase()}.pdf
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Last updated: {formattedDate}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-4 w-full">
                      <a
                        href={currentDocument.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 rounded-lg text-center transition-colors text-sm"
                      >
                        View Real PDF
                      </a>
                      <button
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-semibold py-3 rounded-lg text-center transition-colors text-sm flex justify-center items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-600 py-12 flex flex-col items-center gap-4">
                    <CalendarDays className="w-16 h-16 opacity-30" />
                    <p className="text-lg font-medium">
                      No planner is active for {branch}.
                    </p>
                    <p className="text-sm max-w-[250px]">
                      The "Academic Planner" link in the Students Corner
                      navigation menu will be hidden until you upload a
                      document.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Remove Academic Planner"
          message={`Are you sure you want to delete the Yearly Academic Planner PDF for ${branch}? The public download link will be instantly removed from the website.`}
          confirmText="Remove Planner"
          isLoading={isDeleting}
          variant="danger"
        />
      </div>
    </AdminPageGuard>
  );
}
