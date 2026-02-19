"use client";

import { useState, useEffect } from "react";
import { Link2, Loader2, Save, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import Link from "next/link";
import {
  getProspectus,
  deleteProspectus,
  saveProspectusUrl,
} from "@/actions/prospectus";

export default function AdminProspectusPage() {
  const [prospectusUrl, setProspectusUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [linkInput, setLinkInput] = useState("");
  const [saving, setSaving] = useState(false);

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
      setLinkInput(res.data.pdf.url);
    } else {
      setProspectusUrl(null);
      setLinkInput("");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkInput.trim()) {
      toast.error("Please enter a valid link");
      return;
    }

    setSaving(true);

    try {
      const res = await saveProspectusUrl(linkInput.trim());
      if (res.success) {
        toast.success("Prospectus link saved successfully");
        fetchProspectus();
      } else {
        toast.error(res.message || "Failed to save prospectus link");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred while saving the link.");
    } finally {
      setSaving(false);
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
          Manage the common school prospectus link. This link is shared globally
          across all branches. Paste a Google Drive (or any direct PDF) link
          below.
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
              <ExternalLink size={64} className="text-blue-500" />
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Global Link Active
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Link
                    href={prospectusUrl}
                    target="_blank"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    View Link
                  </Link>
                  <button
                    type="button"
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
              <Link2 size={48} className="mb-2 opacity-50" />
              <p>No prospectus link saved yet.</p>
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {prospectusUrl ? "Update Prospectus Link" : "Add Prospectus Link"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Document URL
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={saving || !linkInput.trim()}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Link"}
            </button>
          </form>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Prospectus"
        message="Are you sure you want to delete the school prospectus link? The Prospectus button will no longer work until a new link is saved."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
