import { notFound } from "next/navigation";
import { admissionsData } from "@/data/admissions-data";
import { Metadata } from "next";
import FeesContent from "./FeesContent";

type Props = {
  params: Promise<{ branch: string }>;
};

import { getBranchSeo } from "@/data/seo-config";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branch } = await params;
  const data = admissionsData[branch];

  if (!data) {
    return {
      title: "Fee Structure Not Found",
    };
  }

  return getBranchSeo("fees", branch, data.title);
}

export default async function FeesPage({ params }: Props) {
  const { branch } = await params;
  const data = admissionsData[branch];

  if (!data) {
    notFound();
  }

  return <FeesContent data={data} />;
}
