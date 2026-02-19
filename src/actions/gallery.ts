"use server";

import { v2 as cloudinary } from "cloudinary";
import GalleryImage from "@/lib/models/GalleryImage";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { processAndUploadImage } from "@/lib/cloudinary";

export async function uploadGalleryImage(formData: FormData) {
  try {
    await dbConnect();
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const branch = formData.get("branch") as string;
    const title = formData.get("title") as string;

    if (!file || !category || !branch) {
      return { success: false, error: "Missing required fields" };
    }

    // Upload using shared retry helper
    const result = await processAndUploadImage(
      file,
      `vishwanath-academy/${branch}/${category}`,
    );

    // Save to Database
    await GalleryImage.create({
      url: result.secure_url,
      publicId: result.public_id,
      title,
      category,
      branch,
    });

    // Revalidate BOTH branches
    revalidatePath(`/aashiana/admin/gallery`);
    revalidatePath(`/dhawapur/admin/gallery`);
    revalidatePath(`/aashiana/students/gallery`);
    revalidatePath(`/dhawapur/students/gallery`);

    return { success: true };
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}

export async function deleteGalleryImage(id: string, branch: string) {
  try {
    await dbConnect();
    const user = await currentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const image = await GalleryImage.findById(id);
    if (!image) return { success: false, error: "Image not found" };

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from Database
    await GalleryImage.findByIdAndDelete(id);

    // Revalidate BOTH branches
    revalidatePath(`/aashiana/admin/gallery`);
    revalidatePath(`/dhawapur/admin/gallery`);
    revalidatePath(`/aashiana/students/gallery`);
    revalidatePath(`/dhawapur/students/gallery`);
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting image:", error);
    return { success: false, error: "Failed to delete image" };
  }
}

export async function getGalleryImages(branch: string, category?: string) {
  try {
    await dbConnect();
    // Global query - ignore branch
    const query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    const images = await GalleryImage.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return { success: true, data: JSON.parse(JSON.stringify(images)) };
  } catch (error: any) {
    console.error("Error fetching images:", error);
    return { success: false, error: "Failed to fetch images" };
  }
}
