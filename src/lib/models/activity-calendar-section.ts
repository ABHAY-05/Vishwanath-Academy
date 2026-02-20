import mongoose from "mongoose";

const CalendarEventSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    activity: { type: String, required: true },
    pdfUrl: { type: String, default: null },
    pdfPublicId: { type: String, default: null },
  },
  { _id: false },
);

const ActivityCalendarSectionSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    events: [CalendarEventSchema],
  },
  { timestamps: true },
);

// Create index for uniqueness of class name globally
ActivityCalendarSectionSchema.index({ className: 1 }, { unique: true });

export default mongoose.models.ActivityCalendarSection ||
  mongoose.model("ActivityCalendarSection", ActivityCalendarSectionSchema);
