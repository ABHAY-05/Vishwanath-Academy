"use server";

import dbConnect from "@/lib/db";
import PressRelease from "@/lib/models/press-release";
import { processAndUploadDocument } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getPressReleases() {
  try {
    await dbConnect();
    const releases = await PressRelease.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(releases)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadPressRelease(formData: FormData) {
  try {
    await dbConnect();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;

    if (!file || !title) {
      return { success: false, message: "Missing required fields" };
    }

    const { secure_url, public_id } = await processAndUploadDocument(
      file,
      "press-releases",
    );

    const newRelease = await PressRelease.create({
      image: {
        url: secure_url,
        publicId: public_id,
      },
      title,
    });

    revalidatePath(`/aashiana/admin`);
    revalidatePath(`/dhawapur/admin`);
    revalidatePath(`/aashiana/students/press`);
    revalidatePath(`/dhawapur/students/press`);

    return { success: true, data: JSON.parse(JSON.stringify(newRelease)) };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deletePressRelease(id: string, publicId: string) {
  try {
    await dbConnect();

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await PressRelease.findByIdAndDelete(id);

    revalidatePath(`/aashiana/admin`);
    revalidatePath(`/dhawapur/admin`);
    revalidatePath(`/aashiana/students/press`);
    revalidatePath(`/dhawapur/students/press`);

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
