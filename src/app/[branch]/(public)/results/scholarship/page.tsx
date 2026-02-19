import { Metadata } from "next";
import ScholarshipContent from "./ScholarshipContent";
import { getBranchSeo } from "@/data/seo-config";
import { getStudents, getScholarshipImages } from "@/actions/scholarship";

interface Props {
  params: Promise<{ branch: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branch } = await params;
  return getBranchSeo("scholarship", branch);
}

export default async function ScholarshipPage({ params }: Props) {
  const { branch } = await params;

  const [studentsRes, imagesRes] = await Promise.all([
    getStudents(),
    getScholarshipImages(),
  ]);

  const students = studentsRes.success ? studentsRes.data : [];
  const images = imagesRes.success ? imagesRes.data : [];

  return (
    <ScholarshipContent students={students} images={images} branch={branch} />
  );
}
