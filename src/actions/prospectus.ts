"use server";

import dbConnect from "@/lib/db";
import Prospectus from "@/lib/models/prospectus";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { processAndUploadDocument } from "@/lib/cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function saveProspectusUrl(url: string, publicId: string) {
  try {
    await dbConnect();

    if (!url || !publicId) {
      return { success: false, message: "Missing required fields" };
    }

    const existing = await Prospectus.findOne();

    if (existing) {
      // Delete old PDF from Cloudinary if it exists and is different
      if (existing.pdf?.publicId && existing.pdf.publicId !== publicId) {
        try {
          await cloudinary.uploader.destroy(existing.pdf.publicId);
        } catch (e) {
          console.error("Failed to delete replacing PDF:", e);
        }
      }

      existing.pdf = {
        url,
        publicId,
      };
      await existing.save();
    } else {
      await Prospectus.create({
        pdf: {
          url,
          publicId,
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

    // Delete file from Cloudinary
    if (existing.pdf?.publicId) {
      await cloudinary.uploader.destroy(existing.pdf.publicId);
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
