import mongoose from "mongoose";

const BoardResultSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
      enum: ["aashiana", "dhawapur"],
    },
    type: {
      type: String,
      required: true,
      enum: ["highlight", "year_result"],
    },
    highlightImage: {
      url: String,
      publicId: String,
    },
    year: String,
    classX: {
      url: String,
      publicId: String,
    },
    classXII: {
      url: String,
      publicId: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.BoardResult ||
  mongoose.model("BoardResult", BoardResultSchema);
