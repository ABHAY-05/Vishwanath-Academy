import type { Metadata } from "next";

import { getBranchSeo } from "@/data/seo-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  return getBranchSeo("gallery", branch);
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
