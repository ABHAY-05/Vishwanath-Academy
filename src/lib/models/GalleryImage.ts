import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  publicId: string;
  title?: string;
  category: "all" | "class_group" | "school_memories" | "gallery" | "art_craft";
  branch: string;
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
      enum: ["all", "class_group", "school_memories", "gallery", "art_craft"],
      default: "gallery",
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

if (process.env.NODE_ENV === "development") {
  if (mongoose.models.GalleryImage) {
    delete mongoose.models.GalleryImage;
  }
}

export default mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
