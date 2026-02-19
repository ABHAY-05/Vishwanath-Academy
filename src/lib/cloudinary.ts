import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (
  filePath: string,
  folder: string,
  retries = 3,
  resourceType: "auto" | "image" | "video" | "raw" = "auto",
): Promise<any> => {
  try {
    if (!filePath) throw new Error("File path is missing");

    const response = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
      timeout: 120000,
    });

    // Remove the temporary file after upload
    fs.unlinkSync(filePath);
    return response;
  } catch (error: any) {
    console.error(`Cloudinary upload error (retries left: ${retries}):`, error);

    // Retry logic for timeout
    if (retries > 0) {
      console.log(`Retrying upload... Attempts left: ${retries - 1}`);
      return uploadOnCloudinary(filePath, folder, retries - 1);
    }

    // Clean up temporary file in case of an error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new Error(error.message || "Failed to upload image after retries.");
  }
};

/**
 * Helper to process a File from FormData, save it temporarily, and upload to Cloudinary.
 */
export const processAndUploadImage = async (
  file: File,
  folder: string,
): Promise<any> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create highly unique temp file path
  const tempDir = os.tmpdir();
  const uniqueFilename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
  const tempFilePath = path.join(tempDir, uniqueFilename);

  fs.writeFileSync(tempFilePath, buffer);

  return uploadOnCloudinary(tempFilePath, folder, 3, "auto");
};

/**
 * Helper to process a Document/PDF from FormData, save it temporarily, and upload to Cloudinary.
 */
export const processAndUploadDocument = async (
  file: File,
  folder: string,
): Promise<any> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create highly unique temp file path
  const tempDir = os.tmpdir();
  const uniqueFilename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
  const tempFilePath = path.join(tempDir, uniqueFilename);

  fs.writeFileSync(tempFilePath, buffer);

  // Use resource_type: "image" for PDFs so they can be viewed directly instead of forced download
  // Wait, the user specifically wants to upload this PDF correctly.
  // Cloudinary recommends "image" for PDFs to allow inline viewing, but "raw" if you want strict document hosting.
  // Actually, Cloudinary handles PDFs as "image" by default. Let's explicitly pass "image".
  return uploadOnCloudinary(tempFilePath, folder, 3, "image");
};
