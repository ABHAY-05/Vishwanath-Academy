import { Metadata } from "next";
import UniformContent from "./UniformContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.admissions.uniform.title,
  description: seoData.admissions.uniform.description,
};

export default function SchoolUniformPage() {
  return <UniformContent />;
}
