import mongoose from "mongoose";

const AcademicPlannerSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
      unique: true,
      enum: ["aashiana", "dhawapur"],
    },
    file: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.models.AcademicPlanner ||
  mongoose.model("AcademicPlanner", AcademicPlannerSchema);
