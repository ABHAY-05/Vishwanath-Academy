import { getBranchSeo } from "@/data/seo-config";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  const seo = getBranchSeo("career", branch);

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
