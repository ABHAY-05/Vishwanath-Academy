import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScholarshipImage extends Document {
  url: string;
  publicId: string;
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
}

const scholarshipImageSchema = new Schema<IScholarshipImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String },
  },
  { timestamps: true },
);

const ScholarshipImage: Model<IScholarshipImage> =
  mongoose.models.ScholarshipImage ||
  mongoose.model<IScholarshipImage>("ScholarshipImage", scholarshipImageSchema);

export default ScholarshipImage;
