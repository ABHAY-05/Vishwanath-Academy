"use server";

import dbConnect from "@/lib/db";
import BookList from "@/lib/models/book-list";
import { processAndUploadDocument } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getBookLists() {
  try {
    await dbConnect();
    const lists = await BookList.find({}).lean();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(lists)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadBookList(formData: FormData) {
  try {
    await dbConnect();
    const className = formData.get("className") as string;
    const file = formData.get("file") as File;

    if (!className || !file) {
      return { success: false, message: "Missing required fields" };
    }

    // Upload to Cloudinary
    const { secure_url, public_id } = await processAndUploadDocument(
      file,
      "book-lists",
    );

    // Find and replace if it already exists for this class
    const existingList = await BookList.findOne({ className });
    if (existingList) {
      if (existingList.file?.publicId) {
        await cloudinary.uploader.destroy(existingList.file.publicId, {
          resource_type: "image",
        });
      }
      existingList.file = { url: secure_url, publicId: public_id };
      await existingList.save();
    } else {
      await BookList.create({
        className,
        file: {
          url: secure_url,
          publicId: public_id,
        },
      });
    }

    revalidatePath(`/aashiana/admin/books`);
    revalidatePath(`/dhawapur/admin/books`);
    revalidatePath(`/aashiana/academics/books-and-stationary`);
    revalidatePath(`/dhawapur/academics/books-and-stationary`);

    return { success: true, message: "Book list uploaded successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteBookList(id: string, publicId: string) {
  try {
    await dbConnect();

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    await BookList.findByIdAndDelete(id);

    revalidatePath(`/aashiana/admin/books`);
    revalidatePath(`/dhawapur/admin/books`);
    revalidatePath(`/aashiana/academics/books-and-stationary`);
    revalidatePath(`/dhawapur/academics/books-and-stationary`);

    return { success: true, message: "Book list deleted." };
  } catch (error: any) {
    console.error("Error deleting Book List:", error);
    return { success: false, message: error.message || "Failed to delete" };
  }
}
