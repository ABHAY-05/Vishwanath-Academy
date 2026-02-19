import { Metadata } from "next";
import CurriculumContent from "./CurriculumContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.academics.curriculum.title,
  description: seoData.academics.curriculum.description,
};

export default function CurriculumPage() {
  return <CurriculumContent />;
}
