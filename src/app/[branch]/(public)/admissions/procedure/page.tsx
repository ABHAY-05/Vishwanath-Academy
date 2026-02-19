import { Metadata } from "next";
import ProcedureContent from "./ProcedureContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.admissions.procedure.title,
  description: seoData.admissions.procedure.description,
};

export default function AdmissionProcedurePage() {
  return <ProcedureContent />;
}
