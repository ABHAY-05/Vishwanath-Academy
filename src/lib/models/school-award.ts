import mongoose from "mongoose";

const SchoolAwardSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

SchoolAwardSchema.index({ createdAt: -1 });

export default mongoose.models.SchoolAward ||
  mongoose.model("SchoolAward", SchoolAwardSchema);
