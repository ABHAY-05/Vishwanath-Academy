"use server";

import dbConnect from "@/lib/db";
import CareerImage from "@/lib/models/career-image";
import { processAndUploadDocument } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getCareerImage() {
  try {
    await dbConnect();
    const image = await CareerImage.findOne().sort({ createdAt: -1 }).lean();

    if (!image) {
      return { success: false, message: "No Career Image found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(image)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadCareerImage(formData: FormData) {
  try {
    await dbConnect();
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, message: "Missing required file" };
    }

    // Process and upload the new image
    const { secure_url, public_id } = await processAndUploadDocument(
      file,
      "career-hiring",
    );

    // Find and delete the old single record (and Cloudinary file) if it exists
    const existingImage = await CareerImage.findOne();
    if (existingImage) {
      if (existingImage.image?.publicId) {
        await cloudinary.uploader.destroy(existingImage.image.publicId);
      }
      await CareerImage.findByIdAndDelete(existingImage._id);
    }

    // Create the new career image document
    const newImage = await CareerImage.create({
      image: {
        url: secure_url,
        publicId: public_id,
      },
    });

    // Revalidate paths that use the career image (assumes it renders on both branches)
    revalidatePath("/aashiana/admin");
    revalidatePath("/aashiana/admin/career-hiring");
    revalidatePath("/aashiana/contact/career");

    revalidatePath("/dhawapur/admin");
    revalidatePath("/dhawapur/admin/career-hiring");
    revalidatePath("/dhawapur/contact/career");

    return { success: true, data: JSON.parse(JSON.stringify(newImage)) };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteCareerImage(id: string, publicId: string) {
  try {
    await dbConnect();

    await cloudinary.uploader.destroy(publicId);
    await CareerImage.findByIdAndDelete(id);

    revalidatePath("/aashiana/admin/career-hiring");
    revalidatePath("/aashiana/contact/career");
    revalidatePath("/dhawapur/admin/career-hiring");
    revalidatePath("/dhawapur/contact/career");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting Career Image:", error);
    return { success: false, message: error.message || "Failed to delete" };
  }
}
