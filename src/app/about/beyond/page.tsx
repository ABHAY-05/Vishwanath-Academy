import { Metadata } from "next";
import BeyondContent from "./BeyondContent";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.about.beyond.title,
  description: seoData.about.beyond.description,
};

export default function BeyondPage() {
  return <BeyondContent />;
}
