import { Metadata } from "next";
import FacilitiesContent from "./FacilitiesContent";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.about.facilities.title,
  description: seoData.about.facilities.description,
};

export default function FacilitiesPage() {
  return <FacilitiesContent />;
}
