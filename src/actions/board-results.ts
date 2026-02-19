"use server";

import dbConnect from "@/lib/db";
import BoardResult from "@/lib/models/board-result";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { processAndUploadImage } from "@/lib/cloudinary";

async function uploadToCloudinary(file: File, folder: string) {
  return await processAndUploadImage(file, folder);
}

async function deleteFromCloudinary(publicId: string) {
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
}

// --- Highlight Image Actions ---

export async function getHighlightImage(branch: string) {
  try {
    await dbConnect();
    const result = await BoardResult.findOne({ branch, type: "highlight" });
    return {
      success: true,
      data: result ? JSON.parse(JSON.stringify(result)) : null,
    };
  } catch (error) {
    console.error("Error fetching highlight image:", error);
    return { success: false, message: "Failed to fetch highlight image" };
  }
}

export async function updateHighlightImage(formData: FormData) {
  try {
    await dbConnect();
    const branch = formData.get("branch") as string;
    const file = formData.get("file") as File;

    if (!file) return { success: false, message: "No file provided" };

    // Find existing highlight image
    const existing = await BoardResult.findOne({ branch, type: "highlight" });

    // Upload new image
    const uploadResult = await uploadToCloudinary(
      file,
      "vishwanath-academy/board-results",
    );

    if (existing) {
      // Delete old image
      if (existing.highlightImage?.publicId) {
        await deleteFromCloudinary(existing.highlightImage.publicId);
      }
      // Update record
      existing.highlightImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
      await existing.save();
    } else {
      // Create new record
      await BoardResult.create({
        branch,
        type: "highlight",
        highlightImage: {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
      });
    }

    revalidatePath(`/${branch}/results/board-results`);
    revalidatePath(`/${branch}/admin/board-results`);
    return { success: true, message: "Highlight image updated" };
  } catch (error) {
    console.error("Error updating highlight image:", error);
    return { success: false, message: "Failed to update highlight image" };
  }
}

// --- Year Result Actions ---

export async function getBoardResults(branch: string) {
  try {
    await dbConnect();
    const results = await BoardResult.find({
      branch,
      type: "year_result",
    }).sort({ year: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(results)) };
  } catch (error) {
    console.error("Error fetching board results:", error);
    return { success: false, data: [] };
  }
}

export async function addBoardResult(formData: FormData) {
  try {
    await dbConnect();
    const branch = formData.get("branch") as string;
    const year = formData.get("year") as string;
    const classXFile = formData.get("classXFile") as File | null;
    const classXIIFile = formData.get("classXIIFile") as File | null;

    let classXImage = null;
    let classXIIImage = null;

    if (classXFile) {
      const res = await uploadToCloudinary(
        classXFile,
        "vishwanath-academy/board-results",
      );
      classXImage = { url: res.secure_url, publicId: res.public_id };
    }

    if (classXIIFile) {
      const res = await uploadToCloudinary(
        classXIIFile,
        "vishwanath-academy/board-results",
      );
      classXIIImage = { url: res.secure_url, publicId: res.public_id };
    }

    await BoardResult.create({
      branch,
      type: "year_result",
      year,
      classX: classXImage,
      classXII: classXIIImage,
    });

    revalidatePath(`/${branch}/results/board-results`);
    revalidatePath(`/${branch}/admin/board-results`);
    return { success: true, message: "Result added successfully" };
  } catch (error) {
    console.error("Error adding board result:", error);
    return { success: false, message: "Failed to add board result" };
  }
}

export async function deleteBoardResult(id: string, branch: string) {
  try {
    await dbConnect();
    const result = await BoardResult.findById(id);
    if (!result) return { success: false, message: "Result not found" };

    if (result.classX?.publicId)
      await deleteFromCloudinary(result.classX.publicId);
    if (result.classXII?.publicId)
      await deleteFromCloudinary(result.classXII.publicId);

    await BoardResult.findByIdAndDelete(id);

    revalidatePath(`/${branch}/results/board-results`);
    revalidatePath(`/${branch}/admin/board-results`);
    return { success: true, message: "Result deleted" };
  } catch (error) {
    console.error("Error deleting board result:", error);
    return { success: false, message: "Failed to delete board result" };
  }
}
