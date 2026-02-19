"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Plus,
  Loader2,
  Save,
  X,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  getHighlightImage,
  updateHighlightImage,
  getBoardResults,
  addBoardResult,
  deleteBoardResult,
} from "@/actions/board-results";

interface BoardResult {
  _id: string;
  year: string;
  classX?: { url: string; publicId: string };
  classXII?: { url: string; publicId: string };
}

interface HighlightImage {
  url: string;
  publicId: string;
}

export default function AdminBoardResultsPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [branch, setBranch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"highlight" | "results">(
    "highlight",
  );

  // Highlight Image State
  const [highlightImage, setHighlightImage] = useState<HighlightImage | null>(
    null,
  );
  const [loadingHighlight, setLoadingHighlight] = useState(true);
  const [uploadingHighlight, setUploadingHighlight] = useState(false);
  const [highlightFile, setHighlightFile] = useState<File | null>(null);
  const [highlightPreview, setHighlightPreview] = useState<string | null>(null);

  // Results State
  const [results, setResults] = useState<BoardResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form State
  const [formYear, setFormYear] = useState("");
  const [formClassXFile, setFormClassXFile] = useState<File | null>(null);
  const [formClassXIIFile, setFormClassXIIFile] = useState<File | null>(null);
  const [savingResult, setSavingResult] = useState(false);

  // Delete State
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setBranch(p.branch);
      fetchHighlightImage(p.branch);
      fetchResults(p.branch);
    });
  }, [params]);

  const fetchHighlightImage = async (br: string) => {
    setLoadingHighlight(true);
    const res = await getHighlightImage(br);
    if (res.success && res.data) {
      setHighlightImage(res.data.highlightImage);
    }
    setLoadingHighlight(false);
  };

  const fetchResults = async (br: string) => {
    setLoadingResults(true);
    const res = await getBoardResults(br);
    if (res.success) {
      setResults(res.data);
    }
    setLoadingResults(false);
  };

  // Highlight Image Handlers
  const handleHighlightUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlightFile) return;

    setUploadingHighlight(true);
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("file", highlightFile);

    const res = await updateHighlightImage(formData);
    if (res.success) {
      toast.success("Highlight image updated");
      fetchHighlightImage(branch);
      setHighlightFile(null);
      setHighlightPreview(null);
    } else {
      toast.error(res.message);
    }
    setUploadingHighlight(false);
  };

  const handleHighlightFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setHighlightFile(file);
      setHighlightPreview(URL.createObjectURL(file));
    }
  };

  // Results Handlers
  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingResult(true);

    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("year", formYear);
    if (formClassXFile) formData.append("classXFile", formClassXFile);
    if (formClassXIIFile) formData.append("classXIIFile", formClassXIIFile);

    const res = await addBoardResult(formData);
    if (res.success) {
      toast.success("Result added successfully");
      fetchResults(branch);
      setIsSidebarOpen(false);
      // Reset form
      setFormYear("");
      setFormClassXFile(null);
      setFormClassXIIFile(null);
    } else {
      toast.error(res.message);
    }
    setSavingResult(false);
  };

  const handleDeleteResult = (id: string) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    setIsDeleting(true);
    const res = await deleteBoardResult(deleteConfirmation, branch);
    if (res.success) {
      toast.success("Result deleted");
      fetchResults(branch);
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
    setDeleteConfirmation(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Board Results Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage result highlights and yearly board exam data
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("highlight")}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === "highlight"
              ? "text-primary"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <ImageIcon size={18} />
            Result Highlight Image
          </div>
          {activeTab === "highlight" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === "results"
              ? "text-primary"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText size={18} />
            Yearly Results
          </div>
          {activeTab === "results" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Highlight Image Tab */}
      {activeTab === "highlight" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Image */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Current Highlight Image
            </h3>
            {loadingHighlight ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : highlightImage ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={highlightImage.url}
                  alt="Result Highlight"
                  fill
                  className="object-contain bg-gray-50 dark:bg-gray-900"
                />
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                No highlight image set.
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">
              This image will be displayed prominently at the top of the Board
              Results page.
            </p>
          </div>

          {/* Upload New */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Update Highlight Image
            </h3>
            <form onSubmit={handleHighlightUpload} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative min-h-[200px] flex flex-col items-center justify-center">
                {highlightPreview ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={highlightPreview}
                      alt="Preview"
                      fill
                      className="object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setHighlightFile(null);
                        setHighlightPreview(null);
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHighlightFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload size={24} />
                      <span>Click to select new image</span>
                    </div>
                  </>
                )}
              </div>
              <button
                type="submit"
                disabled={!highlightFile || uploadingHighlight}
                className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-secondary hover:text-black transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {uploadingHighlight ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Upload size={18} />
                )}
                {uploadingHighlight ? "Uploading..." : "Update Image"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === "results" && (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:text-black transition-colors"
            >
              <Plus size={18} />
              Add Result Year
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    S.No.
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Class X Image
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Class XII Image
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loadingResults ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="animate-spin mx-auto text-primary" />
                    </td>
                  </tr>
                ) : results.length > 0 ? (
                  results.map((result, idx) => (
                    <tr
                      key={result._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {idx + 1}.
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-bold">
                        {result.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {result.classX ? (
                          <span className="text-green-600 font-medium">
                            Uploaded
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {result.classXII ? (
                          <span className="text-green-600 font-medium">
                            Uploaded
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteResult(result._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

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
                Add Board Result
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleResultSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024-2025"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class X Result Image
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors ${formClassXFile ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-600"}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormClassXFile(
                          e.target.files ? e.target.files[0] : null,
                        )
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      {formClassXFile ? (
                        <>
                          <ImageIcon className="text-primary" size={24} />
                          <span className="text-sm text-primary font-medium truncate w-48">
                            {formClassXFile.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload size={24} />
                          <span className="text-sm">Upload Class X Result</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class XII Result Image
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors ${formClassXIIFile ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-600"}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormClassXIIFile(
                          e.target.files ? e.target.files[0] : null,
                        )
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      {formClassXIIFile ? (
                        <>
                          <ImageIcon className="text-primary" size={24} />
                          <span className="text-sm text-primary font-medium truncate w-48">
                            {formClassXIIFile.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload size={24} />
                          <span className="text-sm">
                            Upload Class XII Result
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={savingResult}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary/25"
                >
                  {savingResult ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {savingResult ? "Saving..." : "Save Result"}
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
        title="Delete Result"
        message="Are you sure you want to delete this result entry? All associated images will be deleted."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
