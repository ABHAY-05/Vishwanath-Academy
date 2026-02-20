import mongoose from "mongoose";

const CareerImageSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.models.CareerImage ||
  mongoose.model("CareerImage", CareerImageSchema);
