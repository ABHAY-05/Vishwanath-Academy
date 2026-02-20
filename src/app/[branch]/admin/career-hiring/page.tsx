"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, Trash2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
  uploadCareerImage,
  getCareerImage,
  deleteCareerImage,
} from "@/actions/careerImage";
import ConfirmationModal from "@/components/ConfirmationModal";
import AdminPageGuard from "@/components/AdminPageGuard";

interface CareerImage {
  _id: string;
  image: { url: string; publicId: string };
  createdAt: string;
}

export default function CareerHiringAdminPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [branch, setBranch] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<CareerImage | null>(null);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setBranch(p.branch);
      fetchImage();
    });
  }, [params]);

  const fetchImage = async () => {
    setLoading(true);
    const res = await getCareerImage();
    if (res.success && res.data) {
      setCurrentImage(res.data);
    } else {
      setCurrentImage(null);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadCareerImage(formData);

    if (res.success) {
      toast.success(
        "Graphic uploaded successfully! It is now live across all branches.",
      );
      setFile(null);
      fetchImage();
    } else {
      toast.error(res.message || "Failed to upload graphic");
    }
    setIsUploading(false);
  };

  const handleDelete = async () => {
    if (!currentImage) return;
    setIsDeleting(true);
    const res = await deleteCareerImage(
      currentImage._id,
      currentImage.image.publicId,
    );
    if (res.success) {
      toast.success("Career Image deleted.");
      setCurrentImage(null);
      setIsDeleteDialogOpen(false);
    } else {
      toast.error(res.message || "Failed to delete.");
    }
    setIsDeleting(false);
  };

  return (
    <AdminPageGuard requiredPermissionId="career-hiring">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8 border-b dark:border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Career Hiring Graphic
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-3xl">
            Upload the "Current Openings" poster that will be displayed on the
            public{" "}
            <span className="font-semibold text-primary">
              Contact Us &gt; Career
            </span>{" "}
            page. This image is global, meaning the same image will be displayed
            on both the Aashiana and Dhawapur portals.
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
                Upload New Graphic
              </h2>

              <form onSubmit={handleUpload} className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors group cursor-pointer ${
                    file
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 dark:border-gray-700 hover:border-primary/50"
                  }`}
                  onClick={() =>
                    document.getElementById("career-file-upload")?.click()
                  }
                >
                  <input
                    id="career-file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  {file ? (
                    <div className="flex flex-col items-center gap-3 text-primary">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="max-h-48 rounded-lg shadow-sm border border-primary/20 object-contain"
                      />
                      <p className="font-medium truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-primary/70">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Click to browse or drag and drop
                        </p>
                        <p className="text-sm">PNG, JPG or WebP (Max. 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !file}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                >
                  {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isUploading
                    ? "Uploading & Replacing..."
                    : currentImage
                      ? "Replace Graphic"
                      : "Upload Graphic"}
                </button>
              </form>
            </div>

            {/* ACTIVE IMAGE PANEL */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-display">Live Graphic</h2>
                {currentImage && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    Active
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center items-center">
                {currentImage ? (
                  <div className="w-full relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white">
                    <Image
                      src={currentImage.image.url}
                      alt="Career Hiring Graphic"
                      width={800}
                      height={1000}
                      className="w-full h-auto object-contain"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all flex items-center gap-2 font-bold"
                      >
                        <Trash2 className="w-5 h-5" />
                        Remove Poster
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-600 py-12 flex flex-col items-center gap-4">
                    <Briefcase className="w-16 h-16 opacity-30" />
                    <p className="text-lg font-medium">
                      No graphic is currently live.
                    </p>
                    <p className="text-sm max-w-[250px]">
                      The public careers page will not display a hiring poster
                      until you upload one.
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
          title="Remove Hiring Graphic"
          message="Are you sure you want to delete this global hiring graphic? The public career page will no longer show any active openings poster."
          confirmText="Remove Poster"
          isLoading={isDeleting}
          variant="danger"
        />
      </div>
    </AdminPageGuard>
  );
}
