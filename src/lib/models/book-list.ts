import mongoose from "mongoose";

const BookListSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true, // E.g., "Nursery", "LKG", "XII", globally applicable
    },
    file: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.models.BookList ||
  mongoose.model("BookList", BookListSchema);
