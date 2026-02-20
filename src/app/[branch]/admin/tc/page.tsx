"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Plus,
  Loader2,
  X,
  FileText as FileIcon,
  Search,
  Save,
  FileKey,
} from "lucide-react";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  getTransferCertificates,
  uploadTransferCertificate,
  deleteTransferCertificate,
} from "@/actions/transferCertificate";
import AdminPageGuard from "@/components/AdminPageGuard";

interface TransferCertificate {
  _id: string;
  admissionNumber: string;
  file: { url: string; publicId: string };
  createdAt: string;
}

export default function AdminTCPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [branch, setBranch] = useState<string>("");
  const [tcs, setTcs] = useState<TransferCertificate[]>([]);
  const [filteredTcs, setFilteredTcs] = useState<TransferCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formAdmissionNumber, setFormAdmissionNumber] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteData, setDeleteData] = useState<{
    id: string;
    publicId: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setBranch(p.branch);
      fetchTCs(p.branch);
    });
  }, [params]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTcs(tcs);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredTcs(
        tcs.filter((tc) =>
          tc.admissionNumber.toLowerCase().includes(lowerQuery),
        ),
      );
    }
  }, [searchQuery, tcs]);

  const fetchTCs = async (branchName: string) => {
    setLoading(true);
    const res = await getTransferCertificates(branchName);
    if (res.success) {
      setTcs(res.data);
      setFilteredTcs(res.data);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFile) {
      toast.error("Please select a file to upload");
      return;
    }

    // File size check: 10MB limit (10 * 1024 * 1024 bytes)
    if (formFile.size > 10485760) {
      toast.error("File size must be less than 10MB");
      return;
    }

    if (!formAdmissionNumber.trim()) {
      toast.error("Please enter an admission number");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("admissionNumber", formAdmissionNumber);
    formData.append("file", formFile);

    const res = await uploadTransferCertificate(formData);
    if (res.success) {
      toast.success("Transfer Certificate uploaded successfully");
      fetchTCs(branch);
      setIsSidebarOpen(false);
      // Reset form
      setFormAdmissionNumber("");
      setFormFile(null);
    } else {
      toast.error(res.message);
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteData) return;
    setIsDeleting(true);
    const res = await deleteTransferCertificate(
      deleteData.id,
      deleteData.publicId,
      branch,
    );
    if (res.success) {
      toast.success("Transfer Certificate deleted");
      fetchTCs(branch);
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
    setDeleteData(null);
  };

  return (
    <AdminPageGuard requiredPermissionId="tc">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FileKey className="w-8 h-8 text-primary dark:text-secondary" />
              Transfer Certificates
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage student TCs for the {branch} branch. (Max Size: 10MB)
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Admission No..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
              />
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:text-black transition-colors whitespace-nowrap shrink-0"
            >
              <Plus size={18} />
              Upload TC
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary dark:text-secondary" size={32} />
            </div>
          ) : filteredTcs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-sm">
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                      Admission No.
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                      File Type
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                      Uploaded Date
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredTcs.map((item) => {
                    const isImage =
                      item.file.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !=
                      null;

                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          {item.admissionNumber}
                        </td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                          {isImage ? "Image" : "PDF Document"}
                        </td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <a
                            href={item.file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 text-primary dark:text-secondary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View Document"
                          >
                            <FileIcon size={18} />
                          </a>
                          <button
                            onClick={() =>
                              setDeleteData({
                                id: item._id,
                                publicId: item.file.publicId,
                              })
                            }
                            className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete TC"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center text-gray-500">
              <FileKey
                size={48}
                className="mx-auto text-gray-400 mb-4 opacity-50"
              />
              <p className="text-lg">
                {searchQuery
                  ? "No TCs match your search criteria."
                  : "No Transfer Certificates have been uploaded yet."}
              </p>
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
                  Upload Transfer Certificate
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
                    Admission Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admission number"
                    value={formAdmissionNumber}
                    onChange={(e) => setFormAdmissionNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow uppercase font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be unique for this branch.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Certificate File (PDF or Image){" "}
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
                      accept="application/pdf,image/*"
                      required
                      onChange={(e) =>
                        setFormFile(e.target.files ? e.target.files[0] : null)
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      {formFile ? (
                        <>
                          <FileIcon className="text-primary dark:text-secondary" size={24} />
                          <span className="text-sm text-primary dark:text-secondary font-medium truncate w-48">
                            {formFile.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {(formFile.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload size={24} />
                          <span className="text-sm">
                            Click to upload document
                          </span>
                          <span className="text-xs">Max size: 10MB</span>
                        </>
                      )}
                    </div>
                  </div>
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
                    {saving ? "Uploading..." : "Save Certificate"}
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
          title="Delete Transfer Certificate"
          message="Are you sure you want to delete this Transfer Certificate? Ensure the student no longer requires it."
          confirmText="Delete"
          isLoading={isDeleting}
          variant="danger"
        />
      </div>
    </AdminPageGuard>
  );
}
