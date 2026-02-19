import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotice extends Document {
  title: string;
  description: string;
  pdfLink?: string;
  author?: string;
  branch: "aashiana" | "dhawapur";
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    pdfLink: { type: String },
    author: { type: String, required: false },
    branch: {
      type: String,
      required: true,
      enum: ["aashiana", "dhawapur"],
    },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Notice;
}

const Notice: Model<INotice> =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);

export default Notice;
