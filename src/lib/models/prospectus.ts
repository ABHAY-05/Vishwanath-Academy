import mongoose, { Schema, Document } from "mongoose";

export interface IProspectus extends Document {
  pdf: {
    url: string;
    publicId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProspectusSchema = new Schema<IProspectus>(
  {
    pdf: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Prospectus ||
  mongoose.model<IProspectus>("Prospectus", ProspectusSchema);
