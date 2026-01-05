import { Metadata } from "next";
import AboutContent from "./AboutContent";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.about.main.title,
  description: seoData.about.main.description,
};

export default function AboutPage() {
  return <AboutContent />;
}
