import { Metadata } from "next";
import { getBranchSeo } from "@/data/seo-config";
import AwardsContent from "./AwardsContent";
import { getSchoolAwards } from "@/actions/school-awards";

interface Props {
  params: Promise<{ branch: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branch } = await params;
  return getBranchSeo("awards", branch);
}

export default async function SchoolAwardsPage({ params }: Props) {
  const { branch } = await params;

  // Fetch awards globally
  const res = await getSchoolAwards();
  const awards = res.success ? res.data : [];

  return <AwardsContent awards={awards} />;
}
