import { Metadata } from "next";
import CalendarContent from "./CalendarContent";

export const metadata: Metadata = {
  title: "Activity Calendar | Vishwanath Academy",
  description:
    "Monthly activity calendar for Pre-Nur to Prep, I to II, and III to V at Vishwanath Academy. Download PDFs for details.",
};

export default function ActivityCalendarPage() {
  return <CalendarContent />;
}
