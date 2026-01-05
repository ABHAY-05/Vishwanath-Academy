import { Metadata } from "next";
import TeamContent from "./TeamContent";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.about.team.title,
  description: seoData.about.team.description,
};

export default function TeamPage() {
  return <TeamContent />;
}
