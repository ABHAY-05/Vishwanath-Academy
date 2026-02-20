"use server";

import dbConnect from "@/lib/db";
import CBSESection from "@/lib/models/cbse-section";
import {
  processAndUploadDocument,
  processAndUploadImage,
} from "@/lib/cloudinary";
import { cbseData, SectionData } from "@/data/cbse-data";
import { revalidatePath } from "next/cache";

export async function getCBSESections(branch: "aashiana" | "dhawapur") {
  try {
    await dbConnect();
    const sections = await CBSESection.find({ branch })
      .sort({ order: 1 })
      .lean();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(sections)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function seedCBSESections(branch: "aashiana" | "dhawapur") {
  try {
    await dbConnect();

    // Check if data already exists to avoid overwriting user edits
    const existingCount = await CBSESection.countDocuments({ branch });
    if (existingCount > 0) {
      return {
        success: false,
        message: "Data already seeded for this branch.",
      };
    }

    const sectionsData: SectionData[] = cbseData[branch];
    if (!sectionsData || sectionsData.length === 0) {
      return { success: false, message: "No static data found to seed." };
    }

    const sectionsToInsert = sectionsData.map((sec, index) => ({
      branch,
      title: sec.title,
      order: index,
      showNote: sec.showNote || false,
      headers: sec.headers,
      rows: sec.rows,
    }));

    await CBSESection.insertMany(sectionsToInsert);

    revalidatePath(`/${branch}/admin/cbse`);
    revalidatePath(`/${branch}/about/cbse`);

    return {
      success: true,
      message: `Successfully seeded ${sectionsToInsert.length} sections for ${branch}.`,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCBSERowText(
  sectionId: string,
  rowIndex: number,
  colIndex: number,
  newValue: string,
) {
  try {
    await dbConnect();
    const section = await CBSESection.findById(sectionId);
    if (!section) return { success: false, message: "Section not found." };

    if (
      !section.rows[rowIndex] ||
      section.rows[rowIndex].data.length <= colIndex
    ) {
      return { success: false, message: "Invalid row or column index." };
    }

    // Ensure we are only updating a text string, not overwriting a link object entirely (unless intended)
    // The UI should only call this for text cells.
    section.rows[rowIndex].data[colIndex] = newValue;

    // Mark the array as modified so Mongoose saves it
    section.markModified("rows");
    await section.save();

    revalidatePath(`/${section.branch}/admin/cbse`);
    revalidatePath(`/${section.branch}/about/cbse`);

    return { success: true, message: "Text updated successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadCBSELinkDocument(formData: FormData) {
  try {
    await dbConnect();
    const sectionId = formData.get("sectionId") as string;
    const rowIndex = Number(formData.get("rowIndex"));
    const colIndex = Number(formData.get("colIndex"));
    const file = formData.get("file") as File;
    const fileType = formData.get("fileType") as string; // 'pdf' or 'image'

    if (
      !sectionId ||
      isNaN(rowIndex) ||
      isNaN(colIndex) ||
      !file ||
      !fileType
    ) {
      return { success: false, message: "Missing required fields" };
    }

    const section = await CBSESection.findById(sectionId);
    if (!section) return { success: false, message: "Section not found." };

    let secure_url = "";

    // Upload to Cloudinary
    if (fileType === "pdf") {
      const result = await processAndUploadDocument(file, "cbse-documents");
      secure_url = result.secure_url;
    } else if (fileType === "image") {
      const result = await processAndUploadImage(file, "cbse-documents");
      secure_url = result.secure_url;
    } else {
      return { success: false, message: "Invalid file type" };
    }

    // Update the cell
    section.rows[rowIndex].data[colIndex] = {
      type: "link",
      label: fileType === "pdf" ? "PDF" : "View",
      url: secure_url,
    };

    section.markModified("rows");
    await section.save();

    revalidatePath(`/${section.branch}/admin/cbse`);
    revalidatePath(`/${section.branch}/about/cbse`);

    return { success: true, message: "Document uploaded successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
