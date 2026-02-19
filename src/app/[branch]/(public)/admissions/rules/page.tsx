import { Metadata } from "next";
import RulesContent from "./RulesContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.admissions.rules.title,
  description: seoData.admissions.rules.description,
};

export default function SchoolRulesPage() {
  return <RulesContent />;
}
