import { Metadata } from "next";
import CompetitiveContent from "./CompetitiveContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.academics.competitive.title,
  description: seoData.academics.competitive.description,
};

export default function CompetitiveExamsPage() {
  return <CompetitiveContent />;
}
