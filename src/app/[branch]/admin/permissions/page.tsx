"use client";

import { useState, useEffect, use } from "react";
import {
  Loader2,
  ShieldAlert,
  Save,
  Trash2,
  UserPlus,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAdminPermissions,
  addAdminPermission,
  updateAdminPermission,
  deleteAdminPermission,
} from "@/actions/adminPermission";
import { useAdmin } from "@/components/AdminContext";
import ConfirmationModal from "@/components/ConfirmationModal";

interface AdminPermissionData {
  _id: string;
  email: string;
  permissions: string[];
}

const AVAILABLE_SECTIONS = [
  { id: "notices", label: "Notice Board" },
  { id: "gallery", label: "Gallery" },
  { id: "press", label: "Press Release" },
  { id: "scholarship", label: "Scholarship" },
  { id: "board-results", label: "Board Results" },
  { id: "school-awards", label: "School Awards" },
  { id: "prospectus", label: "School Prospectus" },
  { id: "tc", label: "Download TC" },
  { id: "career-hiring", label: "Career Hiring" },
  { id: "academic-planner", label: "Academic Planner" },
  { id: "books", label: "Books & Stationary" },
  { id: "calendar", label: "Activity Calendar" },
  { id: "cbse", label: "CBSE Disclosure" },
];

export default function PermissionsAdminPage({
  params,
}: {
  params: Promise<{ branch: "aashiana" | "dhawapur" }>;
}) {
  const { branch } = use(params);
  const { role } = useAdmin();
  const [admins, setAdmins] = useState<AdminPermissionData[]>([]);
  const [loading, setLoading] = useState(true);

  // New Admin Form State
  const [newEmail, setNewEmail] = useState("");
  const [newPermissions, setNewPermissions] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPermissions, setEditPermissions] = useState<string[]>([]);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (role === "superadmin") {
      fetchAdmins();
    } else {
      setLoading(false);
    }
  }, [branch, role]);

  const fetchAdmins = async () => {
    setLoading(true);
    const res = await getAdminPermissions(branch);
    if (res.success && res.data) {
      setAdmins(res.data);
    }
    setLoading(false);
  };

  if (role !== "superadmin") {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center py-32 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Super Admin Access Required
        </h1>
        <p className="text-gray-500 max-w-md">
          This area is restricted to the primary branch administrator. You do
          not have the credentials required to modify user permissions.
        </p>
      </div>
    );
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || newPermissions.length === 0) {
      toast.error("Please enter an email and select at least one permission.");
      return;
    }

    setIsAdding(true);
    const res = await addAdminPermission(newEmail, branch, newPermissions);
    if (res.success) {
      toast.success(res.message);
      setNewEmail("");
      setNewPermissions([]);
      fetchAdmins();
    } else {
      toast.error(res.message);
    }
    setIsAdding(false);
  };

  const toggleNewPermission = (id: string) => {
    setNewPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleEditStart = (admin: AdminPermissionData) => {
    setEditingId(admin._id);
    setEditPermissions(admin.permissions);
  };

  const toggleEditPermission = (id: string) => {
    setEditPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setIsSavingEdit(true);
    const res = await updateAdminPermission(editingId, editPermissions);
    if (res.success) {
      toast.success(res.message);
      setEditingId(null);
      fetchAdmins();
    } else {
      toast.error(res.message);
    }
    setIsSavingEdit(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    setIsDeleting(true);
    const res = await deleteAdminPermission(deletingId);
    if (res.success) {
      toast.success(res.message);
      fetchAdmins();
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-secondary" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto pb-32">
      <div className="mb-8 border-b dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <KeyRound className="w-8 h-8 text-primary dark:text-secondary" />
          Roles & Access Control
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
          As a Super Admin, you can delegate access to specific sections of the{" "}
          <span className="capitalize">{branch}</span> admin panel by
          associating email addresses with targeted permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ADD NEW ADMIN CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary dark:text-secondary" />
                Delegate Access
              </h2>
            </div>
            <form onSubmit={handleAddAdmin} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Assign Permissions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {AVAILABLE_SECTIONS.map((section) => (
                    <label
                      key={section.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        newPermissions.includes(section.id)
                          ? "bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50"
                          : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newPermissions.includes(section.id)}
                        onChange={() => toggleNewPermission(section.id)}
                        className="mt-1 w-4 h-4 text-primary dark:text-secondary rounded border-gray-300 focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {section.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdding}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isAdding ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
                Authorize User
              </button>
            </form>
          </div>
        </div>

        {/* AUTHORIZED ADMINS LIST */}
        <div className="lg:col-span-2 space-y-6">
          {admins.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 p-12 text-center">
              <ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Delegate Admins
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                No users have been assigned access to the {branch} dashboard
                yet. Use the form to authorize team members.
              </p>
            </div>
          ) : (
            admins.map((admin) => (
              <div
                key={admin._id}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold font-display">
                      {admin.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {admin.email}
                      </h3>
                      <p className="text-xs text-gray-500">Authorized Admin</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {editingId === admin._id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          disabled={isSavingEdit}
                          className="p-2 bg-primary text-white hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
                          title="Save Permissions"
                        >
                          {isSavingEdit ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditStart(admin)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        Edit Access
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClick(admin._id)}
                      disabled={deletingId === admin._id && isDeleting}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Revoke Access completely"
                    >
                      {deletingId === admin._id && isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {editingId === admin._id ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {AVAILABLE_SECTIONS.map((section) => (
                        <label
                          key={section.id}
                          className={`flex items-start gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                            editPermissions.includes(section.id)
                              ? "bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50"
                              : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={editPermissions.includes(section.id)}
                            onChange={() => toggleEditPermission(section.id)}
                            className="mt-0.5 w-4 h-4 text-primary dark:text-secondary rounded border-gray-300 focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight">
                            {section.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {admin.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full border border-gray-200 dark:border-gray-700"
                        >
                          {AVAILABLE_SECTIONS.find((s) => s.id === perm)
                            ?.label || perm}
                        </span>
                      ))}
                      {admin.permissions.length === 0 && (
                        <span className="text-sm text-gray-400 italic">
                          No specific section access assigned.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        title="Revoke Admin Access"
        message="Are you sure you want to revoke all access for this user? They will no longer be able to manage these sections."
        confirmText="Revoke Access"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
