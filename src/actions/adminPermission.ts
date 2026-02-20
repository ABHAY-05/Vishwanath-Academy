"use server";

import dbConnect from "@/lib/db";
import AdminPermission from "@/lib/models/admin-permission";
import { revalidatePath } from "next/cache";

/**
 * Fetches all permissions for a specific branch
 */
export async function getAdminPermissions(branch: "aashiana" | "dhawapur") {
  try {
    await dbConnect();
    const permissions = await AdminPermission.find({ branch })
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(permissions)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/**
 * Fetches the specific permissions array for a single user by email
 */
export async function getUserPermissions(
  email: string,
  branch: "aashiana" | "dhawapur",
) {
  try {
    await dbConnect();
    const userPerm = await AdminPermission.findOne({
      email: email.toLowerCase().trim(),
      branch,
    }).lean();

    if (!userPerm) {
      return { success: true, data: [] }; // No permissions found, return empty array
    }

    return {
      success: true,
      data: userPerm.permissions as string[],
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/**
 * Assigns permissions to a new user email for a branch
 */
export async function addAdminPermission(
  email: string,
  branch: "aashiana" | "dhawapur",
  permissions: string[],
) {
  try {
    await dbConnect();

    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) {
      return { success: false, message: "Email is required." };
    }

    // Check if user already exists
    const existing = await AdminPermission.findOne({
      email: cleanEmail,
      branch,
    });
    if (existing) {
      return {
        success: false,
        message:
          "This email already has assigned permissions for this branch. Please edit the existing record.",
      };
    }

    const newPermission = await AdminPermission.create({
      email: cleanEmail,
      branch,
      permissions,
    });

    revalidatePath(`/${branch}/admin/permissions`);

    return {
      success: true,
      message: "Admin permissions added successfully.",
      data: JSON.parse(JSON.stringify(newPermission)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/**
 * Updates an existing user's permissions
 */
export async function updateAdminPermission(id: string, permissions: string[]) {
  try {
    await dbConnect();

    // Find before updating to get the branch for revalidation
    const existing = await AdminPermission.findById(id);
    if (!existing) {
      return { success: false, message: "Permission record not found." };
    }

    existing.permissions = permissions;
    await existing.save();

    revalidatePath(`/${existing.branch}/admin/permissions`);

    return {
      success: true,
      message: "Admin permissions updated successfully.",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/**
 * Revokes all permissions for a user on a branch
 */
export async function deleteAdminPermission(id: string) {
  try {
    await dbConnect();

    const existing = await AdminPermission.findById(id);
    if (!existing) {
      return { success: false, message: "Permission record not found." };
    }

    const branch = existing.branch;
    await AdminPermission.findByIdAndDelete(id);

    revalidatePath(`/${branch}/admin/permissions`);

    return {
      success: true,
      message: "Admin permissions deleted successfully.",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
