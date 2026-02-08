import { notFound } from "next/navigation";
import { admissionsData } from "@/data/admissions-data";
import { Metadata } from "next";
import FeesContent from "./FeesContent";

type Props = {
  params: Promise<{ branch: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branch } = await params;
  const data = admissionsData[branch];

  if (!data) {
    return {
      title: "Fee Structure Not Found",
    };
  }

  return {
    title: `Fee Structure - ${data.title} | Vishwanath Academy`,
    description: `View the fee structure for ${data.title} for the session ${data.session}.`,
  };
}

export default async function FeesPage({ params }: Props) {
  const { branch } = await params;
  const data = admissionsData[branch];

  if (!data) {
    notFound();
  }

  return <FeesContent data={data} />;
}
