import { Metadata } from "next";
import CBSEContent from "./CBSEContent";
import { getBranchSeo } from "@/data/seo-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  return getBranchSeo("cbse", branch);
}

export default function CBSEDisclosurePage() {
  return <CBSEContent />;
}
