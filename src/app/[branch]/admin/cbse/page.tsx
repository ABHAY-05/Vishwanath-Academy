"use client";

import { useState, useEffect, use } from "react";
import {
  Loader2,
  Upload,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Save,
  Edit3,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  getCBSESections,
  seedCBSESections,
  updateCBSERowText,
  uploadCBSELinkDocument,
} from "@/actions/cbseSection";
import AdminPageGuard from "@/components/AdminPageGuard";

interface LinkCell {
  type: "link";
  label: string;
  url: string;
}

type CellData = string | LinkCell;

interface TableRow {
  data: CellData[];
}

interface CBSESectionData {
  _id: string;
  branch: string;
  title: string;
  showNote: boolean;
  headers: string[];
  rows: TableRow[];
}

const isLinkCell = (cell: unknown): cell is LinkCell => {
  return (
    typeof cell === "object" &&
    cell !== null &&
    (cell as LinkCell).type === "link"
  );
};

export default function CBSEAdminPage({
  params,
}: {
  params: Promise<{ branch: "aashiana" | "dhawapur" }>;
}) {
  const { branch } = use(params);
  const [sections, setSections] = useState<CBSESectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  // Edit State
  const [editingCell, setEditingCell] = useState<{
    sectionId: string;
    rowIdx: number;
    colIdx: number;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Upload State
  const [uploadingCell, setUploadingCell] = useState<{
    sectionId: string;
    rowIdx: number;
    colIdx: number;
  } | null>(null);

  useEffect(() => {
    fetchSections();
  }, [branch]);

  const fetchSections = async () => {
    setLoading(true);
    const res = await getCBSESections(branch);
    if (res.success && res.data) {
      setSections(res.data);
    } else {
      setSections([]);
    }
    setLoading(false);
  };

  const handleSeed = async () => {
    setSeeding(true);
    const res = await seedCBSESections(branch);
    if (res.success) {
      toast.success(res.message);
      fetchSections();
    } else {
      toast.error(res.message);
    }
    setSeeding(false);
  };

  const handleEditStart = (
    sectionId: string,
    rowIdx: number,
    colIdx: number,
    currentValue: string,
  ) => {
    setEditingCell({ sectionId, rowIdx, colIdx });
    setEditValue(currentValue);
  };

  const handleEditSave = async () => {
    if (!editingCell) return;
    setSavingEdit(true);
    const res = await updateCBSERowText(
      editingCell.sectionId,
      editingCell.rowIdx,
      editingCell.colIdx,
      editValue,
    );
    if (res.success) {
      toast.success("Row updated");
      setEditingCell(null);
      // Optimistic locally
      setSections((prev) =>
        prev.map((sec) => {
          if (sec._id === editingCell.sectionId) {
            const newRows = [...sec.rows];
            newRows[editingCell.rowIdx].data[editingCell.colIdx] = editValue;
            return { ...sec, rows: newRows };
          }
          return sec;
        }),
      );
    } else {
      toast.error(res.message);
    }
    setSavingEdit(false);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: string,
    rowIdx: number,
    colIdx: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");

    if (!isPdf && !isImage) {
      toast.error("File must be a PDF or Image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be smaller than 10MB");
      return;
    }

    setUploadingCell({ sectionId, rowIdx, colIdx });

    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("rowIndex", rowIdx.toString());
    formData.append("colIndex", colIdx.toString());
    formData.append("file", file);
    formData.append("fileType", isPdf ? "pdf" : "image");

    const res = await uploadCBSELinkDocument(formData);

    if (res.success) {
      toast.success("Document uploaded successfully");
      fetchSections(); // Refresh fully to get new URLs
    } else {
      toast.error(res.message || "Failed to upload");
    }
    setUploadingCell(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-secondary" />
      </div>
    );
  }

  return (
    <AdminPageGuard requiredPermissionId="cbse">
      <div className="p-6 max-w-7xl mx-auto pb-32">
        <div className="mb-8 border-b dark:border-gray-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary dark:text-secondary" />
              CBSE Disclosure Editor
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
              Edit text rows or upload compliance documents (PDF/Image) for the
              public CBSE Disclosure page.
            </p>
          </div>

          {sections.length === 0 && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="bg-primary hover:bg-secondary text-white hover:text-black hover:scale-105 transition-all px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm"
            >
              {seeding ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              {seeding ? "Initializing..." : "Seed Default Tables"}
            </button>
          )}
        </div>

        <div className="space-y-12">
          {sections.length === 0 && !seeding && (
            <div className="bg-orange-50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-200 p-8 rounded-2xl border border-orange-200 dark:border-orange-900 font-medium text-center">
              No CBSE tables found in the database. Click 'Seed Default Tables'
              to generate the initial structure for this branch.
            </div>
          )}

          {sections.map((section) => (
            <div
              key={section._id}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {section.title}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-primary/5 dark:bg-primary/10 border-b border-gray-200 dark:border-gray-800">
                      {section.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-6 py-4 text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {section.rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-blue-50/30 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        {row.data.map((cell, colIdx) => {
                          const isEditTarget =
                            editingCell?.sectionId === section._id &&
                            editingCell?.rowIdx === rowIdx &&
                            editingCell?.colIdx === colIdx;
                          const isUploadTarget =
                            uploadingCell?.sectionId === section._id &&
                            uploadingCell?.rowIdx === rowIdx &&
                            uploadingCell?.colIdx === colIdx;

                          if (isLinkCell(cell)) {
                            // Render Upload/Link Area
                            return (
                              <td
                                key={colIdx}
                                className="px-6 py-5 align-middle"
                              >
                                <div className="flex items-center gap-3">
                                  {cell.url !== "#" && (
                                    <a
                                      href={cell.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="shrink-0 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-colors"
                                    >
                                      {cell.label === "PDF" ? (
                                        <FileText className="w-3 h-3" />
                                      ) : (
                                        <ImageIcon className="w-3 h-3" />
                                      )}
                                      {cell.label}
                                    </a>
                                  )}

                                  <input
                                    type="file"
                                    id={`file-${section._id}-${rowIdx}-${colIdx}`}
                                    className="hidden"
                                    accept=".pdf,image/*"
                                    onChange={(e) =>
                                      handleFileUpload(
                                        e,
                                        section._id,
                                        rowIdx,
                                        colIdx,
                                      )
                                    }
                                    disabled={isUploadTarget}
                                  />
                                  <label
                                    htmlFor={`file-${section._id}-${rowIdx}-${colIdx}`}
                                    className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${isUploadTarget ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                                  >
                                    {isUploadTarget ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <Upload className="w-3 h-3" />
                                    )}
                                    {isUploadTarget
                                      ? "Uploading..."
                                      : "Upload New"}
                                  </label>
                                </div>
                              </td>
                            );
                          }

                          // Render Text Cell
                          return (
                            <td
                              key={colIdx}
                              className="px-6 py-5 text-sm text-gray-700 dark:text-gray-300 align-top"
                            >
                              {isEditTarget ? (
                                <div className="flex items-center gap-2">
                                  <textarea
                                    autoFocus
                                    value={editValue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                    className="w-full min-h-[80px] p-3 text-sm rounded-xl border-2 border-primary/50 bg-white dark:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium leading-relaxed"
                                  />
                                  <button
                                    onClick={handleEditSave}
                                    disabled={savingEdit}
                                    className="p-3 bg-primary text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 shrink-0 shadow-sm hover:shadow-md transition-all"
                                  >
                                    {savingEdit ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => setEditingCell(null)}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 shrink-0 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="group flex justify-between items-start gap-4">
                                  <div className="whitespace-pre-wrap leading-relaxed min-h-[24px]">
                                    {String(cell) || (
                                      <span className="text-gray-400 italic">
                                        Empty
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleEditStart(
                                        section._id,
                                        rowIdx,
                                        colIdx,
                                        String(cell),
                                      )
                                    }
                                    className="opacity-0 group-hover:opacity-100 p-2 text-primary dark:text-secondary hover:bg-primary/10 rounded-lg transition-all shrink-0"
                                    aria-label="Edit cell"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageGuard>
  );
}
