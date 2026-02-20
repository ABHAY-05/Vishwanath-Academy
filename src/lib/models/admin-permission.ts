import mongoose from "mongoose";

const AdminPermissionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      enum: ["aashiana", "dhawapur"],
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

// Ensure an email only has one permission document per branch
AdminPermissionSchema.index({ email: 1, branch: 1 }, { unique: true });

export default mongoose.models.AdminPermission ||
  mongoose.model("AdminPermission", AdminPermissionSchema);
