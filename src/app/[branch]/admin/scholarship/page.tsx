"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Plus,
  Search,
  School,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  uploadScholarshipImage,
  deleteScholarshipImage,
  getScholarshipImages,
} from "@/actions/scholarship";
import AdminPageGuard from "@/components/AdminPageGuard";

// Types
interface Student {
  _id: string;
  name: string;
  fatherName?: string;
  class?: string;
  session: string;
  percentage: string;
  amount: string;
}

interface GalleryImage {
  _id: string;
  url: string;
  publicId: string;
  caption?: string;
}

export default function AdminScholarshipPage() {
  const [activeTab, setActiveTab] = useState<"students" | "gallery">(
    "students",
  );

  // Student State
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Student Form State
  const [formData, setFormData] = useState({
    name: "",
    session: "",
    percentage: "",
    amount: "",
  });

  // Gallery State
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");

  // Delete Confirmation State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "student" | "image";
    id: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Data
  useEffect(() => {
    fetchStudents();
    fetchImages();
  }, []);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    const res = await getStudents();
    if (res.success) {
      setStudents(res.data);
    } else {
      toast.error("Failed to fetch students");
    }
    setLoadingStudents(false);
  };

  const fetchImages = async () => {
    setLoadingImages(true);
    const res = await getScholarshipImages();
    if (res.success) {
      setImages(res.data);
    } else {
      toast.error("Failed to fetch images");
    }
    setLoadingImages(false);
  };

  // Student Handlers
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    // Append percentage with symbol
    const submitData = {
      ...formData,
      percentage: `${formData.percentage}%`,
    };
    Object.entries(submitData).forEach(([key, value]) =>
      data.append(key, value),
    );

    let res;
    if (editingStudent) {
      res = await updateStudent(editingStudent._id, data);
    } else {
      res = await addStudent(data);
    }

    if (res.success) {
      toast.success(editingStudent ? "Student updated" : "Student added");
      setFormData({
        name: "",
        session: "",
        percentage: "",
        amount: "",
      });
      setEditingStudent(null);
      setIsSidebarOpen(false);
      fetchStudents();
    } else {
      toast.error(res.message);
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      session: student.session,
      percentage: student.percentage.replace("%", ""),
      amount: student.amount,
    });
    setIsSidebarOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    setDeleteConfirmation({ type: "student", id });
  };

  const handleDeleteImage = (id: string) => {
    setDeleteConfirmation({ type: "image", id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    setIsDeleting(true);
    let res;

    if (deleteConfirmation.type === "student") {
      res = await deleteStudent(deleteConfirmation.id);
      if (res.success) {
        toast.success("Student deleted");
        fetchStudents();
      } else {
        toast.error(res.message);
      }
    } else {
      res = await deleteScholarshipImage(deleteConfirmation.id);
      if (res.success) {
        toast.success("Image deleted");
        fetchImages();
      } else {
        toast.error(res.message);
      }
    }

    setIsDeleting(false);
    setDeleteConfirmation(null);
  };

  // Gallery Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Cleanup previous object URL to avoid memory leaks if needed,
      // but strictly for this simple case letting browser handle it is often fine or we can use useEffect.
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", uploadFile);
    data.append("caption", uploadCaption);

    const res = await uploadScholarshipImage(data);
    if (res.success) {
      toast.success("Image uploaded");
      setUploadFile(null);
      setPreviewUrl(null);
      setUploadCaption("");
      fetchImages();
    } else {
      toast.error(res.message);
    }
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Scholarship Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage student records and felicitation ceremony images
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("students")}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === "students"
              ? "text-primary"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <School size={18} />
            Student Records
          </div>
          {activeTab === "students" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === "gallery"
              ? "text-primary"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <ImageIcon size={18} />
            Felicitation Gallery
          </div>
          {activeTab === "gallery" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Students Tab */}
      {activeTab === "students" && (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setEditingStudent(null);
                setFormData({
                  name: "",
                  session: "",
                  percentage: "",
                  amount: "",
                });
                setIsSidebarOpen(true);
              }}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:text-black transition-colors"
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Scholarship Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loadingStudents ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="animate-spin mx-auto text-primary" />
                    </td>
                  </tr>
                ) : students.length > 0 ? (
                  students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {student.session}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-primary">
                        {student.percentage}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 dark:text-green-400">
                        {student.amount}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
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
                      No students found. Add one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Upload New Image
              </h3>
              <form onSubmit={handleImageUpload} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative min-h-[200px] flex flex-col items-center justify-center">
                  {previewUrl ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setUploadFile(null);
                          setPreviewUrl(null);
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
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Upload size={24} />
                        <span>Click to select image</span>
                      </div>
                    </>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Caption (Optional)"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none"
                />

                <button
                  type="submit"
                  disabled={!uploadFile || uploading}
                  className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-secondary hover:text-black transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {uploading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Upload size={18} />
                  )}
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              </form>
            </div>
          </div>

          {/* Image Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loadingImages ? (
                <div className="col-span-full py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-primary" />
                </div>
              ) : images.length > 0 ? (
                images.map((img) => (
                  <div
                    key={img._id}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    <Image
                      src={img.url}
                      alt={img.caption || "Gallery Image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeleteImage(img._id)}
                        className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs truncate">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500">
                  No images uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Student Sidebar Form */}
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
                {editingStudent ? "Edit Student" : "Add Student"}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Session <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024-2025"
                  value={formData.session}
                  onChange={(e) =>
                    setFormData({ ...formData, session: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              {/* Removed Father's Name and Class inputs as per request */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Percentage (%) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    required
                    placeholder="e.g. 98.5"
                    value={formData.percentage}
                    onChange={(e) =>
                      setFormData({ ...formData, percentage: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Scholarship Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15,000"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary hover:text-black transition-colors flex justify-center items-center gap-2"
                >
                  <Save size={18} />
                  {editingStudent ? "Update Student" : "Save Student"}
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
        title={
          deleteConfirmation?.type === "student"
            ? "Delete Student Record"
            : "Delete Gallery Image"
        }
        message={
          deleteConfirmation?.type === "student"
            ? "Are you sure you want to delete this student record? This action cannot be undone."
            : "Are you sure you want to delete this image? This action cannot be undone."
        }
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
