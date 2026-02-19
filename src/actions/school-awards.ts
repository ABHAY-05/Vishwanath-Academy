"use server";

import dbConnect from "@/lib/db";
import SchoolAward from "@/lib/models/school-award";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getSchoolAwards() {
  try {
    await dbConnect();
    const awards = await SchoolAward.find({}).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(awards)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

import { processAndUploadImage } from "@/lib/cloudinary";

export async function addSchoolAward(formData: FormData) {
  try {
    await dbConnect();
    const branch = formData.get("branch") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    if (!description || !file) {
      return { success: false, message: "Missing required fields" };
    }

    // Upload using shared retry helper
    const result = await processAndUploadImage(
      file,
      `vishwanath-academy/school-awards`,
    );

    const newAward = new SchoolAward({
      description,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    await newAward.save();

    revalidatePath(`/aashiana/admin/school-awards`);
    revalidatePath(`/aashiana/results/awards`);
    revalidatePath(`/dhawapur/admin/school-awards`);
    revalidatePath(`/dhawapur/results/awards`);

    return { success: true, message: "School Award added successfully." };
  } catch (error: any) {
    console.error("Add award error:", error);
    return { success: false, message: "Failed to add award" };
  }
}

export async function updateSchoolAwardDescription(
  id: string,
  newDescription: string,
) {
  try {
    await dbConnect();

    const award = await SchoolAward.findById(id);
    if (!award) {
      return { success: false, message: "Award not found" };
    }

    award.description = newDescription;
    await award.save();

    revalidatePath(`/aashiana/admin/school-awards`);
    revalidatePath(`/aashiana/results/awards`);
    revalidatePath(`/dhawapur/admin/school-awards`);
    revalidatePath(`/dhawapur/results/awards`);

    return { success: true, message: "Description updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteSchoolAward(id: string) {
  try {
    await dbConnect();

    const award = await SchoolAward.findById(id);
    if (!award) {
      return { success: false, message: "Award not found" };
    }

    // Delete image from Cloudinary
    if (award.image?.publicId) {
      await cloudinary.uploader.destroy(award.image.publicId);
    }

    await SchoolAward.findByIdAndDelete(id);

    revalidatePath(`/aashiana/admin/school-awards`);
    revalidatePath(`/aashiana/results/awards`);
    revalidatePath(`/dhawapur/admin/school-awards`);
    revalidatePath(`/dhawapur/results/awards`);

    return { success: true, message: "Award deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
