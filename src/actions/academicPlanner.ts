"use server";

import dbConnect from "@/lib/db";
import AcademicPlanner from "@/lib/models/academic-planner";
import { processAndUploadDocument } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAcademicPlanner(branch: string) {
  try {
    await dbConnect();
    const planner = await AcademicPlanner.findOne({ branch }).lean();
    if (!planner) return { success: false, data: null };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(planner)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadAcademicPlanner(formData: FormData) {
  try {
    await dbConnect();
    const branch = formData.get("branch") as string;
    const file = formData.get("file") as File;

    if (!branch || !file) {
      return { success: false, message: "Missing required fields" };
    }

    // Process and upload the new PDF
    const { secure_url, public_id } = await processAndUploadDocument(
      file,
      "academic-planner",
    );

    // Find and delete the old record for this branch (and Cloudinary file) if it exists
    const existingPlanner = await AcademicPlanner.findOne({ branch });
    if (existingPlanner) {
      if (existingPlanner.file?.publicId) {
        await cloudinary.uploader.destroy(existingPlanner.file.publicId, {
          resource_type: "image",
        });
      }
      await AcademicPlanner.findByIdAndDelete(existingPlanner._id);
    }

    // Create the new academic planner document
    const newPlanner = await AcademicPlanner.create({
      branch,
      file: {
        url: secure_url,
        publicId: public_id,
      },
    });

    revalidatePath(`/${branch}/admin`);
    revalidatePath(`/${branch}/admin/academic-planner`);

    // Also revalidate the root path so Navbar updates the link immediately
    revalidatePath(`/${branch}`);
    revalidatePath(`/${branch}/(public)`, "layout");

    return { success: true, data: JSON.parse(JSON.stringify(newPlanner)) };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteAcademicPlanner(
  id: string,
  publicId: string,
  branch: string,
) {
  try {
    await dbConnect();

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    await AcademicPlanner.findByIdAndDelete(id);

    revalidatePath(`/${branch}/admin`);
    revalidatePath(`/${branch}/admin/academic-planner`);
    revalidatePath(`/${branch}`);
    revalidatePath(`/${branch}/(public)`, "layout");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting Academic Planner:", error);
    return { success: false, message: error.message || "Failed to delete" };
  }
}
