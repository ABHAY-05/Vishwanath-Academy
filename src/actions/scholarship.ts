"use server";

import dbConnect from "@/lib/db";
import ScholarshipStudent, {
  IScholarshipStudent,
} from "@/lib/models/ScholarshipStudent";
import ScholarshipImage, {
  IScholarshipImage,
} from "@/lib/models/ScholarshipImage";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Student Actions ---

export async function addStudent(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const session = formData.get("session") as string;
    const percentage = formData.get("percentage") as string;
    const amount = formData.get("amount") as string;

    const newStudent = new ScholarshipStudent({
      name,
      session,
      percentage,
      amount,
    });

    await newStudent.save();
    revalidatePath("/(public)/results/scholarship", "page");
    revalidatePath("/admin/scholarship", "page");

    return { success: true, message: "Student added successfully" };
  } catch (error) {
    console.error("Error adding student:", error);
    return { success: false, message: "Failed to add student" };
  }
}

export async function updateStudent(id: string, formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const session = formData.get("session") as string;
    const percentage = formData.get("percentage") as string;
    const amount = formData.get("amount") as string;

    await ScholarshipStudent.findByIdAndUpdate(id, {
      name,
      session,
      percentage,
      amount,
    });

    revalidatePath("/(public)/results/scholarship", "page");
    revalidatePath("/admin/scholarship", "page");

    return { success: true, message: "Student updated successfully" };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, message: "Failed to update student" };
  }
}

export async function deleteStudent(id: string) {
  try {
    await dbConnect();
    await ScholarshipStudent.findByIdAndDelete(id);
    revalidatePath("/(public)/results/scholarship", "page");
    revalidatePath("/admin/scholarship", "page");
    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, message: "Failed to delete student" };
  }
}

export async function getStudents() {
  try {
    await dbConnect();
    const students = await ScholarshipStudent.find().sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(students)) };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { success: false, data: [] };
  }
}

import { processAndUploadImage } from "@/lib/cloudinary";

// --- Image Actions ---

export async function uploadScholarshipImage(formData: FormData) {
  try {
    await dbConnect();

    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file) {
      return { success: false, message: "No file uploaded" };
    }

    // Upload using shared retry helper
    const result = await processAndUploadImage(
      file,
      "vishwanath-academy/scholarship",
    );

    const newImage = new ScholarshipImage({
      url: result.secure_url,
      publicId: result.public_id,
      caption,
    });

    await newImage.save();
    revalidatePath("/(public)/results/scholarship", "page");
    revalidatePath("/(public)/results/scholarship/gallery", "page");
    revalidatePath("/admin/scholarship", "page");

    return { success: true, message: "Image uploaded successfully" };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, message: "Failed to upload image" };
  }
}

export async function deleteScholarshipImage(id: string) {
  try {
    await dbConnect();

    const image = await ScholarshipImage.findById(id);
    if (!image) {
      return { success: false, message: "Image not found" };
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from DB
    await ScholarshipImage.findByIdAndDelete(id);

    revalidatePath("/(public)/results/scholarship", "page");
    revalidatePath("/(public)/results/scholarship/gallery", "page");
    revalidatePath("/admin/scholarship", "page");

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, message: "Failed to delete image" };
  }
}

export async function getScholarshipImages() {
  try {
    await dbConnect();
    const images = await ScholarshipImage.find().sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(images)) };
  } catch (error) {
    console.error("Error fetching images:", error);
    return { success: false, data: [] };
  }
}
