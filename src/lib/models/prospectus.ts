import mongoose, { Schema, Document } from "mongoose";

export interface IProspectus extends Document {
  branch: string;
  pdf: {
    url: string;
    publicId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProspectusSchema = new Schema<IProspectus>(
  {
    branch: { type: String, required: true },
    pdf: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true },
);

// We only need one active prospectus per branch.
// We will replace the existing document when uploading a new one.

export default mongoose.models.Prospectus ||
  mongoose.model<IProspectus>("Prospectus", ProspectusSchema);
