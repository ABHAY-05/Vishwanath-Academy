import { Metadata } from "next";
import CalendarContent from "./CalendarContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.academics.calendar.title,
  description: seoData.academics.calendar.description,
};

export default function ActivityCalendarPage() {
  return <CalendarContent />;
}
