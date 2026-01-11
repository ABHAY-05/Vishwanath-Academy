import { Metadata } from "next";
import CurriculumContent from "./CurriculumContent";

export const metadata: Metadata = {
  title: "Curriculum | Vishwanath Academy",
  description:
    "Explore the holistic CBSE curriculum at Vishwanath Academy, focusing on the whole child from Primary to Senior years.",
};

export default function CurriculumPage() {
  return <CurriculumContent />;
}
