import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  thumbnail: {
    url: string;
    publicId: string;
  };
  content: string;
  tags: string[];
  views: number;
  author: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    thumbnail: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
