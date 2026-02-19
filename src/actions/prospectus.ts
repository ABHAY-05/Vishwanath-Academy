"use server";

import dbConnect from "@/lib/db";
import Prospectus from "@/lib/models/prospectus";
import { revalidatePath } from "next/cache";

export async function getProspectus() {
  try {
    await dbConnect();
    // Assuming there is only one global prospectus
    const prospectus = await Prospectus.findOne().lean();

    return {
      success: true,
      data: prospectus ? JSON.parse(JSON.stringify(prospectus)) : null,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function saveProspectusUrl(url: string) {
  try {
    await dbConnect();

    if (!url) {
      return { success: false, message: "Missing required URL field" };
    }

    const existing = await Prospectus.findOne();

    if (existing) {
      existing.pdf = {
        url,
        publicId: "manual-link",
      };
      await existing.save();
    } else {
      await Prospectus.create({
        pdf: {
          url,
          publicId: "manual-link",
        },
      });
    }

    revalidatePath(`/aashiana/admin/prospectus`);
    revalidatePath(`/dhawapur/admin/prospectus`);
    revalidatePath(`/aashiana`);
    revalidatePath(`/dhawapur`);

    return { success: true, message: "Prospectus link saved successfully." };
  } catch (error: any) {
    console.error("Save prospectus error:", error);
    return { success: false, message: "Failed to save prospectus record" };
  }
}

export async function deleteProspectus() {
  try {
    await dbConnect();

    const existing = await Prospectus.findOne();
    if (!existing) {
      return { success: false, message: "Prospectus not found" };
    }

    await Prospectus.findOneAndDelete();

    revalidatePath(`/aashiana/admin/prospectus`);
    revalidatePath(`/dhawapur/admin/prospectus`);
    revalidatePath(`/aashiana`); // Navbar revalidation
    revalidatePath(`/dhawapur`);

    return { success: true, message: "Prospectus deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
