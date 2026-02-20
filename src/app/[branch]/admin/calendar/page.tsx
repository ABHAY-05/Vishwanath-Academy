"use client";

import { useState, useEffect, use } from "react";
import {
  Loader2,
  Upload,
  Calendar,
  FileText,
  Save,
  Edit3,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  getActivityCalendarSections,
  seedActivityCalendarSections,
  updateActivityEventText,
  uploadActivityCalendarPDF,
  deleteActivityCalendarPDF,
} from "@/actions/activityCalendar";
import AdminPageGuard from "@/components/AdminPageGuard";
import ConfirmationModal from "@/components/ConfirmationModal";

interface CalendarEventData {
  month: string;
  activity: string;
  pdfUrl: string | null;
  pdfPublicId: string | null;
}

interface ActivityCalendarSectionData {
  _id: string;
  className: string;
  events: CalendarEventData[];
}

export default function CalendarAdminPage({
  params,
}: {
  params: Promise<{ branch: "aashiana" | "dhawapur" }>;
}) {
  const { branch } = use(params);
  const [sections, setSections] = useState<ActivityCalendarSectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  // Edit State
  const [editingCell, setEditingCell] = useState<{
    sectionId: string;
    eventIdx: number;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete State
  const [deleteData, setDeleteData] = useState<{
    sectionId: string;
    eventIdx: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Upload/Delete State
  const [processingPdf, setProcessingPdf] = useState<{
    sectionId: string;
    eventIdx: number;
  } | null>(null);

  useEffect(() => {
    fetchSections();
  }, [branch]);

  const fetchSections = async () => {
    setLoading(true);
    const res = await getActivityCalendarSections();
    if (res.success && res.data) {
      setSections(res.data);
    } else {
      setSections([]);
    }
    setLoading(false);
  };

  const handleSeed = async () => {
    setSeeding(true);
    const res = await seedActivityCalendarSections();
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
    eventIdx: number,
    currentValue: string,
  ) => {
    setEditingCell({ sectionId, eventIdx });
    setEditValue(currentValue);
  };

  const handleEditSave = async () => {
    if (!editingCell) return;
    setSavingEdit(true);
    const res = await updateActivityEventText(
      editingCell.sectionId,
      editingCell.eventIdx,
      editValue,
    );
    if (res.success) {
      toast.success("Activity text updated");
      setEditingCell(null);
      // Optimistic upate locally
      setSections((prev) =>
        prev.map((sec) => {
          if (sec._id === editingCell.sectionId) {
            const newEvents = [...sec.events];
            newEvents[editingCell.eventIdx].activity = editValue;
            return { ...sec, events: newEvents };
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
    eventIdx: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("File must be a PDF document.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be smaller than 10MB");
      return;
    }

    setProcessingPdf({ sectionId, eventIdx });

    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("eventIndex", eventIdx.toString());
    formData.append("file", file);

    const res = await uploadActivityCalendarPDF(formData);

    if (res.success) {
      toast.success("PDF uploaded successfully");
      fetchSections(); // Refresh fully to get new URLs
    } else {
      toast.error(res.message || "Failed to upload");
    }
    setProcessingPdf(null);
  };

  const handleFileDelete = (sectionId: string, eventIdx: number) => {
    setDeleteData({ sectionId, eventIdx });
  };

  const confirmFileDelete = async () => {
    if (!deleteData) return;

    setProcessingPdf(deleteData);
    setIsDeleting(true);

    const res = await deleteActivityCalendarPDF(
      deleteData.sectionId,
      deleteData.eventIdx,
    );

    if (res.success) {
      toast.success(res.message);
      fetchSections();
    } else {
      toast.error(res.message || "Failed to delete");
    }

    setProcessingPdf(null);
    setIsDeleting(false);
    setDeleteData(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-secondary" />
      </div>
    );
  }

  return (
    <AdminPageGuard requiredPermissionId="calendar">
      <div className="p-6 max-w-7xl mx-auto pb-32">
        <div className="mb-8 border-b dark:border-gray-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary dark:text-secondary" />
              Activity Calendar Editor
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
              Edit activity schedules and upload related PDF resources per
              month. Changes reflect globally on the public{" "}
              <span className="font-semibold text-primary dark:text-secondary">
                Academics &gt; Calendar
              </span>{" "}
              page for this branch.
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
              {seeding ? "Initializing..." : "Seed Default Calendar"}
            </button>
          )}
        </div>

        <div className="space-y-12">
          {sections.length === 0 && !seeding && (
            <div className="bg-orange-50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-200 p-8 rounded-2xl border border-orange-200 dark:border-orange-900 font-medium text-center">
              No Calendar tables found in the database. Click 'Seed Default
              Calendar' to generate the initial structure for this branch.
            </div>
          )}

          <div className="grid grid-cols-1 gap-8">
            {sections.map((section) => (
              <div
                key={section._id}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-blue-500/20 text-primary dark:text-blue-300 flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                        Class: {section.className}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Academic Year Plan Editor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="bg-primary/5 dark:bg-primary/10 border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-4 text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider whitespace-nowrap w-32">
                          Month
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider">
                          Activities & Events
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider text-right w-64">
                          PDF Resource
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {section.events.map((event, eventIdx) => {
                        const isEditTarget =
                          editingCell?.sectionId === section._id &&
                          editingCell?.eventIdx === eventIdx;
                        const isPdfProcessing =
                          processingPdf?.sectionId === section._id &&
                          processingPdf?.eventIdx === eventIdx;

                        return (
                          <tr
                            key={eventIdx}
                            className="hover:bg-blue-50/30 dark:hover:bg-gray-800/30 transition-colors group"
                          >
                            {/* Month Name */}
                            <td className="px-6 py-5 align-top">
                              <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm border border-gray-200 dark:border-gray-700">
                                {event.month}
                              </span>
                            </td>

                            {/* Activity Text editor */}
                            <td className="px-6 py-5 text-sm text-gray-700 dark:text-gray-300 align-top">
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
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={handleEditSave}
                                      disabled={savingEdit}
                                      className="p-3 bg-primary text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 shrink-0 shadow-sm hover:shadow-md transition-all h-[42px] w-[42px] flex items-center justify-center"
                                    >
                                      {savingEdit ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Save className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => setEditingCell(null)}
                                      className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 shrink-0 transition-colors h-[42px] text-xs font-bold"
                                    >
                                      X
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between items-start gap-4">
                                  <div className="whitespace-pre-wrap leading-relaxed min-h-[24px]">
                                    {event.activity || (
                                      <span className="text-gray-400 italic">
                                        No activity described
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleEditStart(
                                        section._id,
                                        eventIdx,
                                        event.activity,
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

                            {/* PDF Upload */}
                            <td className="px-6 py-5 align-middle text-right">
                              <div className="flex items-center justify-end gap-2">
                                {event.pdfUrl ? (
                                  <>
                                    <a
                                      href={event.pdfUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 transition-colors border border-red-100 dark:border-red-900/50"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      View PDF
                                    </a>
                                    <button
                                      onClick={() =>
                                        handleFileDelete(section._id, eventIdx)
                                      }
                                      disabled={isPdfProcessing}
                                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                                      title="Remove PDF"
                                    >
                                      {isPdfProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="w-4 h-4" />
                                      )}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <input
                                      type="file"
                                      id={`file-${section._id}-${eventIdx}`}
                                      className="hidden"
                                      accept=".pdf"
                                      onChange={(e) =>
                                        handleFileUpload(
                                          e,
                                          section._id,
                                          eventIdx,
                                        )
                                      }
                                      disabled={isPdfProcessing}
                                    />
                                    <label
                                      htmlFor={`file-${section._id}-${eventIdx}`}
                                      className={`cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors w-full sm:w-auto border border-gray-200 dark:border-gray-700 ${isPdfProcessing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm"}`}
                                    >
                                      {isPdfProcessing ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      ) : (
                                        <Upload className="w-3.5 h-3.5" />
                                      )}
                                      {isPdfProcessing
                                        ? "Processing..."
                                        : "Attach PDF"}
                                    </label>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        onConfirm={confirmFileDelete}
        title="Remove PDF Document"
        message="Are you sure you want to remove this PDF? The link will be instantly removed."
        confirmText="Remove"
        isLoading={isDeleting}
        variant="danger"
      />
    </AdminPageGuard>
  );
}
