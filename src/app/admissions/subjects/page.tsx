import { Metadata } from "next";
import SubjectsContent from "./SubjectsContent";

export const metadata: Metadata = {
  title: "Subject Combination | Vishwanath Academy",
  description:
    "Subject combinations available for Class XI & XII at Vishwanath Academy across Science, Commerce, and Humanities streams.",
};

export default function SubjectCombinationPage() {
  return <SubjectsContent />;
}
