import { Metadata } from "next";
import SubjectsContent from "./SubjectsContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.admissions.subjects.title,
  description: seoData.admissions.subjects.description,
};

export default function SubjectCombinationPage() {
  return <SubjectsContent />;
}
