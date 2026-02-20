"use server";

import dbConnect from "@/lib/db";
import ActivityCalendarSection from "@/lib/models/activity-calendar-section";
import { processAndUploadDocument } from "@/lib/cloudinary";
import { activityCalendar } from "@/data/academics-data";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getActivityCalendarSections() {
  try {
    await dbConnect();
    const sections = await ActivityCalendarSection.find({})
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

export async function seedActivityCalendarSections() {
  try {
    await dbConnect();

    // Check if data already exists to avoid overwriting user edits
    const existingCount = await ActivityCalendarSection.countDocuments({});
    if (existingCount > 0) {
      return {
        success: false,
        message: "Activity calendar data already seeded.",
      };
    }

    const groups = activityCalendar.groups;
    if (!groups || groups.length === 0) {
      return { success: false, message: "No static data found to seed." };
    }

    const sectionsToInsert = groups.map((group, index) => ({
      className: group.className,
      order: index,
      events: group.events.map((event) => ({
        month: event.month,
        activity: event.activity,
        pdfUrl: null,
        pdfPublicId: null,
      })),
    }));

    await ActivityCalendarSection.insertMany(sectionsToInsert);

    revalidatePath(`/aashiana/admin/calendar`);
    revalidatePath(`/aashiana/academics/calendar`);
    revalidatePath(`/dhawapur/admin/calendar`);
    revalidatePath(`/dhawapur/academics/calendar`);

    return {
      success: true,
      message: `Successfully seeded ${sectionsToInsert.length} class sections globally.`,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateActivityEventText(
  sectionId: string,
  eventIndex: number,
  newActivityText: string,
) {
  try {
    await dbConnect();
    const section = await ActivityCalendarSection.findById(sectionId);
    if (!section) return { success: false, message: "Section not found." };

    if (!section.events[eventIndex]) {
      return { success: false, message: "Invalid event index." };
    }

    section.events[eventIndex].activity = newActivityText;

    section.markModified("events");
    await section.save();

    revalidatePath(`/aashiana/admin/calendar`);
    revalidatePath(`/aashiana/academics/calendar`);
    revalidatePath(`/dhawapur/admin/calendar`);
    revalidatePath(`/dhawapur/academics/calendar`);

    return { success: true, message: "Activity text updated successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function uploadActivityCalendarPDF(formData: FormData) {
  try {
    await dbConnect();
    const sectionId = formData.get("sectionId") as string;
    const eventIndex = Number(formData.get("eventIndex"));
    const file = formData.get("file") as File;

    if (!sectionId || isNaN(eventIndex) || !file) {
      return { success: false, message: "Missing required fields" };
    }

    const section = await ActivityCalendarSection.findById(sectionId);
    if (!section) return { success: false, message: "Section not found." };
    if (!section.events[eventIndex])
      return { success: false, message: "Event not found." };

    // Delete existing PDF if there is one
    const existingPublicId = section.events[eventIndex].pdfPublicId;
    if (existingPublicId) {
      try {
        await cloudinary.uploader.destroy(existingPublicId, {
          resource_type: "image",
        });
      } catch (e) {
        console.error("Could not delete old PDF from cloudinary:", e);
      }
    }

    // Upload to Cloudinary
    const result = await processAndUploadDocument(file, "activity-calendar");

    // Update the event
    section.events[eventIndex].pdfUrl = result.secure_url;
    section.events[eventIndex].pdfPublicId = result.public_id;

    section.markModified("events");
    await section.save();

    revalidatePath(`/aashiana/admin/calendar`);
    revalidatePath(`/aashiana/academics/calendar`);
    revalidatePath(`/dhawapur/admin/calendar`);
    revalidatePath(`/dhawapur/academics/calendar`);

    return { success: true, message: "PDF uploaded successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteActivityCalendarPDF(
  sectionId: string,
  eventIndex: number,
) {
  try {
    await dbConnect();
    const section = await ActivityCalendarSection.findById(sectionId);
    if (!section) return { success: false, message: "Section not found." };
    if (!section.events[eventIndex])
      return { success: false, message: "Event not found." };

    const existingPublicId = section.events[eventIndex].pdfPublicId;
    if (existingPublicId) {
      await cloudinary.uploader.destroy(existingPublicId, {
        resource_type: "image",
      });
    }

    section.events[eventIndex].pdfUrl = null;
    section.events[eventIndex].pdfPublicId = null;

    section.markModified("events");
    await section.save();

    revalidatePath(`/aashiana/admin/calendar`);
    revalidatePath(`/aashiana/academics/calendar`);
    revalidatePath(`/dhawapur/admin/calendar`);
    revalidatePath(`/dhawapur/academics/calendar`);

    return { success: true, message: "PDF removed successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
