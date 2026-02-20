import mongoose from "mongoose";

const TableRowSchema = new mongoose.Schema(
  {
    data: [mongoose.Schema.Types.Mixed], // Can hold String or LinkCell
  },
  { _id: false },
);

const CBSESectionSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
      enum: ["aashiana", "dhawapur"],
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    showNote: {
      type: Boolean,
      default: false,
    },
    headers: [{ type: String }],
    rows: [TableRowSchema],
  },
  { timestamps: true },
);

// Compound index to ensure uniqueness of section title per branch
CBSESectionSchema.index({ branch: 1, title: 1 }, { unique: true });

export default mongoose.models.CBSESection ||
  mongoose.model("CBSESection", CBSESectionSchema);
