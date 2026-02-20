"use client";

import { useAdmin } from "./AdminContext";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminPageGuard({
  children,
  requiredPermissionId,
}: {
  children: React.ReactNode;
  requiredPermissionId: string;
}) {
  const { role, permissions, branch } = useAdmin();
  const pathname = usePathname();

  if (role === "superadmin") {
    return <>{children}</>;
  }

  if (role === "admin" && permissions.includes(requiredPermissionId)) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <ShieldAlert className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Permission Denied
      </h1>
      <p className="text-gray-500 max-w-lg mb-8 text-lg">
        You do not have the required permissions to view the{" "}
        <span className="font-bold text-gray-900 dark:text-white capitalize">
          {requiredPermissionId.replace("-", " ")}
        </span>{" "}
        editor. Please contact your Super Administrator if you need access.
      </p>
      <Link
        href={`/${branch}/admin`}
        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-sm"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
