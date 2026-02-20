"use server";

import dbConnect from "@/lib/db";
import TransferCertificate from "@/lib/models/transfer-certificate";
import { processAndUploadDocument } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getTransferCertificates(branch: string) {
  try {
    await dbConnect();
    const tcs = await TransferCertificate.find({ branch })
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tcs)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function searchTransferCertificate(
  branch: string,
  admissionNumber: string,
) {
  try {
    await dbConnect();
    const tc = await TransferCertificate.findOne({
      branch,
      // Using a regex for case-insensitive and whitespace-flexible matching
      admissionNumber: new RegExp(`^${admissionNumber.trim()}$`, "i"),
    }).lean();

    if (!tc) {
      return {
        success: false,
        message: "Transfer Certificate not found for this Admission Number.",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tc)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadTransferCertificate(formData: FormData) {
  try {
    await dbConnect();
    const branch = formData.get("branch") as string;
    const admissionNumber = formData.get("admissionNumber") as string;
    const file = formData.get("file") as File;

    if (!branch || !admissionNumber || !file) {
      return { success: false, message: "Missing required fields" };
    }

    // Check if the TC already exists for this branch/admission number
    const existingTC = await TransferCertificate.findOne({
      branch,
      admissionNumber: new RegExp(`^${admissionNumber.trim()}$`, "i"),
    });

    if (existingTC) {
      return {
        success: false,
        message:
          "A Transfer Certificate with this Admission Number already exists in this branch.",
      };
    }

    // Process and upload the file (accepts PDF and Images)
    const { secure_url, public_id } = await processAndUploadDocument(
      file,
      "transfer-certificates",
    );

    const newTC = await TransferCertificate.create({
      branch,
      admissionNumber: admissionNumber.trim(),
      file: {
        url: secure_url,
        publicId: public_id,
      },
    });

    revalidatePath(`/${branch}/admin`);
    revalidatePath(`/${branch}/admin/tc`);

    return { success: true, data: JSON.parse(JSON.stringify(newTC)) };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteTransferCertificate(
  id: string,
  publicId: string,
  branch: string,
) {
  try {
    await dbConnect();

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await TransferCertificate.findByIdAndDelete(id);

    revalidatePath(`/${branch}/admin`);
    revalidatePath(`/${branch}/admin/tc`);

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
