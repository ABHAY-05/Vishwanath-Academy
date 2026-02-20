import mongoose from "mongoose";

const PressReleaseSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

PressReleaseSchema.index({ createdAt: -1 });

export default mongoose.models.PressRelease ||
  mongoose.model("PressRelease", PressReleaseSchema);
