import { Metadata } from "next";
import TeamContent from "./TeamContent";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.about.team.title,
  description: seoData.about.team.description,
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  return <TeamContent branch={branch} />;
}
