import { Metadata } from "next";
import ScholarshipGalleryContent from "./GalleryContent";
import { getScholarshipImages } from "@/actions/scholarship";

interface Props {
  params: Promise<{ branch: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branch } = await params;
  const capitalizedBranch = branch.charAt(0).toUpperCase() + branch.slice(1);
  return {
    title: `Felicitation Gallery | Vishwanath Academy ${capitalizedBranch}`,
    description: `Browse the photo gallery of the Shri Markandey Tewari Bright Child Scholarship felicitation ceremony at Vishwanath Academy.`,
  };
}

export default async function ScholarshipGalleryPage({ params }: Props) {
  const { branch } = await params;

  const res = await getScholarshipImages();
  const images = res.success ? res.data : [];

  return <ScholarshipGalleryContent images={images} branch={branch} />;
}
