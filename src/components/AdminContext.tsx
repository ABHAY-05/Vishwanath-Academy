"use client";

import React, { createContext, useContext, ReactNode } from "react";

type UserRole = "superadmin" | "admin" | "guest";

interface AdminContextType {
  role: UserRole;
  permissions: string[];
  branch: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
  children,
  role,
  permissions,
  branch,
}: {
  children: ReactNode;
  role: UserRole;
  permissions: string[];
  branch: string;
}) {
  return (
    <AdminContext.Provider value={{ role, permissions, branch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
