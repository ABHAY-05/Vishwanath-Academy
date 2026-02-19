import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScholarshipStudent extends Document {
  name: string;
  fatherName?: string;
  class?: string;
  session: string;
  percentage: string;
  amount: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const scholarshipStudentSchema = new Schema<IScholarshipStudent>(
  {
    name: { type: String, required: true },
    fatherName: { type: String },
    class: { type: String },
    session: { type: String, required: true },
    percentage: { type: String, required: true },
    amount: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

const ScholarshipStudent: Model<IScholarshipStudent> =
  mongoose.models.ScholarshipStudent ||
  mongoose.model<IScholarshipStudent>(
    "ScholarshipStudent",
    scholarshipStudentSchema,
  );

export default ScholarshipStudent;
