import mongoose from "mongoose";

const TransferCertificateSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
      enum: ["aashiana", "dhawapur"],
    },
    admissionNumber: {
      type: String,
      required: true,
      trim: true,
      // Create a compound index below so admission numbers are unique per branch
    },
    file: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true },
);

// Ensure that an admission number is unique within its specific branch.
TransferCertificateSchema.index(
  { branch: 1, admissionNumber: 1 },
  { unique: true },
);

export default mongoose.models.TransferCertificate ||
  mongoose.model("TransferCertificate", TransferCertificateSchema);
